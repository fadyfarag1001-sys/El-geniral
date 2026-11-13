/* Al General — GSAP + ScrollTrigger motion.
 * - Everything is visible without JS / without GSAP (states are only hidden from JS, right before animating).
 * - prefers-reduced-motion: reduce → no movement; UI feedback becomes instant.
 * - Only transform/opacity are animated (GPU-friendly); looping motion pauses off-screen.
 */
(function () {
  const g = window.gsap, ST = window.ScrollTrigger;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const noop = () => Promise.resolve();

  // Fallback API if GSAP failed to load: the site still works, just without motion.
  if (!g) {
    window.AG_MOTION = { toastIn() {}, toastOut: noop, bump() {}, gridIn() {}, pageReveal() {}, pulse() {}, swap() {}, removeLine: noop };
    return;
  }
  g.registerPlugin(ST);
  g.defaults({ ease: 'power3.out', duration: 0.7 });
  const calm = () => reduce.matches;

  /* ---------- small UI helpers (used by app.js) ---------- */
  const api = {
    toastIn(el) { if (calm()) return; g.from(el, { y: 24, autoAlpha: 0, duration: 0.45 }); },
    toastOut(el) { if (calm()) return Promise.resolve(); return new Promise(r => g.to(el, { y: 12, autoAlpha: 0, duration: 0.3, ease: 'power2.in', onComplete: r })); },
    bump(els, src) {
      if (calm()) return;
      els.forEach(el => g.fromTo(el, { scale: 1 }, { scale: 1.35, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }));
      if (src) g.fromTo(src, { scale: 1 }, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 });
    },
    gridIn(grid) {
      if (calm()) return;
      g.from(grid.children, { autoAlpha: 0, y: 16, scale: 0.97, duration: 0.45, stagger: { each: 0.06, grid: 'auto' }, ease: 'back.out(1.4)', clearProps: 'transform' });
    },
    pulse(el) { if (calm() || !el) return; g.fromTo(el, { autoAlpha: 0.4, y: 4 }, { autoAlpha: 1, y: 0, duration: 0.35 }); },
    swap(el) { if (calm() || !el) return; g.from(el, { autoAlpha: 0, y: 10, duration: 0.4 }); },
    removeLine(li) {
      if (calm()) return Promise.resolve();
      return new Promise(r => g.to(li, { autoAlpha: 0, x: document.dir === 'rtl' ? 40 : -40, duration: 0.3, ease: 'power2.in', onComplete: r }));
    },
    pageReveal(root) { revealIn(root); }
  };
  window.AG_MOTION = api;

  /* ---------- scroll reveals (batched; one trigger set per container) ---------- */
  const contexts = new WeakMap();
  function revealIn(root) {
    root = root || document;
    if (contexts.has(root)) contexts.get(root).revert();
    if (calm()) return;
    const ctx = g.context(() => {
      const items = root.querySelectorAll('.reveal');
      if (!items.length) return;
      g.set(items, { autoAlpha: 0, y: 18 });
      ST.batch(items, {
        start: 'top 90%', once: true,
        onEnter: batch => g.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, overwrite: true })
      });
    });
    contexts.set(root, ctx);
  }

  /* ---------- home page choreography ---------- */
  function home() {
    const mm = g.matchMedia();
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 960px)' }, ctx => {
      if (!ctx.conditions.motion) return;
      const { desktop } = ctx.conditions;

      // 1. Hero intro: copy rises in, the panel appears, the bottle assembles (body → neck → cap), chevrons light up
      const tl = g.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero .eyebrow', { autoAlpha: 0, x: document.dir === 'rtl' ? 24 : -24, duration: 0.6 })
        .from('.hero h1 .hl > span', { yPercent: 110, duration: 1, stagger: 0.12, ease: 'expo.out' }, '-=0.3')
        .from('.hero__lead', { autoAlpha: 0, y: 16, duration: 0.7 }, '-=0.6')
        .from('.hero__ctas .btn', { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 }, '-=0.5')
        .from('.hero__panel', { autoAlpha: 0, y: 30, duration: 1 }, 0.1)
        .from('.hero__bottle .bottle__body', { scaleY: 0.6, autoAlpha: 0, transformOrigin: '50% 100%', duration: 0.8, ease: 'expo.out' }, 0.35)
        .from('.hero__bottle .bottle__neck', { scaleY: 0, transformOrigin: '50% 100%', duration: 0.3 }, 0.8)
        .from('.hero__bottle .bottle__cap', { y: -40, autoAlpha: 0, duration: 0.6, ease: 'back.out(1.8)' }, 0.9)
        .from('.hero__bottle .chev', { autoAlpha: 0, y: 6, duration: 0.4, stagger: { each: 0.12, from: 'end' } }, 1.1)
        .from('.hero__bottle .bottle__label text, .hero__bottle .bottle__label rect', { autoAlpha: 0, duration: 0.6, stagger: 0.1 }, 1.35)
        .from('.panel-tag', { autoAlpha: 0, duration: 0.6, stagger: 0.15 }, 1.4);

      // 2. Gentle idle float, paused when the hero is off-screen
      const float = g.to('.hero__bottle .bottle', { y: -8, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
      tl.eventCallback('onComplete', () => float.play());
      ST.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: s => (s.isActive && tl.progress() === 1 ? float.play() : float.pause()) });

      // 3. Light parallax on the bottle only (never on text)
      g.to('.hero__bottle', { yPercent: desktop ? -10 : -5, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });

      // 4. Strength tiers rise in, then the Elite card catches the light once
      g.from('.tier', { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.15, scrollTrigger: { trigger: '.strength-grid', start: 'top 82%', once: true },
        onComplete: () => document.querySelector('.tier--elite')?.classList.add('is-shine') });

      // 5. The arsenal: cards stagger in
      g.from('#product-grid > *', { autoAlpha: 0, y: 28, scale: 0.97, duration: 0.6, stagger: { each: 0.08, grid: 'auto' }, ease: 'back.out(1.3)', clearProps: 'transform',
        scrollTrigger: { trigger: '#product-grid', start: 'top 85%', once: true } });

      // 6. I. II. III. — numerals stamp in, then their text
      g.utils.toArray('.why-item').forEach((item, i) => {
        const t2 = g.timeline({ scrollTrigger: { trigger: item, start: 'top 88%', once: true }, delay: i * 0.12 });
        t2.from(item.querySelector('.why-num'), { scale: 0.4, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)', transformOrigin: document.dir === 'rtl' ? '100% 50%' : '0% 50%' })
          .from(item.querySelectorAll('h3, p'), { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.2');
      });
    });
    revealIn(document);
  }

  function boot() {
    const page = document.body.dataset.page || 'home';
    if (page === 'home') home();
    else if (page !== 'product') revealIn(document); // product page reveals itself after each render
    // Fonts change line heights → recompute trigger positions once they're in.
    if (document.fonts?.ready) document.fonts.ready.then(() => ST.refresh());
  }
  if (document.body.dataset.ready === '1') boot();
  else document.addEventListener('ag:ready', boot, { once: true });
})();
