# Rayda's book, learning accessories and home texts — 15 November 2026

## What changed

- **Welcome text:** the paragraph under "Revenir à soi. Trouver son équilibre." on the home page is now Rayda's own welcome text, in French and in Arabic. Everything else in the first section is unchanged; the test still locks it.
- **Who is Rayda:** the home section "La personne derrière Issolatej" now reads "Qui est Rayda ?" / "من هي رايدا؟", with her own text. In her French she writes "Raida Ghrab"; that spelling is kept in her sentence while the rest of the site says "Rayda" (to confirm with her).
- **The book « Votre excellence est votre choix » / «تألقك هو اختيارك»** (`livre-excellence`):
  - Three buttons, Primaire / Collège et lycée / Baccalauréat (Arabic: المرحلة الابتدائية / الإعدادي والثانوي / الباكالوريا). Each one shows its own photo.
  - Baccalauréat: 45 TND (the "45" she wrote above that text). The other two showed "Tarif à confirmer" until she gave their prices: 35 and 42 TND, added the same night (`COLLECTIONS_AND_NEW_PIECES_UPDATE.md`).
  - Her main text shows for the primary and middle-and-high-school editions. Her baccalaureate text ("هذا خليه فقط لتلامذة الباكالوريا") shows only when Baccalauréat is picked, and the "Lire la description de Rayda" link follows it.
  - Her Arabic is word for word; the French is hers, except the opening question and the closing line (translated here) and the baccalaureate text's title (added here, in both languages).
- **The learning accessories « أكسسوارات تفعيل طاقة التعلم » / Accessoires Énergie d’apprentissage** (`accessoires-apprentissage`):
  - Three buttons: Bracelet (100 TND), Collier sur cordon (100 TND), Collier sur chaîne dorée (tarif à confirmer, then 130 TND in stainless steel once she gave it). "ثمن السوار و القلادة بالخيط 100د" is read as 100 TND each.
  - Each piece is prepared from the birth date, so it works like the BaZi pieces: the checkout asks for the birth date, and the page says the stones can vary in number, type, shape and size.
  - Her Arabic text word for word (the first letter of "تعتمد" was lost in the copy and is put back), translated into French.
- **Price line:** "Le prix vous est donné quand nous vous contactons…" now shows only while a choice without a price is picked (two of the book's editions, the gold-chain necklace, and the Amour bracelet's heart model), instead of staying under a price.
- **Two new categories, "Livres" / "الكتب" and "Accessoires d’étude" / "أكسسوارات التعلم".** They were first one wide "Excellence scolaire" card; on 15 November each got its own name and card (see `PATHS_UPDATE.md`). The accessories are also listed under Bracelets and Colliers. The home page's "Colliers" card now opens the Colliers collection instead of the BaZi necklace alone.

## Photos

- **Book:** one CreateUGC scene of the three editions (`livre-excellence-ugc.jpg`) and three ChatGPT photos made from Rayda's photos (`-ai-primaire-flatlay`, `-ai-college-desk`, `-ai-bac-standing`).
  - Every cover was checked letter by letter against her real covers.
  - On the CreateUGC scene, her real covers (flattened from her photos) are laid onto the three books, so every letter is hers.
  - Collège-lycée photo, fixed by hand: "علي" became "على" (two dots removed), and the fatha over the waw became the shadda of the real cover ("فلنكوّن").
  - Baccalauréat photo, fixed by hand: a stray fatha over the last letter of "معرفيا" was removed.
- **Accessories:** one CreateUGC scene with the three pieces on a study desk, and three ChatGPT photos: the bracelet on a wrist (redone once, the first try had beads that were too thin), the gold-chain necklace worn, the cord necklace on a desk.
- **Originals:** `om Adem/UGC photos (CreateUGC)/12-livre-trois-editions.png`, `13-accessoires-apprentissage.png`, and `om Adem/ChatGPT photos (full size)/livre-excellence-*.png`, `accessoires-apprentissage-*.png`. The originals are untouched; the fixes are only in the site's copies.
- **Category pictures:** `assets/categories/livres.webp` and `assets/categories/apprentissage.webp`, 720 × 720, one CreateUGC scene each.
- CreateUGC: 2 credits for the accessories scene (112 left).

## Files

- `src/catalog.js`, `src/catalog-ar.mjs`: the two products, their two collections, Bracelets and Colliers.
- `src/product-texts.mjs`: her texts, and `variantTexts` for a text that belongs to one choice only.
- `src/product-pitch.mjs`: the one-line pitches.
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the "Niveau" and "Pièce" legends, one text block per choice, the accessories' "Préparé pour vous" line and gallery note.
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: her welcome and who-is texts.
- `src/commerce.js`: shows the text and the price line of the picked choice; stock seed. `src/admin.js`: stock seed.
- `src/build-guidance.mjs`: copies the new category pictures.
- `commerce.css`: hidden text blocks (a rule appended at the end).
- `test/catalog.test.mjs`: 31 tests, three new; the hero test now lets the welcome paragraph change and nothing else.

## Checks

- All 31 tests pass.
- Book page: the price, the photo and the text follow the button in French and Arabic; the baccalaureate text never shows with the other editions.
- Accessories page: 100 TND for the bracelet and the cord necklace, "Tarif à confirmer" for the gold chain; the checkout asks for the birth date.

## Still to confirm with Rayda

- Prices of the primary and middle-and-high-school editions, and of the gold-chain necklace: given the same night (35, 42 and 130 TND).
- "100د": 100 TND each for the bracelet and the cord necklace?
- "Raida" or "Rayda" in French.
- Is the book written in Arabic inside? If so, the French page should say it.

## How to undo

First undo the collections round (`COLLECTIONS_AND_NEW_PIECES_UPDATE.md`), then the paths round (`PATHS_UPDATE.md`). Then copy back the files in `backups/before-book-2026-11-15/` (the `src/` and `test/` folders, `commerce.css`), delete the 16 `livre-excellence-*` and `accessoires-apprentissage-*` photos in `assets/products/organized/` and `assets/products/organized/480/` and `assets/categories/excellence-scolaire.webp`, then run `npm run build`.
