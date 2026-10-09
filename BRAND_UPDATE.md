# Om Adem: a warmer storefront

Updated October 8, 2026. Local preview: http://127.0.0.1:4174/

## What changed

- Replaced the decorative typography with DM Sans, mixed-case headings and smaller, clearer buttons.
- Reduced header, hero, section and footer spacing. Categories now use consistent photo frames: five columns on desktop, three on tablets, two on phones.
- Moved Rayda's introduction and existing client feedback immediately below the welcome section. Added her supplied portrait.
- Rewrote the homepage around personal BaZi creations, a simple three-step conversation with Rayda, gifts and direct contact.
- Added the three supplied videos with native playback controls. They load near the viewport and do not autoplay.
- Preserved navigation, search, cart, galleries, review controls, entrance animations, desktop parallax and reduced-motion support.

## Files

- `src/homepage.js`: reusable homepage renderer and content.
- `src/app.js`: homepage integration, header labels and deferred video loading.
- `src/site-config.js`: portrait and video configuration.
- `storefront-layout.css`: shared typography, colors and responsive layout.
- `index.html`: font and homepage script.
- `build.mjs`: includes the new script and brand media.
- `scripts/check-syntax.mjs`: checks the new homepage script.
- `assets/brand/rayda.jpg`, `atelier-1.mp4`, `atelier-2.mp4`, `atelier-3.mp4`: copies of supplied media.

The source folders were left untouched. The product catalog remains 12 products, 8 collections and 44 product photographs. The videos introduce the atelier; they do not create new product listings or prices.

Previous versions of changed source files are in `backups/brand-before-2026-10-08/`.

## Verification

- `npm run typecheck`: passed JavaScript syntax checks; this project has no TypeScript type system.
- `npm run lint`: passed catalog checks.
- `npm test`: all 5 existing tests passed.
- `npm run build`: generated 22 entry routes.
- Browser checks at 320, 390, 700, 768, 1024 and 1440 CSS pixels: no horizontal overflow or broken loaded images; consistent category frames.
- Visually reviewed desktop and phone layouts, Rayda's portrait, category grid, animated sections and video gallery.
- Checked mobile menu and accordion, Escape from navigation, product search, cart opening, category filtering, price sorting, product options, image zoom and review selection/pause controls.
- Confirmed videos are deferred at the top of the homepage and play through their native controls.
- Browser reported no console warnings or errors during the final checks.

Screenshots: `om-adem-friendly-desktop.png` and `om-adem-friendly-mobile.png`.

## Existing launch items

Checkout and newsletter remain local demonstrations. Real order delivery, stock, final brand logo, missing product details and approval to publish client feedback still need to be completed before public launch. No new external service or public deployment was added.
