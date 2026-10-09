# Header, reviews, and social links update — 8 October 2026

Updated October 8, 2026. Local preview: http://127.0.0.1:4174/

## Changes

- **Header navigation** simplified to exactly five items, matching the reference site's header shape: Accueil, Boutique, Vos Mots, Contact, and the "Parlons ensemble" call-to-action button. "Rayda" (`/a-propos/`) and "Le sur-mesure" (`/accompagnement/`) are no longer top-level nav links — both pages remain live and are still reachable from in-page links (the homepage hero's "Découvrir l'approche", and the closing section's "Rencontrer Rayda" on every page).
- **Homepage testimonials simplified.** The three-quote carousel with prev/next controls is gone from the homepage. It now shows one short, representative quote and a single button, "Lire tous les témoignages," linking to a new page.
- **New page: `/vos-mots/`.** All three real, translated, anonymized customer excerpts are presented in full as a three-card grid (two-column on tablet, one-column on phone), styled with the same cream panel, organic rounded corner, and quote-mark treatment used throughout the site.
- **Real social links added.** `src/site-config.js` now carries the actual Instagram, Facebook, and YouTube URLs. Three small circular icon links were added to the footer, next to the existing WhatsApp link, using new hand-drawn line icons consistent with the site's existing icon style.

## Files

- `src/guidance-pages.mjs`: nav links, `icon()` now also draws Instagram/Facebook/YouTube glyphs, new `votreMots` page template, simplified homepage teaser, footer social icon row, `vos-mots` added to `guidanceRoutes` and the page-title/routing switches.
- `src/site-config.js`: `contact.instagram`, `contact.facebook`, and new `contact.youtube` populated with the real URLs.
- `guidance.css`: new rules only **appended** after the existing file — nothing already present was edited or reordered, so the hero and every previously shipped rule stay byte-for-byte identical. New rules cover `.g-testimonials-teaser`, `.g-reviews-grid` / `.g-review-card`, and `.g-social-row` / `.g-social-icon`.
- `src/guidance.js`: untouched. The new page and teaser both reuse the existing generic `[data-reveal]` scroll-reveal observer; no new interaction code was needed.
- `src/build-guidance.mjs`: build summary log now counts pages dynamically (26, was a hardcoded "25") instead of drifting out of sync after a route is added.
- `test/catalog.test.mjs`: `vos-mots` added to the two route/link-integrity checks; the old full-file byte-equality check on `guidance.css` was replaced with a "every original rule must still appear unchanged, only appended to" check, since the file legitimately grew. The hero-section lock, the `leaf` SVG lock, and the full byte-equality check on `guidance.js` are all unchanged.

## Verification

- `npm run typecheck`, `npm run lint`, `npm run build` (26 routes), and `npm test` (11/11) all pass.
- Browser-checked at 1440px and 390px: header shows the five requested items with no duplicate "Accueil" in the mobile slide-out menu, the homepage teaser renders one quote plus the button, `/vos-mots/` renders all three testimonials, and the footer's three new social icons point at the real Instagram/Facebook/YouTube URLs.
- The locked hero section, animation hooks, and `guidance.js` were verified unchanged by the automated test; all previously shipped `guidance.css` rules are confirmed still present and untouched, with new rules only appended at the end of the file.

## Visual direction (point 4)

This project's design already follows https://groundedhealthandwellness.com/ closely — forest green and cream panels, a serif display face (DM Serif Display) over Montserrat body text, organic rounded-corner section transitions, scroll-reveal fade/rise animation, and understated text-link CTAs plus one filled button — established in `GUIDANCE_UPDATE.md`. Every element added in this pass (the simplified teaser, the new Vos Mots page, the social icon row) reuses that same existing visual language (`.g-page-heading`, `.g-eyebrow`, `.g-display`, `.g-button`, the cream/forest alternating rhythm, the rounded "blob" corner on `.g-reviews-grid`) rather than introducing a new style, so the whole site — including these new pieces — stays visually consistent with the reference.
