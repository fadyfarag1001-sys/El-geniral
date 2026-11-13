// Copies GSAP + ScrollTrigger from node_modules into the static site,
// so the website works offline / over the local network with no CDN.
import { copyFileSync, mkdirSync } from 'node:fs';
const out = 'website/assets/vendor';
mkdirSync(out, { recursive: true });
for (const f of ['gsap.min.js', 'ScrollTrigger.min.js']) {
  copyFileSync(`node_modules/gsap/dist/${f}`, `${out}/${f}`);
  console.log('copied', f);
}
