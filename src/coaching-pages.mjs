// The coaching pages (book, pay, confirmation), the Formations page and the two small blocks that lead to them
// (on the homepage and on Accompagnement), in French and Arabic. The booking itself is drawn by src/coaching.js
// from Rayda's agenda; this file holds the pages' words and their structure.
import { escapeHtml as esc } from './commerce-core.js';
import { DEFAULT_COACHING } from './coaching-core.js';
import { courses } from './courses.mjs';

const arrow = '<span aria-hidden="true">↗</span>';
const icon = type => `<svg viewBox="0 0 72 72" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${{
  calendar: '<rect x="12" y="16" width="48" height="44" rx="6"/><path d="M12 28h48M24 10v12M48 10v12"/><path d="M27 44l6 6 12-13"/>',
  clock: '<circle cx="36" cy="36" r="24"/><path d="M36 22v15l10 6"/>',
  card: '<rect x="10" y="20" width="52" height="34" rx="5"/><path d="M10 30h52M20 44h12"/>',
  play: '<circle cx="36" cy="36" r="25"/><path d="M31 26v20l16-10z"/>',
  lock: '<rect x="18" y="32" width="36" height="26" rx="5"/><path d="M26 32v-7a10 10 0 0 1 20 0v7"/>',
  video: '<rect x="9" y="18" width="40" height="36" rx="5"/><path d="M49 31l14-8v26l-14-8"/>',
  check: '<circle cx="36" cy="36" r="24"/><path d="M25 37l8 8 15-17"/>'
}[type]}</svg>`;

const hold = DEFAULT_COACHING.holdMinutes;
const W = {
  fr: {
    root: '', bookHref: '/coaching/', formationsHref: '/formations/',
    eyebrow: 'SÉANCES DE COACHING',
    title: 'Un temps pour vous, <br /><em>avec Rayda.</em>',
    lede: 'Réservez une séance individuelle de 30 minutes ou d’une heure, à un moment libre de l’agenda de Rayda. Votre séance est réservée dès que le paiement en ligne est confirmé.',
    preview: 'Aperçu : les horaires affichés sont des exemples et le paiement en ligne n’est pas encore branché. Aucun paiement n’est encaissé.',
    step1: 'La durée', step2: 'Le jour', step3: 'L’heure', step4: 'Vos coordonnées',
    durations: [['30', '30 minutes', 'Pour une question précise.'], ['60', '1 heure', 'Pour prendre le temps d’approfondir.']],
    priceUnknown: 'Tarif à confirmer',
    loadingAgenda: 'Chargement de l’agenda…',
    legend: [['open', 'Libre'], ['full', 'Complet'], ['closed', 'Indisponible']],
    pickDay: 'Choisissez d’abord un jour.', tz: 'Heures de Tunis (GMT+1).', slotsLabel: 'Heures disponibles',
    name: 'Votre prénom', namePh: 'Prénom', phone: 'Numéro de téléphone', email: 'Votre e-mail', emailPh: 'vous@exemple.com',
    note: 'Ce que vous souhaitez aborder', optional: '(facultatif)', notePh: 'Quelques mots, si vous le souhaitez',
    summary: 'Votre séance', sumRows: [['duration', 'Durée'], ['day', 'Jour'], ['time', 'Heure'], ['price', 'Tarif']],
    pay: 'Payer et réserver',
    wizard: {
      stepsLabel: 'Les étapes de la réservation', progress: n => `Étape ${n} sur 5`,
      labels: ['Durée', 'Jour', 'Heure', 'Coordonnées', 'Paiement'],
      questions: ['Combien de temps ?', 'Quel jour ?', 'À quelle heure ?', 'Vos coordonnées', 'Vérifiez et réservez'],
      hints: ['Choisissez la durée de votre séance.', 'Les jours où il reste un créneau libre sont marqués d’un point.', '', 'Pour vous envoyer la confirmation et vous joindre si besoin.', 'Rien n’est réservé avant le paiement.'],
      next: ['Choisir le jour', 'Voir les heures libres', 'Continuer', 'Vérifier ma réservation'],
      back: 'Retour', sumRows: [['name', 'Prénom'], ['phone', 'Téléphone'], ['email', 'E-mail']]
    },
    holdNote: `Pendant le paiement, ce créneau vous est gardé <span data-hold>${hold}</span> minutes. Il n’est réservé qu’une fois le paiement confirmé.`,
    noscript: 'La réservation en ligne a besoin de JavaScript. Vous pouvez aussi écrire à Rayda sur WhatsApp.',
    howEyebrow: 'COMMENT ÇA SE PASSE',
    how: [['calendar', 'Choisissez la durée et un moment libre dans l’agenda.'], ['card', 'Payez en ligne : le créneau vous est gardé pendant le paiement.'], ['check', 'Votre séance est réservée, et le créneau disparaît de l’agenda.']],
    faqTitle: 'Quelques <br />réponses.',
    faq: [
      ['Quand ma séance est-elle réservée ?', 'Dès que le paiement est confirmé. Pendant le paiement, le créneau vous est gardé quelques minutes. Sans paiement, il redevient libre pour les autres.'],
      ['Pourquoi certains créneaux sont-ils indisponibles ?', 'Ils sont déjà réservés, ou Rayda n’est pas disponible à ce moment-là. Seuls les créneaux libres peuvent être choisis.'],
      ['À quelle heure sont les séances ?', 'Les heures sont celles de Tunis (GMT+1), toute l’année.'],
      ['Que permet une séance ?', 'Un temps d’échange personnel avec Rayda, autour de ce que vous souhaitez aborder. Sa démarche spirituelle n’est pas un soin médical et ne garantit aucun résultat particulier.']
    ],
    payEyebrow: 'PAIEMENT EN LIGNE', payTitle: 'Réglez votre séance.',
    doneEyebrow: 'VOTRE SÉANCE',
    formations: {
      eyebrow: 'FORMATIONS EN VIDÉO', title: 'Apprendre à votre rythme, <br /><em>avec Rayda.</em>',
      lede: 'Rayda prépare des formations en vidéo pour avancer sur vos objectifs, chez vous et quand vous le voulez. Elles arrivent bientôt sur ce site.',
      soon: 'Bientôt disponible', soonShort: 'Bientôt',
      playerEyebrow: 'APERÇU DE L’ESPACE DE FORMATION', playerNote: 'Voici à quoi ressemblera une formation : la vidéo, puis ses chapitres.',
      play: 'Lecture bientôt disponible', chapters: 'Programme en préparation', chapter: 'Chapitre',
      gridEyebrow: 'LES PREMIÈRES FORMATIONS', gridTitle: 'Ce que Rayda prépare.', changeNote: 'Les titres et les programmes peuvent encore changer.',
      how: [['video', 'Choisissez une formation.'], ['card', 'Réglez-la en ligne.'], ['play', 'Regardez les vidéos à votre rythme.']],
      notifyTitle: 'Être prévenu·e de la sortie', notifyText: 'Un message à Rayda sur WhatsApp suffit : elle vous écrira quand les formations seront en ligne.',
      notify: 'Me prévenir sur WhatsApp', notifyMessage: 'Bonjour Rayda, merci de me prévenir quand vos formations en vidéo seront disponibles.',
      result: 'Les formations accompagnent une démarche personnelle : elles ne garantissent aucun résultat, financier ou autre.'
    },
    offers: {
      eyebrow: 'COACHING &amp; FORMATIONS', title: 'Avec Rayda, <br />en séance ou en vidéo.',
      coachEyebrow: 'SÉANCES DE COACHING', coachTitle: 'Réservez un moment avec Rayda.',
      coachText: '30 minutes ou une heure, à un moment libre de son agenda. La séance est à vous dès que le paiement est confirmé.',
      coachCta: 'Voir l’agenda', soonEyebrow: 'FORMATIONS · BIENTÔT', soonTitle: 'Apprendre à votre rythme.',
      soonText: 'Des formations en vidéo pour avancer sur vos objectifs, chez vous.', soonCta: 'Découvrir les formations'
    },
    banner: { text: 'Vous préférez un temps rien que pour vous ? Réservez une séance de coaching de 30 minutes ou d’une heure.', cta: 'Réserver une séance' }
  },
  ar: {
    root: '/ar', bookHref: '/ar/coaching/', formationsHref: '/ar/formations/',
    eyebrow: 'جلسات الكوتشينغ',
    title: 'وقت لكم، <br /><em>مع رايدا.</em>',
    lede: 'احجزوا جلسة فردية مدتها 30 دقيقة أو ساعة، في وقت متاح من أجندة رايدا. تُحجز جلستكم بمجرد تأكيد الدفع عبر الإنترنت.',
    preview: 'معاينة: الأوقات المعروضة أمثلة، والدفع عبر الإنترنت لم يُربط بعد. لا يُقتطع أي مبلغ.',
    step1: 'المدة', step2: 'اليوم', step3: 'الساعة', step4: 'معلوماتكم',
    durations: [['30', '30 دقيقة', 'لسؤال محدد.'], ['60', 'ساعة', 'لأخذ الوقت والتعمّق أكثر.']],
    priceUnknown: 'السعر يُؤكَّد لاحقًا',
    loadingAgenda: 'جارٍ تحميل الأجندة…',
    legend: [['open', 'متاح'], ['full', 'محجوز بالكامل'], ['closed', 'غير متاح']],
    pickDay: 'اختاروا يومًا أولًا.', tz: 'بتوقيت تونس (GMT+1).', slotsLabel: 'الأوقات المتاحة',
    name: 'اسمكم', namePh: 'الاسم', phone: 'رقم الهاتف', email: 'بريدكم الإلكتروني', emailPh: 'you@example.com',
    note: 'ما تودّون الحديث عنه', optional: '(اختياري)', notePh: 'بضع كلمات إن أردتم',
    summary: 'جلستكم', sumRows: [['duration', 'المدة'], ['day', 'اليوم'], ['time', 'الساعة'], ['price', 'السعر']],
    pay: 'ادفعوا واحجزوا',
    wizard: {
      stepsLabel: 'مراحل الحجز', progress: n => `المرحلة ${n} من 5`,
      labels: ['المدة', 'اليوم', 'الساعة', 'معلوماتكم', 'الدفع'],
      questions: ['كم من الوقت؟', 'أي يوم؟', 'في أي ساعة؟', 'معلوماتكم', 'راجعوا واحجزوا'],
      hints: ['اختاروا مدة جلستكم.', 'الأيام التي بقي فيها وقت متاح عليها نقطة.', '', 'لنرسل لكم التأكيد ونتواصل معكم عند الحاجة.', 'لا يُحجز شيء قبل الدفع.'],
      next: ['اختيار اليوم', 'عرض الأوقات المتاحة', 'متابعة', 'مراجعة الحجز'],
      back: 'رجوع', sumRows: [['name', 'الاسم'], ['phone', 'الهاتف'], ['email', 'البريد الإلكتروني']]
    },
    holdNote: `خلال الدفع، نحتفظ لكم بهذا الوقت <span data-hold>${hold}</span> دقيقة، ولا يُحجز إلا بعد تأكيد الدفع.`,
    noscript: 'يحتاج الحجز عبر الإنترنت إلى JavaScript. يمكنكم أيضًا مراسلة رايدا عبر واتساب.',
    howEyebrow: 'كيف تجري الأمور',
    how: [['calendar', 'اختاروا المدة ووقتًا متاحًا في الأجندة.'], ['card', 'ادفعوا عبر الإنترنت: نحتفظ لكم بالوقت خلال الدفع.'], ['check', 'تُحجز جلستكم ويختفي الوقت من الأجندة.']],
    faqTitle: 'بعض <br />الأجوبة.',
    faq: [
      ['متى تُحجز جلستي؟', 'بمجرد تأكيد الدفع. خلال الدفع نحتفظ لكم بالوقت بضع دقائق، وإن لم يتمّ الدفع يعود متاحًا للآخرين.'],
      ['لماذا بعض الأوقات غير متاحة؟', 'لأنها محجوزة، أو لأن رايدا غير متاحة في ذلك الوقت. يمكن اختيار الأوقات المتاحة فقط.'],
      ['بأي توقيت تُحدَّد الجلسات؟', 'بتوقيت تونس (GMT+1) طوال السنة.'],
      ['ماذا تقدّم الجلسة؟', 'وقت حوار شخصي مع رايدا حول ما تودّون الحديث عنه. مقاربة رايدا الروحانية ليست علاجًا طبيًا ولا تضمن نتيجة معينة.']
    ],
    payEyebrow: 'الدفع عبر الإنترنت', payTitle: 'ادفعوا ثمن جلستكم.',
    doneEyebrow: 'جلستكم',
    formations: {
      eyebrow: 'دورات بالفيديو', title: 'تعلّموا على إيقاعكم، <br /><em>مع رايدا.</em>',
      lede: 'تحضّر رايدا دورات بالفيديو لتتقدّموا نحو أهدافكم، من بيوتكم وفي الوقت الذي يناسبكم. ستتوفّر قريبًا على هذا الموقع.',
      soon: 'قريبًا', soonShort: 'قريبًا',
      playerEyebrow: 'معاينة فضاء الدورات', playerNote: 'هكذا ستبدو الدورة: الفيديو، ثم فصولها.',
      play: 'المشاهدة متاحة قريبًا', chapters: 'البرنامج قيد التحضير', chapter: 'الفصل',
      gridEyebrow: 'الدورات الأولى', gridTitle: 'ما تحضّره رايدا.', changeNote: 'قد تتغيّر العناوين والبرامج.',
      how: [['video', 'اختاروا دورة.'], ['card', 'ادفعوا ثمنها عبر الإنترنت.'], ['play', 'شاهدوا الفيديوهات على إيقاعكم.']],
      notifyTitle: 'أعلموني عند صدورها', notifyText: 'تكفي رسالة إلى رايدا عبر واتساب: ستراسلكم عندما تصبح الدورات متاحة.',
      notify: 'أعلموني عبر واتساب', notifyMessage: 'مرحبًا رايدا، أرجو إعلامي عندما تصبح دوراتك بالفيديو متاحة.',
      result: 'ترافق الدورات مسعًى شخصيًا، ولا تضمن أي نتيجة، مالية أو غيرها.'
    },
    offers: {
      eyebrow: 'الكوتشينغ والدورات', title: 'مع رايدا، <br />في جلسة أو عبر الفيديو.',
      coachEyebrow: 'جلسات الكوتشينغ', coachTitle: 'احجزوا وقتًا مع رايدا.',
      coachText: '30 دقيقة أو ساعة، في وقت متاح من أجندتها. تصبح الجلسة لكم بمجرد تأكيد الدفع.',
      coachCta: 'شاهدوا الأجندة', soonEyebrow: 'الدورات · قريبًا', soonTitle: 'تعلّموا على إيقاعكم.',
      soonText: 'دورات بالفيديو لتتقدّموا نحو أهدافكم، من بيوتكم.', soonCta: 'اكتشفوا الدورات'
    },
    banner: { text: 'تفضّلون وقتًا خاصًا بكم؟ احجزوا جلسة كوتشينغ مدتها 30 دقيقة أو ساعة.', cta: 'احجزوا جلسة' }
  }
};

const faqList = items => `<div class="g-faq-list">${items.map(([q, a]) => `<details name="coaching-questions"><summary>${q}<span aria-hidden="true"></span></summary><div><p>${a}</p></div></details>`).join('')}</div>`;
const steps = items => `<ul class="s-steps-row c-how-steps">${items.map(([type, text], i) => `<li data-reveal="up" style="--delay:${i * 120}ms"><span class="s-step-number">${i + 1}</span>${icon(type)}<span>${text}</span></li>`).join('')}</ul>`;
const script = '<script type="module" src="/src/coaching.js"></script>';

// The booking, one question at a time: duration, day, time, details, then a last check and the payment. A progress
// line grows like the leaf's stem, each finished step turns into a leaf, and the choices so far stay in view.
const leafDot = '<svg viewBox="246 2 86 110" aria-hidden="true"><path fill="currentColor" d="M253 108C250 44 282 14 318 7C327 56 300 100 253 108Z"/></svg>';
export function coachingBookPage(lang, whatsapp) {
  const w = W[lang], z = w.wizard;
  const durations = w.durations.map(([value, label, hint], i) => `<label class="c-duration"><input type="radio" name="minutes" value="${value}"${i === 0 ? ' checked' : ''} /><span><strong>${label}</strong><em data-price-for="${value}">${w.priceUnknown}</em><small>${hint}</small></span></label>`).join('');
  // Each step: the question on one side (with the choices so far), the answer and its buttons on the other. On a
  // phone they stack, and the buttons stay at the bottom of the screen; the last step's button pays.
  const actions = (n, next) => `<div class="c-panel-actions">${n > 1 ? `<button type="button" class="g-text-link c-back" data-back><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"/></svg><span class="c-back-label">${z.back}</span></button>` : ''}${n < 5 ? `<button type="button" class="g-button" data-next>${next} ${arrow}</button>` : `<button class="g-button c-pay-button" type="submit">${next} ${arrow}</button>`}</div>`;
  const panel = (n, lead, body, next) => `<section class="c-panel" data-panel="${n}"${n > 1 ? ' hidden' : ''} aria-labelledby="c-q${n}"><div class="c-panel-lead"><h2 class="c-question" id="c-q${n}" tabindex="-1">${z.questions[n - 1]}</h2>${lead}</div><div class="c-panel-body">${body}${actions(n, next)}<i class="c-bar-end" aria-hidden="true"></i></div></section>`;
  const stepper = z.labels.map((label, i) => `<li data-dot="${i + 1}"${i === 0 ? ' class="is-current" aria-current="step"' : ''}><span class="c-dot"><b>${i + 1}</b>${leafDot}</span><em>${label}</em></li>`).join('');
  return `<section class="g-page-heading c-heading"><p class="g-eyebrow" data-reveal>${w.eyebrow}</p><h1 data-reveal>${w.title}</h1><p data-reveal>${w.lede}</p></section>
<section class="c-booking" id="reserver" data-coaching="book" data-lang="${lang}"><div class="c-booking-card"><p class="c-preview" data-coaching-preview hidden>${w.preview}</p><noscript><p class="c-preview">${w.noscript} <a href="${whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${arrow}</a></p></noscript>
<div class="c-progress"><p class="c-progress-text" data-progress-text aria-live="polite">${z.progress(1)} · ${z.labels[0]}</p><ol class="c-stepper" aria-label="${z.stepsLabel}" style="--progress:0">${stepper}</ol></div>
<div class="c-choices" data-choices hidden></div><p class="c-error" data-booking-error role="alert" hidden></p>
<form class="g-contact-form c-booking-form" data-booking-form novalidate>
${panel(1, `<p class="c-hint">${z.hints[0]}</p>`, `<div class="c-durations">${durations}</div>`, z.next[0])}
${panel(2, `<p class="c-hint">${z.hints[1]}</p>`, `<div class="c-calendar" data-calendar><div class="c-calendar-wait" data-loading="${w.loadingAgenda}"></div></div><ul class="c-legend">${w.legend.map(([kind, label]) => `<li><i class="is-${kind}"></i>${label}</li>`).join('')}</ul>`, z.next[1])}
${panel(3, `<p class="c-hint c-day-label" data-day-label>${w.pickDay}</p>`, `<div class="c-slots" data-slots role="radiogroup" aria-label="${w.slotsLabel}"></div><p class="c-tz">${w.tz}</p>`, z.next[2])}
${panel(4, `<p class="c-hint">${z.hints[3]}</p>`, `<label>${w.name}<input name="name" autocomplete="given-name" maxlength="80" required placeholder="${w.namePh}" /></label><label>${w.phone}<input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" required placeholder="+216 •• ••• •••" dir="ltr" /></label><label>${w.email}<input name="email" type="email" autocomplete="email" maxlength="120" required placeholder="${w.emailPh}" dir="ltr" /></label><label><span>${w.note} <span class="s-small">${w.optional}</span></span><textarea name="note" rows="3" maxlength="600" placeholder="${w.notePh}"></textarea></label>`, z.next[3])}
${panel(5, `<p class="c-hint">${z.hints[4]}</p>`, `<div class="c-summary" data-summary aria-live="polite"><dl>${w.sumRows.concat(z.sumRows).map(([key, label]) => `<div><dt>${label}</dt><dd data-sum="${key}">—</dd></div>`).join('')}</dl></div><p class="g-form-note c-hold-note">${w.holdNote}</p>`, w.pay)}
</form></div></section>
<section class="c-how"><p class="g-eyebrow" data-reveal>${w.howEyebrow}</p>${steps(w.how)}</section>
<section class="g-questions"><h2 class="g-display">${w.faqTitle}</h2>${faqList(w.faq)}</section>${script}`;
}

export function coachingPayPage(lang) {
  const w = W[lang];
  return `<section class="c-pay" data-coaching="pay" data-lang="${lang}"><div class="c-pay-card"><p class="g-eyebrow">${w.payEyebrow}</p><h1>${w.payTitle}</h1><div class="c-pay-body" data-pay-body></div></div></section>${script}`;
}

export function coachingDonePage(lang) {
  const w = W[lang];
  return `<section class="c-pay c-done" data-coaching="done" data-lang="${lang}"><div class="c-pay-card"><p class="g-eyebrow">${w.doneEyebrow}</p><div class="c-pay-body" data-done-body></div></div></section>${script}`;
}

// `art` draws the site's leaf (src/leaf-art.mjs) with the classes it is given.
export function formationsPage(lang, whatsapp, art) {
  const w = W[lang], f = w.formations;
  const first = courses[0];
  const chapters = first.chapters[lang].map((title, i) => `<li><span class="c-chapter-number">${i + 1}</span><span><small>${f.chapter} ${i + 1}</small>${esc(title)}</span>${icon('lock')}</li>`).join('');
  const cards = courses.map((course, i) => `<article class="c-course" data-reveal="up" style="--delay:${i * 90}ms"><div class="c-course-thumb" aria-hidden="true"><div class="c-course-leaf">${art('lf-art')}</div><span class="c-course-play">${icon('play')}</span></div><div class="c-course-text"><span class="c-soon">${f.soonShort}</span><h3>${esc(course[lang].title)}</h3><p>${esc(course[lang].text)}</p></div></article>`).join('');
  const notify = whatsapp + '?text=' + encodeURIComponent(f.notifyMessage);
  return `<section class="g-page-heading c-heading"><p class="g-eyebrow" data-reveal>${f.eyebrow}</p><h1 data-reveal>${f.title}</h1><p data-reveal>${f.lede}</p><p data-reveal><span class="c-soon c-soon-large">${f.soon}</span></p></section>
<section class="c-player-section"><div class="c-player-head" data-reveal><p class="g-eyebrow">${f.playerEyebrow}</p><p>${f.playerNote}</p></div><div class="c-player" data-reveal="up"><div class="c-player-screen" data-player><div class="c-player-leaf" aria-hidden="true">${art('lf-art lf-grow lf-sway')}</div><button class="c-player-play" type="button" disabled aria-label="${f.play}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg></button><span class="c-soon">${f.soon}</span><div class="c-player-bar" aria-hidden="true"><span></span></div></div><div class="c-player-side"><h2>${esc(first[lang].title)}</h2><p>${esc(first[lang].text)}</p><p class="c-chapters-title">${f.chapters}</p><ol class="c-chapters">${chapters}</ol></div></div></section>
<section class="c-courses-section"><div class="c-courses-head" data-reveal><p class="g-eyebrow">${f.gridEyebrow}</p><h2 class="g-display">${f.gridTitle}</h2><p>${f.changeNote}</p></div><div class="c-courses" data-courses>${cards}</div></section>
<section class="c-how"><p class="g-eyebrow" data-reveal>${w.howEyebrow}</p>${steps(f.how)}</section>
<section class="c-notify"><div data-reveal><h2>${f.notifyTitle}</h2><p>${f.notifyText}</p><a class="g-button" href="${notify}" target="_blank" rel="noopener noreferrer">${f.notify} ${arrow}</a><p class="c-result-note">${f.result}</p></div></section>${script}`;
}

// The homepage block that leads to the agenda and the courses.
export function offersSection(lang) {
  const w = W[lang], o = w.offers;
  // On the homepage this is the chapter "Coaching & formations" (its bar of chapters points here).
  return `<section class="c-offers h-chapter" id="coaching" aria-labelledby="c-offers-title"><div class="c-offers-head" data-reveal><p class="g-eyebrow">${o.eyebrow}</p><h2 class="g-display" id="c-offers-title">${o.title}</h2></div><div class="c-offers-grid"><article class="c-offer" data-reveal="up">${icon('calendar')}<p class="g-eyebrow">${o.coachEyebrow}</p><h3>${o.coachTitle}</h3><p>${o.coachText}</p><a class="g-button" href="${w.bookHref}">${o.coachCta} ${arrow}</a></article><article class="c-offer c-offer-soon" data-reveal="up" style="--delay:120ms">${icon('video')}<p class="g-eyebrow">${o.soonEyebrow}</p><h3>${o.soonTitle}</h3><p>${o.soonText}</p><a class="g-text-link" href="${w.formationsHref}">${o.soonCta} ${arrow}</a></article></div></section>`;
}

// On Accompagnement: one line and a button to the agenda.
export function coachingBanner(lang) {
  const w = W[lang];
  return `<section class="c-banner"><div data-reveal>${icon('calendar')}<p>${w.banner.text}</p><a class="g-button" href="${w.bookHref}">${w.banner.cta} ${arrow}</a></div></section>`;
}

export const coachingTitles = {
  fr: { book: 'Réserver une séance de coaching', pay: 'Paiement de la séance', done: 'Votre séance', formations: 'Formations en vidéo' },
  ar: { book: 'احجزوا جلسة كوتشينغ', pay: 'دفع الجلسة', done: 'جلستكم', formations: 'دورات بالفيديو' }
};
