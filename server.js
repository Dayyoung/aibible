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

    // Redirect obsolete /boostsm/kr/ requests to /boostsm/
    if (filePath === '/boostsm/kr' || filePath === '/boostsm/kr/' || filePath.startsWith('/boostsm/kr/')) {
        const urlParts = req.url.split('?');
        const search = urlParts[1] ? '?' + urlParts[1] : '';
        res.writeHead(301, { 'Location': '/boostsm/' + search });
        res.end();
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
            // If path is a directory, serve its index.html
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
    console.log(`AIBible server running at http://localhost:${PORT}`);
});
