# Rayda's new reviews and a worn necklace for "Colliers" — 24 November 2026

Built on top of the groups and header update (`GROUPS_AND_HEADER_UPDATE.md`). The two went out in one push with the review screenshots (`REVIEW_CAPTURES_UPDATE.md`) on 24 November 2026.

## What Rayda asked for (WhatsApp, 21–23 November)

- On 21 November, "الاراء متاع الناس اللي تفاهمنا نبدلوهم": change the clients' reviews, as agreed.
- On 22 November she sent the new reviews: 15 screenshots of client messages, each followed by the client's name.
  - "تو نبعثلك الاراء المكتوبة مع الاسم و اللقب و إلا الاسم بحسب اللي نلقاه": with first and last name, or the first name only.
  - "كان لقيت الأغلبية اسماء اكتب الاسم كهو": write the names as they are.
  - About one client's daughter: "ما تكتبش اسم البنية ايمن خلي كان «ر»". Don't write the girl's name, only "ر".
- On 21 November (late) she sent a screenshot of the live "Colliers" card: "هذه التصويرة بدلها بالجديدة اللي عملتها و إلا خليها تلبس هذه خاطر التصويرة هذه بعيدة عن الواقع". The photo is far from reality, so replace it, or have the model wear her necklace with the pyrite heart. The user chose a ChatGPT photo of the model wearing that necklace.

## What changed

- **Reviews** (`src/reviews.mjs`, `src/reviews-ar.mjs`): the 15 messages replace the earlier five. They are in the same cards and the same style as before:
  - her clients' Arabic word for word (only emojis left out)
  - on French pages, the French translation behind "Lire la traduction française", labelled "Traduit de l’arabe"
  - a short theme above each message
  - in the caption, the client's name as Rayda wrote it, then what the message is about
  - The daughter's name is "ر." in the Arabic and "R." in the French. No other part of the messages was changed. The clients' own spellings are kept, such as "حاحات", "طبييعية" and "الللي".
  - Only the clients' own messages are quoted. Rayda's replies and the shop's automatic Messenger reply in the screenshots are left out.
  - The "خدمات ما بعد البيع" (after-sales service) that Rayda wrote above one name became that card's caption: "Échange avec le service après-vente".
  - The homepage shows the first one (سهام شيخاوي, "Le calme intérieur"). The others follow in the order Rayda sent them.
  - Under the reviews, one plain line: "Chaque message raconte l’expérience d’une cliente. Les pièces accompagnent une intention et des efforts : elles ne garantissent aucun résultat, financier ou autre." / "كل رسالة تحكي تجربة زبونة. القطع ترافق النيّة والسعي، ولا تضمن أي نتيجة، مالية أو غيرها." Several messages mention money or work, and the site never promises results.
  - Product pages: the BaZi bracelet now quotes ناديا جابال and the BaZi necklace quotes إشراف ثابت, with their names (`src/product-pitch.mjs`).
- **Colliers card**: a ChatGPT photo of a woman wearing Rayda's tourmaline necklace with the pyrite heart (her photo `collier-bazi-07.jpg`), in the style of the worn BaZi necklace photo. It replaces the photo of all the necklaces together on the home page, the Boutique, the header panel and the menu (`assets/categories/groupe-colliers.webp` and `240/`).
  - The line under the grid is now "Les photos sont des mises en scène créées à partir des photos de Rayda." / "الصور مشاهد مُعَدّة انطلاقًا من صور رايدا.", since that card no longer shows every necklace.
  - Made in the user's ChatGPT, chat "Create Necklace Photo" (24 November). The photo was captured from the page at 1254 × 1254 (four captures, stitched), so nothing was downloaded to the computer.
  - Checked against her photo: the small faceted beads in pink, black, olive green, grey and pale pink, the wire-wrapped pyrite heart and the gold extender chain.
  - The capture is filed as `om Adem/ChatGPT photos (full size)/collier-pyrite-porte.png`. The necklaces-together photo stays as `groupe-colliers.png` (and in `backups/before-reviews-2026-11-24/`).
- **Styles** (appended to `polish.css`): the client's name on French pages is in Markazi Text, as are the Arabic quotes. The new note under the reviews is small and centred.

## Files

- `src/reviews.mjs`, `src/reviews-ar.mjs`, `src/product-pitch.mjs`
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the names in the captions, the note and the line under the grid
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the names on the product-page excerpts
- `polish.css`
- `assets/categories/groupe-colliers.webp`, `assets/categories/240/groupe-colliers.webp`
- `test/catalog.test.mjs`: 15 reviews with names, no "ريما" anywhere, the note, and the new captions (36 tests)

Backups: `backups/before-reviews-2026-11-24/`.

## Checks

- 36/36 tests. Lint (24 products, 11 collections, 107 product photos), syntax and preview checks pass.
- With the site's own fonts, there is no sideways scroll on Vos mots (French and Arabic, desktop and phone), the homepage, or the BaZi bracelet and necklace pages.
- Every message was read again from Rayda's screenshots at full size, line by line, including the letters a client repeated.

## Undo

Copy `backups/before-reviews-2026-11-24/` back (`src/`, `test/`, `polish.css`, and the two webp files to `assets/categories/groupe-colliers.webp` and `assets/categories/240/groupe-colliers.webp`), then build.
