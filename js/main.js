/* ===== Arghyadeep Deb — Portfolio: scroll camera + plexus ===== */
(function () {
  'use strict';

  var NAMES = ['INTRO', 'V.E.C.T.O.R.', 'PROJECTS', 'EXPERIENCE', 'SKILLS', 'CONTACT'];
  var KEYFRAMES = [
    { id: 'sec-hero',       z: 1.0 },
    { id: 'sec-vector',     z: 0.95 },
    { id: 'sec-projects',   z: 0.9 },
    { id: 'sec-experience', z: 1.0 },
    { id: 'sec-skills',     z: 0.98 },
    { id: 'sec-contact',    z: 1.15 }
  ];
  var SCRUB = 1.6;
  var tl = null;
  var raf = null;
  var isMobile = function () { return window.matchMedia('(max-width: 820px)').matches; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Camera helpers ---------- */
  function accentRGB() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '94,225,255';
  }

  function cam(k, el) {
    var zf = Math.min(1, window.innerWidth / 1500);
    var s = k.z * zf;
    var cx, cy;
    cx = el.offsetLeft + el.offsetWidth / 2;
    cy = el.offsetTop + el.offsetHeight / 2;
    s = Math.min(s, (window.innerHeight - 120) / el.offsetHeight, (window.innerWidth - 80) / el.offsetWidth);
    return { x: window.innerWidth / 2 - cx * s, y: window.innerHeight / 2 - cy * s, scale: s };
  }

  function build() {
    if (isMobile()) {
      if (tl) { if (tl.scrollTrigger) tl.scrollTrigger.kill(); tl.kill(); tl = null; }
      var w = document.getElementById('world');
      if (w) w.style.transform = 'none';
      return;
    }
    if (!window.gsap || !window.ScrollTrigger) return;
    var world = document.getElementById('world');
    if (!world) return;
    if (tl) { if (tl.scrollTrigger) tl.scrollTrigger.kill(); tl.kill(); }

    var secs = KEYFRAMES.map(function (k) { return document.getElementById(k.id); });
    gsap.set(world, cam(KEYFRAMES[0], secs[0]));
    secs.forEach(function (s, i) { gsap.set(s, { opacity: i !== 0 ? 0.28 : 1 }); });

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scrollspace',
        start: 'top top',
        end: 'bottom bottom',
        scrub: reduced ? true : SCRUB,
        onUpdate: function (st) {
          var bar = document.getElementById('progressbar');
          if (bar) bar.style.width = (st.progress * 100).toFixed(2) + '%';
          var idx = Math.min(NAMES.length - 1, Math.round(st.progress * (NAMES.length - 1)));
          var lab = document.getElementById('sectionlabel');
          if (lab) lab.textContent = '0' + (idx + 1) + ' / ' + NAMES[idx];
          var dots = document.querySelectorAll('[data-navdot]');
          dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
        }
      }
    });

    for (var i = 1; i < KEYFRAMES.length; i++) {
      tl.to(world, { x: cam(KEYFRAMES[i], secs[i]).x, y: cam(KEYFRAMES[i], secs[i]).y, scale: cam(KEYFRAMES[i], secs[i]).scale, duration: 1, ease: reduced ? 'none' : 'power2.inOut' });
      tl.to(secs[i - 1], { opacity: 0.28, duration: 0.35 }, '<');
      tl.to(secs[i], { opacity: 1, duration: 0.5 }, '<0.4');
      tl.to({}, { duration: 0.45 });
    }
  }

  window.goTo = function (i) {
    if (isMobile()) {
      var el = document.getElementById(KEYFRAMES[i].id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      return;
    }
    var space = document.getElementById('scrollspace');
    if (!space) return;
    var max = space.offsetHeight - window.innerHeight;
    var n = KEYFRAMES.length;
    var p = i === 0 ? 0 : (i * 1.45 - 0.225) / ((n - 1) * 1.45);
    window.scrollTo({ top: p * max, behavior: 'smooth' });
  };

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
      raf = requestAnimationFrame(step);
    }
    step();
  }

  /* ---------- Boot ---------- */
  function boot() {
    if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    build();
    startPlexus();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 150); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
