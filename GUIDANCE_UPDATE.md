# Issolatej — Rayda’s personal website

Updated October 8, 2026. Local preview: http://127.0.0.1:4174/

## Current direction

The active build presents Rayda and her personal spiritual approach. It contains no product listings, prices, shopping navigation, cart or checkout. The prior 12-product catalog, 44 product photographs, 8 collections and storefront implementation remain in the source project for later use. Original media folders were not altered.

The visual reference is https://groundedhealthandwellness.com/: forest green and cream, large serif headings, a split portrait hero, asymmetric rounded sections, bordered cards, botanical shapes, fades and a sliding mobile menu. The code, French copy, botanical SVG, wordmark and imagery are specific to this project. No reference logo, portrait, reviews, medical credentials or external integrations were copied.

## Pages

- `/` — introduction, approach, Rayda, guidance cards, existing anonymized customer messages, FAQ and contact invitation.
- `/a-propos/` — introduction to Rayda.
- `/accompagnement/` — first conversation and her personal BaZi approach.
- `/contact/` — validated form that prepares a WhatsApp draft locally. The visitor separately opens WhatsApp, reviews the draft and sends it there. There is no server submission, newsletter service, calendar booking or automatic message sending.

## Editing and rebuilding

- `src/site-config.js`: brand name **Issolatej**, founder details and contact phone.
- `src/guidance-pages.mjs`: shared header, text wordmark, navigation, footer and four page templates. Edit the `wordmark` constant here to add the final logo once available.
- `guidance.css`: colors, typography, spacing, responsive layout and motion.
- `src/guidance.js`: scroll reveals, mobile dialog, focus restoration, back-to-top, testimonial controls, FAQ and contact-draft preparation.
- `src/build-guidance.mjs`: produces the four-page static site and copies only the required presentation assets.
- `build.mjs`: selects the new build when `siteMode` is `guidance`.
- `index.html` and `dist/`: generated files; edit the template rather than these files.
- `package.json`: build/check commands and local preview command.
- `scripts/check-syntax.mjs`, `scripts/verify-catalog.mjs`, `test/catalog.test.mjs`: syntax, catalog, brand, asset and internal-route checks.

From this `prototype` directory:

```powershell
npm run build
npm run preview
```

Run the preview command only if port 4174 is no longer serving the site. It binds to loopback only. Nothing has been publicly deployed.

The prior homepage entry is `storefront.html`; the original storefront CSS, JS and catalog remain alongside the new implementation. Pre-change entry/build/config/package files are saved in `backups/guidance-before-2026-10-08/`. To restore the storefront build, change `siteMode` to `storefront` and rebuild. The old shopping URLs are intentionally absent from the active guidance build.

## Content and design notes

- All visible brand references, page titles, portrait alt text, footer and mobile menu use Issolatej.
- Rayda’s real supplied portrait is `assets/brand/rayda.jpg`. The original file remains untouched.
- Body font: Montserrat. Display font: DM Serif Display, an open-font substitute for the reference’s licensed display fonts. Typography is therefore visually similar, not identical. Google Fonts loads the fonts; local system fallbacks are provided.
- The quote slider reuses the three anonymized messages already present in the project. No review count, rating or new customer review was fabricated.
- Service format, prices and availability remain matters to discuss with Rayda; the site does not claim a confirmed booking service.
- Animation is disabled for visitors with reduced-motion preferences. Core page content is visible without JavaScript.

## Verification

Passed `npm run build`, `npm run typecheck`, `npm run lint` and `npm test` (6 tests). The typecheck command checks JavaScript syntax; this project has no TypeScript type system. The lint command is the existing catalog validator.

Browser checks covered all four pages, desktop/tablet/phone layout, 320–1920px overflow checks, sliding navigation, Escape and focus restoration, FAQ exclusivity, previous/next testimonials, back-to-top, internal links and local form validation. A dummy contact draft was prepared but never sent. A decorative leaf overflow and missing spaces around responsive line breaks were corrected. New-tab browser error/warning logs were empty during verification.

Automated build checks confirm local assets and internal anchors exist, every page has one H1 and the Issolatej title, and no previous/reference branding or shopping components are included in the guidance pages.

Screenshots: `issolatej-desktop.png` and `issolatej-mobile.png`.

## Generated atmospheric image

Saved project path: `C:/Users/jayme/Desktop/Projects and school work/SFU/Fall 2026/om Adem/prototype/assets/brand/reflection-journal.png`.

Mode: built-in image generation tool. This illustrative journal scene is not a photograph of Rayda’s office or a product for sale. Rayda’s portrait was not generated or altered.

Final prompt:

> Use case: photorealistic-natural. Asset type: landscape editorial photograph for a personal spiritual guidance website service card. Primary request: a quiet moment of reflection, an open unmarked cream journal and simple pen on a pale oak table next to a ceramic cup of herbal tea and a small olive branch, softly blurred light linen curtain in the background. Natural side daylight, muted warm cream and forest green palette, tactile and unpretentious, realistic photography, landscape 3:2 crop. No people, no products for sale, no crystals, no text, no logos, no watermarks. This is atmospheric illustrative imagery, not a depiction of a real practitioner's office.
