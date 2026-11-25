// Where the coaching agenda lives. For now it is this browser's storage, shared by the site and the admin demo (the
// same way orders and stock already are), so the whole flow can be tried: set hours in the admin, book and "pay" on
// the site, refresh, and the slot is gone. Two tabs of the same browser see each other's bookings at once.
//
// Every method returns a promise, like the server API that replaces it (COACHING_LOGIC.md lists its routes). On the
// server, "check the slot, then hold it" runs as one transaction, which is what keeps two clients on two devices
// from ever taking the same slot; the payment provider then confirms the booking itself (a webhook), not the browser.
import { DEFAULT_COACHING, createHold, confirmBooking, cancelBooking } from './coaching-core.js';

const SETTINGS_KEY = 'admin_coaching_settings';
const BOOKINGS_KEY = 'admin_coaching_bookings';
const OUTBOX_KEY = 'admin_outbox';

const read = (key, fallback) => { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
const uid = prefix => prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function readSettings() {
  const saved = read(SETTINGS_KEY, null);
  return saved ? Object.assign({}, DEFAULT_COACHING, saved) : Object.assign({}, DEFAULT_COACHING);
}
export const readBookings = () => read(BOOKINGS_KEY, []);

// The e-mails Resend will send once it is connected: kept in a list the admin shows, so the plan is visible.
function queueEmails(type, booking) {
  const outbox = read(OUTBOX_KEY, []);
  const when = new Date(booking.startMs).toISOString();
  const subjects = {
    'booking-confirmed': [['rayda', 'Nouvelle séance réservée et payée'], ['client', 'Votre séance avec Rayda est réservée']],
    'booking-cancelled': [['client', 'Votre séance avec Rayda est annulée']]
  }[type] || [];
  subjects.forEach(([to, subject]) => outbox.push({ id: uid('mail'), type, to, subject, bookingId: booking.id, sessionAt: when, createdAt: Date.now(), status: 'waiting-for-resend' }));
  write(OUTBOX_KEY, outbox.slice(-60));
}

export const coachingStore = {
  async settings() { return readSettings(); },
  async saveSettings(settings) { write(SETTINGS_KEY, Object.assign({}, settings, { example: false })); return readSettings(); },
  async bookings() { return readBookings(); },
  async booking(id) { return readBookings().find(b => b.id === id) || null; },
  // Hold a slot for the payment. Fails with { reason: 'taken' } if someone else holds or paid it a moment ago.
  async hold(request) {
    const result = createHold(readSettings(), readBookings(), request, Date.now(), uid('rdv'));
    if (result.ok) write(BOOKINGS_KEY, result.bookings);
    return result;
  },
  // Called by the payment's return. In production the payment provider's webhook calls this on the server instead.
  async confirm(id, payment) {
    const bookings = readBookings();
    const already = bookings.some(b => b.id === id && b.status === 'confirmed');
    const result = confirmBooking(readSettings(), bookings, id, payment, Date.now());
    if (result.ok && !already) { write(BOOKINGS_KEY, result.bookings); queueEmails('booking-confirmed', result.booking); }
    return result;
  },
  async cancel(id, by) {
    const before = readBookings().find(b => b.id === id);
    const result = cancelBooking(readBookings(), id, by, Date.now());
    if (result.ok) { write(BOOKINGS_KEY, result.bookings); if (before && before.status === 'confirmed') queueEmails('booking-cancelled', result.booking); }
    return result;
  },
  outbox() { return read(OUTBOX_KEY, []); },
  // Another tab (or the admin) changed the agenda: the page redraws it.
  subscribe(callback) {
    window.addEventListener('storage', event => { if (event.key === BOOKINGS_KEY || event.key === SETTINGS_KEY || event.key === null) callback(); });
  }
};

// Where the visitor pays. Today: the site's own demo step. Later: the payment page Konnect returns for this booking.
export const paymentUrl = (booking, lang) => (lang === 'ar' ? '/ar' : '') + '/coaching/paiement/?r=' + encodeURIComponent(booking.id);
export const confirmationUrl = (booking, lang) => (lang === 'ar' ? '/ar' : '') + '/coaching/confirmation/?r=' + encodeURIComponent(booking.id);
