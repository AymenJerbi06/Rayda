# The leaf in motion, coaching with Rayda's agenda, and Formations — 24 November 2026 (night)

The user's request, in short:
- Make the site's leaf symbol animate when you switch pages, when you order and while something loads.
- Add a courses page that shows how it will look, marked as coming soon.
- Add coaching: Rayda's agenda showing when she is and isn't available. Sessions of 30 minutes or 1 hour, each with its own price. You pay online before the session is booked, and a paid slot is gone for everyone.
- Make sure the admin dashboard has all of this, so Rayda can set when she is available.
- Resend comes later. Make the logic and the appointments clear.
- Then, the same night: on phones and on computers, make booking go step by step. The visitor answers one question, presses a button, and gets the next one, instead of scrolling one long page.

**Not pushed. To be previewed locally first.**

## The leaf in motion

`src/leaf-art.mjs` takes the site's leaf drawing apart without changing it. The tests still lock the original drawing, and a test checks every shape is the same. The stem is drawn from the bottom up, and each leaf opens from the point where it meets the stem. It is animated by `leaf.css` and `src/leaf.js`.

- **Between pages:**
  - A click on any link to another page of the site starts it. A forest curtain grows from the link you pressed, and the leaf grows on it.
  - The next page opens behind the grown leaf. The leaves let go, top first, and the curtain lifts with a rounded edge.
  - If the next page is slow, the leaf keeps swaying.
  - It does not play:
    - for links that open a picture, a file or another site
    - for jumps on the same page
    - with Ctrl or Cmd clicks
    - for the admin
    - for visitors who ask for reduced motion
  - "Back" never brings a page back covered.
  - The previous soft cross-fade between pages (`@view-transition` in `polish.css`) is gone. The curtain replaces it, and the two fought each other.
- **When ordering:**
  - "Commander" on a product page goes to the checkout through the curtain, which grows from the button.
  - Each time the basket opens, a small leaf grows beside "Mon panier".
  - A confirmed order: the leaf blooms above "Votre commande est bien reçue".
- **While loading:** the leaf opens and closes, with a line saying what is coming. It shows:
  - while a review screenshot loads
  - while the coaching agenda loads
  - while a payment is confirmed
  - while the confirmation page waits for the payment
- **On Formations:** the leaf grows and sways behind the play button of the video preview.

## Coaching

**Pages:**
- `/coaching/` and `/ar/coaching/`, linked in the header, the phone menu and the footer.
- On the homepage, a new block "Un échange. Ou une vidéo." leads to the agenda and the courses.
- On Accompagnement, a line and a "Réserver une séance" button.

**Booking goes one question at a time.** Each step fills the card on its own, and its button leads to the next:

| Step | The question | The button |
|---|---|---|
| 1. Durée | "Combien de temps ?" 30 minutes or 1 hour, each with its price | Choisir le jour |
| 2. Jour | "Quel jour ?" A month calendar: free days carry a dot; full and unavailable days can't be pressed | Voir les heures libres |
| 3. Heure | "À quelle heure ?" Free times are buttons; taken ones say "Réservé". Tunis time | Continuer |
| 4. Coordonnées | "Vos coordonnées" First name, phone, e-mail, an optional note | Vérifier ma réservation |
| 5. Paiement | "Vérifiez et réservez" Everything chosen, in one summary | Payer et réserver |

- **Where you are:** "Étape 2 sur 5 · Jour" above a row of five dots. A finished step's dot turns into a small leaf, and the line between the dots grows like the stem.
- **What you chose so far** stays above the question as small labels ("1 heure", "Jeudi 26 novembre", "10:00 – 11:00"). Pressing one goes straight back to that step to change it.
- **Nothing is skipped by accident:** the day and time buttons stay pale until a day or a time is chosen, and step 4 points at the field that is missing or wrong.
- **"Retour"** goes back one step, and so does the phone's or browser's back button.
- **No hunting for the next button:** each new step slides in, and the page brings its first line to the top of the screen.
  - **On a computer**, the question sits on one side and the answer on the other, so each step fits in one screen, laptops included (checked down to a 1366×640 browser window).
  - **On a phone**, the step's two buttons (a back arrow and the next button) stay pinned at the bottom of the screen, like the "Commander" bar on the product pages. The calendar or the form can run a little past the screen; the button never does. The green "back to top" square steps aside while the booking is on screen.
- In Arabic, everything runs right to left: the dots, the slide, the arrows and the two sides.

**Pay first:**
- The slot is held for the client for 15 minutes while they pay.
- It is booked only once the payment is confirmed.
- After that, it is taken for everyone, and stays taken after a refresh.
- A hold that is not paid lapses on its own.
- If a client comes back to the agenda while a slot is still held for them, they can go back to the payment or let the slot go. This also works with the browser's back button from the payment page.
- If someone else takes the time a visitor is about to book, the visitor is brought back to step 3 at once, with "Ce créneau vient d'être pris. Choisissez-en un autre."

**The payment step (`/coaching/paiement/`) is a stand-in until Konnect is connected:**
- It shows the session and the time left, and offers "Simuler un paiement accepté" or "Annuler et libérer le créneau".
- It never asks for card details.
- It says plainly that no payment is taken.

**The confirmation (`/coaching/confirmation/`):** the leaf blooms, with the session's details, "Ajouter à mon agenda" (a calendar file) and "Nous vous contactons avant la séance pour vous en donner les détails."

**What is not real yet:**
- No prices: Rayda has not sent them. Both sessions show "Tarif à confirmer" until she sets them in the admin.
- No real hours: the hours shown are examples (see `COACHING_LOGIC.md`).
- While `coaching.mode` is `"preview"` in `src/site-config.js`, the page says the hours are examples and no payment is taken.
- **On the live site, this demo stays in each visitor's browser.** Real bookings that block a slot for everyone need the server described in `COACHING_LOGIC.md`.

## Formations

`/formations/` and `/ar/formations/`, marked "Bientôt disponible":
- A preview of the future course space: the video player, with the leaf, a play button and "Bientôt", beside the chapters of the first course.
- Four courses Rayda could start with: Atteindre vos objectifs, Votre carte BaZi (les bases), L'énergie de l'abondance and Réussir ses études. The page says the titles may change.
- How it will work, in three steps.
- "Me prévenir sur WhatsApp": a message ready to send to Rayda.
- The line "elles ne garantissent aucun résultat, financier ou autre".

## Admin (still a demo, in the browser)

**New page: Coaching & agenda**
- The week's agenda: her hours, paid sessions, sessions being paid, and closed days.
- Bookings: client, contact, note, price and status. Any booking can be cancelled, which frees its slot on the site.
- Her weekly hours, as ranges per day, each day on or off.
- Closed days or special hours.
- The two sessions: price, and whether each is offered.
- The booking rules.
- The e-mails Resend will send.

**New page: Formations.** Add a course in French and Arabic, mark it Bientôt or Publiée, and set a price and, later, a video link. The site's Formations page follows it.

**The dashboard** now lists the next paid sessions.

Everything Rayda saves there, the coaching page uses at once.

## Files

**New:**
- `leaf.css`, `src/leaf.js`, `src/leaf-art.mjs`
- `coaching.css`
- `src/coaching-core.js` (the rules), `src/coaching-store.js` (where the agenda lives), `src/coaching.js` (the pages), `src/coaching-pages.mjs` (their words, in French and Arabic)
- `src/courses.mjs`, `src/admin-coaching.js`
- `COACHING_LOGIC.md`

**Changed:**
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the curtain, the nav, the footer, the homepage block, the Accompagnement line
- `src/build-guidance.mjs`: the new pages and files
- `src/admin-pages.mjs`, `src/admin.css`
- `src/commerce.js`: Commander through the curtain, the bloom on a confirmed order
- `src/ux.js`, `polish.css`: the loader in the screenshot window; the cross-fade removed
- `src/site-config.js`: `coaching: { mode: "preview" }`
- `test/catalog.test.mjs`, `scripts/check-syntax.mjs`, `scripts/verify-preview.mjs`

Backups: `backups/before-coaching-2026-11-24/`.

## Checks

- 40/40 tests. Three are new:
  - the booking rules (holds, payment, lapses, conflicts, pauses, closed days)
  - the pages in both languages
  - the leaf (same shapes as the locked drawing, the curtain on every page, reduced motion)
- Lint, syntax and preview checks pass: 48 pages and 138 images answer 200, and the five modules load as JavaScript.
- With the site's own fonts:
  - no sideways scroll on all 96 French and Arabic pages at 360, 390 and 1440px
  - the coaching and Formations pages also checked at 320px
  - the header fits on one line at every width from 1025 to 1920px with the two new links
- The step-by-step booking, with the site's fonts:
  - every step looked at on phones (iPhone size with the browser's bars, 360 and 320px), a tablet (768px) and computers (1366 to 1920px), in French and Arabic
  - each step starts at the top of the screen; on computers, each one fits without scrolling
  - tapped through on an emulated iPhone: the pinned buttons stay in reach and keep their colours after each tap
  - the phone number and e-mail keep their order in the Arabic summary
  - Back from the payment page, whether the browser reloads the agenda or restores it as it was: the button works again and the held slot is offered
- Booking tried end to end through the five steps, in French and in Arabic, as two visitors in two tabs:
  - Both aimed for the same hour. The first to press "Payer et réserver" held it, and the second was sent back to the times at once, with the message.
  - "Paid" led to the confirmation page.
  - After a refresh, the hour stayed taken.
  - The browser's back button went back a step, and forward again.
  - Back from the payment page, the visitor was offered to resume the payment or let the slot go; letting it go freed it.
  - The admin listed the bookings. Cancelling one there freed its slot on the site.
  - Prices, a closed day and a day switched off in the admin all showed on the site.

## Undo

Copy `backups/before-coaching-2026-11-24/` back over `src/`, `test/`, `scripts/` and the CSS files, then build. The new files are then unused.
