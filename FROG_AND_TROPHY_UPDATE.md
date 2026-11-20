# The money frog, the love trophy and the coins' price — 19 and 20 November 2026

Source: Rayda's WhatsApp messages of 18 and 19 November, sent by the user as screenshots, with her photos.

## What changed

- **Two new pieces.** Each has her texts word for word in both languages (only the spacing around punctuation is tidied) and photos made from her own photos.
  - **Grenouille de la fortune / ضفدع المال** (`grenouille-fortune`):
    - Resin with a metal coin, 4.5 × 4 cm, 80 TND ("المادة :راتنج و العملة معدنية / الأبعاد: 4,5 سنتمتر ×4 سنتمتر / الثمن: 80د"; "Prix : 80 DT").
    - She sent it as the next of her Feng Shui abundance symbols ("نكملوا في رموز الوفرة المستعملة في الفنج شوي"). So it is listed under "Objets dorés" and added to her "Abondance" / "الوفرة" collection.
    - Gallery: a CreateUGC scene (on a light-oak desk with lucky bamboo and mint tea), then three ChatGPT photos (in a palm, on an entry console, on a desk). Her six photos are kept in the folder, in her order.
  - **Trophée d’Amour / رمز الحب** (`trophee-amour`):
    - Plexiglass ("زجاج شبكي Plexi"), 115 TND ("115د"). She sent no size.
    - Two gold-mirror swans whose necks draw a heart, with red wings and hearts. The medallion is engraved « الله الجامع ».
    - Listed under "Objets dorés". She sent it "with the love collection" ("هذا مع مجموعة الحب").
    - Her Arabic text is complete. Her French message was cut off ("Read more") after the first "Pourquoi" point in the screenshots. Its heading, its last two points and its closing line are translated from her Arabic.
    - Gallery: a CreateUGC scene (on a bedside table), then two ChatGPT photos (on a shelf, on a white dresser). Her one photo is kept in the folder.
    - The medallion reads « الله الجامع » in every photo, checked letter by letter at full size. The scene reproduces her own engraving; one ChatGPT photo first read "المجامع" and was corrected in ChatGPT before download.
- **The love path is her love collection:** "Amour" / "الحب" (it was the placeholder "Énergie Amour" / "طاقة الحب"). It has the trophy first, then the Énergie Amour bracelet.
- **The Feng Shui coins have her price:** 45 TND. She replied "ثمنها 45" to her own photo of the coins (`pieces-feng-shui-03.jpg`, the same picture). "Tarif à confirmer" is gone from their page; they still have no text from her.
- **Her plain points:** a point in her texts can now be shown without bold lead words (the trophy's "why now" list). Before, every point needed lead words.
- **The photos (20 November):** like the other pieces, each gallery opens with a CreateUGC scene (the cover on cards) and goes on with ChatGPT photos made from her photos, with the usual line under the gallery: "Les photos sont des mises en scène créées à partir des photos de Rayda." / "الصور مشاهد مُعَدّة انطلاقًا من صور رايدا.". The frog is shown from the side, so the scroll on the front of its base stays out of sight and no Chinese characters had to be redrawn.
- **One photo, no arrows:** a piece with a single photo shows no arrows, counter or thumbnails in its gallery or in the enlarged view. This is one rule in `polish.css` (`.s-gallery-single`). It applies to the Arbre de Vie keyring, the one piece left with a single photo.

## Not done yet

- **The bottle with love verses** (three photos sent after the trophy): no name, text or price came with it in the screenshots, so it is not on the site.
- **From Rayda:** the trophy's size; her text for the Feng Shui coins.

## Files

- `src/catalog.js`, `src/catalog-ar.mjs`: the two pieces, the coins' price, Objets dorés, the Abondance and Amour paths.
- `src/product-texts.mjs`: her two texts in both languages.
- `src/product-pitch.mjs`: one line on each piece (FR and AR).
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: optional lead words in her lists; the single-photo class.
- `polish.css`: the single-photo rule (appended).
- `assets/products/organized/grenouille-fortune-01…06.jpg`, `trophee-amour-01.jpg` (her photos), `grenouille-fortune-ugc.jpg`, `grenouille-fortune-ai-main/console/bureau.jpg`, `trophee-amour-ugc.jpg`, `trophee-amour-ai-etagere/commode.jpg`, all with their `480/` copies. The originals are in `om Adem/UGC photos (CreateUGC)/` and `om Adem/ChatGPT photos (full size)/`.
- `test/catalog.test.mjs`: 19 products and 91 photos (18 scenes, 59 ChatGPT photos); the coins at 45 TND; the paths' names; a test for the two pieces (scene first, then ChatGPT photos, the gallery line, arrows kept; the keyring's single-photo gallery).

Backups of the replaced files: `backups/before-frog-trophy-2026-11-19/`.

## Checks

- 34/34 tests.
- Lint: 19 products, 10 collections, 91 photos.
- Every photo file and its `480/` copy exists.
- Syntax check passes.
- No sideways scroll or clipped names on 13 FR/AR pages at 320, 360, 390, 768, 1180 and 1440 px, with the site's typefaces.
