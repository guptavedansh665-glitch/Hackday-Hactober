/**
 * KissanAI — Dhenu Agricultural AI Server (Node.js)
 * Serves the KissanAI / Dhenu web dashboard and mock agricultural advisory APIs.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'apps/web');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Static file serving
  let filePath = pathname === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, pathname);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Fallback to index.html
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, indexContent) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexContent, 'utf-8');
        }
      });
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
      res.end(content, 'utf-8');
    }
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n============================================================`);
    console.log(` 🌾 KissanAI — Dhenu Agro Operating System Dashboard Running`);
    console.log(` 🚀 URL: http://localhost:${PORT}`);
    console.log(` - Dhenu Voice Assistant (বাংলা, हिन्दी, मराठी, English)`);
    console.log(` - Plant Doctor: Multimodal Crop Disease Diagnostic`);
    console.log(` - Live Mandi APMC Prices`);
    console.log(` - CIBRC Pesticide Dosage Calculator`);
    console.log(`============================================================\n`);
  });
}

module.exports = server;
