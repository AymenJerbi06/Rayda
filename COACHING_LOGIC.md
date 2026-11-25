# How coaching bookings work, and what connects later

The rules are in `src/coaching-core.js`, plain functions with no storage and no screen. The coaching pages, the admin and the tests all use them, and a server can run the same file.

## The rules

**What Rayda sets in the admin (Coaching & agenda):**
- her weekly hours, as one or more time ranges per day
- days she is closed, or open at other hours (these replace her usual week on that date)
- the two sessions, 30 minutes and 1 hour, each with its own price, and each can be switched off
- the booking rules:
  - at least 24 hours' notice
  - up to 42 days ahead
  - an optional pause between two sessions
  - a slot every 30 minutes
  - a slot held 15 minutes during payment

**Until she saves her own hours,** the site uses example hours, and the page says they are examples:
- Monday to Friday, 10:00–12:30 and 15:00–18:00 (Wednesday mornings only)
- Saturday, 10:00–13:00
- Sunday closed

**A slot is free** when it fits inside her hours for that date and touches no session that is paid or being paid, pause included.

**Payment comes first:**
1. The client picks a duration, a day and a time, gives a name, phone and e-mail, and presses "Payer et réserver". This creates a *hold* (status `pending`) that lasts 15 minutes. During the hold, the slot shows as taken to everyone.
2. The payment is confirmed. The hold becomes a booking (status `confirmed`) and the slot is gone for good. A refresh changes nothing.
3. If nobody pays in time, the hold simply lapses and the slot is free again. Nothing needs to clean it up.
4. If the client cancels the payment, the hold is cancelled and the slot is free again.

**Two edge cases:**
- A payment that arrives after its hold lapsed still books the slot if nobody took it meanwhile. Otherwise the answer is `conflict`, and the payment must be refunded.
- Payment providers can report a payment twice. A second report changes nothing.

**Only Rayda can cancel a paid session** (admin, Réservations). Its slot comes back on the site.

**Times are Tunis time.** Tunisia has stayed on UTC+1 all year since 2009, so the offset is fixed, and every visitor sees Rayda's own hours.

## The pages

| Page | What it does |
|---|---|
| `/coaching/` (and `/ar/coaching/`) | The agenda, one question at a time: the duration, the day (a month calendar: free, full, unavailable), the time (free or "Réservé"), the client's details, then a summary with "Payer et réserver". It redraws when another tab books, and every 30 seconds; if the chosen time is taken meanwhile, the visitor is brought back to the times with a message. |
| `/coaching/paiement/?r=ID` | **Today:** a demo step standing in for the payment page. It shows the summary, the time left on the hold, "Simuler un paiement accepté" and "Annuler et libérer le créneau". It asks for no card details. |
| `/coaching/confirmation/?r=ID` | The booking once it is paid, with a link that adds it to the client's calendar (.ics). While the payment is not yet confirmed, it waits (up to 40 seconds) and checks again. |

## Where the agenda lives today

The admin demo stores everything in the browser (`localStorage`), like orders and stock already were:
- `admin_coaching_settings`
- `admin_coaching_bookings`
- `admin_outbox`, the e-mails Resend will send
- `admin_courses`

`src/coaching-store.js` is the only file that reads or writes them. Every method returns a promise, the same shape as the server API that replaces it.

**What this means for testing:** "no one else can book that slot" is true inside one browser: another tab, the admin, a refresh. For two different people on two devices, the agenda has to live on a server. That is the next step.

## Making it real for everyone

You need four things: a server with a database, Konnect for payments, Resend for e-mails, and a real admin login.

The admin demo was planned for Supabase. Base44 is also being weighed.

**Suggested routes:**
- `GET /api/coaching/availability?minutes=60`: days and slots, computed with `coaching-core.js` on the server.
- `POST /api/coaching/holds` with `{ minutes, date, start, client, lang }`:
  - In one transaction, it checks the slot again, inserts the `pending` booking, and creates the Konnect payment for the session's price, with the booking id as the order reference and `/coaching/confirmation/?r=ID` as the return page.
  - It returns `{ booking, payUrl }`, and the browser goes to `payUrl` instead of the demo step (`paymentUrl()` in `coaching-store.js`).
  - The transaction is what stops two people on two devices from holding the same slot at the same moment. Use a row lock on the day's bookings, or mark lapsed holds as expired inside the same transaction.
- `POST /api/payments/konnect`, the webhook:
  - It checks the payment with Konnect, then runs `confirmBooking`.
  - On `conflict`, it flags the booking for a refund.
  - It sends the e-mails through Resend.
- `GET /api/coaching/bookings/:id`: the status the confirmation page checks.
- Admin only, behind a real login:
  - read and save the settings
  - list the bookings
  - cancel a booking (any refund is made in Konnect)

**Before relying on the Konnect steps,** check them against Konnect's documentation when connecting. The general pattern is: create a payment, send the client to its link, receive the webhook, then verify.

**The e-mails** are already listed in the admin under "E-mails prévus (Resend)":
- To Rayda, for each paid session: "Nouvelle séance réservée et payée", with the date, time, duration, client, phone, e-mail, note and amount.
- To the client: "Votre séance avec Rayda est réservée", with the date and time (Tunis), the duration and the calendar file.
- To the client, when Rayda cancels: "Votre séance avec Rayda est annulée".

**Going live:** set `coaching: { mode: "live" }` in `src/site-config.js`. The "Aperçu" lines then disappear, as long as Rayda has saved her own hours.

## Formations

`/formations/` shows the courses as coming soon. The list comes from `src/courses.mjs`, and from the admin's Formations page once it has been used.

For the real courses, three things are still to choose: the video hosting (Bunny Stream is in the running-cost notes), payment through Konnect, and a way to give access to the people who paid.
