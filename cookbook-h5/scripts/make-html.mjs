// Post-build: generate wrapper HTML for the IIFE bundle
// No ES modules, no crossorigin — compatible with WeChat webview
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title>Fresh Harvest</title>
  <link rel="stylesheet" href="/app.css">
</head>
<body>
  <div id="root"></div>
  <script src="/app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(dist, 'index.html'), html);
console.log('  ✓ Generated index.html (IIFE wrapper, no ES modules)');
