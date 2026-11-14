// Arabic pages show the same messages as reviews.mjs, in the clients' own words, with Arabic labels.
// The Arabic text itself lives only in reviews.mjs, so the two language versions can never drift apart.
import { reviews } from './reviews.mjs';

const labels = {
  calme: { theme: 'شعور بالهدوء', context: 'رسالة وصلت لرايدا · القطعة غير محددة' },
  lien: { theme: 'العلاقة مع رايدا', context: 'ردًّا على ستوري فيها سوار' },
  fille: { theme: 'من أجل ابنتها', context: 'بعد قلادة طلبتها لابنتها' },
  confiance: { theme: 'الثقة بالنفس', context: 'حول سوار صُمّم حسب خريطة البازي الخاصة بها' },
  'trois-ans': { theme: 'بعد ثلاث سنوات', context: 'رسالة بعد ثلاث سنوات من شراء سوارين' }
};

export const reviewsAr = reviews.map(review => ({ id: review.id, theme: labels[review.id].theme, quote: review.ar, context: labels[review.id].context }));
