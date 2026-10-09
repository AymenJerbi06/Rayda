(function () {
  "use strict";

  // Content belongs to the atelier; the existing navigation and motion hooks stay shared.
  window.renderStoreHome = function (context) {
    var config = context.config, colUrl = context.colUrl, esc = context.esc;
    var contact = "https://wa.me/" + config.contact.phone.replace(/\D/g, "");
    var photoRoot = "/assets/products/organized/";
    var categories = [
      ["bracelets", "bracelet-bazi-01.jpg", "Bracelets", "Une pièce à votre image"],
      ["colliers", "collier-bazi-03.jpg", "Colliers", "Votre composition BaZi"],
      ["porte-cles", "porte-cles-arbre-vie-01.jpg", "Porte-clés", "Un petit compagnon"],
      ["portefeuilles", "portefeuille-hafidha-01.jpg", "Portefeuilles", "Hafidha El Mel"],
      ["objets-dores", "fleur-de-vie-01.jpg", "Objets & symboles", "Pour votre quotidien"]
    ].map(function (item) {
      return '<a class="reference-category" href="' + colUrl(item[0]) + '"><span class="category-photo"><img src="' + photoRoot + item[1] + '" alt="" loading="lazy" /></span><h3>' + item[2] + '</h3><p>' + item[3] + '</p></a>';
    }).join("");
    var features = [
      ["Bracelets BaZi", "bracelet-bazi-06.jpg", "creations-bazi"],
      ["Énergie Amour", "bracelet-amour-02.jpg", "bracelets"],
      ["Hafidha El Mel", "portefeuille-hafidha-01.jpg", "portefeuilles"],
      ["Objets dorés", "decor-abondance-01.jpg", "objets-dores"]
    ].map(function (item) {
      return '<a class="home-feature-tile" href="' + colUrl(item[2]) + '"><img src="' + photoRoot + item[1] + '" alt="" loading="lazy" /><svg class="gem-lines" viewBox="0 0 300 300" preserveAspectRatio="none" aria-hidden="true"><path d="M0 78h300M100 0L83 78L150 300L217 78L200 0" /></svg><b>' + item[0] + '</b><small>Découvrir <i aria-hidden="true">›</i></small></a>';
    }).join("");
    var videos = config.atelierMedia.map(function (item) {
      return '<figure class="atelier-clip"><video controls playsinline muted preload="metadata" aria-label="' + esc(item.title) + '" data-src="' + esc(item.src) + '#t=0.1">Votre navigateur ne prend pas en charge la vidéo.</video><figcaption>' + esc(item.title) + '</figcaption></figure>';
    }).join("");

    return `
      <section class="home-hero band--parallax" id="home-hero" aria-label="Bienvenue chez Om Adem">
        <img class="home-hero-photo" src="${photoRoot}bracelet-bazi-01.jpg" alt="Une composition de bracelet BaZi de Rayda" fetchpriority="high" />
        <div class="home-hero-copy">
          <p class="home-eyebrow">Bienvenue chez Om Adem</p>
          <h1><span>Une création qui</span><span>vous ressemble.</span></h1>
          <p class="hero-script">Avec Rayda, tout commence par un échange.</p>
          <div class="hero-bottom">
            <p class="home-hero-description">Un bracelet composé pour vous, un bijou à offrir, un symbole à garder près de soi. Découvrez les créations et l’univers de Rayda.</p>
            <div class="hero-actions"><a class="reference-hero-button" href="${colUrl("creations-bazi")}">Ma création sur mesure <b aria-hidden="true">›</b></a><a class="reference-hero-button hero-secondary" href="#about">Rencontrer Rayda <b aria-hidden="true">›</b></a></div>
          </div>
        </div>
      </section>
      <section class="reference-trust" id="delivery" aria-label="Les petits plus de l’atelier">
        <div><span><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 8h28v20H17l-8 7v-7H6zM12 15h16M12 21h10"/></svg></span><p><b>On prend le temps</b><small>D’échanger avec vous</small></p></div>
        <div><span><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 15l7-9h16l7 9-15 21zM5 15h30M12 6l8 30 8-30M12 6l8 9 8-9"/></svg></span><p><b>Créations BaZi</b><small>Composées pour vous</small></p></div>
        <div><span><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M3 10h22v19H3zM25 17h7l5 7v5H25"/><circle cx="10" cy="30" r="4"/><circle cx="30" cy="30" r="4"/></svg></span><p><b>Partout en Tunisie</b><small>Paiement à la livraison</small></p></div>
        <div><span><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M4 5h17l15 15-16 16L4 20z"/><circle cx="12" cy="13" r="3"/><path d="m19 24 4 4 7-8"/></svg></span><p><b>Un prix clair</b><small>Confirmé avant de préparer</small></p></div>
      </section>
      <section class="founder-reviews reference-about" id="about">
        <div class="founder-media"><img src="${esc(config.brand.founderPortrait)}" alt="Rayda, la créatrice derrière Om Adem" loading="lazy" /></div>
        <div class="founder-copy"><p class="eyebrow">La personne derrière vos créations</p><h2>Faites connaissance<br /> avec Rayda.</h2><p class="script-line">À votre écoute, simplement.</p><p>Rayda compose vos bijoux BaZi à partir de votre histoire. Sa démarche associe les pierres, une lecture personnelle et une préparation spirituelle. Une envie, une question ? Le plus simple, c’est d’en parler avec elle.</p><a href="${contact}" target="_blank" rel="noopener noreferrer" class="button button-outline">Échanger avec Rayda <span aria-hidden="true">↗</span></a></div>
        <div class="reviews-panel" id="reviews"><div class="reviews-heading"><div><p class="eyebrow">Vos retours</p><h2>Les mots de nos clientes</h2><small>Extraits anonymisés de messages reçus par Rayda.</small></div><div class="review-controls"><button type="button" data-action="review-prev" aria-label="Avis précédent">←</button><button type="button" data-action="review-next" aria-label="Avis suivant">→</button></div></div>
          <div class="review-carousel reference-review-card" aria-live="polite">
            <div class="review-slide active" data-review="0" aria-hidden="false"><blockquote>« Je ressens du calme et une paix intérieure. Merci du fond du cœur. »</blockquote><p class="review-author">Message client anonymisé</p></div>
            <div class="review-slide" data-review="1" aria-hidden="true"><blockquote>« J’ai acheté chez toi et je voulais te remercier. »</blockquote><p class="review-author">Message client anonymisé</p></div>
            <div class="review-slide" data-review="2" aria-hidden="true"><blockquote>« Avec mon bracelet BaZi, je me sens plus confiante quand je le porte. »</blockquote><p class="review-author">Message client anonymisé</p></div>
          </div><div class="review-bottom"><span class="review-disclaimer">Chaque ressenti est personnel.</span><div class="review-dots"><button type="button" class="active" data-action="review-to" data-index="0" aria-label="Afficher le premier avis"></button><button type="button" data-action="review-to" data-index="1" aria-label="Afficher le deuxième avis"></button><button type="button" data-action="review-to" data-index="2" aria-label="Afficher le troisième avis"></button></div></div>
        </div>
      </section>
      <section class="reference-categories" aria-label="Catégories de la boutique"><div class="home-section-heading"><div><p class="eyebrow">Pour vous ou pour offrir</p><h2>À découvrir dans l’atelier</h2></div><a class="text-link" href="${colUrl("all")}">Voir toute la boutique <span aria-hidden="true">↗</span></a></div><div class="reference-category-grid">${categories}</div></section>
      <section class="ethics-feature photo-band" id="standards" aria-label="Votre création BaZi, pas à pas" style="--band-image:url('${photoRoot}bracelet-bazi-01.jpg')">
        <figure class="feature-photo"><img src="${photoRoot}bracelet-bazi-06.jpg" alt="Deux compositions de bracelets BaZi de l’atelier" loading="lazy" /></figure>
        <div class="feature-card" data-anim="slideInLeft"><p class="eyebrow">Le sur-mesure, tout simplement</p><h2>Votre bracelet,<br /> pas à pas.</h2><p class="feature-script">Votre histoire guide la composition.</p><p>Votre date de naissance est le point de départ de la lecture BaZi de Rayda. Vos envies comptent aussi : c’est ensemble que la pièce prend forme.</p><ol class="feature-checklist"><li>Vous échangez sur votre histoire et vos envies.</li><li>Rayda vous propose une composition personnelle.</li><li>Vous confirmez la pièce et son prix avant sa préparation.</li></ol><p class="bazi-price">Bracelets BaZi · <strong>140 à 180 TND</strong></p><a class="reference-hero-button" href="${colUrl("creations-bazi")}">Découvrir le sur-mesure <b aria-hidden="true">›</b></a></div>
      </section>
      <section class="home-feature-grid" aria-label="Collections à découvrir"><div class="home-feature-tiles">${features}</div></section>
      <section class="healing-feature photo-band" id="learn" aria-label="Des bijoux et des objets à choisir" style="--band-image:url('${photoRoot}bracelet-amour-01.jpg')">
        <figure class="feature-photo"><img src="${photoRoot}bracelet-amour-01.jpg" alt="Bracelet de la collection Énergie Amour" loading="lazy" /></figure>
        <div class="feature-card" data-anim="slideInRight"><p class="eyebrow">Les petites attentions du quotidien</p><h2>Un cadeau pour soi.<br /> Ou pour quelqu’un qu’on aime.</h2><p class="feature-kicker">Il n’y a pas que le sur-mesure.</p><p>Bracelet Énergie Amour, porte-clés, portefeuille Hafidha El Mel ou objet doré : prenez le temps de découvrir ce qui vous plaît.</p><p>Une hésitation sur une couleur ou un modèle ? Rayda est là pour vous aider à choisir.</p><div class="feature-actions"><a class="reference-hero-button" href="${colUrl("all")}">Explorer la boutique <b aria-hidden="true">›</b></a><a class="text-link" href="${contact}" target="_blank" rel="noopener noreferrer">Demander à Rayda ↗</a></div></div>
      </section>
      <section class="atelier-moments"><div class="home-section-heading"><div><p class="eyebrow">Quelques images de l’atelier</p><h2>Entrez dans l’univers de Rayda</h2></div><p>Des détails, des objets, des moments partagés.</p></div><div class="atelier-video-grid">${videos}</div></section>
      <section class="promo-band"><div><h2>Une création pour vous</h2><p>Commencez par découvrir les bracelets et colliers BaZi.</p><a href="${colUrl("creations-bazi")}">Voir les créations ›</a></div><div><h2>Une envie de cadeau ?</h2><p>Des bijoux et des petites attentions à offrir.</p><a href="${colUrl("all")}">Parcourir la boutique ›</a></div><div><h2>Besoin d’un conseil ?</h2><p>Posez vos questions directement à Rayda.</p><a href="${contact}" target="_blank" rel="noopener noreferrer">Discuter sur WhatsApp ↗</a></div><div><h2>Chez vous, en Tunisie</h2><p>Les pièces et la livraison sont confirmées ensemble. Paiement à la réception.</p><a href="${contact}" target="_blank" rel="noopener noreferrer">Préparer ma commande ↗</a></div></section>
      <a class="back-to-top" href="#top" aria-label="Retour en haut">⌃</a>`;
  };
}());
