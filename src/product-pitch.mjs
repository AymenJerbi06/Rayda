// What a visitor needs at the top of a product page: one line saying what the piece is (French and
// Arabic), how ordering works in three steps, and, where one exists, a few exact words from a real
// client message about that kind of piece. Rayda's full texts stay in product-texts.mjs.
import { reviews } from './reviews.mjs';
import { reviewsAr } from './reviews-ar.mjs';

export const productPitch = {
  'bracelet-bazi': {
    fr: 'Un bracelet en pierres, composé par Rayda selon votre carte BaZi.',
    ar: 'سوار من الأحجار تركّبه رايدة حسب خريطة البازي الخاصة بكم.'
  },
  'collier-bazi': {
    fr: 'Un collier complet, composé par Rayda selon votre carte BaZi.',
    ar: 'قلادة كاملة تركّبها رايدة حسب خريطة البازي الخاصة بكم.'
  },
  'bracelet-amour': {
    // Rayda's own sentence for this bracelet (its catalogue description), short enough to lead the page.
    fr: 'Un bracelet pour activer l’énergie de l’amour, charger l’aura de vibrations d’amour et purifier le chakra du cœur des sentiments de tristesse.',
    ar: 'سوار لتفعيل طاقة الحب و شحن الهالة بذبذبات الحب و تنظيف شاكرا القلب من مشاعر الحزن.'
  },
  'porte-cles-pierre': {
    fr: 'Un porte-clés à pierre pendante, avec un anneau doré et une breloque en forme de clé.',
    ar: 'ميدالية بحجر معلّق وحلقة ذهبية وبريلوك على شكل مفتاح.'
  },
  'porte-cles-arbre-vie': {
    fr: 'Un porte-clés Arbre de Vie en fil enroulé, avec des perles colorées.',
    ar: 'ميدالية شجرة الحياة بخيط ملفوف وخرز ملوّن.'
  },
  'portefeuille-hafidha': {
    fr: 'Un portefeuille en cuir naturel, dont la couleur est choisie selon votre carte BaZi.',
    ar: 'محفظة من الجلد الطبيعي، يُختار لونها حسب خريطة البازي الخاصة بكم.'
  },
  'carte-million-dollar': {
    fr: 'Une carte dorée à glisser dans votre portefeuille ou à poser sur votre bureau.',
    ar: 'كرت ذهبي تضعونه في محفظتكم أو على مكتبكم.'
  },
  'decor-abondance': {
    fr: 'Un décor doré qui réunit le dollar, la couronne et l’infini.',
    ar: 'ديكور ذهبي يجمع رمز الدولار والتاج الملكي ورمز اللانهاية.'
  },
  'cle-de-vie': {
    fr: 'La Clé de Vie dorée (Ankh), à poser sur votre bureau ou chez vous.',
    ar: 'مفتاح الحياة الذهبي (العنخ)، لمكتبكم أو لمنزلكم.'
  },
  'fleur-de-vie': {
    fr: 'Un décor doré Fleur de Vie pour votre salon, votre bureau ou votre coin méditation.',
    ar: 'ديكور زهرة الحياة الذهبي لغرفة المعيشة أو المكتب أو ركن التأمل.'
  },
  'pendentif-voiture-fleur': {
    fr: 'Un pendentif doré Fleur de Vie, à suspendre au rétroviseur.',
    ar: 'تعليقة ذهبية بزهرة الحياة لمرآة السيارة.'
  },
  'pendentif-voiture-ankh': {
    fr: 'Un pendentif doré Clé de Vie, à suspendre au rétroviseur.',
    ar: 'تعليقة ذهبية بمفتاح الحياة لمرآة السيارة.'
  }
};

// The ordering steps match the checkout: no online payment, Rayda calls, delivery paid on arrival.
export const orderSteps = {
  fr: {
    title: 'Comment ça se passe',
    custom: [
      ['Vous commandez', 'Sans rien payer en ligne.'],
      ['Rayda vous appelle', 'Elle vous demande vos informations de naissance et vous propose la composition.'],
      ['Vous recevez votre pièce', 'Livraison en Tunisie, paiement à la livraison.']
    ],
    ready: [
      ['Vous commandez', 'Sans rien payer en ligne.'],
      ['Rayda vous appelle', 'Pour confirmer la pièce, le prix et votre adresse.'],
      ['Vous recevez votre pièce', 'Livraison en Tunisie, paiement à la livraison.']
    ]
  },
  ar: {
    title: 'كيف تتم العملية',
    custom: [
      ['تطلبون القطعة', 'دون أي دفع عبر الإنترنت.'],
      ['تتصل بكم رايدة', 'تطلب منكم معلومات الميلاد وتقترح عليكم التركيبة.'],
      ['تستلمون قطعتكم', 'التوصيل في تونس والدفع عند الاستلام.']
    ],
    ready: [
      ['تطلبون القطعة', 'دون أي دفع عبر الإنترنت.'],
      ['تتصل بكم رايدة', 'لتأكيد القطعة والسعر وعنوانكم.'],
      ['تستلمون قطعتكم', 'التوصيل في تونس والدفع عند الاستلام.']
    ]
  }
};

// Exact pieces of a client's message (her Arabic, and the French translation shown on French pages),
// joined with "…". Only on the piece the message is about; tests check every piece is a real substring.
export const productReviewParts = {
  'bracelet-bazi': {
    id: 'confiance',
    ar: ['من وقت إستلامي البراسلي الي خدمتهالي حسب خريطة البازي الخاصة بي', 'حتى أني موش عارفة كيفاش اكتسبت هل الثقة بالنفس الكبيرة'],
    fr: ['depuis que j’ai reçu le bracelet que tu m’as fait selon ma carte BaZi', 'je ne sais même pas comment j’ai acquis cette grande confiance en moi']
  },
  'collier-bazi': {
    id: 'fille',
    ar: ['وربي يعلم بنتي تحسنت نفسيتها برشا وصارت محبة للجو وتضحك و متفرهدة'],
    fr: ['Dieu sait que le moral de ma fille s’est beaucoup amélioré : elle a de nouveau envie de sortir et de s’amuser, elle rit, elle est épanouie.']
  }
};

const excerpt = (full, parts) => {
  const text = full.replace(/\s+/g, ' ').trim();
  const start = text.startsWith(parts[0]) ? '' : '… ';
  const end = text.endsWith(parts[parts.length - 1]) ? '' : ' …';
  return start + parts.join(' … ') + end;
};

export function productReview(productId) {
  const parts = productReviewParts[productId];
  if (!parts) return null;
  const review = reviews.find(r => r.id === parts.id);
  const reviewAr = reviewsAr.find(r => r.id === parts.id);
  return {
    id: parts.id,
    ar: excerpt(review.ar, parts.ar),
    fr: excerpt(review.fr, parts.fr),
    theme: review.theme,
    themeAr: reviewAr.theme,
    context: review.context,
    contextAr: reviewAr.context
  };
}
