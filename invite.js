(function () {
  "use strict";
  var cfg = window.EMANET || {};
  var tr = (navigator.language || "tr").toLowerCase().indexOf("en") !== 0;
  var ua = navigator.userAgent || "";
  var android = /Android/i.test(ua);
  var T = tr ? {
    title: "Anahtar sana emanet ediliyor", titleNamed: function (n) { return n + " anahtarını sana emanet ediyor"; },
    lede: "Emanet'te aç ve daveti kabul et. İki dakika, ücretsiz.",
    codeLabel: "Davet kodu", open: "Emanet'te aç", copy: "Bağlantıyı kopyala", copied: "Kopyalandı",
    store: "Emanet yüklü değil mi? App Store'dan kur, açınca “Davet bağlantım var”a dokun ve bu bağlantıyı yapıştır.",
    android: "Emanet şimdilik yalnızca iPhone'da çalışıyor. Davet edene söyle — başka bir koruyucu seçebilir.",
    expired: function (n) { return "Bu davetin süresi geçmiş. " + (n ? n + " kişisinden" : "Gönderen kişiden") + " yeni bir bağlantı iste."; },
    missing: "Bu bağlantı eksik ya da bozuk. Gönderen kişiden yenisini iste.",
    notFound: "Sayfa bulunamadı"
  } : {
    title: "Someone is handing you their key", titleNamed: function (n) { return n + " is entrusting you with their key"; },
    lede: "Open it in Emanet and accept. Two minutes, free.",
    codeLabel: "Invite code", open: "Open in Emanet", copy: "Copy link", copied: "Copied",
    store: "Don't have Emanet? Install it from the App Store, open it, tap “I have an invite link” and paste this link.",
    android: "Emanet only works on iPhone for now. Let the sender know — they can pick another keeper.",
    expired: function (n) { return "This invite has expired. Ask " + (n || "the sender") + " for a new link."; },
    missing: "This link is incomplete or broken. Ask the sender for a new one.",
    notFound: "Page not found"
  };
  function $(id) { return document.getElementById(id); }
  function text(id, v) { var el = $(id); if (el) el.textContent = v; }

  if (!tr) {
    document.documentElement.lang = "en";
    var nav = document.querySelectorAll("nav a"), en = [["/emanet/en/", "Support"],
      ["/emanet/en/privacy.html", "Privacy"], ["/emanet/en/terms.html", "Terms"], ["/emanet/", "Türkçe"]];
    for (var i = 0; i < nav.length && i < en.length; i++) { nav[i].href = en[i][0]; nav[i].textContent = en[i][1]; }
    text("howTitle", "How it works");
    text("how1", "They seal their apps. To open one, they ask you in one sentence.");
    text("how2", "You answer “Yes” or “Not now” from your Lock Screen within 90 seconds.");
    text("how3", "You never see which app — only their sentence. Being a keeper is always free.");
  }

  // İki biçim: /emanet/d/?c=KOD (gerçek dosya, 200, önizleme kartı) ve
  // /emanet/d/KOD (404.html ile açılır).
  var q = new URLSearchParams(location.search).get("c") || "";
  var m = /^[A-Za-z0-9]{4,12}$/.test(q) ? q
        : ((location.pathname.match(/^\/emanet\/d\/([A-Za-z0-9]{4,12})\/?$/) || [])[1] || "");
  if (!m) {
    text("title", T.notFound); text("lede", "");
    text("missingText", T.missing); $("missing").hidden = false;
    return;
  }
  var code = m.toUpperCase();
  text("title", T.title); text("lede", T.lede);
  text("codeLabel", T.codeLabel); text("code", code);
  text("open", T.open); text("copy", T.copy); text("store", T.store);
  $("open").href = "emanet://d/" + code;
  var link = "https://wipastudio.github.io/emanet/d/?c=" + code;
  $("copy").addEventListener("click", function () {
    if (navigator.clipboard) navigator.clipboard.writeText(link).then(function () { text("copy", T.copied); });
  });
  if (cfg.appStoreUrl && /^https:\/\/apps\.apple\.com\//.test(cfg.appStoreUrl)) {
    $("storeHref").href = cfg.appStoreUrl; $("storeLink").hidden = false;
  }
  if (android) { text("androidText", T.android); $("android").hidden = false; }
  $("invite").hidden = false;

  // Sunucu yapılandırıldıysa davet edenin adı. Ad yalnızca textContent ile
  // yazılır — HTML olarak asla.
  if (cfg.supabaseUrl && cfg.anonKey && /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(cfg.supabaseUrl)) {
    fetch(cfg.supabaseUrl + "/rest/v1/rpc/invite_preview", {
      method: "POST",
      headers: { "apikey": cfg.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ p_code: code })
    }).then(function (r) { return r.ok ? r.json() : null; }).then(function (p) {
      if (!p) return;
      var name = String(p.inviterName || "").slice(0, 40);
      if (p.expired) { text("title", T.expired(name)); text("lede", ""); $("invite").hidden = true; return; }
      if (name) text("title", T.titleNamed(name));
    }).catch(function () {});
  }
})();
