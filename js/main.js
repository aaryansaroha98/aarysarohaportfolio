/* =========================================================
   AARYAN SAROHA — terminal-grade portfolio · interactions
   ========================================================= */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, active: false };

  /* ---------- split text into characters ---------- */
  $$('.split').forEach((el, n) => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.style.setProperty('--i', i);
      s.textContent = c === ' ' ? ' ' : c;
      el.appendChild(s);
    });
  });
  // stagger the second hero line after the first
  $$('.hero__name .line--r .ch').forEach(c => c.style.setProperty('--d', '220ms'));

  /* ---------- scramble text ---------- */
  const GLYPHS = '▲▼■□◆◇01#%&*+=<>/\\ABCDEFGHJKLMNPQRSTUVWXYZ';
  function scramble(el, to, dur = 600) {
    if (reduced) { el.textContent = to; return; }
    const from = el.textContent;
    const len = Math.max(from.length, to.length);
    const start = performance.now();
    cancelAnimationFrame(el._scr);
    const tick = now => {
      const p = clamp((now - start) / dur, 0, 1);
      let out = '';
      for (let i = 0; i < len; i++) {
        const settle = i / len;
        if (p > settle * .7 + .3) out += to[i] || '';
        else if (to[i] === ' ') out += ' ';
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) el._scr = requestAnimationFrame(tick);
      else el.textContent = to;
    };
    el._scr = requestAnimationFrame(tick);
  }

  /* ---------- boot sequence ---------- */
  const boot = $('#boot');
  const heroName = $('.hero__name');
  let seen = false;
  try { seen = sessionStorage.getItem('as-booted') === '1'; } catch (e) {}

  function endBoot() {
    boot.classList.add('is-done');
    document.body.classList.remove('is-booting');
    setTimeout(() => heroName.classList.add('is-in'), 250);
    setTimeout(() => boot.remove(), 1200);
    try { sessionStorage.setItem('as-booted', '1'); } catch (e) {}
  }

  if (seen || reduced) {
    boot.remove();
    requestAnimationFrame(() => heroName.classList.add('is-in'));
  } else {
    document.body.classList.add('is-booting');
    const log = $('#bootLog'), count = $('#bootCount'), bar = $('#bootBar');
    const lines = [
      ['QUANTIFY/OS v2026.09 — founder profile loader', 'am'],
      ['mount /desk/aaryan-saroha ........................', 'ok', 'OK'],
      ['resolve canonical id: A.SAROHA@IITJ-EE-2025 ......', 'ok', 'OK'],
      ['load data fabric (point-in-time) .................', 'ok', 'OK'],
      ['compile models :: pricing, factor, risk ..........', 'ok', 'OK'],
      ['attach thesis graph :: "maintain conviction" .....', 'ok', 'OK'],
      ['portfolio twin :: exposure recomputed ............', 'ok', 'OK'],
      ['decision ledger :: 8 entries, replayable .........', 'ok', 'OK'],
      ['stream market feed .............................. ', 'am', 'LIVE'],
      ['> welcome.', 'am']
    ];
    let li = 0;
    const addLine = () => {
      if (li >= lines.length) return;
      const [t, cls, tail] = lines[li++];
      log.innerHTML += tail ? `${t} <span class="${cls}">${tail}</span>\n` : `<span class="${cls}">${t}</span>\n`;
      setTimeout(addLine, rand(70, 170));
    };
    addLine();
    const t0 = performance.now(), D = 1900;
    const step = now => {
      const p = clamp((now - t0) / D, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      count.textContent = String(Math.round(e * 100)).padStart(3, '0');
      bar.style.width = e * 100 + '%';
      if (p < 1) requestAnimationFrame(step);
      else setTimeout(endBoot, 280);
    };
    requestAnimationFrame(step);
  }

  /* ---------- clock (IST) ---------- */
  const clock = $('#clock');
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const tickClock = () => { clock.textContent = fmt.format(new Date()); };
  tickClock(); setInterval(tickClock, 1000);

  /* ---------- ticker tape ---------- */
  const tape = $('#tape');
  const tickers = [
    ['QTML', 1284.5], ['CONVICTION', 999.99], ['HMBT', 412.2], ['CHLC', 218.7], ['PRPX', 96.4],
    ['IITJ·EE', 2029], ['C++', 311.8], ['PYTHON', 540.1], ['REACT', 188.6], ['NODE', 142.3],
    ['SQL', 204.9], ['PYTORCH', 77.3], ['SHIP_VELOCITY', 88.8], ['SLEEP', 4.2], ['COFFEE', 31.4], ['NEXUS26', 26.0]
  ];
  const chg = () => {
    const c = rand(-1.2, 4.2);
    return { c, cls: c >= 0 ? 'up' : 'down', a: c >= 0 ? '▲' : '▼' };
  };
  function renderTape() {
    const html = tickers.map(([s, p]) => {
      const { c, cls, a } = s === 'SLEEP' ? { c: -rand(8, 40), cls: 'down', a: '▼' } : chg();
      return `<span><b>${s}</b><span class="${cls}">${(p * (1 + c / 100)).toFixed(2)} ${a}${Math.abs(c).toFixed(2)}%</span></span>`;
    }).join('');
    tape.innerHTML = html + html;
  }
  renderTape();
  setInterval(() => { if (!document.hidden) renderTape(); }, 9000);

  /* ---------- crosshair cursor ---------- */
  const xh = $('.xh'), xv = $('.xh__v'), xhz = $('.xh__h'), xd = $('.xh__dot'), xt = $('#xhTag');
  const cur = { x: mouse.x, y: mouse.y };
  addEventListener('pointermove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
    if (finePointer && !reduced) document.documentElement.classList.add('has-cursor');
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.documentElement.classList.remove('has-cursor'));
  document.addEventListener('pointerover', e => {
    xh.classList.toggle('is-hover', !!e.target.closest('a, button, .tilt, .heat__t, input, textarea, .cmd__list li'));
  });

  /* ---------- hero market canvas ---------- */
  const cv = $('#market'), cx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, candles = [], heroVisible = true, lastPrice = 1284.5;
  const CW = 14;
  function sizeCanvas() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const need = Math.ceil(W / CW) + 4;
    while (candles.length < need) pushCandle();
  }
  function pushCandle() {
    const prev = candles.length ? candles[candles.length - 1].c : 100;
    const drift = (100 - prev) * .01 + rand(-1, 1.06) * 2.2;
    const o = prev, c = prev + drift;
    const h = Math.max(o, c) + rand(0, 2.2), l = Math.min(o, c) - rand(0, 2.2);
    candles.push({ o, h, l, c, v: rand(.2, 1) });
  }
  let offset = 0, last = performance.now();
  function drawMarket(now) {
    const dt = Math.min(now - last, 60); last = now;
    if (heroVisible && !document.hidden) {
      offset += dt * (reduced ? 0 : .012);
      while (offset >= CW) { offset -= CW; candles.shift(); pushCandle(); }
      cx.clearRect(0, 0, W, H);
      let min = Infinity, max = -Infinity;
      candles.forEach(k => { min = Math.min(min, k.l); max = Math.max(max, k.h); });
      const pad = (max - min) * .15;
      min -= pad; max += pad;
      const top = H * .22, bot = H * .78;
      const Y = v => bot - (v - min) / (max - min) * (bot - top);
      // volume
      candles.forEach((k, i) => {
        const x = i * CW - offset;
        cx.fillStyle = k.c >= k.o ? 'rgba(34,214,122,.09)' : 'rgba(255,77,77,.09)';
        const vh = k.v * H * .1;
        cx.fillRect(x + 2, H - vh, CW - 4, vh);
      });
      // candles
      candles.forEach((k, i) => {
        const x = i * CW - offset;
        const up = k.c >= k.o;
        const near = mouse.active ? Math.max(0, 1 - Math.abs(mouse.x - x) / 260) : 0;
        const a = .16 + near * .5;
        cx.strokeStyle = cx.fillStyle = up ? `rgba(34,214,122,${a})` : `rgba(255,77,77,${a})`;
        cx.beginPath(); cx.moveTo(x + CW / 2, Y(k.h)); cx.lineTo(x + CW / 2, Y(k.l)); cx.stroke();
        const y1 = Y(Math.max(k.o, k.c)), y2 = Y(Math.min(k.o, k.c));
        cx.fillRect(x + 3, y1, CW - 6, Math.max(1, y2 - y1));
      });
      // moving average
      cx.beginPath();
      let ema = candles[0].c;
      candles.forEach((k, i) => {
        ema = ema + (k.c - ema) * .18;
        const x = i * CW - offset + CW / 2;
        i ? cx.lineTo(x, Y(ema)) : cx.moveTo(x, Y(ema));
      });
      cx.strokeStyle = 'rgba(255,138,31,.55)'; cx.lineWidth = 1.5; cx.stroke(); cx.lineWidth = 1;
      // last price line
      const lk = candles[candles.length - 1];
      const ly = Y(lk.c);
      cx.setLineDash([3, 5]); cx.strokeStyle = 'rgba(255,138,31,.35)';
      cx.beginPath(); cx.moveTo(0, ly); cx.lineTo(W, ly); cx.stroke(); cx.setLineDash([]);
      lastPrice = 1200 + lk.c;
      cx.fillStyle = '#ff8a1f'; cx.fillRect(W - 78, ly - 9, 78, 18);
      cx.fillStyle = '#000'; cx.font = '500 11px "JetBrains Mono", monospace'; cx.textBaseline = 'middle';
      cx.fillText(lastPrice.toFixed(2), W - 72, ly + 1);
      // cursor price label
      if (mouse.active && mouse.y < H) {
        const pv = 1200 + min + (bot - mouse.y) / (bot - top) * (max - min);
        cx.fillStyle = 'rgba(236,232,223,.9)'; cx.fillRect(W - 78, mouse.y - 9, 78, 18);
        cx.fillStyle = '#000'; cx.fillText(pv.toFixed(2), W - 72, mouse.y + 1);
      }
    }
    // crosshair follow
    cur.x += (mouse.x - cur.x) * .22; cur.y += (mouse.y - cur.y) * .22;
    xv.style.transform = `translateX(${mouse.x}px)`;
    xhz.style.transform = `translateY(${mouse.y}px)`;
    xd.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
    xt.style.transform = `translate(${mouse.x + 14}px, ${mouse.y + 14}px)`;
    requestAnimationFrame(drawMarket);
  }
  setInterval(() => {
    const doc = document.documentElement;
    const sp = (scrollY / Math.max(1, doc.scrollHeight - innerHeight) * 100).toFixed(1);
    xt.textContent = `X ${String(Math.round(mouse.x)).padStart(4, '0')} · Y ${String(Math.round(mouse.y)).padStart(4, '0')} · ${sp}%`;
  }, 60);
  sizeCanvas();
  addEventListener('resize', sizeCanvas);
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe($('.hero'));
  requestAnimationFrame(drawMarket);

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal, .screen, .contact__big').forEach(el => io.observe(el));

  /* ---------- manifesto scrub ---------- */
  const scrub = $('#scrub');
  (function wrapWords(node) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
          const s = document.createElement('span'); s.className = 'w'; s.textContent = w; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrapWords(n);
    });
  })(scrub);
  const words = $$('.w', scrub);

  /* ---------- pipeline ---------- */
  const steps = [
    { t: 'A filing lands.', d: 'It enters the Data Fabric with a canonical identifier, point-in-time timestamps and machine-readable data rights.',
      log: ['<b>INGEST</b> 10-Q · NVDA · filed 16:05:12 ET', 'canonical_id → EQ:US:NVDA', 'rights: display ✓ calc ✓ ai_retrieval ✓', '<span class="ok">fabric.write OK</span>'] },
    { t: 'The model updates itself.', d: 'Figures become facts carrying the sentence they were read from. The Financial Model Compiler proposes the exact cells that change.',
      log: ['<b>COMPILE</b> revenue_q3 → 35.08B (src: p.4 ¶2)', 'gross_margin 75.0% → 74.6%', 'proposed diff: 14 cells · lineage attached', '<span class="ok">awaiting analyst approval</span>'] },
    { t: 'The thesis re-scores.', d: 'The thesis graph re-scores every assumption the change touches — and shows its working. No magic scores.',
      log: ['<b>THESIS</b> "datacenter capex durable"', 'assumption A3 margin_floor: WEAKENED', 'health 71 → 64  (Δ −7, 3 inputs)', '<span class="ok">evidence spans: 5 cited</span>'] },
    { t: 'Exposure is recomputed.', d: 'The Portfolio Digital Twin recomputes first-, second- and third-order exposure — suppliers, customers, geographies.',
      log: ['<b>TWIN</b> look-through: 2 suppliers deep', 'semis exposure 28.4% → 29.1%', 'country TW: 11.2% (limit 25%)', '<span class="ok">failure search: 0 paths breached</span>'] },
    { t: 'The decision is recorded.', d: 'Tested against the investor\'s constitution, approved by a human, written to the Decision Ledger — replayable forever.',
      log: ['<b>DECIDE</b> action: TRIM 0.6% · reason attached', 'constitution check: PASS (6/6)', 'human gate: approved by PM', '<span class="ok">ledger#0412 signed · replayable</span>'] }
  ];
  const pipe = $('#pipe'), pPath = $('#pipePath'), pLit = $('#pipeLit'), pDot = $('#pipeDot'), pHalo = $('#pipeHalo');
  const pTitle = $('#pipeTitle'), pDesc = $('#pipeDesc'), pStep = $('#pipeStep'), pLog = $('#pipeLog');
  const pNodes = $$('#pipeNodes li');
  const pLen = pPath.getTotalLength();
  pLit.style.strokeDasharray = pLen;
  let curStep = -1;
  function logLine(html) {
    const p = document.createElement('p');
    const ts = fmt.format(new Date());
    p.innerHTML = `<span style="color:var(--faint)">${ts}</span> ${html}`;
    pLog.appendChild(p);
    while (pLog.children.length > 7) pLog.firstChild.remove();
  }
  function setPipe(p) {
    p = clamp(p, 0, 1);
    const pt = pPath.getPointAtLength(p * pLen);
    pDot.setAttribute('cx', pt.x); pDot.setAttribute('cy', pt.y);
    pHalo.setAttribute('cx', pt.x); pHalo.setAttribute('cy', pt.y);
    pLit.style.strokeDashoffset = pLen * (1 - p);
    const s = Math.min(steps.length - 1, Math.floor(p * steps.length));
    pNodes.forEach((n, i) => { n.classList.toggle('is-on', i === s); n.classList.toggle('is-past', i < s); });
    if (s !== curStep) {
      curStep = s;
      const st = steps[s];
      scramble(pTitle, st.t, 520);
      pDesc.textContent = st.d;
      pStep.textContent = `0${s + 1}/0${steps.length}`;
      st.log.forEach((l, i) => setTimeout(() => logLine(l), i * 140));
    }
  }
  const mobilePipe = matchMedia('(max-width: 960px)');
  let autoP = 0, pipeInView = false;
  new IntersectionObserver(([e]) => { pipeInView = e.isIntersecting; }).observe(pipe);
  setInterval(() => {
    if (!mobilePipe.matches || !pipeInView) return;
    autoP = (autoP + .004) % 1;
    setPipe(autoP);
  }, 30);
  setPipe(0);

  /* ---------- constitution typing ---------- */
  const code = $('#constitution code');
  const cLines = [
    '# executable mandate — compiled',
    'position        <= 7%',
    'country CN      <= 25%',
    'sector Tech     <= 30%',
    'expected_return >= 15%',
    'thesis          required',
    'thesis_health   >= 50',
    '',
    '# a breach is recorded and signed,',
    '# never blocked.'
  ];
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const hl = raw => {
    const l = esc(raw);
    if (l.startsWith('#')) return `<span class="c">${l}</span>`;
    return l.replace(/^(\S+(?: [A-Z]{2,}| Tech)?)/, '<span class="k">$1</span>')
            .replace(/(&lt;=|&gt;=)\s*([\d.]+%?)/, '<span class="c">$1</span> <span class="n">$2</span>')
            .replace(/required$/, '<span class="n">required</span>');
  };
  let typed = false;
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting || typed) return;
    typed = true; o.disconnect();
    if (reduced) { code.innerHTML = cLines.map(hl).join('\n'); return; }
    let li = 0, ci = 0, done = [];
    const type = () => {
      if (li >= cLines.length) { code.innerHTML = done.join('\n') + '\n<span class="cur">&nbsp;</span>'; return; }
      const line = cLines[li];
      if (ci <= line.length) {
        code.innerHTML = done.join('\n') + (done.length ? '\n' : '') + esc(line.slice(0, ci)) + '<span class="cur">&nbsp;</span>';
        ci++;
        setTimeout(type, rand(14, 38));
      } else {
        done.push(hl(line)); li++; ci = 0;
        setTimeout(type, 120);
      }
    };
    type();
  }, { threshold: .4 }).observe(code);

  /* ---------- tilt ---------- */
  if (finePointer && !reduced) {
    $$('.tilt').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateZ(0)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const px = e.clientX - r.left - r.width / 2, py = e.clientY - r.top - r.height / 2;
        el.querySelector('.bigcta__arrow').style.translate = `${px * .06}px ${py * .3}px`;
      });
      el.addEventListener('pointerleave', () => { el.querySelector('.bigcta__arrow').style.translate = ''; });
    });
  }

  /* ---------- watchlist peek ---------- */
  const peek = $('#peek'), peekImg = $('img', peek);
  const pk = { x: 0, y: 0 };
  $$('.wl__row[data-img]').forEach(row => {
    row.addEventListener('pointerenter', () => { peekImg.src = row.dataset.img; peek.classList.add('is-on'); });
    row.addEventListener('pointerleave', () => peek.classList.remove('is-on'));
  });
  (function follow() {
    pk.x += (mouse.x + 180 - pk.x) * .12; pk.y += (mouse.y - pk.y) * .12;
    peek.style.left = pk.x + 'px'; peek.style.top = pk.y + 'px';
    requestAnimationFrame(follow);
  })();

  /* ---------- skill heatmap ---------- */
  const skills = [
    ['Quant Finance', 'Pricing · Factors · Risk', 4, 2, 9.4],
    ['C / C++', 'Systems · DSA', 4, 2, 7.8],
    ['Python', 'NumPy · scikit-learn', 4, 2, 8.6],
    ['SQL · MySQL', 'Schemas · Queries', 3, 2, 6.9],
    ['React', 'Frontends at speed', 3, 2, 7.2],
    ['Node.js', 'APIs · Realtime', 3, 1, 5.8],
    ['PHP', 'hembit.in', 3, 1, 3.4],
    ['MongoDB', 'Chalchitra', 3, 1, 4.6],
    ['PyTorch', 'Models', 3, 1, 5.1],
    ['scikit-learn', 'ML', 2, 1, 3.9],
    ['Tailwind', 'UI', 2, 1, 2.7],
    ['Git', 'Everything', 2, 1, 4.4],
    ['Linux', 'Kali · Mac', 2, 1, 3.3],
    ['Swift', 'macOS · iOS', 2, 1, 1.6],
    ['HTML/CSS/JS', 'Since 2022', 2, 1, 3.8],
    ['Jupyter', 'Colab · Notebooks', 3, 1, 2.9],
    ['Google Cloud', 'Deploy · Console', 3, 1, 2.2],
    ['Microstructure', 'Order flow · Books', 3, 1, 6.4],
    ['Data Infra', 'Point-in-time', 3, 1, 7.6]
  ];
  const heat = $('#heat');
  const tiles = skills.map(([n, sub, cw, rh, base]) => {
    const t = document.createElement('div');
    t.className = 'heat__t' + (cw >= 4 ? ' heat__t--xl' : cw >= 3 && rh > 1 ? ' heat__t--lg' : '');
    t.style.gridColumn = `span ${cw}`; t.style.gridRow = `span ${rh}`;
    t.innerHTML = `<small>${cw >= 3 ? 'SKILL' : ''}</small><b>${n}</b><span><em class="v"></em> · ${sub}</span>`;
    heat.appendChild(t);
    return { t, v: $('.v', t), base, cw };
  });
  const cols = () => getComputedStyle(heat).gridTemplateColumns.split(' ').length;
  function fitTiles() {
    const c = cols();
    tiles.forEach(o => { o.t.style.gridColumn = `span ${Math.min(o.cw, c)}`; });
  }
  function paint(o, flash) {
    const val = o.base + rand(-1.6, 1.2);
    const up = val >= 0;
    const mag = clamp(Math.abs(val) / 10, .08, 1);
    o.t.style.setProperty('--h', up ? 145 : 0);
    o.t.style.setProperty('--s', `${40 + mag * 35}%`);
    o.t.style.setProperty('--l', `${9 + mag * 22}%`);
    o.v.textContent = `${up ? '+' : ''}${val.toFixed(2)}%`;
    if (flash) { o.t.classList.remove('flash'); void o.t.offsetWidth; o.t.classList.add('flash'); }
  }
  tiles.forEach(o => paint(o));
  fitTiles(); addEventListener('resize', fitTiles);
  setInterval(() => {
    if (document.hidden || reduced) return;
    for (let i = 0; i < 3; i++) paint(tiles[(Math.random() * tiles.length) | 0], true);
  }, 1100);

  /* ---------- portrait halftone ---------- */
  const portrait = $('#portrait'), pimg = $('img', portrait), pfx = $('#portraitFx');
  let dots = null, portraitVisible = false;
  function buildDots() {
    try {
      const S = 64;
      const off = document.createElement('canvas');
      off.width = S; off.height = Math.round(S * pimg.naturalHeight / pimg.naturalWidth);
      const o = off.getContext('2d');
      o.drawImage(pimg, 0, 0, off.width, off.height);
      const d = o.getImageData(0, 0, off.width, off.height).data;
      dots = { w: off.width, h: off.height, b: [] };
      for (let i = 0; i < d.length; i += 4) dots.b.push((d[i] * .3 + d[i + 1] * .59 + d[i + 2] * .11) / 255);
      portrait.classList.add('has-fx');
    } catch (e) { dots = null; pfx.remove(); }
  }
  function drawDots(now) {
    if (dots && portraitVisible && !document.hidden) {
      const r = pfx.getBoundingClientRect();
      const d2 = Math.min(devicePixelRatio || 1, 2);
      if (pfx.width !== Math.round(r.width * d2)) { pfx.width = Math.round(r.width * d2); pfx.height = Math.round(r.height * d2); }
      const g = pfx.getContext('2d');
      g.setTransform(d2, 0, 0, d2, 0, 0);
      g.clearRect(0, 0, r.width, r.height);
      const cs = r.width / dots.w;
      const t = reduced ? 0 : now / 1000;
      const scanY = ((t * .25) % 1.3) * r.height;
      g.fillStyle = '#ff8a1f';
      for (let y = 0; y < dots.h; y++) for (let x = 0; x < dots.w; x++) {
        const b = dots.b[y * dots.w + x];
        const py = y * cs + cs / 2;
        const boost = Math.max(0, 1 - Math.abs(py - scanY) / 40);
        const rad = (b * .5 + boost * .35) * cs * (.85 + Math.sin(t * 2 + x * .3 + y * .2) * .08);
        if (rad < .4) continue;
        g.globalAlpha = .35 + b * .5 + boost * .3;
        g.beginPath(); g.arc(x * cs + cs / 2, py, rad, 0, 6.283); g.fill();
      }
      g.globalAlpha = 1;
    }
    requestAnimationFrame(drawDots);
  }
  if (pimg.complete && pimg.naturalWidth) buildDots(); else pimg.addEventListener('load', buildDots);
  new IntersectionObserver(([e]) => { portraitVisible = e.isIntersecting; }).observe(portrait);
  requestAnimationFrame(drawDots);

  /* ---------- scroll-driven bits ---------- */
  const navLinks = $$('.bar__keys a');
  const sections = navLinks.map(a => $(a.getAttribute('href')));
  const footWord = $('.foot__word');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const vh = innerHeight;
    // manifesto words
    const r = scrub.getBoundingClientRect();
    const p = clamp((vh * .85 - r.top) / (r.height + vh * .35), 0, 1);
    const lit = Math.floor(p * words.length * 1.05);
    words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    // pipeline
    if (!mobilePipe.matches) {
      const pr = pipe.getBoundingClientRect();
      setPipe((-pr.top) / (pr.height - vh));
    }
    // active nav
    let active = 0;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * .4) active = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-on', i === active));
    // footer fill
    const fr = footWord.getBoundingClientRect();
    footWord.style.setProperty('--fill', clamp((vh - fr.top) / fr.height, 0, 1) * 100 + '%');
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- contact terminal ---------- */
  $('#term').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, out = $('#termOut');
    const name = f.name.value.trim(), email = f.email.value.trim(), msg = f.msg.value.trim();
    const body = `${msg}\n\n— ${name} (${email})`;
    out.textContent = '> compiling message… ';
    setTimeout(() => {
      out.textContent = '> opening mail client ✓';
      location.href = `mailto:contact@quantifyterminal.com?subject=${encodeURIComponent('Hello from ' + name)}&body=${encodeURIComponent(body)}`;
      f.reset();
    }, 500);
  });

  /* ---------- command palette ---------- */
  const cmd = $('#cmd'), cIn = $('#cmdInput'), cList = $('#cmdList');
  const go = id => () => $(id).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  const open = url => () => window.open(url, '_blank', 'noopener');
  const commands = [
    ['INDEX', 'go · top', go('#index')],
    ['QUANTIFY', 'go · the company', go('#quantify')],
    ['FOUNDER', 'go · about', go('#founder')],
    ['WATCHLIST', 'go · projects', go('#work')],
    ['HEATMAP', 'go · skills', go('#stack')],
    ['LEDGER', 'go · timeline', go('#ledger')],
    ['CONNECT', 'go · contact', go('#contact')],
    ['QT.COM', 'open · quantifyterminal.com', open('https://www.quantifyterminal.com')],
    ['BOOK', 'open · book a call', open('https://calendar.app.google/xxkz8n8ozpzJnkQp9')],
    ['RESUME', 'open · résumé pdf', open('media/AaryanResume.pdf')],
    ['EMAIL', 'mail · contact@quantifyterminal.com', () => { location.href = 'mailto:contact@quantifyterminal.com'; }],
    ['GITHUB', 'open · github', open('https://github.com/aaryansaroha98')],
    ['LINKEDIN', 'open · linkedin', open('https://www.linkedin.com/in/aaryan-saroha-4301a3378/')],
    ['X', 'open · @aaryan_sar60649', open('https://x.com/aaryan_sar60649')]
  ];
  let filtered = commands, sel = 0, lastFocus = null;
  function renderCmd() {
    const q = cIn.value.trim().toLowerCase();
    filtered = q === 'help' ? commands : commands.filter(([n, d]) => (n + ' ' + d).toLowerCase().includes(q));
    sel = clamp(sel, 0, Math.max(0, filtered.length - 1));
    cList.innerHTML = filtered.length
      ? filtered.map(([n, d], i) => `<li data-i="${i}" class="${i === sel ? 'is-sel' : ''}"><span>${n}</span><em>${d}</em></li>`).join('')
      : '<li><span>NO MATCH</span><em>try HELP</em></li>';
  }
  function openCmd() { lastFocus = document.activeElement; cmd.hidden = false; cIn.value = ''; sel = 0; renderCmd(); cIn.focus(); }
  function closeCmd() { cmd.hidden = true; lastFocus && lastFocus.focus && lastFocus.focus(); }
  function run(i) { const c = filtered[i]; if (!c) return; closeCmd(); c[2](); }
  $('#cmdOpen').addEventListener('click', openCmd);
  cIn.addEventListener('input', () => { sel = 0; renderCmd(); });
  cList.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i); });
  cmd.addEventListener('click', e => { if (e.target === cmd) closeCmd(); });
  cIn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { sel = (sel + 1) % Math.max(1, filtered.length); renderCmd(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = (sel - 1 + filtered.length) % Math.max(1, filtered.length); renderCmd(); e.preventDefault(); }
    else if (e.key === 'Enter') run(sel);
  });
  addEventListener('keydown', e => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (e.key === 'Escape' && !cmd.hidden) { closeCmd(); return; }
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) { e.preventDefault(); cmd.hidden ? openCmd() : closeCmd(); return; }
    if (!typing && cmd.hidden && /^[1-7]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const a = navLinks[+e.key - 1];
      a && go(a.getAttribute('href'))();
    }
  });
})();
