# Shop groups and a clearer header — 21 November 2026 (night)

The user's request: the home page did not show everything Rayda sells, so regroup the products and add what was missing; give each group one photo with all its pieces side by side instead of one piece; and make the header easier for a first-time visitor, especially the three bars, which did not look like a button that opens more.

## What changed

- **Eight groups that cover all 24 pieces.** The home page, the Boutique page, the new Boutique panel in the header and the phone menu all show them, in French and in Arabic:
  1. Bracelets: BaZi sur mesure, Énergie Amour, apprentissage
  2. Colliers: BaZi, Collier Clé, apprentissage
  3. Porte-clés: Pierre, Arbre de Vie, Amour, Chance, Voyage, Protection
  4. **Portefeuille & carte** (new group): Hafidha El Mel and the Million Dollar card
  5. Objets dorés: Abondance, Clé de Vie, Fleur de Vie, Trophée d’Amour, grenouille, pièces Feng Shui
  6. **Bouteilles** (new group and collection): the study bottle and the love bottle
  7. Pour la voiture: Fleur de Vie, Clé de Vie
  8. Livres: opens the book's page, as before
  - Each card names its group and says what is inside.
  - "Accessoires d’étude" left the grid. The accessories now sit in the Bracelets and Colliers groups, and their collection page is still in the row of collection links.
  - Catalogue: a new `bouteilles` collection; `portefeuilles` is now "Portefeuille & carte" / "المحفظة والبطاقة" and holds the card, which left `objets-dores`. There are 11 collections in all.
  - The Boutique introduction now lists everything Rayda sells.
- **One photo per group with all its pieces together.** The seven groups besides Livres have new photos; Livres keeps its photo.
  - The line under the grid reads "Chaque photo réunit les pièces de sa catégorie. Ce sont des mises en scène créées à partir des photos de Rayda." / "كل صورة تجمع قطع تصنيفها، وهي مشاهد مُعَدّة انطلاقًا من صور رايدا."
  - Every photo's writing was compared with Rayda's photos. Where the tools got it wrong, her real writing was laid in: the verses on the energy keyrings, the print on both bottles, the Million Dollar card, the Clé de Vie on the gold-objects photo, and the Clé de Vie and Fleur de Vie car pendants (the Fleur de Vie band comes from its approved scene). The wallets' marks and the trophy's medallion matched as drawn.
  - **The Feng Shui coins** in the gold-objects photo keep the characters CreateUGC drew. Two attempts to lay her real coins in did not line up, so they were left as drawn. They are small in the photo.
- **The header** (all 88 pages, French and Arabic):
  - The controls form one row. Language, social links, Boutique, basket and Menu (below 1025px) share one shape (the site's 9px corners), one height (44px, 40px on phones), one border and one type style.
  - **Boutique** is the one filled button. It opens a panel under the header with the eight groups and their photos, "Toute la boutique" / "كل المتجر", and the three paths ("Par où commencer ?"). It closes with Escape (focus goes back to the button), a click elsewhere, tabbing out of it, or scrolling. Opening Boutique closes the social links, and opening the social links closes Boutique.
  - **Menu:** the three bars are now a bordered button with the word "Menu" / "القائمة". Below 360px the word drops and the bordered button stays.
  - The **"@"** button is named "Réseaux" / "تابعونا" on wide screens.
  - The **basket** says "Panier" / "سلتي" on wide screens. On phones it is a square with the count on its corner.
  - The phone and tablet **menu** opens with the eight groups and their photos, then "Toute la boutique", then the pages, the language and the social links.
  - The page links (Accueil, Vos Mots, Contact) get a thin sage underline on hover and on the current page.
  - On laptops too short for two rows of photos (up to 1279px wide and 960px high), the panel shows the eight groups in one row with their names only.
- **Basket wording in Arabic** now matches the French "panier": "سلتي" (header and basket title), "أضيفوها إلى السلة" (product pages), "سلتكم" (checkout), "إغلاق السلة", and the empty-basket and FAQ lines. "(اختياري)", which means "optional" on the checkout form, is unchanged.
- **French fix:** "Votre panier reste disponible sur cette page, mais votre navigateur ne permet pas de le conserver" (it said "de la").

## How the photos were made

- **CreateUGC** (Nano Banana Pro, image to image, 2 credits each): Porte-clés, Portefeuille & carte, Objets dorés, Bouteilles and Pour la voiture, 10 credits approved by the user. Each was made from a board of the group's approved site photos.
- **ChatGPT** (the user's Plus account, two chats started on 21 November: `6b027400…` and `6b027435…`): Bracelets and Colliers.
- **Download** (allowed by the user): `rayda-groupes.zip` (7 PNGs, 24.8 MB) in Downloads. A CreateUGC PNG that opened as a download by mistake (`f6240c7a-….png`) was used too. Both can be deleted once the originals are filed.
- **Site copies:** `assets/categories/groupe-<group>.webp` at 720px (quality 70–78), plus 240px copies in `assets/categories/240/` for the header panel and the menu. The full-size finished photos are 1254×1254 PNGs.

## Files

- New: `header.css` (loaded after `motion.css`) and `src/header.js` (the Boutique panel).
- `src/shop-pages.mjs`: `shopGroups`, the group card, the Boutique panel, the Boutique intro, and the French basket line.
- `src/shop-pages-ar.mjs`: the Arabic grid, intro and basket wording.
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the header, the menu and the home grid.
- `src/catalog.js`, `src/catalog-ar.mjs`: the collections.
- `src/commerce.js`: the empty-basket lines.
- `src/build-guidance.mjs`: copies the header files and the group photos.
- `assets/categories/groupe-*.webp` and `assets/categories/240/`. The old category photos stay in the folder but nothing uses them.
- `test/catalog.test.mjs`: 11 collections, the group photos, the grid order, and a new test for the groups and the header (36 tests).
- `scripts/check-syntax.mjs` checks `src/header.js`; `scripts/verify-preview.mjs` also checks the 240px photos.
- Untouched: the locked hero markup, the leaf drawing, `src/guidance.js` and `guidance.css`.

Backups of the replaced files: `backups/before-groups-header-2026-11-21/`.

## Checks

- 36/36 tests. Lint: 24 products, 11 collections, 107 product photos. Syntax check passes. Preview check: 40 pages and 123 images answer 200.
- With the site's own fonts (DM Serif Display, Montserrat, Tajawal, Markazi Text):
  - no sideways scroll on all 88 French and Arabic pages at 360, 390 and 1440px
  - the header fits on one line with its full side margins at every width from 320 to 1920px, in both languages
- Boutique panel and menu: Escape, click outside, tabbing out, scrolling, the floating header, every tile opening its page, the phone menu and the basket.

## Undo

Copy the files in `backups/before-groups-header-2026-11-21/` back over `src/`, `test/` and `scripts/`, then build. `header.css`, `src/header.js` and the group photos are then unused and can stay.
