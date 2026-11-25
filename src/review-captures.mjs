// The real message behind each review: the screenshots Rayda sent on WhatsApp on 22 November 2026, one per review,
// kept in assets/avis/<review id>.webp (900px wide at most). A button under every review opens its screenshot:
// src/ux.js shows it in a dialog over the page, and without JavaScript the link opens the picture itself.
// Before publishing, the clients' profile pictures were blurred, and so was the first name of Fatma's daughter
// (Rayda asked for « ر » only). Width and height are the files' own, so the dialog keeps its shape while loading.
import { escapeHtml as esc } from './commerce-core.js';

export const reviewCaptures = {
  'sihem-calme': { width: 900, height: 1030 },
  'nada-bracelets': { width: 590, height: 1280 },
  'ines-travail': { width: 867, height: 1280 },
  'ichraf-collier': { width: 590, height: 1280 },
  'ichraf-courage': { width: 900, height: 406 },
  'fawzia-bracelets': { width: 900, height: 344 },
  'fatma-projet': { width: 900, height: 685 },
  'dorra-projet': { width: 900, height: 1189 },
  'nadia-bracelet': { width: 900, height: 280 },
  'warda-portefeuille': { width: 900, height: 428 },
  'nesrine-rempart': { width: 900, height: 625 },
  'fatma-fille': { width: 900, height: 556, daughter: true },
  'fawzia-abondance': { width: 900, height: 890 },
  'farah-portefeuille': { width: 744, height: 1280 },
  'farah-fille': { width: 900, height: 273 }
};

export const captureSrc = id => `/assets/avis/${id}.webp`;

// A phone showing a message, drawn like the site's other line icons.
const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.6"/><path d="M9 7h6v4.2h-3.4L9.8 13v-1.8H9Z"/><path d="M10.8 18.4h2.4"/></svg>';

export const captureWords = {
  fr: {
    button: 'Voir la capture d’écran',
    note: 'Capture d’écran de la conversation, envoyée par Rayda. Les photos de profil sont floutées.',
    daughter: 'Capture d’écran de la conversation, envoyée par Rayda. Les photos de profil et le prénom de sa fille sont floutés.',
    alt: name => `Capture d’écran du message de ${name}`
  },
  ar: {
    button: 'شاهدوا صورة الرسالة',
    note: 'لقطة شاشة من المحادثة، أرسلتها رايدا. صور الملف الشخصي مموّهة.',
    daughter: 'لقطة شاشة من المحادثة، أرسلتها رايدا. صور الملف الشخصي واسم ابنتها مموّهة.',
    alt: name => `لقطة شاشة لرسالة ${name}`
  }
};

// The button under a review. `context` is the line the card shows after the client's name, in the page's language.
export function captureLink(review, lang, context) {
  const capture = reviewCaptures[review.id];
  if (!capture) return '';
  const words = captureWords[lang];
  return `<a class="g-capture-link" href="${captureSrc(review.id)}" data-capture="${capture.width}x${capture.height}" data-capture-name="${esc(review.name)}" data-capture-context="${esc(context)}" data-capture-note="${esc(capture.daughter ? words.daughter : words.note)}" data-capture-alt="${esc(words.alt(review.name))}">${phoneIcon}<span>${words.button}</span></a>`;
}
