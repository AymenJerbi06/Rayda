// What a visitor needs at the top of a product page: one line saying what the piece is (French and
// Arabic), how ordering works in three steps, and, where one exists, a few exact words from a real
// client message about that kind of piece. Rayda's full texts stay in product-texts.mjs.
import { reviews } from './reviews.mjs';
import { reviewsAr } from './reviews-ar.mjs';

export const productPitch = {
  'bracelet-bazi': {
    fr: 'Un bracelet en pierres, composé par Rayda selon votre carte BaZi.',
    ar: 'سوار من الأحجار تركّبه رايدا حسب خريطة البازي الخاصة بكم.'
  },
  'collier-bazi': {
    fr: 'Un collier complet, composé par Rayda selon votre carte BaZi.',
    ar: 'قلادة كاملة تركّبها رايدا حسب خريطة البازي الخاصة بكم.'
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
  },
  'livre-excellence': {
    fr: 'Un recueil d’exercices et d’applications pour réussir à l’école, du primaire au baccalauréat, avec un accompagnement tout au long de l’année.',
    ar: 'مجموعة تمارين وتطبيقات للتألق في الدراسة، من الابتدائي إلى الباكالوريا، مع متابعة متواصلة لمدة سنة كاملة.'
  },
  'accessoires-apprentissage': {
    fr: 'Un bracelet ou un collier en pierres pour accompagner les études, préparé par Rayda à partir de votre date de naissance.',
    ar: 'سوار أو قلادة من الأحجار لمرافقة الدراسة، تحضّرها رايدا انطلاقًا من تاريخ ميلادكم.'
  },
  'bouteille-verre': {
    fr: 'Une bouteille d’eau en verre d’un litre, imprimée de versets du Coran et d’affirmations positives, pour accompagner votre enfant dans ses études.',
    ar: 'قارورة ماء من البلور بسعة لتر، عليها آيات قرآنية وتوكيدات إيجابية، لمرافقة طفلكم في دراسته.'
  },
  'collier-cle': {
    fr: 'Un collier doré en acier inoxydable, avec un pendentif clé serti de petites pierres brillantes : un symbole de chance et d’ouverture des portes.',
    ar: 'قلادة ذهبية اللون من الفولاذ المقاوم للصدإ، بمفتاح مرصّع بأحجار صغيرة لامعة: رمز للحظ والتسهيل.'
  },
  // Same words as the description: Rayda has not sent a text for the coins yet, so there is nothing else to show.
  'pieces-feng-shui': {
    fr: 'Trois pièces chinoises nouées d’un fil rouge : un objet Feng Shui que Rayda propose pour l’abondance financière.',
    ar: 'ثلاث قطع نقدية صينية مربوطة بخيط أحمر، من منتجات الفنج شوي التي تقترحها رايدا للوفرة المالية.'
  },
  'grenouille-fortune': {
    fr: 'Une grenouille de la fortune dorée (Chan Chu), assise sur des pièces, une pièce dans la bouche : un symbole Feng Shui de richesse, chargé en Reiki de l’Argent.',
    ar: 'ضفدع المال الذهبي (تشان تشو)، يجلس على كومة من العملات ويحمل في فمه عملة: رمز فنج شوي للثروة، مشحون بريكي المال.'
  },
  'trophee-amour': {
    fr: 'Deux cygnes en miroir doré dont les cous dessinent un cœur : un symbole d’amour durable pour la chambre ou le salon, chargé par le Reiki et le Saint Coran.',
    ar: 'بجعتان بلون ذهبي مرآوي تشكّل رقبتاهما قلبًا: رمز للحب الدائم لغرفة النوم أو مساحة المعيشة، مشحون بالريكي والقرآن الكريم.'
  },
  'bouteille-amour': {
    fr: 'Une bouteille d’eau en verre d’un litre, imprimée de versets du Coran, des Beaux Noms d’Allah et de symboles : pour l’amour, la tendresse et l’harmonie du couple.',
    ar: 'قارورة ماء من البلور بسعة لتر، عليها آيات قرآنية وأسماء الله الحسنى ورموز طاقية: للمودة والرحمة والعلاقة الجميلة بين الزوجين.'
  },
  // The four keyrings: Rayda's own sentence for each (its catalogue description), short enough to lead the page.
  'porte-cles-amour': {
    fr: 'Un porte-clés énergétique chargé, conçu pour programmer le subconscient à l’amour, à la tendresse, à la compassion et à une relation amoureuse durable.',
    ar: 'حامل مفاتيح مشحون يبرمج اللاوعي على المودة و الرحمة و علاقة الحب الدائمة'
  },
  'porte-cles-chance': {
    fr: 'Un porte-clés énergétique chargé, conçu pour programmer le subconscient à attirer la chance et à favoriser la fluidité et la facilité dans la vie.',
    ar: 'حامل مفاتيح مشحون يبرمج اللاوعي على الحظ و التسهيل'
  },
  'porte-cles-voyage': {
    fr: 'Un porte-clés énergétique chargé, conçu pour programmer le subconscient à faciliter les voyages et à favoriser les déplacements en toute fluidité.',
    ar: 'حامل مفاتيح مشحون يبرمج اللاوعي على تسهيل السفر'
  },
  'porte-cles-protection': {
    fr: 'Un porte-clés énergétique chargé, conçu pour programmer le subconscient à se protéger des énergies négatives et à renforcer son bouclier énergétique.',
    ar: 'حامل مفاتيح مشحون يبرمج اللاوعي على الحماية من الطاقات السلبية و التدرع الطاقي'
  }
};

// The ordering steps match the checkout: no online payment, Rayda calls, delivery paid on arrival.
export const orderSteps = {
  fr: {
    title: 'Comment ça se passe',
    custom: [
      ['Vous commandez', 'Vous indiquez votre date de naissance, sans rien payer en ligne.'],
      ['Nous vous contactons', 'Pour confirmer votre pièce, le prix et votre adresse.'],
      ['Vous recevez votre pièce', 'Livraison en Tunisie, paiement à la livraison.']
    ],
    ready: [
      ['Vous commandez', 'Sans rien payer en ligne.'],
      ['Nous vous contactons', 'Pour confirmer la pièce, le prix et votre adresse.'],
      ['Vous recevez votre pièce', 'Livraison en Tunisie, paiement à la livraison.']
    ]
  },
  ar: {
    title: 'كيف تتم العملية',
    custom: [
      ['تطلبون القطعة', 'تُدخلون تاريخ ميلادكم، دون أي دفع عبر الإنترنت.'],
      ['يقع الاتصال بكم', 'لتأكيد قطعتكم والسعر وعنوانكم.'],
      ['تستلمون قطعتكم', 'التوصيل في تونس والدفع عند الاستلام.']
    ],
    ready: [
      ['تطلبون القطعة', 'دون أي دفع عبر الإنترنت.'],
      ['يقع الاتصال بكم', 'لتأكيد القطعة والسعر وعنوانكم.'],
      ['تستلمون قطعتكم', 'التوصيل في تونس والدفع عند الاستلام.']
    ]
  }
};

// Exact pieces of a client's message (her Arabic, and the French translation shown on French pages),
// joined with "…". Only on the piece the message is about; tests check every piece is a real substring.
export const productReviewParts = {
  'bracelet-bazi': {
    id: 'nadia-bracelet',
    ar: ['هزيت البراسلي ولبستها والله رجعتلي الروح'],
    fr: ['J’ai pris le bracelet et je l’ai mis : vraiment, il m’a redonné vie.']
  },
  'collier-bazi': {
    id: 'ichraf-collier',
    ar: ['مللي لبست السلسلة وليت حتى في النوم مانجمش نستغنى عليها', 'حسيت بالقوة بالثيقة بالراحة الطمأنينة'],
    fr: ['depuis que je porte le collier : même pour dormir, je ne peux plus m’en passer.', 'je me suis sentie forte, confiante, apaisée, sereine.']
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
    name: review.name,
    ar: excerpt(review.ar, parts.ar),
    fr: excerpt(review.fr, parts.fr),
    theme: review.theme,
    themeAr: reviewAr.theme,
    context: review.context,
    contextAr: reviewAr.context
  };
}
