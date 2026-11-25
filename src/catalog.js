(function () {
  "use strict";
  // Source: organized Products/Catalogue Produits - Issolatej.xlsx.
  // Image files are copied from the numbered source folders without editing them.
  // Twenty-two products also lead with a lifestyle scene, <id>-ugc.jpg, made with CreateUGC from Rayda's own photo of
  // the piece (originals in "om Adem/UGC photos (CreateUGC)"); the product pages say so under the gallery. On the
  // bottle's scene the printed verses are Rayda's real print, laid in from her photo letter for letter, and the Feng
  // Shui coins in theirs are her real coins and cord, laid in from her photo.
  // Products with aiPhotos show, after that scene, photos made in ChatGPT from Rayda's own photos instead of her
  // photos: <id>-ai-<shot>.jpg (originals in "om Adem/ChatGPT photos (full size)"). Each entry is [shot, alt], and
  // variantImageIndex counts within aiPhotos. The product pages say so under the gallery.
  // ownPhotos can add Rayda's own photos after those, by number: [n, alt] shows <id>-<nn>.jpg. No product uses it or
  // photoCount any more: since 21 November every gallery shows only scenes and ChatGPT photos made from her photos (the
  // user's request). Her photos stay in the folder as <id>-<nn>.jpg. On the love bottle, the four energy keyrings and
  // the Feng Shui coins, the writing, print and coins in the new photos are hers: laid in from her photos, or checked
  // against them stroke by stroke.
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
    if (item.ownPhotos) item.images = item.images.concat(item.ownPhotos.map(function (photo) {
      return { src: "/assets/products/organized/" + item.id + "-" + String(photo[0]).padStart(2, "0") + ".jpg", alt: photo[1] };
    }));
    if (item.lifestyle) {
      item.images.unshift({ src: "/assets/products/organized/" + item.id + "-ugc.jpg", alt: item.lifestyle });
      item.coverImageIndex = 0;
      if (item.variantImageIndex) Object.keys(item.variantImageIndex).forEach(function (key) { item.variantImageIndex[key] += 1; });
    }
    delete item.lifestyle;
    delete item.aiPhotos;
    delete item.ownPhotos;
    delete item.photoCount;
    delete item.photoAlt;
    return item;
  }
  var products = [
    make({
      id: "bracelet-bazi", name: "Bracelet BaZi sur mesure", eyebrow: "Bracelet · création personnalisée", type: "jewelry", collections: ["creations-bazi", "bracelets"],
      price: amount(140, 180, true), availability: "made-to-order", custom: true, lifestyle: "Bracelet BaZi porté au poignet, à côté d’un verre de thé à la menthe",
      aiPhotos: [["wrist", "Exemple de bracelet BaZi porté au poignet, avec sa breloque en pyrite"], ["flatlay", "Exemple de bracelet BaZi posé à plat sur du lin crème"], ["macro", "Gros plan sur les pierres et la pyrite d’un bracelet BaZi"], ["dish", "Exemple de bracelet BaZi dans une coupelle en céramique crème"],
        // Eight more bracelets made by Rayda (her photos of 21 November, "هاذم تو براسلايات بازي … خليهم مع التصاور"), each
        // shown as a ChatGPT photo made from her photo of it.
        ["modele-a", "Exemple de bracelet BaZi en perles bleues, jaunes, bleu clair et vertes, posé sur du lin crème"], ["modele-b", "Exemple de bracelet BaZi en perles blanches, vertes et violettes, avec une pierre brute claire"], ["modele-c", "Exemple de bracelet BaZi en éclats orange, verts et clairs, avec une pierre brune polie"], ["modele-d", "Exemple de bracelet BaZi en perles violettes, blanches et bleues, avec une pierre brute grise cerclée de fil argenté"],
        ["modele-e", "Exemple de bracelet BaZi en perles vertes et blanches et éclats orange, avec une pierre brute dorée cerclée de fil doré"], ["modele-f", "Exemple de bracelet BaZi en éclats verts et rouges, perles bleues et pierre brute claire"], ["modele-g", "Exemple de bracelet BaZi en éclats orange, perles violettes et blanches, avec une pierre brute claire"], ["modele-h", "Exemple de bracelet BaZi en perles violettes, blanches, vertes et noires, avec une pierre brute claire"]],
      description: "Parce que chaque personne a une carte énergétique différente… une empreinte énergétique unique… une alchimie qui lui est propre, les accessoires BaZi — une création à laquelle je suis parvenue après des années d’expérience dans le domaine des pierres et des sciences de l’énergie — sont des pièces conçues de façon personnelle à partir de votre carte BaZi : on y analyse la composition de vos éléments, et ceux qui ont besoin d’être soutenus ou équilibrés, puis on choisit les composants de l’accessoire en fonction de ces données.",
      benefits: [
        { icon: "personalization", label: "Unique : composé selon votre propre carte BaZi" },
        { icon: "calm", label: "Pensé pour apporter calme et équilibre au quotidien" },
        { icon: "confidence", label: "Associé à la confiance en soi, selon la démarche de Rayda" }
      ],
      details: ["Bracelet élastique, taille standard indiquée dans le catalogue", "Composition personnalisée à discuter avec la créatrice", "Rayda décrit une préparation associant Reiki et récitations coraniques, sans promesse de résultat"],
      options: { variant: ["Composition sur mesure"] },
      priceNote: "Fourchette communiquée : 140 à 180 TND. Le tarif final est confirmé avant préparation.",
      missing: ["Composition exacte de la commande", "Tour de poignet précis", "Délai de fabrication", "Disponibilité"]
    }),
    // 21 November, her one change for the BaZi necklace: "نحب تعمل التصاور هاذم اختار وحدة منهم لابستها اللي في التصويرة".
    // Her three new necklaces replace the earlier example (its scene and AI photos stay in the folder). One of them, in
    // blue beads with a rough stone, is shown worn first; then each necklace laid flat. All four are ChatGPT photos made
    // from her photos (collier-bazi-04…07.jpg, kept in the folder).
    make({
      id: "collier-bazi", name: "Collier BaZi complet", eyebrow: "Collier · création personnalisée", type: "jewelry", collections: ["creations-bazi", "colliers"],
      price: amount(320), availability: "made-to-order", custom: true,
      aiPhotos: [["porte", "Collier BaZi en perles bleues avec une pierre brute scintillante, porté sur un haut en lin crème"], ["lapis", "Collier BaZi en perles bleues avec une pierre brute scintillante cerclée de fil argenté, posé à plat sur du lin crème"], ["rose", "Collier BaZi en perles roses, vertes et noires, avec un pendentif noir facetté, posé à plat sur du lin crème"], ["tourmaline", "Collier BaZi en perles roses, vertes et grises, avec une pierre brute dorée cerclée de fil doré, posé à plat sur du lin crème"]],
      description: "Parce que chaque personne a une carte énergétique différente… une empreinte énergétique unique… une alchimie qui lui est propre, les accessoires BaZi — une création à laquelle je suis parvenue après des années d’expérience dans le domaine des pierres et des sciences de l’énergie — sont des pièces conçues de façon personnelle à partir de votre carte BaZi : on y analyse la composition de vos éléments, et ceux qui ont besoin d’être soutenus ou équilibrés, puis on choisit les composants de l’accessoire en fonction de ces données.",
      benefits: [
        { icon: "personalization", label: "Composition unique selon votre lecture BaZi" },
        { icon: "calm", label: "Pensé pour la sérénité et l'apaisement" },
        { icon: "love", label: "Souvent offert comme symbole de lien et d'attention" }
      ],
      details: ["Longueur standard indiquée dans le catalogue ; mesure précise à confirmer", "Composition à discuter avec la créatrice", "Exemple vendu annoncé à 320 TND"],
      options: { variant: ["Composition sur mesure"] },
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
      price: null, availability: "quote", custom: false, featured: false, aiPhotos: [["lin", "Porte-clés Arbre de Vie en fil argenté et perles de pierre, posé sur du lin crème"], ["sac", "Porte-clés Arbre de Vie accroché à l’anse d’un sac en toile crème"]],
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
      id: "portefeuille-hafidha", name: "Portefeuille Hafidha El Mel", eyebrow: "Portefeuille · trois coloris", type: "accessory", collections: ["creations-bazi", "portefeuilles"],
      price: amount(120), availability: "quote", custom: true, lifestyle: "Portefeuille Hafidha El Mel vert, fermé, tenu en main au-dessus d’une table de café",
      aiPhotos: [["trois-couleurs", "Le portefeuille Hafidha El Mel dans ses trois coloris : vert, jaune et rouge"],
        ["vert-flatlay", "Portefeuille Hafidha El Mel vert, fermé, posé à plat"], ["jaune-flatlay", "Portefeuille Hafidha El Mel jaune, fermé, posé à plat"], ["rouge-flatlay", "Portefeuille Hafidha El Mel rouge, fermé, posé à plat"],
        ["vert-hand", "Portefeuille Hafidha El Mel vert tenu en main"], ["jaune-hand", "Portefeuille Hafidha El Mel jaune tenu en main"], ["rouge-hand", "Portefeuille Hafidha El Mel rouge tenu en main"],
        ["vert-mark", "Gros plan sur le marquage embossé du portefeuille vert"]],
      description: "Depuis plus de 9 ans, j’étudie la relation entre l’être humain et l’argent, et les différentes pratiques qui peuvent aider à créer un lien plus conscient avec l’énergie de l’argent… la réception et l’abondance.",
      benefits: [
        { icon: "abundance", label: "Pensé pour accompagner une relation plus sereine à l'argent" },
        { icon: "protection", label: "Préparation associant Reiki et lecture BaZi, selon la démarche de Rayda" },
        { icon: "personalization", label: "Couleur choisie selon votre date de naissance" }
      ],
      details: ["Dimensions communiquées : 19,5 × 11 cm", "Cuir naturel de très bonne qualité", "Livré avec des cartes chargées et un exercice pour développer la réception financière", "Il accompagne votre intention et vos efforts : ce n’est pas une garantie de recevoir de l’argent"]
    }),
    make({
      id: "carte-million-dollar", name: "Carte Million Dollar dorée", eyebrow: "Objet doré · deux tailles", type: "decor", collections: ["portefeuilles"],
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
      aiPhotos: [["main", "Décor Abondance doré, fin et plat, tenu en main"], ["bureau", "Décor Abondance doré posé sur un bureau"], ["etagere", "Décor Abondance doré posé sur une étagère"], ["couronne", "Gros plan sur la couronne et le signe infini du décor Abondance"]],
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
      price: amount(80), availability: "quote", custom: false, aiPhotos: [], lifestyle: "Pendentif Fleur de Vie suspendu au rétroviseur d’une voiture",
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
    }),
    // Rayda's book, sent on 15 November in three editions (primary, middle and high school, baccalaureate), at 35, 42
    // and 45 TND ("35د الابتدائي", "42 الإعدادي و الثانوي", "45 الباكالوريا"). Her own text for the baccalaureate
    // edition is shown only when that edition is picked (product-texts.mjs, variantTexts).
    make({
      id: "livre-excellence", name: "Livre « Votre excellence est votre choix »", eyebrow: "Livre · trois éditions", type: "book", collections: ["livres"],
      price: amount(35, 45), availability: "quote", custom: false, lifestyle: "Les trois éditions du livre « Votre excellence est votre choix » posées debout sur un bureau, près d’une fenêtre",
      aiPhotos: [["primaire-flatlay", "Édition primaire du livre « Votre excellence est votre choix », posée à plat sur du lin avec un crayon"], ["college-desk", "Édition collège et lycée du livre posée sur un bureau, à côté d’un cahier et d’un thé à la menthe"], ["bac-standing", "Édition baccalauréat du livre posée debout sur un bureau, près d’une plante"]],
      description: "La vraie réussite scolaire prend sa source à l’intérieur : elle naît d’une reprogrammation positive du subconscient, nourrie par l’amour du savoir, la passion d’apprendre et des objectifs clairs qui mobilisent tout le potentiel de l’élève vers l’excellence, avec la grâce de Dieu.",
      benefits: [
        { icon: "clarity", label: "Pensé pour étudier avec plus de concentration et moins d’effort" },
        { icon: "confidence", label: "Des exercices pratiques pour gagner en confiance et en autonomie" },
        { icon: "chat", label: "Un accompagnement continu tout au long de l’année" }
      ],
      details: ["Trois éditions : primaire, collège et lycée, baccalauréat", "Primaire : 35 TND ; collège et lycée : 42 TND ; baccalauréat : 45 TND", "Exercices et applications pratiques, avec des conseils de Feng Shui pour l’espace d’étude", "Édition baccalauréat : un accompagnement organisé par trimestre", "Reliure à spirale pour le primaire et le collège-lycée, livre broché pour le baccalauréat"],
      options: { variant: ["Primaire", "Collège et lycée", "Baccalauréat"] }, variantPrices: { "Primaire": 35, "Collège et lycée": 42, "Baccalauréat": 45 },
      variantImageIndex: { "Primaire": 0, "Collège et lycée": 1, "Baccalauréat": 2 },
      priceNote: "Prix selon l’édition : primaire 35 TND, collège et lycée 42 TND, baccalauréat 45 TND. Disponibilité à confirmer.",
      missing: ["Disponibilité"]
    }),
    // Her learning accessories, sent the same day: a bracelet, a necklace on a cord and a necklace on a gold chain,
    // each prepared from the client's birth date (so custom, like the BaZi pieces). She priced the bracelet and the
    // cord necklace at 100 TND ("ثمن السوار و القلادة بالخيط 100د", read as each) and the gold-chain necklace, in
    // stainless steel, at 130 TND ("ثمن القلادة الذهبية من الفولاذ المقاوم للصدإ acier inoxydable 130د").
    make({
      id: "accessoires-apprentissage", name: "Accessoires Énergie d’apprentissage", eyebrow: "Bracelet ou collier · préparé pour vous", type: "jewelry", collections: ["apprentissage", "bracelets", "colliers"],
      price: amount(100, 130), availability: "made-to-order", custom: true, lifestyle: "Le bracelet et les deux colliers Énergie d’apprentissage posés sur un bureau d’étude, près d’un cahier ouvert",
      aiPhotos: [["bracelet-wrist", "Bracelet Énergie d’apprentissage porté au poignet pendant une séance d’écriture"], ["chaine-neck", "Collier Énergie d’apprentissage sur chaîne dorée, porté"], ["cordon-desk", "Collier Énergie d’apprentissage sur cordon noir, posé sur un bureau près d’un cahier"],
        // Her own necklaces (her photos of 21 November), each as a ChatGPT photo made from her photo of it.
        ["cordon-carnet", "Collier Énergie d’apprentissage sur cordon noir, en perles violettes, bleu clair et bleues, posé près d’un carnet"], ["chaine-carnet", "Collier Énergie d’apprentissage sur chaîne dorée, en perles violettes, bleu clair et bleues, posé près d’un carnet"]],
      description: "Cette collection s’appuie sur les fréquences des pierres précieuses, reconnues pour leur capacité à stimuler la perception et à apaiser les pensées qui s’emballent.",
      benefits: [
        { icon: "clarity", label: "Pensé pour soutenir la concentration pendant les études" },
        { icon: "calm", label: "Des pierres associées au calme des pensées, selon la démarche de Rayda" },
        { icon: "personalization", label: "Préparé à partir de votre date de naissance" }
      ],
      details: ["Trois pièces au choix : bracelet, collier sur cordon ou collier sur chaîne dorée", "Bracelet et collier sur cordon : 100 TND chacun ; collier sur chaîne dorée en acier inoxydable : 130 TND", "Les pierres peuvent varier en nombre, en type, en forme et en taille", "Rayda décrit un nettoyage énergétique des pierres, puis une charge associant Reiki, noms d’Allah et Saint Coran, sans promesse de résultat"],
      options: { variant: ["Bracelet", "Collier sur cordon", "Collier sur chaîne dorée"] }, variantPrices: { "Bracelet": 100, "Collier sur cordon": 100, "Collier sur chaîne dorée": 130 },
      variantImageIndex: { "Bracelet": 0, "Collier sur cordon": 2, "Collier sur chaîne dorée": 1 },
      priceNote: "Bracelet et collier sur cordon : 100 TND chacun. Collier sur chaîne dorée en acier inoxydable : 130 TND.",
      missing: ["Délai de préparation", "Disponibilité"]
    }),
    // Her glass water bottle, sent the same night for her study collection: glass, 1 litre, 55 TND ("المادة :البلور /
    // السعة :لتر / الثمن 55د"), printed with Quran verses, symbols and affirmations. Its gallery opens on a CreateUGC
    // scene whose printed verses are her real print, laid in from her close-up photo letter for letter (CreateUGC's own
    // lettering was wrong), then her own photos.
    make({
      id: "bouteille-verre", name: "Bouteille d’eau en verre", eyebrow: "Bouteille · verre, 1 litre", type: "accessory", collections: ["apprentissage", "bouteilles"],
      price: amount(55), availability: "quote", custom: false, aiPhotos: [],
      lifestyle: "Bouteille d’eau en verre posée sur un bureau d’étude, à côté d’un cahier ouvert et d’un crayon",
      description: "Cette bouteille réunit deux dimensions complémentaires :",
      benefits: [
        { icon: "clarity", label: "Un rappel quotidien pour accompagner les études de votre enfant" },
        { icon: "confidence", label: "Des affirmations autour de la confiance en soi et de l’amour du savoir" },
        { icon: "protection", label: "Versets du Coran et symboles, selon la démarche de Rayda" }
      ],
      details: ["Matière : verre", "Contenance : 1 litre", "Imprimée de versets du Coran, de symboles et d’affirmations positives", "La dimension énergétique et symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 55 TND. Disponibilité à confirmer."
    }),
    // Her key necklace, in stainless steel: 45 TND, the long necklace 55 TND ("السعر :45د / القلادة الطويلة :55د"). She
    // photographed two keys, a large flowered one and a small clover one; which key is the long necklace is still to
    // confirm with her, so the choice is the length only. The scene shows the flowered key; her photos show both keys.
    make({
      id: "collier-cle", name: "Collier Clé", eyebrow: "Collier · acier inoxydable", type: "jewelry", collections: ["colliers"],
      price: amount(45, 55), availability: "quote", custom: false, aiPhotos: [["grande-cle", "Collier Clé doré : la grande clé fleurie, sertie de petites pierres brillantes, posée sur du lin crème"], ["petite-cle", "Collier Clé doré : la petite clé trèfle, sertie de petites pierres brillantes, posée sur du lin crème"]],
      lifestyle: "Collier Clé porté sur un haut en lin crème à col rond",
      description: "Lorsque l’on comprend que tout est énergie, et que les symboles peuvent générer des fréquences subtiles et interagir avec notre inconscient, on réalise que la présence du pendentif en forme de clé à cet emplacement n’a rien d’anodin.",
      benefits: [
        { icon: "abundance", label: "Un symbole associé à la chance et à l’ouverture des portes" },
        { icon: "protection", label: "Chargé par le Reiki de l’Argent, selon la démarche de Rayda" }
      ],
      details: ["Matière : acier inoxydable doré", "Collier standard : 45 TND ; collier long : 55 TND", "Deux modèles de clé photographiés : une grande clé fleurie et une petite clé trèfle", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      options: { variant: ["Collier standard", "Collier long"] }, variantPrices: { "Collier standard": 45, "Collier long": 55 },
      priceNote: "Collier standard : 45 TND. Collier long : 55 TND. Disponibilité à confirmer.",
      missing: ["Modèle de clé du collier long", "Longueurs exactes", "Disponibilité"]
    }),
    // Her "Feng Shui products for financial abundance" ("منتجات الفنج شوي للوفرة المالية"): three Chinese coins tied with
    // a red string. She sent photos only; on 19 November she gave the price, 45 TND, in reply to her own photo of the
    // coins ("ثمنها 45"). Still no text from her. The scene's coins and cord are her real ones, laid in from her photo
    // (CreateUGC invented the characters).
    make({
      id: "pieces-feng-shui", name: "Pièces chinoises Feng Shui", eyebrow: "Feng Shui · fil rouge", type: "decor", collections: ["objets-dores"],
      price: amount(45), availability: "quote", custom: false, aiPhotos: [["lin", "Les trois pièces chinoises nouées d’un fil rouge, posées sur du lin près de tiges de bambou"], ["console", "Les trois pièces chinoises nouées d’un fil rouge, posées sur une console en chêne près d’une coupelle"]],
      lifestyle: "Les trois pièces chinoises nouées d’un fil rouge posées sur une table en bois, près d’un vase de bambous",
      description: "Trois pièces chinoises nouées d’un fil rouge : un objet Feng Shui que Rayda propose pour l’abondance financière.",
      benefits: [
        { icon: "abundance", label: "Un objet Feng Shui pour une intention d’abondance financière" }
      ],
      details: ["Trois pièces à trou carré, nouées d’un fil rouge", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 45 TND. Disponibilité à confirmer.",
      missing: ["Texte de Rayda", "Dimensions", "Disponibilité"]
    }),
    // Her money frog ("ضفدع المال"), sent on 19 November with her Feng Shui abundance symbols ("نكملوا في رموز الوفرة
    // المستعملة في الفنج شوي"): her texts in both languages; resin with a metal coin, 4.5 × 4 cm, 80 TND ("المادة :راتنج و
    // العملة معدنية / الأبعاد: 4,5 سنتمتر ×4 سنتمتر / الثمن: 80د", "Prix : 80 DT"). Her six photos, as sent, are kept in the
    // folder (grenouille-fortune-01…06.jpg); the gallery shows a CreateUGC scene and three ChatGPT photos made from them
    // (20 November), seen from the side so the scroll on the front of the base stays out of sight.
    make({
      id: "grenouille-fortune", name: "Grenouille de la fortune", eyebrow: "Feng Shui · résine dorée", type: "decor", collections: ["objets-dores"],
      price: amount(80), availability: "quote", custom: false, lifestyle: "Grenouille de la fortune dorée posée sur un bureau en chêne clair, près d’un vase de bambous porte-bonheur et d’un thé à la menthe",
      aiPhotos: [["main", "Grenouille de la fortune dorée posée au creux d’une main"], ["console", "Grenouille de la fortune dorée sur une console d’entrée, près d’une coupelle de clés et de bambous porte-bonheur"], ["bureau", "Grenouille de la fortune dorée sur un bureau, à côté d’un ordinateur portable, d’un carnet et d’une plante"]],
      description: "La grenouille de la fortune, également connue sous le nom de « Chan Chu » ou grenouille à trois pattes, est l’un des symboles les plus emblématiques de richesse et d’abondance dans la philosophie chinoise du Feng Shui.",
      benefits: [
        { icon: "abundance", label: "Un symbole Feng Shui de richesse et d’abondance" },
        { icon: "protection", label: "Chargée en Reiki de l’Argent, selon la démarche de Rayda" }
      ],
      details: ["Matière : résine et pièce en métal", "Dimensions : 4,5 × 4 cm", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 80 TND. Disponibilité à confirmer.",
      missing: ["Disponibilité"]
    }),
    // Her love trophy ("رمز الحب", "Trophée d’Amour"), sent the same night "with the love collection" ("هذا مع مجموعة
    // الحب"): plexiglass ("زجاج شبكي Plexi"), 115 TND ("115د"). Her Arabic text is complete; her French message was cut
    // off after its first "why now" point in the screenshots, so its last two points and its closing line are translated
    // from her Arabic (product-texts.mjs). The medallion is engraved « الله الجامع ». Her one photo is kept in the folder
    // (trophee-amour-01.jpg); the gallery shows a CreateUGC scene, whose medallion reproduces her engraving, and two
    // ChatGPT photos (20 November), each medallion checked letter by letter.
    make({
      id: "trophee-amour", name: "Trophée d’Amour", eyebrow: "Décoration · plexiglas doré", type: "decor", collections: ["objets-dores"],
      price: amount(115), availability: "quote", custom: false, lifestyle: "Trophée d’Amour, médaillon gravé « الله الجامع », posé sur une table de chevet près d’une lampe et d’un lit en lin crème",
      aiPhotos: [["etagere", "Trophée d’Amour posé sur une étagère en bois, près d’une fenêtre, d’une bougie et de livres"], ["commode", "Trophée d’Amour sur une commode blanche, près d’un petit vase de roses et d’une coupelle de perles"]],
      description: "Je vous présente le « Trophée d’Amour », une pièce décorative conçue avec soin pour devenir un véritable ancrage visuel et spirituel, favorisant votre équilibre émotionnel et vous invitant à accueillir une énergie de stabilité et d’harmonie dans votre vie affective.",
      benefits: [
        { icon: "love", label: "Un symbole d’amour durable, d’affection et de miséricorde" },
        { icon: "protection", label: "Chargé par le Reiki, le Saint Coran et les Beaux Noms d’Allah, selon la démarche de Rayda" }
      ],
      details: ["Matière : plexiglas", "Deux cygnes en miroir doré dont les cous dessinent un cœur, ailes et cœurs rouges, médaillon gravé « الله الجامع »", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 115 TND. Disponibilité à confirmer.",
      missing: ["Dimensions", "Disponibilité"]
    }),
    // Her love bottle, "قارورة الحب" / "Bouteille de l’Amour", for her love collection (her messages of 20 and 21 November):
    // glass, 1 litre, 55 TND ("المادة :بلور / السعة :لتر / الثمن :55د"; "Matière : Verre / Contenance : 1 litre / Prix :
    // 55 DT"). She sent three photos of it on 19 November, just after the trophy (bouteille-amour-01…03.jpg, kept in the
    // folder). The gallery is a CreateUGC scene and two ChatGPT photos of the plain bottle, with her real print laid onto
    // its two visible faces from her photos. Since 21 November it is in the Bouteilles group with the glass bottle for
    // studies, as well as in her Amour collection.
    make({
      id: "bouteille-amour", name: "Bouteille de l’Amour", eyebrow: "Bouteille · verre, 1 litre", type: "accessory", collections: ["bouteilles"],
      price: amount(55), availability: "quote", custom: false, lifestyle: "Bouteille de l’Amour remplie d’eau, imprimée en rouge de versets du Coran, posée sur une table près de deux verres et d’un bouquet de roses",
      aiPhotos: [["chevet", "Bouteille de l’Amour posée sur une table de chevet, ses versets imprimés en rouge sur le verre"], ["table", "Bouteille de l’Amour posée sur une table en chêne, près d’un verre"]],
      description: "La Bouteille de l’Amour agit sur deux niveaux complémentaires :",
      benefits: [
        { icon: "love", label: "Pensée pour l’amour, la tendresse et l’harmonie au sein du couple" },
        { icon: "personalization", label: "Les personnes non mariées peuvent aussi l’utiliser" },
        { icon: "protection", label: "Versets du Coran, Beaux Noms d’Allah et symboles, selon la démarche de Rayda" }
      ],
      details: ["Matière : verre", "Contenance : 1 litre", "Imprimée en rouge de versets du Coran, des Beaux Noms d’Allah et de symboles", "La dimension énergétique et symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 55 TND. Disponibilité à confirmer.",
      missing: ["Disponibilité"]
    }),
    // Her four charged keyrings (21 November), 30 TND each, with one sentence each in Arabic and in French. The love one
    // came with her love collection; the other three are "the rest of the products, after the love collection" ("هذه بقية
    // المنتجات … بعد مجموعة الحب"). Each photo came just before its text. The writing on each was read from her photos.
    // Each gallery is a CreateUGC scene, then two ChatGPT photos (held by its ring, laid on linen), made from her photos
    // (porte-cles-<nom>-01….jpg, kept in the folder). The scenes kept her writing; on the ChatGPT photos of the Chance and
    // Voyage keyrings the verse under the gold leaf came out wrong, so that band was replaced with the scene's.
    make({
      id: "porte-cles-amour", name: "Porte-clés Amour", eyebrow: "Porte-clés énergétique · amour", type: "accessory", collections: ["porte-cles"],
      price: amount(30), availability: "quote", custom: false, lifestyle: "Porte-clés Amour : deux cygnes dorés sous l’inscription « وجعل بينكم مودة ورحمة » et deux cœurs rouges, posé sur une console, près d’un bouquet de roses et d’une coupelle de clés",
      aiPhotos: [["main", "Porte-clés Amour tenu par son anneau : deux cygnes dorés sous l’inscription « وجعل بينكم مودة ورحمة » et deux cœurs rouges sur un disque blanc nacré"], ["lin", "Porte-clés Amour posé sur du lin crème : deux cygnes dorés sous l’inscription « وجعل بينكم مودة ورحمة » et deux cœurs rouges sur un disque blanc nacré"]],
      description: "Un porte-clés énergétique chargé, conçu pour programmer le subconscient à l’amour, à la tendresse, à la compassion et à une relation amoureuse durable.",
      benefits: [
        { icon: "love", label: "Pensé pour l’amour, la tendresse et une relation amoureuse durable" },
        { icon: "protection", label: "Porte-clés énergétique chargé, selon la démarche de Rayda" }
      ],
      details: ["Disque blanc nacré orné de feuilles dorées, de deux cygnes dorés et de deux cœurs rouges", "Inscription en rouge : « وجعل بينكم مودة ورحمة »", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 30 TND. Disponibilité à confirmer.",
      missing: ["Dimensions", "Disponibilité"]
    }),
    make({
      id: "porte-cles-chance", name: "Porte-clés Chance", eyebrow: "Porte-clés énergétique · chance", type: "accessory", collections: ["porte-cles"],
      price: amount(30), availability: "quote", custom: false, lifestyle: "Porte-clés Chance : une croix ankh dorée entourée de versets en rouge, posé sur un bureau, près d’un carnet et d’un thé à la menthe",
      aiPhotos: [["main", "Porte-clés Chance tenu par son anneau : une croix ankh dorée entourée de versets en rouge sur un disque blanc nacré"], ["lin", "Porte-clés Chance posé sur du lin crème : une croix ankh dorée entourée de versets en rouge sur un disque blanc nacré"]],
      description: "Un porte-clés énergétique chargé, conçu pour programmer le subconscient à attirer la chance et à favoriser la fluidité et la facilité dans la vie.",
      benefits: [
        { icon: "abundance", label: "Pensé pour attirer la chance" },
        { icon: "calm", label: "Pour plus de fluidité et de facilité au quotidien, selon la démarche de Rayda" }
      ],
      details: ["Disque blanc nacré orné de feuilles dorées et d’une croix ankh dorée", "Inscriptions en rouge : « إنا فتحنا لك فتحا مبينا » et « وما يلقاها إلا ذو حظ عظيم »", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 30 TND. Disponibilité à confirmer.",
      missing: ["Dimensions", "Disponibilité"]
    }),
    make({
      id: "porte-cles-voyage", name: "Porte-clés Voyage", eyebrow: "Porte-clés énergétique · voyage", type: "accessory", collections: ["porte-cles"],
      price: amount(30), availability: "quote", custom: false, lifestyle: "Porte-clés Voyage : un globe et un avion dorés entourés de versets en rouge, posé sur une table, près d’un chapeau de paille, de lunettes de soleil et d’un appareil photo",
      aiPhotos: [["main", "Porte-clés Voyage tenu par son anneau : un globe et un avion dorés entourés de versets en rouge sur un disque blanc nacré"], ["lin", "Porte-clés Voyage posé sur du lin crème : un globe et un avion dorés entourés de versets en rouge sur un disque blanc nacré"]],
      description: "Un porte-clés énergétique chargé, conçu pour programmer le subconscient à faciliter les voyages et à favoriser les déplacements en toute fluidité.",
      benefits: [
        { icon: "calm", label: "Pensé pour faciliter les voyages et les déplacements" },
        { icon: "protection", label: "Porte-clés énergétique chargé, selon la démarche de Rayda" }
      ],
      details: ["Disque blanc nacré orné de feuilles dorées, d’un globe et d’un avion dorés", "Inscriptions en rouge : « وقال اركبوا فيها بسم الله مجراها ومرساها » et « هو الذي جعل لكم الأرض ذلولا فامشوا في مناكبها »", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 30 TND. Disponibilité à confirmer.",
      missing: ["Dimensions", "Disponibilité"]
    }),
    make({
      id: "porte-cles-protection", name: "Porte-clés Protection", eyebrow: "Porte-clés énergétique · protection", type: "accessory", collections: ["porte-cles"],
      price: amount(30), availability: "quote", custom: false, lifestyle: "Porte-clés Protection : une Fleur de Vie argentée cerclée d’or entre deux inscriptions en rouge, posé sur une console d’entrée, avec une clé de maison",
      aiPhotos: [["main", "Porte-clés Protection tenu par son anneau : une Fleur de Vie argentée cerclée d’or entre deux inscriptions en rouge sur un disque blanc nacré"], ["lin", "Porte-clés Protection posé sur du lin crème : une Fleur de Vie argentée cerclée d’or entre deux inscriptions en rouge sur un disque blanc nacré"]],
      description: "Un porte-clés énergétique chargé, conçu pour programmer le subconscient à se protéger des énergies négatives et à renforcer son bouclier énergétique.",
      benefits: [
        { icon: "protection", label: "Pensé pour se protéger des énergies négatives" },
        { icon: "calm", label: "Pour renforcer son bouclier énergétique, selon la démarche de Rayda" }
      ],
      details: ["Disque blanc nacré orné de feuilles dorées et d’une Fleur de Vie cerclée d’or", "Inscriptions en rouge : « فالله خير حافظا » et « وهو على كل شيء قدير »", "La signification symbolique appartient à la démarche de Rayda, sans promesse de résultat"],
      priceNote: "Tarif communiqué : 30 TND. Disponibilité à confirmer.",
      missing: ["Dimensions", "Disponibilité"]
    })
  ];
  window.STORE_CATALOG = {
    collections: [
      { slug: "all", name: "Toutes les créations", description: "Bijoux, accessoires et objets présentés par Issolatej.", productIds: products.map(function (p) { return p.id; }) },
      { slug: "creations-bazi", name: "Créations BaZi", description: "Pièces conçues après un échange autour de la carte BaZi.", productIds: ["bracelet-bazi", "collier-bazi", "portefeuille-hafidha"] },
      { slug: "bracelets", name: "Bracelets", description: "Bracelet BaZi sur mesure, bracelet Énergie Amour et bracelet Énergie d’apprentissage.", productIds: ["bracelet-bazi", "bracelet-amour", "accessoires-apprentissage"] },
      { slug: "colliers", name: "Colliers", description: "Collier BaZi composé pour une personne, colliers Énergie d’apprentissage et collier Clé.", productIds: ["collier-bazi", "accessoires-apprentissage", "collier-cle"] },
      { slug: "porte-cles", name: "Porte-clés", description: "Porte-clés énergétiques Amour, Chance, Voyage et Protection, porte-clés de pierre et Arbre de Vie.", productIds: ["porte-cles-pierre", "porte-cles-arbre-vie", "porte-cles-amour", "porte-cles-chance", "porte-cles-voyage", "porte-cles-protection"] },
      { slug: "portefeuilles", name: "Portefeuille & carte", description: "Le portefeuille Hafidha El Mel en trois couleurs et la carte Million Dollar dorée, à glisser dans votre portefeuille.", productIds: ["portefeuille-hafidha", "carte-million-dollar"] },
      { slug: "objets-dores", name: "Objets dorés", description: "Objets décoratifs dorés, symboles Feng Shui et Trophée d’Amour.", productIds: ["decor-abondance", "cle-de-vie", "fleur-de-vie", "pieces-feng-shui", "grenouille-fortune", "trophee-amour"] },
      { slug: "bouteilles", name: "Bouteilles", description: "Deux bouteilles d’eau en verre d’un litre, imprimées de versets du Coran : l’une pour accompagner les études, l’autre pour l’amour.", productIds: ["bouteille-verre", "bouteille-amour"] },
      { slug: "voiture", name: "Pendentifs voiture", description: "Pendentifs décoratifs à suspendre dans la voiture.", productIds: ["pendentif-voiture-fleur", "pendentif-voiture-ankh"] },
      { slug: "livres", name: "Livres", description: "Le livre « Votre excellence est votre choix », en trois éditions : primaire, collège et lycée, baccalauréat.", productIds: ["livre-excellence"] },
      { slug: "apprentissage", name: "Accessoires d’étude", description: "Bracelet et colliers Énergie d’apprentissage, préparés à partir de votre date de naissance, et la bouteille d’eau en verre aux versets et affirmations.", productIds: ["accessoires-apprentissage", "bouteille-verre"] }
    ],
    // Paths ("chemins"): the first choice on the home page and in the Boutique; each opens /parcours/<slug>/ with only
    // its pieces. They are Rayda's own collections: "مجموعة التألق العلمي" and "مجموعة الوفرة" as she sent them on 15
    // November (the frog joined the abundance one on 19 November, with her Feng Shui abundance symbols), and "مجموعة
    // الحب", named when she sent the Trophée d’Amour on 19 November; the Énergie Amour bracelet stays in it.
    // Arabic words are in catalog-ar.mjs (pathsAr).
    paths: [
      { slug: "etudes", icon: "study", name: "Excellence scolaire", summary: "Pour les élèves et les étudiants : étudier avec plus de concentration et de confiance.", description: "La collection Excellence scolaire de Rayda : son livre « Votre excellence est votre choix » en trois éditions, les accessoires Énergie d’apprentissage et la bouteille d’eau en verre aux versets et affirmations.", productIds: ["livre-excellence", "accessoires-apprentissage", "bouteille-verre"] },
      { slug: "abondance", icon: "money", name: "Abondance", summary: "Pour accueillir l’abondance financière au quotidien.", description: "La collection Abondance de Rayda : le portefeuille Hafidha El Mel avec ses cartes et son exercice pour élargir l’énergie de réception de l’argent, la carte Million Dollar, le décor Abondance au dollar, à la couronne et à l’infini, le collier Clé, le bracelet BaZi, les pièces chinoises Feng Shui et la grenouille de la fortune.", productIds: ["portefeuille-hafidha", "carte-million-dollar", "decor-abondance", "collier-cle", "bracelet-bazi", "pieces-feng-shui", "grenouille-fortune"] },
      { slug: "amour", icon: "love", name: "Amour", summary: "Pour ouvrir votre cœur à l’énergie de l’amour.", description: "La collection Amour de Rayda : le Trophée d’Amour, un symbole d’amour durable chargé par le Reiki et le Saint Coran, la Bouteille de l’Amour, le porte-clés Amour et le bracelet Énergie Amour en quartz rose.", productIds: ["trophee-amour", "bouteille-amour", "porte-cles-amour", "bracelet-amour"] }
    ],
    products: products
  };
}());
