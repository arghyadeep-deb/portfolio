/* ===== Arghyadeep Deb — Portfolio: vertical flow + plexus + globe ===== */
(function () {
  'use strict';

  var IDS = ['sec-hero', 'sec-about', 'sec-vector', 'sec-projects', 'sec-experience', 'sec-skills', 'sec-certs', 'sec-contact'];
  var NAMES = ['INTRO', 'ABOUT', 'V.E.C.T.O.R.', 'PROJECTS', 'EXPERIENCE', 'SKILLS', 'CERTS', 'CONTACT'];
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

  /* ---------- Scroll reveals (IntersectionObserver: reliable, replays on entry) ---------- */
  function initReveals() {
    if (reduced || !window.gsap || !window.IntersectionObserver) return;
    // (called via whenGsap so window.gsap is guaranteed present here)

    function headingLS(h) { return h.getAttribute('data-ls') || getComputedStyle(h).letterSpacing; }

    function hide(sec) {
      var h = sec.querySelector('h2');
      if (h) { gsap.killTweensOf(h); gsap.set(h, { opacity: 0, letterSpacing: '0.24em', filter: 'blur(8px)' }); }
      var kids = sec.__kids;
      if (kids && kids.length) { gsap.killTweensOf(kids); gsap.set(kids, { opacity: 0, y: 26 }); }
    }
    function show(sec) {
      var h = sec.querySelector('h2');
      if (h) {
        gsap.killTweensOf(h);
        gsap.fromTo(h,
          { opacity: 0, letterSpacing: '0.24em', filter: 'blur(8px)' },
          { opacity: 1, letterSpacing: headingLS(h), filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' });
      }
      var kids = sec.__kids;
      if (kids && kids.length) {
        gsap.killTweensOf(kids);
        gsap.fromTo(kids, { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out' });
      }
    }

    // Hero name: same reveal, once on load
    var h1 = document.querySelector('#sec-hero h1');
    if (h1) {
      gsap.fromTo(h1,
        { opacity: 0, letterSpacing: '0.24em', filter: 'blur(8px)' },
        { opacity: 1, letterSpacing: getComputedStyle(h1).letterSpacing, filter: 'blur(0px)',
          duration: 1.1, ease: 'power3.out' });
    }

    var secs = IDS.slice(1).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    secs.forEach(function (sec) {
      var h = sec.querySelector('h2');
      if (h) h.setAttribute('data-ls', getComputedStyle(h).letterSpacing); // capture natural spacing before hiding
      sec.__kids = Array.prototype.filter.call(sec.children, function (el) { return el !== h; });
      hide(sec);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) show(e.target); else hide(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    secs.forEach(function (sec) { io.observe(sec); });
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

  /* ---------- Network globes (follow cursor, two nested spheres) ---------- */
  function startGlobe() {
    var c = document.getElementById('globe');
    if (!c) return;

    function makeSphere(N, thresh) {
      var pts = [], edges = [], i, j;
      for (i = 0; i < N; i++) {
        var y = 1 - (i / (N - 1)) * 2;
        var rr = Math.sqrt(Math.max(0, 1 - y * y));
        var th = i * 2.399963229728653;
        pts.push({ x: Math.cos(th) * rr, y: y, z: Math.sin(th) * rr });
      }
      for (i = 0; i < N; i++) {
        for (j = i + 1; j < N; j++) {
          var dot = pts[i].x * pts[j].x + pts[i].y * pts[j].y + pts[i].z * pts[j].z;
          if (dot > thresh) edges.push([i, j]);
        }
      }
      return { pts: pts, edges: edges };
    }

    function setup() {
      var S = c.clientWidth;
      if (S === 0) { requestAnimationFrame(setup); return; }
      var ctx = c.getContext('2d');
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = S * dpr; c.height = S * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var rgb = accentRGB();
      var F = S * 1.15;

      // Outer + inner globe. Inner is smaller and phase-offset -> reads as two globes.
      var outer = makeSphere(120, 0.9);
      var inner = makeSphere(70, 0.86);
      var globes = [
        { data: outer, R: S * 0.42, ph: 0.0, dot: 1.9, auto: false, spd: 0 },
        { data: inner, R: S * 0.27, ph: 1.1, dot: 1.5, auto: true,  spd: 0.010 }
      ];

      // rotation eased toward cursor
      var rx = -0.3, ry = 0, trx = -0.3, try_ = 0;
      window.addEventListener('mousemove', function (e) {
        var nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1..1
        var ny = (e.clientY / window.innerHeight) * 2 - 1;
        try_ = nx * 0.9;
        trx = -0.3 + ny * 0.7;
      }, { passive: true });
      window.addEventListener('deviceorientation', function (e) {
        if (e.gamma == null) return;
        try_ = Math.max(-1, Math.min(1, e.gamma / 45)) * 0.9;
        trx = -0.3 + Math.max(-1, Math.min(1, (e.beta || 0) / 45)) * 0.7;
      });

      function drawGlobe(g, rxx, ryy, autoAng) {
        var d = g.data, R = g.R, proj = new Array(d.pts.length), i;
        var ryG, rxG;
        if (g.auto) { ryG = autoAng + g.ph; rxG = -0.45; }
        else { ryG = ryy + g.ph; rxG = rxx; }
        var cy = Math.cos(ryG), sy = Math.sin(ryG), cx = Math.cos(rxG), sx = Math.sin(rxG);
        for (i = 0; i < d.pts.length; i++) {
          var pnt = d.pts[i];
          var x1 = pnt.x * cy + pnt.z * sy, z1 = -pnt.x * sy + pnt.z * cy;
          var y1 = pnt.y * cx - z1 * sx, z2 = pnt.y * sx + z1 * cx;
          var sc = F / (F - z2 * R);
          proj[i] = { x: S / 2 + x1 * R * sc, y: S / 2 + y1 * R * sc, t: (z2 + 1) / 2 };
        }
        for (var k = 0; k < d.edges.length; k++) {
          var a = proj[d.edges[k][0]], b = proj[d.edges[k][1]];
          ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.04 + ((a.t + b.t) / 2) * 0.2).toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
        for (i = 0; i < proj.length; i++) {
          var q = proj[i];
          ctx.fillStyle = 'rgba(' + rgb + ',' + (0.16 + q.t * 0.55).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(q.x, q.y, (0.7 + q.t * g.dot), 0, 7); ctx.fill();
        }
      }

      var spinAng = 0;
      function render() {
        ctx.clearRect(0, 0, S, S);
        for (var gi = 0; gi < globes.length; gi++) {
          drawGlobe(globes[gi], rx, ry, spinAng * (globes[gi].spd / 0.010 || 1));
        }
      }

      if (reduced) { render(); return; }
      (function loop() {
        rx += (trx - rx) * 0.06;
        ry += (try_ - ry) * 0.06;
        spinAng += 0.010;
        render();
        requestAnimationFrame(loop);
      })();
    }
    setup();
  }

  /* ---------- Boot ---------- */
  function whenGsap(cb) {
    if (window.gsap) return cb();
    var n = 0;
    var iv = setInterval(function () {
      if (window.gsap || n++ > 100) { clearInterval(iv); cb(); }
    }, 30);
  }
  function boot() {
    initScrollUI();
    whenGsap(initReveals);
    startPlexus();
    startGlobe();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
