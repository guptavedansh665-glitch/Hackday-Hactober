/**
 * KisanVaani AI — Community Platform Server (Node.js)
 * 
 * Provides HTTP endpoints for the Community Translation Portal,
 * Safety Regression Testing, Missing Translation Audits, and Label Registry.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { SafetyValidator } = require('./packages/safety-validation/safety-validator.js');
const { TranslationDetector } = require('./packages/translation/missing-detector.js');
const { getOCREngine } = require('./packages/ocr/ocr-adapter.js');
const { getSpeechEngine } = require('./packages/speech/speech-adapter.js');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'apps/web');
const LOCALES_DIR = path.join(__dirname, 'locales');
const DATASET_PATH = path.join(__dirname, 'datasets/sample_labels/pesticide_registry.json');

// In-memory review queue for demonstration of Review & Approval Workflow
const pendingReviews = [
  {
    id: 'rev-001',
    localeCode: 'bn',
    languageName: 'Bengali (বাংলা)',
    keyPath: 'dosage_and_mixing.dosage_instruction',
    englishSource: 'Mix exactly {dose_amount} per {water_volume} of clean water.',
    proposedTranslation: 'পরিষ্কার জলের প্রতি {water_volume} এ ঠিক {dose_amount} মেশান।',
    contributor: 'Anirban_KisanVolunteer',
    submittedAt: '2026-10-24T12:30:00Z',
    status: 'PENDING',
    safetyChecked: true,
    comments: [
      { author: 'Anirban_KisanVolunteer', text: 'Verified with BCKV Mohanpur agricultural farm spray guidelines.' }
    ]
  },
  {
    id: 'rev-002',
    localeCode: 'mr',
    languageName: 'Marathi',
    keyPath: 'ppe_requirements.boots',
    englishSource: 'Wear rubber gumboots; do not spray barefoot or in sandals.',
    proposedTranslation: 'रबरी गमबूट वापरा; अनवाणी किंवा चपलांवर फवारणी करू नका.',
    contributor: 'Suresh_Patil_Agronomist',
    submittedAt: '2026-10-24T14:15:00Z',
    status: 'APPROVED',
    reviewedBy: 'Dr_Deshmukh_SafetyOfficer',
    reviewedAt: '2026-10-24T15:00:00Z',
    safetyChecked: true,
    comments: [
      { author: 'Dr_Deshmukh_SafetyOfficer', text: 'Terminology matches MPKV Rahuri farm safety manuals.' }
    ]
  }
];

const validator = new SafetyValidator(path.join(LOCALES_DIR, 'en.json'));
const detector = new TranslationDetector(LOCALES_DIR);

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.jsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // CORS headers for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Endpoints
  if (pathname === '/api/locales') {
    const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json'));
    const list = files.map(f => {
      const data = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, f), 'utf8'));
      return {
        file: f,
        code: data.meta?.language_code || f.replace('.json', ''),
        name: data.meta?.language_name || f,
        version: data.meta?.version
      };
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(list));
    return;
  }

  if (pathname === '/api/audit') {
    const auditReports = detector.auditAllLocales();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(auditReports));
    return;
  }

  if (pathname === '/api/reviews') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pendingReviews));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const submission = JSON.parse(body);
          submission.id = `rev-${Date.now().toString(36)}`;
          submission.submittedAt = new Date().toISOString();
          submission.status = 'PENDING';
          submission.comments = submission.comments || [];
          pendingReviews.unshift(submission);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, item: submission }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }
  }

  if (pathname.startsWith('/api/reviews/') && pathname.endsWith('/action') && req.method === 'POST') {
    const parts = pathname.split('/');
    const reviewId = parts[3];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { action, reviewer, comment } = JSON.parse(body);
        const review = pendingReviews.find(r => r.id === reviewId);
        if (!review) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Review not found' }));
          return;
        }

        review.status = action; // 'APPROVED' or 'REVISION_REQUESTED'
        review.reviewedBy = reviewer || 'Anonymous_Agronomist';
        review.reviewedAt = new Date().toISOString();
        if (comment) {
          review.comments.push({ author: review.reviewedBy, text: comment });
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, review }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/validate-safety' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { targetData, localeCode } = JSON.parse(body);
        const report = validator.validateTranslationObject(targetData, localeCode || 'user_submission');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(report));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/pesticides') {
    if (fs.existsSync(DATASET_PATH)) {
      const data = fs.readFileSync(DATASET_PATH, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Dataset not found' }));
    }
    return;
  }

  // Static File Serving
  let filePath = pathname === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback to index.html for SPA routing
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
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n========================================================`);
    console.log(` KisanVaani AI Platform Server Running on http://localhost:${PORT}`);
    console.log(` - Community Translation Portal`);
    console.log(` - Safety Regression Test API`);
    console.log(` - Translation Review & Approval Workflow`);
    console.log(` - CIBRC Public Label Dataset API`);
    console.log(`========================================================\n`);
  });
}

module.exports = server;
