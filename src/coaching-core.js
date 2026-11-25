// Coaching sessions with Rayda: the booking rules, as plain functions with no storage and no screen. The coaching
// pages, the admin and the tests all use them, and a server can run the very same code later
// (COACHING_LOGIC.md explains the whole flow).
//
// The rules, in short:
// - Rayda sets her weekly hours, the days she is closed (or open at other hours), the two sessions (30 minutes and
//   1 hour, each with its own price) and a few rules (notice, how far ahead, a pause between sessions).
// - A slot is free when it fits inside her hours and touches no session that is paid or being paid.
// - Booking is pay first: choosing a slot only holds it for the few minutes the payment takes (holdMinutes).
//   It becomes a booking only once the payment is confirmed. An unpaid hold lapses on its own and the slot is free again.
// - A paid slot is gone for everyone, and stays gone after a refresh, until Rayda cancels it in the admin.
//
// Times are Tunis wall-clock times ("2026-12-02", "10:30"). Tunisia has kept UTC+1 all year since 2009 (no summer
// time), so a fixed offset is exact and every visitor sees Rayda's own hours, wherever they are.
export const TUNIS_OFFSET_MINUTES = 60;
const MINUTE = 60000;
const DAY = 1440 * MINUTE;

export const DEFAULT_COACHING = {
  sessions: [
    { minutes: 30, price: null, enabled: true },
    { minutes: 60, price: null, enabled: true }
  ],
  // Weekly hours by JavaScript day number (0 Sunday … 6 Saturday), as [from, to]. These are an example until Rayda
  // saves her own hours in the admin (`example` then turns false).
  weekly: {
    0: [],
    1: [['10:00', '12:30'], ['15:00', '18:00']],
    2: [['10:00', '12:30'], ['15:00', '18:00']],
    3: [['10:00', '12:30']],
    4: [['10:00', '12:30'], ['15:00', '18:00']],
    5: [['10:00', '12:00'], ['15:00', '18:00']],
    6: [['10:00', '13:00']]
  },
  exceptions: [],          // { date: '2026-12-25', closed: true, note } or { date, ranges: [['14:00', '17:00']], note }
  stepMinutes: 30,         // sessions start on the hour and the half hour
  bufferMinutes: 0,        // a pause Rayda keeps between two sessions
  minNoticeHours: 24,      // no session is booked less than a day ahead
  horizonDays: 42,         // and none more than six weeks ahead
  holdMinutes: 15,         // how long a slot is kept for someone who is paying
  example: true
};

export const toMinutes = time => { const [h, m] = String(time).split(':').map(Number); return h * 60 + (m || 0); };
export const fromMinutes = minutes => String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
const pad = n => String(n).padStart(2, '0');

// "Now" in Tunis: the date and the minute of the day.
export function tunisNow(nowMs) {
  const d = new Date(nowMs + TUNIS_OFFSET_MINUTES * MINUTE);
  return { date: d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}
export function addDays(date, days) {
  const [y, m, d] = date.split('-').map(Number);
  const next = new Date(Date.UTC(y, m - 1, d) + days * DAY);
  return next.getUTCFullYear() + '-' + pad(next.getUTCMonth() + 1) + '-' + pad(next.getUTCDate());
}
export function weekday(date) { const [y, m, d] = date.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); }
// The real instant of a Tunis date and time, in milliseconds.
export function instant(date, minutes) { const [y, m, d] = date.split('-').map(Number); return Date.UTC(y, m - 1, d) + (minutes - TUNIS_OFFSET_MINUTES) * MINUTE; }
export const isoTunis = (date, minutes) => date + 'T' + fromMinutes(minutes) + ':00+01:00';

function settingsWithDefaults(settings) { return Object.assign({}, DEFAULT_COACHING, settings || {}); }

// Rayda's hours on one date, in minutes: a date she set apart wins over her usual week.
export function rangesFor(settings, date) {
  const s = settingsWithDefaults(settings);
  const exception = (s.exceptions || []).find(item => item.date === date);
  const ranges = exception ? (exception.closed ? [] : exception.ranges || []) : (s.weekly[weekday(date)] || []);
  return ranges.map(([from, to]) => [toMinutes(from), toMinutes(to)]).filter(([a, b]) => b > a).sort((x, y) => x[0] - y[0]);
}

export function sessionFor(settings, minutes) {
  return settingsWithDefaults(settings).sessions.find(session => session.minutes === Number(minutes)) || null;
}

// Where a booking stands now. A hold that was not paid in time lapses on its own.
export function bookingState(booking, nowMs) {
  if (booking.status === 'confirmed') return 'confirmed';
  if (booking.status === 'cancelled') return 'cancelled';
  if (booking.status === 'pending') return booking.holdUntil > nowMs ? 'pending' : 'expired';
  return 'cancelled';
}
const takesTime = (booking, nowMs) => { const state = bookingState(booking, nowMs); return state === 'confirmed' || state === 'pending'; };

// The time each paid or being-paid session keeps out of the agenda, pause included.
function busyTimes(bookings, nowMs, bufferMinutes, exceptId) {
  return (bookings || []).filter(b => b.id !== exceptId && takesTime(b, nowMs))
    .map(b => [b.startMs - bufferMinutes * MINUTE, b.endMs + bufferMinutes * MINUTE]);
}

// Every slot of a session length on one date, free or taken. Slots too soon (or already past) are left out.
export function daySlots(settings, bookings, date, minutes, nowMs) {
  const s = settingsWithDefaults(settings);
  const length = Number(minutes);
  const earliest = nowMs + s.minNoticeHours * 60 * MINUTE;
  const busy = busyTimes(bookings, nowMs, s.bufferMinutes);
  const slots = [];
  for (const [from, to] of rangesFor(s, date)) {
    for (let start = from; start + length <= to; start += s.stepMinutes) {
      const startMs = instant(date, start), endMs = startMs + length * MINUTE;
      if (startMs < earliest) continue;
      const taken = busy.some(([a, b]) => startMs < b && endMs > a);
      slots.push({ date, start: fromMinutes(start), end: fromMinutes(start + length), startMs, endMs, status: taken ? 'taken' : 'free' });
    }
  }
  return slots;
}

// The days a visitor can look at, from today to the end of the booking horizon.
// open: at least one free slot · full: every slot is taken · soon: Rayda works that day but it is too close to book
// · closed: no hours that day (or none long enough for this session).
export function daysOverview(settings, bookings, minutes, nowMs) {
  const s = settingsWithDefaults(settings);
  const today = tunisNow(nowMs).date;
  const days = [];
  for (let i = 0; i < s.horizonDays; i++) {
    const date = addDays(today, i);
    const slots = daySlots(s, bookings, date, minutes, nowMs);
    const free = slots.filter(slot => slot.status === 'free').length;
    const works = rangesFor(s, date).some(([a, b]) => b - a >= Number(minutes));
    const status = free ? 'open' : slots.length ? 'full' : works ? 'soon' : 'closed';
    days.push({ date, weekday: weekday(date), status, free, taken: slots.length - free });
  }
  return days;
}

// Can this exact slot be taken now? The answer a server gives right before it holds the slot.
export function checkSlot(settings, bookings, request, nowMs) {
  const s = settingsWithDefaults(settings);
  const session = sessionFor(s, request.minutes);
  if (!session || session.enabled === false) return { ok: false, reason: 'session' };
  const today = tunisNow(nowMs).date;
  if (request.date < today || request.date > addDays(today, s.horizonDays - 1)) return { ok: false, reason: 'horizon' };
  const slot = daySlots(s, bookings, request.date, session.minutes, nowMs).find(item => item.start === request.start);
  if (!slot) return { ok: false, reason: 'closed' };
  if (slot.status !== 'free') return { ok: false, reason: 'taken' };
  return { ok: true, slot, session };
}

// Choosing a slot and going to pay: the slot is held for holdMinutes, for this person only.
export function createHold(settings, bookings, request, nowMs, id) {
  const s = settingsWithDefaults(settings);
  const check = checkSlot(s, bookings, request, nowMs);
  if (!check.ok) return check;
  const booking = {
    id, minutes: check.session.minutes, date: request.date, start: check.slot.start, end: check.slot.end,
    startMs: check.slot.startMs, endMs: check.slot.endMs, price: check.session.price,
    status: 'pending', createdAt: nowMs, holdUntil: nowMs + s.holdMinutes * MINUTE,
    client: request.client || {}, lang: request.lang || 'fr'
  };
  return { ok: true, booking, bookings: (bookings || []).concat(booking) };
}

// The payment went through: the hold becomes a booking. Payment providers can report twice, so a second report
// changes nothing. A payment that arrives after the hold lapsed still books the slot if nobody took it meanwhile;
// otherwise it must be refunded (reason "conflict").
export function confirmBooking(settings, bookings, id, payment, nowMs) {
  const s = settingsWithDefaults(settings);
  const booking = (bookings || []).find(b => b.id === id);
  if (!booking) return { ok: false, reason: 'missing' };
  if (booking.status === 'confirmed') return { ok: true, booking, bookings };
  if (booking.status === 'cancelled') return { ok: false, reason: 'cancelled' };
  const clash = busyTimes(bookings, nowMs, s.bufferMinutes, id).some(([a, b]) => booking.startMs < b && booking.endMs > a);
  if (clash) return { ok: false, reason: 'conflict' };
  const confirmed = Object.assign({}, booking, { status: 'confirmed', paidAt: nowMs, payment: payment || {} });
  return { ok: true, booking: confirmed, bookings: bookings.map(b => (b.id === id ? confirmed : b)) };
}

// Rayda cancels a session, or a client gives up on the payment: the slot is free again.
export function cancelBooking(bookings, id, by, nowMs) {
  const booking = (bookings || []).find(b => b.id === id);
  if (!booking) return { ok: false, reason: 'missing' };
  if (booking.status === 'cancelled') return { ok: true, booking, bookings };
  const cancelled = Object.assign({}, booking, { status: 'cancelled', cancelledAt: nowMs, cancelledBy: by || 'client' });
  return { ok: true, booking: cancelled, bookings: bookings.map(b => (b.id === id ? cancelled : b)) };
}

// A calendar file for the client's agenda (.ics), in UTC so every calendar app places it right.
export function icsFor(booking, title, location) {
  const stamp = ms => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const text = value => String(value || '').replace(/[\\;,]/g, match => '\\' + match).replace(/\n/g, '\\n');
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Issolatej//Coaching//FR', 'BEGIN:VEVENT', 'UID:' + booking.id + '@issolatej',
    'DTSTAMP:' + stamp(booking.paidAt || booking.createdAt), 'DTSTART:' + stamp(booking.startMs), 'DTEND:' + stamp(booking.endMs),
    'SUMMARY:' + text(title), location ? 'LOCATION:' + text(location) : '', 'END:VEVENT', 'END:VCALENDAR'].filter(Boolean).join('\r\n');
}
