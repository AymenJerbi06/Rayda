# Colour layers — 13 November 2026

## What changed

- **No plain white surface is left.** The site's two colours, forest green and the cream beige, are layered the way the homepage hero and shop sections already were. Each layer carries the site's own leaf, drawn faintly: a darker beige on cream, a lighter green on forest.
- **Product pages:**
  - The buy area is cream, with the leaf behind it.
  - A picked model, size or colour turns forest green with the hero's light green and a small leaf.
  - Colour preferences are swatches to tap instead of a drop-down.
  - "Comment ça se passe" is a forest card, and the client's words sit on the deeper beige.
  - Rayda's description is a full-width forest band, and the related pieces sit on the deeper beige.
  - On phones, the pinned buy bar is a forest ribbon with a light-green button.
  - The photo zoom opens on forest, and the selection drawer is cream.
- **Boutique:** the full collection sits on the deeper beige with the leaf. Filter pills and fields are cream, and "Vous hésitez" is a forest card.
- **Homepage:** the "Accompagner votre équilibre" block, which was white, is now a forest panel on cream. The testimonial teaser moves to the deeper beige.
- **Accompagnement:** the second block alternates to forest, as the homepage does.
- **Closing sections** (Vos mots, À propos, Accompagnement): the deeper beige instead of near-white.
- **Checkout:** the details card sits on the deeper beige, and every form field is cream instead of white.
- **Fonts:** untouched. A test fails if `layers.css` ever sets a typeface.

## Files

- `layers.css` (new): all the colours of this round, loaded after `polish.css` on every French and Arabic page. It adds two shades, `--cream-deep` (#e6dfd4) and `--petal` (#f3eee6, for fields and pills), plus the leaf tints.
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the colour-preference swatches.
- `src/build-guidance.mjs`, `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: copy and link `layers.css`.
- `commerce.css`: the product page block leaves its colours to `layers.css`.
- `test/catalog.test.mjs`: two new tests, for 21 in total.

## Checks

- **Tests:** all 21 pass.
- **Buying:** taps on models, sizes, colours and colour preferences reach the cart and the checkout. Checkout works in French and Arabic.
- **Layout:** no sideways scrolling, broken images or errors on 24 French and Arabic pages, from 320px to 1440px wide.

## How to undo

This round goes in together with the product page and photos rounds (`PRODUCT_PAGE_UPDATE.md`, `PHOTOS_UPDATE.md`), so all three are undone together:

1. Put the previous files back, in either of these ways:
   - copy the files in `backups/before-product-page-and-colours-2026-11-13/` back over the project, if that folder exists;
   - otherwise, run `git checkout -- .` in this folder.
2. Delete `layers.css`, `src/product-pitch.mjs`, `PRODUCT_PAGE_UPDATE.md`, `PHOTOS_UPDATE.md` and this note.
3. Run `npm run build`.
