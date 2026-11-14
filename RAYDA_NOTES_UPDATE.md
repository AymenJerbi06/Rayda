# Rayda's notes — 13 November 2026

## What changed

- **Wallet name in Arabic:** "حافظة المال", without "محفظة" in front.
- **Her name in Arabic:** "رايدا", ending in alif, everywhere we wrote it. Client messages are quoted word for word, so one client's own "رايدة" stays as she typed it.
- **Wallet price:** 120 TND.
- **Wallet colour:** the colour buttons are gone. The page says the colour is chosen from the client's birth date. The photos still show the four colours.
- **Checkout questions,** shown only when the order holds a personalised piece, and required:
  - BaZi bracelet, BaZi necklace and the wallet: the birth date.
  - The wallet: the client's goals as well.
  - A line explains why (the colour that matches their financial energy for the wallet; their personality and the energy of their character for BaZi pieces) and promises that the answers stay confidential and anonymous.
- **"Rayda calls you" is gone.** The site now says "Nous vous contactons" / "يقع الاتصال بكم" on product pages, the checkout and the Accompagnement page.
- **No promise of money:** the wallet's line "Aucune promesse de résultat financier" / "لا وعد بنتيجة مالية" now reads "Il accompagne votre intention et vos efforts : ce n’est pas une garantie de recevoir de l’argent" / "ترافق نيّتكم وسعيكم، وليست ضمانًا للحصول على المال".
- **Décor Abondance photos:** the four AI photos showed a thick block. They were remade in ChatGPT as the thin, flat mirror piece it really is (`decor-abondance-ai-main`, `-bureau`, `-etagere`, `-couronne`).

## Not done

- "bracelet bazi wl m7aba": unclear, left as it is until Rayda says what she means.

## Files

- `src/catalog.js`, `src/catalog-ar.mjs`: the wallet (name, price, no colours, new lines) and the decor photos.
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the checkout questions and the contact wording.
- `src/product-pitch.mjs`, `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the contact wording.
- `src/commerce.js`: shows and requires the questions only for personalised pieces, and keeps the answers with the order.
- Her name: also `src/contact-ar.js`, `src/build-guidance.mjs`, `src/reviews-ar.mjs`.
- `test/catalog.test.mjs`: 26 tests, one new.

## Checks

- All 26 tests pass.
- Checkout tried in French and Arabic on a phone: no questions for a ready-made piece; the birth date for a BaZi piece; the birth date and goals with the wallet; the order is refused until they are filled in.

## Still a demo

The checkout stores orders in the visitor's browser only. The birth date and goals do not reach Rayda until a real order system is connected.

## How to undo

Copy the files in `backups/before-rayda-notes-2026-11-13/` back over the project's and run `npm run build`.
