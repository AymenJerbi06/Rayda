// Arabic pages show the same messages as reviews.mjs, in the clients' own words, with Arabic labels.
// The Arabic text itself lives only in reviews.mjs, so the two language versions can never drift apart.
import { reviews } from './reviews.mjs';

const labels = {
  "sihem-calme": { theme: "الهدوء النفسي", context: "رسالة وصلت لرايدا · القطعة غير محددة" },
  "nada-bracelets": { theme: "أشياء جميلة تغيّرت", context: "حول أساورها" },
  "ines-travail": { theme: "عمل جديد", context: "بعد حافظة المال الثالثة" },
  "ichraf-collier": { theme: "راحة غير متوقعة", context: "حول سلسلتها" },
  "ichraf-courage": { theme: "شجاعة العودة إلى السياقة", context: "حول السلسلة نفسها" },
  "fawzia-bracelets": { theme: "جزء منها", context: "حول أساورها" },
  "fatma-projet": { theme: "مشروعها المنزلي", context: "رسالة وصلت لرايدا · القطعة غير محددة" },
  "dorra-projet": { theme: "مشروع يتقدّم", context: "الحافظة وسوار منذ أفريل" },
  "nadia-bracelet": { theme: "رجعت الروح", context: "حول سوارها" },
  "warda-portefeuille": { theme: "الحافظة الحمراء", context: "حافظة حمراء اشترتها العام الماضي" },
  "nesrine-rempart": { theme: "كالحصن", context: "خلال خدمة ما بعد البيع · حول سوارها" },
  "fatma-fille": { theme: "من أجل ابنتها", context: "بعد قلادة ابنتها" },
  "fawzia-abondance": { theme: "الحافظة وسوار الوفرة", context: "حول كل ما أخذته من رايدا" },
  "farah-portefeuille": { theme: "مع العام الجديد", context: "بعد أسبوع من حافظة المال" },
  "farah-fille": { theme: "ابنتها أيضًا", context: "حول سوار ابنتها" }
};

export const reviewsAr = reviews.map(review => ({ id: review.id, name: review.name, theme: labels[review.id].theme, quote: review.ar, context: labels[review.id].context }));
