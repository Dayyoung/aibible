const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8888;
const ROOT = __dirname;
const manualMergeJobs = new Map();

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.srt': 'text/plain'
};

function shellQuote(value) {
    return `"${String(value).replace(/"/g, '\\"')}"`;
}

function sanitizeFileToken(value, fallback) {
    const cleaned = String(value || '')
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9가-힣._-]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_+|_+$/g, '');
    return cleaned || fallback;
}

function inferOutputTokensFromName(fileName, fallbackBook, fallbackChapter) {
    const baseName = path.basename(String(fileName || ''), path.extname(String(fileName || '')));
    const normalized = baseName
        .replace(/^AI_Pastor[_-]*/i, '')
        .replace(/^Bible[_ -]*Story[_ -]*/i, '')
        .replace(/^Bible_Story__?/i, '');
    const match = normalized.match(/^(.+?)[ _-]+(\d{1,3})(?:[ _-].*)?$/);
    const book = match ? match[1] : fallbackBook;
    const chapter = match ? match[2] : fallbackChapter;

    return {
        book: sanitizeFileToken(book, sanitizeFileToken(fallbackBook, 'UnknownBook')),
        chapter: sanitizeFileToken(chapter, sanitizeFileToken(fallbackChapter, '1'))
    };
}

function buildFfmpegMergeCommand(intro, sermons, output) {
    const inputs = [intro, ...sermons];
    const inputArgs = inputs.map(file => `-i ${shellQuote(file)}`).join(' ');
    const filters = inputs
        .map((_, index) => `[${index}:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2[v${index}]`)
        .join(';');
    const concatInputs = inputs.map((_, index) => `[v${index}][${index}:a]`).join('');

    return `ffmpeg -y ${inputArgs} -filter_complex "${filters};${concatInputs}concat=n=${inputs.length}:v=1:a=1[outv][outa]" -map "[outv]" -map "[outa]" -c:v libx264 -preset fast -crf 22 -c:a aac -b:a 192k ${shellQuote(output)}`;
}

function runManualMergeJob(jobId, intro, items, cleanupPaths) {
    const { exec } = require('child_process');
    const job = manualMergeJobs.get(jobId);
    if (!job) return;

    job.status = 'processing';
    job.message = 'FFmpeg 병합 중';
    job.total = items.length;
    job.completedCount = 0;
    job.outputPaths = [];
    job.updatedAt = Date.now();

    const cleanupFiles = Array.isArray(cleanupPaths) ? cleanupPaths : (cleanupPaths ? [cleanupPaths] : []);
    const cleanup = () => {
        cleanupFiles.forEach(file => {
            try { fs.unlinkSync(file); } catch (e) { }
        });
    };

    const runNext = (index) => {
        const currentJob = manualMergeJobs.get(jobId);
        if (!currentJob) return;

        if (index >= items.length) {
            cleanup();
            currentJob.updatedAt = Date.now();
            currentJob.status = 'completed';
            currentJob.currentFile = '';
            currentJob.message = `${items.length}개 파일 병합 완료`;
            console.log(`[Backend] Manual FFmpeg job ${jobId} completed successfully.`);
            return;
        }

        const item = items[index];
        const ffmpegCmd = buildFfmpegMergeCommand(intro, [item.tempPath], item.outputPath);
        currentJob.currentFile = item.fileName;
        currentJob.currentIndex = index + 1;
        currentJob.total = items.length;
        currentJob.message = `${index + 1}/${items.length} 병합 중: ${item.fileName}`;
        currentJob.updatedAt = Date.now();
        console.log(`[Backend] Running manual FFmpeg merge job ${jobId} (${index + 1}/${items.length}): ${ffmpegCmd}`);

        exec(ffmpegCmd, (error) => {
            const latestJob = manualMergeJobs.get(jobId);
            if (!latestJob) return;

            latestJob.updatedAt = Date.now();
            if (error) {
                cleanup();
                console.error(`[Backend] Manual FFmpeg job ${jobId} failed: ${error.message}`);
                latestJob.status = 'failed';
                latestJob.error = `FFmpeg execution failed while merging ${item.fileName}: ${error.message}`;
                return;
            }

            latestJob.completedCount = index + 1;
            latestJob.outputPaths = [...(latestJob.outputPaths || []), item.outputPath];
            latestJob.outputPath = item.outputPath;
            runNext(index + 1);
        });
    };

    runNext(0);
}

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-File-Name');
    res.setHeader('Access-Control-Allow-Private-Network', 'true');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    let filePath = req.url.split('?')[0];

    // 301 Redirects for Consolidated Pages
    const redirects = {
        '/localize/': '/transboost/',
        '/localize/kr/': '/transboost/kr/',
        '/engtranslate/': '/transboost/',
        '/engtranslate/kr/': '/transboost/kr/',
        '/medboost/': '/transboost/',
        '/medboost/kr/': '/transboost/kr/',
        '/mkboost/': '/researchboost/',
        '/mkboost/kr/': '/researchboost/kr/'
    };

    let checkPath = filePath;
    if (!checkPath.endsWith('/') && !checkPath.split('/').pop().includes('.')) {
        checkPath += '/';
    }

    if (redirects[checkPath]) {
        const queryStr = req.url.split('?')[1] ? '?' + req.url.split('?')[1] : '';
        res.writeHead(301, { 'Location': redirects[checkPath] + queryStr });
        res.end();
        return;
    }

    // API endpoints handling
    if (filePath.startsWith('/api/orders')) {
        const ordersFilePath = path.join(ROOT, 'orders.json');

        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                try {
                    const newOrder = JSON.parse(body);
                    let orders = [];
                    if (fs.existsSync(ordersFilePath)) {
                        try {
                            orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));
                        } catch (e) {
                            orders = [];
                        }
                    }
                    orders.unshift(newOrder);
                    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');

                    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: true, order: newOrder }));
                } catch (err) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Invalid JSON data' }));
                }
            });
            return;
        } else if (req.method === 'GET') {
            const urlParts = req.url.split('?');
            const searchParams = new URLSearchParams(urlParts[1] || '');
            const email = searchParams.get('email');

            let orders = [];
            if (fs.existsSync(ordersFilePath)) {
                try {
                    orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));
                } catch (e) {
                    orders = [];
                }
            }

            if (email) {
                orders = orders.filter(order => order.email && order.email.toLowerCase() === email.toLowerCase());
            }

            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify(orders));
            return;
        }
    }

    // Helper function for case-insensitive file existence check on physical disk
    function fileExistsCaseInsensitive(targetPath) {
        const normalized = targetPath.replace(/\\/g, '/');
        const parts = normalized.split('/');
        let currentPath = parts[0] || (normalized.startsWith('/') ? '/' : '.');
        const startIdx = (normalized.startsWith('/') || parts[0].includes(':')) ? 1 : 0;

        for (let i = startIdx; i < parts.length; i++) {
            const part = parts[i].toLowerCase();
            if (!part) continue;

            try {
                const files = fs.readdirSync(currentPath);
                const found = files.find(f => f.toLowerCase() === part);
                if (!found) {
                    return false;
                }
                currentPath = path.join(currentPath, found);
            } catch (e) {
                return false;
            }
        }
        return true;
    }

    // Video Merge API: Watches Downloads folder for the latest downloaded sermon video
    // and merges it with AI_Pastor_intro.mp4 using FFmpeg
    if (filePath === '/api/merge_video' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const params = JSON.parse(body);
                const book = params.book || 'UnknownBook';
                const chapter = params.chapter || '1';

                const homeDir = process.env.USERPROFILE || process.env.HOME;
                const downloadsDir = path.join(homeDir, 'Downloads');
                const introPath = path.join(ROOT, 'ai_pastor', 'AI_Pastor_intro.mp4');
                const outputPath = path.join(downloadsDir, `AI_Pastor_${book}_${chapter}.mp4`);

                if (!fs.existsSync(introPath)) {
                    res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.end(JSON.stringify({ success: false, error: `Intro video not found at ${introPath}` }));
                    return;
                }

                console.log(`[Backend] Video merge requested for ${book} Chapter ${chapter}. Waiting for downloaded sermon video...`);

                // Poll for the latest downloaded sermon video
                let attempts = 0;
                const maxAttempts = 180; // 6 minutes max wait for NotebookLM downloads

                function checkAndMerge() {
                    try {
                        const files = fs.readdirSync(downloadsDir);
                        const partialDownloads = files.filter(f => f.endsWith('.crdownload') || f.endsWith('.download'));
                        if (partialDownloads.length > 0) {
                            console.log(`[Backend] Download still in progress: ${partialDownloads.join(', ')}`);
                        }

                        const mp4Files = files
                            .filter(f => f.endsWith('.mp4') && !f.startsWith('AI_Pastor_'))
                            .map(f => {
                                const fpath = path.join(downloadsDir, f);
                                const stat = fs.statSync(fpath);
                                return { name: f, path: fpath, mtime: stat.mtimeMs, size: stat.size };
                            })
                            .sort((a, b) => b.mtime - a.mtime); // Sort by newest modified time

                        if (mp4Files.length > 0) {
                            const newest = mp4Files[0];
                            const timeDiff = Date.now() - newest.mtime;

                            // Ensure the file is recent and no browser partial download is still active.
                            // and has non-zero size (not an empty placeholder)
                            if (timeDiff < 600000 && newest.size > 100000 && partialDownloads.length === 0) {
                                console.log(`[Backend] Detected downloaded sermon video: ${newest.name} (${(newest.size / 1024 / 1024).toFixed(2)} MB)`);
                                runFfmpegMerge(introPath, [newest.path], outputPath, res);
                                return;
                            }
                        }
                    } catch (err) {
                        console.error('[Backend] Error scanning downloads folder:', err);
                    }

                    attempts++;
                    if (attempts < maxAttempts) {
                        setTimeout(checkAndMerge, 2000);
                    } else {
                        res.writeHead(408, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        res.end(JSON.stringify({ success: false, error: 'Timeout waiting for downloaded sermon video to appear.' }));
                    }
                }

                checkAndMerge();
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: false, error: 'Invalid JSON parameters' }));
            }
        });
        return;
    }

    if (filePath === '/api/manual_merge_video' && req.method === 'POST') {
        const urlParts = req.url.split('?');
        const searchParams = new URLSearchParams(urlParts[1] || '');
        const book = searchParams.get('book') || 'UnknownBook';
        const chapter = searchParams.get('chapter') || '1';
        const uploadedName = searchParams.get('filename') || req.headers['x-file-name'] || 'manual_sermon.mp4';

        const homeDir = process.env.USERPROFILE || process.env.HOME;
        const downloadsDir = path.join(homeDir, 'Downloads');
        const introPath = path.join(ROOT, 'ai_pastor', 'AI_Pastor_intro.mp4');
        const tempDir = path.join(ROOT, '.tmp_ai_pastor');
        const safeName = path.basename(String(uploadedName)).replace(/[^a-zA-Z0-9._-]/g, '_') || 'manual_sermon.mp4';
        const maxUploadBytes = 2 * 1024 * 1024 * 1024;
        let receivedBytes = 0;
        const chunks = [];

        if (!fs.existsSync(introPath)) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: `Intro video not found at ${introPath}` }));
            return;
        }

        fs.mkdirSync(tempDir, { recursive: true });

        req.on('data', chunk => {
            receivedBytes += chunk.length;
            if (receivedBytes > maxUploadBytes) {
                req.destroy(new Error('Uploaded file is too large.'));
                return;
            }
            chunks.push(chunk);
        });

        req.on('end', () => {
            try {
                if (receivedBytes === 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'No video file uploaded.' }));
                    return;
                }

                const body = Buffer.concat(chunks);
                const contentType = req.headers['content-type'] || '';
                let uploadedFiles = [];

                if (contentType.includes('application/json')) {
                    const parsed = JSON.parse(body.toString('utf8'));
                    uploadedFiles = Array.isArray(parsed.files) ? parsed.files : [];
                    if (uploadedFiles.length === 0) {
                        throw new Error('No files found in upload payload.');
                    }
                } else {
                    uploadedFiles = [{
                        name: safeName,
                        type: contentType || 'video/mp4',
                        index: 0,
                        data: body.toString('base64')
                    }];
                }

                uploadedFiles.sort((a, b) => (Number(a.index) || 0) - (Number(b.index) || 0));

                const mergeItems = uploadedFiles.map((file, index) => {
                    const originalName = path.basename(String(file.name || `manual_sermon_${index + 1}.mp4`));
                    const safeFileName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_') || `manual_sermon_${index + 1}.mp4`;
                    const tempPath = path.join(tempDir, `${Date.now()}_${index}_${safeFileName}`);
                    const buffer = Buffer.from(String(file.data || ''), 'base64');
                    const inferred = inferOutputTokensFromName(
                        originalName,
                        file.book || book,
                        file.chapter || chapter
                    );
                    const outputPath = path.join(downloadsDir, `AI_Pastor_${inferred.book}_${inferred.chapter}.mp4`);

                    if (buffer.length === 0) {
                        throw new Error(`Uploaded file is empty: ${safeFileName}`);
                    }

                    fs.writeFileSync(tempPath, buffer);
                    return {
                        book: inferred.book,
                        chapter: inferred.chapter,
                        fileName: originalName,
                        tempPath,
                        outputPath
                    };
                });
                const tempPaths = mergeItems.map(item => item.tempPath);
                const outputPaths = mergeItems.map(item => item.outputPath);

                const displayName = uploadedFiles.length === 1 ? safeName : `${uploadedFiles.length} files`;
                console.log(`[Backend] Manual merge requested for ${book} Chapter ${chapter}: ${displayName} (${(receivedBytes / 1024 / 1024).toFixed(2)} MB payload)`);
                const jobId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
                manualMergeJobs.set(jobId, {
                    id: jobId,
                    status: 'queued',
                    book,
                    chapter,
                    fileName: displayName,
                    fileCount: uploadedFiles.length,
                    total: uploadedFiles.length,
                    completedCount: 0,
                    outputPath: outputPaths[0],
                    outputPaths: [],
                    plannedOutputPaths: outputPaths,
                    items: mergeItems.map(item => ({
                        book: item.book,
                        chapter: item.chapter,
                        fileName: item.fileName,
                        outputPath: item.outputPath
                    })),
                    message: '업로드 완료. 병합 대기 중',
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });

                res.writeHead(202, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, jobId, status: 'queued' }));

                setTimeout(() => runManualMergeJob(jobId, introPath, mergeItems, tempPaths), 0);
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });

        req.on('error', err => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: `Upload failed: ${err.message}` }));
        });

        return;
    }

    if (filePath === '/api/manual_merge_status' && req.method === 'GET') {
        const urlParts = req.url.split('?');
        const searchParams = new URLSearchParams(urlParts[1] || '');
        const jobId = searchParams.get('job_id') || searchParams.get('id');
        const job = jobId ? manualMergeJobs.get(jobId) : null;

        if (!job) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Manual merge job not found.' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, job }));
        return;
    }

    function runFfmpegMerge(intro, sermons, output, responseObj, cleanupPath) {
        const { exec } = require('child_process');
        // FFmpeg command scales both to 1080p, pads, concats, and re-encodes safely to avoid audio/video desync
        const sermonFiles = Array.isArray(sermons) ? sermons : [sermons];
        const ffmpegCmd = buildFfmpegMergeCommand(intro, sermonFiles, output);

        console.log(`[Backend] Running FFmpeg merge: ${ffmpegCmd}`);

        exec(ffmpegCmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`[Backend] FFmpeg error: ${error.message}`);
                if (cleanupPath) {
                    try { fs.unlinkSync(cleanupPath); } catch (e) { }
                }
                responseObj.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                responseObj.end(JSON.stringify({ success: false, error: `FFmpeg execution failed: ${error.message}` }));
                return;
            }
            console.log('[Backend] FFmpeg merge completed successfully.');
            if (cleanupPath) {
                try { fs.unlinkSync(cleanupPath); } catch (e) { }
            }
            responseObj.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            responseObj.end(JSON.stringify({ success: true, outputPath: output }));
        });
    }

    // Check physical file existence in user's Downloads folder
    if (filePath === '/api/check_file') {
        const urlParts = req.url.split('?');
        const searchParams = new URLSearchParams(urlParts[1] || '');
        const targetPath = searchParams.get('path');

        if (!targetPath) {
            res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ exists: false, error: 'Missing path parameter' }));
            return;
        }

        const homeDir = process.env.USERPROFILE || process.env.HOME;
        const downloadsDir = path.join(homeDir, 'Downloads');
        const absolutePath = path.join(downloadsDir, targetPath);

        // Security check: ensure path is inside Downloads folder
        if (!absolutePath.startsWith(downloadsDir)) {
            res.writeHead(403, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ exists: false, error: 'Forbidden path' }));
            return;
        }

        // Use case-insensitive check instead of strict existsSync to bypass case mismatch bugs
        const exists = fileExistsCaseInsensitive(absolutePath);

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ exists }));
        return;
    }

    if (filePath === '/' || filePath.endsWith('/')) {
        filePath += 'index.html';
    }
    const relativePath = filePath.replace(/^\/+/, '');
    filePath = path.join(ROOT, relativePath);
    console.log('[Static Router] Resolved filePath:', filePath, '| ROOT:', ROOT);

    if (!filePath.startsWith(ROOT)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            if (!err && stats.isDirectory()) {
                const urlParts = req.url.split('?');
                const pathname = urlParts[0];
                const search = urlParts[1] ? '?' + urlParts[1] : '';
                if (!pathname.endsWith('/')) {
                    res.writeHead(301, { 'Location': pathname + '/' + search });
                    res.end();
                    return;
                }
                filePath = path.join(filePath, 'index.html');
                const ext = path.extname(filePath).toLowerCase();
                const contentType = MIME_TYPES[ext] || 'application/octet-stream';
                res.writeHead(200, { 'Content-Type': contentType });
                fs.createReadStream(filePath).pipe(res);
                return;
            }
            res.statusCode = 404;
            res.end('Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
