(function () {
  "use strict";
  // Source: organized Products/Catalogue Produits - Issolatej.xlsx.
  // Image files are copied from the numbered source folders without editing them.
  // Eleven products also lead with a lifestyle scene, <id>-ugc.jpg, made with CreateUGC from Rayda's own photo of
  // the piece (originals in "om Adem/UGC photos (CreateUGC)"); the product pages say so under the gallery.
  // Products with aiPhotos show, after that scene, photos made in ChatGPT from Rayda's own photos instead of her
  // photos: <id>-ai-<shot>.jpg (originals in "om Adem/ChatGPT photos (full size)"). Each entry is [shot, alt], and
  // variantImageIndex counts within aiPhotos. The product pages say so under the gallery.
  function amount(min, max, confirmationRequired) {
    return min == null ? null : { min: min, max: max == null ? min : max, currency: "TND", confirmationRequired: !!confirmationRequired };
  }
  function make(item) {
    item.slug = item.id;
    item.featured = item.featured !== false;
    item.options = item.options || {};
    item.missing = item.missing || ["Disponibilité", "Délai de préparation"];
    item.images = item.aiPhotos ? item.aiPhotos.map(function (photo) {
      return { src: "/assets/products/organized/" + item.id + "-ai-" + photo[0] + ".jpg", alt: photo[1] };
    }) : Array.from({ length: item.photoCount }, function (_, index) {
      return {
        src: "/assets/products/organized/" + item.id + "-" + String(index + 1).padStart(2, "0") + ".jpg",
        alt: (item.photoAlt || item.name) + (item.photoCount > 1 ? " — vue " + (index + 1) : "")
      };
    });
    if (item.lifestyle) {
      item.images.unshift({ src: "/assets/products/organized/" + item.id + "-ugc.jpg", alt: item.lifestyle });
      item.coverImageIndex = 0;
      if (item.variantImageIndex) Object.keys(item.variantImageIndex).forEach(function (key) { item.variantImageIndex[key] += 1; });
    }
    delete item.lifestyle;
    delete item.aiPhotos;
    delete item.photoCount;
    delete item.photoAlt;
    return item;
  }
  var products = [
    make({
      id: "bracelet-bazi", name: "Bracelet BaZi sur mesure", eyebrow: "Bracelet · création personnalisée", type: "jewelry", collections: ["creations-bazi", "bracelets"],
      price: amount(140, 180, true), availability: "made-to-order", custom: true, lifestyle: "Bracelet BaZi porté au poignet, à côté d’un verre de thé à la menthe",
      aiPhotos: [["wrist", "Exemple de bracelet BaZi porté au poignet, avec sa breloque en pyrite"], ["flatlay", "Exemple de bracelet BaZi posé à plat sur du lin crème"], ["macro", "Gros plan sur les pierres et la pyrite d’un bracelet BaZi"], ["dish", "Exemple de bracelet BaZi dans une coupelle en céramique crème"]],
      description: "Parce que chaque personne a une carte énergétique différente… une empreinte énergétique unique… une alchimie qui lui est propre, les accessoires BaZi — une création à laquelle je suis parvenue après des années d’expérience dans le domaine des pierres et des sciences de l’énergie — sont des pièces conçues de façon personnelle à partir de votre carte BaZi : on y analyse la composition de vos éléments, et ceux qui ont besoin d’être soutenus ou équilibrés, puis on choisit les composants de l’accessoire en fonction de ces données.",
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
      price: amount(320), availability: "made-to-order", custom: true, lifestyle: "Collier BaZi porté sur un haut en lin crème",
      aiPhotos: [["neck", "Exemple de collier BaZi porté, vu de face"], ["side", "Exemple de collier BaZi porté, vu de profil"], ["flatlay", "Exemple de collier BaZi posé à plat sur du lin crème"], ["macro", "Gros plan sur le pendentif en pierre brute entouré de fil doré d’un collier BaZi"]],
      description: "Parce que chaque personne a une carte énergétique différente… une empreinte énergétique unique… une alchimie qui lui est propre, les accessoires BaZi — une création à laquelle je suis parvenue après des années d’expérience dans le domaine des pierres et des sciences de l’énergie — sont des pièces conçues de façon personnelle à partir de votre carte BaZi : on y analyse la composition de vos éléments, et ceux qui ont besoin d’être soutenus ou équilibrés, puis on choisit les composants de l’accessoire en fonction de ces données.",
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
      price: amount(100), availability: "quote", custom: false, lifestyle: "Bracelet Énergie Amour en quartz rose porté au poignet, près d’une tasse de thé",
      aiPhotos: [["uni-wrist", "Bracelet Énergie Amour en quartz rose uni porté au poignet"], ["uni-flatlay", "Bracelet Énergie Amour en quartz rose uni posé à plat sur du lin crème"], ["uni-macro", "Gros plan sur les perles facettées en quartz rose"], ["uni-dish", "Bracelet Énergie Amour en quartz rose uni dans une coupelle en céramique"],
        ["coeur-wrist", "Bracelet Énergie Amour avec cœur doré porté au poignet"], ["coeur-closeup", "Gros plan sur le cœur doré serti de petites pierres"], ["coeur-flatlay", "Bracelet Énergie Amour avec cœur posé à plat sur du lin crème"], ["coeur-dish", "Bracelet Énergie Amour avec cœur dans une coupelle en céramique"]],
      description: "Un bracelet pour activer l’énergie de l’amour, charger l’aura de vibrations d’amour et purifier le chakra du cœur des sentiments de tristesse.",
      benefits: [
        { icon: "love", label: "Associé à l'énergie d'amour et de douceur" },
        { icon: "calm", label: "Quartz rose, pierre traditionnellement liée à l'apaisement" }
      ],
      details: ["Taille de poignet standard indiquée dans le catalogue", "L’apparence varie selon l’exemple photographié", "La signification spirituelle relève de la démarche de la créatrice"],
      options: { variant: ["Quartz rose uni · 100 TND", "Composition avec cœur · tarif à confirmer"] }, variantPrices: { "Quartz rose uni · 100 TND": 100, "Composition avec cœur · tarif à confirmer": null },
      variantImageIndex: { "Quartz rose uni · 100 TND": 0, "Composition avec cœur · tarif à confirmer": 4 },
      priceNote: "Le tarif de 100 TND concerne l’exemple en quartz rose uni. Prix de la composition avec cœur à confirmer.",
      missing: ["Prix de la variante avec cœur", "Matières exactes par variante", "Disponibilité"]
    }),
    make({
      id: "porte-cles-pierre", name: "Porte-clés Pierre", eyebrow: "Accessoire · pierre", type: "accessory", collections: ["porte-cles"],
      price: null, availability: "quote", custom: false, featured: false, lifestyle: "Porte-clés Pierre tenu en main avec des clés, devant une porte d’entrée",
      aiPhotos: [["hand", "Porte-clés Pierre en labradorite tenu en main"], ["flatlay", "Porte-clés Pierre posé à plat sur du lin crème"], ["tote", "Porte-clés Pierre accroché à un sac en toile"], ["macro", "Gros plan sur la labradorite du porte-clés"]],
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
      price: null, availability: "quote", custom: true, lifestyle: "Portefeuille Hafidha El Mel vert, fermé, tenu en main au-dessus d’une table de café",
      aiPhotos: [["couleurs", "Le portefeuille Hafidha El Mel dans ses quatre coloris : vert, jaune, rose et rouge"],
        ["vert-flatlay", "Portefeuille Hafidha El Mel vert, fermé, posé à plat"], ["jaune-flatlay", "Portefeuille Hafidha El Mel jaune, fermé, posé à plat"], ["rose-flatlay", "Portefeuille Hafidha El Mel rose fuchsia, fermé, posé à plat"], ["rouge-flatlay", "Portefeuille Hafidha El Mel rouge, fermé, posé à plat"],
        ["vert-hand", "Portefeuille Hafidha El Mel vert tenu en main"], ["jaune-hand", "Portefeuille Hafidha El Mel jaune tenu en main"], ["rose-hand", "Portefeuille Hafidha El Mel rose fuchsia tenu en main"], ["rouge-hand", "Portefeuille Hafidha El Mel rouge tenu en main"],
        ["vert-mark", "Gros plan sur le marquage embossé du portefeuille vert"]],
      description: "Depuis plus de 9 ans, j’étudie la relation entre l’être humain et l’argent, et les différentes pratiques qui peuvent aider à créer un lien plus conscient avec l’énergie de l’argent… la réception et l’abondance.",
      benefits: [
        { icon: "abundance", label: "Pensé pour accompagner une relation plus sereine à l'argent" },
        { icon: "protection", label: "Préparation associant Reiki et lecture BaZi, selon la démarche de Rayda" },
        { icon: "personalization", label: "Disponible en quatre coloris" }
      ],
      details: ["Dimensions communiquées : 19,5 × 11 cm", "Cuir naturel de très bonne qualité", "Livré avec des cartes chargées et un exercice pour développer la réception financière", "Aucune promesse de résultat financier"],
      options: { variant: ["Vert", "Jaune", "Rose / fuchsia", "Rouge"] },
      variantImageIndex: { "Vert": 1, "Jaune": 2, "Rose / fuchsia": 3, "Rouge": 4 },
      priceNote: "Prix non communiqué dans les éléments reçus. Tarif et contenu exact à confirmer avec la créatrice.",
      missing: ["Prix", "Disponibilité"]
    }),
    make({
      id: "carte-million-dollar", name: "Carte Million Dollar dorée", eyebrow: "Objet doré · deux tailles", type: "decor", collections: ["objets-dores"],
      price: amount(45, 50), variantPrices: { "Petite · 16 × 5,5 cm": 45, "Grande · 19 × 6 cm": 50 }, availability: "quote", custom: false, lifestyle: "Carte Million Dollar dorée tenue en main au-dessus d’un bureau",
      aiPhotos: [["fingers", "Carte Million Dollar dorée tenue entre les doigts"], ["flatlay", "Carte Million Dollar dorée posée à plat sur du lin crème"], ["desk", "Carte Million Dollar dorée posée debout sur un bureau"], ["macro", "Gros plan sur le sceau et l’inscription ONE MILLION DOLLARS de la carte"]],
      description: "Êtes-vous prêt(e) à ouvrir les portes de la prospérité financière et à transformer votre réalité économique ? Nous vous présentons la luxueuse carte Million Dollar dorée, conçue avec art pour être bien plus qu’un bel objet : un véritable aimant pour attirer l’argent et les opportunités d’investissement dans votre vie.",
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
      price: amount(60), availability: "quote", custom: false, lifestyle: "Décor Abondance doré posé sur un bureau, à côté d’un ordinateur portable",
      aiPhotos: [["hand", "Décor Abondance doré tenu en main"], ["desk", "Décor Abondance doré posé sur un bureau"], ["shelf", "Décor Abondance doré posé sur une étagère"], ["crown", "Gros plan sur la couronne et le signe infini du décor Abondance"]],
      description: "Faites de votre espace une source d’énergie positive et de prospérité financière ! Nous vous présentons l’exclusif décor doré de la richesse, une œuvre unique conçue spécialement pour être un aimant visuel et énergétique qui attire l’argent et le succès dans votre vie.",
      benefits: [
        { icon: "abundance", label: "Motifs dollar, couronne et infini pour une intention d'abondance" },
        { icon: "clarity", label: "Objet décoratif pensé pour votre bureau ou votre intérieur" }
      ],
      details: ["Dimensions communiquées : 21 × 11 cm", "Acrylique miroir doré indiqué dans le catalogue", "La signification symbolique appartient à la démarche de la créatrice"],
      priceNote: "Tarif communiqué : 60 TND. Disponibilité à confirmer."
    }),
    make({
      id: "cle-de-vie", name: "Clé de Vie dorée · Ankh", eyebrow: "Décoration · symbole Ankh", type: "decor", collections: ["objets-dores"],
      price: amount(70), availability: "quote", custom: false, lifestyle: "Clé de Vie dorée posée sur une console d’entrée, près d’un vase de branches",
      aiPhotos: [["hand", "Clé de Vie dorée tenue en main"], ["wall", "Clé de Vie dorée accrochée au mur"], ["flatlay", "Clé de Vie dorée posée à plat sur du lin crème"], ["loop", "Gros plan sur la boucle gravée de la Clé de Vie"]],
      description: "Vous cherchez l’outil qui vous aide, sur le plan énergétique, à briser les chaînes de la stagnation financière et à ouvrir les portes fermées devant vos objectifs et vos ambitions ? Nous vous présentons la « Clé de Vie dorée » (Ankh) dans sa version énergétique et spirituelle de prestige.",
      benefits: [
        { icon: "protection", label: "Symbole ancien d'énergie et de vitalité" },
        { icon: "clarity", label: "Pièce chargée selon la démarche spirituelle de Rayda" }
      ],
      details: ["Dimensions communiquées : 27 × 16 cm", "Métal doré gravé indiqué dans le catalogue", "Rayda décrit une préparation spirituelle propre à sa pratique"],
      priceNote: "Tarif communiqué : 70 TND. Disponibilité à confirmer."
    }),
    make({
      id: "fleur-de-vie", name: "Décor Fleur de Vie dorée", eyebrow: "Décoration · fleur de vie", type: "decor", collections: ["objets-dores"],
      price: amount(80), availability: "quote", custom: false, lifestyle: "Décor Fleur de Vie doré posé sur une console en bois, près d’un olivier en pot",
      aiPhotos: [["hands", "Décor Fleur de Vie doré tenu à deux mains"], ["wall", "Décor Fleur de Vie doré accroché au mur"], ["flatlay", "Décor Fleur de Vie doré posé à plat sur du lin crème"], ["closeup", "Gros plan sur les motifs du décor Fleur de Vie"]],
      description: "Vous souhaitez un décor qui aide à transformer votre maison ou votre bureau en une oasis de paix énergétique, d’équilibre et de programmation vers une abondance infinie ? Nous vous présentons le luxueux décor doré « Fleur de Vie », l’œuvre la plus remarquable de la géométrie sacrée.",
      benefits: [
        { icon: "clarity", label: "Symbole d'harmonie et d'équilibre" },
        { icon: "abundance", label: "Finition miroir dorée pour sublimer votre intérieur" }
      ],
      details: ["Diamètre communiqué : 23 cm", "Métal miroir doré découpé indiqué dans le catalogue", "La signification symbolique appartient à la démarche de la créatrice"],
      priceNote: "Tarif communiqué : 80 TND. Disponibilité à confirmer."
    }),
    make({
      id: "pendentif-voiture-fleur", name: "Pendentif voiture · Fleur de Vie", eyebrow: "Accessoire voiture · doré", type: "car", collections: ["voiture"],
      price: amount(80), availability: "quote", custom: false, photoCount: 2, lifestyle: "Pendentif Fleur de Vie suspendu au rétroviseur d’une voiture",
      description: "Nous vous présentons le luxueux pendentif de voiture au symbole doré de la « Fleur de Vie » : un accessoire élégant, conçu avec soin pour apporter une touche de beauté exceptionnelle à votre voiture, et pour être en même temps une source de sérénité et d’harmonie énergétique pendant la conduite.",
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
      price: amount(80), availability: "quote", custom: false, lifestyle: "Pendentif Clé de Vie suspendu au rétroviseur d’une voiture, face à la mer",
      aiPhotos: [["mirror", "Pendentif Clé de Vie suspendu au rétroviseur d’une voiture"], ["passenger", "Pendentif Clé de Vie vu depuis le siège passager"], ["held", "Pendentif Clé de Vie tenu à la main dans la voiture"], ["flatlay", "Pendentif Clé de Vie posé à plat sur du lin crème"]],
      description: "Nous vous présentons le luxueux pendentif de voiture au symbole doré de la « Clé de Vie » : un accessoire élégant, conçu avec soin pour apporter une touche de beauté exceptionnelle à votre voiture, et pour être en même temps une source de sérénité et d’harmonie énergétique pendant la conduite.",
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
