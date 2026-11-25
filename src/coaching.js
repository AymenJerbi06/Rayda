// The coaching pages at work: the agenda on /coaching/, the payment step on /coaching/paiement/ and the confirmation
// on /coaching/confirmation/, in French and Arabic. The rules live in coaching-core.js and the agenda in
// coaching-store.js; this file only draws them and reacts to clicks.
import { daysOverview, daySlots, sessionFor, bookingState, tunisNow, weekday, icsFor } from './coaching-core.js';
import { coachingStore as store, paymentUrl, confirmationUrl } from './coaching-store.js';

const root = document.querySelector('[data-coaching]');
const ar = root?.dataset.lang === 'ar';
const live = (window.STORE_CONFIG?.coaching?.mode || 'preview') === 'live';
const HOLD_KEY = 'coaching-hold';

const T = ar ? {
  months: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  weekdays: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  prev: 'الشهر السابق', next: 'الشهر الموالي',
  minutes: m => (Number(m) === 60 ? 'ساعة' : m + ' دقيقة'),
  money: v => new Intl.NumberFormat('ar-TN', { maximumFractionDigits: 0 }).format(v) + ' د.ت',
  priceUnknown: 'السعر يُؤكَّد لاحقًا',
  free: n => (n === 1 ? 'وقت واحد متاح' : n === 2 ? 'وقتان متاحان' : n <= 10 ? n + ' أوقات متاحة' : n + ' وقتًا متاحًا'),
  dayStatus: { full: 'محجوز بالكامل', closed: 'غير متاح', soon: 'قريب جدًا للحجز' },
  progress: n => 'المرحلة ' + n + ' من 5', change: 'تغيير',
  noSlots: 'لا يوجد وقت متاح في هذا اليوم.', pickDay: 'اختاروا يومًا أولًا.', taken: 'محجوز',
  noDays: 'لا توجد أوقات متاحة حاليًا. أعيدوا المحاولة لاحقًا أو راسلوا رايدا عبر واتساب.',
  chooseSlot: 'اختاروا يومًا وساعة.', holding: 'جارٍ حجز الوقت لكم…',
  errors: { taken: 'تمّ حجز هذا الوقت للتوّ. اختاروا وقتًا آخر.', closed: 'هذا الوقت لم يعد متاحًا. اختاروا وقتًا آخر.', horizon: 'هذا الوقت لم يعد متاحًا. اختاروا وقتًا آخر.', session: 'هذه المدة لم تعد مقترحة.', storage: 'تعذّر حفظ الحجز في هذا المتصفح.' },
  cancelledNotice: 'أُلغي الدفع، وعاد الوقت متاحًا.',
  heldNotice: until => 'نحتفظ لكم بوقت حتى الساعة ' + until + '.', resume: 'متابعة الدفع', release: 'إلغاء الحجز',
  session: 'جلسة كوتشينغ مع رايدا', duration: 'المدة', day: 'اليوم', time: 'الساعة', price: 'السعر', to: ' – ',
  holdLeft: 'نحتفظ لكم بهذا الوقت لمدة', demoTitle: 'معاينة', demoText: 'لم يُربط الدفع عبر الإنترنت بعد. في الموقع النهائي، يفتح هذا الزر صفحة الدفع الآمنة لـ Konnect ثم يعيدكم إلى هنا. لا يُقتطع أي مبلغ.',
  liveText: 'سيتم تحويلكم إلى صفحة الدفع الآمنة.',
  simulate: 'محاكاة دفع مقبول', cancel: 'إلغاء وتحرير الوقت', confirming: 'جارٍ تأكيد الدفع…',
  missing: 'لم نجد هذا الحجز.', expired: 'انتهى وقت الدفع، وعاد الوقت متاحًا.', cancelled: 'أُلغي هذا الحجز.',
  conflict: 'حُجز هذا الوقت في الأثناء. يُستردّ المبلغ في هذه الحالة.', back: 'العودة إلى الأجندة',
  doneTitle: 'جلستكم محجوزة.', doneText: 'يقع الاتصال بكم قبل الجلسة لإعطائكم تفاصيلها.',
  addCalendar: 'أضيفوها إلى أجندتي', home: 'العودة إلى الصفحة الرئيسية', waiting: 'ننتظر تأكيد الدفع…',
  slow: 'يتأخر التأكيد. أعيدوا تحميل هذه الصفحة بعد لحظات.',
  donePreview: 'معاينة: لم يُقتطع أي مبلغ، وسيُرسل بريد التأكيد عند ربط Resend.',
  calendarTitle: 'جلسة كوتشينغ مع رايدا', file: 'جلسة-رايدا.ics'
} : {
  months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  prev: 'Mois précédent', next: 'Mois suivant',
  minutes: m => (Number(m) === 60 ? '1 heure' : m + ' minutes'),
  money: v => new Intl.NumberFormat('fr-TN', { maximumFractionDigits: 0 }).format(v) + ' TND',
  priceUnknown: 'Tarif à confirmer',
  free: n => (n === 1 ? '1 créneau libre' : n + ' créneaux libres'),
  dayStatus: { full: 'complet', closed: 'indisponible', soon: 'trop proche pour réserver' },
  progress: n => 'Étape ' + n + ' sur 5', change: 'Modifier',
  noSlots: 'Aucun créneau libre ce jour-là.', pickDay: 'Choisissez d’abord un jour.', taken: 'Réservé',
  noDays: 'Aucun créneau libre pour le moment. Revenez bientôt ou écrivez à Rayda sur WhatsApp.',
  chooseSlot: 'Choisissez un jour et une heure.', holding: 'Nous vous gardons le créneau…',
  errors: { taken: 'Ce créneau vient d’être pris. Choisissez-en un autre.', closed: 'Ce créneau n’est plus disponible. Choisissez-en un autre.', horizon: 'Ce créneau n’est plus disponible. Choisissez-en un autre.', session: 'Cette durée n’est plus proposée.', storage: 'La réservation n’a pas pu être enregistrée dans ce navigateur.' },
  cancelledNotice: 'Paiement annulé : le créneau est de nouveau libre.',
  heldNotice: until => 'Un créneau vous est gardé jusqu’à ' + until + '.', resume: 'Reprendre le paiement', release: 'Libérer le créneau',
  session: 'Séance de coaching avec Rayda', duration: 'Durée', day: 'Jour', time: 'Heure', price: 'Tarif', to: ' – ',
  holdLeft: 'Créneau gardé pendant', demoTitle: 'Aperçu', demoText: 'Le paiement en ligne n’est pas encore branché. Sur le site final, ce bouton ouvre la page de paiement sécurisée de Konnect, puis vous ramène ici. Aucun paiement n’est encaissé.',
  liveText: 'Vous allez être redirigé·e vers la page de paiement sécurisée.',
  simulate: 'Simuler un paiement accepté', cancel: 'Annuler et libérer le créneau', confirming: 'Confirmation du paiement…',
  missing: 'Cette réservation est introuvable.', expired: 'Le temps de paiement est écoulé : le créneau a été libéré.', cancelled: 'Cette réservation a été annulée.',
  conflict: 'Ce créneau a été pris entre-temps. Dans ce cas, le paiement est remboursé.', back: 'Retour à l’agenda',
  doneTitle: 'Votre séance est réservée.', doneText: 'Nous vous contactons avant la séance pour vous en donner les détails.',
  addCalendar: 'Ajouter à mon agenda', home: 'Retour à l’accueil', waiting: 'Nous attendons la confirmation du paiement…',
  slow: 'La confirmation tarde. Rechargez cette page dans quelques instants.',
  donePreview: 'Aperçu : aucun paiement n’a été encaissé, et l’e-mail de confirmation partira une fois Resend branché.',
  calendarTitle: 'Séance de coaching avec Rayda', file: 'seance-rayda.ics'
};

const lang = ar ? 'ar' : 'fr';
const bookHref = (ar ? '/ar' : '') + '/coaching/';
const arrow = '<span aria-hidden="true">↗</span>';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const go = (url, from) => (window.IssolatejLeaf ? window.IssolatejLeaf.go(url, from) : (location.href = url));
const loader = (label, onForest) => window.IssolatejLeaf?.loader(label, onForest) || Object.assign(document.createElement('p'), { textContent: label });

function dayLabel(date, withYear) {
  const [y, m, d] = date.split('-').map(Number);
  const day = !ar && d === 1 ? '1er' : String(d);
  return T.weekdays[weekday(date)] + ' ' + day + ' ' + T.months[m - 1] + (withYear ? ' ' + y : '');
}
// A day at the start of a line or a label begins with a capital (French weekdays are written in lower case).
const cap = text => text.charAt(0).toUpperCase() + text.slice(1);
const priceLabel = price => (price == null || price === '' ? T.priceUnknown : T.money(price));
const timeLabel = booking => booking.start + T.to + booking.end;
const clock = ms => { const s = Math.max(0, Math.round(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
const tunisTime = ms => { const t = tunisNow(ms); return String(Math.floor(t.minutes / 60)).padStart(2, '0') + ':' + String(t.minutes % 60).padStart(2, '0'); };

function summaryList(booking) {
  return `<dl class="c-summary-list"><div><dt>${T.duration}</dt><dd>${T.minutes(booking.minutes)}</dd></div><div><dt>${T.day}</dt><dd>${cap(dayLabel(booking.date, true))}</dd></div><div><dt>${T.time}</dt><dd><bdi>${timeLabel(booking)}</bdi></dd></div><div><dt>${T.price}</dt><dd>${priceLabel(booking.price)}</dd></div></dl>`;
}

/* ---------------------------------------------------------------- The agenda: /coaching/ ---------------------------------------------------------------- */
// One question at a time: 1 duration, 2 day, 3 time, 4 details, 5 check and pay. "Continuer" moves on once the step
// is answered, "Retour" and the phone's back button go back, and the choices made so far stay above the question.
async function bookPage() {
  const card = root.querySelector('.c-booking-card');
  const calendar = root.querySelector('[data-calendar]');
  const slotsBox = root.querySelector('[data-slots]');
  const dayText = root.querySelector('[data-day-label]');
  const form = root.querySelector('[data-booking-form]');
  const error = root.querySelector('[data-booking-error]');
  const choices = root.querySelector('[data-choices]');
  const progressText = root.querySelector('[data-progress-text]');
  const stepper = root.querySelector('.c-stepper');
  const progressBlock = root.querySelector('.c-progress') || card;
  const header = document.querySelector('.g-header');
  const panels = [...root.querySelectorAll('[data-panel]')];
  const payButton = form.querySelector('[type="submit"]');
  const payLabel = payButton.innerHTML;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const labels = [...stepper.querySelectorAll('em')].map(el => el.textContent);
  const state = { step: 1, minutes: Number(root.querySelector('input[name="minutes"]:checked')?.value || 30), date: null, start: null, month: null, settings: null, bookings: [] };

  const wait = calendar.querySelector('[data-loading]');
  if (wait) wait.appendChild(loader(wait.dataset.loading));
  const params = new URLSearchParams(location.search);

  // The choices so far sit with the question; a message sits above the answer it is about.
  function placeHelpers(step) {
    const panel = panels[step - 1];
    panel.querySelector('.c-panel-lead').prepend(choices);
    panel.querySelector('.c-panel-body').prepend(error);
  }
  placeHelpers(1);

  // On a phone the step's buttons stay at the bottom of the screen while its answer is longer than the screen; they
  // get a shadow only while they float over it (their own place, marked by .c-bar-end, is still below the screen).
  // The site's "back to top" button steps aside meanwhile.
  let pinTick = false;
  function markPinned() {
    pinTick = false;
    const bar = panels[state.step - 1].querySelector('.c-panel-actions');
    const end = bar && bar.nextElementSibling;
    if (end) bar.classList.toggle('is-stuck', end.getBoundingClientRect().top > window.innerHeight + 0.5);
  }
  window.addEventListener('scroll', () => { if (!pinTick) { pinTick = true; requestAnimationFrame(markPinned); } }, { passive: true });
  window.addEventListener('resize', markPinned);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => document.body.classList.toggle('c-booking-on', entry.isIntersecting), { rootMargin: '0px 0px -30% 0px' }).observe(card);
  }
  if (params.get('annule')) showNotice(T.cancelledNotice);

  function showNotice(text, actions) {
    let notice = root.querySelector('.c-notice');
    if (!notice) { notice = document.createElement('div'); notice.className = 'c-notice'; notice.setAttribute('role', 'status'); card.prepend(notice); }
    notice.innerHTML = `<p>${esc(text)}</p>`;
    if (actions) notice.appendChild(actions);
  }
  function showError(text) { error.textContent = text; error.hidden = !text; }

  async function load() {
    state.settings = await store.settings();
    state.bookings = await store.bookings();
  }

  const fields = () => ['name', 'phone', 'email'].map(name => form.elements[name]);
  const detailsDone = () => fields().every(field => field.value.trim() && field.checkValidity());
  // The furthest step the answers so far allow.
  const reachable = () => (!state.date ? 2 : !state.start ? 3 : !detailsDone() ? 4 : 5);
  const endOf = start => { const end = Number(start.slice(0, 2)) * 60 + Number(start.slice(3)) + state.minutes; return String(Math.floor(end / 60)).padStart(2, '0') + ':' + String(end % 60).padStart(2, '0'); };

  function render() {
    const now = Date.now();
    const s = state.settings;
    root.querySelector('[data-coaching-preview]').hidden = live && !s.example;
    root.querySelectorAll('[data-hold]').forEach(el => { el.textContent = s.holdMinutes; });
    // The two sessions: their price, and whether Rayda offers them.
    root.querySelectorAll('input[name="minutes"]').forEach(input => {
      const session = sessionFor(s, input.value);
      const off = !session || session.enabled === false;
      input.disabled = off;
      input.closest('.c-duration').hidden = off;
      const price = root.querySelector(`[data-price-for="${input.value}"]`);
      if (price && session) price.textContent = priceLabel(session.price);
    });
    if (!sessionFor(s, state.minutes) || sessionFor(s, state.minutes).enabled === false) {
      const first = s.sessions.find(x => x.enabled !== false);
      if (first) { state.minutes = first.minutes; const radio = root.querySelector(`input[name="minutes"][value="${first.minutes}"]`); if (radio) radio.checked = true; }
    }
    const days = daysOverview(s, state.bookings, state.minutes, now);
    const open = days.filter(d => d.status === 'open');
    // A day or a time that someone else took (or that Rayda closed) is let go.
    if (state.date && !open.some(d => d.date === state.date)) { state.date = null; state.start = null; }
    if (!state.month) state.month = (open[0] || days[0]).date.slice(0, 7);
    drawCalendar(days);
    drawSlots(now, open.length === 0);
    drawSummary();
    drawProgress();
  }

  function drawCalendar(days) {
    const byDate = Object.fromEntries(days.map(d => [d.date, d]));
    const [y, m] = state.month.split('-').map(Number);
    const first = new Date(Date.UTC(y, m - 1, 1));
    const count = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const offset = (first.getUTCDay() + 6) % 7; // weeks start on Monday
    const months = [...new Set(days.map(d => d.date.slice(0, 7)))];
    const index = months.indexOf(state.month);
    const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg>';
    let cells = [1, 2, 3, 4, 5, 6, 0].map(n => `<span class="c-cal-weekday" title="${T.weekdays[n]}" aria-hidden="true">${T.narrow[n]}</span>`).join('');
    cells += '<span class="c-cal-blank"></span>'.repeat(offset);
    for (let d = 1; d <= count; d++) {
      const date = state.month + '-' + String(d).padStart(2, '0');
      const day = byDate[date];
      const status = day ? day.status : 'out';
      const selected = date === state.date;
      const label = dayLabel(date) + (day ? ' · ' + (status === 'open' ? T.free(day.free) : T.dayStatus[status]) : '');
      cells += status === 'open'
        ? `<button type="button" class="c-day is-open${selected ? ' is-selected' : ''}" data-date="${date}" aria-pressed="${selected}" aria-label="${esc(label)}"><span>${d}</span><i aria-hidden="true"></i></button>`
        : `<span class="c-day is-${status}" title="${esc(label)}"><span>${d}</span></span>`;
    }
    calendar.innerHTML = `<div class="c-cal-head"><button type="button" class="c-cal-nav" data-cal-step="-1" aria-label="${T.prev}"${index <= 0 ? ' disabled' : ''}>${chevron}</button><p class="c-cal-month" aria-live="polite">${T.months[m - 1]} ${y}</p><button type="button" class="c-cal-nav is-next" data-cal-step="1" aria-label="${T.next}"${index >= months.length - 1 ? ' disabled' : ''}>${chevron}</button></div><div class="c-cal-grid">${cells}</div>`;
  }

  function drawSlots(now, nothingOpen) {
    if (!state.date) {
      dayText.textContent = nothingOpen ? T.noDays : T.pickDay;
      slotsBox.innerHTML = '';
      return;
    }
    const slots = daySlots(state.settings, state.bookings, state.date, state.minutes, now);
    const free = slots.filter(x => x.status === 'free').length;
    dayText.textContent = cap(dayLabel(state.date)) + ' · ' + (free ? T.free(free) : T.noSlots);
    if (state.start && !slots.some(x => x.start === state.start && x.status === 'free')) state.start = null;
    slotsBox.innerHTML = slots.map(slot => slot.status === 'free'
      ? `<button type="button" class="c-slot${slot.start === state.start ? ' is-selected' : ''}" role="radio" aria-checked="${slot.start === state.start}" data-start="${slot.start}"><bdi>${slot.start}</bdi></button>`
      : `<span class="c-slot is-taken" aria-disabled="true"><bdi>${slot.start}</bdi><small>${T.taken}</small></span>`).join('');
  }

  function drawSummary() {
    const session = sessionFor(state.settings, state.minutes);
    const set = (key, value) => { const el = root.querySelector(`[data-sum="${key}"]`); if (el) el.innerHTML = value; };
    set('duration', T.minutes(state.minutes));
    set('day', state.date ? cap(dayLabel(state.date, true)) : '—');
    set('time', state.start ? `<bdi>${state.start}${T.to}${endOf(state.start)}</bdi>` : '—');
    set('price', session ? priceLabel(session.price) : '—');
    // Isolated, so a phone number or an e-mail keeps its own order on the Arabic page.
    ['name', 'phone', 'email'].forEach(name => {
      const value = esc(form.elements[name].value.trim());
      set(name, value ? `<bdi${name === 'name' ? '' : ' dir="ltr"'}>${value}</bdi>` : '—');
    });
  }

  // The progress line, the stepper's leaves, the choices so far, and which "Continuer" can be pressed.
  function drawProgress() {
    progressText.textContent = T.progress(state.step) + ' · ' + labels[state.step - 1];
    stepper.style.setProperty('--progress', (state.step - 1) / 4);
    stepper.querySelectorAll('[data-dot]').forEach(dot => {
      const n = Number(dot.dataset.dot);
      dot.classList.toggle('is-done', n < state.step);
      dot.classList.toggle('is-current', n === state.step);
      if (n === state.step) dot.setAttribute('aria-current', 'step'); else dot.removeAttribute('aria-current');
    });
    const chips = [];
    if (state.step > 1) chips.push([1, T.minutes(state.minutes)]);
    if (state.step > 2 && state.date) chips.push([2, cap(dayLabel(state.date))]);
    if (state.step > 3 && state.start) chips.push([3, state.start + T.to + endOf(state.start)]);
    choices.hidden = !chips.length;
    choices.innerHTML = chips.map(([n, text]) => `<button type="button" class="c-choice" data-goto="${n}" aria-label="${esc(T.change + ' : ' + text)}"><bdi>${esc(text)}</bdi><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4"/></svg></button>`).join('');
    const ready = { 1: true, 2: !!state.date, 3: !!state.start, 4: true }[state.step];
    const nextButton = root.querySelector(`[data-panel="${state.step}"] [data-next]`);
    if (nextButton) nextButton.disabled = !ready;
  }

  // Show a step: it slides in from the side it comes from, its question takes the focus, and the card's top comes
  // into view so nobody has to look for it.
  function showStep(step, { push = true } = {}) {
    const target = Math.max(1, Math.min(step, reachable()));
    const back = target < state.step;
    state.step = target;
    showError('');
    panels.forEach(panel => {
      const on = Number(panel.dataset.panel) === target;
      panel.hidden = !on;
      panel.classList.remove('is-in', 'is-back');
      if (on && !reduce.matches) { void panel.offsetWidth; panel.classList.add(back ? 'is-back' : 'is-in'); }
    });
    placeHelpers(target);
    drawSummary();
    drawProgress();
    if (push) history.pushState({ coachingStep: target }, '');
    else history.replaceState({ coachingStep: target }, '');
    root.querySelector(`#c-q${target}`)?.focus({ preventScroll: true });
    bringIntoView();
    markPinned();
  }

  // Each step starts at the top of the screen: the progress line, the question, then the choices, so a phone
  // shows the whole step without hunting for it. Going down, the site's floating header tucks away; going back
  // up, it slides in, so the line stops just under it.
  function bringIntoView() {
    let offset = 16;
    const top = progressBlock.getBoundingClientRect().top;
    if (top - offset < 0 && header && header.classList.contains('is-floating')) offset += header.offsetHeight;
    if (Math.abs(top - offset) < 12) return;
    window.scrollTo({ top: Math.max(0, window.scrollY + top - offset), behavior: reduce.matches ? 'auto' : 'smooth' });
  }

  function next() {
    if (state.step === 2 && !state.date) return showError(T.pickDay);
    if (state.step === 3 && !state.start) return showError(T.chooseSlot);
    if (state.step === 4) {
      const wrong = fields().find(field => !field.value.trim() || !field.checkValidity());
      if (wrong) { wrong.reportValidity(); return; }
    }
    showStep(state.step + 1);
  }

  calendar.addEventListener('click', event => {
    const step = event.target.closest('[data-cal-step]');
    if (step) {
      const [y, m] = state.month.split('-').map(Number);
      const month = new Date(Date.UTC(y, m - 1 + Number(step.dataset.calStep), 1));
      state.month = month.getUTCFullYear() + '-' + String(month.getUTCMonth() + 1).padStart(2, '0');
      render();
      return;
    }
    const day = event.target.closest('[data-date]');
    if (!day) return;
    if (state.date !== day.dataset.date) state.start = null;
    state.date = day.dataset.date;
    showError('');
    render();
    calendar.querySelector('.is-selected')?.focus({ preventScroll: true });
  });
  slotsBox.addEventListener('click', event => {
    const slot = event.target.closest('[data-start]');
    if (!slot) return;
    state.start = slot.dataset.start;
    showError('');
    render();
    slotsBox.querySelector('.is-selected')?.focus({ preventScroll: true });
  });
  root.querySelectorAll('input[name="minutes"]').forEach(input => input.addEventListener('change', () => {
    state.minutes = Number(input.value);
    state.start = null;
    render();
  }));
  root.addEventListener('click', event => {
    if (event.target.closest('[data-next]')) next();
    else if (event.target.closest('[data-back]')) showStep(state.step - 1);
    else if (event.target.closest('[data-goto]')) showStep(Number(event.target.closest('[data-goto]').dataset.goto));
  });
  form.addEventListener('input', () => { if (state.step === 4) showError(''); });
  // The phone's back button steps back through the questions instead of leaving the page.
  window.addEventListener('popstate', event => { if (event.state && event.state.coachingStep) showStep(event.state.coachingStep, { push: false }); });

  // Enter in a field moves on; on the last step, the form books and goes to the payment.
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (state.step < 5) { next(); return; }
    if (!state.date || !state.start) { showStep(!state.date ? 2 : 3); return; }
    payButton.disabled = true;
    payButton.innerHTML = '';
    payButton.appendChild(loader(T.holding, true));
    const data = new FormData(form);
    const client = { name: String(data.get('name')).trim(), phone: String(data.get('phone')).trim(), email: String(data.get('email')).trim(), note: String(data.get('note') || '').trim() };
    const result = await store.hold({ minutes: state.minutes, date: state.date, start: state.start, client, lang });
    if (!result.ok) {
      payButton.disabled = false;
      payButton.innerHTML = payLabel;
      await load();
      state.start = null;
      render();
      showStep(result.reason === 'session' ? 1 : 3);
      showError(T.errors[result.reason] || T.errors.closed);
      return;
    }
    try { sessionStorage.setItem(HOLD_KEY, result.booking.id); } catch { /* the hold still stands */ }
    window.IssolatejLeaf ? window.IssolatejLeaf.go(paymentUrl(result.booking, lang), payButton) : (location.href = paymentUrl(result.booking, lang));
  });

  // A slot this visitor is already holding (they came back from the payment page): continue or let it go.
  async function heldSlot() {
    let id = null;
    try { id = sessionStorage.getItem(HOLD_KEY); } catch { /* nothing held */ }
    if (!id || params.get('annule')) return false;
    const booking = await store.booking(id);
    if (!booking || bookingState(booking, Date.now()) !== 'pending') return false;
    const actions = document.createElement('div');
    actions.className = 'c-notice-actions';
    actions.innerHTML = `<a class="g-button" href="${paymentUrl(booking, lang)}">${T.resume} ${arrow}</a><button type="button" class="g-text-link">${T.release}</button>`;
    actions.querySelector('button').addEventListener('click', async () => {
      await store.cancel(id, 'client');
      try { sessionStorage.removeItem(HOLD_KEY); } catch { /* gone anyway */ }
      root.querySelector('.c-notice')?.remove();
      await load(); render();
    });
    showNotice(T.heldNotice(tunisTime(booking.holdUntil)), actions);
    return true;
  }

  await load();
  history.replaceState({ coachingStep: 1 }, '');
  render();
  heldSlot();
  // Someone else books, a hold lapses, or Rayda changes her hours: the agenda follows. If the chosen time is gone,
  // the visitor is brought back to the times.
  const refresh = async () => {
    await load();
    const had = state.start;
    render();
    if (had && !state.start && state.step >= 3) {
      if (state.step > 3 || !state.date) showStep(state.date ? 3 : 2, { push: false });
      showError(T.errors.taken);
    }
  };
  store.subscribe(refresh);
  setInterval(refresh, 30000);

  // Back from the payment page, the browser can bring this page back exactly as it was left, the pay button still
  // waiting. Wake it up: the visitor's own hold now covers the time they chose, so they see the times again, with
  // the notice to go back to the payment or let the slot go.
  window.addEventListener('pageshow', async event => {
    if (!event.persisted) return;
    payButton.disabled = false;
    payButton.innerHTML = payLabel;
    await load();
    state.start = null;
    render();
    if (state.step > 3) showStep(3, { push: false });
    if (await heldSlot()) card.scrollIntoView({ block: 'start' });
  });
}

/* ---------------------------------------------------------------- The payment step: /coaching/paiement/ ---------------------------------------------------------------- */
async function payPage() {
  const body = root.querySelector('[data-pay-body]');
  const id = new URLSearchParams(location.search).get('r');
  let timer = null;
  const backLink = `<a class="g-button" href="${bookHref}">${T.back} ${arrow}</a>`;
  const message = text => { clearInterval(timer); body.innerHTML = `<p class="c-message">${esc(text)}</p>${backLink}`; };

  async function render() {
    const booking = id ? await store.booking(id) : null;
    if (!booking) return message(T.missing);
    const state = bookingState(booking, Date.now());
    if (state === 'confirmed') { location.replace(confirmationUrl(booking, lang)); return; }
    if (state === 'cancelled') return message(T.cancelled);
    if (state === 'expired') return message(T.expired);
    body.innerHTML = `<h2 class="c-pay-session">${T.session}</h2>${summaryList(booking)}<p class="c-hold">${T.holdLeft} <b data-countdown>${clock(booking.holdUntil - Date.now())}</b></p>
<div class="c-demo-pay">${live ? `<p>${T.liveText}</p>` : `<p><b>${T.demoTitle}</b> ${T.demoText}</p>`}<div class="c-pay-actions"><button type="button" class="g-button" data-pay-ok>${T.simulate} ${arrow}</button><button type="button" class="g-text-link" data-pay-cancel>${T.cancel}</button></div></div>`;
    const countdown = body.querySelector('[data-countdown]');
    clearInterval(timer);
    timer = setInterval(() => {
      const left = booking.holdUntil - Date.now();
      countdown.textContent = clock(left);
      if (left <= 0) render();
    }, 1000);
    body.querySelector('[data-pay-ok]').addEventListener('click', async event => {
      const box = event.currentTarget.getBoundingClientRect();
      const from = { clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 };
      clearInterval(timer);
      body.querySelector('.c-demo-pay').replaceChildren(loader(T.confirming));
      await new Promise(resolve => setTimeout(resolve, 1100)); // the time a payment page takes to answer
      const result = await store.confirm(booking.id, { provider: 'demo', reference: 'DEMO-' + Date.now().toString(36).toUpperCase() });
      if (!result.ok) return message(result.reason === 'conflict' ? T.conflict : T.expired);
      try { sessionStorage.removeItem(HOLD_KEY); } catch { /* nothing to clear */ }
      go(confirmationUrl(booking, lang), from);
    });
    body.querySelector('[data-pay-cancel]').addEventListener('click', async event => {
      clearInterval(timer);
      await store.cancel(booking.id, 'client');
      try { sessionStorage.removeItem(HOLD_KEY); } catch { /* nothing to clear */ }
      go(bookHref + '?annule=1', event.currentTarget);
    });
  }
  render();
  // Back from the confirmation, this page may come back as it was left, mid-payment: read the booking again.
  window.addEventListener('pageshow', event => { if (event.persisted) render(); });
}

/* ---------------------------------------------------------------- The confirmation: /coaching/confirmation/ ---------------------------------------------------------------- */
async function donePage() {
  const body = root.querySelector('[data-done-body]');
  const id = new URLSearchParams(location.search).get('r');
  const started = Date.now();
  const backLink = `<a class="g-button" href="${bookHref}">${T.back} ${arrow}</a>`;

  async function render() {
    const booking = id ? await store.booking(id) : null;
    if (!booking) { body.innerHTML = `<p class="c-message">${esc(T.missing)}</p>${backLink}`; return; }
    const state = bookingState(booking, Date.now());
    if (state === 'pending') {
      // The payment provider confirms on its own schedule (a webhook): wait for it, a little.
      if (Date.now() - started > 40000) { body.innerHTML = `<p class="c-message">${esc(T.slow)}</p>`; return; }
      if (!body.querySelector('.lf-loader')) body.replaceChildren(loader(T.waiting));
      setTimeout(render, 1500);
      return;
    }
    if (state !== 'confirmed') { body.innerHTML = `<p class="c-message">${esc(state === 'expired' ? T.expired : T.cancelled)}</p>${backLink}`; return; }
    body.innerHTML = `<h1>${T.doneTitle}</h1>${summaryList(booking)}<p>${T.doneText}</p><div class="c-pay-actions"><a class="g-button" data-ics download="${T.file}">${T.addCalendar} ${arrow}</a><a class="g-text-link" href="${ar ? '/ar/' : '/'}">${T.home}</a></div>${live ? '' : `<p class="c-preview c-preview-small">${T.donePreview}</p>`}`;
    const ics = icsFor(booking, T.calendarTitle, '');
    body.querySelector('[data-ics]').href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    window.IssolatejLeaf?.bloom(body);
  }
  render();
}

/* ---------------------------------------------------------------- Formations: the list Rayda keeps in the admin ---------------------------------------------------------------- */
// In this demo the admin keeps its list in the browser, like the agenda; later it comes from the server.
const courseGrid = document.querySelector('[data-courses]');
if (courseGrid) {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem('admin_courses') || 'null'); } catch { /* the page keeps its own list */ }
  const template = courseGrid.querySelector('.c-course');
  if (Array.isArray(saved) && template) {
    const arabic = document.documentElement.lang === 'ar';
    courseGrid.replaceChildren(...saved.map(course => {
      const card = template.cloneNode(true);
      card.removeAttribute('data-reveal');
      card.removeAttribute('style');
      const text = (arabic ? course.ar : course.fr) || course.fr || {};
      card.querySelector('h3').textContent = text.title || '';
      card.querySelector('p').textContent = text.text || '';
      if (course.status === 'published') {
        const badge = card.querySelector('.c-soon');
        badge.textContent = arabic ? 'متاحة' : 'Disponible';
        badge.classList.add('is-live');
      }
      return card;
    }));
  }
}

if (root) {
  const page = root.dataset.coaching;
  if (page === 'book') bookPage();
  else if (page === 'pay') payPage();
  else if (page === 'done') donePage();
}
