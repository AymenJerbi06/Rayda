// The homepage after the hero, in five chapters (24 November 2026, night): the shop, coaching and courses, Rayda
// and her method, the clients' words, and how to order. Each chapter is about one thing and says so in its label.
// A bar of the five chapters sticks to the top once the hero is passed, and the chapter on screen lights up there
// with a small leaf (src/home.js, home.css). The hero above stays exactly as it was.
import { escapeHtml as esc, deliveryLabel, deliveryLabelAr } from './commerce-core.js';

const arrow = '<span aria-hidden="true">↗</span>';
// One leaf of the site's drawing, the same one the booking steps use.
const leafMark = '<svg viewBox="246 2 86 110" aria-hidden="true"><path fill="currentColor" d="M253 108C250 44 282 14 318 7C327 56 300 100 253 108Z"/></svg>';
const chevron = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';

export const chapterIds = ['boutique', 'coaching', 'rayda', 'avis', 'commander'];

export const H = {
  fr: {
    guide: 'Sur cette page',
    chips: ['Boutique', 'Coaching', 'Rayda', 'Avis', 'Commander'],
    shop: {
      eyebrow: 'LA BOUTIQUE',
      title: 'Les créations <br />de Rayda.',
      intro: 'Huit familles de pièces. Ou trois chemins, selon ce que vous cherchez.',
      tabsLabel: 'Parcourir la boutique',
      tabs: ['Par famille', 'Par besoin'],
      pathsIntro: 'Choisissez ce qui vous ressemble : chaque chemin réunit les pièces pensées pour ce que vous cherchez.',
      caption: 'Les photos sont des mises en scène créées à partir des photos de Rayda.',
      all: 'Toute la boutique', allHref: '/collections/all/'
    },
    rayda: { eyebrow: 'RAYDA ET SA MÉTHODE' },
    reviews: {
      eyebrow: 'AVIS DES CLIENTES',
      title: 'Vos mots, <br />sa plus belle récompense.',
      intro: 'Quinze messages envoyés à Rayda, mot pour mot, chacun avec sa capture d’écran.',
      noticed: 'Ce que les clientes remarquent',
      changes: ['Plus de calme au quotidien', 'Davantage de confiance en soi', 'Une relation plus sereine à l’argent', 'Un sentiment de lien et de soutien'],
      label: 'Messages de clientes', prev: 'Message précédent', next: 'Message suivant', of: 'sur',
      note: 'Chaque message raconte l’expérience d’une cliente. Les pièces accompagnent une intention et des efforts : elles ne garantissent aucun résultat, financier ou autre.',
      all: 'Lire tous les témoignages', allHref: '/vos-mots/'
    },
    order: {
      eyebrow: 'COMMANDER',
      title: 'Commander, <br />simplement.',
      intro: 'Trois étapes, sans rien payer en ligne.',
      steps: [
        ['Vous commandez', 'Sans rien payer en ligne. Pour une pièce composée pour vous, vous indiquez aussi votre date de naissance.'],
        ['Nous vous contactons', 'Pour confirmer la pièce, le prix et votre adresse.'],
        ['Vous recevez votre pièce', `Livraison en Tunisie pour ${deliveryLabel}, paiement à la livraison.`]
      ],
      shop: 'Voir la boutique', shopHref: '/collections/all/',
      question: 'Une question avant de commander ?', whatsapp: 'Échanger sur WhatsApp'
    }
  },
  ar: {
    guide: 'في هذه الصفحة',
    chips: ['المتجر', 'الكوتشينغ', 'رايدا', 'الآراء', 'الطلب'],
    shop: {
      eyebrow: 'المتجر',
      title: 'إبداعات <br />رايدا.',
      intro: 'ثمانية أصناف من القطع، أو ثلاثة طرق حسب ما تبحثون عنه.',
      tabsLabel: 'تصفّح المتجر',
      tabs: ['حسب الصنف', 'حسب الحاجة'],
      pathsIntro: 'اختاروا ما يشبهكم: كل طريق يجمع القطع المُفكَّر فيها لما تبحثون عنه.',
      caption: 'الصور مشاهد مُعَدّة انطلاقًا من صور رايدا.',
      all: 'كل المتجر', allHref: '/ar/boutique/'
    },
    rayda: { eyebrow: 'رايدا ومقاربتها' },
    reviews: {
      eyebrow: 'آراء الزبائن',
      title: 'كلماتكم، <br />أجمل مكافأة.',
      intro: 'خمس عشرة رسالة وصلت إلى رايدا، بصيغتها الأصلية، ومع كل رسالة صورتها.',
      noticed: 'ما يلاحظه الزبائن',
      changes: ['مزيد من الهدوء في الحياة اليومية', 'ثقة أكبر بالنفس', 'علاقة أكثر سكينة بالمال', 'إحساس بالرابط والدعم'],
      label: 'رسائل الزبائن', prev: 'الرسالة السابقة', next: 'الرسالة التالية', of: 'من',
      note: 'كل رسالة تحكي تجربة زبونة. القطع ترافق النيّة والسعي، ولا تضمن أي نتيجة، مالية أو غيرها.',
      all: 'اقرأوا كل الشهادات', allHref: '/ar/vos-mots/'
    },
    order: {
      eyebrow: 'الطلب',
      title: 'الطلب، <br />ببساطة.',
      intro: 'ثلاث خطوات، دون أي دفع عبر الإنترنت.',
      steps: [
        ['تطلبون القطعة', 'دون أي دفع عبر الإنترنت. وللقطع المُركّبة خصيصًا لكم، تُدخلون أيضًا تاريخ ميلادكم.'],
        ['يقع الاتصال بكم', 'لتأكيد القطعة والسعر وعنوانكم.'],
        ['تستلمون قطعتكم', `التوصيل في تونس بـ${deliveryLabelAr}، والدفع عند الاستلام.`]
      ],
      shop: 'تصفّحوا المتجر', shopHref: '/ar/boutique/',
      question: 'سؤال قبل الطلب؟', whatsapp: 'تواصلوا عبر واتساب'
    }
  }
};

// The bar of chapters. It sits under the hero, then sticks to the top while the chapters scroll by.
export function homeGuide(lang) {
  const h = H[lang];
  return `<nav class="h-guide" aria-label="${h.guide}" data-home-guide><div class="h-guide-inner"><p class="h-guide-label">${h.guide}</p><ol class="h-guide-list">${chapterIds.map((id, i) => `<li><a class="h-chip" href="#${id}" data-chapter="${id}"><span class="h-chip-leaf">${leafMark}</span><span>${h.chips[i]}</span></a></li>`).join('')}</ol></div></nav>`;
}

// 1. The shop: one heading, then two ways in. Without JavaScript both show, one under the other.
export function shopChapter(lang, { groups, paths }) {
  const s = H[lang].shop;
  return `<section class="s-home-categories h-chapter h-shop" id="boutique" aria-labelledby="h-shop-title"><div class="s-category-layout"><div class="s-category-heading" data-reveal="up"><p class="g-eyebrow">${s.eyebrow}</p><h2 class="g-display" id="h-shop-title">${s.title}</h2><p class="s-category-intro">${s.intro}</p><a class="g-text-link" href="${s.allHref}">${s.all} ${arrow}</a></div>
<div class="h-shop-body"><div class="h-tabs" role="tablist" aria-label="${s.tabsLabel}" data-shop-tabs hidden><button type="button" role="tab" id="h-tab-creations" aria-controls="creations" aria-selected="true">${s.tabs[0]} <span class="h-tab-count">8</span></button><button type="button" role="tab" id="h-tab-chemins" aria-controls="chemins" aria-selected="false" tabindex="-1">${s.tabs[1]} <span class="h-tab-count">3</span></button><span class="h-tabs-pill" aria-hidden="true"></span></div>
<div class="h-panel" id="creations" role="tabpanel" aria-labelledby="h-tab-creations"><div class="s-category-grid">${groups}</div><p class="s-category-caption">${s.caption}</p></div>
<div class="h-panel h-panel-paths" id="chemins" role="tabpanel" aria-labelledby="h-tab-chemins"><p class="h-panel-intro">${s.pathsIntro}</p>${paths}</div></div></div></section>`;
}

// 4. The clients' words: what they notice, then their messages one at a time (swipe, or the arrows).
export function reviewsChapter(lang, cards) {
  const r = H[lang].reviews;
  return `<section class="h-chapter h-reviews-chapter" id="avis" aria-labelledby="h-reviews-title"><div class="h-reviews-head" data-reveal="up"><p class="g-eyebrow">${r.eyebrow}</p><h2 class="g-display" id="h-reviews-title">${r.title}</h2><p class="h-lede">${r.intro}</p></div>
<div class="h-noticed" data-reveal="up"><p class="h-noticed-title">${r.noticed}</p><ul>${r.changes.map(change => `<li><span class="h-noticed-leaf">${leafMark}</span>${change}</li>`).join('')}</ul></div>
<div class="h-reviews" data-reviews><div class="h-reviews-frame"><button class="h-reviews-nav is-prev" type="button" data-reviews-prev aria-label="${r.prev}" hidden>${chevron}</button><ul class="h-reviews-track" data-reviews-track aria-label="${r.label}" tabindex="0">${cards.map((card, i) => `<li class="h-review" data-review aria-label="${i + 1} ${r.of} ${cards.length}">${card}</li>`).join('')}</ul><button class="h-reviews-nav is-next" type="button" data-reviews-next aria-label="${r.next}" hidden>${chevron}</button><p class="h-reviews-count" aria-hidden="true"><bdi dir="ltr"><b data-reviews-count>1</b> / ${cards.length}</bdi></p></div></div>
<p class="g-reviews-note h-reviews-note">${r.note}</p><a class="g-button" href="${r.allHref}">${r.all} ${arrow}</a></section>`;
}

// 5. How ordering works: three real steps, then the shop or a question on WhatsApp.
export function orderChapter(lang, whatsapp) {
  const o = H[lang].order;
  return `<section class="h-chapter h-order" id="commander" aria-labelledby="h-order-title"><div class="h-order-head" data-reveal="up"><p class="g-eyebrow">${o.eyebrow}</p><h2 class="g-display" id="h-order-title">${o.title}</h2><p class="h-lede">${o.intro}</p></div><ol class="h-order-steps">${o.steps.map(([title, text], i) => `<li data-reveal="up" style="--delay:${i * 120}ms"><span class="h-step-number" aria-hidden="true">${i + 1}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join('')}</ol><div class="h-order-actions" data-reveal="up"><a class="g-button" href="${o.shopHref}">${o.shop} ${arrow}</a><p>${o.question} <a class="g-text-link" href="${whatsapp}" target="_blank" rel="noopener noreferrer">${o.whatsapp} ${arrow}</a></p></div></section>`;
}
