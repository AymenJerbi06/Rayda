# Boutique redesign, header CTA swap, and Arabic language option — 9 October 2026

Updated October 9, 2026. Local preview: http://127.0.0.1:4174/

## 1. Boutique page redesign

The Boutique (`/collections/all/`) led with a flat, filter-heavy product grid — every one of the 12 pieces at once, with a mode/search/sort toolbar on top. It emphasized tools, not the pieces themselves.

It now opens with real purpose and leads with **type, not a filter panel**:
- A shop-focused hero ("Une pièce pour chaque histoire.") replaces the generic collection description used on this route.
- A **visual, photo-led category grid** — the exact same component already proven on the homepage — lets a visitor choose by type (bracelets, colliers, porte-clés, portefeuilles, objets dorés, voiture) before anything else.
- The full filterable catalog (search, sort, "Créé pour vous"/"À choisir" filters, all 12 products) is kept — nothing was removed — but it's now introduced by its own "Toute la boutique, en un coup d'œil" heading and sits clearly *after* the category choice, instead of being the first and only thing on the page.

Individual collection pages (`/collections/bracelets/`, etc.) are unchanged — they were already focused on one category and weren't the page flagged as confusing.

Files: `src/shop-pages.mjs` (`collectionPage()` branches on `collection.slug === 'all'`), `commerce.css` (new `.s-shop-categories` rules, reusing `.s-category-grid`/`.s-category` as-is).

## 2. Header CTA swapped to Boutique

The filled, highlighted header button was "Parlons ensemble." Since the site's purpose is bringing people to buy, the highlighted button is now **"Boutique"** → `/collections/all/`. "Parlons ensemble" moved into the plain nav list alongside Accueil, Vos Mots, and Contact — still one click away everywhere (header, mobile menu, footer), just no longer the visually dominant action. The footer's navigation column now explicitly includes Boutique too, since it's no longer implied by the header CTA alone.

File: `src/guidance-pages.mjs` (`nav` constant, `g-header-cta`, mobile menu CTA, footer nav).

## 3. Arabic language option

A language switcher (`FR` / `عربي`) now sits in the header and mobile menu on every page. It is page-aware: from the French homepage it goes to `/ar/`, from Vos Mots to `/ar/vos-mots/`, from the Boutique to `/ar/boutique/`, etc.; from any page without an Arabic translation yet (individual products, collections, checkout) it falls back to the Arabic homepage rather than a dead link.

**What's translated, in full, with a right-to-left layout:** Accueil, À propos (Rayda), Accompagnement, Contact, Vos Mots, and a dedicated Arabic Boutique page — six pages at `/ar/`, `/ar/a-propos/`, `/ar/accompagnement/`, `/ar/contact/`, `/ar/vos-mots/`, `/ar/boutique/`. The three testimonials use the customers' own original Arabic wording (the same source messages behind the French excerpts), not a re-translation. Copy addresses the clientele in the feminine plural, matching the real customer base behind every testimonial collected for this project.

**What's intentionally not translated yet:** the 12 individual product pages, the 8 individual collection pages, and checkout. These stay French-only for now — translating the full catalog is real, separate work tied to `src/catalog.js`. The Arabic Boutique page says this plainly and offers the WhatsApp line as the Arabic-language way to ask about any specific piece, plus a direct link back to the French catalog.

**Why a contact form wasn't added on the Arabic contact page:** the existing form's "prepare a WhatsApp draft" logic lives in `src/guidance.js`, which is deliberately left untouched (see below), and it hardcodes a French message template ("Bonjour Rayda, je m'appelle…"). Rather than ship an Arabic-labeled form that silently produces a French message, the Arabic contact page leads with the WhatsApp phone link directly (always works, no JS dependency) and offers a plain link to fill the French form instead for anyone who prefers it.

**How it's built, technically:**
- `src/guidance-pages-ar.mjs` is a **new, separate renderer** (`renderGuidancePageAr`) — it does not touch or parameterize the existing French `renderGuidancePage`. This was a deliberate choice to guarantee zero risk to the locked French hero section.
- It reuses the French renderer's `leaf` SVG and `icon()` helper (now exported from `guidance-pages.mjs`) and the homepage's `shopCategories` list (now exported from `shop-pages.mjs`), so there's no duplicated SVG path data and the two languages can't visually drift apart.
- `src/reviews-ar.mjs` holds the three authentic Arabic excerpts.
- RTL layout comes from `<html lang="ar" dir="rtl">`. Because the CSS already reads color/spacing/font through `var(--sans)`/`var(--serif)` custom properties, a single rule — `[dir="rtl"]{direction:rtl;--sans:"Tajawal"…;--serif:"Markazi Text"…}` — retypesets and auto-mirrors the vast majority of the layout for free (CSS grid/flex respect `direction` natively). The hero image/text swap sides, the category grid flips, text alignment flips — all automatically.
- A handful of **physically-positioned** decorative details (the botanical leaf's `left`/`right` offset, a few organic `border-radius` corners on the hero photo, category grid, and review cards) don't auto-mirror and were given explicit `[dir="rtl"]` overrides.
- Known, accepted minor gaps in this pass: the floating back-to-top button and the mobile slide-out menu stay anchored to the same physical screen edge in both languages rather than mirroring sides. Neither breaks anything or hides content — it's a cosmetic refinement left for later.
- `src/guidance.js` is reused as-is on Arabic pages for the reveal animations, mobile menu, back-to-top, and FAQ accordion (all selector-based and language-agnostic) — only the contact-form handler was avoided, per above.
- `build.mjs` → `src/build-guidance.mjs` now additionally writes the six Arabic pages into `dist/ar/…` on every build.

## Verification

- `npm run typecheck`, `npm run lint`, `npm run build` (26 pages, 6 of them Arabic), and `npm test` (11/11) all pass.
- The hero-lock test still confirms the French hero section, the `leaf` SVG, and `src/guidance.js` are byte-for-byte unchanged; `guidance.css` is confirmed to still contain every previously shipped rule unedited, with only new rules appended.
- The link-integrity test now also walks all six Arabic pages and confirms every internal link and image on them resolves to a real file, each has exactly one `<h1>`, and none contain leftover reference-site branding.
- Browser-checked at 1440px and 390px: Boutique's category grid and full catalog both render correctly on French; the Arabic pages render correctly mirrored (header, hero, category grid, reviews grid, footer) with working fonts (Markazi Text / Tajawal), a working mobile menu, and no horizontal overflow.
