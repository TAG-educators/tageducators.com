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
    return '<a class="orbit-chip" href="subject.html?subject=' + encodeURIComponent(s.name) + '">' +
      '<span class="dot" style="background:color-mix(in srgb, var(--plum-glow) 18%, transparent); color:var(--plum-glow)">' +
      '<svg viewBox="0 0 24 24" fill="none">' + s.icon + '</svg></span>' +
      '<span class="name">' + s.name + '</span>' +
      '<span class="lvl">' + s.levels.join(' \u00b7 ') + '</span></a>';
  }).join('');
}

// ---------- Scroll reveal ----------
// Sections fade and rise into place as they enter the viewport — one quiet,
// consistently-applied pattern rather than a different effect per section.
(function () {
  var targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  targets.forEach(function (el) { io.observe(el); });
})();

// ---------- Hero subject search (homepage) ----------
// Matches free-text input against the subject list; a short pulse on the
// search bar gives feedback, then hands off to the shared page transition.
(function () {
  var form = document.getElementById('heroSearch');
  if (!form || typeof TAG_SUBJECTS === 'undefined') return;
  var input = document.getElementById('heroSearchInput');
  var status = document.getElementById('heroSearchStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = (input.value || '').trim().toLowerCase();
    if (!q) return;

    form.classList.remove('pulse');
    void form.offsetWidth; // restart the pulse animation on repeat searches
    form.classList.add('pulse');

    var match = TAG_SUBJECTS.find(function (s) {
      return s.name.toLowerCase().indexOf(q) !== -1;
    });

    if (match) {
      status.textContent = 'Found ' + match.name + ' — taking you there…';
      status.className = 'hero-search-status success';
      var dest = 'subject.html?subject=' + encodeURIComponent(match.name);
      try { sessionStorage.setItem('tagEntering', '1'); } catch (err) {}
      document.body.classList.add('tag-leaving');
      setTimeout(function () { window.location.href = dest; }, 280);
    } else {
      status.textContent = "We don't teach that yet \u2014 browse all courses below.";
      status.className = 'hero-search-status error';
    }
  });
})();
