// Writes the default Arabic strings from i18n.js into the static HTML
// (no blank flash before JS, readable without JS, better SEO). Safe to re-run.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';

const ctx = { window: {}, localStorage: { getItem: () => null, setItem() {} },
  document: { documentElement: {}, querySelectorAll: () => [] }, CustomEvent: class {} };
vm.createContext(ctx);
vm.runInContext(readFileSync('website/assets/js/i18n.js', 'utf8'), ctx);
const ar = ctx.window.AG_I18N.dict.ar;
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

for (const f of readdirSync('website').filter(f => f.endsWith('.html'))) {
  const path = `website/${f}`;
  let html = readFileSync(path, 'utf8');
  // <tag ... data-i18n="key" ...>anything-without-tags</tag>
  html = html.replace(/(<(\w+)[^>]*\sdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g,
    (m, open, tag, key, _old, close) => (ar[key] ? open + esc(ar[key]) + close : m));
  // data-i18n-attr="aria-label:key,placeholder:key2" → also write the attributes
  html = html.replace(/<[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tagStr, spec) => {
    for (const pair of spec.split(',')) {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (!ar[key]) continue;
      const re = new RegExp(`\\s${attr}="[^"]*"`);
      tagStr = re.test(tagStr) ? tagStr.replace(re, ` ${attr}="${esc(ar[key])}"`) : tagStr.replace(/\sdata-i18n-attr=/, ` ${attr}="${esc(ar[key])}" data-i18n-attr=`);
    }
    return tagStr;
  });
  writeFileSync(path, html);
  console.log('prerendered', f);
}
