const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const ROOT = __dirname;

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

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

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
    filePath = path.join(ROOT, filePath);

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
