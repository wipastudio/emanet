(function () {
  "use strict";
  // GitHub Pages bilinmeyen her yolu buraya düşürür. /emanet/d/KOD davet
  // sayfasına, /emanet/o/<rota> uygulamayı açan sayfaya yönlenir.
  var p = location.pathname;
  var d = p.match(/^\/emanet\/d\/([A-Za-z0-9]{4,12})\/?$/);
  if (d) { location.replace("/emanet/d/?c=" + d[1].toUpperCase()); return; }
  var o = p.match(/^\/emanet\/o\/([a-z]+(?:\/[A-Za-z0-9-]{1,64})?)\/?$/);
  if (o) { location.replace("/emanet/o/?r=" + encodeURIComponent(o[1]) + (location.search ? "&" + location.search.slice(1) : "")); }
})();
