(function () {
  "use strict";
  var tr = (navigator.language || "tr").toLowerCase().indexOf("en") !== 0;
  var params = new URLSearchParams(location.search);
  var route = params.get("r") || "";
  var allowed = /^(ask|settings|subscribe|transcript|keeper|digest|feedback|emergency|home|r\/[A-Za-z0-9-]{1,64})$/;
  if (!allowed.test(route)) route = "home";
  var m = params.get("m");
  var target = "emanet://" + route + (route === "ask" && /^(10|20|45)$/.test(m || "") ? "?m=" + m : "");
  var open = document.getElementById("open");
  open.href = target;
  if (!tr) {
    document.documentElement.lang = "en";
    document.getElementById("title").textContent = "Open in Emanet";
    document.getElementById("openText").textContent = "This link opens a place inside Emanet.";
    open.textContent = "Open in Emanet";
    document.getElementById("openNote").textContent = "If Emanet is installed on this iPhone, the link opens the app directly.";
  }
})();
