# AI product photos — 13 November 2026

## What changed

- **The product galleries** now show 50 photos made in ChatGPT from Rayda's own photos, in place of her photos. Each gallery still opens with the same lifestyle photo as before.

  | Product | AI photos |
  |---|---|
  | Bracelet BaZi sur mesure | 4: on the wrist, flat lay, close-up of the pyrite, in a dish |
  | Collier BaZi complet | 4: worn from the front, from the side, flat lay, close-up of the pendant |
  | Bracelet Énergie Amour | 8: the plain rose quartz version (4), then the version with the heart (4) |
  | Porte-clés Pierre | 4: in the hand, flat lay, on a tote bag, close-up of the stone |
  | Portefeuille Hafidha El Mel | 10: the four colours together, each colour laid flat, each colour in the hand, and a close-up of the mark |
  | Carte Million Dollar dorée | 4: between the fingers, flat lay, on a desk, close-up of the seal |
  | Décor Abondance doré | 4: in the hand, on a desk, on a shelf, close-up of the crown |
  | Clé de Vie dorée · Ankh | 4: in the hand, on the wall, flat lay, close-up of the loop |
  | Décor Fleur de Vie dorée | 4: in two hands, on the wall, flat lay, close-up |
  | Pendentif voiture · Clé de Vie | 4: on the mirror, from the passenger seat, held up, flat lay |

- **Colour and version buttons:** picking a wallet colour shows that colour laid flat. Picking a version of the Énergie Amour bracelet shows that version on the wrist. The cart shows the same photo.
- **The line under the gallery** now says "Les photos sont des mises en scène créées à partir des photos de Rayda." In Arabic: "الصور مشاهد مُعَدّة انطلاقًا من صور رايدة." On the BaZi bracelet and necklace it adds that each piece is composed for the client and can differ from the examples.
- **Writing:** every engraving and mark in these photos was checked letter by letter against Rayda's photos.
- **Unchanged:**
  - The Porte-clés Arbre de Vie and the Pendentif voiture · Fleur de Vie keep Rayda's photos; they have no AI photos yet.
  - Rayda's photo files stay in `assets/products/organized/`, unused, so they can come back.
  - The Accompagnement page still shows her photo of a BaZi necklace.

## Files

- `assets/products/organized/<id>-ai-<shot>.jpg`: the 50 photos (1086 × 1448), plus their 480px copies in `480/`.
- `src/catalog.js`: an `aiPhotos` list per product (file and description), and the colour/version photos.
- `src/shop-pages.mjs` and `src/shop-pages-ar.mjs`: the line under the gallery.
- `test/catalog.test.mjs`: the photo count is now 64, and one new test checks the galleries, the colour photos and the line (25 tests in total).
- The full-size originals are in `om Adem/ChatGPT photos (full size)/` (50 PNG files).

## Checks

- **Tests:** all 25 pass.
- **Every product page,** in French and Arabic, at desktop and phone widths: every photo loads, the arrows go through all of them and back to the first, and nothing scrolls sideways.
- **Buttons:** each wallet colour and each Énergie Amour version shows its own photo.

## How to undo

1. Copy the four files in `backups/before-ai-photos-2026-11-13/` (`src/catalog.js`, `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`, `test/catalog.test.mjs`) back over the project's.
2. Run `npm run build`.

The `-ai-` photo files can stay where they are; nothing uses them after that.
