// ---------- Page-to-page fade transition ----------
// One quiet, reused moment: the outgoing page fades down through a soft
// plum wash, the incoming page fades up through the same wash. The
// pre-paint class ("tag-arriving") is set by a tiny inline script in each
// page's <head>, before first paint, so an arriving page never flashes
// fully visible before this file has even loaded.

(function () {
  var LEAVE_MS = 260;

  function reveal() {
    // Let the just-set "arriving" state hold for one animation frame so the
    // browser actually paints the faded-out state before transitioning back
    // in — otherwise the opacity change can get coalesced and skip the fade.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.remove('tag-arriving');
      });
    });
    try { sessionStorage.removeItem('tagEntering'); } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }

  // Intercept same-site link clicks for a brief fade-out before navigating,
  // then flag the next page to fade in the same way.
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;

    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;

    var url;
    try { url = new URL(href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    // Same-page anchor (e.g. index.html#why from another page) — let the
    // browser handle it normally once it arrives; no need to fade for a hash.
    if (url.pathname === window.location.pathname && url.hash) return;

    e.preventDefault();
    try { sessionStorage.setItem('tagEntering', '1'); } catch (err) {}
    document.body.classList.add('tag-leaving');
    setTimeout(function () {
      window.location.href = url.href;
    }, LEAVE_MS);
  });

  // Guard against being stuck faded-out if a page is restored from bfcache.
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      document.body.classList.remove('tag-leaving');
      document.documentElement.classList.remove('tag-arriving');
    }
  });
})();
