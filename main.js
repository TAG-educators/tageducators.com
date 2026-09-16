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

// ---------- Resources grid (resources page) ----------
// One card per subject, built from the shared dataset — the only place
// this list needs editing is subjects-data.js (each subject's
// `resources` array), so the page itself never needs to change.
var resourcesGrid = document.getElementById('resourcesGrid');
if (resourcesGrid && typeof TAG_SUBJECTS !== 'undefined') {
  resourcesGrid.innerHTML = TAG_SUBJECTS.map(function (s) {
    var body;
    if (s.resources && s.resources.length) {
      body = '<div class="resource-list">' + s.resources.map(function (r) {
        return '<a class="resource-item" href="' + r.url + '" target="_blank" rel="noopener">' +
          '<span class="resource-item-title">' + r.title + '</span>' +
          '<span class="resource-item-type">' + (r.type || 'File') + '</span>' +
        '</a>';
      }).join('') + '</div>';
    } else {
      body = '<p class="resource-empty">Coming soon for ' + s.name + '. Need something sooner? Ask us on WhatsApp.</p>';
    }
    return '<div class="resource-card reveal">' +
      '<div class="icon"><svg viewBox="0 0 24 24" fill="none">' + s.icon + '</svg></div>' +
      '<h3>' + s.name + '</h3>' +
      body +
      '</div>';
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

// ---------- Video review facades (homepage) ----------
// Click-to-load YouTube embeds — keeps the page light instead of loading
// three video players before anyone has actually pressed play.
(function () {
  function loadVideo(frame) {
    var id = frame.getAttribute('data-video-id');
    if (!id) return;
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    iframe.title = 'Student video review';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
    frame.innerHTML = '';
    frame.appendChild(iframe);
  }
  document.querySelectorAll('.review-frame[data-video-id]').forEach(function (frame) {
    frame.addEventListener('click', function () { loadVideo(frame); }, { once: true });
    frame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadVideo(frame); }
    }, { once: true });
  });
})();

// ---------- Hero HUD (Grade Climb / Distance Sailed) ----------
// A playful, scroll-linked pair of readouts echoing a speedometer/odometer —
// purely decorative motion design, not a claim about any individual student.
(function () {
  var hud = document.getElementById('heroHud');
  var gradeLetter = document.getElementById('hudGradeLetter');
  var gradeFill = document.getElementById('hudGradeFill');
  var distanceEl = document.getElementById('hudDistance');
  if (!hud || !gradeLetter || !gradeFill || !distanceEl) return;

  var GRADES = ['U', 'E', 'D', 'C', 'B', 'A', 'A*'];
  var MAX_NM = 12;
  var ticking = false;

  function update() {
    ticking = false;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0;

    var gradeProgress = Math.min(1, progress * 1.8);
    var gradeIndex = Math.min(GRADES.length - 1, Math.floor(gradeProgress * (GRADES.length - 1) + 0.001));
    gradeLetter.textContent = GRADES[gradeIndex];
    gradeFill.style.width = (gradeProgress * 100).toFixed(0) + '%';

    distanceEl.textContent = (progress * MAX_NM).toFixed(3);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  hud.classList.add('visible');
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();

// ---------- Hero subject search (homepage) ----------
// Populates the subject dropdown from the shared dataset; a short pulse on
// the search bar gives feedback, then hands off to the shared page transition.
(function () {
  var form = document.getElementById('heroSearch');
  if (!form || typeof TAG_SUBJECTS === 'undefined') return;
  var levelSelect = document.getElementById('heroLevelSelect');
  var subjectSelect = document.getElementById('heroSubjectSelect');
  var status = document.getElementById('heroSearchStatus');

  if (subjectSelect) {
    TAG_SUBJECTS.forEach(function (s) {
      var opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name;
      subjectSelect.appendChild(opt);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var subjectName = subjectSelect ? subjectSelect.value : '';

    form.classList.remove('pulse');
    void form.offsetWidth; // restart the pulse animation on repeat searches
    form.classList.add('pulse');

    if (!subjectName) {
      status.textContent = 'Pick a subject to continue.';
      status.className = 'hero-search-status error';
      return;
    }

    var level = levelSelect ? levelSelect.value : '';
    status.textContent = 'Taking you to ' + subjectName + '\u2026';
    status.className = 'hero-search-status success';
    var dest = 'subject.html?subject=' + encodeURIComponent(subjectName) + (level ? '&level=' + encodeURIComponent(level) : '');
    try { sessionStorage.setItem('tagEntering', '1'); } catch (err) {}
    document.body.classList.add('tag-leaving');
    setTimeout(function () { window.location.href = dest; }, 280);
  });
})();
