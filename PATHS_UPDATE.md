# Paths for each kind of buyer, and the book's own categories — 15 November 2026

## What changed

- **Paths ("chemins"), before the products.** Right after the welcome on the home page, and at the top of the Boutique, a new section "Par où commencer ?" / "من أين تبدؤون؟" shows one door per wish:
  - "Je suis élève ou étudiant(e)" / "للتلاميذ والطلبة": the book and the learning accessories.
  - "Je cherche l’amour" / "للباحثين عن الحب": the Énergie Amour bracelet.
  - "Je veux attirer l’argent" / "لجذب المال والوفرة": the Hafidha El Mel wallet, the Million Dollar card, the Abondance décor and the Clé de Vie.
- **A link straight to the paths:** `/#chemins` (and `/ar/#chemins`) opens the home page at "Par où commencer ?", for a link Rayda shares on WhatsApp or Instagram.
- **Each door opens its own page** with only those pieces: `/parcours/etudes/`, `/parcours/amour/`, `/parcours/abondance/`, and the same under `/ar/parcours/`. Each page ends with links to the other paths and to the whole Boutique.
- **These three paths are placeholders** until Rayda sends hers. Their wording comes from her own product texts (concentration and confidence for the book and accessories, "activer l’énergie de l’amour" for the bracelet). She sent hers the same night; they replace the study and money paths (see `COLLECTIONS_AND_NEW_PIECES_UPDATE.md`).
- **"Excellence scolaire" is split in two.** The book and the learning accessories each have their own category, name and card: "Livres" / "الكتب" and "Accessoires d’étude" / "أكسسوارات التعلم".
  - "Accessoires d’étude" is short on purpose: "d’apprentissage" is too long a word for the cards on phones. The piece keeps its full name, "Accessoires Énergie d’apprentissage".
  - The category grid now has eight cards, four across (two on phones), so every row is full. On tablets the card names are set a little smaller so that "Portefeuilles" still fits.
  - On the French home page, these two cards open the product page directly, since each holds one piece (like "Portefeuilles"). In Arabic and in the Boutique they open the category.
- On the home page, the categories heading ("Une pièce. Votre histoire.") now sits above the grid, so the eight cards keep a good size.
- The Boutique's introduction now mentions the book and the accessories, and says to start with what you're looking for or with a type.

## Changing the paths when Rayda sends hers

- French: `paths` at the end of `src/catalog.js`. Each path has a `slug` (its address), an `icon`, a `name`, a one-line `summary` (on the door), a `description` (on its page) and its `productIds`.
- Arabic: `pathsAr` in `src/catalog-ar.mjs`, keyed by the same slug.
- Adding or removing a path needs nothing else; the section, the pages and the links follow.
- Icons: `study` (open book), `love` (heart), `money` (coins). A new icon is drawn in `pathIcon` in `src/shop-pages.mjs`.

## Design

- The paths band is cream, so the welcome photo still fades into it, as it did into the categories.
- Each path is an arched door: paper on cream with a thin line, a line icon, its name, one line, and "Voir les N pièces". On hover or keyboard focus the door fills with forest green.
- On phones the doors become three rows, each icon in a small arch.
- Only the site's own colours; no typeface is set.

## Files

- `src/catalog.js`: the `paths`; the "Livres" and "Accessoires d’étude" collections replace "Excellence scolaire".
- `src/catalog-ar.mjs`: `pathsAr`; the two collections in Arabic.
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the paths section and the path pages; the paths at the top of the Boutique; the two category cards; the Boutique introduction.
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the paths after the welcome; the two category cards.
- `src/build-guidance.mjs`: builds the six path pages; copies the two category pictures.
- `commerce.css`: the four-across grid, the home categories heading, the paths and the path pages (rules at the end; the wide-card rules are removed).
- `assets/categories/livres.webp`, `assets/categories/apprentissage.webp`: 720 × 720, from the two CreateUGC scenes. `excellence-scolaire.webp` is moved to the backup folder.
- `test/catalog.test.mjs`: 32 tests, one new: the paths come before the product types on both home pages and both Boutiques, and each path page lists exactly its pieces, in French and Arabic.

## Checks

- All 32 tests pass.
- Home, Boutique and path pages checked in French and Arabic at 1440, 1180, 820 and 390 px wide: the doors, the hover state, the eight cards in full rows, no sideways scrolling.

## Still to confirm with Rayda

- Her own paths: done, see `COLLECTIONS_AND_NEW_PIECES_UPDATE.md`.
- From the book round: the prices of the primary and middle-and-high-school editions and of the gold-chain necklace (since given: 35, 42 and 130 TND); whether "100د" means 100 TND each; "Raida" or "Rayda" in French; whether the book is written in Arabic inside.

## How to undo

First undo the collections round (`COLLECTIONS_AND_NEW_PIECES_UPDATE.md`). Then copy back the files in `backups/before-paths-2026-11-15/` (the `src/` and `test/` folders, `commerce.css`, `BOOK_AND_TEXTS_UPDATE.md`), put `excellence-scolaire.webp` back from its `assets/categories/` folder into the site's `assets/categories/`, delete `assets/categories/livres.webp` and `assets/categories/apprentissage.webp`, then run `npm run build`.
