# Motion and ease of use — 14 November 2026

Two new files, loaded last on every page: `motion.css` and `src/motion.js`. Same typefaces and colours. Everything stops for visitors whose device asks for reduced motion, and the site works the same without the script.

## Animation principles

| Principle | Where it shows |
|---|---|
| Squash and stretch | Buttons, pills and arrows flatten slightly when pressed, then spring back past their size. |
| Anticipation | The arrow in a button pulls back a little before it moves forward on hover. |
| Staging | When the selection, the menu or an enlarged photo opens, the page behind blurs and steps back. The order button glows once when a product page settles. |
| Pose to pose | Each photo change in a gallery is one clear step; the chosen thumbnail lifts. |
| Follow through | Sections, list items and the selection panel arrive slightly past their place and settle. Lists come in one line after another. |
| Slow in, slow out | Shared easing curves replace the linear and plain "ease" timings. |
| Arcs | A piece added to the selection flies to the bag along a curve. |
| Secondary action | The bag tilts and its number pops when a piece lands; step numbers pop after their line; a card's badge lifts on hover; the hero leaf sways while a hero button is hovered. |
| Timing | Feedback takes 0.06 to 0.22 s. Entrances that took 1.25 to 2 s now take about 0.5 s. |
| Exaggeration | The count pop, a refused form field that shakes once, the confirmation that springs in. |
| Solid drawing (3D) | Product and category cards lean toward the pointer with a shadow underneath; buttons sit on a thin edge that disappears when pressed. |
| Appeal | All of it uses the site's own colours and shapes. |

## Usability laws

| Law | What changed |
|---|---|
| Fitts (bigger targets) | The whole product card is clickable. Gallery arrows, thumbnails, close buttons, quantity buttons and form fields are larger. Header icons have a wider touch area. |
| Hick (fewer choices) | One filled main button per view; personalised pieces no longer offer pickers. |
| Miller (small groups) | The checkout form is in three numbered groups: Vous, Livraison, Pour préparer votre pièce. |
| Doherty (answer within 0.4 s) | Pages are fetched when a link is aimed at, the next gallery photos are loaded ahead, and a pressed button shows it is working at once. |
| Postel (accept what people type) | Phone numbers are accepted with spaces, dots, 00216 or Arabic digits, then tidied. Names, addresses and postal codes are trimmed. |
| Jakob (familiar patterns) | Cards, underlined links, the bag at the top and Escape to close behave as on other shops. |
| Frequency of use | On phones the menu opens with Boutique first; the order bar stays at the thumb. |

## Files

- `motion.css`, `src/motion.js` (new); linked from `src/guidance-pages.mjs` and `src/guidance-pages-ar.mjs`; copied by `src/build-guidance.mjs`.
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the three checkout groups.
- `test/catalog.test.mjs`: 28 tests, one new.

## Checks

- All 28 tests pass.
- 52 French and Arabic pages at 8 widths (320 to 1920px): nothing scrolls sideways.
- In both languages, on desktop and phone: card click, add to selection, gallery, phone tidy-up and a full order.

## How to undo

Empty `motion.css` and `src/motion.js`, or copy back the files in `backups/before-motion-2026-11-14/`, then run `npm run build`.
