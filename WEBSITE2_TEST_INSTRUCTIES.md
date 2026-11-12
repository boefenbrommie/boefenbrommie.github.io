# Website 2.0 — testomgeving V16

Deze branch is aangemaakt op 12 november 2026 voor een **veilige test** van Website 2.0. De bestaande openbare homepage op de branch `main` is niet gewijzigd.

## Uitgangspunt
De volledige V16-website is lokaal voorbereid als uploadpakket met een map `preview-v16/`. Het pakket bevat de illustraties, podcast, PDF's en alle websitepagina's.

Testwaarborgen in het uploadpakket:
- De drie Formspree-formulieren sturen geen inzendingen.
- Google Analytics wordt niet geladen en de productiecookiekeuze wordt niet gewijzigd.
- Alle HTML-pagina's hebben een `noindex`-metatag.
- Het pakket bevat geen `CNAME`-bestand.

**Let op:** alleen deze branch aanmaken levert nog geen openbare GitHub Pages-preview op. Na het veilig plaatsen van de map `preview-v16/` op de publicatiebranch is de preview bereikbaar op `https://bestelboefenbrommie.nl/preview-v16/`. De huidige homepage kan daarbij behouden blijven.

De ZIP uit het ChatGPT-project is de bron; voeg die niet ongecontroleerd in de root toe.
