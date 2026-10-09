(function () {
  "use strict";
  window.STORE_CATALOG = {
    collections: [
      { slug: "all", name: "Toutes les créations", description: "Parcourez les pièces présentées dans l’atelier.", productIds: ["bracelet-bazi", "collier-bazi", "money-wallet", "arbre-de-vie"] },
      { slug: "bijoux-personnalises", name: "Bijoux personnalisés", description: "Bracelets et colliers composés après un échange autour de votre carte BaZi.", productIds: ["bracelet-bazi", "collier-bazi", "arbre-de-vie"] },
      { slug: "creations-bazi", name: "Créations BaZi", description: "Des pièces imaginées à partir d’une lecture personnelle et de vos préférences.", productIds: ["bracelet-bazi", "collier-bazi", "money-wallet"] },
      { slug: "accessoires", name: "Accessoires & pièces singulières", description: "Des objets et détails à découvrir, avec leurs modalités à confirmer.", productIds: ["money-wallet", "arbre-de-vie"] }
    ],
    products: [
      {
        id: "bracelet-bazi",
        slug: "bracelet-bazi-personnalise",
        name: "Bracelet BaZi personnalisé",
        eyebrow: "Bracelet · création personnalisée",
        type: "jewelry",
        collections: ["bijoux-personnalises", "creations-bazi"],
        price: { min: 140, max: 180, currency: "TND", confirmationRequired: true },
        availability: "made-to-order",
        custom: true,
        featured: true,
        description: "Un bracelet composé pour vous à partir de votre carte BaZi. Raïda choisit les éléments, les couleurs et les détails de la composition après un échange personnel.",
        details: ["Composition variable selon la lecture personnelle", "Palette discutée avec la créatrice", "Préparé après confirmation de la demande"],
        options: { palettes: ["Laisser la créatrice choisir", "Bleu & neutres", "Tons chauds", "Vert & naturel"], intentions: ["Équilibre personnel", "Projet & travail", "Abondance", "Protection symbolique", "Autre intention"] },
        priceNote: "Le tarif indiqué dans les échanges varie de 140 à 180 TND selon la composition. Le prix final est confirmé avant préparation.",
        images: [
          { src: "/assets/products/bazi-bracelet-main.jpg", alt: "Bracelet composé de perles multicolores, photographié avec son emballage" },
          { src: "/assets/products/bazi-bracelet-blue.jpg", alt: "Bracelet de perles bleues et de tons neutres" },
          { src: "/assets/products/bazi-bracelet-color.jpg", alt: "Bracelet de perles colorées, exemple de création" },
          { src: "/assets/products/bazi-bracelet-heart.jpg", alt: "Bracelet clair avec détail de cœur" },
          { src: "/assets/products/bazi-bracelet-red-green.jpg", alt: "Bracelet de perles rouge et vert, exemple de composition" },
          { src: "/assets/products/bazi-bracelet-red-green-2.jpg", alt: "Détail d’un bracelet de perles colorées" },
          { src: "/assets/products/bazi-bracelet-mix.jpg", alt: "Deux bracelets de compositions différentes" },
          { src: "/assets/products/bazi-bracelet-pyrite.jpg", alt: "Bracelet multicolore avec détails métalliques" }
        ],
        missing: ["Composition exacte des pierres", "Taille et matériaux", "Délai de préparation", "Stock / capacité"]
      },
      {
        id: "collier-bazi",
        slug: "collier-bazi-complet",
        name: "Collier BaZi complet",
        eyebrow: "Collier · création personnalisée",
        type: "jewelry",
        collections: ["bijoux-personnalises", "creations-bazi"],
        price: { min: 320, max: 320, currency: "TND", confirmationRequired: false },
        availability: "made-to-order",
        custom: true,
        featured: true,
        description: "Un collier créé dans la même démarche personnalisée que les bijoux BaZi de l’atelier. La créatrice échange avec vous pour adapter les couleurs et les détails.",
        details: ["Création présentée comme complète dans les échanges", "Choix des détails à confirmer avec la créatrice", "Préparé après échange"],
        options: { palettes: ["Laisser la créatrice choisir", "Tons naturels", "Tons colorés"], intentions: ["Équilibre personnel", "Projet & travail", "Abondance", "Autre intention"] },
        priceNote: "Le tarif communiqué pour le collier BaZi complet est de 320 TND.",
        images: [
          { src: "/assets/products/bazi-necklace.jpg", alt: "Collier de perles et pierres photographié sur un tissu" },
          { src: "/assets/products/bazi-necklace-detail.jpg", alt: "Détail du collier BaZi présenté par la créatrice" }
        ],
        video: { src: "/assets/bazi-necklace-demo.mp4", title: "Vidéo de présentation du collier BaZi" },
        missing: ["Pierres et matériaux exacts", "Longueur et dimensions", "Délai de préparation", "Stock / capacité"]
      },
      {
        id: "money-wallet",
        slug: "money-wallet",
        name: "Money Wallet · Hâfizet el-Māl",
        eyebrow: "Accessoire · couleurs visibles sur les photos",
        type: "accessory",
        collections: ["creations-bazi", "accessoires"],
        price: null,
        availability: "made-to-order",
        custom: true,
        featured: true,
        description: "Une création décrite par Raïda comme un objet d’intention autour de la relation à l’argent. Sa démarche associe une composition réfléchie, des éléments inspirés du Feng Shui et du Reiki, ainsi que des pratiques spirituelles qui lui sont propres.",
        details: ["Quatre coloris visibles dans les photos reçues", "Description et préparation à confirmer avec la créatrice", "Les significations relèvent de la démarche personnelle de la créatrice, sans promesse de résultat"],
        options: { variant: ["Jaune", "Turquoise", "Rose", "Vert"], palettes: ["Choisir une couleur"], intentions: ["Cadeau", "Projet & travail", "Abondance", "Autre intention"] },
        priceNote: "Prix non communiqué dans les éléments reçus. Demandez le tarif avant de confirmer votre commande.",
        images: [
          { src: "/assets/products/money-wallet-colors.jpg", alt: "Money Wallet en plusieurs coloris présentés ensemble" },
          { src: "/assets/products/money-wallet-yellow.jpg", alt: "Money Wallet jaune" },
          { src: "/assets/products/money-wallet-turquoise.jpg", alt: "Money Wallet turquoise" },
          { src: "/assets/products/money-wallet-pink.jpg", alt: "Money Wallet rose" },
          { src: "/assets/products/money-wallet-green.jpg", alt: "Money Wallet vert" }
        ],
        missing: ["Prix", "Matériaux et dimensions", "Contenu exact / modalités de préparation", "Délai de préparation", "Stock"]
      },
      {
        id: "arbre-de-vie",
        slug: "creation-arbre-de-vie",
        name: "Création arbre de vie",
        eyebrow: "Pièce singulière · prix à confirmer",
        type: "accessory",
        collections: ["bijoux-personnalises", "accessoires"],
        price: null,
        availability: "quote",
        custom: true,
        featured: false,
        description: "Une pièce arbre de vie photographiée avec des perles colorées. Le nom commercial, le format et les options restent à confirmer avec la créatrice.",
        details: ["Photographie issue des créations transmises", "Composition et options à confirmer"],
        options: { palettes: ["Laisser la créatrice choisir", "Tons naturels", "Tons colorés"], intentions: ["Cadeau", "Autre intention"] },
        priceNote: "Prix non communiqué. Le tarif et les options seront confirmés avant toute commande.",
        images: [
          { src: "/assets/products/life-tree-pendant.jpg", alt: "Pièce arbre de vie composée de fils métalliques et de perles colorées" }
        ],
        missing: ["Nom commercial exact", "Prix", "Matériaux et dimensions", "Délai de préparation", "Stock"]
      }
    ]
  };
}());
