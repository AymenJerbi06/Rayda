// Rayda's own descriptions of her pieces, as she sent them on WhatsApp: her Arabic word for word (only the
// emojis and the spacing around punctuation are tidied), with a French translation for the French pages.
// The opening lines of each text are the product `description` in catalog.js (French) and catalog-ar.mjs
// (Arabic), shown beside the price; everything after them appears under the photos and buy box.
// The car pendant with the Key of Life uses the Flower of Life pendant's text with the symbol changed:
// Rayda only said it is the same pendant (same size, same price) with the Ankh, so she should confirm it.
// Her book and learning accessories (15 November): her Arabic word for word, and her own French for both; the book's
// opening question and closing line, and the accessories' last line (the stones can vary), are translated into French
// here. Her water bottle and key necklace (the same night): her texts in both languages; the first words of her French
// bottle text were lost in her copy (it starts at "complémentaires :"), so they are translated from her Arabic.
// Her money frog and love trophy (19 November): her texts in both languages. Her French trophy text was cut off after
// its first "why now" point in the screenshots, so its heading, its last two points and its closing line are translated
// from her Arabic; her Arabic trophy heading drops the name in front of it ("رمز الحب (Trophée d'Amour): ").
const bazi = {
  fr: {
    "title": "Une pièce qui porte votre empreinte",
    "intro": [
      "Des couleurs et des formes jusqu’aux composants et aux nombres, l’accessoire est construit selon une lecture individuelle de votre carte, pour devenir une pièce qui porte votre empreinte. Votre pièce est ensuite chargée selon les objectifs auxquels vous aspirez, avec l’énergie du Reiki, les plus beaux noms d’Allah et le Saint Coran, pour que le bracelet ou le collier, par exemple, soit pour vous le plus bel ajout."
    ]
  },
  ar: {
    "title": "قطعة تحمل طابعك الخاص",
    "intro": [
      "من الألوان والأشكال إلى المكونات و الأرقام، يتم بناء الأكسسوار وفق قراءة فردية لخريطتك، ليصبح قطعة تحمل طابعك الخاص ثم يتم بعد ذلك شحن قطعتك الخاصة وفق الاهداف التي تطمح إليها بطاقة الريكي و أسماء الله الحسنى و القرآن الكريم ليقدم لك السوار أو القلادة مثلا أجمل إضافة."
    ]
  }
};
const portefeuilleHafidha = {
  fr: {
    "title": "Un système complet, réuni dans un seul objet",
    "intro": [
      "C’est de cette recherche qu’est née Hafidha El Mel (la gardienne de l’argent), pour être un système complet réuni dans un seul objet.",
      "C’est une alchimie énergétique conçue avec soin, qui rassemble différents savoirs et pratiques : elle intègre des éléments inspirés du Feng Shui, la science de l’énergie des lieux, et du Reiki de l’argent (Money Reiki), et sa couleur est choisie à partir d’une étude attentive de la carte BaZi, qui donne une image réelle de l’ADN énergétique de la personne.",
      "De plus, Hafidha El Mel est chargée de versets du Saint Coran et des plus beaux noms d’Allah. Elle vous parvient avec des cartes chargées, à contempler pour purifier et renforcer votre énergie financière, ainsi qu’un exercice qui aide à développer votre capacité à recevoir l’argent."
    ]
  },
  ar: {
    "title": "منظومة متكاملة داخل منتج واحد",
    "intro": [
      "ومن هذا البحث ولدت حافظة المال لتكون منظومة متكاملة داخل منتج واحد.",
      "إنها خلطة طاقية صُممت بعناية و جمعت معارف وممارسات مختلفة، ففيها عناصر مستوحاة من علم طاقة المكان Feng Shui وريكي المال Money Reiki، و يقع اختيار لونها انطلاقا من بحث دقيق في خريطة البازي التي تقدم صورة فعلية عن الحمض النووي الطاقي للشخص.",
      "إلى جانب ذلك فإن حافظة المال مشحونة بآيات من القرآن الكريم وأسماء الله الحسنى، وتصلك معها بطاقات مشحونة تتأملها لتنظيف طاقتك المالية و تقويتها، بالإضافة إلى تمرين يساعد على تطوير القدرة على الاستقبال المالي."
    ]
  }
};
const carteMillionDollar = {
  fr: {
    "title": "La carte Million Dollar dorée : votre porte énergétique pour attirer la richesse et l’abondance !",
    "sections": [
      {
        "title": "Le secret de sa force : une charge spéciale d’énergie « Reiki de l’argent » (Money Reiki)",
        "paragraphs": [
          "Cette carte n’est pas un simple objet de décoration : chaque carte passe par une préparation énergétique intense, au cours de laquelle je la charge et la programme avec l’énergie du Reiki de l’argent et le Saint Coran. C’est ce qui lui permet de vous aider à élever les fréquences du lieu, pour qu’elles s’accordent aux vibrations de l’abondance et de la richesse. Elle contribue ainsi à attirer des opportunités financières inattendues et à faciliter le flux du rizq dans votre quotidien, si Dieu le veut.",
          "La carte se présente dans une couleur or éclatante, avec des détails fins qui symbolisent le sommet de la réussite financière (le million de dollars), dans un design luxueux.",
          "Placée dans votre portefeuille, sur votre bureau ou sur votre lieu de travail, elle devient un ancrage visuel et énergétique qui rappelle sans cesse à votre subconscient l’objectif et l’abondance que vous méritez."
        ]
      },
      {
        "title": "Que vous apporte la carte Million Dollar dorée ?",
        "items": [
          {
            "term": "Activer la loi de l’attraction",
            "text": "Elle agit comme un outil puissant pour concrétiser les grands objectifs financiers."
          },
          {
            "term": "Un cadeau idéal et un soutien énergétique",
            "text": "Idéale à s’offrir, ou à offrir à toute personne à qui vous souhaitez réussite et succès dans son nouveau projet."
          }
        ]
      }
    ]
  },
  ar: {
    "title": "كرت المليون دولار الذهبي: بوابتك الطاقية لجذب الثراء والوفرة!",
    "sections": [
      {
        "title": "سر القوة: شحن خاص بطاقة «ريكي المال» (Money Reiki)",
        "paragraphs": [
          "هذا الكرت ليس مجرد قطعة زينة؛ فكل كرت يمر بوعاء طاقي مكثف، حيث أقوم بـشحنه وبرمجته بطاقة ريكي المال و القرآن الكريم و هو ما يجعله يساعدك على رفع ترددات المكان لتتوافق مع ذبذبات الوفرة والثراء. الشيء الذي يساهم في جذب الفرص المالية غير المتوقعة وتيسير تدفق الرزق في حياتك اليومية بإذن الله.",
          "يأتي الكرت بلون ذهبي براق وبتفاصيل دقيقة ترمز لقمة النجاح المالي (المليون دولار) في تصميم فاخر.",
          "وضعه في محفظتك، أو على مكتبك، أو في مكان عملك، يجعله مرساة بصرية وطاقية تذكر عقلك الباطن دائماً بالهدف والوفرة التي تستحقها."
        ]
      },
      {
        "title": "ماذا يقدم لك كرت المليون دولار الذهبي؟",
        "items": [
          {
            "term": "تفعيل قانون الجذب",
            "text": "يعمل كأداة قوية لتجسيد الأهداف المالية الكبرى."
          },
          {
            "term": "هدية مثالية ودعم طاقي",
            "text": "مثالي لتهديه لنفسك، أو لأي شخص تبحث له عن النجاح والتوفيق في مشروعه الجديد."
          }
        ]
      }
    ]
  }
};
const decorAbondance = {
  fr: {
    "title": "Le décor Abondance de luxe : un symbole doré de richesse, chargé d’énergie Reiki",
    "intro": [
      "Ce décor réunit trois des plus puissants symboles de manifestation : le symbole du dollar, qui représente la valeur et le flux financier ; en son centre, la couronne royale, symbole de pouvoir, d’excellence et de leadership ; et le symbole de l’infini, qui les complète pour stimuler le flux de l’abondance, charger le lieu et programmer l’inconscient avec l’énergie de l’abondance et du flux financier.",
      "Chaque pièce est fabriquée dans un or pur et brillant, et a été chargée spirituellement avec l’énergie du Reiki de l’argent et le Saint Coran."
    ],
    "sections": [
      {
        "title": "En quoi ce décor transforme votre bureau ou votre maison ?",
        "items": [
          {
            "term": "La triade des symboles de manifestation",
            "text": "Il associe (dollar + couronne + infini) pour programmer chaque jour votre subconscient à vous sentir digne d’une richesse illimitée, d’un simple regard."
          },
          {
            "term": "Une touche de décoration royale",
            "text": "Un design moderne et luxueux, d’une couleur or qui attire les regards, qui apporte une élégance exceptionnelle à votre bureau, à votre salon ou à votre coin de méditation."
          },
          {
            "term": "Le cadeau idéal pour la réussite",
            "text": "La plus belle pièce à offrir aux entrepreneurs, aux associés, ou à toute personne qui cherche à faire évoluer sa réalité financière."
          }
        ]
      },
      {
        "title": "Où placer ce décor pour en tirer le meilleur bénéfice énergétique ?",
        "steps": true,
        "items": [
          {
            "term": "Sur votre bureau",
            "text": "Pour attirer les grosses affaires, les clients de qualité et les décisions d’investissement réussies."
          },
          {
            "term": "Dans le coin de l’abondance (au sud-est de la maison)",
            "text": "Pour activer l’énergie de l’argent et la baraka dans votre foyer."
          },
          {
            "term": "Bien en vue lors de vos rendez-vous et réunions",
            "text": "Pour imposer le prestige de la réussite et donner une impression de richesse et d’excellence."
          }
        ]
      }
    ],
    "closing": "N’attendez pas les opportunités : créez dès maintenant l’environnement énergétique qui leur convient."
  },
  ar: {
    "title": "ديكور الوفرة الفاخر: رمز الثراء الذهبي المشحون بطاقة الريكي",
    "intro": [
      "هذا الديكور يجمع بين ثلاثة من أقوى رموز التجلي: رمز الدولار الذي يمثل القيمة والتدفق المالي، يتوسطه التاج الملكي الذي يرمز للسلطة والتميز والريادة، ويتكامل مع رمز اللانهاية لتحفيز تدفق الوفرة و شحن المكان و برمجة اللاوعي بطاقة الوفرة و التدفق المالي.",
      "كل قطعة مصنعة باللون الذهبي النقي اللامع، وتم شحنها روحانياً بطاقة ريكي المال و القرآن الكريم."
    ],
    "sections": [
      {
        "title": "لماذا يمثل هذا الديكور تحولاً لمكتبك أو منزلك؟",
        "items": [
          {
            "term": "ثلاثية رموز التجلي",
            "text": "يدمج (الدولار + التاج + اللانهاية) لبرمجة عقلك الباطن يومياً على استحقاق الثراء غير المحدود بمجرد النظر إليه."
          },
          {
            "term": "لمسة ديكور ملكية",
            "text": "تصميم عصري فاخر بلون ذهبي خاطف للأنظار، يضفي فخامة استثنائية على مكتبك، غرفة المعيشة، أو ركن التأمل الخاص بك."
          },
          {
            "term": "هدية مثالية للنجاح",
            "text": "القطعة الأجمل لتقديمها لرواد الأعمال، الشركاء، أو أي شخص يسعى لتطوير واقعه المالي."
          }
        ]
      },
      {
        "title": "أين تضع هذا الديكور لتحقيق أقصى استفادة طاقية؟",
        "steps": true,
        "items": [
          {
            "term": "على مكتب العمل",
            "text": "لجذب الصفقات الكبرى، العملاء المميزين، والقرارات الاستثمارية الناجحة."
          },
          {
            "term": "في ركن الوفرة (جنوب شرق المنزل)",
            "text": "لتفعيل طاقة المال والبركة في بيتك."
          },
          {
            "term": "في واجهة المقابلات أو الاجتماعات",
            "text": "لفرض هيبة النجاح وإعطاء انطباع بالثراء والتميز."
          }
        ]
      }
    ],
    "closing": "لا تنتظر الفرص بل اصنع بيئتها الطاقية المناسبة الآن."
  }
};
const cleDeVie = {
  fr: {
    "title": "Le chef-d’œuvre suprême de la manifestation : la Clé de Vie dorée, chargée de l’énergie du Reiki de l’argent et de la baraka du Saint Coran",
    "intro": [
      "Cette pièce n’est pas une simple sculpture décorative de luxe : c’est un véritable portail géométrique et spirituel pour le flux de l’abondance et de la baraka. Nous y avons réuni la richesse de l’histoire et les secrets de l’énergie vitale, grâce à une charge de Reiki de l’argent, associée à la protection et à la baraka des versets du rizq et de l’ouverture du Saint Coran."
    ],
    "sections": [
      {
        "title": "Les propriétés uniques et les bienfaits exceptionnels de la Clé de Vie dorée",
        "items": [
          {
            "term": "Géométrie sacrée et flux d’énergie",
            "text": "La Clé de Vie (Ankh) se distingue par un design géométrique unique qui agit comme un récepteur et un diffuseur d’énergie vitale. La boucle supérieure représente le flux infini de l’énergie spirituelle, tandis que la croix allongée représente l’incarnation de cette énergie dans notre monde matériel, ce qui en fait un outil idéal pour purifier votre environnement des énergies négatives et de la stagnation financière."
          },
          {
            "term": "Symbole d’ouverture et de renouveau",
            "text": "La présence de ce symbole doré et chargé dans votre espace envoie des signaux forts à votre subconscient pour qu’il s’accorde aux fréquences des ouvertures, des grandes chances et des nouveaux départs faciles et sereins, soutenus par la baraka du Saint Coran et son bel élan spirituel."
          },
          {
            "term": "L’harmonie de l’or royal",
            "text": "C’est la couleur associée, sur le plan énergétique, à la conscience de la richesse, au sentiment de mériter le meilleur et au bien-être. Son éclat apporte aussi une touche royale envoûtante, qui valorise tout lieu où il est posé."
          }
        ]
      },
      {
        "title": "Comment utiliser ce chef-d’œuvre pour transformer votre réalité financière et spirituelle ?",
        "steps": true,
        "items": [
          {
            "term": "Au centre de l’abondance de votre bureau ou de votre maison",
            "text": "Placez-le dans votre espace de travail ou d’accueil pour qu’il « filtre » l’énergie en continu et attire à vous les clients de qualité et les affaires réussies."
          },
          {
            "term": "Un outil de méditation et de concentration des intentions",
            "text": "Posez votre regard sur la géométrie sacrée de la clé pendant vos séances d’affirmations financières, pour accélérer la manifestation de vos objectifs et la construction de votre nouvelle réalité."
          },
          {
            "term": "Un aimant pour la baraka au quotidien",
            "text": "Gardez-le près de l’endroit où vous prenez vos décisions d’investissement ou écrivez vos projets, pour trouver l’inspiration et avancer avec aisance et une réussite bénie."
          }
        ]
      }
    ]
  },
  ar: {
    "title": "تحفة التجلي الأسمى: مفتاح الحياة الذهبي المشحون بطاقة ريكي المال وبركة القرآن الكريم",
    "intro": [
      "هذه القطعة ليست مجرد مجسم ديكوري فاخر، بل هي بوابة هندسية وروحانية متكاملة لتدفق الوفرة والبركة. لقد دمجنا فيه عراقة التاريخ، وأسرار الطاقة الحيوية عبر شحن الريكي المالي مع التحصين والبركة من خلال آيات الرزق والفتح من القرآن الكريم."
    ],
    "sections": [
      {
        "title": "الخصائص الفريدة والإيجابيات الاستثنائية لمفتاح الحياة الذهبي",
        "items": [
          {
            "term": "الهندسة المقدسة وتدفق الطاقة",
            "text": "يتميز مفتاح الحياة (العنخ) بتصميم هندسي فريد يعمل كمستقبل وموزع للطاقة الحيوية. الحلقة العلوية تمثل التدفق اللانهائي للطاقة الروحية، بينما يمثل التقاطع الممتد تجسيد هذه الطاقة في عالمنا المادي، مما يجعله أداة مثالية لتنظيف بيئتك من الطاقات السلبية والركود المالي."
          },
          {
            "term": "رمزية الفتح والتجدد",
            "text": "إن وجود هذا الرمز الذهبي المشحون في مساحتك يرسل إشارات قوية لعقلك الباطن بأن يكون على ترددات الفتوحات و الحظوظ العظيمة و البدايات الجديدة السهلة اليسيرة التي تتدعم ببركة القرآن الكريم و دفقه الروحاني الجميل."
          },
          {
            "term": "تناغم اللون الذهبي الملكي",
            "text": "وهو اللون المرتبط طاقياً بوعي الثراء، والاستحقاق العالي، والرفاهية. كما يُضفي لمعانه لمسة ملكية ساحرة ترفع من قيمة أي مكان يُوضع فيه."
          }
        ]
      },
      {
        "title": "كيف تستثمر هذه التحفة لتغيير واقعك المالي والروحي؟",
        "steps": true,
        "items": [
          {
            "term": "في مركز الوفرة بمكتبك أو منزلك",
            "text": "ضعه في زاوية العمل أو الاستقبال ليقوم بعملية «فلترة» مستمرة للطاقة، ويجذب إليك العملاء المميزين والصفقات الناجحة."
          },
          {
            "term": "أداة للتأمل وتركيز النوايا",
            "text": "ركز بصرك على الهندسة المقدسة للمفتاح أثناء جلسات التوكيدات المالية، لتسريع عملية تجلي الأهداف وصناعة واقعك الجديد."
          },
          {
            "term": "مغناطيس للبركة اليومية",
            "text": "اجعله قريباً من مكان اتخاذ قراراتك الاستثمارية أو كتابة خططك، لتستلهم الحلول وتتحرك بيسر وتوفيق مبارك."
          }
        ]
      }
    ]
  }
};
const fleurDeVie = {
  fr: {
    "title": "La merveille de l’harmonie cosmique : le décor Fleur de Vie doré, chargé d’énergie vitale",
    "intro": [
      "Ce décor n’est pas une simple pièce esthétique : c’est un portail énergétique et une source continue d’élévation des vibrations du lieu. Il a été conçu dans un or pur, qui symbolise le sentiment de mériter le meilleur, puis chargé et activé par vibration pour ramener l’harmonie dans votre vie et votre espace."
    ],
    "sections": [
      {
        "title": "Les propriétés exceptionnelles et les atouts uniques du décor Fleur de Vie doré",
        "items": [
          {
            "term": "Le secret de la géométrie sacrée et de la naissance de l’univers",
            "text": "La Fleur de Vie est formée de cercles entrelacés selon des proportions géométriques d’une grande précision ; elle représente le code génétique de l’univers et le plan fondamental de la création. Ce motif unique émet une fréquence vibratoire naturelle qui organise les énergies dispersées et rétablit aussitôt l’équilibre du lieu."
          },
          {
            "term": "Nettoyer et purifier l’énergie du lieu",
            "text": "Cet objet agit comme un filtre énergétique intelligent : dès qu’il est placé dans une pièce, il commence à absorber les énergies négatives, la stagnation et la tension, et les remplace par une énergie vitale renouvelée qui apporte vitalité et sérénité."
          },
          {
            "term": "Une charge énergétique intense et programmée",
            "text": "Chaque pièce a reçu une charge et une programmation qui favorisent l’abondance financière et accordent les vibrations de votre subconscient au flux universel des opportunités positives."
          },
          {
            "term": "Un aimant pour la concentration et la manifestation",
            "text": "La Fleur de Vie est considérée comme l’outil le plus puissant au monde pour les pratiquants de la méditation et du yoga : fixer le regard sur ses détails aide à apaiser l’esprit, à élever la conscience et à accélérer la manifestation des objectifs et des intentions écrites."
          },
          {
            "term": "Le luxe de l’or royal",
            "text": "Fabriquée avec une qualité exceptionnelle et un revêtement doré brillant qui reflète la lumière. La couleur or n’apporte pas seulement une touche décorative classique et luxueuse : elle renforce aussi, sur le plan énergétique, le sentiment de richesse, la confiance en soi et le bien-être."
          }
        ]
      },
      {
        "title": "Où placer la Fleur de Vie dorée pour en tirer le meilleur bénéfice ?",
        "steps": true,
        "items": [
          {
            "term": "Dans le salon ou la pièce de réception",
            "text": "Pour créer une atmosphère d’harmonie, de convivialité et de paix entre les membres de la famille ou les invités, et apaiser les tensions de la journée."
          },
          {
            "term": "Sur le bureau ou dans le coin d’étude",
            "text": "Pour renforcer la concentration, la créativité et l’organisation des idées, et ouvrir la voie à des solutions nouvelles."
          },
          {
            "term": "Dans le coin de méditation ou près du lit",
            "text": "Pour aider à une relaxation profonde, à un sommeil paisible et à charger l’aura d’énergie positive pendant la nuit."
          }
        ]
      }
    ]
  },
  ar: {
    "title": "أعجوبة التناغم الكوني: ديكور زهرة الحياة الذهبي المشحون بالطاقة الحيوية",
    "intro": [
      "هذا الديكور ليس مجرد قطعة جمالية، بل هو بوابة طاقية ومصدر مستمر لترقية ذبذبات المكان، حيث تم تصميمه باللون الذهبي النقي الذي يرمز للاستحقاق العالي، وشحنه وتفعيله اهتزازياً ليعيد التناغم إلى حياتك ومساحتك الخاصة."
    ],
    "sections": [
      {
        "title": "الخصائص الاستثنائية والمزايا الفريدة لديكور زهرة الحياة الذهبي",
        "items": [
          {
            "term": "سر الهندسة المقدسة ونشأة الكون",
            "text": "تتكون زهرة الحياة من دوائر متداخلة بنسب هندسية بالغة الدقة، وهي تمثل الشفرة الوراثية للكون ومخطط الخلق الأساسي. هذا التصميم الفريد ينبعث منه تردد اهتزازي طبيعي يعمل على تنظيم الطاقات المبعثرة وإعادة التوازن الفوري للمكان."
          },
          {
            "term": "تنظيف وتطهير طاقة المكان",
            "text": "تعمل القطعة كفلاتر طاقية ذكية؛ بمجرد وضعها في الغرفة، تبدأ في امتصاص الطاقات السلبية، طاقات الركود، والتوتر، وتستبدلها بطاقة حيوية متجددة تبث النشاط والراحة النفسية."
          },
          {
            "term": "شحن طاقي مُكثف ومبرمج",
            "text": "خضعت كل قطعة لشحن و برمجة تساعدان على الوفرة المالية و ضبط ذبذبات عقلك الباطن للتناغم مع التدفق الكوني للفرص الإيجابية."
          },
          {
            "term": "مغناطيس للتركيز والتجلي",
            "text": "تُعد زهرة الحياة الأداة الأقوى عالمياً لممارسي التأمل واليوغا؛ فالتركيز البصري في تفاصيلها يساعد على تهدئة العقل، ورفع الوعي، وتسريع تجلي الأهداف والنوايا المكتوبة."
          },
          {
            "term": "فخامة اللون الذهبي الملكي",
            "text": "صُنعت بجودة استثنائية وطلاء ذهبي براق عاكس للضوء. اللون الذهبي لا يضفي لمسة ديكور كلاسيكية فاخرة فحسب، بل يعزز طاقياً مشاعر الثراء، الثقة بالنفس، والرفاهية."
          }
        ]
      },
      {
        "title": "أين تضع زهرة الحياة الذهبية لتحقيق أقصى استفادة؟",
        "steps": true,
        "items": [
          {
            "term": "في غرفة المعيشة أو صالة الاستقبال",
            "text": "لخلق أجواء من التناغم، الألفة، والسلام بين أفراد العائلة أو الضيوف، وتقليل مشاحنات اليوم."
          },
          {
            "term": "على مكتب العمل أو ركن الدراسة",
            "text": "لزيادة التركيز، الإبداع، وتنظيم الأفكار، وفتح آفاق الحلول المبتكرة."
          },
          {
            "term": "في ركن التأمل أو بجانب السرير",
            "text": "للمساعدة على الاسترخاء العميق، النوم الهادئ، وشحن الهالة (Aura) بالطاقة الإيجابية أثناء الليل."
          }
        ]
      }
    ]
  }
};
const pendentifVoitureFleur = {
  fr: {
    "title": "Le pendentif voiture à la Fleur de Vie",
    "intro": [
      "Cette pièce, d’une couleur or pur qui reflète l’abondance et le bien-être, a été harmonisée spirituellement et énergétiquement par une charge de Reiki de l’argent, et purifiée par la baraka du Saint Coran."
    ],
    "sections": [
      {
        "title": "Les vrais atouts et caractéristiques de ce pendentif unique",
        "items": [
          {
            "term": "Harmonie et calme pendant la conduite",
            "text": "Le pendentif reprend l’ancien symbole de la « Fleur de Vie », un motif géométrique précis qui aide, visuellement et psychologiquement, à réduire la tension et à diffuser équilibre et calme, pour une conduite plus confortable et plus concentrée, même aux heures de pointe."
          },
          {
            "term": "La baraka du Saint Coran pour la protection",
            "text": "La pièce a été activée spirituellement par le Saint Coran, ce qui apporte à votre voiture une profonde sérénité et contribue à en faire un espace béni et protégé à chaque trajet."
          },
          {
            "term": "Une charge de Reiki pour l’abondance et la réussite",
            "text": "Chaque pendentif a reçu une charge d’énergie vitale de Reiki de l’argent, orientée vers la facilité dans vos démarches et l’attraction de la réussite financière, comme un rappel permanent des vibrations du succès et de l’abondance lorsque vous vous rendez au travail ou à vos projets."
          },
          {
            "term": "Un design doré, solide et moderne",
            "text": "Fabriqué avec une grande qualité, il résiste à la chaleur du soleil et dure longtemps, dans une taille idéale qui apporte à votre voiture une élégance évidente, sans gêner la visibilité ni distraire pendant la conduite."
          }
        ]
      },
      {
        "title": "En quoi cette pièce enrichit vos trajets quotidiens ?",
        "steps": true,
        "items": [
          {
            "term": "Un ancrage visuel positif",
            "text": "Sa présence constante devant vous vous rappelle de rester concentré sur la paix intérieure et sur vos objectifs financiers et professionnels, avec confiance et sérénité."
          },
          {
            "term": "Une purification continue de l’énergie du véhicule",
            "text": "Il aide à dissiper les énergies d’inquiétude et de fatigue du quotidien, et les remplace par une atmosphère de sérénité et de baraka."
          },
          {
            "term": "Un cadeau raffiné pour ceux que vous aimez",
            "text": "Un choix idéal et très original à offrir comme cadeau béni à vos amis ou à votre famille, pour l’achat d’une nouvelle voiture, ou pour remplacer un ancien pendentif par un nouveau, porteur des vibrations de la nouvelle version unique de la personne."
          }
        ]
      }
    ]
  },
  ar: {
    "title": "تعليقة السيارة بزهرة الحياة",
    "intro": [
      "هذه القطعة باللون الذهبي النقي الذي يعكس الوفرة والرفاهية، وتمت مواءمتها روحيّاً وطاقيّاً من خلال شحن الريكي المالي وتطهيرها ببركة القرآن الكريم."
    ],
    "sections": [
      {
        "title": "المزايا والخصائص الحقيقية لهذه التعليقة الفريدة",
        "items": [
          {
            "term": "تناغم وهدوء أثناء القيادة",
            "text": "يعتمد التصميم على رمز «زهرة الحياة» العريق، وهو نمط هندسي دقيق يساعد بصرياً ونفسياً على تقليل التوتر وبث التوازن والهدوء، مما يمنحك تجربة قيادة أكثر راحة وتركيزاً حتى في أوقات الازدحام."
          },
          {
            "term": "بركة القرآن الكريم للتحصين",
            "text": "تم تفعيل القطعة روحياً بالقران الكريم، مما يضفي على سيارتك طمأنينة عميقة ويساهم في جعلها مساحة مباركة ومحمية في كل رحلة."
          },
          {
            "term": "شحن الريكي للوفرة والتوفيق",
            "text": "خضعت كل تعليقة لشحن بطاقة ريكي المال الحيوية الموجهة لتيسير السعي وجذب التوفيق المالي، لتكون بمثابة تذكير دائم بذبذبات النجاح والوفرة أثناء ذهابك لعملك أو مشاريعك."
          },
          {
            "term": "تصميم ذهبي متين وعصري",
            "text": "صُنعت بجودة عالية تقاوم حرارة الشمس وتدوم طويلاً، بحجم مثالي يمنح سيارتك فخامة واضحة دون أن يحجب الرؤية أو يشتت الانتباه أثناء القيادة."
          }
        ]
      },
      {
        "title": "كيف تضفي هذه القطعة قيمة على رحلتك اليومية؟",
        "steps": true,
        "items": [
          {
            "term": "مرساة بصرية إيجابية",
            "text": "وجودها أمامك بشكل دائم يذكرك بالتركيز على السلام الداخلي وأهدافك الاستثمارية والمهنية بيقين وهدوء."
          },
          {
            "term": "تنقية مستمرة لطاقة المركبة",
            "text": "تساعد على تبديد طاقات القلق والإنهاك اليومي، مستبدلة إياها بأجواء سكينة وبركة."
          },
          {
            "term": "هدية راقية لمن تحب",
            "text": "خيار مثالي ومميز جداً لتقديمه كهدية مباركة للأصدقاء أو العائلة بمناسبة اقتناء سيارة جديدة أو لتغيير تعليقة قديمة بأخرى جديدة تحمل ذبذبات نسخة الشخص الفريدة الجديدة."
          }
        ]
      }
    ]
  }
};
const pendentifVoitureAnkh = {
  fr: {
    "title": "Le pendentif voiture à la Clé de Vie",
    "intro": [
      "Cette pièce, d’une couleur or pur qui reflète l’abondance et le bien-être, a été harmonisée spirituellement et énergétiquement par une charge de Reiki de l’argent, et purifiée par la baraka du Saint Coran."
    ],
    "sections": [
      {
        "title": "Les vrais atouts et caractéristiques de ce pendentif unique",
        "items": [
          {
            "term": "Harmonie et calme pendant la conduite",
            "text": "Le pendentif reprend l’ancien symbole de la « Clé de Vie », une forme géométrique unique qui aide, visuellement et psychologiquement, à réduire la tension et à diffuser équilibre et calme, pour une conduite plus confortable et plus concentrée, même aux heures de pointe."
          },
          {
            "term": "La baraka du Saint Coran pour la protection",
            "text": "La pièce a été activée spirituellement par le Saint Coran, ce qui apporte à votre voiture une profonde sérénité et contribue à en faire un espace béni et protégé à chaque trajet."
          },
          {
            "term": "Une charge de Reiki pour l’abondance et la réussite",
            "text": "Chaque pendentif a reçu une charge d’énergie vitale de Reiki de l’argent, orientée vers la facilité dans vos démarches et l’attraction de la réussite financière, comme un rappel permanent des vibrations du succès et de l’abondance lorsque vous vous rendez au travail ou à vos projets."
          },
          {
            "term": "Un design doré, solide et moderne",
            "text": "Fabriqué avec une grande qualité, il résiste à la chaleur du soleil et dure longtemps, dans une taille idéale qui apporte à votre voiture une élégance évidente, sans gêner la visibilité ni distraire pendant la conduite."
          }
        ]
      },
      {
        "title": "En quoi cette pièce enrichit vos trajets quotidiens ?",
        "steps": true,
        "items": [
          {
            "term": "Un ancrage visuel positif",
            "text": "Sa présence constante devant vous vous rappelle de rester concentré sur la paix intérieure et sur vos objectifs financiers et professionnels, avec confiance et sérénité."
          },
          {
            "term": "Une purification continue de l’énergie du véhicule",
            "text": "Il aide à dissiper les énergies d’inquiétude et de fatigue du quotidien, et les remplace par une atmosphère de sérénité et de baraka."
          },
          {
            "term": "Un cadeau raffiné pour ceux que vous aimez",
            "text": "Un choix idéal et très original à offrir comme cadeau béni à vos amis ou à votre famille, pour l’achat d’une nouvelle voiture, ou pour remplacer un ancien pendentif par un nouveau, porteur des vibrations de la nouvelle version unique de la personne."
          }
        ]
      }
    ]
  },
  ar: {
    "title": "تعليقة السيارة بمفتاح الحياة",
    "intro": [
      "هذه القطعة باللون الذهبي النقي الذي يعكس الوفرة والرفاهية، وتمت مواءمتها روحيّاً وطاقيّاً من خلال شحن الريكي المالي وتطهيرها ببركة القرآن الكريم."
    ],
    "sections": [
      {
        "title": "المزايا والخصائص الحقيقية لهذه التعليقة الفريدة",
        "items": [
          {
            "term": "تناغم وهدوء أثناء القيادة",
            "text": "يعتمد التصميم على رمز «مفتاح الحياة» العريق، وهو تصميم هندسي فريد يساعد بصرياً ونفسياً على تقليل التوتر وبث التوازن والهدوء، مما يمنحك تجربة قيادة أكثر راحة وتركيزاً حتى في أوقات الازدحام."
          },
          {
            "term": "بركة القرآن الكريم للتحصين",
            "text": "تم تفعيل القطعة روحياً بالقران الكريم، مما يضفي على سيارتك طمأنينة عميقة ويساهم في جعلها مساحة مباركة ومحمية في كل رحلة."
          },
          {
            "term": "شحن الريكي للوفرة والتوفيق",
            "text": "خضعت كل تعليقة لشحن بطاقة ريكي المال الحيوية الموجهة لتيسير السعي وجذب التوفيق المالي، لتكون بمثابة تذكير دائم بذبذبات النجاح والوفرة أثناء ذهابك لعملك أو مشاريعك."
          },
          {
            "term": "تصميم ذهبي متين وعصري",
            "text": "صُنعت بجودة عالية تقاوم حرارة الشمس وتدوم طويلاً، بحجم مثالي يمنح سيارتك فخامة واضحة دون أن يحجب الرؤية أو يشتت الانتباه أثناء القيادة."
          }
        ]
      },
      {
        "title": "كيف تضفي هذه القطعة قيمة على رحلتك اليومية؟",
        "steps": true,
        "items": [
          {
            "term": "مرساة بصرية إيجابية",
            "text": "وجودها أمامك بشكل دائم يذكرك بالتركيز على السلام الداخلي وأهدافك الاستثمارية والمهنية بيقين وهدوء."
          },
          {
            "term": "تنقية مستمرة لطاقة المركبة",
            "text": "تساعد على تبديد طاقات القلق والإنهاك اليومي، مستبدلة إياها بأجواء سكينة وبركة."
          },
          {
            "term": "هدية راقية لمن تحب",
            "text": "خيار مثالي ومميز جداً لتقديمه كهدية مباركة للأصدقاء أو العائلة بمناسبة اقتناء سيارة جديدة أو لتغيير تعليقة قديمة بأخرى جديدة تحمل ذبذبات نسخة الشخص الفريدة الجديدة."
          }
        ]
      }
    ]
  }
};

const livreExcellence = {
  fr: {
    "title": "Vous cherchez le vrai secret de la réussite scolaire de vos enfants, sans pression ni épuisement ?",
    "intro": [
      "Et parce que l’environnement joue un rôle décisif dans la concentration, cet ouvrage allie la puissance de l’esprit à l’harmonie de l’espace grâce aux conseils d’or du Feng Shui. Il vous offre ainsi une véritable feuille de route pour révéler la singularité de votre enfant et transformer ses performances scolaires de façon spectaculaire."
    ],
    "sections": [
      {
        "title": "Découvrez tout cela et bien plus encore dans le livre : « Votre excellence est votre choix » (تألقك هو اختيارك)",
        "paragraphs": [
          "Un guide pratique conçu sur mesure pour permettre à l’élève d’atteindre les sommets avec moins d’effort et une concentration maximale. Ce livre regorge d’exercices concrets qui révèlent une version plus confiante et autonome de votre enfant, le tout soutenu par un avantage exceptionnel : un accompagnement continu tout au long de l’année pour garantir l’application des méthodes et l’atteinte des résultats espérés."
        ]
      }
    ],
    "closing": "Procurez-vous votre exemplaire dès maintenant, et commencez un vrai changement dans l’avenir scolaire de votre enfant !"
  },
  ar: {
    "title": "هل تبحث عن السر الحقيقي وراء تفوق الأبناء دراسياً دون ضغط أو إرهاق؟",
    "intro": [
      "ولأن البيئة المحيطة تلعب دوراً حاسماً في التركيز، يجمع هذا الكتاب بين قوة العقل وحسن استغلال طاقة المكان عبر نصائح \"الفنج شوي\" الذهبية، ليضع بين يديك خارطة طريق متكاملة نحو الفرادة وتطوير الأداء التعليمي بشكل مذهل."
    ],
    "sections": [
      {
        "title": "اكتشف كل ذلك وأكثر في كتاب: \"تألقك هو اختيارك\"",
        "paragraphs": [
          "الدليل العملي الذي صُمم خصيصاً لمساعدة المتعلم على تحقيق أعلى درجات التفوق بمجهود أقل وتركيز أعمق. يضم الكتاب تطبيقات عملية تنقل ابنك إلى نسخة أكثر تمكيناً وثقة، مدعومة بميزة استثنائية وهي المتابعة المتواصلة لمدة سنة كاملة لضمان تطبيق الخطوات وتحقيق النتائج المرجوة."
        ]
      }
    ],
    "closing": "احصل على نسختك الآن، وابدأ رحلة التغيير الحقيقي في مستقبل ابنك الدراسي!"
  }
};
// "هذا خليه فقط لتلامذة الباكالوريا": Rayda's text for the baccalaureate edition, shown instead of the text above
// when that edition is picked. The titles are added here (her text starts straight in).
const livreExcellenceBac = {
  fr: {
    "title": "« Votre excellence est votre choix » pour les élèves du Baccalauréat",
    "intro": [
      "En année de Baccalauréat, le vrai problème n’est pas la difficulté des cours, mais la dispersion mentale et l’épuisement causés par des méthodes de mémorisation classiques qui consomment votre temps sans résultats. Le livre « Votre excellence est votre choix » (تألقك هو اختيارك) met entre vos mains le véritable raccourci : il ne vous demande pas d’étudier plus longtemps, mais vous apprend à étudier intelligemment.",
      "Grâce à une combinaison unique entre la programmation subconsciente, qui transforme votre cerveau en un véritable aimant à informations, et l’aménagement de votre espace d’étude selon les secrets d’or du Feng Shui pour chasser la distraction et la fatigue, vous vous épargnerez des mois de souffrance et d’essais infructueux.",
      "Parce que chaque étape du Baccalauréat comporte ses propres défis, cet ouvrage a été conçu selon un système d’accompagnement intelligent structuré par trimestres. Vous trouverez dans chaque trimestre des exercices précis et ciblés qui vous placent sur la bonne voie et garantissent votre progression étape par étape tout au long de l’année, afin d’arriver le jour de l’examen au sommet de votre préparation et de décrocher la filière de vos rêves."
    ]
  },
  ar: {
    "title": "«تألقك هو اختيارك» لتلاميذ الباكالوريا",
    "intro": [
      "في سنة الباكالوريا، المشكلة ليست في صعوبة الدروس، بل في تشتت الذهن واستنزاف الطاقة في طرق حفظ تقليدية تستهلك وقتك دون نتيجة. كتاب «تألقك هو اختيارك» يضع بين يديك الاختصار الحقيقي؛ فهو لا يطلب منك أن تدرس لساعات أطول، بل يعلمك كيف تدرس بذكاء.",
      "من خلال الدمج الفريد بين البرمجة اللاواعية التي تحول عقلك إلى مغناطيس للمعلومات، وتهيئة بيئتك الدراسية بأسرار الفنج شوي الذهبية لطرد التشتت والخمول، ستختصر على نفسك أشهرًا من المعاناة والتجارب العشوائية.",
      "ولأن كل مرحلة في الباكالوريا لها تحدياتها الخاصة، صُمم هذا الكتاب بنظام المرافقة الذكية المقسمة حسب الثلاثيات؛ حيث تجد في كل ثلاثي تمارين دقيقة وموجهة تضعك على المسار الصحيح وتضمن تطور مستواك خطوة بخطوة طيلة العام، لتصل إلى يوم الامتحان وأنت في قمة جاهزيتك وتضمن مقعدك في التخصص الذي تحلم به بإذن الله."
    ]
  }
};
// Her accessories text. Its first sentence is the product description (catalog.js, catalog-ar.mjs); the price line
// that ended her message ("ثمن السوار و القلادة بالخيط 100د") went into the prices.
const accessoiresApprentissage = {
  fr: {
    "title": "Accessoires Énergie d’apprentissage",
    "intro": [
      "Afin d’en garantir un bénéfice maximal, je veille sur l’aspect énergétique de chaque pièce pour en faire un outil de soutien aux chakras supérieurs, favorisant ainsi une plus grande concentration, une expression plus éloquente et une stimulation de tout ce qui facilite le processus d’apprentissage… Toutes les pierres sont soumises à un processus minutieux de purification énergétique et chaque pièce est préparée en fonction de la date de naissance, suivie d’un rechargement par l’énergie Reiki, les Beaux Noms d’Allah (Al-Asma Al-Husna) et le Saint Coran.",
      "Les pierres peuvent varier en nombre, en type, en forme et en taille."
    ]
  },
  ar: {
    "title": "أكسسوارات تفعيل طاقة التعلم",
    "intro": [
      "ولضمان أقصى استفادة، أنا أعتني بالجانب الطاقي لكل قطعة لتكون أداة داعمة للشاكرات العلوية لتركيز أكبر و تعبير أكثر بلاغة و تحفيز لما يتصل بعملية تعلم أيسر… تخضع جميع الأحجار لعملية تنظيف طاقي دقيقة و يتم إعداد القطعة بناءا على تاريخ الولادة، تلي ذلك عملية شحن بطاقة الريكي و أسماء الله الحسنى و القرآن الكريم.",
      "الأحجار يمكن أن تختلف من حيث العدد و النوع و الشكل و الحجم."
    ]
  }
};
// Her water bottle text. Its first line is the product description (catalog.js, catalog-ar.mjs); her two numbered
// dimensions are the sections, and her last line closes the text.
const bouteilleVerre = {
  fr: {
    "title": "Bien plus qu’une simple bouteille d’eau",
    "sections": [
      {
        "title": "1. La dimension énergétique",
        "paragraphs": [
          "Elle intègre des symboles, des affirmations positives ainsi que des versets du Coran. Une partie de son concept s’inspire des recherches menées sur l’influence des mots et des symboles sur les cristaux d’eau. L’eau est ainsi laissée à l’intérieur de la bouteille pendant un certain temps afin de s’inscrire dans cette expérience spirituelle et symbolique."
        ]
      },
      {
        "title": "2. La dimension de la programmation mentale et de l’inconscient",
        "paragraphs": [
          "Grâce à une exposition quotidienne et répétée aux phrases et aux affirmations positives inscrites sur la bouteille, votre fille ou votre fils est invité(e) à développer progressivement de nouveaux schémas de pensée, nourris de messages positifs autour de la confiance en soi, de l’amour du savoir, du plaisir d’apprendre, ainsi que du sentiment de sécurité et de protection face aux influences négatives.",
          "Bien plus qu’une simple bouteille d’eau… c’est un rappel quotidien de sa valeur et de ses capacités, un compagnon bienveillant qui l’accompagne tout au long de son parcours d’apprentissage, de développement personnel et d’épanouissement scolaire."
        ]
      }
    ],
    "closing": "Car la réussite de nos enfants ne repose pas uniquement sur les connaissances, mais aussi sur la confiance en soi, l’encouragement et un environnement positif."
  },
  ar: {
    "title": "أكثر من مجرد قارورة ماء",
    "sections": [
      {
        "title": "الأول: البُعد الطاقي",
        "paragraphs": [
          "تحتوي القارورة على رموز وتوكيدات وآيات قرآنية، وقد استلهمتُ جزءا من فكرتها من الأبحاث العلمية حول تأثير الكلمات والرموز في بلورات الماء. هذا يعني أن الماء يُترك داخلها لبعض الوقت ليكون جزءاً من هذه التجربة الروحية والرمزية."
        ]
      },
      {
        "title": "الثاني: بُعد البرمجة الذهنية واللاوعي",
        "paragraphs": [
          "من خلال التعرض اليومي والمتكرر للعبارات والتوكيدات الموجودة على القارورة، تتاح لابنتك أو ابنك فرصة لبناء برمجة جديدة مليئة برسائل إيجابية تتعلق بالثقة بالنفس، وحب العلم، والإقبال على التعلم، والشعور بالأمان والحماية من التأثيرات السلبية.",
          "إنها أكثر من مجرد قارورة ماء… إنها تذكير يومي لطفلك بقيمته وقدراته، ومرافقة لطيفة له في رحلته نحو التعلم والتطور والتألق الدراسي."
        ]
      }
    ],
    "closing": "لأن نجاح أبنائنا لا يحتاج إلى المعرفة وحدها، بل يحتاج أيضاً إلى الثقة بالنفس، والتحفيز، والبيئة الإيجابية."
  }
};
// Her key necklace text. Her Arabic is a single sentence, so all of it is the product description (catalog-ar.mjs);
// her French is two paragraphs, the first being the description (catalog.js).
const collierCle = {
  fr: {
    "title": "Un symbole de chance et d’ouverture des portes",
    "intro": [
      "La clé est un symbole profondément associé à la chance, à l’ouverture des portes et à la facilitation des choses, avec la permission de Dieu. Cette symbolique est renforcée par une charge énergétique réalisée à travers le Reiki de l’Argent."
    ]
  },
  ar: {
    "title": "رمز يرتبط بمعاني الحظ و التسهيل",
    "intro": []
  }
};

const grenouilleFortune = {
  fr: {
    "title": "Un symbole de chance et de prospérité",
    "intro": [
      "Reconnaissable à son design particulier, elle est représentée assise sur un amas de pièces de monnaie, avec une pièce d’or dans la bouche, symbole de chance et de prospérité, censé favoriser l’entrée et la circulation de l’argent dans la maison ou le lieu de travail.",
      "À la fois élégante et porteuse de sens, elle constitue un bel élément de décoration pour ceux qui souhaitent cultiver une énergie positive et symboliser l’attraction de la prospérité financière.",
      "C’est également un cadeau original et symbolique, idéal pour les entrepreneurs, les bureaux ou encore pour embellir l’entrée d’une maison.",
      "Elle vous est proposée chargée en Reiki de l’Argent."
    ]
  },
  ar: {
    "title": "رمز الثروة والوفرة",
    "intro": [
      "يتميز بتصميمه الفريد وهو يجلس على كومة من العملات المعدنية ويحمل في فمه عملة ذهبية ترمز الحظ السعيد وتدفق المال إلى المنزل أو مكان العمل. يُعد هذا الرمز إضافة جميلة للديكور لمن يسعى لتعزيز الطاقة الإيجابية وجذب الازدهار المالي، كما يمثل هدية مميزة وذات معنى عميق لأصحاب المشاريع والمكاتب أو لتزيين مدخل المنزل.",
      "يأتيكم مشحونا بريكي المال"
    ]
  }
};
const tropheeAmour = {
  fr: {
    "title": "Votre porte vers une relation où règnent l’amour durable, l’affection et la miséricorde",
    "intro": [],
    "sections": [
      {
        "title": "Comment agit le « Trophée d’Amour » ?",
        "items": [
          {
            "term": "La programmation positive du subconscient",
            "text": "La présence de ce symbole dans votre environnement quotidien agit comme un rappel visuel permanent pour votre subconscient. Elle contribue à ancrer les notions d’amour durable, de compréhension mutuelle et d’harmonie, tout en orientant progressivement vos pensées vers davantage d’affection et de tendresse. Vous pouvez également l’utiliser même si vous n’êtes pas encore mariée : il a été conçu pour vous accompagner dans le travail sur certains blocages intérieurs susceptibles de freiner votre engagement amoureux et votre chemin vers une relation épanouissante."
          },
          {
            "term": "La recharge énergétique par le Reiki",
            "text": "Chaque pièce est soigneusement préparée et énergétiquement chargée par le Reiki, dans le but de favoriser une atmosphère vibrante d’amour et de bienveillance."
          },
          {
            "term": "La bénédiction et la sérénité à travers le Coran",
            "text": "Cette création est également imprégnée de la récitation du Saint Coran et des Beaux Noms d’Allah, afin de vous inviter à cultiver un profond sentiment d’amour, d’affection et de miséricorde au sein de votre relation."
          }
        ]
      },
      {
        "title": "Pourquoi choisir le « Trophée d’Amour » dès aujourd’hui ?",
        "items": [
          {
            "text": "Il apporte une touche décorative raffinée et une atmosphère chaleureuse, empreinte de spiritualité, à votre chambre ou à votre espace de vie."
          },
          {
            "text": "Il aide à créer un environnement apaisé, qui encourage le dialogue et le rapprochement affectif entre les deux partenaires."
          },
          {
            "text": "C’est un cadeau exceptionnel et riche de sens pour la personne que vous aimez, lors d’une occasion spéciale ou pour marquer un nouveau départ, vers une relation pleine de bienfaits."
          }
        ]
      }
    ],
    "closing": "Faites de votre maison un espace qui vibre d’amour et de sérénité. Commandez votre « Trophée d’Amour » dès aujourd’hui et commencez un nouveau chemin d’harmonie affective et spirituelle."
  },
  ar: {
    "title": "بوابتك نحو علاقة يسودها الحب الدائم والمودة والرحمة",
    "intro": [],
    "sections": [
      {
        "title": "كيف يعمل «رمز الحب»؟",
        "items": [
          {
            "term": "البرمجة اللاواعية الإيجابية",
            "text": "وجود هذا الرمز في محيطك اليومي يعمل كتذكير بصري مستمر لعقلك الباطن، مما يرسّخ مفاهيم الحب الدائم والتفاهم ويعيد برمجة الأفكار نحو المودة والرحمة علما بأنك يمكن أن تستعمليه حتى ان لم تكوني متزوجة لأنه مصمم ليساعدك على التخلص من جزء من البلوكات التي تمنع ارتباطك"
          },
          {
            "term": "الشحن الطاقي بالريكي",
            "text": "تم إعداد كل قطعة وشحنها بطاقة الريكي للمساعدة على رفع ذبذبات المحبة في المكان."
          },
          {
            "term": "البركة والسكينة بالقرآن الكريم",
            "text": "هذه القطعة مشحونة أيضا بالقرآن الكريم و أسماء الله الحسنى لتمنحك شعوراً عميقاً بالحب و المودة و الرحمة في علاقتك."
          }
        ]
      },
      {
        "title": "لماذا تقتني «رمز الحب» الآن؟",
        "items": [
          {
            "text": "يضفي لمسة جمالية وروحانية دافئة على غرفة النوم أو مساحة المعيشة."
          },
          {
            "text": "يساعد في خلق بيئة هادئة تشجع على الحوار والتقارب العاطفي بين الشريكين."
          },
          {
            "text": "يُعد هدية استثنائية وذات معنى عميق لمن تحب في المناسبات الخاصة أو كبداية جديدة لعلاقة مليئة بالخير."
          }
        ]
      }
    ],
    "closing": "اجعل من منزلك مساحة تنبض بالحب والسكينة. اطلب «رمز الحب» الخاص بك اليوم وابدأ رحلة جديدة من التناغم العاطفي والروحي."
  }
};
// Her love bottle text (her messages of 20 and 21 November; the user sent her full French on 21 November). Its first
// line is the product description (catalog.js, catalog-ar.mjs). The title is her own closing words. Her French has two
// headed levels; her Arabic has the same two levels as numbered paragraphs, kept as she wrote them.
const bouteilleAmour = {
  fr: {
    "title": "En résonance avec l’amour, la tendresse et la miséricorde",
    "sections": [
      {
        "title": "1. La programmation du subconscient",
        "paragraphs": [
          "Elle vise à programmer le subconscient autour des valeurs de l’amour, de la tendresse, de la bienveillance et d’une belle harmonie au sein du couple.",
          "Les personnes non mariées peuvent également l’utiliser. Cette démarche les aide à se libérer progressivement de certains blocages inconscients susceptibles d’entraver l’attraction de relations amoureuses épanouissantes et leur épanouissement dans la durée, grâce à une nouvelle programmation positive du subconscient."
        ]
      },
      {
        "title": "2. La dynamisation énergétique de l’eau",
        "paragraphs": [
          "Les inscriptions et les symboles figurant sur la bouteille, faisant appel aux versets du Saint Coran, aux Beaux Noms d’Allah et aux symboles énergétiques, sont destinés à charger le noyau de l’eau en énergie.",
          "Vous buvez ainsi une eau dynamisée, imprégnée de vibrations harmonieuses, qui accompagne votre démarche de mieux-être et vous aide à cultiver une fréquence intérieure en résonance avec l’amour, la tendresse et la miséricorde."
        ]
      }
    ]
  },
  ar: {
    "title": "على تردد الحب والمودة والرحمة",
    "intro": [
      "1- برمجة اللاوعي على المودة و الرحمة و على العلاقة الجميلة بين الزوجين علما ان غير المتزوجين يمكن أن يستعملوها و هذا يساعدهم على التخلص من جزء من البلوكات التي تمنع جذب علاقات الحب و دوامها بناءا على البرمجة اللاواعية الجديدة التي تحصل لهم.",
      "2- شحن نواة الماء بطاقة القرآن الكريم و أسماء الله الحسنى و الرموز الطاقية و هو ما يجعلك تشرب ماءا حيا مشحونا بذبذبات رائعة تساعدك على التشافي و على أن تكون على تردد الحب و المودة و الرحمة"
    ]
  }
};
export const productTexts = {
  'bracelet-bazi': bazi,
  'collier-bazi': bazi,
  'portefeuille-hafidha': portefeuilleHafidha,
  'carte-million-dollar': carteMillionDollar,
  'decor-abondance': decorAbondance,
  'cle-de-vie': cleDeVie,
  'fleur-de-vie': fleurDeVie,
  'pendentif-voiture-fleur': pendentifVoitureFleur,
  'pendentif-voiture-ankh': pendentifVoitureAnkh,
  'livre-excellence': livreExcellence,
  'accessoires-apprentissage': accessoiresApprentissage,
  'bouteille-verre': bouteilleVerre,
  'collier-cle': collierCle,
  'grenouille-fortune': grenouilleFortune,
  'trophee-amour': tropheeAmour,
  'bouteille-amour': bouteilleAmour
};

// A text that replaces the one above for one choice only, keyed on the catalogue's French value of that choice.
export const variantTexts = {
  'livre-excellence': { 'Baccalauréat': livreExcellenceBac }
};
