# Visual polish and smoother browsing — 12 November 2026

Updated November 12, 2026. Local preview: http://127.0.0.1:4174/

## What stayed exactly the same

The style and the subject are unchanged: forest green and cream, DM Serif Display over Montserrat (Markazi Text and Tajawal in Arabic), the botanical leaf, the organic rounded corners, Rayda's portrait, the page order and every piece of copy. The locked pieces are untouched and the hero-lock test still passes: the French hero section, the `leaf` SVG, `src/guidance.js` and every existing rule in `guidance.css`. All new styling lives in one new file, `polish.css`, loaded after the other two stylesheets, so this round can be reviewed or removed on its own.

## Visual refinements

- **Phone header.** Previously the language pill, bag and menu were 32px tall while the Boutique button was a 44px block with 9px text. Every control is now the same 36px height with a readable 10px Boutique label, and each one has an invisible 44px tap area. Smaller phones (under 375px and 340px) step the sizes down so nothing crowds or overflows.
- **Readability.** Labels that were 8–10px on phones (card eyebrows, category subtitles, badges, the collection caption, breadcrumbs, the cart's variant line, the footer fine print) are now 10–12px. Headings use balanced line breaks and paragraphs avoid one-word last lines. The hero keeps its own hand-set breaks.
- **French typography.** On French pages, the build now inserts a non-breaking space before `?`, `!`, `:`, `;` and `»` (and after `«`), so "personnalisation ?" or "« … »" never leave punctuation alone at the start of a line. Only text between tags is touched, and Arabic pages are left as they are.
- **Fixes:**
  - On phones, the footer phone number ran straight into "ÉCRIRE À RAYDA" on the same line.
  - The three checkout steps used green icons and badges on the dark green heading, so they were nearly invisible. They're now sage.
  - In the phone menu, the language button was squashed into a narrow pill by the menu's link padding.
- **Home on phones.**
  - The two pillar cards now put the icon above the text, so the headings get the full width instead of breaking into four lines.
  - Below 520px, the four "Ce que les clientes remarquent" items form one readable column instead of a cramped 2×2 grid.
- **Focus rings** use the darker green on cream and paper sections, where the sage ring was hard to see.

## Smoother browsing

- **Header.** It sits exactly as before at the top of every page. Once it has scrolled away, a compact version (64px on desktop, 52px on phones) slides back in when the visitor scrolls up and tucks away while they read down. The page content never jumps. This lives in the new `src/ux.js`.
- **Shop.**
  - The whole product card is one tap target, not just the photo, the name and a 32px arrow.
  - On phones, the collection links are one swipeable row that opens with the current collection in view, instead of three lines of small links.
  - On phones, "Dans le même esprit" is a swipe row. Before, the second-to-last card was hidden, so a product with two related pieces showed one card alone in a two-column grid.
- **Product page.**
  - Swipe between photos on touch screens, on the page and in the zoom view. Arabic swipes are mirrored.
  - The thumbnail strip follows the active photo, and the next and previous photos load in the background.
  - The pinned mobile buy bar now steps aside while the main buy buttons are on screen, so the same button never appears twice. The back-to-top button moves above the bar while it's showing.
- **Cart and checkout.**
  - The bag icon pulses when something is added, and the selection drawer slides in from its side (from the left in Arabic).
  - After an order, the filled-in form is cleared and folded away, and the confirmation is focused and scrolled into view. On a phone it used to appear below the fold. The emptied selection no longer shows "0 TND".
- **Motion.** Buttons give slight feedback when pressed. The social popover and back-to-top button fade in. FAQ answers open and close smoothly, and pages cross-fade into each other, in browsers that support it (Chrome and Edge today); other browsers behave as before. All motion is off for visitors who prefer reduced motion.

## Arabic mirroring

These were listed as accepted gaps in `BOUTIQUE_AND_ARABIC_UPDATE.md` and are now done: on Arabic pages, the phone menu slides in from the left with its close button on the left, and the back-to-top button sits bottom-left. Also new in this round: the selection drawer opens from the left, and the benefits grid's divider sits between its two columns instead of on the outer edge.

## Lighter photos

Every product photo now has a 480px-wide copy in `assets/products/organized/480/` (44 files, about 2.5 MB in total), made by the new `scripts/make-product-thumbnails.ps1`. Product cards, gallery thumbnails and the cart use these copies. The main product photo and the zoom view still use the full photo, and on tablets and desktops a sharp screen can still pick the full photo for cards. The originals are untouched. None of the photos have EXIF rotation or embedded colour profiles, so the copies match them exactly.

| Page, on a phone | Images before | Images after |
| --- | --- | --- |
| Boutique (`/collections/all/`) | 2,511 KB | 938 KB (63% lighter) |
| Bracelet BaZi product page | 2,753 KB | 1,186 KB (57% lighter) |

**After importing new photos** with `scripts/import-organized-products.ps1`, run `scripts/make-product-thumbnails.ps1` as well. If a copy is missing, the build stops with a message naming the photo, so a product card can never show a broken image.

## Files

- `polish.css` (new): all visual and motion refinements.
- `src/ux.js` (new): the header that comes back on scroll-up, and centring the current collection in its row.
- `scripts/make-product-thumbnails.ps1` (new): makes the 480px photo copies.
- `src/commerce.js`: photo swipe, thumbnail follow, preloading, buy-bar visibility, bag pulse, the checkout confirmation, and the lighter cart images.
- `src/commerce-core.js`: shared `thumbSrc()` helper.
- `src/shop-pages.mjs` and `src/shop-pages-ar.mjs`: card and thumbnail images use the copies.
- `src/guidance-pages.mjs` and `src/guidance-pages-ar.mjs`: load `polish.css` and `ux.js`. Only the `<head>` line changed; the hero is untouched.
- `src/build-guidance.mjs`: copies the new files, checks the photo copies exist, and applies French spacing to French pages.
- `scripts/check-syntax.mjs`: now also checks `src/ux.js` and `src/shop-pages-ar.mjs`.
- `test/catalog.test.mjs`: two new tests. One checks that every photo has its copy; the other checks that the polish layer loads on French and Arabic home, shop, product and checkout pages and that French punctuation stays with its word.

## Verification

- `npm run build`, `npm run typecheck`, `npm run lint`, `npm test` (13 of 13, including the hero lock) and `scripts/verify-preview.mjs` (25 pages and 50 images return 200) all pass.
- 15 French and Arabic pages were loaded at 320, 360 and 375px, and 11 at 390, 414, 768, 1024, 1280 and 1440px. None had sideways scrolling, broken images or header overflow.
- Ten French and Arabic page types showed no console errors.
- Checked in the browser at 375px, 768px and 1440px:
  - The header hides and returns as described, with no layout jump.
  - Swipes in both directions move between photos, and a tap still opens the zoom.
  - The thumbnail strip follows the active photo.
  - The buy bar hides only while the main buttons are on screen.
  - The bag pulse and drawer slide work.
  - The checkout confirmation replaces the form and scrolls into view. This was tested with a dummy local order, removed afterwards.
  - The Arabic menu, back-to-top button, drawer and benefits divider are mirrored.
- Headless Edge at a real 375px window requested only the 480px copies for the shop cards.

## Notes

- The local preview server sends no caching headers. A browser that visited the preview before this update may keep running the old scripts for a while, so do a hard refresh (Ctrl+Shift+R) once. Hosting on Vercel revalidates files on every visit, so this doesn't affect a deployed site.
- Nothing was published or deployed.
