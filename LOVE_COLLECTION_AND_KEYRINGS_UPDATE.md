# The love bottle, the four energy keyrings and Rayda's new BaZi photos — 21 November 2026

Source: Rayda's WhatsApp messages of 20 and 21 November, sent by the user as screenshots, with her photos. The user also pasted her full French text for the bottle.

## What changed

- **Five new pieces.** Each has her texts word for word in both languages (only the spacing around punctuation is tidied) and her own photos.
  - **Bouteille de l’Amour / قارورة الحب** (`bouteille-amour`):
    - Glass, 1 litre, 55 TND ("المادة :بلور / السعة :لتر / الثمن :55د"; "Matière : Verre / Contenance : 1 litre / Prix : 55 DT").
    - Her text has two parts: "La programmation du subconscient" and "La dynamisation énergétique de l’eau". Her French was cut off ("Read more") in the screenshots, so the full French the user pasted is used as is.
    - Her Arabic keeps her own words, including "تساعدك على التشافي".
    - Photos: the three she sent on 19 November, just after the trophy. They were on the last round's "Not done yet" list.
    - It is in her love collection, after the trophy. It has no product type of its own, so it isn't under any category on the Boutique page; it is in "Toutes les créations" and her love collection.
  - **Four energy keyrings / ميداليات طاقية** (`porte-cles-amour`, `porte-cles-chance`, `porte-cles-voyage`, `porte-cles-protection`):
    - 30 TND each ("الثمن 30د", "Prix : 30 D").
    - Her one sentence for each, in Arabic and in French, is the description and the line at the top of the page.
    - The verses written in red on each were read from her photos and are listed in the details, for example « وجعل بينكم مودة ورحمة » on the Amour keyring.
    - They are listed under "Porte-clés", after the stone and Arbre de Vie keyrings. The Amour keyring came with her love collection. She sent the other three as "the rest of the products, after the love collection" ("هذه بقية المنتجات" / "بعد مجموعة الحب").
    - Her photos keep the order she sent them in, except the Protection keyring, whose clearer photo comes first. The two Amour photos came as PNG and are saved as JPEG.
- **Her love collection** ("Amour" / "الحب") now has the trophy, the bottle, the Amour keyring, then the Énergie Amour bracelet.
- **The BaZi necklace** (her one change: "فقط تعديل بالنسبة للقلادة متاع البازي"):
  - Her four new photos of three necklaces replace the earlier example.
  - The gallery opens with one of them worn, as she asked ("اختار وحدة منهم لابستها اللي في التصويرة"). It is the lapis-and-pyrite necklace, worn by the same model as before. ChatGPT made it from her photo and the old worn photo; it was checked against her photo before download.
  - The earlier example's scene and ChatGPT photos are no longer shown. Their files stay in the folder.
- **The BaZi bracelets** ("نبعثلك تصاور براسلايات بازي خليهم مع التصاور"): eight of her new photos, one per bracelet, follow the existing photos.
- **The learning necklaces:** her photos of the cord necklace and the gold-chain necklace follow the existing photos.
- **The line under a mixed gallery:** where ChatGPT photos are followed by her own photos, the line now says which are which:
  - "Les premières photos sont des mises en scène créées à partir des photos de Rayda ; les suivantes sont ses propres photos." / "الصور الأولى مشاهد مُعَدّة انطلاقًا من صور رايدا، وما يليها صورها الخاصة."
  - With a single staged photo first: "La première photo est une mise en scène…" / "الصورة الأولى مشهد مُعَدّ…".
  - Galleries of staged photos only keep their line. Galleries of her own photos only have none.

## Not done

- **The reviews:** her last line asks for "the reviews we agreed to change" ("و آخر شيء الاراء متاع الناس اللي تفاهمنا نبدلوهم"). What was agreed isn't in the messages received, so the reviews are unchanged.
- **Scenes for the five new pieces:** their galleries show only her photos. A CreateUGC scene could lead each one (2 credits each), as on the other pieces.
- **From Rayda:** the keyrings' size, and availability for all five.

## Files

- `src/catalog.js`: the five pieces; `ownPhotos`, which puts her own photos after the ChatGPT photos; the BaZi necklace's, bracelets' and learning necklaces' photos; the Porte-clés collection; the Amour path.
- `src/catalog-ar.mjs`: the five pieces in Arabic; the Porte-clés and Amour descriptions.
- `src/product-texts.mjs`: her bottle text in both languages.
- `src/product-pitch.mjs`: one line on each new piece (for the keyrings, her own sentence).
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the line under mixed galleries.
- `assets/products/organized/`, each with its `480/` copy:
  - her photos as sent: `bouteille-amour-01…03.jpg`, `porte-cles-amour-01…02.jpg`, `porte-cles-chance-01…02.jpg`, `porte-cles-voyage-01…03.jpg`, `porte-cles-protection-01…02.jpg`, `collier-bazi-04…07.jpg`, `bracelet-bazi-17…24.jpg`, `accessoires-apprentissage-01…02.jpg`
  - `collier-bazi-ai-porte.jpg` (ChatGPT). Its original is in `om Adem/ChatGPT photos (full size)/collier-bazi-porte.png`.
- `test/catalog.test.mjs`:
  - 24 products and 113 photos: 17 scenes, 56 ChatGPT photos and 40 of her own.
  - 20 ready-to-choose pieces; the cheapest is now a keyring (30 TND).
  - The ChatGPT-photo test allows her own photos after the ChatGPT ones.
  - A new test for the five pieces and the new photos.

Backups of the replaced files: `backups/before-love-keyrings-2026-11-21/`.

## Checks

- 35/35 tests.
- Lint: 24 products, 10 collections, 113 photos.
- Syntax check passes.
- No sideways scroll or clipped names on 23 FR/AR pages at 320, 360, 390, 768, 1180 and 1440 px, with the site's typefaces.
- Her Arabic and French sentences were checked again against her screenshots.

## Undo

Copy the files in `backups/before-love-keyrings-2026-11-21/` back over `src/` and `test/`, then build. The new photos can stay in the folder; nothing shows them.
