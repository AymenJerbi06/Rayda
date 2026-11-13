# Photos and the language switch — 13 November 2026

## What changed

- **Rayda's homepage photo** is the same photo, at the same size and crop. Nothing is cut out of it.
  - A cream arch now rises beside it: on the left on French pages, on the right on Arabic pages, and along the top on phones.
  - Its bottom edge melts into the cream section below instead of stopping on a hard line.
- **Language switch.** French pages show **عر** in Arabic letters instead of "AR", in the site's Arabic typeface (Tajawal). Arabic pages keep "FR".
- **Product photos** have softer corners everywhere: product cards, collection cards, the cart and the checkout. Each photo keeps its size and crop.
  - **Main photo on a product page:** the photo itself is now rounded. Before, its square corners showed inside the beige frame. It is shown whole, at exactly the size it had.
  - **"Voir de plus près":** now a small cream pill in the corner, with the "+" in a forest circle. It turns forest when the pointer is over the photo.
  - **Arrows between photos:** cream circles that turn forest, like the choice buttons.
  - **Thumbnails:** rounded, with the photo on show ringed in forest.
  - **Enlarged photo:** rounded too, on its forest background.

## Files

- `layers.css`: the photo styles.
- `polish.css`: the size of the Arabic letters in the switch (appended).
- `src/guidance-pages.mjs`: the "عر" label, and Tajawal loaded for just those two letters on French pages.
- `test/catalog.test.mjs`: three new tests, for 24 in total.

## Checks

- **Tests:** all 24 pass.
- **Gallery:** all 17 photos of the BaZi bracelet (in French and Arabic) and the 4 of the BaZi necklace show at the same size as before. The arrows, thumbnails and counter still move together.
- **Layout:** no sideways scrolling, broken images or errors on 14 French and Arabic pages, at 19 widths from 320px to 2560px. The header still fits on a 320px phone.
- **Buying:** ordering and checkout still work in French and Arabic.

## How to undo

This round goes in with the product page and colour rounds (`PRODUCT_PAGE_UPDATE.md`, `COLOUR_LAYERS_UPDATE.md`). The undo steps in those notes undo all three together.

To undo only this round:

1. In `layers.css`, delete everything from `/* Rayda's homepage photo` down to, but not including, `/* Focus rings`. Then delete the lines that start with `.g-hero-photo`, `.s-main-image`, `.s-card-image`, `.s-card:nth-child(3n)` and `.s-category-photo` inside the `@media(max-width:700px)` block at the end.
2. In `polish.css`, delete the last four lines (from the comment about "عر").
3. In `src/guidance-pages.mjs`:
   - change `<span lang="ar" dir="rtl">عر</span>` back to `<span>AR</span>`;
   - delete the link that loads `family=Tajawal:wght@700&text=`.
4. Run `npm run build`.
