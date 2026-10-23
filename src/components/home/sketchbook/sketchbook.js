export function mountSketchbook(root, { pages, land = 0 }) {
  const ac = new AbortController();
  const on = (target, type, fn, opts) => target?.addEventListener(type, fn, { ...opts, signal: ac.signal });
  const q = (name) => root.querySelector('[data-sb="' + name + '"]');
  let disposed = false;
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(() => { if (!disposed) fn(); }, ms));

  const PAGES = pages.map((p) => ({ ...p, url: p.src }));
  const M = PAGES.length, LAND = Math.min(Math.max(0, land), M - 1);

  const wrap = q('wrap');
  const stage = q('stage');
  const sb3d = q('view');
  const book = q('book');
  const capBox = q('captions');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const zRead = q('zoom-read');
  const zInBtn = q('zoom-in'), zOutBtn = q('zoom-out');

  const N = 18;
  const SPAN = 0.449;
  const BETA = 0.60;
  let idx = 0, turn = null;
  let strips = [];
  let capOut = null, capIn = null;

  function el(t, c) { const e = document.createElement(t); if (c) e.className = c; return e; }
  function imgEl(i, side) {
    const im = new Image(); im.className = 'sb-half-img ' + side;
    im.draggable = false; im.alt = ''; im.src = PAGES[i].url; return im;
  }

  function halfEl(pos, i) {
    const d = el('div', 'sb-half ' + pos);
    d.appendChild(imgEl(i, pos));
    d.appendChild(el('div', 'gutter-shade ' + pos));
    return d;
  }
  function buildCurl(dir, from, to) {
    strips = [];
    const c = el('div', 'curl ' + dir);
    c.style.setProperty('--n', N);
    c.style.setProperty('--span', SPAN);
    let host = c;
    for (let i = 0; i < N; i++) {
      const s = el('div', 'strip');
      s.style.setProperty('--i', i);
      const gut = 'calc(var(--bw) * 0.5)';
      const sw = 'calc(var(--bw) * ' + SPAN + ' / ' + N + ')';
      const A = 'calc(-1 * (' + gut + ' + ' + i + ' * ' + sw + '))';
      const B = 'calc(' + (i + 1) + ' * ' + sw + ' - ' + gut + ')';
      const f = el('div', 'face front'), b = el('div', 'face back');
      const dress = (e, url, px) => {
        e.style.backgroundImage = 'url(' + url + ')';
        e.style.backgroundPositionX = px;
      };
      dress(f, PAGES[from].url, dir === 'next' ? A : B);
      dress(b, PAGES[to].url, dir === 'next' ? B : A);
      f.appendChild(el('div', 'sh')); f.appendChild(el('div', 'gl'));
      b.appendChild(el('div', 'sh')); b.appendChild(el('div', 'gl'));
      s.appendChild(f); s.appendChild(b);
      if (i === N - 1) s.classList.add('edge');
      host.appendChild(s); host = s;
      strips.push(s);
    }
    return c;
  }
  function applyTurn(t) {
    const th = Math.PI * t;
    const beta = BETA * Math.sin(Math.PI * t);
    const D = 180 / Math.PI;
    const tt = th + beta, td = 2 * beta / N;
    sb3d.style.setProperty('--tt', (tt * D).toFixed(2) + 'deg');
    sb3d.style.setProperty('--td', (td * D).toFixed(3) + 'deg');
    sb3d.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3));
    fadeCaption(t);
    for (let i = 0; i < strips.length; i++) {
      const l1 = Math.abs(Math.cos(tt - i * td));
      const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
      const st = strips[i].style;
      st.setProperty('--lit', l1.toFixed(3));
      st.setProperty('--a1', ((1 - l1) * .62).toFixed(3));
      st.setProperty('--a2', ((1 - l2) * .62).toFixed(3));
    }
  }
  function paint() {
    book.textContent = '';
    if (!turn) {
      const f = el('div', 'sb-full');
      const im = new Image(); im.src = PAGES[idx].url; im.alt = PAGES[idx].title;
      im.draggable = false;
      f.appendChild(im); book.appendChild(f);
      sb3d.style.setProperty('--shade', '0');
    } else {
      const next = turn.dir === 'next';
      book.appendChild(halfEl('left', next ? turn.from : turn.to));
      book.appendChild(halfEl('right', next ? turn.to : turn.from));
      book.appendChild(buildCurl(turn.dir, turn.from, turn.to));
      applyTurn(turn.t);
    }
    const a = el('button', 'sb-zone sb-prev'), b = el('button', 'sb-zone sb-next');
    a.setAttribute('aria-label', 'previous page'); b.setAttribute('aria-label', 'next page');
    book.appendChild(a); book.appendChild(b);
    layout();
    caption();
  }
  function caption() {
    capBox.textContent = '';
    capOut = capIn = null;
    if (turn) {
      capOut = el('p', 'sb-caption live'); capOut.textContent = PAGES[turn.from].title; capBox.appendChild(capOut);
      capIn = el('p', 'sb-caption live'); capIn.textContent = PAGES[turn.to].title; capBox.appendChild(capIn);
      fadeCaption(turn.t);
    } else {
      const p = el('p', 'sb-caption'); p.textContent = PAGES[idx].title; capBox.appendChild(p);
    }
  }
  function fadeCaption(t) {
    if (!capOut || !capIn) return;
    const out = 1 - Math.max(0, Math.min(1, (t - 0.10) / 0.28));
    const inn = Math.max(0, Math.min(1, (t - 0.56) / 0.30));
    capOut.style.opacity = out.toFixed(3);
    capIn.style.opacity = inn.toFixed(3);
  }
  function layout() {
    sb3d.style.setProperty('--bw', book.clientWidth + 'px');
  }
  on(window, 'resize', layout);

  let spring = null;
  function animateTo(target, onDone, stiff, damp) {
    spring = { kind: 'spring', v: 0, target: target, done: onDone, k: stiff || 150, c: damp || 22 };
    kick();
  }
  function tweenTo(target, dur, onDone) {
    spring = { kind: 'tween', from: turn ? turn.t : 0, target: target, dur: dur, e: 0, done: onDone };
    kick();
  }
  let raf = null, last = 0;
  function tick(now) {
    raf = null;
    if (disposed) return;
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016); last = now;
    if (spring && turn) {
      const s = spring;
      if (s.kind === 'tween') {
        s.e += dt;
        const k = Math.min(1, s.e / s.dur);
        turn.t = s.from + (s.target - s.from) * k;
        applyTurn(turn.t);
        if (k >= 1) { spring = null; const d = s.done; if (d) d(); }
      } else {
        const x = turn.t - s.target;
        s.v += (-s.k * x - s.c * s.v) * dt;
        turn.t += s.v * dt;
        if (Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
          turn.t = s.target; spring = null;
          applyTurn(turn.t);
          const d = s.done; if (d) d();
        } else applyTurn(turn.t);
      }
    }
    viewSpring();
    if ((spring || viewActive) && raf === null) raf = requestAnimationFrame(tick);
  }
  function kick() { if (raf === null && !disposed) { last = performance.now(); raf = requestAnimationFrame(tick); } }

  const TILT_X = 4.5, TILT_Y = 7;
  const ZOOM_STEPS = [0.9, 1, 1.16, 1.35, 1.5];
  const ZOOM_MIN = ZOOM_STEPS[0], ZOOM_MAX = ZOOM_STEPS[ZOOM_STEPS.length - 1];
  const view = { rx: 0, ry: 0, z: 1, trx: 0, try_: 0, tz: 1 };
  let viewActive = false;
  function applyView() {
    sb3d.style.setProperty('--rx', view.rx.toFixed(2) + 'deg');
    sb3d.style.setProperty('--ry', view.ry.toFixed(2) + 'deg');
    sb3d.style.setProperty('--zoom', view.z.toFixed(3));
  }
  function viewSpring() {
    const e = 0.14;
    let moved = false;
    for (const [k, t] of [['rx', 'trx'], ['ry', 'try_'], ['z', 'tz']]) {
      const d = view[t] - view[k];
      if (Math.abs(d) > 0.0006) { view[k] += d * e; moved = true; }
      else view[k] = view[t];
    }
    if (moved) applyView();
    viewActive = moved;
    return moved;
  }
  function setView(rx, ry, z) {
    view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx));
    view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry));
    view.tz = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    viewActive = true; kick();
    syncZoom();
  }
  function tiltTo(cx, cy) {
    if (drag) return;
    const r = book.getBoundingClientRect();
    if (!r.width) return;
    const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)));
    const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)));
    setView(-ny * TILT_X, nx * TILT_Y, view.tz);
  }
  on(window, 'pointermove', (e) => {
    if (e.pointerType === 'touch' || !inView) return;
    tiltTo(e.clientX, e.clientY);
  }, { passive: true });
  on(window, 'pointerout', (e) => { if (!e.relatedTarget) setView(0, 0, view.tz); });
  on(window, 'blur', () => setView(0, 0, view.tz));
  on(stage, 'dblclick', () => setView(view.trx, view.try_, 1));

  let drag = null;
  function bookRect() { return book.getBoundingClientRect(); }

  on(stage, 'pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const onBook = e.target.closest('.sb-zone');
    stage.setPointerCapture(e.pointerId);
    if (!onBook || introOn) return;
    const r = bookRect();
    const dir = (e.clientX - r.left) / r.width > 0.5 ? 'next' : 'prev';
    startTurn(dir, 0);
    drag = { dir: dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() };
  });
  on(stage, 'pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x0;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    const raw = (drag.dir === 'next' ? -dx : dx) / (drag.w * 0.62);
    const t = Math.max(0, Math.min(1, raw));
    const now = performance.now();
    drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000);
    drag.tPrev = now;
    if (turn) { turn.t = t; applyTurn(t); }
  });
  function endDrag() {
    if (!drag) return;
    const d = drag; drag = null;
    if (!turn) return;
    if (d.moved < 6) {
      commit(); return;
    }
    const go = turn.t > 0.42 || d.vel > 1.1;
    if (go) commit(); else cancel();
  }
  on(stage, 'dragstart', (e) => e.preventDefault());
  on(stage, 'selectstart', (e) => e.preventDefault());
  on(stage, 'pointerup', endDrag);
  on(stage, 'pointercancel', endDrag);

  function startTurn(dir, t) {
    spring = null;
    if (turn) { idx = turn.to; turn = null; }
    const from = idx;
    turn = { dir: dir, from: from, to: dir === 'next' ? (from + 1) % M : (from - 1 + M) % M, t: t || 0 };
    paint();
  }
  function commit() {
    if (!turn) return;
    if (REDUCED) { idx = turn.to; turn = null; paint(); return; }
    animateTo(1, () => { idx = turn.to; turn = null; paint(); }, 170, 26);
    kick();
  }
  function cancel() {
    if (!turn) return;
    animateTo(0, () => { turn = null; paint(); }, 150, 24);
    kick();
  }
  function step(dir) {
    if (introOn) endIntro();
    if (turn) { idx = turn.to; turn = null; }
    startTurn(dir, 0); commit();
  }
  on(q('prev'), 'click', () => step('prev'));
  on(q('next'), 'click', () => step('next'));
  on(window, 'keydown', (e) => {
    if (!inView) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    e.preventDefault();
    step(e.key === 'ArrowRight' ? 'next' : 'prev');
  });

  function syncZoom() {
    if (zRead) zRead.textContent = Math.round(view.tz * 100) + '%';
    if (zOutBtn) zOutBtn.disabled = view.tz <= ZOOM_MIN + 0.001;
    if (zInBtn) zInBtn.disabled = view.tz >= ZOOM_MAX - 0.001;
  }
  const zoomStep = (dir) => {
    const next = dir > 0
      ? ZOOM_STEPS.find((z) => z > view.tz + 0.001)
      : [...ZOOM_STEPS].reverse().find((z) => z < view.tz - 0.001);
    if (next !== undefined) setView(view.trx, view.try_, next);
  };
  on(zInBtn, 'click', () => zoomStep(1));
  on(zOutBtn, 'click', () => zoomStep(-1));

  let riffle = null, riffleAt = 0, introOn = false;
  function endIntro() {
    introOn = false; wrap.classList.remove('intro', 'b2');
  }
  function riffleStep() {
    const s = riffle[riffleAt];
    wrap.classList.toggle('b2', s.bell > 0.55);
    startTurn('next', 0);
    tweenTo(1, s.dur, () => {
      idx = turn.to; turn = null;
      riffleAt++;
      if (introOn && riffleAt < riffle.length) { paint(); riffleStep(); }
      else { endIntro(); paint(); }
    });
  }
  function startIntro() {
    const coarse = matchMedia('(max-width: 640px), (pointer: coarse)').matches;
    if (coarse || REDUCED) { idx = LAND; paint(); return; }
    const steps = M + LAND;
    riffle = [];
    for (let r = 0; r < steps; r++) {
      const bell = Math.sin(Math.PI * (r / (steps - 1)));
      riffle.push({ bell: bell, dur: 0.26 - 0.19 * bell });
    }
    riffleAt = 0; introOn = true; wrap.classList.add('intro');
    riffleStep();
  }

  let inView = false, booted = false, introQueued = false;
  function maybeIntro() {
    if (booted && inView && !introQueued) { introQueued = true; later(startIntro, 220); }
  }
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.intersectionRatio >= 0.35;
    maybeIntro();
  }, { threshold: [0, 0.35, 0.7] });
  io.observe(wrap);

  (async function boot() {
    idx = 0;
    paint(); applyView();
    await Promise.all(PAGES.map((p) => {
      const im = new Image(); im.src = p.url;
      return im.decode ? im.decode().catch(() => {}) : new Promise((r) => { im.onload = im.onerror = r; });
    }));
    if (document.fonts && document.fonts.ready) await document.fonts.ready.catch(() => {});
    if (disposed) return;
    syncZoom();
    root.dataset.ready = '1';
    booted = true;
    maybeIntro();
  })();

  return () => {
    disposed = true;
    ac.abort();
    io.disconnect();
    timers.forEach(clearTimeout);
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null; spring = null; turn = null; drag = null;
    book.textContent = '';
    capBox.textContent = '';
    wrap.classList.remove('intro', 'b2');
    for (const p of ['--tt', '--td', '--shade', '--rx', '--ry', '--zoom', '--bw']) sb3d.style.removeProperty(p);
    delete root.dataset.ready;
  };
}
