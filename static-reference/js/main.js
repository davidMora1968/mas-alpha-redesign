// Mas Alpha Securities — homepage scroll machinery.
// Slow reveals + gentle parallax. No bounce, ever.
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav: transparent over hero, solid navy after 80px ---------- */
  var nav = document.getElementById('nav');
  var parallaxEl = document.getElementById('hero-parallax');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-solid', y > 80);
    if (parallaxEl && !reduced) {
      parallaxEl.style.transform = 'translateY(' + y * 0.18 + 'px)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------- Hero image: slow fade-in once loaded ---------- */
  var heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    var img = new Image();
    img.onload = function () { heroBg.classList.add('is-ready'); };
    img.onerror = function () { heroBg.classList.add('is-ready'); }; // never leave the hero dark
    img.src = 'assets/imagery/miami-shoreline.jpg';
  }

  /* ---------- Reveals: fade + rise when entering the viewport ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-seen'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-seen');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- Credibility band: staggered reveal + count-up ---------- */
  // Markup carries final values so the band reads correctly without JS;
  // counters reset to zero only at the moment the animation starts.
  var cred = document.getElementById('cred');

  function easeOutQuart(p) { return 1 - Math.pow(1 - p, 4); } // settles gently

  function runCountUp(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var pad = parseInt(el.getAttribute('data-pad') || '0', 10);
    var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
    var final = el.getAttribute('data-final');
    var duration = 1500;
    var t0 = null;

    el.textContent = String(0).padStart(pad, '0');

    function tick(now) {
      if (t0 === null) t0 = now;
      var elapsed = now - t0 - delay;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      var p = Math.min(elapsed / duration, 1);
      var v = Math.round(easeOutQuart(p) * target);
      el.textContent = String(v).padStart(pad, '0');
      if (p < 1) requestAnimationFrame(tick);
      else if (final) el.textContent = final;
    }
    requestAnimationFrame(tick);
  }

  if (cred) {
    if (reduced || !('IntersectionObserver' in window)) {
      cred.classList.add('is-seen'); // static final values, no motion
    } else {
      var credIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cred.classList.add('is-seen');
            cred.querySelectorAll('[data-count]').forEach(runCountUp);
            credIO.disconnect();
          }
        });
      }, { threshold: 0.35 });
      credIO.observe(cred);
    }
  }
})();
