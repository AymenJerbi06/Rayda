(function () {
  "use strict";
  var config = window.STORE_CONFIG, catalog = config.previewStage ? window.STORE_DEMO_CATALOG : window.STORE_CATALOG, products = catalog.products;
  var shell = document.getElementById("site-shell"), drawer = document.getElementById("cart-drawer");
  var overlay = document.querySelector(".overlay"), searchDialog = document.getElementById("search-dialog");
  var imageDialog = document.getElementById("image-dialog"), cart = readCart(), reviewIndex = 0, heroIndex = 0, returnFocus = null;
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]; }); }
  function money(v) { return new Intl.NumberFormat("fr-TN", { maximumFractionDigits: 0 }).format(v) + " TND"; }
  function price(p, variant) {
    if (p.variantPrices && variant && Object.prototype.hasOwnProperty.call(p.variantPrices, variant)) {
      return p.variantPrices[variant] == null ? "Tarif à confirmer" : money(p.variantPrices[variant]);
    }
    return !p.price ? "Tarif à confirmer" : p.price.min === p.price.max ? money(p.price.min) : money(p.price.min) + " – " + money(p.price.max);
  }
  function colUrl(slug) { return "/collections/" + slug + "/"; }
  function prodUrl(p) { return "/products/" + p.slug + "/"; }
  function setMeta(title, description) {
    document.title = title + " — " + config.brand.name;
    var m = document.querySelector('meta[name="description"]'); if (m) m.content = description;
  }
  function img(p, i, cls) {
    var x = p.images[i || 0]; return '<img class="' + (cls || "") + '" src="' + esc(x.src) + '" alt="' + esc(x.alt) + '" loading="lazy" />';
  }
  function brandMarkup(extra) {
    var mark = config.brand.logoReady ? '<img class="brand-logo-image" src="' + esc(config.brand.logoPath) + '" alt="" />' : "";
    return '<a class="brand ' + (extra || "") + '" href="/" aria-label="' + esc(config.brand.name) + ' — accueil">' + mark +
      '<span class="brand-name">' + esc(config.brand.name) + '<small>L’ATELIER DE RAYDA · TUNISIE</small></span></a>';
  }
  function header() {
    return '<div class="utility-bar"><div class="utility-inner"><div class="utility-social"><span>Créations personnelles · Livraison en Tunisie</span></div><nav aria-label="Liens clients"><a href="#customer-care">Contact</a><a href="/#delivery">Livraison</a><button type="button" data-action="open-wishlist">Favoris</button><button type="button" class="utility-cart" data-action="open-cart"><svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h3l3 12h11l3-9H6M9 19h.01M18 19h.01"/></svg> PANIER <b class="bag-count">0</b></button></nav></div></div><div class="header-sentinel" aria-hidden="true"></div><header class="site-header">' +
      brandMarkup("") +
      '<nav class="main-nav" aria-label="Navigation principale"><a href="' + colUrl("all") + '">Boutique</a><a href="/#standards">Le sur-mesure</a><div class="nav-item"><button class="nav-toggle" type="button" data-action="learn-toggle" aria-expanded="false">Les collections <span aria-hidden="true">⌄</span></button><div class="mega-menu"><a href="' + colUrl("creations-bazi") + '"><b>Créations BaZi</b><small>Pièces personnalisées et échange avec Rayda</small></a><a href="' + colUrl("bracelets") + '"><b>Bracelets</b><small>BaZi et Énergie Amour</small></a><a href="' + colUrl("colliers") + '"><b>Colliers</b><small>Le collier BaZi complet</small></a><a href="' + colUrl("objets-dores") + '"><b>Objets dorés</b><small>Décors et symboles pour la maison</small></a><a href="' + colUrl("voiture") + '"><b>Pour la voiture</b><small>Pendentifs à suspendre</small></a></div></div><a href="/#about">Rayda</a><a href="/#customer-care">Contact</a></nav>' +
      '<div class="header-actions"><button class="icon-button" type="button" aria-label="Rechercher" data-action="open-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 5 5"/></svg></button></div>' +
      '<button class="mobile-menu icon-button" type="button" aria-label="Ouvrir le menu" aria-expanded="false" data-action="mobile-menu"><span></span><span></span><span></span></button></header>';
  }
  function footer() {
    return '<footer class="site-footer" id="customer-care"><div class="footer-main"><div class="footer-column"><h2>Service client</h2><a href="/#delivery">Livraison en Tunisie</a><a href="/#reviews">Paroles de clientes</a><a href="' + colUrl("all") + '">Toutes les créations</a><a href="https://wa.me/21621924070" target="_blank" rel="noopener noreferrer">WhatsApp · +216 21 924 070</a><div class="footer-social" aria-label="Contact"><a href="https://wa.me/21621924070" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">✆</a></div></div><div class="footer-column"><h2>À propos</h2><a href="/#about">Rayda et son atelier</a><a href="/#standards">Sa démarche</a><a href="' + colUrl("creations-bazi") + '">Créations BaZi</a><a href="' + colUrl("portefeuilles") + '">Hafidha El Mel</a></div><div class="footer-column"><h2>Collections</h2><a href="' + colUrl("bracelets") + '">Bracelets</a><a href="' + colUrl("colliers") + '">Colliers</a><a href="' + colUrl("porte-cles") + '">Porte-clés</a><a href="' + colUrl("objets-dores") + '">Objets dorés</a><a href="' + colUrl("voiture") + '">Pendentifs voiture</a></div><div class="footer-newsletter"><h2>Les nouvelles de l’atelier</h2><form class="newsletter-form"><label class="visually-hidden" for="newsletter-name">Votre nom</label><input id="newsletter-name" type="text" placeholder="NOM" autocomplete="name" /><label class="visually-hidden" for="newsletter-email">Votre adresse e-mail</label><input id="newsletter-email" type="email" placeholder="E-MAIL" autocomplete="email" required /><button type="submit">S’INSCRIRE</button><small>Formulaire en préparation · aucun envoi pour le moment.</small></form></div></div><div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' ' + esc(config.brand.name) + ' · Tunisie</span><nav aria-label="Informations"><a href="/#customer-care">Contact & informations</a><a href="/#delivery">Livraison</a></nav></div></footer>';
  }
  function shellPage(content) { shell.innerHTML = '<div id="top"></div>' + header() + '<main id="main-content">' + content + '</main>' + footer(); updateCount(); startHeaderMotion(); }
  function card(p) {
    var saved = wishlist().indexOf(p.id) >= 0;
    return '<article class="product-card"><div class="product-art"><a class="product-image-link" href="' + prodUrl(p) + '">' + img(p, p.coverImageIndex || 0, "product-image") + '</a><span class="product-badge">' + (p.custom ? "Sur mesure" : (!p.price ? "Prix à confirmer" : "Découvrir")) + '</span><button type="button" class="favorite-button' + (saved ? " selected" : "") + '" data-action="favorite" data-product="' + p.id + '" aria-pressed="' + saved + '" aria-label="Enregistrer ' + esc(p.name) + '">' + (saved ? "♥" : "♡") + '</button><a class="quick-view" href="' + prodUrl(p) + '">Voir ↗</a></div><div class="product-info"><p class="product-category">' + esc(p.eyebrow) + '</p><div class="product-title-row"><h3><a href="' + prodUrl(p) + '">' + esc(p.name) + '</a></h3><span class="product-price">' + esc(price(p)) + '</span></div><p class="product-summary">' + esc(p.description) + '</p><a class="product-action" href="' + prodUrl(p) + '">Voir la création <span>↗</span></a></div></article>';
  }
  function grid(list, cls) {
    return list.length ? '<div class="product-grid ' + (cls || "") + '">' + list.map(card).join("") + '</div>' : '<div class="empty-results"><span>✧</span><h3>Aucune pièce trouvée</h3><p>Essayez un autre filtre.</p></div>';
  }
  function home() {
    setMeta("L’atelier de Rayda", "Des bijoux BaZi personnalisés, des objets symboliques et un échange avec Rayda. Livraison en Tunisie.");
    shellPage(window.renderStoreHome({config: config, colUrl: colUrl, esc: esc}));
    startHomeMotion();
  }
  function collection(slug) {
    var c = catalog.collections.find(function (x) { return x.slug === slug; }) || catalog.collections[0];
    var list = products.filter(function (p) { return c.productIds.indexOf(p.id) >= 0; });
    setMeta(c.name, c.description);
    shellPage('<section class="collection-hero"><div class="breadcrumbs"><a href="/">Accueil</a><span> / Boutique / </span><span>' + esc(c.name) + '</span></div><p class="eyebrow">Collection · ' + list.length + ' créations</p><h1>' + esc(c.name) + '</h1><p>' + esc(c.description) + '</p></section><section class="collection-layout section-wrap"><aside class="filter-sidebar"><h2>Affiner la sélection</h2><label for="filter-type">Type de pièce</label><select id="filter-type" data-filter-type><option value="all">Tous les types</option><option value="jewelry">Bijoux</option><option value="accessory">Accessoires</option><option value="decor">Objets dorés</option><option value="car">Pour la voiture</option></select><label class="check-filter"><input type="checkbox" data-filter-custom /> Créations personnalisées</label><div class="filter-note"><span>✧</span><p>Les prix et détails à confirmer sont indiqués sur chaque fiche.</p></div></aside><div class="collection-products"><div class="collection-toolbar"><p><span data-result-count>' + list.length + '</span> créations</p><label for="sort-products">Trier par <select id="sort-products" data-sort><option value="featured">À la une</option><option value="name-asc">Nom, A à Z</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select></label></div><div data-product-list>' + grid(list) + '</div></div></section>');
    document.querySelector("main").dataset.collection = slug;
    document.querySelector("main").dataset.productIds = list.map(function (p) { return p.id; }).join(",");
  }
  function selectField(name, label, choices) {
    if (!choices || !choices.length) return "";
    return '<label class="option-field"><span>' + label + '</span><select name="' + name + '">' +
      choices.map(function (x) { return '<option value="' + esc(x) + '">' + esc(x) + '</option>'; }).join("") + '</select></label>';
  }
  function productPage(p) {
    if (!p) { notFound(); return; }
    setMeta(p.name, p.description);
    var thumbs = p.images.length > 1 ? '<div class="gallery-thumbs">' + p.images.map(function (x, i) { return '<button class="gallery-thumb' + (i ? "" : " active") + '" type="button" data-action="gallery-select" data-index="' + i + '" aria-label="Voir l’image ' + (i + 1) + '"><img src="' + esc(x.src) + '" alt="" loading="lazy" /></button>'; }).join("") + '</div>' : "";
    var gallery = '<div class="product-gallery"><div class="gallery-main"><button class="gallery-zoom" type="button" data-action="zoom" aria-label="Agrandir l’image">' + img(p, 0, "gallery-image") + '<span>⤢ Agrandir</span></button>' + (p.images.length > 1 ? '<div class="gallery-arrows"><button type="button" data-action="gallery-prev" aria-label="Image précédente">←</button><button type="button" data-action="gallery-next" aria-label="Image suivante">→</button></div>' : "") + '</div>' + thumbs + '</div>';
    var o = p.options || {};
    var choices = '<div class="personalization-box"><p class="eyebrow">Votre sélection</p><h2>' + (p.custom ? "Parlons de votre pièce" : "Choisissez votre option") + '</h2><p>' + (p.custom ? "La composition finale se confirme directement avec Rayda." : "Choisissez une variante si elle est proposée.") + '</p>' +
      selectField("variant", "Modèle", o.variant) + selectField("palette", "Préférence de couleurs", o.palettes) +
      '<label class="option-field"><span>Note <small>(facultative)</small></span><textarea name="personal-note" rows="3" maxlength="250" placeholder="Vos préférences, sans données de naissance…"></textarea></label><small class="privacy-note">Ce formulaire local ne transmet aucune information. Communiquez les détails personnels directement à Rayda.</small></div>';
    var detailItems = p.details.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var video = p.video ? '<details class="product-video"><summary>Voir la pièce en mouvement <span>＋</span></summary><video controls playsinline preload="metadata"><source src="' + esc(p.video.src) + '" type="video/mp4" /></video></details>' : "";
    var related = products.filter(function (x) { return x.id !== p.id && x.collections.some(function (slug) { return p.collections.indexOf(slug) >= 0; }); }).slice(0, 3);
    shellPage('<section class="product-page section-wrap"><div class="breadcrumbs"><a href="/">Accueil</a><span> / </span><a href="' + colUrl(p.collections[0]) + '">Boutique</a><span> / </span><span>' + esc(p.name) + '</span></div><div class="product-detail-layout">' + gallery +
      '<div class="product-detail-copy"><p class="eyebrow">' + esc(p.eyebrow) + '</p><h1>' + esc(p.name) + '</h1><div class="detail-price" data-detail-price>' + esc(price(p, o.variant && o.variant[0])) + '</div><p class="detail-description">' + esc(p.description) + '</p><div class="product-meta-badges"><span>✧ Photos de l’atelier</span><span>♡ Livraison en Tunisie</span></div><p class="price-note">' + esc(p.priceNote) + '</p>' + choices +
      '<div class="quantity-picker"><span>Quantité</span><div><button type="button" data-action="quantity" data-step="-1" aria-label="Diminuer la quantité">−</button><output data-quantity>1</output><button type="button" data-action="quantity" data-step="1" aria-label="Augmenter la quantité">＋</button></div></div><button class="button button-primary add-to-cart-button" type="button" data-action="add" data-product="' + p.id + '">Ajouter à la sélection <span>↗</span></button><p class="checkout-hint">La commande en ligne n’est pas encore connectée. Contactez Rayda pour confirmer.</p>' + video +
      '<div class="product-accordions"><details open><summary>À propos de cette pièce <span>−</span></summary><p>' + esc(p.description) + '</p><ul>' + detailItems + '</ul></details><details><summary>Livraison et paiement <span>＋</span></summary><p>Livraison en Tunisie et paiement à la livraison selon les modalités à confirmer directement avec Rayda. Aucune commande n’est envoyée depuis ce site local.</p></details><details><summary>Informations à confirmer <span>＋</span></summary><p>' + esc(p.missing.join(" · ")) + '</p></details></div></div></div></section><section class="related-section section-wrap"><div class="section-heading"><div><p class="eyebrow">À découvrir aussi</p><h2>D’autres <em>créations.</em></h2></div></div>' + grid(related) + '</section>');
    document.querySelector("main").dataset.product = p.id;
    document.querySelector("main").dataset.galleryIndex = "0";
    document.querySelector("main").dataset.quantity = "1";
    if (p.variantImageIndex && o.variant && o.variant.length) setGallery(p.variantImageIndex[o.variant[0]] || 0);
  }
  function checkoutPage() {
    setMeta("Vérifier la sélection", "Vérification locale de la sélection. Aucun envoi de commande depuis cette page.");
    var states = ["Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kébili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"];
    var opts = states.map(function (x) { return "<option>" + x + "</option>"; }).join("");
    shellPage('<section class="checkout-page section-wrap"><div class="breadcrumbs"><a href="/">Accueil</a><span> / </span><span>Vérifier la sélection</span></div><div class="checkout-heading"><p class="eyebrow">Votre sélection</p><h1>Vérifiez vos <em>pièces.</em></h1><p>La prise de commande n’est pas encore connectée. Vous pouvez discuter des pièces et de la livraison directement avec Rayda sur WhatsApp.</p></div><div class="checkout-layout"><form class="checkout-form" id="checkout-form"><h2>Informations de livraison</h2><div class="form-grid"><label>Nom<input name="name" autocomplete="name" required maxlength="100" /></label><label>Téléphone<input name="phone" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9+ ()-]{8,18}" required placeholder="+216 00 000 000" /></label><label class="full-field">Gouvernorat<select name="governorate" required><option value="">Choisissez un gouvernorat</option>' + opts + '</select></label><label class="full-field">Adresse<textarea name="address" rows="3" autocomplete="street-address" required maxlength="300"></textarea></label><label class="full-field">Note <small>(facultative)</small><textarea name="note" rows="3" maxlength="400" placeholder="Précisions de livraison…"></textarea></label></div><label class="consent-check"><input type="checkbox" required /><span>Je comprends que ce formulaire local n’envoie pas de commande.</span></label><button class="button button-primary checkout-submit" type="submit">Vérifier le formulaire <span>↗</span></button><p class="privacy-note">Les données saisies restent sur cette page. Rien n’est transmis ou enregistré.</p></form><aside class="checkout-summary"><h2>Votre sélection</h2><div data-checkout-items></div><div class="summary-total"><span>Total indicatif</span><b data-checkout-total>—</b></div><p>Les prix manquants et les modalités de livraison sont à confirmer avec Rayda.</p><a href="https://wa.me/21621924070" target="_blank" rel="noopener noreferrer" class="text-link">Contacter Rayda sur WhatsApp ↗</a><a href="' + colUrl("all") + '" class="text-link">Continuer la visite ↗</a></aside></div></section>');
    checkoutSummary();
  }
  function page() {
    var path = location.pathname.replace(/\/?$/, "/");
    if (path === "/") {
      home();
      if (location.hash) requestAnimationFrame(function () {
        var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) target.scrollIntoView({ block: "start" });
      });
    }
    else if (path.indexOf("/collections/") === 0) {
      var slug = path.split("/")[2];
      if (catalog.collections.some(function (x) { return x.slug === slug; })) collection(slug); else notFound();
    } else if (path.indexOf("/products/") === 0) productPage(products.find(function (x) { return x.slug === path.split("/")[2]; }));
    else if (path === "/checkout/") checkoutPage();
    else notFound();
  }
  function notFound() { setMeta("Page introuvable", "Cette page n’existe pas."); shellPage('<section class="empty-page"><p class="eyebrow">404</p><h1>Cette page est introuvable.</h1><a class="button button-primary" href="/">Retour à l’accueil</a></section>'); }
  function readCart() {
    try { var value = JSON.parse(localStorage.getItem("atelier-cart") || "[]"); return Array.isArray(value) ? value.filter(function (x) { return products.some(function (p) { return p.id === x.productId; }); }) : []; } catch (e) { return []; }
  }
  function persist() {
    localStorage.setItem("atelier-cart", JSON.stringify(cart.map(function (x) { return { productId:x.productId, quantity:x.quantity, variant:x.variant || "", palette:x.palette || "", intention:x.intention || "" }; })));
    updateCount();
  }
  function updateCount() {
    var badge = document.querySelector(".bag-count");
    if (badge) badge.textContent = String(cart.reduce(function (n, x) { return n + x.quantity; }, 0));
  }
  function totalLabel() {
    var lo = 0, hi = 0, quote = false, range = false;
    cart.forEach(function (x) {
      var p = products.find(function (y) { return y.id === x.productId; });
      var selected = p.variantPrices && Object.prototype.hasOwnProperty.call(p.variantPrices, x.variant) ? p.variantPrices[x.variant] : undefined;
      if (selected === null || (selected === undefined && !p.price)) { quote = true; return; }
      var min = selected === undefined ? p.price.min : selected;
      var max = selected === undefined ? p.price.max : selected;
      lo += min * x.quantity; hi += max * x.quantity; if (min !== max) range = true;
    });
    if (quote) return lo ? "Dès " + money(lo) + " · autres prix à confirmer" : "Tarif à confirmer";
    return range ? money(lo) + " – " + money(hi) : money(lo);
  }
  function cartLine(x, i) {
    var p = products.find(function (y) { return y.id === x.productId; });
    var meta = [x.variant, x.palette, x.intention, x.note].filter(Boolean).join(" · ");
    return '<article class="cart-line"><a class="cart-line-image" href="' + prodUrl(p) + '"><img src="' + esc(p.images[0].src) + '" alt="" /></a><div class="cart-line-info"><a class="cart-line-name" href="' + prodUrl(p) + '">' + esc(p.name) + '</a><small>' + esc(meta || "Pièce choisie") + '</small><div class="cart-quantity"><button type="button" data-action="cart-qty" data-index="' + i + '" data-step="-1" aria-label="Diminuer la quantité">−</button><span>' + x.quantity + '</span><button type="button" data-action="cart-qty" data-index="' + i + '" data-step="1" aria-label="Augmenter la quantité">＋</button><button type="button" class="cart-remove" data-action="cart-remove" data-index="' + i + '">Retirer</button></div></div><b class="cart-line-price">' + esc(price(p, x.variant)) + '</b></article>';
  }
  function renderCart() {
    var count = cart.reduce(function (n, x) { return n + x.quantity; }, 0);
    drawer.innerHTML = '<div class="drawer-header"><div><p class="eyebrow">Votre sélection</p><h2>Panier <small>(' + count + ')</small></h2></div><button class="drawer-close icon-button" type="button" data-action="close-cart" aria-label="Fermer le panier">×</button></div>' +
      (count ? '<div class="drawer-items">' + cart.map(cartLine).join("") + '</div><div class="drawer-bottom"><div class="drawer-total"><span>Total indicatif</span><b>' + esc(totalLabel()) + '</b></div><p>La commande en ligne n’est pas encore connectée. Confirmez prix et livraison avec Rayda.</p><a class="button button-primary drawer-checkout" href="/checkout/">Vérifier la sélection ↗</a><button class="text-link" data-action="close-cart">Continuer la visite</button></div>' : '<div class="drawer-empty"><span>✧</span><h3>Votre panier est vide.</h3><p>Découvrez les créations de l’atelier.</p><button type="button" class="button button-outline" data-action="close-shop">Voir la boutique</button></div>');
    updateCount();
  }
  function openCart() { returnFocus = document.activeElement; renderCart(); overlay.hidden = false; drawer.inert = false; drawer.setAttribute("aria-hidden", "false"); requestAnimationFrame(function () { overlay.classList.add("show"); drawer.classList.add("open"); }); document.body.classList.add("no-scroll"); drawer.querySelector(".drawer-close").focus(); }
  function closeCart() { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); drawer.inert = true; overlay.classList.remove("show"); document.body.classList.remove("no-scroll"); setTimeout(function () { overlay.hidden = true; if (returnFocus && returnFocus.isConnected) returnFocus.focus(); }, 250); }
  function addProduct(id) {
    var p = products.find(function (x) { return x.id === id; }), main = document.querySelector("main"), detail = document.querySelector(".product-detail-layout");
    if (!p) return;
    var qty = Math.max(1, Number(main.dataset.quantity || 1));
    var field = function (name) { var el = detail.querySelector('[name="' + name + '"]'); return el ? el.value.trim() : ""; };
    var line = { productId:id, quantity:qty, variant:field("variant"), palette:field("palette"), intention:field("intention"), note:field("personal-note") };
    var old = cart.find(function (x) { return x.productId === line.productId && x.variant === line.variant && x.palette === line.palette && x.intention === line.intention && x.note === line.note; });
    if (old) old.quantity += qty; else cart.push(line);
    persist(); toast("Pièce ajoutée à votre sélection."); openCart();
  }
  function checkoutSummary() {
    var root = document.querySelector("[data-checkout-items]"); if (!root) return;
    if (!cart.length) { root.innerHTML = '<div class="checkout-empty"><p>Votre sélection est vide.</p><a href="' + colUrl("all") + '">Retour à la boutique ↗</a></div>'; document.querySelector("[data-checkout-total]").textContent = "—"; return; }
    root.innerHTML = cart.map(function (x) { var p = products.find(function (y) { return y.id === x.productId; }); return '<div class="summary-line"><span>' + esc(p.name) + (x.variant ? ' · ' + esc(x.variant) : '') + ' × ' + x.quantity + '</span><b>' + esc(price(p, x.variant)) + '</b></div>'; }).join("");
    document.querySelector("[data-checkout-total]").textContent = totalLabel();
  }
  function showReview(index, automatic) {
    var slides = Array.from(document.querySelectorAll(".review-slide")); if (!slides.length) return;
    document.querySelector(".review-carousel").setAttribute("aria-live", automatic ? "off" : "polite");
    reviewIndex = (index + slides.length) % slides.length;
    slides.forEach(function (x, i) { x.classList.toggle("active", i === reviewIndex); x.setAttribute("aria-hidden", String(i !== reviewIndex)); });
    document.querySelectorAll('[data-action="review-to"]').forEach(function (x, i) { x.classList.toggle("active", i === reviewIndex); x.setAttribute("aria-pressed", String(i === reviewIndex)); });
  }
  function showHero(index) {
    var slides = Array.from(document.querySelectorAll(".home-hero-image")); if (!slides.length) return;
    heroIndex = (index + slides.length) % slides.length;
    slides.forEach(function (x, i) { x.classList.toggle("active", i === heroIndex); x.setAttribute("aria-hidden", String(i !== heroIndex)); });
    document.querySelectorAll(".hero-dot").forEach(function (x, i) { x.classList.toggle("active", i === heroIndex); x.setAttribute("aria-pressed", String(i === heroIndex)); });
  }
  function startHomeMotion() {
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var atelierVideos = Array.from(document.querySelectorAll(".atelier-clip video[data-src]"));
    function loadAtelierVideo(video) { video.src = video.dataset.src; video.removeAttribute("data-src"); }
    if ("IntersectionObserver" in window) {
      var mediaObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { loadAtelierVideo(entry.target); mediaObserver.unobserve(entry.target); } });
      }, { rootMargin: "300px" });
      atelierVideos.forEach(function (video) { mediaObserver.observe(video); });
    } else atelierVideos.forEach(loadAtelierVideo);
    var revealItems = Array.from(document.querySelectorAll("[data-anim]"));
    if (reduced || !("IntersectionObserver" in window)) revealItems.forEach(function (x) { x.classList.add("is-in"); x.style.visibility = "visible"; });
    else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("is-in"); entry.target.style.visibility = "visible"; observer.unobserve(entry.target); } });
      }, { threshold: 0, rootMargin: "0px" });
      revealItems.forEach(function (x) { observer.observe(x); });
    }
    var topButton = document.querySelector(".back-to-top");
    var reviewCarousel = document.getElementById("reviews");
    if (reviewCarousel) {
      var paused = reduced;
      var pauseButton = document.createElement("button");
      pauseButton.type = "button";
      pauseButton.className = "review-pause";
      function updatePauseButton() {
        pauseButton.setAttribute("aria-label", paused ? "Reprendre le défilement des avis" : "Mettre les avis en pause");
        pauseButton.setAttribute("aria-pressed", String(paused));
        pauseButton.innerHTML = paused ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 4 9 6-9 6z"/></svg>' : '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4h3v12H6zM12 4h3v12h-3z"/></svg>';
      }
      updatePauseButton();
      pauseButton.addEventListener("click", function () { paused = !paused; updatePauseButton(); });
      reviewCarousel.querySelector(".review-dots").prepend(pauseButton);
      showReview(0, true);
      window.setInterval(function () {
        if (!document.hidden && !paused && !reviewCarousel.matches(":hover, :focus-within")) showReview(reviewIndex + 1, true);
      }, 4000);
    }
    if (topButton) {
      var updateTopButton = function () { topButton.classList.toggle("visible", window.scrollY > 600); };
      updateTopButton(); window.addEventListener("scroll", updateTopButton, { passive: true });
    }
  }
  function startHeaderMotion() {
    var header = document.querySelector(".site-header"), sentinel = document.querySelector(".header-sentinel");
    if (!header || !sentinel) return;
    var desktop = window.matchMedia("(min-width: 1131px)");
    function setState(out) { header.classList.toggle("is-compact", desktop.matches && out); }
    if ("IntersectionObserver" in window) new IntersectionObserver(function (entries) { setState(!entries[0].isIntersecting); }, { threshold: 0 }).observe(sentinel);
    desktop.addEventListener("change", function () { setState(sentinel.getBoundingClientRect().bottom < 0); });
  }
  function collectionUpdate() {
    var main = document.querySelector("main"); if (!main || !main.dataset.collection) return;
    var type = document.querySelector("[data-filter-type]").value, custom = document.querySelector("[data-filter-custom]").checked;
    var sort = document.querySelector("[data-sort]").value;
    var list = products.filter(function (p) { return main.dataset.productIds.split(",").indexOf(p.id) >= 0; }).filter(function (p) { return (type === "all" || p.type === type) && (!custom || p.custom); });
    if (sort === "name-asc") list.sort(function (a,b) { return a.name.localeCompare(b.name, "fr"); });
    if (sort === "price-asc") list.sort(function (a,b) { return (a.price ? a.price.min : Infinity) - (b.price ? b.price.min : Infinity); });
    if (sort === "price-desc") list.sort(function (a,b) { return (b.price ? b.price.max : -Infinity) - (a.price ? a.price.max : -Infinity); });
    document.querySelector("[data-result-count]").textContent = String(list.length);
    document.querySelector("[data-product-list]").innerHTML = grid(list);
  }
  function wishlist() {
    try { return JSON.parse(localStorage.getItem("atelier-favorites") || "[]"); } catch (e) { return []; }
  }
  function renderWishlist() {
    var ids = wishlist();
    searchDialog.innerHTML = '<div class="search-dialog-head"><div><p class="eyebrow">Pièces enregistrées</p><h2>Favoris</h2></div><button type="button" class="icon-button" data-action="close-search" aria-label="Fermer">×</button></div>' +
      (ids.length ? '<div class="search-results">' + ids.map(function (id) { var p = products.find(function (x) { return x.id === id; }); return p ? '<a class="search-result" href="' + prodUrl(p) + '"><img src="' + esc(p.images[0].src) + '" alt="" /><span><b>' + esc(p.name) + '</b><small>' + esc(p.eyebrow) + '</small></span><i>' + esc(price(p)) + '</i></a>' : ""; }).join("") + '</div>' : '<div class="wishlist-empty"><span>♡</span><p>Aucun favori pour le moment.</p><p>Utilisez le cœur sur une pièce pour la retrouver ici.</p></div>');
  }
  function toggleFavorite(id, button) {
    var saved = wishlist(), at = saved.indexOf(id), added = at < 0;
    if (added) saved.push(id); else saved.splice(at, 1);
    localStorage.setItem("atelier-favorites", JSON.stringify(saved));
    button.classList.toggle("selected", added); button.setAttribute("aria-pressed", String(added)); button.textContent = added ? "♥" : "♡";
    toast(added ? "Pièce ajoutée aux favoris." : "Pièce retirée des favoris.");
  }
  function searchMarkup(query) {
    var q = query.toLocaleLowerCase("fr").trim();
    var found = q ? products.filter(function (p) { return (p.name + " " + p.description + " " + p.eyebrow).toLocaleLowerCase("fr").indexOf(q) >= 0; }) : products;
    searchDialog.innerHTML = '<div class="search-dialog-head"><div><p class="eyebrow">Rechercher dans la boutique</p><h2>Quelle pièce cherchez-vous ?</h2></div><button class="icon-button" type="button" data-action="close-search" aria-label="Fermer">×</button></div><label class="search-input-wrap"><span>⌕</span><input type="search" value="' + esc(query) + '" placeholder="Bracelet, BaZi, Ankh…" autocomplete="off" data-search-input aria-label="Rechercher un produit" /><kbd>ESC</kbd></label><p class="search-result-heading">' + (q ? found.length + " résultat(s)" : "Toutes les créations") + '</p><div class="search-results">' +
      (found.length ? found.map(function (p) { return '<a class="search-result" href="' + prodUrl(p) + '"><img src="' + esc(p.images[0].src) + '" alt="" /><span><b>' + esc(p.name) + '</b><small>' + esc(p.eyebrow) + '</small></span><i>' + esc(price(p)) + '</i></a>'; }).join("") : '<p class="search-empty">Aucune pièce trouvée. Essayez une autre recherche.</p>') + '</div>';
  }
  function openSearch() { searchMarkup(""); searchDialog.showModal(); searchDialog.querySelector("[data-search-input]").focus(); }
  function setGallery(index) {
    var main = document.querySelector("main"), p = products.find(function (x) { return x.id === main.dataset.product; });
    index = (index + p.images.length) % p.images.length; main.dataset.galleryIndex = String(index);
    document.querySelector(".gallery-zoom").innerHTML = img(p, index, "gallery-image") + "<span>⤢ Agrandir</span>";
    document.querySelectorAll(".gallery-thumb").forEach(function (x, i) { x.classList.toggle("active", i === index); });
  }
  function action(name, el) {
    if (name === "mobile-menu") { var nav = document.querySelector(".main-nav"), expanded = el.getAttribute("aria-expanded") !== "true"; el.setAttribute("aria-expanded", String(expanded)); el.setAttribute("aria-label", expanded ? "Fermer le menu" : "Ouvrir le menu"); nav.classList.toggle("open", expanded); }
    else if (name === "learn-toggle") { var toggle = el, expandedLearn = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", String(expandedLearn)); toggle.parentElement.classList.toggle("open", expandedLearn); }
    else if (name === "open-cart") openCart();
    else if (name === "close-cart") closeCart();
    else if (name === "close-shop") { closeCart(); location.href = colUrl("all"); }
    else if (name === "open-search") openSearch();
    else if (name === "open-wishlist") { renderWishlist(); searchDialog.showModal(); }
    else if (name === "close-search") searchDialog.close();
    else if (name === "add") addProduct(el.dataset.product);
    else if (name === "cart-qty") { var i = Number(el.dataset.index); cart[i].quantity += Number(el.dataset.step); if (cart[i].quantity < 1) cart.splice(i,1); persist(); renderCart(); }
    else if (name === "cart-remove") { cart.splice(Number(el.dataset.index), 1); persist(); renderCart(); }
    else if (name === "hero-prev") showHero(heroIndex - 1);
    else if (name === "hero-next") showHero(heroIndex + 1);
    else if (name === "hero-to") showHero(Number(el.dataset.index));
    else if (name === "review-prev") showReview(reviewIndex - 1);
    else if (name === "review-next") showReview(reviewIndex + 1);
    else if (name === "review-to") showReview(Number(el.dataset.index));
    else if (name === "gallery-select") setGallery(Number(el.dataset.index));
    else if (name === "gallery-prev") setGallery(Number(document.querySelector("main").dataset.galleryIndex) - 1);
    else if (name === "gallery-next") setGallery(Number(document.querySelector("main").dataset.galleryIndex) + 1);
    else if (name === "zoom") { var m = document.querySelector("main"), p = products.find(function (x) { return x.id === m.dataset.product; }), image = p.images[Number(m.dataset.galleryIndex)]; imageDialog.innerHTML = '<button type="button" class="zoom-close" data-action="zoom-close" aria-label="Fermer">×</button><img src="' + esc(image.src) + '" alt="' + esc(image.alt) + '" />'; imageDialog.showModal(); }
    else if (name === "zoom-close") imageDialog.close();
    else if (name === "quantity") { var main = document.querySelector("main"), next = Math.max(1, Math.min(20, Number(main.dataset.quantity || 1) + Number(el.dataset.step))); main.dataset.quantity = String(next); document.querySelector("[data-quantity]").textContent = String(next); }
    else if (name === "favorite") toggleFavorite(el.dataset.product, el);
  }
  document.addEventListener("click", function (event) {
    var el = event.target.closest("[data-action]"); if (el) action(el.dataset.action, el);
    if (event.target.matches(".overlay")) closeCart();
    if (event.target.closest(".main-nav a")) { var b = document.querySelector(".mobile-menu"), n = document.querySelector(".main-nav"); if (b) { b.setAttribute("aria-expanded","false"); b.setAttribute("aria-label","Ouvrir le menu"); } if (n) n.classList.remove("open"); }
  });
  document.addEventListener("input", function (event) {
    if (event.target.matches("[data-search-input]")) {
      var q = event.target.value, start = q.length;
      searchMarkup(q); var input = searchDialog.querySelector("[data-search-input]"); input.focus(); input.setSelectionRange(start,start);
    }
  });
  document.addEventListener("change", function (event) {
    if (event.target.matches("[data-filter-type], [data-filter-custom], [data-sort]")) collectionUpdate();
    if (event.target.matches('[name="variant"]')) {
      var main = document.querySelector("main"), p = products.find(function (x) { return x.id === main.dataset.product; });
      var priceNode = document.querySelector("[data-detail-price]");
      if (p && priceNode) priceNode.textContent = price(p, event.target.value);
      if (p && p.variantImageIndex && Object.prototype.hasOwnProperty.call(p.variantImageIndex, event.target.value)) setGallery(p.variantImageIndex[event.target.value]);
    }
  });
  document.addEventListener("submit", function (event) {
    if (event.target.matches(".newsletter-form")) { event.preventDefault(); toast("L’inscription aux nouvelles de l’atelier arrive bientôt."); }
    if (event.target.matches("#checkout-form")) {
      event.preventDefault(); if (!cart.length) { toast("Ajoutez d’abord une pièce à votre sélection."); return; }
      if (!event.target.reportValidity()) return;
      document.querySelector(".checkout-layout").innerHTML = '<div class="order-success"><span>✧</span><p class="eyebrow">Vérification terminée</p><h2>Votre sélection est prête à discuter.</h2><p>Aucune commande ni donnée personnelle n’a été envoyée. Contactez Rayda pour confirmer les pièces, les prix et la livraison.</p><a class="button button-primary" href="https://wa.me/21621924070" target="_blank" rel="noopener noreferrer">Contacter Rayda ↗</a></div>';
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && drawer.classList.contains("open")) closeCart();
    if (event.key === "Tab" && drawer.classList.contains("open")) {
      var focusable = Array.from(drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')).filter(function (x) { return x.offsetParent !== null; });
      if (!focusable.length) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable[focusable.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) { event.preventDefault(); focusable[0].focus(); }
    }
    if (event.key === "Escape") {
      var menu = document.querySelector(".main-nav"), menuButton = document.querySelector(".mobile-menu");
      if (menu.classList.contains("open") && (menu.contains(document.activeElement) || document.activeElement === menuButton)) {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Ouvrir le menu");
        menu.querySelectorAll(".nav-item.open").forEach(function (item) { item.classList.remove("open"); item.querySelector(".nav-toggle").setAttribute("aria-expanded", "false"); });
        menuButton.focus();
      }
    }
  });
  function toast(message) {
    var t = document.querySelector(".toast"); t.textContent = message; t.classList.add("show");
    clearTimeout(t._timer); t._timer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }
  renderCart();
  page();
}());
