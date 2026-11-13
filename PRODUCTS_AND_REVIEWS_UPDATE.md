# Rayda's product texts, exact reviews, 7 TND delivery and phone confirmation — 13 November 2026

Based on Rayda's WhatsApp messages (product texts sent on 17 September and 8 October, her requests of 10 October) and the review screenshots in `organized Products/_Avis Clients (Reviews)`.

## What stayed exactly the same

Fonts, colours, page order, sections and the locked pieces: the French hero, the `leaf` SVG, `src/guidance.js` and every existing rule in `guidance.css` (new rules are only appended at the end). The category illustrations on the homepage and Boutique are unchanged for now. Every test still passes, plus three new ones (16 in total).

## 1. Product descriptions: Rayda's own words

Rayda asked to keep her full texts so customers understand each piece without having to ask her.

- **Arabic pages** show her text word for word. Only the emojis were removed, the spacing around commas was tidied, and straight quotes became « ».
- **French pages** show a faithful French translation of the same text.
- **Beside the price**, the product description is now her opening lines (the catalog `description` in `src/catalog.js` and `src/catalog-ar.mjs`), followed by a "Lire la description complète" link.
- **Under the photos and buy box**, a new section, "La description de Rayda" (Arabic: "وصف رايدة"), carries the rest of her text: her headline, her paragraphs, her lists of benefits and her numbered places to put the piece. It uses the site's own grid, serif headings, hairlines and green numbers. On a computer the headline stays in view while you read; on tablets and phones it stacks.
- All the texts live in one new file, `src/product-texts.mjs`.
- **Wallet details:** "cuir naturel de très bonne qualité", 19.5 × 11 cm, and delivered with charged cards and an exercise, all in her words.

Products and their source:

- **Bracelet BaZi and Collier BaZi:** her BaZi accessories text (the same text for both).
- **Bracelet Énergie Amour:** her one-line description.
- **Portefeuille Hafidha El Mel:** her "حافظة المال" text.
- **Carte Million Dollar, Décor Abondance, Clé de Vie, Fleur de Vie:** her full texts.
- **Car pendant Fleur de Vie:** her full text.
- **Car pendant Clé de Vie:** she only wrote that the same pendant exists with the Key of Life, at the same size and price. It uses the Fleur de Vie pendant text with the symbol changed. The first benefit borrows her own description of the Ankh ("تصميم هندسي فريد"). **Ask Rayda to confirm this one.**
- **Porte-clés Pierre and Porte-clés Arbre de Vie:** she sent no text, so these are unchanged.

## 2. Reviews: the clients' exact words

- **Vos Mots** now shows five messages, word for word in Arabic, as the clients wrote them. Only the emojis are left out.
- **French pages** show the Arabic first. Under each message, "Lire la traduction française" opens the French translation, which is labelled "Traduit de l'arabe".
- **Arabic pages** show the Arabic only.
- **Homepage teaser:** works the same way, with the "calme" message.
- **The five messages:** Avis 2 (calm), Avis 4 (story reply), Avis 6 (necklace for her daughter), Avis 5 (BaZi bracelet, confidence) and Avis 3 (three years later).
- **Left out:** Avis 1 is a back-and-forth chat rather than one message, so it isn't quoted. The separate "good morning" bubble before Avis 5 is also left out.
- **Fonts and layout:** the Arabic serif (Markazi Text) now also loads on the French homepage and Vos Mots. With five cards, the desktop grid shows 3 cards on the first row and 2 wider ones on the second.
- **Text updated to match:** the Vos Mots intro and the FAQ answer about testimonials.

## 3. Delivery: 7 TND

- **The fee is set in one place:** `DELIVERY_FEE` in `src/commerce-core.js`.
- **Product pages:** "Livraison en Tunisie : 7 TND".
- **Bag drawer:** "Hors livraison (7 TND en Tunisie)".
- **Checkout:** shows Sous-total, Livraison en Tunisie 7 TND, and Total.
- **Also updated:** the FAQ and the footer on every page.
- **Recorded orders:** the demo order record adds the same 7 TND, and the admin demo's default fee is now 7.

## 4. Checkout: the phone number is asked twice

- **Two required fields:** "Numéro de téléphone" and "Confirmez votre numéro" (Arabic: "تأكيد رقم الهاتف").
- **The order isn't sent** if the number has fewer than 8 digits or if the two numbers don't match. Matching ignores spaces and a +216 prefix.
- **The note under the form** explains why: Rayda calls or writes to confirm.
- **Custom pieces:** when the selection contains a BaZi bracelet, BaZi necklace or Hafidha El Mel wallet, an extra line says that Rayda will also ask for the birth details her BaZi reading needs.

## Files changed

- **Styles:** `guidance.css` and `commerce.css`, appended only.
- **Sources in `src/`:** `catalog.js`, `catalog-ar.mjs`, `commerce-core.js`, `commerce.js`, `admin.js`, `site-config.js`, `guidance-pages.mjs`, `guidance-pages-ar.mjs`, `shop-pages.mjs`, `shop-pages-ar.mjs`, `reviews.mjs` and `reviews-ar.mjs`.
- **New file:** `src/product-texts.mjs`.
- **Tests:** `test/catalog.test.mjs`.
- **Rebuilt output:** `index.html` and the rebuilt `dist/`, which is 52 pages plus the copied CSS and JS.

## How to undo

Every original file changed here is saved, byte for byte, in `backups/products-reviews-before-2026-11-13/` at the same relative paths.

1. Copy those files back over the project.
2. Delete `src/product-texts.mjs`.
3. Run `npm run build`.

## Still to confirm with Rayda

- **Car pendant with the Clé de Vie:** the text adapted from the Fleur de Vie pendant.
- **Prices:** Hafidha El Mel wallet and Porte-clés Pierre, which were never given.
- **Porte-clés Arbre de Vie:** she said she no longer has it, but it is still listed.
- **The new key pendants** she photographed on 12 November: name and price.
- **Her new portrait.**
- **Payment:** to discuss later.
