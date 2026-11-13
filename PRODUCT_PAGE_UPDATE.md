# Product pages that get to the point — 13 November 2026

## What changed

- **Order of the buy box.** Every product page (12 in French, 12 in Arabic) now shows, from top to bottom:
  1. the name and one line saying what the piece is
  2. the price, with a one-line note only when it depends on the composition or is given by phone
  3. the choice to make, as buttons (model, size or colour; the wallet's colour also switches the photo)
  4. one big **Commander** / **اطلبوا الآن** button, with **Ajouter au panier** under it
  5. delivery (7 TND), payment on delivery, and "Rayda vous appelle pour confirmer"
  6. her three short reasons for the piece
  7. a real client's words where one is about that piece (the BaZi bracelet and the BaZi necklace)
  8. how ordering works, in three steps
  9. the details of the piece, folded
- **Rayda's text.** Her full description stays below the buy box. It now starts with her opening paragraph and folds after it ("Lire toute la description" / "اقرأوا الوصف كاملًا").
- **Fonts.** Same typefaces everywhere; only sizes and spacing were adjusted. A test fails if the new styles ever set a typeface.
- **Taken out of the product pages:**
  - the "À confirmer avec Rayda" list
  - the internal-sounding price notes ("Prix non communiqué dans les éléments reçus", "Disponibilité à confirmer")
  - the quantity box (quantity can still be changed in the cart)
  - the long opening paragraph in the buy box, which now opens her description instead
- **Client words.** The excerpts are exact pieces of the real messages (Arabic, with the French translation on request on French pages), linked to Vos mots. A test checks every piece against the full message.
- **No made-up old prices.** A crossed-out price should only appear for a real promotion.

## Files

- `src/product-pitch.mjs` (new): the one-line pitch for each product in French and Arabic, the three ordering steps, and the client excerpts.
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the new product page.
- `src/commerce.js`: the model, size and colour buttons update the price and photo.
- `src/guidance-pages.mjs`: French product pages that show an Arabic quote load Markazi Text, as Vos mots does.
- `commerce.css`: new rules appended at the end.
- `test/catalog.test.mjs`: three new tests.

## Checks

- **Tests:** all 19 pass.
- **Buying:** tapping a size, model or colour updates the price and photo. Commander goes to checkout with the choice, and checkout (phone check, 7 TND delivery) still works in French and Arabic.
- **Layout:** no sideways scrolling, broken images or errors on the 24 product pages, from 320px to 1440px wide.

## Preview on your computer

1. In the `prototype` folder, run `npm run build`, then `npm run preview`.
2. Open http://127.0.0.1:4174/products/bracelet-bazi/ (or any product page; Arabic pages start with /ar/).

## How to undo

This round goes in together with the colour layers and photos rounds (`COLOUR_LAYERS_UPDATE.md`, `PHOTOS_UPDATE.md`), so all three are undone together:

1. Put the previous files back, in either of these ways:
   - copy the files in `backups/before-product-page-and-colours-2026-11-13/` back over the project, if that folder exists;
   - otherwise (if the update was unzipped by hand), run `git checkout -- .` in this folder, since nothing else has changed since the last push.
2. Delete `layers.css`, `src/product-pitch.mjs`, `COLOUR_LAYERS_UPDATE.md`, `PHOTOS_UPDATE.md` and this note.
3. Run `npm run build`.
