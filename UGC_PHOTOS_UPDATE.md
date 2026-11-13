# Lifestyle photos made from Rayda's own photos — 13 November 2026

## What was made

- **11 lifestyle (UGC-style) photos**, made on CreateUGC (Nano Banana Pro, "Image to Image").
- **Each one starts from Rayda's own photo of the piece,** so the stones, gold shapes and engravings match her real products.
- **Cost:** 24 credits: 22 for the 11 photos and 2 for a redo of the BaZi bracelet photo. The redo copied her bracelet bead for bead but looked worse, so the site uses the first version.
- **Look:** daylight, cream linen, light wood and green plants, with hands, wrists and necks only and no faces. The wallet is shown closed, as Rayda asked.
- **Originals:** the full-size PNG files (1254 × 1254) are kept in `om Adem/UGC photos (CreateUGC)/`. The unused redo is there too, as `01-bracelets-v2 (not used).png`. The zip in that folder is the first download and still holds the redo under the name `01-bracelets.png`, so go by the loose files.

## Where they appear

- **Category cards** (homepage and Boutique). The 6 drawn pictures in `assets/categories/` are replaced by photos, with the same file names (720 × 720 WebP). The cards no longer blend the picture into the card colour (`commerce.css`, rules appended at the end).
- **Product pages and shop cards.** 11 products now lead with their photo, followed by all of Rayda's own photos:
  - Bracelet BaZi
  - Collier BaZi
  - Bracelet Énergie Amour
  - Porte-clés Pierre
  - Portefeuille Hafidha El Mel
  - Carte Million Dollar
  - Décor Abondance
  - Clé de Vie
  - Décor Fleur de Vie
  - both car pendants
- **Files and catalog.** Files: `assets/products/organized/<id>-ugc.jpg` (1200 × 1200), plus the 480px copy in `480/`. Each product gets a `lifestyle:` description (the photo's alt text) in `src/catalog.js`. For the Amour bracelet, choosing a model still shows that model's own photo.
- **Gallery note.** A line under every gallery says the first photo is a scene made from Rayda's photos, in French and Arabic.
- **Porte-clés Arbre de Vie** is unchanged, since Rayda no longer has it.

## Checks

- **Tests:** all 16 pass. The photo-count test now expects 55 photos: Rayda's 44 plus 11 lifestyle photos.
- **Layout:** no sideways scrolling, broken images or errors on the homepage, Boutique and product pages, French and Arabic, from 320px to 1440px wide.

## How to undo

1. Copy the files in `backups/ugc-photos-before-2026-11-13/` back over the project.
2. Delete the 22 `*-ugc.jpg` files in `assets/products/organized/` and `assets/products/organized/480/`.
3. Run `npm run build`.
