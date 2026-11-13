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

      // 1. Hero intro timeline
      const tl = g.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero .eyebrow', { autoAlpha: 0, y: 12, duration: 0.6 })
        .from('.hero h1 .hl > span', { yPercent: 110, duration: 1, stagger: 0.12, ease: 'expo.out' }, '-=0.3')
        .from('.hero__lead', { autoAlpha: 0, y: 16, duration: 0.7 }, '-=0.6')
        .from('.hero__ctas .btn', { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.08 }, '-=0.5')
        .from('.hero__ring', { scale: 0.85, autoAlpha: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out' }, 0.15)
        .from('.hero__glow', { autoAlpha: 0, scale: 0.6, duration: 1.6 }, 0.2)
        .from('.hero__bottle', { y: 60, autoAlpha: 0, rotate: -3, duration: 1.4, ease: 'expo.out' }, 0.25)
        .from('.hero__meta, .hero__scroll', { autoAlpha: 0, duration: 0.8, stagger: 0.1 }, '-=0.8');

      // 2. Gentle idle float, paused when the hero is off-screen
      const float = g.to('.hero__bottle .bottle', { y: -10, rotate: 0.6, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
      tl.eventCallback('onComplete', () => float.play());
      ST.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: s => (s.isActive && tl.progress() === 1 ? float.play() : float.pause()) });

      // 3. Hero parallax (decorative layers only, small deltas)
      g.to('.hero__bottle', { yPercent: desktop ? -12 : -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
      g.to('.hero__ring', { scale: 1.12, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
      g.to('.hero__copy', { yPercent: desktop ? 8 : 0, autoAlpha: desktop ? 0.25 : 1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center top+=30%', end: 'bottom top', scrub: true } });

      // 4. Marquee band (paused off-screen)
      const track = document.querySelector('.band__track');
      if (track) {
        const loop = g.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1, paused: true });
        ST.create({ trigger: '.band', start: 'top bottom', end: 'bottom top', onToggle: s => (s.isActive ? loop.play() : loop.pause()) });
      }

      // 5. Strength tiers: rise in, then the Elite card catches the light once
      g.from('.tier', { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.15, scrollTrigger: { trigger: '.strength-grid', start: 'top 82%', once: true },
        onComplete: () => document.querySelector('.tier--elite')?.classList.add('is-shine') });

      // 6. Product grid stagger
      g.from('#product-grid > *', { autoAlpha: 0, y: 28, scale: 0.97, duration: 0.6, stagger: { each: 0.08, grid: 'auto' }, ease: 'back.out(1.3)', clearProps: 'transform',
        scrollTrigger: { trigger: '#product-grid', start: 'top 85%', once: true } });

      // 7. Craft: gold rule draws with scroll, numerals count in
      g.utils.toArray('.craft').forEach(c => {
        g.from(c.querySelector('.craft__line'), { scaleX: 0, ease: 'none', scrollTrigger: { trigger: c, start: 'top 85%', end: 'top 55%', scrub: 0.5 } });
        g.from(c.children, { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.08, scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
      });

      // 8. The house: laurel leaves grow in, rings draw
      const mark = document.querySelector('.story__mark svg');
      if (mark) {
        const rings = mark.querySelectorAll('circle');
        rings.forEach(r => { const len = 2 * Math.PI * r.r.baseVal.value; g.set(r, { strokeDasharray: len, strokeDashoffset: len }); });
        const st = { trigger: '.story', start: 'top 75%', once: true };
        const t2 = g.timeline({ scrollTrigger: st });
        t2.to(rings, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.2 })
          .from(mark.querySelectorAll('ellipse'), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, stagger: { each: 0.035, from: 'end' }, ease: 'back.out(2)' }, 0.3)
          .from(mark.querySelectorAll('polyline'), { autoAlpha: 0, duration: 0.8 }, 0.2)
          .from(mark.querySelector('text'), { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 50%', duration: 0.8 }, 0.6)
          .from(mark.querySelector('polygon'), { scale: 0, rotate: 90, transformOrigin: '50% 50%', duration: 0.7, ease: 'back.out(2)' }, 1);
      }
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
