# Full homepage narrative and header social menu — 9 October 2026

Updated October 9, 2026. Local preview: http://127.0.0.1:4174/

## 1. The missing homepage section arc

The reference site, groundedhealthandwellness.com, runs a specific arc on its homepage: an intro statement ("Supporting your healing journey with…"), a two-pillar feature pair ("bio-individuality" / "ancient wisdom"), a benefits icon-list ("shifts you can see"), a founder bio ("Hi I'm Kate"), a two-card services section ("How we can work together"), testimonials, and a closing CTA band ("Reclaim vibrant, joyful living…"). This was never built on the Issolatej homepage before — only the hero, category grid, and a short testimonial teaser existed.

That full arc is now on the homepage, tailored to Rayda's actual brand rather than copied verbatim:

| Reference section | Issolatej equivalent |
| --- | --- |
| "Supporting your healing journey with…" | `.g-intro` — Rayda's approach in one statement + a pull-quote |
| Bio-individuality / Ancient wisdoms | `.g-support` + `.g-principles` — "Une lecture unique à chaque personne" (BaZi is inherently personalized) / "Des traditions anciennes, pensées pour aujourd'hui" (Reiki, Quranic recitation, energy reading) |
| "Just some of the shifts you can see…" | `.g-values` — four short, honestly-worded changes clients report (calm, confidence, a calmer relationship with money, a sense of connection) |
| "Hi I'm Kate" | `.g-about` — **Rayda's own real bio**, see below |
| "How we can work together" / 1:1 Services / Online Courses | `.g-services` — two cards: "La création sur mesure" (personal BaZi consultation → custom piece) and "La boutique, à choisir" (ready-made pieces), mapped onto the site's existing custom-vs-ready-made distinction rather than invented service tiers |
| Testimonials | The existing `.g-testimonials-teaser` is kept, just repositioned to sit in this same spot in the flow |
| "Reclaim vibrant, joyful living…" | A new homepage-specific closing band (reusing the existing `.g-closing` look) with its own two buttons: "Parlons ensemble" and "Découvrir la boutique" |

**Rayda's bio** uses her own self-description, supplied directly: *"رايدا 369 💚 باحثة في علوم الطاقة و جراند ماستر في ريكي المال $$$ وفرة$ ..تطور ..طاقة إيجابية ..وعي💚"* — researcher in energy sciences, Grand Master in Money Reiki, with her own signature words: abundance, growth, positive energy, awareness. The section is built around exactly this framing (quoted almost verbatim as the section's pull-quote) rather than a generic founder bio, and ties it directly to what buying a piece is for: "une préparation spirituelle pensée pour accompagner votre équilibre mental et énergétique — pas seulement votre apparence."

**On style:** almost none of this required new CSS. `guidance.css` already had fully-built, fully-responsive, but entirely unused classes from earlier work — `.g-intro`, `.g-support`/`.g-principles`/`.g-values`, `.g-about`, `.g-services`/`.g-service-card` — that mapped almost exactly onto what this section needed. The only additions were two small spacing rules (`.g-about-copy h2` had no font-size of its own; `.g-services`' eyebrow needed the same breathing room every other section's eyebrow gets) and two new icon glyphs (`personalization`, `wisdom`) in the shared hand-drawn icon set.

This is mirrored on the Arabic homepage (`/ar/`) too, with the same structure and Rayda's bio translated using her own original Arabic wording, so the two languages stay in sync.

## 2. Header social menu

A new small circular "@" button sits in the header (next to the language switch, before the Boutique button). Clicking it opens a compact popover listing Instagram, Facebook, YouTube, and WhatsApp, each with its own icon — a single control that gives access to every social channel rather than the footer being the only place to find them. On mobile, where the desktop header row hides, the same four links appear as an icon row inside the slide-out menu instead.

This needed its own small new script, `src/social-menu.js` — a generic open/close/outside-click/Escape handler, deliberately kept separate from the locked `guidance.js` rather than added to it. Present on both the French and Arabic sites.

## Test changes (reflecting intentional, not accidental, changes)

- `test/catalog.test.mjs`: the homepage section-count assertion was 3 (hero, categories, testimonial teaser) and is now 8, reflecting the sections added above — the test name and a comment were updated to explain the new count.
- The mode-isolation check that forbade `g-about-copy` from appearing on the homepage was updated: that class is now legitimately used by Rayda's bio section, so only the genuinely-dead `data-featured|s-product-grid|s-process` classes remain forbidden.
- The services section's image was swapped from a real product photo to the same illustrative `/assets/categories/` image already used elsewhere on the homepage, keeping intact the existing rule that the homepage only ever shows illustrative category art, never real product photography (real photos stay in the shop, where the existing test still checks for them).

## Verification

- `npm run typecheck`, `npm run lint`, `npm run build` (26 pages), and `npm test` (11/11) all pass, including the hero-lock test (hero section, `leaf` SVG, and `guidance.js` all still byte-for-byte unchanged).
- Browser-checked at 1440px and 390px, French and Arabic: the full new section arc renders correctly and in the right order, the social popover opens/closes correctly (click, outside-click, Escape all verified), and Rayda's bio section displays her real quote correctly in both languages.
