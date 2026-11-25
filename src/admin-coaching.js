// The admin's coaching and courses pages (and the next sessions on the dashboard). Same agenda as the site:
// whatever Rayda saves here, the coaching page shows at once (in this demo, in the same browser; later, from the
// server). Demo-only like the rest of the admin: admin.js checks the demo login before anything is shown.
import { rangesFor, bookingState, tunisNow, addDays, weekday, toMinutes, fromMinutes } from './coaching-core.js';
import { coachingStore as store } from './coaching-store.js';

const page = document.body.dataset.adminPage;
const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const SHORT = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const ORDER = [1, 2, 3, 4, 5, 6, 0];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = value => (value == null || value === '' ? 'À confirmer' : new Intl.NumberFormat('fr-TN', { maximumFractionDigits: 0 }).format(value) + ' TND');
const dateLabel = date => { const [y, m, d] = date.split('-').map(Number); return SHORT[weekday(date)] + ' ' + d + ' ' + MONTHS[m - 1] + ' ' + y; };
const duration = minutes => (Number(minutes) === 60 ? '1 h' : minutes + ' min');
const tunisClock = ms => fromMinutes(tunisNow(ms).minutes);
function flashSaved(form) {
  const note = form.querySelector('[data-saved]');
  if (!note) return;
  note.hidden = false;
  clearTimeout(note.timer);
  note.timer = setTimeout(() => { note.hidden = true; }, 2600);
}
// A button that asks once before an action that cannot be undone, without a browser pop-up.
function twoStep(button, label, action) {
  button.addEventListener('click', () => {
    if (button.dataset.armed) { action(); return; }
    const original = button.innerHTML;
    button.dataset.armed = '1';
    button.classList.add('is-armed');
    button.textContent = label;
    setTimeout(() => { delete button.dataset.armed; button.classList.remove('is-armed'); button.innerHTML = original; }, 4000);
  });
}
function statusBadge(booking, now) {
  const state = bookingState(booking, now);
  if (state === 'confirmed') return '<span class="a-badge ok">Payée</span>';
  if (state === 'pending') return '<span class="a-badge warn">En cours de paiement · jusqu’à ' + tunisClock(booking.holdUntil) + '</span>';
  if (state === 'expired') return '<span class="a-badge off">Non payée (expirée)</span>';
  return '<span class="a-badge off">Annulée</span>';
}

/* ---------------------------------------------------------------- Coaching & agenda ---------------------------------------------------------------- */
async function coachingPage() {
  let settings = await store.settings();
  let bookings = await store.bookings();
  const today = tunisNow(Date.now()).date;
  let weekStart = addDays(today, -((weekday(today) + 6) % 7)); // this week's Monday
  const exampleBadge = document.querySelector('[data-example-badge]');

  function drawWeek() {
    const now = Date.now();
    const days = [...Array(7)].map((_, i) => addDays(weekStart, i));
    const [, m1, d1] = days[0].split('-').map(Number);
    const [y2, m2, d2] = days[6].split('-').map(Number);
    document.querySelector('[data-week-label]').textContent = d1 + ' ' + MONTHS[m1 - 1] + ' – ' + d2 + ' ' + MONTHS[m2 - 1] + ' ' + y2;
    // The visible hours: from the earliest opening or session to the latest, at least 9:00 to 18:00.
    let from = 9 * 60, to = 18 * 60;
    days.forEach(date => rangesFor(settings, date).forEach(([a, b]) => { from = Math.min(from, a); to = Math.max(to, b); }));
    const active = bookings.filter(b => b.date >= days[0] && b.date <= days[6] && ['confirmed', 'pending'].includes(bookingState(b, now)));
    active.forEach(b => { from = Math.min(from, toMinutes(b.start)); to = Math.max(to, toMinutes(b.end)); });
    from = Math.floor(from / 60) * 60; to = Math.ceil(to / 60) * 60;
    const row = 22; // pixels per half hour
    const y = minutes => ((minutes - from) / 30) * row;
    const hours = [];
    for (let t = from; t <= to; t += 60) hours.push(`<span style="top:${y(t)}px">${fromMinutes(t)}</span>`);
    const columns = days.map(date => {
      const ranges = rangesFor(settings, date);
      const exception = (settings.exceptions || []).find(e => e.date === date);
      const blocks = ranges.map(([a, b]) => `<div class="a-block is-open" style="top:${y(a)}px;height:${y(b) - y(a)}px"><span>${fromMinutes(a)}–${fromMinutes(b)}</span></div>`).join('');
      const sessions = active.filter(b => b.date === date).map(b => {
        const pending = bookingState(b, now) === 'pending';
        return `<div class="a-block ${pending ? 'is-pending' : 'is-booked'}" style="top:${y(toMinutes(b.start))}px;height:${y(toMinutes(b.end)) - y(toMinutes(b.start))}px" title="${esc(b.start + '–' + b.end + ' · ' + (b.client?.name || ''))}"><b>${b.start}–${b.end}</b><span>${esc(b.client?.name || '')}${pending ? ' · paiement en cours' : ''}</span></div>`;
      }).join('');
      const closed = !ranges.length ? `<div class="a-day-closed">${exception?.closed ? 'Fermé' + (exception.note ? ' · ' + esc(exception.note) : '') : 'Fermé'}</div>` : '';
      return `<div class="a-day${date === today ? ' is-today' : ''}${date < today ? ' is-past' : ''}"><p class="a-day-head"><b>${SHORT[weekday(date)]}</b> ${Number(date.slice(8))}${exception && !exception.closed ? ' <em>horaires spéciaux</em>' : ''}</p><div class="a-day-body" style="height:${y(to)}px">${blocks}${sessions}${closed}</div></div>`;
    }).join('');
    document.querySelector('[data-week]').innerHTML = `<div class="a-hours" style="height:${y(to)}px">${hours.join('')}</div>${columns}`;
  }

  function drawBookings() {
    const now = Date.now();
    const list = bookings.slice().sort((a, b) => a.startMs - b.startMs);
    document.querySelector('[data-bookings-empty]').hidden = list.length > 0;
    const body = document.querySelector('[data-bookings-table]');
    body.innerHTML = list.map(b => {
      const state = bookingState(b, now);
      const contact = [b.client?.phone, b.client?.email].filter(Boolean).map(esc).join('<br />');
      const action = state === 'confirmed' || state === 'pending' ? `<button type="button" class="a-icon-btn danger a-wide-btn" data-cancel="${b.id}">Annuler</button>` : '';
      return `<tr class="${state === 'cancelled' || state === 'expired' ? 'is-muted' : ''}"><td>${dateLabel(b.date)}</td><td>${b.start}–${b.end}</td><td>${duration(b.minutes)}</td><td><b>${esc(b.client?.name || '—')}</b>${b.client?.note ? `<small class="a-note">${esc(b.client.note)}</small>` : ''}</td><td>${contact || '—'}</td><td>${money(b.price)}</td><td>${statusBadge(b, now)}</td><td class="a-row-actions">${action}</td></tr>`;
    }).join('');
    body.querySelectorAll('[data-cancel]').forEach(button => twoStep(button, 'Confirmer ?', async () => {
      await store.cancel(button.dataset.cancel, 'rayda');
      bookings = await store.bookings();
      drawAll();
    }));
  }

  function rangeRow(from = '10:00', to = '12:00') {
    return `<div class="a-range"><input type="time" step="900" value="${from}" aria-label="De" /><span>à</span><input type="time" step="900" value="${to}" aria-label="À" /><button type="button" class="a-icon-btn danger" data-remove-range title="Retirer cette plage">✕</button></div>`;
  }
  function drawWeekly() {
    exampleBadge.hidden = !settings.example;
    const rows = ORDER.map(day => {
      const ranges = settings.weekly[day] || [];
      return `<div class="a-weekly-row" data-day="${day}"><label class="a-switch-line"><span class="a-switch"><input type="checkbox" data-open ${ranges.length ? 'checked' : ''} /><span></span></span><b>${DAYS[day]}</b></label><div class="a-ranges">${ranges.map(([a, b]) => rangeRow(a, b)).join('')}<button type="button" class="a-btn-ghost a-add-range" data-add-range>+ Ajouter une plage</button></div></div>`;
    }).join('');
    const box = document.querySelector('[data-weekly-rows]');
    box.innerHTML = rows;
    box.querySelectorAll('.a-weekly-row').forEach(row => {
      const sync = () => row.classList.toggle('is-off', !row.querySelector('[data-open]').checked);
      sync();
      row.querySelector('[data-open]').addEventListener('change', () => {
        if (row.querySelector('[data-open]').checked && !row.querySelector('.a-range')) row.querySelector('[data-add-range]').insertAdjacentHTML('beforebegin', rangeRow());
        sync();
      });
    });
  }
  document.querySelector('[data-weekly-rows]').addEventListener('click', event => {
    if (event.target.closest('[data-add-range]')) event.target.closest('[data-add-range]').insertAdjacentHTML('beforebegin', rangeRow('15:00', '18:00'));
    if (event.target.closest('[data-remove-range]')) event.target.closest('.a-range').remove();
  });
  document.querySelector('[data-weekly-form]').addEventListener('submit', async event => {
    event.preventDefault();
    const weekly = {};
    event.target.querySelectorAll('.a-weekly-row').forEach(row => {
      const open = row.querySelector('[data-open]').checked;
      weekly[row.dataset.day] = !open ? [] : [...row.querySelectorAll('.a-range')].map(r => [...r.querySelectorAll('input')].map(i => i.value))
        .filter(([a, b]) => a && b && toMinutes(b) > toMinutes(a)).sort((x, y) => toMinutes(x[0]) - toMinutes(y[0]));
    });
    settings = await store.saveSettings(Object.assign({}, settings, { weekly }));
    drawAll();
    flashSaved(event.target);
  });

  function drawExceptions() {
    const list = (settings.exceptions || []).slice().sort((a, b) => a.date.localeCompare(b.date));
    document.querySelector('[data-exceptions-empty]').hidden = list.length > 0;
    const body = document.querySelector('[data-exceptions-table]');
    body.innerHTML = list.map(item => `<tr class="${item.date < today ? 'is-muted' : ''}"><td>${dateLabel(item.date)}</td><td>${item.closed ? 'Fermé toute la journée' : 'Ouvert de ' + item.ranges.map(r => r.join(' à ')).join(', ')}</td><td>${esc(item.note || '—')}</td><td class="a-row-actions"><button type="button" class="a-icon-btn danger" data-remove-exception="${item.date}" title="Retirer">✕</button></td></tr>`).join('');
    body.querySelectorAll('[data-remove-exception]').forEach(button => button.addEventListener('click', async () => {
      settings = await store.saveSettings(Object.assign({}, settings, { exceptions: settings.exceptions.filter(e => e.date !== button.dataset.removeException) }));
      drawAll();
    }));
  }
  const exceptionForm = document.querySelector('[data-exception-form]');
  const syncKind = () => { const hours = exceptionForm.elements.kind.value === 'hours'; exceptionForm.elements.from.disabled = !hours; exceptionForm.elements.to.disabled = !hours; };
  exceptionForm.elements.kind.addEventListener('change', syncKind);
  syncKind();
  exceptionForm.elements.date.min = today;
  exceptionForm.addEventListener('submit', async event => {
    event.preventDefault();
    const f = exceptionForm.elements;
    const hours = f.kind.value === 'hours';
    if (hours && !(f.from.value && f.to.value && toMinutes(f.to.value) > toMinutes(f.from.value))) { f.to.setCustomValidity('L’heure de fin doit venir après l’heure de début.'); f.to.reportValidity(); setTimeout(() => f.to.setCustomValidity(''), 2000); return; }
    const item = hours ? { date: f.date.value, ranges: [[f.from.value, f.to.value]], note: f.note.value.trim() } : { date: f.date.value, closed: true, note: f.note.value.trim() };
    settings = await store.saveSettings(Object.assign({}, settings, { exceptions: (settings.exceptions || []).filter(e => e.date !== item.date).concat(item) }));
    exceptionForm.reset(); syncKind();
    drawAll();
    flashSaved(exceptionForm);
  });

  function drawSessions() {
    document.querySelector('[data-session-rows]').innerHTML = settings.sessions.map(s => `<div class="a-session" data-minutes="${s.minutes}"><p><b>Séance de ${s.minutes === 60 ? '1 heure' : s.minutes + ' minutes'}</b></p><label class="a-field">Tarif (TND)<input name="price-${s.minutes}" type="number" min="0" step="1" value="${s.price ?? ''}" placeholder="À confirmer" /></label><label class="a-field a-checkbox"><span class="a-switch"><input type="checkbox" name="enabled-${s.minutes}" ${s.enabled !== false ? 'checked' : ''} /><span></span></span> Proposée sur le site</label></div>`).join('');
  }
  document.querySelector('[data-sessions-form]').addEventListener('submit', async event => {
    event.preventDefault();
    const f = event.target.elements;
    const sessions = settings.sessions.map(s => ({ minutes: s.minutes, price: f['price-' + s.minutes].value === '' ? null : Math.max(0, Number(f['price-' + s.minutes].value)), enabled: f['enabled-' + s.minutes].checked }));
    if (!sessions.some(s => s.enabled)) { f['enabled-30'].setCustomValidity('Gardez au moins une durée proposée.'); f['enabled-30'].reportValidity(); setTimeout(() => f['enabled-30'].setCustomValidity(''), 2000); return; }
    settings = await store.saveSettings(Object.assign({}, settings, { sessions }));
    drawAll();
    flashSaved(event.target);
  });

  const rules = document.querySelector('[data-rules-form]');
  function drawRules() { ['minNoticeHours', 'horizonDays', 'bufferMinutes', 'holdMinutes', 'stepMinutes'].forEach(key => { rules.elements[key].value = settings[key]; }); }
  rules.addEventListener('submit', async event => {
    event.preventDefault();
    const values = {};
    ['minNoticeHours', 'horizonDays', 'bufferMinutes', 'holdMinutes', 'stepMinutes'].forEach(key => { values[key] = Number(rules.elements[key].value); });
    settings = await store.saveSettings(Object.assign({}, settings, values));
    drawAll();
    flashSaved(rules);
  });

  function drawOutbox() {
    const list = store.outbox().slice().reverse();
    document.querySelector('[data-outbox-empty]').hidden = list.length > 0;
    document.querySelector('[data-outbox-table]').innerHTML = list.map(mail => `<tr><td>${dateLabel(tunisNow(mail.createdAt).date)} · ${tunisClock(mail.createdAt)}</td><td>${mail.to === 'rayda' ? 'Vous (Rayda)' : 'Cliente / client'}</td><td>${esc(mail.subject)}</td><td>${mail.sessionAt ? dateLabel(tunisNow(Date.parse(mail.sessionAt)).date) + ' · ' + tunisClock(Date.parse(mail.sessionAt)) : '—'}</td><td><span class="a-badge warn">En attente de Resend</span></td></tr>`).join('');
  }

  function drawAll() { drawWeek(); drawBookings(); drawWeekly(); drawExceptions(); drawSessions(); drawRules(); drawOutbox(); }
  document.querySelectorAll('[data-week-step]').forEach(button => button.addEventListener('click', () => { weekStart = addDays(weekStart, 7 * Number(button.dataset.weekStep)); drawWeek(); }));
  drawAll();
  // A booking made on the site in another tab shows up here at once.
  store.subscribe(async () => { settings = await store.settings(); bookings = await store.bookings(); drawWeek(); drawBookings(); drawOutbox(); });
  setInterval(async () => { bookings = await store.bookings(); drawWeek(); drawBookings(); }, 30000);
}

/* ---------------------------------------------------------------- Dashboard: the next sessions ---------------------------------------------------------------- */
async function dashboard() {
  const now = Date.now();
  const next = (await store.bookings()).filter(b => bookingState(b, now) === 'confirmed' && b.endMs > now).sort((a, b) => a.startMs - b.startMs).slice(0, 6);
  const panel = document.querySelector('[data-next-sessions]');
  if (!panel) return;
  panel.hidden = false;
  document.querySelector('[data-next-sessions-empty]').hidden = next.length > 0;
  document.querySelector('[data-next-sessions-table]').innerHTML = next.map(b => `<tr><td>${dateLabel(b.date)}</td><td>${b.start}–${b.end}</td><td>${duration(b.minutes)}</td><td>${esc(b.client?.name || '—')}</td><td>${esc(b.client?.phone || '—')}</td></tr>`).join('');
}

/* ---------------------------------------------------------------- Formations ---------------------------------------------------------------- */
const COURSES_KEY = 'admin_courses';
function readCourses() {
  try { const saved = JSON.parse(localStorage.getItem(COURSES_KEY) || 'null'); if (Array.isArray(saved)) return saved; } catch { /* start again from the site's list */ }
  return (window.ISSOLATEJ_COURSES || []).map(c => ({ id: c.id, status: c.status || 'soon', fr: c.fr, ar: c.ar, price: null, video: '' }));
}
function saveCourses(list) { try { localStorage.setItem(COURSES_KEY, JSON.stringify(list)); } catch { /* demo only */ } }
function coursesPage() {
  const body = document.querySelector('[data-courses-table]');
  function draw() {
    const list = readCourses();
    body.innerHTML = list.map(c => `<tr><td><b>${esc(c.fr?.title)}</b>${c.ar?.title ? `<small class="a-note" dir="rtl" lang="ar">${esc(c.ar.title)}</small>` : ''}</td><td><select class="a-field a-inline-select" data-course-status="${c.id}"><option value="soon"${c.status !== 'published' ? ' selected' : ''}>Bientôt</option><option value="published"${c.status === 'published' ? ' selected' : ''}>Publiée</option></select></td><td>${money(c.price)}</td><td>${c.video ? `<a href="${esc(c.video)}" target="_blank" rel="noopener noreferrer">Lien ↗</a>` : '—'}</td><td class="a-row-actions"><button type="button" class="a-icon-btn danger" data-remove-course="${c.id}" title="Retirer">✕</button></td></tr>`).join('');
    body.querySelectorAll('[data-course-status]').forEach(select => select.addEventListener('change', () => {
      saveCourses(readCourses().map(c => (c.id === select.dataset.courseStatus ? Object.assign({}, c, { status: select.value }) : c)));
    }));
    body.querySelectorAll('[data-remove-course]').forEach(button => twoStep(button, '?', () => {
      saveCourses(readCourses().filter(c => c.id !== button.dataset.removeCourse));
      draw();
    }));
  }
  const form = document.querySelector('[data-add-course-form]');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const f = form.elements;
    const course = { id: 'formation-' + Date.now().toString(36), status: 'soon', fr: { title: f.titleFr.value.trim(), text: f.textFr.value.trim() }, ar: { title: f.titleAr.value.trim() || f.titleFr.value.trim(), text: f.textAr.value.trim() || f.textFr.value.trim() }, price: f.price.value === '' ? null : Number(f.price.value), video: f.video.value.trim() };
    if (!course.fr.title) return;
    saveCourses(readCourses().concat(course));
    form.reset();
    draw();
    flashSaved(form);
  });
  draw();
}

if (page === 'coaching') coachingPage();
else if (page === 'dashboard') dashboard();
else if (page === 'courses') coursesPage();
