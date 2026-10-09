# Homepage layout update — 8 October 2026

## Changes

- Consolidated the accumulated homepage/header overrides into `storefront-layout.css`. The product, cart and checkout styles remain in `storefront.css`.
- Matched the narrow reference layout: 27px utility bar, 70px sticky navigation, viewport-height hero, centered 300px category frames below 800px, and white editorial sections with separate photographs.
- Retained desktop split sections, entrance animations, hover interactions, review rotation, search, collections menu and cart.
- Corrected diamond proportions/facets and spacing. Added the closing photograph on narrower screens and restored generous spacing in the purple information band.
- Kept all 12 products, 8 collections and 44 original imported product photographs. Category frames show the whole supplied photograph; no product image was generated or altered.
- Simplified homepage copy. Customer review permission still needs confirmation before public launch, as recorded in `CATALOG_IMPORT_REPORT.md`.

## Verification

- `npm run typecheck`: JavaScript syntax checks passed; the project does not use TypeScript.
- `npm run lint`: catalog and asset checks passed.
- `npm test`: 5 existing tests passed.
- `npm run build`: 22 static routes generated.
- HTTP checks: all 22 routes, 44 product photographs, 2 stylesheets and the application script returned 200 on port 4174.
- Responsive DOM checks: 320, 390, 700, 768, 1024, 1280, 1440 and 1920px; no horizontal page overflow, and the header remained sticky.
- Visual inspection at phone, split-window and desktop widths. Mobile menu/submenu, search and cart drawer checked in the browser; no captured console errors or warnings.
- Screenshots: `layout-desktop.png`, `layout-narrow.png`.

## Follow-up polish

- Review slides now share one grid cell and reserve the tallest quote's space, keeping the sections below still during rotation. Quotes remain centered inside the speech bubble.
- Added pause/resume, hover/focus pause and selected-state labels to review controls. Automatic changes do not interrupt screen-reader announcements.
- Aligned the four desktop information-panel buttons despite different heading lengths.
- Fixed the utility delivery link on product/collection pages. Escape now closes the mobile menu from inside its links and restores focus to its button.
- Re-ran syntax checks, catalog lint, all 5 tests and the 22-route build. Browser checks confirmed identical carousel height between quotes on desktop and at 390 CSS pixels, no mobile overflow/broken images, working pause and Escape controls, and product-to-delivery navigation. No console errors or warnings were captured.

## Local preview and source preservation

Preview: http://127.0.0.1:4174/

The pre-edit source files are saved in `backups/layout-before-2026-10-08/`. The `Photos` and `organized Products` source folders were not changed. No public deployment was performed.
