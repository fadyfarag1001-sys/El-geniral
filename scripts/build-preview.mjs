// Builds a copy of website/ for the private claude.ai preview.
// The host wraps the main page in its own <html><head><body>, so index.html loses
// its doctype/html/head/body tags (its contents are kept). Other pages stay full documents.
import { cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
const out = process.argv[2];
if (!out) { console.error('usage: node scripts/build-preview.mjs <outDir>'); process.exit(1); }
rmSync(out, { recursive: true, force: true });
cpSync('website', out, { recursive: true, filter: src => !src.endsWith('README.md') });
let html = readFileSync(`${out}/index.html`, 'utf8');
html = html.replace(/<!doctype html>\s*/i, '').replace(/<html[^>]*>\s*/i, '').replace(/<\/?head>\s*/gi, '')
  .replace(/<body[^>]*>\s*/i, '').replace(/<\/body>\s*<\/html>\s*$/i, '')
  .replace(/<meta charset="utf-8">\s*/i, '').replace(/<meta name="viewport"[^>]*>\s*/i, '');
writeFileSync(`${out}/index.html`, html);
console.log('preview built in', out);
