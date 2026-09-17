// ---------- Voyage tracker (site-wide journey progress) ----------
// A real record of how far a visitor has actually sailed toward enrolling —
// Home, Courses, Their Course, Registering, Enrolled — persisted across
// page loads for this browser tab via sessionStorage. The Ark marks their
// furthest point reached; it never moves backward just because someone
// revisits an earlier page.
//
// Pages advance the stage two ways:
//  1. <body data-voyage-stage="N"> — set automatically on page load
//     (courses.html = 1, a subject.html page = 2).
//  2. window.TAGVoyage.setStage(N) — called from page scripts in response
//     to something the visitor actually did (selecting a batch, submitting
//     the registration form).

(function () {
  var STAGES = [
    { label: 'Home' },
    { label: 'Courses' },
    { label: 'Your Course' },
    { label: 'Registering' },
    { label: 'Enrolled' }
  ];
  var STORAGE_KEY = 'tagVoyageStage';

  function getStage() {
    var v;
    try { v = parseInt(sessionStorage.getItem(STORAGE_KEY), 10); } catch (e) { v = NaN; }
    if (isNaN(v)) return 0;
    return Math.max(0, Math.min(STAGES.length - 1, v));
  }

  function setStage(n) {
    var next = Math.max(getStage(), Math.min(STAGES.length - 1, n));
    try { sessionStorage.setItem(STORAGE_KEY, String(next)); } catch (e) {}
    render();
  }

  function render() {
    var mount = document.getElementById('voyageTracker');
    if (!mount) return;
    var stage = getStage();
    var pct = (stage / (STAGES.length - 1)) * 100;

    var stops = STAGES.map(function (s, i) {
      var state = i < stage ? 'done' : (i === stage ? 'current' : '');
      return '<div class="voyage-stop ' + state + '"><span class="voyage-dot"></span><span class="voyage-label">' + s.label + '</span></div>';
    }).join('');

    mount.innerHTML =
      '<div class="voyage-track">' +
        '<div class="voyage-fill" style="width:' + pct + '%"></div>' +
        '<div class="voyage-ark" style="left:' + pct + '%">' +
          '<svg viewBox="0 0 120 90" aria-hidden="true">' +
            '<line x1="60" y1="8" x2="60" y2="52" stroke="currentColor" stroke-width="5"/>' +
            '<path d="M60 13 L60 46 Q32 40 60 13 Z" fill="currentColor"/>' +
            '<path d="M10 54 Q60 92 110 54 L98 72 Q60 98 22 72 Z" fill="currentColor"/>' +
          '</svg>' +
        '</div>' +
      '</div>' +
      '<div class="voyage-stops">' + stops + '</div>';
  }

  window.TAGVoyage = { setStage: setStage, getStage: getStage };

  document.addEventListener('DOMContentLoaded', function () {
    var pageStage = document.body.getAttribute('data-voyage-stage');
    if (pageStage !== null) setStage(parseInt(pageStage, 10));
    else render();
  });
})();
