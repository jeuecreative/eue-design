# Eue Design – Website

Statische Website (HTML/CSS/JS), ohne Build-Tools, ohne externe Anfragen.
Läuft direkt auf GitHub Pages.

## Struktur

```
index.html              Startseite (Hero, Über mich, Leistungen, Projekte, Kontakt)
website-erstellen.html  Landingpage für Google Ads (eigenes CSS, inline)
impressum.html          Impressum (§ 5 DDG)
datenschutz.html        Datenschutzerklärung (DSGVO)
styles.css              gesamtes Design
consent.js              Cookie-Einwilligung + Nachladen des Google-Tags
nav.js                  mobiles Navigationsmenü
assets/
  globe.png         freigestellte Weltkugel aus deinem Logo
  favicon.png       Browser-Icon
  logo-original.jpg dein Original-Upload (Referenz)
  projekt-*.svg      Platzhalterbilder für die Projekte
```

## Auf GitHub Pages veröffentlichen

1. Neues Repository auf GitHub anlegen.
   - Für die Adresse `deinname.github.io` muss das Repo exakt so heißen: `deinname.github.io`.
   - Für eine eigene Domain reicht ein beliebiger Name (z. B. `eue-design`).
2. Alle Dateien dieses Ordners ins Repository hochladen (per Drag-and-drop im Browser oder mit Git).
3. Im Repo unter **Settings → Pages**:
   - Source: „Deploy from a branch"
   - Branch: `main`, Ordner: `/ (root)` → Save.
4. Nach 1–2 Minuten ist die Seite unter der angezeigten URL erreichbar.

### Eigene Domain (eue-design.de)
- Unter **Settings → Pages → Custom domain** die Domain eintragen.
- Beim Domain-Anbieter einen CNAME- bzw. A-Record auf GitHub Pages setzen
  (GitHub zeigt die nötigen Werte an). „Enforce HTTPS" aktivieren.

## Was du noch austauschen solltest

- **Dein echtes Logo:** Die Weltkugel (`assets/globe.png`) und das komplett
  freigestellte Logo (`assets/logo-full.png`) wurden aus deiner aktuellen
  Logodatei erzeugt. Im Header/Footer wird die Weltkugel mit dem Schriftzug
  „Eue Design" (in der Schrift Quicksand) kombiniert.
- **Projektbilder:** `assets/projekt-fieth-bau.svg` und
  `assets/projekt-aluminium-foil-consult.svg` durch echte Screenshots ersetzen
  (gleicher Dateiname, oder den Pfad in `index.html` anpassen).
- **Optional Foto von dir:** kann in den „Über mich"-Bereich eingebaut werden.

## Schrift (Quicksand)

Die Seite nutzt die Schrift **Quicksand**, selbst-gehostet (ohne Google-Server,
datenschutzkonform). Die Schriftdateien gehören in `assets/fonts/` – eine
Schritt-für-Schritt-Anleitung dazu liegt in `assets/fonts/ANLEITUNG.txt`.
Solange die Dateien fehlen, zeigt die Seite automatisch eine ähnliche
Ersatzschrift; sie ist also nie kaputt.


## Cookie-Einwilligung (consent.js)

Das Google-Tag (`gtag.js`) wird **nicht** beim Seitenaufruf geladen. Im `<head>`
steht nur das Consent-Default-Snippet mit `denied` für alle Kategorien; das
eigentliche Skript lädt `consent.js` erst nach einem Klick auf
„Alle akzeptieren". Ohne Einwilligung entsteht damit gar kein Kontakt zu Google –
auch keine Übertragung der IP-Adresse.

- Die Entscheidung liegt im `localStorage` unter `eue_cookie_consent` als
  `{"state":"granted|denied","ts":<Zeitstempel>}` und verfällt nach 6 Monaten.
- Widerruf über den Link „Cookie-Einstellungen" in der Fußzeile jeder Seite
  (Element-ID `cookieSettings`). Er löscht den Eintrag, setzt Consent auf
  `denied` und blendet das Banner wieder ein.
- Neue Seiten brauchen: das Consent-Snippet im `<head>`,
  `<script src="consent.js" defer></script>`, das Banner-Markup und den
  Fußzeilen-Link. Am einfachsten aus `impressum.html` kopieren.

**Offen:** In `website-erstellen.html` steht in `trackConversion()` noch der
Platzhalter `AW-XXXXXXXXX/XXXXXXXXXXXX`. Solange er dort steht, wird bewusst kein
Conversion-Event gesendet. Das echte Label steht in Google Ads unter
Ziele → Conversions → Aktion → „Tag selbst installieren".
