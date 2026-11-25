# A button under each review that opens the real message — 24 November 2026 (evening)

Built on top of the reviews update (`REVIEWS_AND_COLLIERS_PHOTO_UPDATE.md`) and the groups and header update (`GROUPS_AND_HEADER_UPDATE.md`). The three went out in one push on 24 November 2026.

## The request

The user: "when it comes to reviews let's put a button where people can actually click on it to be redirected to the picture of the actual review." Visitors can now see that each review is a real message.

## What changed

- **A button under every review** opens that client's screenshot: "Voir la capture d’écran" / "شاهدوا صورة الرسالة". It is an outlined button with a small phone icon.
  - It sits under all 15 cards on Vos mots, under the homepage's message and under the client's words on the BaZi bracelet and BaZi necklace pages, in French and Arabic.
  - The screenshot opens over the page at a readable width. A long message scrolls inside it.
  - Above the screenshot: the client's name and what the message is about, as on the card.
  - Under it: "Capture d’écran de la conversation, envoyée par Rayda. Les photos de profil sont floutées." / "لقطة شاشة من المحادثة، أرسلتها رايدا. صور الملف الشخصي مموّهة."
  - It closes with ×, Escape or a click outside, and focus goes back to the button.
  - With Ctrl, Cmd, Shift or a middle click, or without JavaScript, the button opens the picture itself.
- **The Vos mots introduction** now says each message comes with its French translation and its screenshot: "…ce que des clientes ont écrit à Rayda, en arabe, avec la traduction française et la capture d’écran de chaque message." / "…بصيغتها الأصلية، ويمكنكم مشاهدة صورة كل رسالة."

## The screenshots

- **Source:** the 15 screenshots Rayda sent on WhatsApp on 22 November, one per review. The user allowed the download: `rayda-avis-captures.zip` in Downloads (0.9 MB).
- **Blurred before publishing:**
  - every client's profile picture: next to her messages, next to her name at the top, and the small "seen" pictures
  - the first name of Fatma's daughter in the first line of her message. Rayda asked for "ر" only. The note on that screenshot says the name is blurred too.
- **Left as they are:** the clients' names at the top (the site already shows them, as Rayda asked), Rayda's replies, the shop's automatic reply and the reaction hearts.
- **Files:** `assets/avis/<review id>.webp`, at most 900px wide, 497 KB for all 15. A screenshot loads only when someone opens it.

## Files

- New: `src/review-captures.mjs` (the size of each screenshot, the button, and the French and Arabic wording) and `assets/avis/` (15 screenshots)
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the button on the homepage and on Vos mots, and the Vos mots introduction
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the button on the product pages
- `src/ux.js`: the dialog that shows the screenshot
- `polish.css`: the button and the dialog
- `src/build-guidance.mjs` copies `assets/avis/`
- `src/reviews.mjs`: the top comment, which said the screenshots never go out
- `test/catalog.test.mjs`: a new test (37 tests). It checks one button per review in the right order, each file's size and the blur notes.
- `scripts/check-syntax.mjs` checks the new module. `scripts/verify-preview.mjs` checks the 15 screenshots answer.

Backups: `backups/before-review-captures-2026-11-24/`.

## Checks

- 37/37 tests. Lint, syntax and preview checks pass: 40 pages and 138 images answer 200.
- With the site's own fonts:
  - no sideways scroll on all 88 French and Arabic pages at 360, 390 and 1440px
  - the button fits its card on one line at every width from 320 to 1440px, on the 8 pages that have it
- The dialog was tested on desktop and phone, French and Arabic: a mouse click, the keyboard (Enter to open, Escape to close), a click outside, and focus coming back.
- Every screenshot was checked after blurring: no profile picture left, the hearts untouched, and the daughter's name unreadable.

## Undo

Copy `backups/before-review-captures-2026-11-24/` back over `src/`, `test/`, `scripts/` and `polish.css`, then build. `src/review-captures.mjs` and `assets/avis/` are then unused and can stay or go.
