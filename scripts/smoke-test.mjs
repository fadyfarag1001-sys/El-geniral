// End-to-end smoke test (Playwright, preinstalled Chromium). Starts a static server,
// emulates an iPhone + a desktop, and exercises the main flows. Exit code 1 on failure.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');

const root = 'website';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let p = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (p.endsWith('/')) p += 'index.html';
  try { const body = await readFile(join(root, p)); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404); res.end('not found'); }
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
const shots = process.env.SHOTS_DIR;
const fails = [];
const check = (cond, msg) => { if (!cond) fails.push(msg); console.log(`${cond ? '✓' : '✗'} ${msg}`); };

const browser = await chromium.launch();
async function ctxFor(device) {
  const ctx = await browser.newContext(device);
  // Google Fonts may be unreachable in CI — don't let that fail the test.
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  return ctx;
}
function watch(page, label) {
  page.on('pageerror', e => fails.push(`${label}: page error ${e.message}`));
  page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_FAILED/.test(m.text())) fails.push(`${label}: console ${m.text()}`); });
}

for (const [label, device] of [['iPhone 13', devices['iPhone 13']], ['Desktop', { viewport: { width: 1440, height: 900 } }]]) {
  const W = device.viewport.width; // the page must never stretch past the real screen width
  console.log(`\n— ${label}`);
  const ctx = await ctxFor(device);
  const page = await ctx.newPage(); watch(page, label);
  await page.goto(`${base}/index.html`, { waitUntil: 'load' });
  await page.waitForSelector('#product-grid .card', { state: 'attached' });
  check(await page.locator('#product-grid .card').count() === 4, 'home shows the 4 products');
  check(await page.evaluate(w => window.innerWidth <= w && document.documentElement.scrollWidth <= w, W), 'no horizontal scroll on home (page = screen width)');
  check(await page.evaluate(() => typeof window.gsap === 'object' && typeof window.ScrollTrigger === 'function'), 'GSAP + ScrollTrigger loaded');
  check((await page.locator('.card__price').first().textContent()).includes('[السعر]'), 'prices stay as [السعر] placeholders (none invented)');
  if (shots) { await page.waitForTimeout(2200); await page.screenshot({ path: `${shots}/${label}-home.png` }); }

  // filters (let the page's smooth scroll settle before clicking)
  await page.evaluate(() => document.querySelector('#collection').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(900);
  await page.click('.chip[data-filter="women"]');
  check(await page.locator('.empty-state').isVisible(), 'women filter shows the Madame General “coming soon” state');
  await page.click('.chip[data-filter="all"]');
  await page.goto(`${base}/index.html#men`);
  await page.waitForSelector('#product-grid .card', { state: 'attached' });
  check(await page.locator('#product-grid .card').count() === 1 && await page.locator('.chip[data-filter="men"][aria-pressed="true"]').count() === 1, 'nav link #men opens the collection filtered');

  // menu (mobile) / nav
  if (label === 'iPhone 13') {
    await page.click('[data-action="menu"]');
    await page.waitForTimeout(450);
    check(await page.locator('#drawer.is-open').count() === 1, 'mobile menu opens');
    await page.keyboard.press('Escape');
    check(await page.locator('#drawer.is-open').count() === 0, 'mobile menu closes with Escape');
  }

  // search
  await page.click('[data-action="search"]');
  await page.fill('#search-input', 'خشبي');
  check((await page.locator('#search-results a').count()) === 1, 'search finds COMMANDER by family “خشبي”');
  await page.keyboard.press('Escape');

  // add to cart from grid
  await page.click('[data-add="commander"]');
  await page.waitForTimeout(200);
  check((await page.locator('[data-cart-count]').first().innerText()).trim() === '(١)', 'cart badge updates to (1) (Arabic numerals)');
  check(await page.locator('.toast').count() >= 1, 'toast confirms add to cart');

  // language switch
  const switchLang = async () => {
    if (label === 'iPhone 13') { await page.click('[data-action="menu"]'); await page.waitForTimeout(450); await page.click('.drawer [data-action="lang"]'); await page.keyboard.press('Escape'); }
    else await page.click('.header-actions [data-action="lang"]');
  };
  await switchLang();
  check(await page.evaluate(() => document.documentElement.dir === 'ltr' && document.documentElement.lang === 'en'), 'EN switch flips to LTR English');
  check((await page.locator('#col-title').textContent()).includes('Arsenal'), 'section titles translate');
  await switchLang();
  check(await page.evaluate(() => document.documentElement.dir === 'rtl'), 'back to Arabic RTL');

  // product page
  await page.goto(`${base}/product.html#sniper`);
  await page.waitForSelector('.pdp h1');
  check((await page.locator('.pdp h1').innerText()).trim() === 'SNIPER', 'product page reads #id');
  await page.check('#st-elite');
  check(await page.locator('#st-elite').isChecked(), 'Elite strength selectable');
  check((await page.locator('#opt-note').innerText()).includes('أجمد'), 'strength note updates');
  await page.check('#size-50');
  await page.click('[data-qty="1"]');
  check((await page.locator('.qty output').innerText()).trim() === '2', 'quantity +/- works');
  await page.click('.thumb[data-view="box"]');
  check(await page.locator('.pdp__panel[data-panel="box"].is-active').count() === 1, 'gallery thumbnails switch view');
  await page.click('#add-btn');
  check(await page.evaluate(() => JSON.parse(localStorage.getItem('ag-cart-v1')).some(i => i.id === 'sniper' && i.strength === 'elite' && i.size === '50' && i.qty === 2)), 'product added with chosen strength/size/qty');
  check(await page.evaluate(w => window.innerWidth <= w && document.documentElement.scrollWidth <= w, W), 'no horizontal scroll on product (page = screen width)');
  if (shots) { await page.waitForTimeout(600); await page.screenshot({ path: `${shots}/${label}-product.png` }); }
  await page.goto(`${base}/product.html?id=nope`);
  await page.waitForSelector('text=العطر ده مش موجود');
  check(await page.locator('text=العطر ده مش موجود').count() === 1, 'unknown product shows a friendly not-found');

  // cart
  await page.goto(`${base}/cart.html`);
  await page.waitForSelector('.line');
  check(await page.locator('.line').count() === 2, 'cart lists both lines');
  check((await page.locator('.sum-row--total').innerText()).includes('[الإجمالي]'), 'total stays a placeholder until prices exist');
  await page.fill('#promo', 'GENERAL10'); await page.click('#promo-form button');
  check((await page.locator('#promo-msg').innerText()).includes('مش شغال'), 'promo codes are not faked (no live codes)');
  const line = page.locator('.line').first();
  await line.locator('[data-step="1"]').click();
  check((await page.locator('.line').first().locator('output').innerText()).trim() === '2', 'cart quantity increments');
  if (shots) await page.screenshot({ path: `${shots}/${label}-cart.png`, fullPage: false });
  await page.click('#to-checkout');
  await page.click('#checkout button[type="submit"]');
  check(await page.locator('#co-phone[aria-invalid="true"]').count() === 1, 'checkout validates fields');
  await page.fill('#co-name', 'Test'); await page.fill('#co-phone', '01012345678'); await page.fill('#co-gov', 'القاهرة'); await page.fill('#co-address', 'شارع التجربة 1');
  await page.click('#checkout button[type="submit"]');
  check(await page.locator('#order-done').waitFor({ state: 'visible', timeout: 4000 }).then(() => true, () => false), 'checkout shows the order summary');
  await page.locator('.line').last().locator('[data-remove]').click();
  await page.waitForTimeout(450);
  check(await page.locator('.line').count() === 1, 'remove line works');

  // help
  await page.goto(`${base}/help.html#returns`);
  check(await page.locator('#returns').waitFor({ state: 'visible', timeout: 4000 }).then(() => true, () => false), 'help page + footer anchors work');
  await ctx.close();
}

// reduced motion: content must be visible immediately
const rctx = await ctxFor({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const rp = await rctx.newPage(); watch(rp, 'reduced-motion');
await rp.goto(`${base}/index.html`); await rp.waitForSelector('#product-grid .card', { state: 'attached' });
check(await rp.evaluate(() => getComputedStyle(document.querySelector('#strength .section-head')).opacity === '1'), 'reduced motion: content visible without animation');
await rctx.close();

await browser.close(); server.close();
if (fails.length) { console.error('\nFAILURES:\n' + fails.join('\n')); process.exit(1); }
console.log('\nAll smoke tests passed.');
