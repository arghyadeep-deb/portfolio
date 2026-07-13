/* ===== Arghyadeep Deb — Portfolio: vertical flow + plexus + globe ===== */
(function () {
  'use strict';

  var IDS = ['sec-hero', 'sec-vector', 'sec-projects', 'sec-experience', 'sec-skills', 'sec-certs', 'sec-contact'];
  var NAMES = ['INTRO', 'V.E.C.T.O.R.', 'PROJECTS', 'EXPERIENCE', 'SKILLS', 'CERTS', 'CONTACT'];
  var isMobile = function () { return window.matchMedia('(max-width: 820px)').matches; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function accentRGB() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '94,225,255';
  }

  /* ---------- Nav ---------- */
  window.goTo = function (i) {
    var el = document.getElementById(IDS[i]);
    if (!el) return;
    window.scrollTo({ top: Math.max(0, el.offsetTop - 90), behavior: reduced ? 'auto' : 'smooth' });
  };

  /* ---------- Progress bar + active section ---------- */
  function initScrollUI() {
    var bar = document.getElementById('progressbar');
    var lab = document.getElementById('sectionlabel');
    var dots = document.querySelectorAll('[data-navdot]');
    var secs = IDS.map(function (id) { return document.getElementById(id); });
    var ticking = false;
    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.width = (p * 100).toFixed(2) + '%';
      var mid = window.scrollY + window.innerHeight * 0.5;
      var idx = 0;
      for (var i = 0; i < secs.length; i++) {
        if (secs[i] && secs[i].offsetTop <= mid) idx = i;
      }
      if (p > 0.985) idx = secs.length - 1;
      if (lab) lab.textContent = '0' + (idx + 1) + ' / ' + NAMES[idx];
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Scroll reveals (tracking-in headings + fade-up content) ---------- */
  function initReveals() {
    if (!window.gsap || !window.ScrollTrigger || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    IDS.slice(1).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      var h = sec.querySelector('h2');
      if (h) {
        gsap.fromTo(h,
          { opacity: 0, letterSpacing: '0.28em', filter: 'blur(8px)' },
          { opacity: 1, letterSpacing: getComputedStyle(h).letterSpacing, filter: 'blur(0px)',
            duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: sec, start: 'top 75%', once: true } });
      }
      var kids = Array.prototype.filter.call(sec.children, function (el) { return el !== h; });
      if (kids.length) {
        gsap.fromTo(kids,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: sec, start: 'top 75%', once: true } });
      }
    });
  }

  /* ---------- Plexus background ---------- */
  function startPlexus() {
    var c = document.getElementById('plexus');
    if (!c || reduced || isMobile()) return;
    var ctx = c.getContext('2d');
    var W = 0, H = 0;
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    var N = 70;
    var pts = [];
    for (var i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6
      });
    }
    var rgb = accentRGB();
    function step() {
      ctx.clearRect(0, 0, W, H);
      var R = 150, i, j, p;
      for (i = 0; i < N; i++) {
        p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (i = 0; i < N; i++) {
        for (j = i + 1; j < N; j++) {
          var dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            ctx.strokeStyle = 'rgba(' + rgb + ',' + ((1 - Math.sqrt(d2) / R) * 0.14).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      for (i = 0; i < N; i++) {
        ctx.fillStyle = 'rgba(' + rgb + ',0.45)';
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, 7); ctx.fill();
      }
      requestAnimationFrame(step);
    }
    step();
  }

  /* ---------- Network globe (drag to spin) ---------- */
  function startGlobe() {
    var c = document.getElementById('globe');
    if (!c || isMobile() || c.clientWidth === 0) return;
    var ctx = c.getContext('2d');
    var S = c.clientWidth;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = S * dpr; c.height = S * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var rgb = accentRGB();
    var N = 110, R = S * 0.36, F = S * 1.1;
    var pts = [], i, j;
    for (i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2;
      var rr = Math.sqrt(Math.max(0, 1 - y * y));
      var th = i * 2.399963229728653;
      pts.push({ x: Math.cos(th) * rr, y: y, z: Math.sin(th) * rr });
    }
    var edges = [];
    for (i = 0; i < N; i++) {
      for (j = i + 1; j < N; j++) {
        var dot = pts[i].x * pts[j].x + pts[i].y * pts[j].y + pts[i].z * pts[j].z;
        if (dot > 0.9) edges.push([i, j]);
      }
    }
    var rx = -0.35, ry = 0, spin = 0;
    var dragging = false, lx = 0, ly = 0;
    c.addEventListener('pointerdown', function (e) {
      dragging = true; lx = e.clientX; ly = e.clientY;
      c.setPointerCapture(e.pointerId);
    });
    c.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      ry += dx * 0.006;
      rx = Math.max(-1.2, Math.min(1.2, rx + dy * 0.004));
      spin = dx * 0.0006;
    });
    var stop = function () { dragging = false; };
    c.addEventListener('pointerup', stop);
    c.addEventListener('pointercancel', stop);
    var proj = new Array(N);
    function render() {
      ctx.clearRect(0, 0, S, S);
      var cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      for (i = 0; i < N; i++) {
        var p = pts[i];
        var x1 = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
        var y1 = p.y * cx - z1 * sx, z2 = p.y * sx + z1 * cx;
        var sc = F / (F - z2 * R);
        proj[i] = { x: S / 2 + x1 * R * sc, y: S / 2 + y1 * R * sc, t: (z2 + 1) / 2 };
      }
      for (var k = 0; k < edges.length; k++) {
        var a = proj[edges[k][0]], b = proj[edges[k][1]];
        ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.05 + ((a.t + b.t) / 2) * 0.22).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (i = 0; i < N; i++) {
        var q = proj[i];
        ctx.fillStyle = 'rgba(' + rgb + ',' + (0.18 + q.t * 0.55).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(q.x, q.y, 0.8 + q.t * 1.6, 0, 7); ctx.fill();
      }
    }
    if (reduced) { render(); return; }
    (function loop() {
      if (!dragging) { ry += 0.0032 + spin; spin *= 0.96; }
      render();
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Boot ---------- */
  function boot() {
    initScrollUI();
    initReveals();
    startPlexus();
    startGlobe();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
