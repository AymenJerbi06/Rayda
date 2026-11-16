# Rayda's collections, her new prices and three new pieces — 15 November 2026

## What was already right

Her WhatsApp messages of 14 and 15 November were checked word by word against the site. These were already exactly hers and are unchanged:

- the welcome text under "Revenir à soi. Trouver son équilibre." (FR and AR)
- "Qui est Rayda ?" / "من هي رايدا؟" (FR and AR)
- the book's main text and its baccalaureate-only text (FR and AR)
- the learning accessories' Arabic text

## What changed

- **Book prices:** Primaire 35 TND, Collège et lycée 42 TND, Baccalauréat 45 TND ("35د الابتدائي", "42 الإعدادي و الثانوي", "45 الباكالوريا"). "Tarif à confirmer" and the "Le prix vous est donné…" line are gone from the book's page.
- **Learning accessories:**
  - The gold-chain necklace is 130 TND, in stainless steel ("ثمن القلادة الذهبية من الفولاذ المقاوم للصدإ acier inoxydable 130د").
  - Her own French text replaces the translation. The last line ("Les pierres peuvent varier en nombre, en type, en forme et en taille.") stays translated, since she sent it in Arabic only.
- **Three new pieces.** Each has her texts word for word in both languages, where she sent any, and her own photos, as she sent them, after one lifestyle scene (see "The three scenes" below).
  - **Bouteille d’eau en verre / قارورة ماء من البلور** (`bouteille-verre`):
    - Glass, 1 litre, 55 TND ("المادة :البلور / السعة :لتر / الثمن 55د").
    - Listed under "Accessoires d’étude".
    - Her French message starts at "complémentaires :" (its first words were lost when she copied it), so "Cette bouteille réunit deux dimensions" is translated from her Arabic.
  - **Collier Clé / قلادة المفتاح** (`collier-cle`):
    - Stainless steel, 45 TND; the long necklace is 55 TND ("السعر :45د / القلادة الطويلة :55د").
    - Listed under "Colliers".
    - She photographed two keys, a large flowered one and a small clover one. The page offers "Collier standard / Collier long" ("قلادة عادية / قلادة طويلة") and shows both keys until she says which key is the long necklace.
  - **Pièces chinoises Feng Shui / قطع نقدية صينية للفنج شوي** (`pieces-feng-shui`):
    - Three coins tied with a red string, from her "منتجات الفنج شوي للوفرة المالية".
    - Listed under "Objets dorés".
    - She sent no price or text for them yet, so the page shows "Tarif à confirmer" and one plain line.
- **The paths are now her collections**, in her order:
  - **"Excellence scolaire" / "التألق العلمي"** (her "مجموعة التألق العلمي"): the book, the learning accessories and the bottle.
  - **"Abondance" / "الوفرة"** (her "مجموعة الوفرة"), with six pieces:
    - the wallet, with its cards and the exercise
    - the Million Dollar card
    - the Décor Abondance (her "رمز الدولار بالتاج و الانفيني")
    - the key necklace
    - the BaZi bracelet ("براسلاي البازي منتج للوفرة المالية زادة")
    - the Feng Shui coins

    The Clé de Vie is no longer in this path, since it isn't in her list.
  - **"Énergie Amour" / "طاقة الحب"**: the bracelet, as before. She sent no love collection.
  - Each path page's text starts with "La collection … de Rayda" / "مجموعة … لرايدا", and each door still says who it is for.
- **Category cards:**
  - "Colliers" now reads "Sur mesure & à choisir" and "Accessoires d’étude" reads "Préparés & à choisir" (AR: "حسب الطلب أو جاهزة", "تُحضَّر لكم أو جاهزة").
  - The French home page's "Accessoires d’étude" card now opens the category, which holds two pieces.

## The three scenes

Each new piece now opens on one lifestyle scene, made with CreateUGC from her photo (Nano Banana Pro, 2 credits each, 8 credits in all with the key necklace's remake). Her own photos follow it, and the gallery says "La première photo est une mise en scène créée à partir des photos de Rayda." / "الصورة الأولى مشهد مُعَدّ انطلاقًا من صور رايدا."

- **The bottle** (`bouteille-verre-ugc.jpg`):
  - The bottle stands on a study desk next to an open notebook and a pencil.
  - CreateUGC drew the verses with wrong letters, so every red line on the bottle was replaced with Rayda's real print, taken from her close-up photo and laid onto the scene's bottle, with every dot and vowel mark.
  - The two yellow labels are hers, and so are the glass maker's marks at the base ("20mm").
  - The crowns and rainbow circles are CreateUGC's.
  - The white print on the back, seen through the glass, is CreateUGC's.
- **The key necklace** (`collier-cle-ugc.jpg`): the flowered key worn over a cream linen top with a closed round neckline. It was remade once, to close the neckline. The pendant has no writing.
- **The Feng Shui coins** (`pieces-feng-shui-ugc.jpg`):
  - The three coins lie on an oak table next to a vase of lucky bamboo.
  - CreateUGC invented the coins' characters, so the coins and the red cord in the scene are her real ones, taken from her flat photo and relit to match the scene.
- The full-size scenes are in "om Adem/UGC photos (CreateUGC)" as `14-bouteille-verre.png`, `15-collier-cle.png` and `16-pieces-feng-shui.png`. The raw CreateUGC downloads are in Downloads.

## Files

- `src/catalog.js`, `src/catalog-ar.mjs`: the prices, the three pieces, the collections and the paths.
- `src/product-texts.mjs`: her bottle and key necklace texts, her French for the accessories.
- `src/product-pitch.mjs`: the one-line pitches of the three pieces.
- `src/shop-pages.mjs`: the "Longueur" choice of the key necklace, the category labels.
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the home category labels and link.
- `src/commerce.js`, `src/admin.js`: the stock seeds of the three pieces ("Sur commande").
- `test/catalog.test.mjs`: 33 tests, one new (the three pieces: prices, collections, paths, the scene first and her texts on their pages).
- `assets/products/organized/` and its `480/` copies:
  - `bouteille-verre-01…03`, `collier-cle-01…05`, `pieces-feng-shui-01…03`: her WhatsApp photos as sent.
  - `bouteille-verre-ugc`, `collier-cle-ugc`, `pieces-feng-shui-ugc`: the three scenes.

## Checks

- All 33 tests pass. The lint finds 17 products, 10 collections and 84 photos.
- The scenes' writing was checked line by line against her photo: each verse, dot and vowel mark is hers.
- No sideways scrolling and no clipped names on 22 French and Arabic pages at 1440, 1180, 820, 390 and 360 px wide, with the site's real fonts.

## Still to confirm with Rayda

- Which key is the long necklace (55 TND), or whether both keys come in both lengths.
- The price of the Feng Shui coins, and her text for them.
- Whether she wants a love collection, or the love door removed.
- From before: "Raida" or "Rayda" in French; whether the book is written in Arabic inside.

## How to undo

Copy back the files in `backups/before-collections-2026-11-15/` (the `src/` and `test/` folders, `BOOK_AND_TEXTS_UPDATE.md`, `PATHS_UPDATE.md`). Delete the 28 photos named `bouteille-verre-*`, `collier-cle-*` and `pieces-feng-shui-*` in `assets/products/organized/` and `assets/products/organized/480/`.

To remove only the three scenes:
- Copy back `src/catalog.js` and `test/catalog.test.mjs` from `backups/before-ugc-2026-11-15/`.
- Delete the six `*-ugc.jpg` files of the three pieces in `assets/products/organized/` and `480/`. Then run `npm run build`.
