// ---------- Sunset / horizon page transition (site-wide) ----------
// One orchestrated moment: clicking anywhere internal sends the sun across
// a horizon in the colour of wherever you're headed, then the next page
// picks the animation back up and settles. Reduced-motion users get a
// straight, instant navigation — no overlay is ever shown to them.
(function () {
  var overlay = document.getElementById('tagTransition');
  var canvas = document.getElementById('tagTransitionCanvas');
  if (!overlay || !canvas) return;
  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STORE_KEY = 'tagTransitionColor';

  function safeGet(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } }
  function safeSet(key, val) { try { sessionStorage.setItem(key, val); } catch (e) {} }
  function safeClear(key) { try { sessionStorage.removeItem(key); } catch (e) {} }

  function hexToRgb(hex) {
    hex = (hex || '#B47FC2').trim().replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join('');
    var num = parseInt(hex, 16);
    if (isNaN(num)) num = 0xB47FC2;
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(',');
  }

  // Always restore normal state on show — including browser back/forward
  // (bfcache), which would otherwise restore the page mid-transition.
  function resetTransitionState() {
    overlay.style.transition = 'none';
    overlay.style.opacity = '0';
    overlay.style.background = 'none';
    if (ctx && canvas.width) ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.documentElement.classList.remove('tag-arriving');
    void overlay.offsetWidth;
    overlay.style.transition = '';
    safeClear(STORE_KEY);
  }
  window.addEventListener('pageshow', resetTransitionState);

  function drawScene(rgb, x, y, glow, gridAlpha, w, h, horizonY, trailAlpha) {
    ctx.fillStyle = 'rgba(10,6,16,' + trailAlpha + ')';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    var sky = ctx.createRadialGradient(x, y, 0, x, y, Math.max(w, h) * 0.65);
    sky.addColorStop(0, 'rgba(' + rgb + ',' + (0.32 * glow + 0.05) + ')');
    sky.addColorStop(1, 'rgba(' + rgb + ',0)');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // orbit rings — the globe motif, faint, centred on the sun
    ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.16 * glow) + ')';
    ctx.lineWidth = 1;
    for (var r = 1; r <= 3; r++) {
      ctx.beginPath();
      ctx.ellipse(x, y, r * 60, r * 22, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    var core = ctx.createRadialGradient(x, y, 0, x, y, 70);
    core.addColorStop(0, 'rgba(255,255,255,0.95)');
    core.addColorStop(0.25, 'rgba(' + rgb + ',0.9)');
    core.addColorStop(1, 'rgba(' + rgb + ',0)');
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(x, y, 70, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    ctx.strokeStyle = 'rgba(' + rgb + ',' + gridAlpha + ')';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, horizonY); ctx.lineTo(w, horizonY); ctx.stroke();
    var vpX = w / 2;
    for (var gx = -4; gx <= 4; gx++) {
      ctx.beginPath();
      ctx.moveTo(vpX + gx * 40, horizonY);
      ctx.lineTo(vpX + gx * 160, h);
      ctx.stroke();
    }
  }

  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  // ---------- Departure: sun rises up and off, page fades under it ----------
  function playDeparture(colorHex, onDone) {
    var rgb = hexToRgb(colorHex);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    overlay.style.background = 'none';
    overlay.style.opacity = '1';
    document.querySelectorAll('header, main, footer').forEach(function (el) { el.style.opacity = '0'; });

    var w = canvas.width, h = canvas.height;
    var horizonY = h * 0.7;
    var startX = w * 0.5, endX = w * 1.15;
    var amp = h * 0.42;
    var duration = 1000, start = null;

    function step(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var p = ease(t);
      var x = startX + (endX - startX) * p;
      var y = horizonY - amp * Math.sin(Math.PI * 0.5 * p + Math.PI * 0.5) - amp * 0.15;
      var glow = 0.4 + 0.6 * p;
      drawScene(rgb, x, y, glow, Math.min(t * 1.6, 0.45), w, h, horizonY, 0.16);
      if (t < 1) { requestAnimationFrame(step); } else { onDone(); }
    }
    requestAnimationFrame(step);
  }

  // ---------- Arrival: continue from a settled sun, then reveal ----------
  function playArrival(colorHex) {
    var rgb = hexToRgb(colorHex);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    overlay.style.background = 'none';
    overlay.style.transition = 'none';
    overlay.style.opacity = '1';

    var w = canvas.width, h = canvas.height;
    var horizonY = h * 0.7;
    var x = w * 0.5;
    var duration = 550, start = null;

    function step(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      var p = ease(t);
      var y = horizonY - h * 0.1 - h * 0.5 * p;
      var glow = 1 - 0.5 * p;
      drawScene(rgb, x, y, glow, 0.35 * (1 - p), w, h, horizonY, 0.1);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        overlay.style.transition = 'opacity .45s ease';
        overlay.style.opacity = '0';
        setTimeout(resetTransitionState, 480);
      }
    }
    requestAnimationFrame(step);
  }

  // Kick off the arrival animation if we landed here mid-transition.
  var pending = safeGet(STORE_KEY);
  if (pending && !reduced) {
    document.documentElement.classList.add('tag-arriving');
    playArrival(pending);
  } else if (pending) {
    resetTransitionState();
  }

  // ---------- Wire up every qualifying internal link ----------
  function accentNear(el) {
    var node = el;
    while (node && node !== document.body) {
      var v = node.style && node.style.getPropertyValue('--card-accent');
      if (v) return v;
      node = node.parentElement;
    }
    return getComputedStyle(document.documentElement).getPropertyValue('--plum-glow') || '#B47FC2';
  }

  document.addEventListener('click', function (e) {
    if (reduced) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href]');
    if (!link || link.target === '_blank') return;
    var href = link.getAttribute('href');
    if (!href || href.indexOf('http') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;

    var dest, current;
    try {
      dest = new URL(href, window.location.href);
      current = window.location;
    } catch (err) { return; }
    if (dest.pathname === current.pathname && dest.search === current.search) return; // in-page anchor only

    e.preventDefault();
    var color = accentNear(link);
    try { safeSet(STORE_KEY, color); } catch (err) {}
    playDeparture(color, function () { window.location.href = href; });
  });
})();
