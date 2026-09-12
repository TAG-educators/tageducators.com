// ---------- Subject background pattern ----------
// The only place a subject page differs visually from the rest of the
// site: a faint, subject-specific motif tiled behind the content, at low
// opacity, in the same purple used everywhere else. Runs only on pages
// that include a #subjectPatternLayer element.

(function () {
  var layer = document.getElementById('subjectPatternLayer');
  if (!layer || typeof TAG_SUBJECTS === 'undefined') return;

  var params = new URLSearchParams(window.location.search);
  var data = (typeof tagSubjectByName === 'function') ? tagSubjectByName(params.get('subject') || '') : null;
  var motif = (data && data.pattern) ? data.pattern
    : '<circle cx="80" cy="80" r="2.4" fill="currentColor"/>';

  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true" focusable="false">' +
      '<defs>' +
        '<pattern id="subjPattern" width="160" height="160" patternUnits="userSpaceOnUse">' + motif + '</pattern>' +
      '</defs>' +
      '<rect width="100%" height="100%" fill="url(#subjPattern)"/>' +
    '</svg>';

  layer.innerHTML = svg;
})();
