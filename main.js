// ---------- Shared behavior across all pages ----------

// Footer year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
var menuBtn = document.getElementById('menuBtn');
var navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navLinks.classList.remove('open'); });
  });
}

// FAQ accordion (homepage)
document.querySelectorAll('.faq-q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// Stat counters (trigger once visible) — functional motion only
var statEls = document.querySelectorAll('.stat-num');
if ('IntersectionObserver' in window && statEls.length) {
  var statIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var duration = 1200;
      var start = performance.now();
      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  statEls.forEach(function (el) { statIO.observe(el); });
} else {
  statEls.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
}

// Orbit strip (homepage) — one chip per subject, reading the shared dataset
var orbitTrack = document.getElementById('orbitTrack');
if (orbitTrack && typeof TAG_SUBJECTS !== 'undefined') {
  orbitTrack.innerHTML = TAG_SUBJECTS.map(function (s) {
    return '<a class="orbit-chip" href="subject.html?subject=' + encodeURIComponent(s.name) + '" style="--card-accent:' + s.accent + '">' +
      '<span class="dot" style="background:color-mix(in srgb, ' + s.accent + ' 22%, transparent); color:' + s.accent + '">' +
      '<svg viewBox="0 0 24 24" fill="none">' + s.icon + '</svg></span>' +
      '<span class="name">' + s.name + '</span>' +
      '<span class="lvl">' + s.levels.join(' \u00b7 ') + '</span></a>';
  }).join('');
}
