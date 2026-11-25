# The homepage in five chapters — 24 November 2026 (night)

The user's request, in short: keep the first section (the hero) as it is. Rebuild the rest of the homepage so a visitor is never lost: each section talks about one thing, the products come first, and scrolling never leaves them guessing what comes next. Make it more interactive and friendlier.

**Not pushed. To be previewed locally first.**

## What was wrong

After the hero, nine sections followed one another:
- two of them both picked products (the three paths, then the eight groups)
- three were about Rayda (her approach, the two pillars, who she is)
- the benefits and the reviews were apart
- most titles were poetic ("Une pièce. Votre histoire."), so a section said what it was about only once you had read it

## The new homepage

The hero is unchanged, and still locked by the tests. Under it come five chapters. Each opens with a plain label that matches its chip in the bar.

| Chapter | Label | What it holds |
|---|---|---|
| 1 | LA BOUTIQUE · Les créations de Rayda. | Two tabs. *Par famille* shows the eight groups with their photos and opens first. *Par besoin* shows the three paths (Excellence scolaire, Abondance, Amour). A "Toute la boutique" button sits beside them. |
| 2 | COACHING & FORMATIONS · Avec Rayda, en séance ou en vidéo. | The agenda and the courses, the two cards of the coaching round. |
| 3 | RAYDA ET SA MÉTHODE · Qui est Rayda ? | Her own words (unchanged), then her method in one place: "Composer pour vous, pas pour tout le monde.", the paragraph, the two pillars, and "Découvrir son parcours". |
| 4 | AVIS DES CLIENTES · Vos mots, sa plus belle récompense. | What clients notice (the four lines), then all fifteen messages one at a time. Each has its translation and screenshot button. The no-guarantee line and "Lire tous les témoignages" follow. |
| 5 | COMMANDER · Commander, simplement. | Three steps: you order without paying online (with your birth date for a piece composed for you); we contact you to confirm; delivery in Tunisia for 7 TND, paid on delivery. Then "Voir la boutique" and "Échanger sur WhatsApp". |

All the texts come from the site, the product pages and Rayda. The only new lines are the chapter labels, the introductions and the step wording, in French and in Arabic.

## What moves

- **The bar of chapters:** "Sur cette page" with five chips: Boutique, Coaching, Rayda, Avis, Commander.
  - It sits under the hero, then sticks to the top while the chapters scroll by.
  - The chapter on screen lights up in forest green, and a small leaf grows in its chip, the same leaf as the booking steps.
  - A chip brings its chapter to the top of the screen.
  - When the site's header slides back in (scrolling up), the bar steps down under it.
  - On phones, the chips scroll sideways. The lit chip comes into view, and the strip fades at the edge where more chips are waiting.
- **The shop's tabs:** a forest pill slides between *Par famille* and *Par besoin*, and the panel rises in.
  - Arrow keys work.
  - The old addresses still open the right tab: `/#creations` the groups, `/#chemins` the paths.
- **The messages:** one at a time, with arrows (they loop), a swipe on phones, and "3 / 15".
  - The frame takes the height of the message on show, and grows when its translation opens.
- **Without JavaScript,** the page reads top to bottom, with both ways into the shop shown one under the other.
- **With reduced motion,** nothing slides, and the leaf appears finished.

## Files

**New:**
- `src/home-chapters.mjs`: the chapters' words in French and Arabic, and their markup
- `home.css`
- `src/home.js`: the bar, the tabs and the messages

`home.css` and `home.js` are loaded on the two home pages only.

**Changed:**
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the homepage after the hero
- `src/shop-pages.mjs`: `pathList`, the three doors on their own. The Boutique page shows them as before.
- `src/shop-pages-ar.mjs`: `pathItemsAr`
- `src/coaching-pages.mjs`: the coaching block is now the "Coaching & formations" chapter
- `src/build-guidance.mjs`: copies `home.css` and `home.js`
- `scripts/check-syntax.mjs`, `scripts/verify-preview.mjs`
- `test/catalog.test.mjs`:
  - The homepage test now checks the five chapters in both languages, the chips, both ways into the shop, the fifteen messages and their buttons, and Rayda's kept words.
  - Four older tests follow the new structure without losing their point: the screenshot buttons (fifteen on the home now), her name in Arabic (a client's quote shows in « »), her who-is heading, and the paths (still first on the Boutique; on the home, the shop chapter's second way in).

Backups: `backups/before-home-chapters-2026-11-24/`.

## Checks

- **Tests and checks:**
  - 40/40 tests.
  - Lint, syntax and preview checks pass: 51 pages and 138 images answer 200.
  - No sideways scroll on all 96 French and Arabic pages at 360, 390 and 1440px. Nothing cut or overflowing on the two home pages from 320 to 1280px.
- **The bar, tried on a laptop and an emulated iPhone, French and Arabic:**
  - It sticks, lights the right chapter while scrolling, and steps under the header when it slides in.
  - Its chips land each chapter just under it.
- **The shop and the messages:**
  - Both tabs and the arrow keys work.
  - `/#chemins` opens *Par besoin*.
  - The arrows loop, a swipe moves on, and the count follows.

## Undo

Copy `backups/before-home-chapters-2026-11-24/` back over `src/`, `scripts/` and `test/`, then build. `home.css`, `src/home.js` and `src/home-chapters.mjs` are then unused.
