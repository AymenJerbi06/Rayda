# Bug-fix round: RTL decoration, nav, Boutique layout, Arabic form — 9 October 2026

Updated October 9, 2026. Local preview: http://127.0.0.1:4174/

## 1. Missing/misplaced leaf motifs in Arabic (real RTL bugs, not missing decoration)

Two sections' background leaf decoration was pinned to a fixed physical side (`left`/`right` in CSS, which doesn't auto-flip with `dir="rtl"`), so once the layout mirrored for Arabic, the leaf ended up sitting *under the now-present text* instead of in the empty space — effectively invisible, exactly as reported:
- **"L'approche de Rayda" / مقاربة رايدة** (`.g-intro-motif`) — now mirrors to the left in RTL, and the card's rounded corner (`.g-intro-copy`) now cuts bottom-**left** instead of bottom-right, so it still faces the empty side.
- **"Ce que les clientes remarquent" / ما تلاحظه الزبونات** (`.g-values>.g-botanical`) — same fix, mirrors to the right in RTL.

Both verified visually: the leaf now sits fully in the empty space in both languages, at 1440px and 390px.

## 2. "Parlons ensemble" removed — it was a duplicate of Contact

The header nav had both "Contact" and "Parlons ensemble" as separate links to the exact same destination. Nav is now `Accueil / Vos Mots / Contact` (French) and `الرئيسية / كلماتكنّ / تواصل معنا` (Arabic) — three items, no duplicate. The "Boutique" CTA button is unchanged. Also fixed a related inconsistency this surfaced: Arabic's nav previously *also* repeated "المتجر" (Boutique) once in the nav and once as the CTA; it's now structured identically to French (Boutique only as the CTA), and the footer nav (which lists all four destinations including Boutique, same as the French footer) was made explicit in Arabic to match.

## 3. Boutique category-grid reverted to uniform sizing

The previous pass made Bracelets/Colliers large featured tiles against four smaller ones. On review this looked disproportionate rather than intentional, so it's reverted: all six category tiles are back to the same uniform size in a clean grid. The filled-vs-outline badge distinguishing custom BaZi pieces from ready-made ones on product cards was kept, since that wasn't reported as a problem.

## 4. Arabic contact page now has a real form

It previously only offered the WhatsApp phone link plus a note pointing back to the French form. It now has the same two fields as the French version — name, a "current interest" dropdown, and a message textarea — producing a proper Arabic WhatsApp draft on submit. Implemented as a new, separate `src/contact-ar.js` (mirrors the locked `guidance.js` contact-form logic exactly, but is its own file so the locked file stays untouched) bound to a distinct `data-contact-form-ar` attribute so it can't collide with the French handler. Verified end-to-end: submitting the form produces a correctly formatted Arabic WhatsApp message.

## 5. Homepage testimonial teaser restyled to match the rest of the site

It was a plain rectangle with no decoration — functionally fine, but visually it read as dropped in from elsewhere. It now has the same leaf motif and the same organic rounded-corner transition (here, top-corner) used by every other section on the page, in both languages.

## 6. "369" removed from Rayda's bio heading

`Rayda 369.` → `Rayda.` (and `رايدة 369.` → `رايدة.`). The signature-words bio copy below the heading is unchanged.

## Verification

- `npm run typecheck`, `npm run lint`, `npm run build` (26 pages), and `npm test` (11/11) all pass, including the hero-lock test.
- Visually confirmed in-browser, French and Arabic, 1440px and 390px: both leaf fixes, the trimmed nav, the uniform Boutique grid, the working Arabic contact form (including a real submission producing a correct WhatsApp link), and the restyled testimonial teaser.
