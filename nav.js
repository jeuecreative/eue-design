/* Mobiles Navigationsmenü (Burger-Button) — auf allen Seiten mit Hauptnavigation. */
(function () {
  'use strict';
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* Demo-Einbettung (Sektion #demo): hält die Skalierung des iframes an der
   tatsächlichen Rahmenbreite. Ohne JavaScript greift der CSS-Vorgabewert .78 –
   die Vorschau sitzt dann nur bei ungefähr 1000 px Rahmenbreite bündig,
   bricht aber nichts. Auf Seiten ohne Demo passiert hier gar nichts. */
(function () {
  'use strict';
  var win = document.querySelector('.df__window');
  if (!win) return;

  var fit = function () {
    win.style.setProperty('--df-scale', win.clientWidth / 1280);
  };

  if ('ResizeObserver' in window) {
    new ResizeObserver(fit).observe(win);
  } else {
    window.addEventListener('resize', fit, { passive: true });
  }
  fit();
})();
