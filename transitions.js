// ---------- Sunset / sunrise page transition ----------
// Plays a "sun rising" reveal when a page loads, and a "sun setting" cover
// before navigating away, so moving between pages (especially differently
// themed course pages) feels like one continuous day/night cycle.
(function () {
  var overlay = document.getElementById('pageTransition');
  if (!overlay) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function playEntry() {
    overlay.style.transition = '';
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    overlay.classList.remove('pt-rise');

    if (reduced) {
      overlay.style.opacity = '0';
      setTimeout(function () { overlay.style.display = 'none'; }, 30);
      return;
    }

    void overlay.offsetWidth; // force reflow so the removal above registers
    requestAnimationFrame(function () {
      overlay.classList.add('pt-rise'); // sun rises
    });

    setTimeout(function () {
      overlay.style.transition = 'opacity 0.45s ease';
      overlay.style.opacity = '0';
      setTimeout(function () {
        overlay.style.display = 'none';
        overlay.style.transition = '';
      }, 460);
    }, 780);
  }

  function playExitThenGo(href) {
    if (reduced) {
      window.location.href = href;
      return;
    }
    overlay.style.transition = '';
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    overlay.classList.add('pt-rise'); // start from the risen state

    void overlay.offsetWidth;
    requestAnimationFrame(function () {
      overlay.classList.remove('pt-rise'); // sun sets
    });

    setTimeout(function () {
      window.location.href = href;
    }, 760);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    if (link.target === '_blank') return;
    if (/^https?:\/\//i.test(href)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    playExitThenGo(href);
  });

  window.addEventListener('pageshow', playEntry);
})();
