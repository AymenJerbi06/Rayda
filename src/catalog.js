(function () {
  "use strict";
  // Source: organized Products/Catalogue Produits - Issolatej.xlsx.
  // Image files are copied from the numbered source folders without editing them.
  function amount(min, max, confirmationRequired) {
    return min == null ? null : { min: min, max: max == null ? min : max, currency: "TND", confirmationRequired: !!confirmationRequired };
  }
  function make(item) {
    item.slug = item.id;
    item.featured = item.featured !== false;
    item.options = item.options || {};
    item.missing = item.missing || ["Disponibilité", "Délai de préparation"];
    item.images = Array.from({ length: item.photoCount }, function (_, index) {
      return {
        src: "/assets/products/organized/" + item.id + "-" + String(index + 1).padStart(2, "0") + ".jpg",
        alt: (item.photoAlt || item.name) + (item.photoCount > 1 ? " — vue " + (index + 1) : "")
      };
    });
    delete item.photoCount;
    delete item.photoAlt;
    return item;
  }
  var products = [
    make({
      id: "bracelet-bazi", name: "Bracelet BaZi sur mesure", eyebrow: "Bracelet · création personnalisée", type: "jewelry", collections: ["creations-bazi", "bracelets"],
      price: amount(140, 180, true), availability: "made-to-order", custom: true, photoCount: 16, photoAlt: "Exemple de bracelet BaZi composé par la créatrice",
      description: "Chaque bracelet est composé après un échange autour de la carte BaZi de la personne. Les photographies montrent plusieurs exemples ; pierres, couleurs et détails varient selon la création.",
      benefits: [
        { icon: "personalization", label: "Unique : composé selon votre propre carte BaZi" },
        { icon: "calm", label: "Pensé pour apporter calme et équilibre au quotidien" },
        { icon: "confidence", label: "Associé à la confiance en soi, selon la démarche de Rayda" }
      ],
      details: ["Bracelet élastique, taille standard indiquée dans le catalogue", "Composition personnalisée à discuter avec la créatrice", "Rayda décrit une préparation associant Reiki et récitations coraniques, sans promesse de résultat"],
      options: { variant: ["Composition sur mesure"], palettes: ["À discuter", "Tons doux", "Tons vifs", "Tons naturels"] },
      priceNote: "Fourchette communiquée : 140 à 180 TND. Le tarif final est confirmé avant préparation.",
      missing: ["Composition exacte de la commande", "Tour de poignet précis", "Délai de fabrication", "Disponibilité"]
    }),
    make({
      id: "collier-bazi", coverImageIndex: 2, name: "Collier BaZi complet", eyebrow: "Collier · création personnalisée", type: "jewelry", collections: ["creations-bazi", "colliers"],
      price: amount(320), availability: "made-to-order", custom: true, photoCount: 3, photoAlt: "Exemple de collier BaZi aux pierres et perles variées",
      description: "Collier personnalisé selon la démarche BaZi de la créatrice. Les photos montrent plusieurs compositions, dont un exemple vendu à 320 TND avec pyrite, lapis-lazuli, quartz rose et aigue-marine selon le catalogue reçu.",
      benefits: [
        { icon: "personalization", label: "Composition unique selon votre lecture BaZi" },
        { icon: "calm", label: "Pensé pour la sérénité et l'apaisement" },
        { icon: "love", label: "Souvent offert comme symbole de lien et d'attention" }
      ],
      details: ["Longueur standard indiquée dans le catalogue ; mesure précise à confirmer", "Composition à discuter avec la créatrice", "Exemple vendu annoncé à 320 TND"],
      options: { variant: ["Composition sur mesure"], palettes: ["À discuter", "Tons naturels", "Tons colorés"] },
      priceNote: "Tarif communiqué pour le collier BaZi complet : 320 TND. Composition à confirmer avant préparation.",
      missing: ["Longueur exacte", "Composition de la commande", "Délai de fabrication", "Disponibilité"]
    }),
    make({
      id: "bracelet-amour", name: "Bracelet Énergie Amour", eyebrow: "Bracelet · quartz rose", type: "jewelry", collections: ["bracelets"],
      price: amount(100), availability: "quote", custom: false, photoCount: 3, photoAlt: "Bracelet Énergie Amour photographié par la créatrice",
      description: "Bracelet présenté autour d’une intention d’amour. L’exemple vendu à 100 TND est en perles de quartz rose selon le catalogue ; une autre photo montre une composition avec tourmaline rose et cœur.",
      benefits: [
        { icon: "love", label: "Associé à l'énergie d'amour et de douceur" },
        { icon: "calm", label: "Quartz rose, pierre traditionnellement liée à l'apaisement" }
      ],
      details: ["Taille de poignet standard indiquée dans le catalogue", "L’apparence varie selon l’exemple photographié", "La signification spirituelle relève de la démarche de la créatrice"],
      options: { variant: ["Quartz rose uni · 100 TND", "Composition avec cœur · tarif à confirmer"] }, variantPrices: { "Quartz rose uni · 100 TND": 100, "Composition avec cœur · tarif à confirmer": null },
      coverImageIndex: 1, variantImageIndex: { "Quartz rose uni · 100 TND": 1, "Composition avec cœur · tarif à confirmer": 0 },
      priceNote: "Le tarif de 100 TND concerne l’exemple en quartz rose uni. Prix de la composition avec cœur à confirmer.",
      missing: ["Prix de la variante avec cœur", "Matières exactes par variante", "Disponibilité"]
    }),
    make({
      id: "porte-cles-pierre", name: "Porte-clés Pierre", eyebrow: "Accessoire · pierre", type: "accessory", collections: ["porte-cles"],
      price: null, availability: "quote", custom: false, featured: false, photoCount: 1,
      description: "Porte-clés ou bijou de sac photographié avec une pierre pendante, un anneau doré et une breloque en forme de clé.",
      benefits: [
        { icon: "protection", label: "Pensé comme un petit porte-bonheur à garder sur soi" },
        { icon: "personalization", label: "Pierre naturelle, pièce unique" }
      ],
      details: ["Labradorite indiquée dans le catalogue transmis", "Longueur estimée à environ 11 cm ; à mesurer", "Autres éléments à confirmer"],
      priceNote: "Prix non communiqué dans les éléments reçus. Demandez le tarif avant commande.",
      missing: ["Prix", "Dimensions précises", "Composition complète", "Disponibilité"]
    }),
    make({
      id: "porte-cles-arbre-vie", name: "Porte-clés Arbre de Vie", eyebrow: "Accessoire · arbre de vie", type: "accessory", collections: ["porte-cles"],
      price: null, availability: "quote", custom: false, featured: false, photoCount: 1,
      description: "Porte-clés Arbre de Vie en fil enroulé avec des perles colorées, tel qu’il apparaît sur la photographie fournie.",
      benefits: [
        { icon: "abundance", label: "Arbre de Vie, symbole d'ancrage et de croissance" },
        { icon: "protection", label: "Un compagnon discret au quotidien" }
      ],
      details: ["Labradorite et autres perles mentionnées dans le catalogue", "Diamètre estimé à 5–6 cm ; à confirmer", "Composition exacte à confirmer"],
      priceNote: "Prix non communiqué dans les éléments reçus. Demandez le tarif avant commande.",
      missing: ["Prix", "Dimensions précises", "Matières exactes", "Disponibilité"]
    }),
    make({
      id: "portefeuille-hafidha", name: "Portefeuille Hafidha El Mel", eyebrow: "Portefeuille · quatre coloris", type: "accessory", collections: ["creations-bazi", "portefeuilles"],
      price: null, availability: "quote", custom: true, photoCount: 8, photoAlt: "Portefeuille Hafidha El Mel photographié dans un coloris proposé",
      description: "Portefeuille présenté par la créatrice comme « Hafidha El Mel ». Les photographies montrent des modèles verts, jaunes, roses et rouges. Elle associe sa préparation à sa lecture BaZi, au Feng Shui, au Reiki et à des récitations coraniques.",
      benefits: [
        { icon: "abundance", label: "Pensé pour accompagner une relation plus sereine à l'argent" },
        { icon: "protection", label: "Préparation associant Reiki et lecture BaZi, selon la démarche de Rayda" },
        { icon: "personalization", label: "Disponible en quatre coloris" }
      ],
      details: ["Dimensions communiquées : 19,5 × 11 cm", "Cuir véritable indiqué dans le catalogue ; à confirmer pour chaque modèle", "Aucune promesse de résultat financier"],
      options: { variant: ["Vert", "Jaune", "Rose / fuchsia", "Rouge"] },
      variantImageIndex: { "Vert": 7, "Jaune": 1, "Rose / fuchsia": 2, "Rouge": 3 },
      priceNote: "Prix non communiqué dans les éléments reçus. Tarif et contenu exact à confirmer avec la créatrice.",
      missing: ["Prix", "Matière confirmée par variante", "Contenu livré", "Disponibilité"]
    }),
    make({
      id: "carte-million-dollar", name: "Carte Million Dollar dorée", eyebrow: "Objet doré · deux tailles", type: "decor", collections: ["objets-dores"],
      price: amount(45, 50), variantPrices: { "Petite · 16 × 5,5 cm": 45, "Grande · 19 × 6 cm": 50 }, availability: "quote", custom: false, photoCount: 1,
      description: "Carte décorative dorée gravée « One Million Dollars », proposée en deux tailles. Rayda l’inscrit dans sa démarche symbolique autour de l’abondance.",
      benefits: [
        { icon: "abundance", label: "Symbole d'abondance à placer dans votre espace" },
        { icon: "clarity", label: "Une intention positive, simple à offrir" }
      ],
      details: ["Petite : 16 × 5,5 cm — 45 TND", "Grande : 19 × 6 cm — 50 TND", "Matière décrite comme métal ou acrylique doré ; composition exacte à confirmer"],
      options: { variant: ["Petite · 16 × 5,5 cm", "Grande · 19 × 6 cm"] },
      priceNote: "Prix selon la taille sélectionnée. Disponibilité à confirmer.",
      missing: ["Matière exacte", "Disponibilité"]
    }),
    make({
      id: "decor-abondance", name: "Décor Abondance doré", eyebrow: "Décoration · doré", type: "decor", collections: ["objets-dores"],
      price: amount(60), availability: "quote", custom: false, photoCount: 2,
      description: "Objet décoratif doré réunissant les motifs du dollar, de la couronne et de l’infini. Il peut être posé sur un bureau ou dans un espace personnel.",
      benefits: [
        { icon: "abundance", label: "Motifs dollar, couronne et infini pour une intention d'abondance" },
        { icon: "clarity", label: "Objet décoratif pensé pour votre bureau ou votre intérieur" }
      ],
      details: ["Dimensions communiquées : 21 × 11 cm", "Acrylique miroir doré indiqué dans le catalogue", "La signification symbolique appartient à la démarche de la créatrice"],
      priceNote: "Tarif communiqué : 60 TND. Disponibilité à confirmer."
    }),
    make({
      id: "cle-de-vie", name: "Clé de Vie dorée · Ankh", eyebrow: "Décoration · symbole Ankh", type: "decor", collections: ["objets-dores"],
      price: amount(70), availability: "quote", custom: false, photoCount: 4,
      description: "Objet doré reprenant la forme de la Clé de Vie, ou Ankh. Les photographies montrent plusieurs angles de la même pièce.",
      benefits: [
        { icon: "protection", label: "Symbole ancien d'énergie et de vitalité" },
        { icon: "clarity", label: "Pièce chargée selon la démarche spirituelle de Rayda" }
      ],
      details: ["Dimensions communiquées : 27 × 16 cm", "Métal doré gravé indiqué dans le catalogue", "Rayda décrit une préparation spirituelle propre à sa pratique"],
      priceNote: "Tarif communiqué : 70 TND. Disponibilité à confirmer."
    }),
    make({
      id: "fleur-de-vie", name: "Décor Fleur de Vie dorée", eyebrow: "Décoration · fleur de vie", type: "decor", collections: ["objets-dores"],
      price: amount(80), availability: "quote", custom: false, photoCount: 2,
      description: "Décor rond à motif Fleur de Vie en finition miroir doré, photographié sous deux angles.",
      benefits: [
        { icon: "clarity", label: "Symbole d'harmonie et d'équilibre" },
        { icon: "abundance", label: "Finition miroir dorée pour sublimer votre intérieur" }
      ],
      details: ["Diamètre communiqué : 23 cm", "Métal miroir doré découpé indiqué dans le catalogue", "La signification symbolique appartient à la démarche de la créatrice"],
      priceNote: "Tarif communiqué : 80 TND. Disponibilité à confirmer."
    }),
    make({
      id: "pendentif-voiture-fleur", name: "Pendentif voiture · Fleur de Vie", eyebrow: "Accessoire voiture · doré", type: "car", collections: ["voiture"],
      price: amount(80), availability: "quote", custom: false, photoCount: 2,
      description: "Pendentif à suspendre dans la voiture, avec motif Fleur de Vie et finition dorée.",
      benefits: [
        { icon: "protection", label: "Pensé pour accompagner vos trajets sereinement" },
        { icon: "clarity", label: "Symbole Fleur de Vie, doré, discret" }
      ],
      details: ["Dimensions communiquées : 11 × 11 cm", "Résine ou verre transparent avec dorure selon le catalogue ; matière exacte à confirmer", "Chaîne de suspension photographiée"],
      priceNote: "Tarif communiqué : 80 TND. Disponibilité à confirmer.",
      missing: ["Matière exacte", "Disponibilité"]
    }),
    make({
      id: "pendentif-voiture-ankh", name: "Pendentif voiture · Clé de Vie", eyebrow: "Accessoire voiture · doré", type: "car", collections: ["voiture"],
      price: amount(80), availability: "quote", custom: false, photoCount: 1,
      description: "Variante du pendentif pour voiture avec motif Clé de Vie, ou Ankh, et finition dorée.",
      benefits: [
        { icon: "protection", label: "Pensé pour accompagner vos trajets sereinement" },
        { icon: "clarity", label: "Symbole Clé de Vie, doré, discret" }
      ],
      details: ["Dimensions communiquées : 11 × 11 cm", "Résine ou verre transparent avec dorure selon le catalogue ; matière exacte à confirmer", "Chaîne de suspension photographiée"],
      priceNote: "Tarif communiqué : 80 TND. Disponibilité à confirmer.",
      missing: ["Matière exacte", "Disponibilité"]
    })
  ];
  window.STORE_CATALOG = {
    collections: [
      { slug: "all", name: "Toutes les créations", description: "Bijoux, accessoires et objets présentés par Issolatej.", productIds: products.map(function (p) { return p.id; }) },
      { slug: "creations-bazi", name: "Créations BaZi", description: "Pièces conçues après un échange autour de la carte BaZi.", productIds: ["bracelet-bazi", "collier-bazi", "portefeuille-hafidha"] },
      { slug: "bracelets", name: "Bracelets", description: "Bracelet BaZi sur mesure et bracelet Énergie Amour.", productIds: ["bracelet-bazi", "bracelet-amour"] },
      { slug: "colliers", name: "Colliers", description: "Collier BaZi composé pour une personne.", productIds: ["collier-bazi"] },
      { slug: "porte-cles", name: "Porte-clés", description: "Porte-clés de pierre et Arbre de Vie.", productIds: ["porte-cles-pierre", "porte-cles-arbre-vie"] },
      { slug: "portefeuilles", name: "Portefeuilles", description: "Portefeuille Hafidha El Mel dans les coloris photographiés.", productIds: ["portefeuille-hafidha"] },
      { slug: "objets-dores", name: "Objets dorés", description: "Carte et objets décoratifs dorés.", productIds: ["carte-million-dollar", "decor-abondance", "cle-de-vie", "fleur-de-vie"] },
      { slug: "voiture", name: "Pendentifs voiture", description: "Pendentifs décoratifs à suspendre dans la voiture.", productIds: ["pendentif-voiture-fleur", "pendentif-voiture-ankh"] }
    ],
    products: products
  };
}());
