# Three wallet colours, "made for you", and clearer emphasis — 13 November 2026

## What changed

- **Wallet colours:** green, yellow and red only. The two pink photos are out of the gallery, and the photo of all the colours together was remade in ChatGPT with three wallets (`portefeuille-hafidha-ai-trois-couleurs.jpg`). The page says "trois coloris" / "ثلاثة ألوان".
- **Personalised pieces are chosen for the buyer, not by the buyer:**
  - The BaZi bracelet and necklace no longer offer a "colour preferences" picker.
  - Above the order button, the BaZi bracelet, BaZi necklace and wallet show a note: "Composé pour vous, pas choisi sur catalogue." It says the buyer does not choose the stones or colours; Rayda determines them from the birth date (and the goals, for the wallet). The Arabic pages say the same.
- **Emphasis** (`emphasis.css`, a new file loaded last; sizes, weights and shapes only, same typefaces and colours):
  - **Reading levels:** the sentence that sums up a page or product is larger; body text is easier to read; small print is lighter.
  - **Key facts:** the price is bigger and bolder on product pages and cards; delivery, payment and contact lines are bolder.
  - **Clickable things:** the underlined text links are now outlined buttons in the site's button shape; the first hero link is a filled button; "Commander" is larger; product cards carry a ringed arrow and respond to the pointer; menu and filter labels are larger.

## Files

- `emphasis.css` (new), linked from `src/guidance-pages.mjs` and `src/guidance-pages-ar.mjs`, copied by `src/build-guidance.mjs`.
- `src/catalog.js`, `src/catalog-ar.mjs`: wallet colours and photos; no palettes on BaZi pieces.
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the "made for you" note.
- `assets/products/organized/portefeuille-hafidha-ai-trois-couleurs.jpg` and its 480px copy.
- `test/catalog.test.mjs`: 27 tests, one new.

## Checks

- All 27 tests pass.
- 52 French and Arabic pages at 8 widths from 320 to 1920px: nothing scrolls sideways and no button leaves the screen.

## How to undo

Copy the files in `backups/before-three-colours-and-emphasis-2026-11-13/` back over the project's, remove the `emphasis.css` link from the two page files if you restore only some of them, and run `npm run build`. To undo only the emphasis, empty `emphasis.css`.
