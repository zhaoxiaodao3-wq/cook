// Build clean HTML for WeChat webview — no type="module", no crossorigin
// Uses the legacy bundle path which works in any WebView
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const assets = path.join(dist, 'assets');

// Find generated filenames (hashes change per build)
const files = fs.readdirSync(assets);
const css = files.find(f => f.endsWith('.css') && !f.includes('legacy') && !f.includes('polyfills'));
const polyfills = files.find(f => f.includes('polyfills-legacy'));
const app = files.find(f => f.includes('index-legacy'));

if (!css || !polyfills || !app) {
  console.error('Missing required build files!');
  console.error({ css, polyfills, app });
  process.exit(1);
}

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title>Fresh Harvest</title>
  <link rel="stylesheet" href="/assets/${css}">
</head>
<body>
  <div id="root"></div>
  <script src="/assets/${polyfills}"></script>
  <script>
    System.import('/assets/${app}');
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(dist, 'index.html'), html);
console.log('  ✓ Generated clean HTML for WeChat webview');
console.log(`    CSS:  /assets/${css}`);
console.log(`    App:  /assets/${app}`);
console.log(`    Poly: /assets/${polyfills}`);
