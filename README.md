# Eue Design – Website

Statische Website (HTML/CSS/JS), ohne Build-Tools, ohne externe Anfragen.
Läuft direkt auf GitHub Pages.

## Struktur

```
index.html          Startseite (Hero, Über mich, Leistungen, Projekte, Kontakt)
impressum.html      Impressum (§ 5 DDG)
datenschutz.html    Datenschutzerklärung (DSGVO)
styles.css          gesamtes Design
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

- **Dein echtes Logo:** Lade dein Original als transparentes PNG hoch und ersetze
  `assets/globe.png`. Hinweis: Die hochgeladene JPG-Datei hatte einen schwarzen
  Hintergrund, wodurch der schwarze Schriftzug „Eue Design" unsichtbar wurde –
  daher ist aktuell nur die Weltkugel als Bild eingebunden und „Eue Design"
  als Text gesetzt.
- **Projektbilder:** `assets/projekt-fieth-bau.svg` und
  `assets/projekt-aluminium-foil-consult.svg` durch echte Screenshots ersetzen
  (gleicher Dateiname, oder den Pfad in `index.html` anpassen).
- **Optional Foto von dir:** kann in den „Über mich"-Bereich eingebaut werden.

## Eigene Schrift (optional)

Möchtest du den exakten Logo-Look (z. B. Playfair Display)? In `styles.css` ist
oben ein vorbereiteter `@font-face`-Block. Lade die `.woff2`-Datei nach
`assets/fonts/`, entferne die Kommentare und ergänze die Schrift in
`--font-display`. So bleibt alles lokal und datenschutzkonform.
