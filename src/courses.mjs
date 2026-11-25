// Rayda's video courses, shown on /formations/ as coming soon. She has no videos yet; these four themes come from
// what she already offers (her goals, BaZi, abundance and study pieces) and the page says the titles may change.
// The admin's "Formations" page starts from this same list (src/courses-data.js is generated from it at build).
export const courses = [
  {
    id: 'objectifs', status: 'soon',
    fr: { title: 'Atteindre vos objectifs', text: 'Clarifier ce que vous voulez, poser une intention et avancer pas à pas.' },
    ar: { title: 'حقّقوا أهدافكم', text: 'وضوح ما تريدونه، تحديد نيّة، ثم التقدّم خطوة بخطوة.' },
    chapters: {
      fr: ['Clarifier ce que vous voulez', 'Poser votre intention', 'Passer à l’action, pas à pas', 'Garder le cap'],
      ar: ['وضوح ما تريدونه', 'تحديد نيّتكم', 'الانطلاق خطوة بخطوة', 'المحافظة على الطريق']
    }
  },
  {
    id: 'bazi', status: 'soon',
    fr: { title: 'Votre carte BaZi, les bases', text: 'Découvrir les éléments de votre date de naissance et ce qu’ils racontent de vous.' },
    ar: { title: 'خريطة البازي: الأساسيات', text: 'اكتشاف عناصر تاريخ ميلادكم وما تحكيه عنكم.' }
  },
  {
    id: 'abondance', status: 'soon',
    fr: { title: 'L’énergie de l’abondance', text: 'Les symboles et les rituels de l’abondance que Rayda utilise dans ses créations.' },
    ar: { title: 'طاقة الوفرة', text: 'رموز الوفرة وطقوسها التي تعتمدها رايدا في إبداعاتها.' }
  },
  {
    id: 'etudes', status: 'soon',
    fr: { title: 'Réussir ses études', text: 'Concentration, organisation et confiance, pour les élèves et leurs parents.' },
    ar: { title: 'التألق الدراسي', text: 'التركيز والتنظيم والثقة، للتلاميذ وأوليائهم.' }
  }
];
