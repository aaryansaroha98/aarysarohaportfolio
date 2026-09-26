/* =========================================================
   AARYAN SAROHA — founder site · interactions
   ========================================================= */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mouse = { x: innerWidth * .75, y: innerHeight * .3 };

  /* ---------- split headings into characters ---------- */
  $$('.chars').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'c';
      s.style.setProperty('--i', i);
      s.textContent = ch === ' ' ? ' ' : ch;
      el.appendChild(s);
    });
  });
  $$('.hero__title .row--2 .c').forEach(c => c.style.setProperty('--d', '180ms'));

  /* ---------- stagger siblings ---------- */
  $$('.bl, .shelf, .rows, .tl, .about__copy').forEach(group => {
    $$(':scope > .fade', group).forEach((el, i) => el.style.setProperty('--d', `${(i % 4) * 90}ms`));
  });

  /* ---------- intro ---------- */
  const hero = $('.hero');
  const intro = $('#intro');
  let seen = false;
  try { seen = sessionStorage.getItem('as-intro') === '1'; } catch (e) {}

  const startHero = () => requestAnimationFrame(() => {
    hero.classList.add('is-in');
    $$('.fade', hero).forEach(el => el.classList.add('is-in'));
  });

  if (seen || reduced) {
    intro.remove();
    startHero();
  } else {
    document.body.classList.add('is-intro');
    const count = $('#introCount');
    const t0 = performance.now(), D = 1500;
    const tick = now => {
      const p = clamp((now - t0) / D, 0, 1);
      count.textContent = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      if (p < 1) return requestAnimationFrame(tick);
      setTimeout(() => {
        intro.classList.add('is-done');
        document.body.classList.remove('is-intro');
        setTimeout(startHero, 350);
        setTimeout(() => intro.remove(), 1200);
        try { sessionStorage.setItem('as-intro', '1'); } catch (e) {}
      }, 200);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- local time ---------- */
  const clock = $('#clock');
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
  const tickClock = () => { clock.textContent = `${fmt.format(new Date())} IST`; };
  tickClock(); setInterval(tickClock, 15000);

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.fade, .reveal-img, .contact__title').forEach(el => { if (!hero.contains(el)) io.observe(el); });

  /* ---------- statement: words light up with scroll ---------- */
  const scrub = $('#scrub');
  (function wrap(node) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w => {
          if (!w) return;
          if (/^\s+$/.test(w)) return frag.appendChild(document.createTextNode(w));
          const s = document.createElement('span'); s.className = 'w'; s.textContent = w; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrap(n);
    });
  })(scrub);
  const words = $$('.w', scrub);

  /* ---------- cursor ---------- */
  const cursor = $('#cursor');
  const cur = { x: mouse.x, y: mouse.y };
  const darkZones = $$('.qt, .contact');
  addEventListener('pointermove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (fine && !reduced) document.documentElement.classList.add('has-cursor');
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.documentElement.classList.remove('has-cursor'));
  document.addEventListener('pointerover', e => {
    const view = e.target.closest('[data-cursor]');
    cursor.classList.toggle('is-view', !!view);
    cursor.classList.toggle('is-link', !view && !!e.target.closest('a, button'));
    cursor.classList.toggle('on-dark', !!e.target.closest('.qt, .contact'));
  });

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduced) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
      el.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1), background .35s, color .35s, border-color .35s';
    });
  }

  /* ---------- frame loop: cursor + hero glow ---------- */
  const glow = $('#glow');
  const g = { x: mouse.x, y: mouse.y };
  (function frame() {
    cur.x += (mouse.x - cur.x) * .2; cur.y += (mouse.y - cur.y) * .2;
    cursor.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
    if (scrollY < innerHeight) {
      g.x += (mouse.x - g.x) * .04; g.y += (mouse.y + scrollY - g.y) * .04;
      glow.style.transform = `translate(${g.x}px, ${g.y}px) translate(-50%, -50%)`;
    }
    requestAnimationFrame(frame);
  })();

  /* ---------- demo video ---------- */
  const demo = $('#demo'), play = $('#play'), shotFig = $('#shot');
  play.addEventListener('click', () => { demo.controls = true; demo.play(); });
  demo.addEventListener('play', () => shotFig.classList.add('is-playing'));

  /* ---------- scroll-driven effects ---------- */
  const nav = $('#nav');
  const stage = $('#stage'), shot = $('#shot');
  const steps = $$('.step');
  const tl = $('#tl');
  const mobile = matchMedia('(max-width: 640px)');
  let lastY = scrollY, ticking = false;

  function onScroll() {
    ticking = false;
    const y = scrollY, vh = innerHeight;

    // nav: solid after scrolling, hide on the way down, dark over dark sections
    nav.classList.toggle('is-scrolled', y > 30);
    nav.classList.toggle('is-hidden', y > 500 && y > lastY + 2);
    if (y < lastY - 2 || y <= 500) nav.classList.remove('is-hidden');
    lastY = y;
    const navY = nav.offsetHeight / 2;
    const overDark = darkZones.some(z => { const r = z.getBoundingClientRect(); return r.top <= navY && r.bottom >= navY; });
    nav.classList.toggle('is-dark', overDark);

    // statement words
    const sr = scrub.getBoundingClientRect();
    const sp = clamp((vh * .8 - sr.top) / (sr.height + vh * .3), 0, 1);
    const lit = Math.round(sp * words.length);
    words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));

    // product shot grows to full size
    if (!mobile.matches && !reduced) {
      const r = stage.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh), 0, 1);
      const e = 1 - Math.pow(1 - p, 2);
      shot.style.setProperty('--s', (.62 + e * .38).toFixed(4));
    }

    // active step = the one nearest the middle of the screen
    let best = null, bestD = Infinity;
    steps.forEach(s => {
      const r = s.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - vh * .5);
      if (d < bestD) { bestD = d; best = s; }
    });
    steps.forEach(s => s.classList.toggle('is-active', s === best));

    // journey line draws as you scroll
    const tr = tl.getBoundingClientRect();
    tl.style.setProperty('--p', clamp((vh * .85 - tr.top) / (tr.height + vh * .2), 0, 1).toFixed(3));
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
})();
