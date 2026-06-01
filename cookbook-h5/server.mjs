// Static server for WeChat mini-program web-view
// Serves cookbook-h5/dist/ on port 3000 with CORS headers
// Usage: node server.mjs

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  let filePath = path.join(DIST, url === '/' ? '/index.html' : url);
  const ext = path.extname(filePath);

  // SPA fallback
  if ((!ext || !MIME[ext]) && !fs.existsSync(filePath)) {
    filePath = path.join(DIST, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      });
      res.end('Not Found');
      return;
    }
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
    };
    res.writeHead(200, headers);
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Fresh Harvest H5 running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${DIST}`);
});
