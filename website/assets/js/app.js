/* Al General — shared chrome (header, drawer, search, footer, toasts) + page logic. */
(function () {
  const D = window.AG_DATA, I = window.AG_I18N, S = window.AG_STORE;
  const { t } = I;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const page = document.body.dataset.page || 'home'; // preview hosts may replace <body>; home has no attribute then
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ph = (val, key) => (val == null || val === '' ? `<span class="ph">${esc(t(key))}</span>` : esc(val));
  const phText = (val, key) => (val == null || val === '' ? t(key) : String(val));

  /* ---------- logo + icon sprite ---------- */
  const LAUREL = `<polyline points="162.7,224.4 168.6,222.0 174.4,219.2 179.9,216.0 185.3,212.5 190.4,208.6 195.2,204.4 199.7,199.9 204.0,195.1 207.8,190.0 211.4,184.6 214.5,179.0 217.3,173.3 219.7,167.3 221.7,161.2 223.3,155.0 224.4,148.7 225.2,142.4 225.5,136.0 225.3,129.6 224.8,123.2 223.8,116.8 222.4,110.6 220.6,104.4 218.3,98.4 215.7,92.6 212.7,86.9 209.3,81.5 205.5,76.3 201.5,71.4 197.1,66.7 192.3,62.4 187.4,58.4 182.1,54.7 176.6,51.4 170.9,48.4 165.1,45.9 159.0,43.7 152.8,42.0 146.6,40.7" stroke="currentColor" stroke-width="2" fill="none"/><ellipse cx="189.6" cy="217.3" rx="11.7" ry="4.68" transform="rotate(4.0 189.6 217.3)" fill="currentColor"/><ellipse cx="183.4" cy="206.9" rx="11.7" ry="4.68" transform="rotate(-66.0 183.4 206.9)" fill="currentColor"/><ellipse cx="212.6" cy="194.4" rx="11.7" ry="4.68" transform="rotate(-14.3 212.6 194.4)" fill="currentColor"/><ellipse cx="203.4" cy="186.5" rx="11.7" ry="4.68" transform="rotate(-84.3 203.4 186.5)" fill="currentColor"/><ellipse cx="227.1" cy="165.5" rx="11.7" ry="4.68" transform="rotate(-32.6 227.1 165.5)" fill="currentColor"/><ellipse cx="216.0" cy="160.8" rx="11.7" ry="4.68" transform="rotate(-102.6 216.0 160.8)" fill="currentColor"/><ellipse cx="231.9" cy="133.4" rx="11.7" ry="4.68" transform="rotate(-50.9 231.9 133.4)" fill="currentColor"/><ellipse cx="219.8" cy="132.5" rx="11.7" ry="4.68" transform="rotate(-120.9 219.8 132.5)" fill="currentColor"/><ellipse cx="226.3" cy="101.5" rx="11.7" ry="4.68" transform="rotate(-69.1 226.3 101.5)" fill="currentColor"/><ellipse cx="214.6" cy="104.5" rx="11.7" ry="4.68" transform="rotate(-139.1 214.6 104.5)" fill="currentColor"/><ellipse cx="211.0" cy="72.9" rx="11.7" ry="4.68" transform="rotate(-87.4 211.0 72.9)" fill="currentColor"/><ellipse cx="200.9" cy="79.4" rx="11.7" ry="4.68" transform="rotate(-157.4 200.9 79.4)" fill="currentColor"/><ellipse cx="187.6" cy="50.6" rx="11.7" ry="4.68" transform="rotate(-105.7 187.6 50.6)" fill="currentColor"/><ellipse cx="179.9" cy="60.0" rx="11.7" ry="4.68" transform="rotate(-175.7 179.9 60.0)" fill="currentColor"/><ellipse cx="158.3" cy="36.8" rx="11.7" ry="4.68" transform="rotate(-124.0 158.3 36.8)" fill="currentColor"/><ellipse cx="154.0" cy="48.1" rx="11.7" ry="4.68" transform="rotate(-194.0 154.0 48.1)" fill="currentColor"/><polyline points="97.3,224.4 91.4,222.0 85.6,219.2 80.1,216.0 74.7,212.5 69.6,208.6 64.8,204.4 60.3,199.9 56.0,195.1 52.2,190.0 48.6,184.6 45.5,179.0 42.7,173.3 40.3,167.3 38.3,161.2 36.7,155.0 35.6,148.7 34.8,142.4 34.5,136.0 34.7,129.6 35.2,123.2 36.2,116.8 37.6,110.6 39.4,104.4 41.7,98.4 44.3,92.6 47.3,86.9 50.7,81.5 54.5,76.3 58.5,71.4 62.9,66.7 67.7,62.4 72.6,58.4 77.9,54.7 83.4,51.4 89.1,48.4 94.9,45.9 101.0,43.7 107.2,42.0 113.4,40.7" stroke="currentColor" stroke-width="2" fill="none"/><ellipse cx="76.6" cy="206.9" rx="11.7" ry="4.68" transform="rotate(-114.0 76.6 206.9)" fill="currentColor"/><ellipse cx="70.4" cy="217.3" rx="11.7" ry="4.68" transform="rotate(-184.0 70.4 217.3)" fill="currentColor"/><ellipse cx="56.6" cy="186.5" rx="11.7" ry="4.68" transform="rotate(-95.7 56.6 186.5)" fill="currentColor"/><ellipse cx="47.4" cy="194.4" rx="11.7" ry="4.68" transform="rotate(-165.7 47.4 194.4)" fill="currentColor"/><ellipse cx="44.0" cy="160.8" rx="11.7" ry="4.68" transform="rotate(-77.4 44.0 160.8)" fill="currentColor"/><ellipse cx="32.9" cy="165.5" rx="11.7" ry="4.68" transform="rotate(-147.4 32.9 165.5)" fill="currentColor"/><ellipse cx="40.2" cy="132.5" rx="11.7" ry="4.68" transform="rotate(-59.1 40.2 132.5)" fill="currentColor"/><ellipse cx="28.1" cy="133.4" rx="11.7" ry="4.68" transform="rotate(-129.1 28.1 133.4)" fill="currentColor"/><ellipse cx="45.4" cy="104.5" rx="11.7" ry="4.68" transform="rotate(-40.9 45.4 104.5)" fill="currentColor"/><ellipse cx="33.7" cy="101.5" rx="11.7" ry="4.68" transform="rotate(-110.9 33.7 101.5)" fill="currentColor"/><ellipse cx="59.1" cy="79.4" rx="11.7" ry="4.68" transform="rotate(-22.6 59.1 79.4)" fill="currentColor"/><ellipse cx="49.0" cy="72.9" rx="11.7" ry="4.68" transform="rotate(-92.6 49.0 72.9)" fill="currentColor"/><ellipse cx="80.1" cy="60.0" rx="11.7" ry="4.68" transform="rotate(-4.3 80.1 60.0)" fill="currentColor"/><ellipse cx="72.4" cy="50.6" rx="11.7" ry="4.68" transform="rotate(-74.3 72.4 50.6)" fill="currentColor"/><ellipse cx="106.0" cy="48.1" rx="11.7" ry="4.68" transform="rotate(14.0 106.0 48.1)" fill="currentColor"/><ellipse cx="101.7" cy="36.8" rx="11.7" ry="4.68" transform="rotate(-56.0 101.7 36.8)" fill="currentColor"/><polygon points="130.0,14.8 131.8,20.8 137.4,17.8 134.3,23.4 140.4,25.2 134.3,27.0 137.4,32.5 131.8,29.5 130.0,35.6 128.2,29.5 122.6,32.5 125.7,27.0 119.6,25.2 125.7,23.4 122.6,17.8 128.2,20.8" fill="currentColor"/><circle cx="130.0" cy="130.0" r="73.008" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="130.0" cy="130.0" r="65.52" stroke="currentColor" stroke-width="1" fill="none" opacity=".6"/><text x="130.0" y="154.336" text-anchor="middle" font-family="Cinzel, serif" font-size="73" letter-spacing="-9" fill="currentColor">AG</text>`;
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <symbol id="logo" viewBox="0 0 260 260">${LAUREL}</symbol>
  <symbol id="i-cart" viewBox="0 0 24 24"><path d="M5 8h14l-1.5 12h-11z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12l4 4 10-10"/></symbol>
  <symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></symbol>
  <symbol id="i-card" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="1"/><path d="M3 10h18"/></symbol>
  <symbol id="i-return" viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v4h4"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.5l2.6 6.3 6.6.4-5.1 4.2 1.7 6.6L12 16.4l-5.8 3.6 1.7-6.6L2.8 9.2l6.6-.4z" fill="currentColor" stroke="none"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></symbol>
  <symbol id="i-box" viewBox="0 0 24 24"><path d="M4 8h16v12H4z"/><path d="M3 5h18v3H3z"/><path d="M12 8v12"/></symbol>
  <symbol id="i-hourglass" viewBox="0 0 24 24"><path d="M7 3h10M7 21h10"/><path d="M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9"/></symbol>
  <symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></symbol>
</svg>`;
  const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;
  window.AG_ICON = icon;

  /* ---------- chrome ---------- */
  const navItems = [
    ['nav.home', 'index.html#top'], ['nav.collection', 'index.html#collection'], ['nav.elite', 'index.html#strength'],
    ['nav.men', 'index.html#men'], ['nav.women', 'index.html#women'], ['nav.about', 'index.html#house']
  ];
  const navLinks = navItems.map(([k, href]) => `<li><a href="${href}" data-i18n="${k}"></a></li>`).join('');

  function renderChrome() {
    document.body.insertAdjacentHTML('afterbegin', sprite + `<a class="skip-link" href="#main" data-i18n="skip"></a>`);
    const top = $('[data-slot="topbar"]');
    if (top) top.outerHTML = `<div class="topbar" data-i18n="topbar"></div>`;
    const header = $('[data-slot="header"]');
    if (header) header.outerHTML = `
<header class="site-header" id="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="index.html" aria-label="${esc(t('brand.full'))}" data-i18n-attr="aria-label:brand.full">
      <svg class="brand__mark" aria-hidden="true" focusable="false"><use href="#logo"/></svg>
      <span class="brand__text"><span class="brand__ar" data-i18n="brand.ar"></span><span class="brand__en">AL GENERAL PARFUMS</span></span>
    </a>
    <nav class="primary-nav" data-i18n-attr="aria-label:nav.label"><ul>${navLinks}</ul></nav>
    <div class="header-actions">
      <button type="button" class="icon-btn lang-btn" data-action="lang" data-i18n="lang.switch" data-i18n-attr="aria-label:lang.label"></button>
      <button type="button" class="icon-btn" data-action="search" data-i18n-attr="aria-label:search.open">${icon('i-search')}</button>
      <a class="cart-btn" href="cart.html" data-cart-link>${icon('i-cart')}<span class="cart-btn__label" data-i18n="cart.short"></span><span class="cart-count" data-cart-count>0</span></a>
      <button type="button" class="icon-btn menu-btn" data-action="menu" aria-controls="drawer" aria-expanded="false" data-i18n-attr="aria-label:nav.menu">${icon('i-menu')}</button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer__scrim" data-action="close-menu"></div>
  <div class="drawer__panel" role="dialog" aria-modal="true" data-i18n-attr="aria-label:nav.label">
    <div class="drawer__head">
      <span class="brand"><svg class="brand__mark" aria-hidden="true"><use href="#logo"/></svg><span class="brand__text"><span class="brand__ar" data-i18n="brand.ar"></span><span class="brand__en">AL GENERAL PARFUMS</span></span></span>
      <button type="button" class="icon-btn" data-action="close-menu" data-i18n-attr="aria-label:nav.close">${icon('i-close')}</button>
    </div>
    <nav data-i18n-attr="aria-label:nav.label"><ul>${navLinks}</ul></nav>
    <div class="drawer__foot">
      <button type="button" class="btn btn--outline" data-action="lang" data-i18n="lang.switch"></button>
      <span data-i18n="topbar"></span>
    </div>
  </div>
</div>
<dialog class="search-dialog" id="search-dialog" data-i18n-attr="aria-label:search.label">
  <form method="dialog" class="search-dialog__bar" role="search">
    ${icon('i-search')}
    <label class="visually-hidden" for="search-input" data-i18n="search.label"></label>
    <input id="search-input" type="search" autocomplete="off" enterkeyhint="search" data-i18n-attr="placeholder:search.placeholder">
    <button type="submit" class="icon-btn" data-i18n-attr="aria-label:search.close">${icon('i-close')}</button>
  </form>
  <ul class="search-results" id="search-results" aria-live="polite"></ul>
</dialog>
<div class="toast-region" aria-live="polite" aria-atomic="true"></div>`;

    const footer = $('[data-slot="footer"]');
    const soc = D.settings.social;
    const socialItem = (label, url) => url
      ? `<li><a href="${esc(url)}" target="_blank" rel="noopener">${label}</a></li>`
      : `<li><span class="soon">${label}<small data-i18n="footer.soon"></small></span></li>`;
    if (footer) footer.outerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <svg class="brand__mark" aria-hidden="true"><use href="#logo"/></svg>
        <strong style="font-family:var(--font-display);font-size:26px" data-i18n="brand.full"></strong>
        <p data-i18n="footer.tagline"></p>
      </div>
      <nav class="footer-cols" data-i18n-attr="aria-label:footer.links">
        <div><h2 data-i18n="footer.shop"></h2><ul>
          <li><a href="index.html#men" data-i18n="nav.men"></a></li>
          <li><a href="index.html#women" data-i18n="nav.women"></a></li>
          <li><a href="index.html#strength" data-i18n="nav.elite"></a></li></ul></div>
        <div><h2 data-i18n="footer.help"></h2><ul>
          <li><a href="help.html#shipping" data-i18n="footer.shipping"></a></li>
          <li><a href="help.html#returns" data-i18n="footer.returns"></a></li>
          <li><a href="help.html#contact" data-i18n="footer.contact"></a></li></ul></div>
        <div><h2 data-i18n="footer.follow"></h2><ul>
          ${socialItem('Instagram', soc.instagram)}${socialItem('TikTok', soc.tiktok)}${socialItem('WhatsApp', soc.whatsapp)}</ul></div>
      </nav>
    </div>
    <div class="footer-bottom"><p data-i18n="footer.disclaimer"></p><p data-i18n="footer.rights"></p></div>
  </div>
</footer>`;
  }

  /* ---------- header behaviour ---------- */
  function initHeader() {
    const header = $('#site-header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    }
    // Mark current page in nav.
    $$('.primary-nav a, .drawer nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (page === 'home' && href === 'index.html#top') a.setAttribute('aria-current', 'page');
    });

    const drawer = $('#drawer'), menuBtn = $('[data-action="menu"]');
    let lastFocus = null;
    const openMenu = () => {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden';
      setTimeout(() => $('[data-action="close-menu"].icon-btn', drawer).focus(), 50);
    };
    const closeMenu = () => {
      drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    drawer.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') { // keep focus inside the open drawer
        const f = $$('a, button', $('.drawer__panel', drawer)); const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $$('.drawer nav a').forEach(a => a.addEventListener('click', closeMenu));

    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const a = btn.dataset.action;
      if (a === 'menu') openMenu();
      else if (a === 'close-menu') closeMenu();
      else if (a === 'lang') I.setLang(I.lang === 'ar' ? 'en' : 'ar');
      else if (a === 'search') openSearch();
    });
    document.addEventListener('keydown', e => {
      if ((e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault(); openSearch();
      }
    });
  }

  /* ---------- search ---------- */
  function openSearch() {
    const dlg = $('#search-dialog'), input = $('#search-input');
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    input.value = ''; renderResults(''); setTimeout(() => input.focus(), 30);
  }
  function renderResults(q) {
    const list = $('#search-results');
    const n = q.trim().toLowerCase();
    if (!n) { list.innerHTML = `<li class="search-hint">${esc(t('search.hint'))}</li>`; return; }
    const hits = D.products.filter(p => [p.name, p.no, p.nameAr, p.family.ar, p.family.en, `no.${p.no}`]
      .filter(Boolean).join(' ').toLowerCase().includes(n));
    list.innerHTML = hits.length ? hits.map(p => `<li><a href="product.html#${p.id}">${S.bottleSVG(p, { size: 'xs', label: false })}
      <span><span class="latin">${esc(p.name)} No.${p.no}</span><small>${esc(p.family[I.lang])}</small></span></a></li>`).join('')
      : `<li class="search-hint">${esc(t('search.empty'))}</li>`;
  }
  function initSearch() {
    const input = $('#search-input'), dlg = $('#search-dialog');
    input.addEventListener('input', () => renderResults(input.value));
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    input.addEventListener('keydown', e => {
      // type=search swallows the first Escape (it clears the text) — close the dialog in one press.
      if (e.key === 'Escape') { e.preventDefault(); dlg.close(); return; }
      if (e.key === 'Enter') { const first = $('#search-results a'); if (first) { e.preventDefault(); location.href = first.href; } }
    });
  }

  /* ---------- cart badge + toast ---------- */
  function updateCount() {
    const n = S.cart.count();
    $$('[data-cart-count]').forEach(el => { el.textContent = new Intl.NumberFormat(I.lang === 'ar' ? 'ar-EG' : 'en').format(n); });
    $$('[data-cart-link]').forEach(el => el.setAttribute('aria-label', t('cart.label', { n })));
  }
  function toast(msg) {
    const region = $('.toast-region');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${icon('i-check')}<span>${esc(msg)}</span><a href="cart.html">${esc(t('toast.view'))}</a>`;
    region.appendChild(el);
    window.AG_MOTION?.toastIn(el);
    setTimeout(() => { (window.AG_MOTION?.toastOut(el) || Promise.resolve()).then(() => el.remove()); }, 3200);
  }
  function addToCart(id, opts, sourceEl) {
    S.cart.add(id, opts);
    const p = S.byId(id);
    toast(t('toast.added', { name: `${p.name} No.${p.no}` }));
    window.AG_MOTION?.bump($$('[data-cart-count]'), sourceEl);
  }

  /* ---------- product card ---------- */
  const inspiredLine = p => `<div class="card__meta">${esc(t('card.inspired', { name: '' }).trim())} ${ph(p.inspiredBy, 'ph.original')}</div>`;
  function card(p) {
    const from = S.fromPrice(p);
    return `<article class="card" data-audience="${p.audience || ''}">
  <div class="card__media">
    ${p.badge ? `<span class="badge">${esc(t('badge.' + p.badge))}</span>` : ''}
    ${S.bottleSVG(p)}
    <span class="card__no">No.${p.no}</span>
  </div>
  <div class="card__body">
    <h3 class="card__name"><a href="product.html#${p.id}" aria-label="${esc(t('card.view', { name: p.name }))}">${esc(p.name)}</a></h3>
    ${inspiredLine(p)}
    <div class="card__family">${esc(p.family[I.lang])} · ${esc(t('card.ml'))}</div>
    <div class="card__foot">
      <span class="card__price">${from == null ? `<span class="ph">${esc(t('ph.price'))}</span> ${esc(D.currency[I.lang])}` : esc(S.fmt(from))}</span>
      <button type="button" class="btn btn--gold card__add" data-add="${p.id}">${esc(t('card.add'))}</button>
    </div>
  </div>
</article>`;
  }

  /* ================= HOME ================= */
  function initHome() {
    const grid = $('#product-grid'), status = $('#filter-status');
    // Filters deep-link with a plain hash (#men, #women, #unisex) — works on any host, incl. the preview frame.
    const FILTERS = ['men', 'women', 'unisex'];
    const fromHash = () => { const h = location.hash.slice(1); return FILTERS.includes(h) ? h : null; };
    let filter = fromHash() || (FILTERS.includes(new URLSearchParams(location.search).get('filter')) ? new URLSearchParams(location.search).get('filter') : 'all');
    const goToCollection = () => $('#collection').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    window.addEventListener('hashchange', () => { const f = fromHash(); if (f) { filter = f; render(true); goToCollection(); } });
    if (fromHash()) requestAnimationFrame(goToCollection);

    function render(animate) {
      const list = filter === 'all' ? D.products : D.products.filter(p => p.audience === filter);
      grid.innerHTML = list.length ? list.map(card).join('')
        : `<div class="empty-state"><strong>${filter === 'women' ? 'MADAME GENERAL' : 'COMING SOON'}</strong>${esc(t(filter === 'women' ? 'filter.empty.women' : 'filter.empty'))}</div>`;
      status.textContent = t('filter.count', { n: new Intl.NumberFormat(I.lang === 'ar' ? 'ar-EG' : 'en').format(list.length) });
      $$('.chip').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === filter)));
      if (animate) window.AG_MOTION?.gridIn(grid);
    }
    $$('.chip').forEach(c => c.addEventListener('click', () => {
      filter = c.dataset.filter;
      try { history.replaceState(null, '', filter === 'all' ? location.pathname + location.search : '#' + filter); } catch (e) { /* sandboxed frame */ }
      render(true);
    }));
    grid.addEventListener('click', e => {
      const b = e.target.closest('[data-add]');
      if (b) addToCart(b.dataset.add, { strength: 'standard', size: '100' }, b);
    });
    render(false);
    document.addEventListener('ag:lang', () => { render(false); fillHomeSettings(); });
    fillHomeSettings();
  }
  function fillHomeSettings() {
    const weeks = phText(D.settings.agingWeeks, 'ph.weeks');
    const time = phText(D.settings.deliveryTime, 'ph.time');
    const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
    set('[data-fill="strength.copy"]', esc(t('strength.copy', { weeks })));
    set('[data-fill="craft.1.p"]', esc(t('craft.1.p', { weeks })));
    set('[data-fill="craft.3.p"]', esc(t('craft.3.p', { time })));
    const p0 = D.products[0];
    const stdFrom = D.products.map(S.fromPrice).filter(v => v != null);
    set('[data-fill="std.price"]', esc(t('std.price', { price: stdFrom.length ? S.fmt(Math.min(...stdFrom)) : S.fmt(null) })));
    const up = D.products.map(p => p.eliteUpgrade).filter(v => v != null);
    set('[data-fill="elite.price"]', esc(t('elite.price', { price: up.length && up.every(v => v === up[0]) ? S.fmt(up[0]) : S.fmt(null, 'ph.diff') })));
    void p0;
  }

  /* ================= PRODUCT ================= */
  function initProduct() {
    // Product id from the hash (#sniper); ?id= still accepted for old links.
    const id = location.hash.slice(1) || new URLSearchParams(location.search).get('id') || D.products[0].id;
    const p = S.byId(id);
    window.addEventListener('hashchange', () => location.reload());
    const root = $('#pdp');
    if (!p) {
      root.innerHTML = `<div class="empty-cart" style="margin-block:48px"><h1 data-i18n="pd.notfound"></h1><a class="btn btn--gold" href="index.html#collection" data-i18n="pd.back"></a></div>`;
      I.apply(root); return;
    }
    const state = { strength: 'standard', size: '100', qty: 1, view: 'bottle' };

    function priceOf() { return S.unitPrice({ id: p.id, strength: state.strength, size: state.size }); }
    function render() {
      document.title = t('meta.product', { name: `${p.name} No.${p.no}` });
      const weeks = phText(D.settings.agingWeeks, 'ph.weeks');
      const time = phText(D.settings.deliveryTime, 'ph.time');
      const ex = phText(D.settings.exchangeWindow, 'ph.time');
      const audienceLabel = p.audience ? t('filter.' + p.audience) : null;
      const sub = [p.nameAr && I.lang === 'ar' ? p.nameAr : null, audienceLabel].filter(Boolean).join(' — ');
      const sizeBtn = s => `<div class="size"><input type="radio" name="size" id="size-${s}" value="${s}" ${state.size === s ? 'checked' : ''}><label for="size-${s}">${esc(t('size.' + s))}</label></div>`;
      const qtyLabel = t('qty.label', { n: state.qty });
      root.innerHTML = `
<nav class="breadcrumbs container" aria-label="${esc(t('pd.crumbs'))}"><ol>
  <li><a href="index.html">${esc(t('nav.home'))}</a></li>
  <li><a href="index.html#collection">${esc(t('nav.collection'))}</a></li>
  <li><span aria-current="page" class="latin" style="letter-spacing:.08em">${esc(p.name)} No.${p.no}</span></li></ol></nav>
<section class="container pdp">
  <div class="pdp__gallery">
    <div class="pdp__stage" id="stage">
      ${p.badge ? `<span class="badge">${esc(t('badge.' + p.badge))}</span>` : ''}
      <div class="pdp__panel ${state.view === 'bottle' ? 'is-active' : ''}" data-panel="bottle">${S.bottleSVG(p, { size: 'lg' })}</div>
      <div class="pdp__panel ${state.view === 'box' ? 'is-active' : ''}" data-panel="box">${boxSVG()}</div>
      <div class="pdp__panel ${state.view === 'life' ? 'is-active' : ''}" data-panel="life"><p class="ph">${esc(t('pd.g.life'))}</p><p>${esc(t('pd.g.soon'))}</p></div>
      <div class="pdp__panel ${state.view === 'video' ? 'is-active' : ''}" data-panel="video"><p class="ph">${esc(t('pd.g.video'))}</p><p>${esc(t('pd.g.soon'))}</p></div>
      <span class="pdp__stage-meta">No.${p.no} · 100 ML · EDP</span>
    </div>
    <div class="thumbs" role="tablist" aria-label="${esc(t('pd.gallery'))}">
      ${[['bottle', 'pd.g.bottle', S.bottleSVG(p, { size: 'xs', label: false })], ['box', 'pd.g.box', icon('i-box')], ['life', 'pd.g.life', esc(t('pd.g.life'))], ['video', 'pd.g.video', esc(t('pd.g.video'))]]
        .map(([v, k, inner]) => `<button type="button" class="thumb" role="tab" data-view="${v}" aria-selected="${state.view === v}" aria-label="${esc(t(k))}">${inner}</button>`).join('')}
    </div>
  </div>
  <div class="pdp__info">
    <div class="pdp__title">
      <span class="eyebrow">${esc(t('pd.codename', { no: p.no }))}</span>
      <h1>${esc(p.name)}</h1>
      ${sub ? `<p class="pdp__sub">${esc(sub)}</p>` : ''}
      <p class="pdp__inspired">${esc(t('card.inspired', { name: '' }).trim())} <strong>${ph(p.inspiredBy, 'ph.original')}</strong></p>
      <p class="card__family">${esc(p.family[I.lang])}</p>
    </div>
    <div class="pdp__price" aria-live="polite" id="price">${priceHTML(priceOf())}</div>
    <p class="pdp__desc">${ph(p.description, 'ph.desc')}</p>
    <div class="aged-pill">${icon('i-check')}<span>${esc(t('pd.aged', { weeks }))}</span></div>
    <fieldset>
      <legend>${esc(t('pd.strength'))}</legend>
      <div class="opts">
        <div class="opt"><input type="radio" name="strength" id="st-standard" value="standard" ${state.strength === 'standard' ? 'checked' : ''}>
          <label for="st-standard"><span class="latin">STANDARD</span><strong>${esc(t('std.name'))}</strong><small>${esc(t('pd.std.sub'))}</small><b>${priceHTML(S.unitPrice({ id: p.id, strength: 'standard', size: state.size }))}</b></label></div>
        <div class="opt opt--elite"><input type="radio" name="strength" id="st-elite" value="elite" ${state.strength === 'elite' ? 'checked' : ''}>
          <label for="st-elite"><span class="latin"><svg class="icon star" style="width:12px;height:12px;display:inline;vertical-align:-1px" aria-hidden="true"><use href="#i-star"/></svg> GENERAL ELITE</span><strong>${esc(t('elite.name'))}</strong><small>${esc(t('pd.elite.sub'))}</small><b>+ ${p.eliteUpgrade == null ? `<span class="ph">${esc(t('ph.diff'))}</span> ${esc(D.currency[I.lang])}` : esc(S.fmt(p.eliteUpgrade))}</b></label></div>
      </div>
      <p class="opt-note" aria-live="polite" id="opt-note">${esc(t(state.strength === 'elite' ? 'pd.elite.note' : 'pd.std.note'))}</p>
    </fieldset>
    <fieldset><legend>${esc(t('pd.size'))}</legend><div class="sizes">${D.sizes.map(sizeBtn).join('')}</div></fieldset>
    <div class="buy-row">
      <div class="qty" role="group" aria-label="${esc(t('pd.qty'))}">
        <button type="button" data-qty="1" aria-label="${esc(t('pd.inc'))}">${icon('i-plus')}</button>
        <output aria-live="polite" aria-label="${esc(qtyLabel)}">${state.qty}</output>
        <button type="button" data-qty="-1" aria-label="${esc(t('pd.dec'))}" ${state.qty <= 1 ? 'disabled' : ''}>${icon('i-minus')}</button>
      </div>
      <button type="button" class="btn btn--gold btn--lg" id="add-btn">${icon('i-cart')}${esc(t('pd.add'))}</button>
    </div>
    <button type="button" class="btn btn--outline btn--lg btn--block" id="buy-now">${esc(t('pd.buy'))}</button>
    <div class="assurances">
      <div>${icon('i-truck')}<span>${esc(t('pd.delivery', { time }))}</span></div>
      <div>${icon('i-card')}<span>${esc(t('pd.cod'))}</span></div>
      <div>${icon('i-return')}<span>${esc(t('pd.exchange', { time: ex }))}</span></div>
    </div>
  </div>
</section>
<section class="section section--raised">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">${esc(t('pd.details.eyebrow'))}</span><h2>${esc(t('pd.details.title'))}</h2></div>
    <div class="notes-grid">
      ${[['TOP NOTES', 'pd.top', p.notes.top], ['HEART NOTES', 'pd.heart', p.notes.heart], ['BASE NOTES', 'pd.base', p.notes.base]]
        .map(([en, k, v]) => `<div class="note-card reveal"><span class="latin">${en}</span><h3>${esc(t(k))}</h3><p>${ph(v, 'ph.notes')}</p></div>`).join('')}
      <div class="note-card reveal"><dl>
        <div><dt>${esc(t('pd.longevity'))}</dt><dd>${ph(p.profile.longevity, 'ph.hours')}</dd></div>
        <div><dt>${esc(t('pd.projection'))}</dt><dd>${ph(p.profile.projection, 'ph.projection')}</dd></div>
        <div><dt>${esc(t('pd.season'))}</dt><dd>${ph(p.profile.season, 'ph.season')}</dd></div>
        <div><dt>${esc(t('pd.time'))}</dt><dd>${ph(p.profile.time, 'ph.daytime')}</dd></div>
      </dl></div>
    </div>
  </div>
</section>
<section class="section container">
  <div class="section-head reveal"><h2>${esc(t('pd.more'))}</h2></div>
  <div class="mini-grid">
    ${D.products.filter(x => x.id !== p.id).map(x => `<a class="mini reveal" href="product.html#${x.id}">${S.bottleSVG(x, { size: 'xs' })}
      <div><span class="latin">${esc(x.name)}</span><small>${esc(t('card.inspired', { name: '' }).trim())} ${ph(x.inspiredBy, 'ph.original')}</small><b>${priceHTML(S.fromPrice(x))}</b></div></a>`).join('')}
  </div>
</section>
<div class="sticky-buy" id="sticky-buy" aria-hidden="true">
  <div class="sticky-buy__info"><span class="latin">${esc(p.name)}</span><b>${priceHTML(priceOf())}</b></div>
  <button type="button" class="btn btn--gold" id="sticky-add" tabindex="-1">${icon('i-cart')}${esc(t('pd.add'))}</button>
</div>`;
      bind();
      window.AG_MOTION?.pageReveal(root);
    }
    function priceHTML(v) { return v == null ? `<span class="ph">${esc(t('ph.price'))}</span> ${esc(D.currency[I.lang])}` : esc(S.fmt(v)); }
    function refreshPrice() {
      $('#price').innerHTML = priceHTML(priceOf());
      $('.sticky-buy__info b').innerHTML = priceHTML(priceOf());
      $('#opt-note').textContent = t(state.strength === 'elite' ? 'pd.elite.note' : 'pd.std.note');
      $('label[for="st-standard"] b').innerHTML = priceHTML(S.unitPrice({ id: p.id, strength: 'standard', size: state.size }));
      window.AG_MOTION?.pulse($('#price'));
    }
    function bind() {
      $$('input[name="strength"]').forEach(r => r.addEventListener('change', () => { state.strength = r.value; refreshPrice(); }));
      $$('input[name="size"]').forEach(r => r.addEventListener('change', () => { state.size = r.value; refreshPrice(); }));
      $$('[data-qty]').forEach(b => b.addEventListener('click', () => {
        state.qty = Math.max(1, Math.min(99, state.qty + Number(b.dataset.qty)));
        const out = $('.qty output'); out.textContent = state.qty; out.setAttribute('aria-label', t('qty.label', { n: state.qty }));
        $('[data-qty="-1"]').disabled = state.qty <= 1;
      }));
      $$('.thumb').forEach(b => b.addEventListener('click', () => {
        state.view = b.dataset.view;
        $$('.thumb').forEach(x => x.setAttribute('aria-selected', String(x === b)));
        $$('.pdp__panel').forEach(x => x.classList.toggle('is-active', x.dataset.panel === state.view));
        window.AG_MOTION?.swap($(`.pdp__panel[data-panel="${state.view}"]`));
      }));
      const add = src => addToCart(p.id, { strength: state.strength, size: state.size, qty: state.qty }, src);
      $('#add-btn').addEventListener('click', e => add(e.currentTarget));
      $('#sticky-add').addEventListener('click', e => add(e.currentTarget));
      $('#buy-now').addEventListener('click', () => { S.cart.add(p.id, { strength: state.strength, size: state.size, qty: state.qty }); location.href = 'cart.html#checkout'; });
      // Mobile sticky add-to-cart once the main button scrolls away.
      const sticky = $('#sticky-buy');
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([en]) => {
          const show = !en.isIntersecting && en.boundingClientRect.top < 0;
          sticky.classList.toggle('is-visible', show); sticky.setAttribute('aria-hidden', String(!show));
          $('#sticky-add').tabIndex = show ? 0 : -1;
        }).observe($('#add-btn'));
      }
    }
    render();
    document.addEventListener('ag:lang', render);
  }
  function boxSVG() {
    // Simple illustration of the decided box: rigid two-piece, lift-off lid, gold edges + foil logo (olive palette).
    return `<svg class="box-illus" viewBox="0 0 240 260" role="img" aria-label="Al General box">
  <defs><linearGradient id="bx" x1="0" x2="1"><stop offset="0" stop-color="#1F2419"/><stop offset="1" stop-color="#161A12"/></linearGradient></defs>
  <ellipse cx="120" cy="250" rx="100" ry="6" fill="#000" opacity=".35"/>
  <path d="M40 70 L120 46 L200 70 L120 94 Z" fill="#2A3122" stroke="#C9A24A" stroke-width="1.2"/>
  <path d="M40 70 V100 L120 124 V94 Z" fill="#1F2419" stroke="#C9A24A" stroke-width="1.2"/>
  <path d="M200 70 V100 L120 124 V94 Z" fill="#161A12" stroke="#C9A24A" stroke-width="1.2"/>
  <path d="M46 104 V222 L120 246 V128 Z" fill="url(#bx)" stroke="#8F7433" stroke-width="1"/>
  <path d="M194 104 V222 L120 246 V128 Z" fill="#0F120C" stroke="#8F7433" stroke-width="1"/>
  <g transform="translate(83 150) skewY(18) scale(.28)" color="#C9A24A"><use href="#logo" width="130" height="130"/></g>
</svg>`;
  }

  /* ================= CART ================= */
  function initCart() {
    let promo = null;
    const view = $('#cart-view');

    function lineHTML(i) {
      const p = S.byId(i.id), key = S.cart.keyOf(i), u = S.unitPrice(i);
      return `<li class="line" data-key="${esc(key)}">
  <a class="line__media" href="product.html#${p.id}" tabindex="-1" aria-hidden="true">${S.bottleSVG(p, { size: 'xs' })}</a>
  <div class="line__info">
    <a class="latin" href="product.html#${p.id}">${esc(p.name)} <span style="color:var(--gold)">No.${p.no}</span></a>
    <small>${esc(t('card.inspired', { name: '' }).trim())} ${ph(p.inspiredBy, 'ph.original')}</small>
    <div class="tags"><span class="tag tag--gold">${esc(t(i.strength === 'elite' ? 'elite.name' : 'std.name'))}</span><span class="tag">${esc(t('size.' + i.size))}</span></div>
  </div>
  <div class="line__controls">
    <div class="qty qty--sm" role="group" aria-label="${esc(t('pd.qty'))} — ${esc(p.name)}">
      <button type="button" data-step="1" aria-label="${esc(t('pd.inc'))}">${icon('i-plus')}</button>
      <output aria-label="${esc(t('qty.label', { n: i.qty }))}">${i.qty}</output>
      <button type="button" data-step="-1" aria-label="${esc(t('pd.dec'))}">${icon('i-minus')}</button>
    </div>
    <div class="line__price">
      <b>${u == null ? `<span class="ph">${esc(t('ph.price'))}</span> ${esc(D.currency[I.lang])}` : esc(S.fmt(u * i.qty))}</b>
      <button type="button" class="link-btn" data-remove aria-label="${esc(t('cart.remove.label', { name: p.name }))}">${esc(t('cart.remove'))}</button>
    </div>
  </div>
</li>`;
    }

    function render() {
      document.title = t('meta.cart');
      const items = S.cart.items;
      if (!items.length) {
        view.innerHTML = `<div class="empty-cart">${S.bottleSVG(D.products[0], { size: 'xs', label: false })}<h2>${esc(t('cart.empty.t'))}</h2><p>${esc(t('cart.empty.p'))}</p><a class="btn btn--gold" href="index.html#collection">${esc(t('cart.empty.cta'))}</a></div>`;
        window.AG_MOTION?.pageReveal(view);
        return;
      }
      const tot = S.totals(promo);
      const n = S.cart.count();
      const thr = D.settings.freeShippingThreshold;
      const remaining = tot.known && thr != null ? Math.max(0, thr - (tot.subtotal - tot.discount)) : null;
      const pct = tot.known && thr ? Math.min(100, ((tot.subtotal - tot.discount) / thr) * 100) : 0;
      const testerTarget = D.products.find(p => !items.some(i => i.id === p.id && i.size === '10')) || D.products[0];
      const money = (v, key) => (v == null ? `<span class="ph">${esc(t(key))}</span> ${esc(D.currency[I.lang])}` : esc(S.fmt(v)));
      view.innerHTML = `
<div class="cart-layout">
  <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
    <div class="ship-meter">
      <div>${remaining === 0 ? esc(t('cart.free.done')) : esc(t('cart.free', { amount: '§' })).replace('§', `<strong style="color:var(--gold)">${money(remaining, 'ph.amount')}</strong>`)}</div>
      <div class="ship-meter__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}" aria-label="${esc(t('cart.shipping'))}"><span style="width:${pct}%"></span></div>
    </div>
    <ul class="cart-lines">${items.map(lineHTML).join('')}</ul>
    <div class="upsell">
      <div><strong>${esc(t('cart.tester.t', { price: '§' })).replace('§', money(D.settings.testerPrice, 'ph.price'))}</strong><span>${esc(t('cart.tester.p'))} — <span class="latin" style="letter-spacing:.08em">${esc(testerTarget.name)}</span></span></div>
      <button type="button" class="btn btn--outline" style="--h:44px" data-tester="${testerTarget.id}">${esc(t('cart.tester.add'))}</button>
    </div>
  </div>
  <aside class="summary" aria-labelledby="sum-title">
    <h2 id="sum-title">${esc(t('cart.summary'))}</h2>
    <div class="sum-row"><span>${esc(t('cart.items', { n }))}</span><span>${money(tot.subtotal, 'ph.subtotal')}</span></div>
    ${promo ? `<div class="sum-row"><span>${esc(t('cart.discount'))}</span><span>− ${money(tot.known ? tot.discount : null, 'ph.amount')}</span></div>` : ''}
    <div class="sum-row"><span>${esc(t('cart.shipping'))}</span><span>${money(tot.shipping, 'ph.shipping')}</span></div>
    <form class="field" id="promo-form" novalidate>
      <label for="promo">${esc(t('cart.promo'))}</label>
      <div class="promo-row"><input class="input" id="promo" name="promo" type="text" autocomplete="off" autocapitalize="characters" placeholder="${esc(t('cart.promo.ph'))}" aria-describedby="promo-msg" value="${promo ? esc(promo.code) : ''}">
      <button type="submit" class="btn btn--quiet">${esc(t('cart.promo.apply'))}</button></div>
      <p class="form-msg ${promo ? 'ok' : ''}" id="promo-msg" role="status">${promo ? esc(t('cart.promo.ok', { percent: promo.percent })) : ''}</p>
    </form>
    <div class="sum-row sum-row--total"><span>${esc(t('cart.total'))}</span><span>${money(tot.total, 'ph.total')}</span></div>
    ${tot.known ? '' : `<p class="form-msg" style="color:var(--ink-subtle)">${esc(t('cart.pricesPending'))}</p>`}
    <button type="button" class="btn btn--gold btn--lg btn--block" id="to-checkout" aria-controls="checkout" aria-expanded="false">${esc(t('cart.checkout'))}</button>
    <form class="checkout" id="checkout" hidden novalidate>
      <h3 style="font-size:20px">${esc(t('co.title'))}</h3>
      <p class="form-msg err" id="co-summary" role="alert" hidden></p>
      ${field('name', 'co.name', 'text', 'name')}
      ${field('phone', 'co.phone', 'tel', 'tel', 'inputmode="numeric" maxlength="11" dir="ltr"')}
      ${field('gov', 'co.gov', 'text', 'address-level1')}
      ${field('address', 'co.address', 'text', 'street-address')}
      <div class="field"><label for="co-notes">${esc(t('co.notes'))}</label><textarea class="input" id="co-notes" name="notes" rows="3"></textarea></div>
      <button type="submit" class="btn btn--gold btn--lg btn--block">${esc(t('co.submit'))}</button>
    </form>
    <div id="order-done" class="order-done" hidden></div>
    <ul class="assure-list">
      <li>${icon('i-card')}${esc(t('cart.pay'))}</li>
      <li>${icon('i-truck')}${esc(t('cart.ship', { time: phText(D.settings.deliveryTime, 'ph.time') }))}</li>
      <li>${icon('i-check')}${esc(t('cart.box'))}</li>
    </ul>
  </aside>
</div>`;
      bind();
    }
    function field(name, key, type, ac, extra = '') {
      return `<div class="field"><label for="co-${name}">${esc(t(key))}</label><input class="input" id="co-${name}" name="${name}" type="${type}" autocomplete="${ac}" required aria-describedby="co-${name}-err" ${extra}><p class="field-error" id="co-${name}-err"></p></div>`;
    }

    function bind() {
      $$('.line').forEach(li => {
        const key = li.dataset.key;
        $$('[data-step]', li).forEach(b => b.addEventListener('click', () => {
          const it = S.cart.items.find(i => S.cart.keyOf(i) === key);
          if (!it) return;
          const next = it.qty + Number(b.dataset.step);
          if (next < 1) { removeLine(li, key); return; }
          S.cart.setQty(key, next);
        }));
        $('[data-remove]', li).addEventListener('click', () => removeLine(li, key));
      });
      const tb = $('[data-tester]');
      tb && tb.addEventListener('click', () => S.cart.add(tb.dataset.tester, { size: '10' }));
      $('#promo-form').addEventListener('submit', e => {
        e.preventDefault();
        const code = $('#promo').value.trim().toUpperCase(), msg = $('#promo-msg');
        if (!code) { msg.className = 'form-msg err'; msg.textContent = t('cart.promo.empty'); return; }
        const found = D.settings.promoCodes[code];
        if (!found) { promo = null; msg.className = 'form-msg err'; msg.textContent = t('cart.promo.bad'); $('#promo').setAttribute('aria-invalid', 'true'); return; }
        promo = { code, percent: found.percent }; render();
      });
      $('#to-checkout').addEventListener('click', openCheckout);
      $('#checkout').addEventListener('submit', submitOrder);
      if (location.hash === '#checkout') openCheckout();
    }
    function openCheckout() {
      const form = $('#checkout'), btn = $('#to-checkout');
      form.hidden = false; btn.hidden = true; btn.setAttribute('aria-expanded', 'true');
      window.AG_MOTION?.swap(form);
      setTimeout(() => $('#co-name').focus({ preventScroll: false }), 60);
    }
    function removeLine(li, key) {
      const done = () => S.cart.remove(key);
      const p = window.AG_MOTION?.removeLine(li);
      p ? p.then(done) : done();
    }
    function submitOrder(e) {
      e.preventDefault();
      const f = e.currentTarget, vals = Object.fromEntries(new FormData(f));
      const rules = {
        name: v => v.trim().length >= 2 || 'co.err.name',
        phone: v => /^01[0125]\d{8}$/.test(v.replace(/\s|-/g, '')) || 'co.err.phone',
        gov: v => v.trim().length >= 2 || 'co.err.gov',
        address: v => v.trim().length >= 5 || 'co.err.address'
      };
      let firstBad = null;
      Object.entries(rules).forEach(([k, fn]) => {
        const r = fn(vals[k] || ''), input = $(`#co-${k}`), err = $(`#co-${k}-err`);
        if (r !== true) { input.setAttribute('aria-invalid', 'true'); err.textContent = t(r); firstBad = firstBad || input; }
        else { input.removeAttribute('aria-invalid'); err.textContent = ''; }
      });
      const sum = $('#co-summary');
      if (firstBad) { sum.hidden = false; sum.textContent = t('co.errors'); firstBad.focus(); return; }
      sum.hidden = true;
      const tot = S.totals(promo);
      const lines = S.cart.items.map(i => { const p = S.byId(i.id); return `• ${p.name} No.${p.no} — ${t(i.strength === 'elite' ? 'elite.name' : 'std.name')} — ${t('size.' + i.size)} × ${i.qty}`; });
      const text = [`${t('brand.full')} — ${t('cart.summary')}`, ...lines, `${t('cart.total')}: ${tot.total == null ? t('ph.total') : S.fmt(tot.total)}`, '',
        `${t('co.name')}: ${vals.name}`, `${t('co.phone')}: ${vals.phone}`, `${t('co.gov')}: ${vals.gov}`, `${t('co.address')}: ${vals.address}`, vals.notes ? `${t('co.notes')}: ${vals.notes}` : ''].filter(Boolean).join('\n');
      const done = $('#order-done'), wa = D.settings.whatsappNumber;
      done.hidden = false; f.hidden = true;
      done.innerHTML = `<h3 style="font-size:20px">${esc(t('co.done.t'))}</h3><pre>${esc(text)}</pre>` +
        (wa ? `<a class="btn btn--gold btn--block" href="https://wa.me/${encodeURIComponent(wa)}?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">${esc(t('co.done.wa'))}</a>`
            : `<p class="form-msg" style="color:var(--ink-muted)">${esc(t('co.done.offline'))}</p>`);
      done.setAttribute('tabindex', '-1'); done.focus();
      window.AG_MOTION?.swap(done);
    }

    render();
    document.addEventListener('ag:cart', render);
    document.addEventListener('ag:lang', render);
  }

  /* ================= HELP ================= */
  function initHelp() {
    const fill = () => {
      document.title = t('meta.help');
      const time = phText(D.settings.deliveryTime, 'ph.time');
      const fee = D.settings.shippingFee == null ? `${t('ph.shipping')} ${D.currency[I.lang]}` : S.fmt(D.settings.shippingFee);
      $('[data-fill="help.ship.p"]').textContent = t('help.ship.p', { time, fee });
      $('[data-fill="help.ret.p"]').textContent = t('help.ret.p', { time: phText(D.settings.exchangeWindow, 'ph.time') });
      const soc = D.settings.social, wa = D.settings.whatsappNumber;
      const item = (label, url) => url ? `<li><a class="btn btn--quiet" style="margin-top:8px" href="${esc(url)}" target="_blank" rel="noopener">${label}</a></li>` : `<li class="footer-cols"><span class="soon">${label}<small>${esc(t('footer.soon'))}</small></span></li>`;
      $('#contact-list').innerHTML = item('WhatsApp', soc.whatsapp || (wa ? `https://wa.me/${wa}` : null)) + item('Instagram', soc.instagram) + item('TikTok', soc.tiktok);
    };
    fill(); document.addEventListener('ag:lang', fill);
  }

  /* ---------- boot ---------- */
  renderChrome();
  I.apply();
  if (page === 'home') document.title = t('meta.home');
  initHeader(); initSearch(); updateCount();
  document.addEventListener('ag:cart', updateCount);
  document.addEventListener('ag:lang', () => { updateCount(); if (page === 'home') document.title = t('meta.home'); });
  ({ home: initHome, product: initProduct, cart: initCart, help: initHelp }[page] || (() => {}))();
  document.dispatchEvent(new CustomEvent('ag:ready'));
})();
