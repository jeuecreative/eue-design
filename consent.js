/* =========================================================
   Eue Design — Cookie-Einwilligung (Google Ads Conversion-Tracking)

   Wichtig: Das Google-Tag (gtag.js) wird NICHT beim Seitenaufruf
   geladen, sondern erst, wenn eine gültige Einwilligung vorliegt.
   Ohne Einwilligung findet damit überhaupt kein Kontakt zu Google
   statt – auch keine Übertragung der IP-Adresse.

   Die Entscheidung wird mit Zeitstempel gespeichert und läuft nach
   sechs Monaten ab; danach wird erneut gefragt.
   ========================================================= */
(function () {
  'use strict';

  var GTAG_ID = 'AW-18000222851';
  var KEY     = 'eue_cookie_consent';
  var MAX_AGE = 182 * 24 * 60 * 60 * 1000; // ~6 Monate in Millisekunden

  var banner   = document.getElementById('cookieBanner');
  var accept   = document.getElementById('cookieAccept');
  var decline  = document.getElementById('cookieDecline');
  var settings = document.getElementById('cookieSettings');

  var gtagLoaded = false;
  var lastFocus  = null;

  function hasGtag() {
    return typeof window.gtag === 'function';
  }

  /* Google-Tag nachladen – nur bei erteilter Einwilligung aufgerufen. */
  function loadGoogleTag() {
    if (gtagLoaded || !hasGtag()) return;
    gtagLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GTAG_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GTAG_ID);
  }

  function applyConsent(state) {
    if (hasGtag()) {
      window.gtag('consent', 'update', {
        'ad_storage': state,
        'ad_user_data': state,
        'ad_personalization': state,
        'analytics_storage': state
      });
    }
    if (state === 'granted') loadGoogleTag();
  }

  /* Gibt 'granted', 'denied' oder null zurück. null bedeutet:
     nichts gespeichert, unlesbar oder älter als sechs Monate. */
  function readConsent() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || (data.state !== 'granted' && data.state !== 'denied')) return null;
      if (typeof data.ts !== 'number' || (Date.now() - data.ts) > MAX_AGE) return null;
      return data.state;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ state: state, ts: Date.now() }));
    } catch (e) {}
  }

  function showBanner() {
    if (!banner) return;
    lastFocus = document.activeElement;
    banner.classList.add('visible');
    document.body.classList.add('cookie-banner-open');
    /* Fokus in das Banner setzen, damit Tastaturnutzer nicht erst
       die ganze Seite durchtabben müssen. Bewusst auf den Container,
       nicht auf „Alle akzeptieren“ – die Auswahl bleibt offen. */
    banner.focus();
  }

  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('visible');
    document.body.classList.remove('cookie-banner-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  function decide(state) {
    writeConsent(state);
    applyConsent(state);
    hideBanner();
  }

  var saved = readConsent();
  if (saved) {
    applyConsent(saved);
  } else if (banner) {
    showBanner();
  }

  if (accept)  accept.addEventListener('click',  function () { decide('granted'); });
  if (decline) decline.addEventListener('click', function () { decide('denied'); });

  /* Widerruf über „Cookie-Einstellungen“ in der Fußzeile.
     Ein bereits geladenes gtag.js lässt sich nicht mehr entfernen –
     das consent-update auf 'denied' sperrt es sofort, ab dem nächsten
     Seitenaufruf wird es gar nicht mehr geladen. */
  if (settings) {
    settings.addEventListener('click', function (e) {
      e.preventDefault();
      try { localStorage.removeItem(KEY); } catch (err) {}
      applyConsent('denied');
      showBanner();
    });
  }
})();
