import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const context = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "src/catalog.js"), "utf8"), context);
const catalog = context.window.STORE_CATALOG;
const configContext = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "src/site-config.js"), "utf8"), configContext);
test("catalog has twenty-four unique products in eleven browseable collections", () => {
  assert.equal(catalog.products.length, 24);
  assert.equal(new Set(catalog.products.map((x) => x.slug)).size, 24);
  assert.equal(catalog.collections.length, 11);
  for (const collection of catalog.collections) {
    for (const id of collection.productIds) assert.ok(catalog.products.some((x) => x.id === id));
  }
});
test("prices remain evidence-based and unquoted products request confirmation", () => {
  const bracelet = catalog.products.find((x) => x.id === "bracelet-bazi");
  const necklace = catalog.products.find((x) => x.id === "collier-bazi");
  const wallet = catalog.products.find((x) => x.id === "portefeuille-hafidha");
  assert.deepEqual(JSON.parse(JSON.stringify(bracelet.price)), { min: 140, max: 180, currency: "TND", confirmationRequired: true });
  assert.equal(necklace.price.min, 320);
  // Rayda set the wallet at 120 TND (her notes of 13 November); the stone keyring is still unpriced.
  assert.equal(wallet.price.min, 120);
  assert.equal(catalog.products.find((x) => x.id === "porte-cles-pierre").price, null);
  const card = catalog.products.find((x) => x.id === "carte-million-dollar");
  assert.equal(card.variantPrices["Petite · 16 × 5,5 cm"], 45);
  assert.equal(card.variantPrices["Grande · 19 × 6 cm"], 50);
});
test("every product photo is a local imported asset", async () => {
  for (const product of catalog.products) for (const image of product.images) {
    await access(path.join(root, image.src.replace(/^\//, "")));
  }
});
test("the active storefront uses Issolatej and the organized catalog", () => {
  assert.equal(configContext.window.STORE_CONFIG.previewStage, false);
  assert.equal(configContext.window.STORE_CONFIG.brand.name, "Issolatej");
  // 22 lifestyle scenes (one leading each of 22 products) and 85 ChatGPT photos made from Rayda's photos, for 22
  // products. Since 21 November no gallery shows her photos as she sent them (the user's request): they stay in the
  // folder as references. The BaZi necklace and the Arbre de Vie keyring have no scene; the glass bottle and the Fleur
  // de Vie car pendant have only their scene.
  assert.equal(catalog.products.reduce((count, product) => count + product.images.length, 0), 107);
  for (const product of catalog.products) for (const image of product.images) assert.match(image.src, /-ugc\.jpg$|-ai-[a-z-]+\.jpg$/, image.src);
});
test("the build respects the selected presentation mode and excludes review screenshots", async () => {
  const dist = path.join(root, "dist");
  if (configContext.window.STORE_CONFIG.siteMode === 'guidance') {
    const home = await readFile(path.join(dist, 'index.html'), 'utf8');
    assert.match(home, /Issolatej/);
    assert.match(home, /Rayda/);
    assert.match(home, /s-category-grid/);
    // g-about-copy is now legitimately used by the homepage's Rayda bio section, added deliberately.
    assert.doesNotMatch(home, /data-featured|s-product-grid|s-process/);
    assert.match(home, /data-open-selection/);
    await access(path.join(dist, 'src/catalog.js'));
    await access(path.join(dist, 'products'));
    for (const route of ['a-propos', 'accompagnement', 'contact', 'vos-mots']) {
      await access(path.join(dist, route, 'index.html'));
    }
  } else {
    const builtConfig = await readFile(path.join(dist, "src/site-config.js"), "utf8");
    assert.match(builtConfig, /Issolatej/);
    await access(path.join(dist, "src/catalog.js"));
  }
  await assert.rejects(access(path.join(dist, "assets/products/reviews")));
});

test("guidance pages use Issolatej, local assets, and valid internal destinations", async () => {
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const dist = path.join(root, 'dist');
  const pages = ['', 'a-propos', 'accompagnement', 'contact', 'vos-mots', 'checkout', ...catalog.collections.map(c=>'collections/'+c.slug), ...catalog.products.map(p=>'products/'+p.slug),
    'ar', 'ar/a-propos', 'ar/accompagnement', 'ar/contact', 'ar/vos-mots', 'ar/boutique', 'ar/checkout',
    ...catalog.collections.filter(c=>c.slug!=='all').map(c=>'ar/collections/'+c.slug), ...catalog.products.map(p=>'ar/products/'+p.slug),
    ...catalog.paths.map(p=>'parcours/'+p.slug), ...catalog.paths.map(p=>'ar/parcours/'+p.slug)];
  for (const page of pages) {
    const html = await readFile(path.join(dist, page, 'index.html'), 'utf8');
    assert.match(html, /<title>[^<]+ — Issolatej<\/title>/);
    assert.doesNotMatch(html, /Om Adem|Moonrise|Grounded Health/i);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    for (const [, destination] of html.matchAll(/(?:src|href)="(\/[^\"]*)"/g)) {
      const parsed = new URL(destination, 'http://local.test');
      const pathname = parsed.pathname, anchor = parsed.hash.slice(1);
      const relative = pathname.replace(/^\//, '');
      const target = path.join(dist, pathname.endsWith('/') ? relative + 'index.html' : relative);
      await access(target);
      if (anchor) assert.ok((await readFile(target, 'utf8')).includes('id="' + anchor + '"'), destination);
    }
  }
});


test("the opening hero and its animation hooks are preserved; only the welcome paragraph is Rayda's own text", async () => {
  const previous = await readFile(path.join(root,'backups/issolatej-before-products-2026-10-08/guidance-pages.mjs'),'utf8');
  const current = await readFile(path.join(root,'src/guidance-pages.mjs'),'utf8');
  const hero = text => text.match(/const home = `(<section class="g-hero">[\s\S]*?<\/section>)/)[1];
  // Rayda sent her welcome text on 15 November: the paragraph under the title is hers, everything else is unchanged.
  const welcome = /(<p data-reveal style="--delay:600ms">)[^<]*(?:<br \/>[^<]*)*(<\/p>)/;
  assert.equal(hero(current).replace(welcome, '$1$2'), hero(previous).replace(welcome, '$1$2'));
  assert.ok(hero(current).includes('<p data-reveal style="--delay:600ms">Bienvenue dans l’espace dédié à votre évolution.<br />'));
  const currentAr = await readFile(path.join(root,'src/guidance-pages-ar.mjs'),'utf8');
  assert.ok(currentAr.includes('<p data-reveal style="--delay:600ms">هذا الفضاء هو رفيقك في رحلة التطور و التغيير'));
  assert.equal(current.match(/const leaf = ([^;]+);/)[1], previous.match(/const leaf = ([^;]+);/)[1]);
  // CSS may grow with new sections, but every original rule must stay byte-identical and only be appended to, never edited in place.
  const previousCss = await readFile(path.join(root,'backups/issolatej-before-products-2026-10-08/guidance.css'),'utf8');
  const currentCss = await readFile(path.join(root,'guidance.css'),'utf8');
  assert.ok(currentCss.startsWith(previousCss), 'guidance.css must preserve every original rule unchanged and only append new ones at the end');
  assert.equal(await readFile(path.join(root,'src/guidance.js'),'utf8'),await readFile(path.join(root,'backups/issolatej-before-products-2026-10-08/guidance.js'),'utf8'));
});

test("homepage carries the full brand narrative with illustrated categories and real product photos in the shop", async () => {
  const home = await readFile(path.join(root,'dist/index.html'),'utf8');
  const main = home.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  // Hero, paths, products, approach intro, pillars, Rayda's bio, coaching and courses (24 November 2026), shifts/benefits,
  // testimonial teaser.
  assert.equal((main.match(/<section /g)||[]).length,9);
  assert.equal((main.match(/class="s-category[" ]/g)||[]).length,8);
  assert.doesNotMatch(main,/assets\/products\//);
  // One family photo per group (21 November 2026): every piece of the group side by side.
  for (const name of ['bracelets','colliers','porte-cles','portefeuilles','objets-dores','bouteilles','voiture','livres']) {
    assert.ok(home.includes('/assets/categories/groupe-'+name+'.webp'), name);
    await access(path.join(root,'dist/assets/categories','groupe-'+name+'.webp'));
    await access(path.join(root,'dist/assets/categories/240','groupe-'+name+'.webp'));
  }
  const shop = await readFile(path.join(root,'dist/collections/all/index.html'),'utf8');
  assert.match(shop,/Tout découvrir/);
  assert.match(shop,/Créé pour vous/);
  assert.match(shop,/À choisir/);
  assert.match(shop,/assets\/products\/organized/);
  // The Boutique page leads with the same type-first category grid as the homepage, by design.
  assert.equal((shop.match(/class="s-category[" ]/g)||[]).length,8);
  assert.match(shop,/assets\/categories/);
});

test("price variants, unknown prices and selection totals", async () => {
  const {priceLabel,selectionTotal}=await import('../src/commerce-core.js');
  const p=id=>catalog.products.find(p=>p.id===id);
  assert.equal(priceLabel(p('bracelet-amour'),'Composition avec cœur · tarif à confirmer'),'Tarif à confirmer');
  assert.equal(priceLabel(p('carte-million-dollar'),'Grande · 19 × 6 cm'),'50 TND');
  assert.equal(selectionTotal([{productId:'bracelet-bazi',quantity:2}],catalog.products),'280 TND – 360 TND');
  assert.equal(selectionTotal([{productId:'carte-million-dollar',variant:'Grande · 19 × 6 cm',quantity:2},{productId:'portefeuille-hafidha',quantity:1},{productId:'porte-cles-pierre',quantity:1}],catalog.products),'220 TND + tarifs à confirmer');
});

test("search and filters distinguish custom from non-custom pieces", async () => {
  const {filterProducts}=await import('../src/commerce-core.js');
  assert.equal(filterProducts(catalog.products,{mode:'custom'}).length,4);
  assert.equal(filterProducts(catalog.products,{mode:'ready'}).length,20);
  assert.equal(filterProducts(catalog.products,{search:'energie amour'}).length,1);
  assert.equal(filterProducts(catalog.products,{search:'no-such-piece'}).length,0);
  const sorted=filterProducts(catalog.products,{sort:'price-asc'});
  assert.equal(sorted[0].id,'porte-cles-amour'); // the energy keyrings, 30 TND, in catalogue order
  assert.equal(sorted.at(-1).price,null);
});

test("legacy selections are validated and no personal fields persist", async () => {
  const {normalizeSelection}=await import('../src/commerce-core.js');
  const clean=normalizeSelection([null,{productId:'removed',quantity:2},{productId:'bracelet-bazi',quantity:500,note:'private',variant:'bad-value'}],catalog.products);
  assert.equal(clean.length,1);assert.equal(clean[0].quantity,20);assert.equal(clean[0].variant,'Composition sur mesure');
  assert.ok(!('note' in clean[0]));
});

test("every product photo has a lighter 480px copy for cards, thumbnails and the cart", async () => {
  const {thumbSrc}=await import('../src/commerce-core.js');
  for (const product of catalog.products) for (const image of product.images) {
    await access(path.join(root, thumbSrc(image.src).replace(/^\//, '')));
  }
  const shop = await readFile(path.join(root,'dist/collections/all/index.html'),'utf8');
  assert.match(shop,/assets\/products\/organized\/480\//);
});

test("the polish layer loads on every kind of page and French punctuation stays with its word", async () => {
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  for (const page of ['', 'vos-mots', 'collections/all', 'products/bracelet-bazi', 'checkout', 'ar', 'ar/boutique', 'ar/products/bracelet-bazi']) {
    const html = await readFile(path.join(root, 'dist', page, 'index.html'), 'utf8');
    assert.match(html, /href="\/polish\.css"/);
    assert.match(html, /src="\/src\/ux\.js"/);
  }
  const shop = await readFile(path.join(root,'dist/collections/all/index.html'),'utf8');
  assert.match(shop,/pièces \?/);
  assert.doesNotMatch(shop,/pièces \?/);
});

test("reviews quote the clients' Arabic word for word, with a labelled French translation on French pages", async () => {
  // Since 24 November 2026: the 15 messages Rayda sent on 22 November replace the earlier five, each with the client's
  // name as she wrote it; a daughter's first name is shortened to « ر. » as she asked.
  const { reviews } = await import('../src/reviews.mjs');
  assert.equal(reviews.length, 15);
  assert.equal(new Set(reviews.map((r) => r.id)).size, 15);
  for (const review of reviews) {
    assert.match(review.name, /^[\u0600-\u06FF ]+$/, review.id);
    assert.ok(review.theme && review.context && review.ar && review.fr, review.id);
    assert.doesNotMatch(review.ar + review.fr, /(^|\s)(ريما|Rima)(\s|$)/, review.id);
  }
  assert.ok(reviews.find((r) => r.id === 'fatma-fille').ar.includes('الحمدلله ر. جابت معدل'));
  const page = await readFile(path.join(root, 'dist/vos-mots/index.html'), 'utf8');
  assert.equal((page.match(/<blockquote lang="ar" dir="rtl">/g) || []).length, 15);
  assert.equal((page.match(/class="g-translation"/g) || []).length, 15);
  assert.equal((page.match(/<bdi class="g-review-name" lang="ar" dir="rtl">/g) || []).length, 15);
  assert.ok(page.includes('<bdi class="g-review-name" lang="ar" dir="rtl">ندى نصري</bdi> · À propos de ses bracelets'));
  assert.match(page, /Traduit de l’arabe/);
  assert.match(page, /family=Markazi\+Text/);
  assert.match(page, /<p class="g-reviews-note">[^<]*ne garantissent aucun résultat/);
  const ar = await readFile(path.join(root, 'dist/ar/vos-mots/index.html'), 'utf8');
  assert.ok(ar.includes('ربي يحفضك و يعزك يا مدام رايدة يا سمحة ربي يعزك'));
  assert.ok(ar.includes('سهام شيخاوي · رسالة وصلت لرايدا'));
  assert.match(ar, /<p class="g-reviews-note">[^<]*ولا تضمن أي نتيجة/);
  assert.doesNotMatch(ar, /g-translation/);
  for (const html of [page, ar]) assert.doesNotMatch(html, /(^|[\s>«])ريما([\s<»]|$)/);
  // The homepage opens with the first message and its client's name.
  const home = await readFile(path.join(root, 'dist/index.html'), 'utf8');
  assert.ok(home.includes('<bdi class="g-review-name" lang="ar" dir="rtl">سهام شيخاوي</bdi> · Message reçu par Rayda'));
});

test("each review opens its real screenshot: one button per review, with profile pictures and the daughter's name blurred", async () => {
  // Since 24 November 2026 (the user's request): a button under every review opens the screenshot Rayda sent of that
  // message, in a dialog built by src/ux.js; without JavaScript the link opens the picture itself.
  const { reviews } = await import('../src/reviews.mjs');
  const { reviewCaptures, captureSrc } = await import('../src/review-captures.mjs');
  assert.deepEqual(Object.keys(reviewCaptures).sort(), reviews.map((r) => r.id).sort());
  const webpSize = (buf) => {
    const kind = buf.toString('ascii', 12, 16);
    if (kind === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
    if (kind === 'VP8L') { const bits = buf.readUInt32LE(21); return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]; }
    return [buf.readUIntLE(24, 3) + 1, buf.readUIntLE(27, 3) + 1];
  };
  for (const [id, size] of Object.entries(reviewCaptures)) {
    const file = await readFile(path.join(root, 'dist', captureSrc(id)));
    assert.deepEqual(webpSize(file), [size.width, size.height], id);
    assert.ok(size.width <= 900, id);
  }
  const fr = await readFile(path.join(root, 'dist/vos-mots/index.html'), 'utf8');
  const ar = await readFile(path.join(root, 'dist/ar/vos-mots/index.html'), 'utf8');
  for (const [html, label] of [[fr, 'Voir la capture d’écran'], [ar, 'شاهدوا صورة الرسالة']]) {
    const links = [...html.matchAll(/<a class="g-capture-link" href="([^"]+)" data-capture="(\d+)x(\d+)"[^>]*>.*?<span>([^<]+)<\/span><\/a>/g)];
    assert.deepEqual(links.map((m) => m[1]), reviews.map((r) => captureSrc(r.id)));
    for (const m of links) assert.equal(m[4], label);
  }
  assert.equal((fr.match(/Les photos de profil sont floutées\./g) || []).length, 14);
  assert.equal((fr.match(/Les photos de profil et le prénom de sa fille sont floutés\./g) || []).length, 1);
  assert.equal((ar.match(/صور الملف الشخصي مموّهة\./g) || []).length, 14);
  assert.equal((ar.match(/صور الملف الشخصي واسم ابنتها مموّهة\./g) || []).length, 1);
  // The homepage's message and the excerpts on the BaZi bracelet and necklace pages have their button too.
  for (const [file, id] of [['index.html', 'sihem-calme'], ['ar/index.html', 'sihem-calme'], ['products/bracelet-bazi/index.html', 'nadia-bracelet'], ['ar/products/bracelet-bazi/index.html', 'nadia-bracelet'], ['products/collier-bazi/index.html', 'ichraf-collier'], ['ar/products/collier-bazi/index.html', 'ichraf-collier']]) {
    const html = await readFile(path.join(root, 'dist', file), 'utf8');
    assert.equal((html.match(/class="g-capture-link"/g) || []).length, 1, file);
    assert.ok(html.includes(`<a class="g-capture-link" href="${captureSrc(id)}"`), file);
    assert.match(html, /<script defer src="\/src\/ux\.js">/, file);
  }
  const ux = await readFile(path.join(root, 'dist/src/ux.js'), 'utf8');
  assert.match(ux, /querySelectorAll\('a\[data-capture\]'\)/);
  assert.match(ux, /showModal\(\)/);
});

test("delivery is 7 TND on every order and the phone number is asked twice at checkout", async () => {
  const { DELIVERY_FEE, selectionTotalWithDelivery } = await import('../src/commerce-core.js');
  assert.equal(DELIVERY_FEE, 7);
  assert.equal(selectionTotalWithDelivery([{productId:'bracelet-bazi',quantity:2}],catalog.products),'287 TND – 367 TND');
  assert.equal(selectionTotalWithDelivery([{productId:'porte-cles-pierre',quantity:1}],catalog.products),'7 TND + tarifs à confirmer');
  for (const page of ['checkout', 'ar/checkout']) {
    const html = await readFile(path.join(root, 'dist', page, 'index.html'), 'utf8');
    assert.match(html, /name="phone"[^>]*required/);
    assert.match(html, /name="phoneConfirm"[^>]*required/);
    assert.match(html, /data-checkout-grand-total/);
  }
});

test("product pages carry Rayda's own description: her Arabic on /ar/, its French translation on French pages", async () => {
  const { productTexts } = await import('../src/product-texts.mjs');
  for (const product of catalog.products.filter(p => productTexts[p.id])) {
    for (const page of ['products/', 'ar/products/']) {
      const html = await readFile(path.join(root, 'dist', page + product.slug, 'index.html'), 'utf8');
      assert.match(html, /<div class="s-story" id="description"[ >]/);
      assert.match(html, /href="#description"/);
    }
  }
  const fleur = await readFile(path.join(root, 'dist/ar/products/fleur-de-vie/index.html'), 'utf8');
  assert.ok(fleur.includes('أعجوبة التناغم الكوني'));
});

test("product pages get to the point: a line on the piece, the price, one order button, no internal notes", async () => {
  const { productPitch } = await import('../src/product-pitch.mjs');
  for (const product of catalog.products) {
    for (const [page, lang] of [['products/', 'fr'], ['ar/products/', 'ar']]) {
      const html = await readFile(path.join(root, 'dist', page + product.slug, 'index.html'), 'utf8');
      assert.ok(productPitch[product.id]?.[lang], 'missing pitch for ' + product.id + ' (' + lang + ')');
      assert.match(html, /<p class="s-pitch">/);
      assert.equal((html.match(/class="g-button s-add" data-intent="buy"/g) || []).length, 1, product.id);
      assert.doesNotMatch(html, /À confirmer avec Rayda|تُؤكَّد مع رايدة|Prix non communiqué dans les éléments reçus|name="quantity" type="number"/);
      // Models, sizes and colours are buttons to tap, keyed on the catalogue's own values (prices and photos use them).
      const variants = product.options?.variant || [];
      if (variants.length > 1) for (const value of variants) assert.ok(html.includes('type="radio" name="variant" value="' + value + '"'), product.id + ': ' + value);
    }
  }
});

test("client words on product pages are exact pieces of real messages, shown like on Vos mots", async () => {
  const { productReviewParts } = await import('../src/product-pitch.mjs');
  const { reviews } = await import('../src/reviews.mjs');
  const flat = text => text.replace(/\s+/g, ' ');
  for (const [productId, parts] of Object.entries(productReviewParts)) {
    const review = reviews.find(r => r.id === parts.id);
    for (const piece of parts.ar) assert.ok(flat(review.ar).includes(piece), productId + ': ' + piece);
    for (const piece of parts.fr) assert.ok(flat(review.fr).includes(piece), productId + ': ' + piece);
    const slug = catalog.products.find(p => p.id === productId).slug;
    const fr = await readFile(path.join(root, 'dist/products', slug, 'index.html'), 'utf8');
    assert.match(fr, /family=Markazi\+Text/);
    assert.match(fr, /Traduit de l’arabe/);
  }
});

test("the product page styles change layout and sizes only, never the site's fonts", async () => {
  const css = await readFile(path.join(root, 'commerce.css'), 'utf8');
  const block = css.slice(css.indexOf('/* Product pages that get to the point')).replace(/\/\*[\s\S]*?\*\//g, '');
  assert.ok(block.length > 200);
  assert.doesNotMatch(block, /font-family|font:/);
});

test("every page layers the site's two colours with layers.css, which never changes a typeface", async () => {
  const css = await readFile(path.join(root, 'layers.css'), 'utf8');
  assert.doesNotMatch(css.replace(/\/\*[\s\S]*?\*\//g, ''), /font-family|font:/);
  for (const page of ['index.html', 'vos-mots/index.html', 'collections/all/index.html', 'products/bracelet-bazi/index.html', 'checkout/index.html', 'ar/index.html', 'ar/boutique/index.html', 'ar/products/bracelet-bazi/index.html', 'ar/checkout/index.html']) {
    const html = await readFile(path.join(root, 'dist', page), 'utf8');
    assert.match(html, /href="\/polish\.css" \/><link rel="stylesheet" href="\/layers\.css" \/>/, page);
  }
});

test("colour preferences are swatches keyed on the catalogue's own values, in French and Arabic", async () => {
  for (const product of catalog.products.filter(p => p.options?.palettes?.length)) {
    for (const page of ['products/', 'ar/products/']) {
      const html = await readFile(path.join(root, 'dist', page + product.slug, 'index.html'), 'utf8');
      for (const value of product.options.palettes) assert.ok(html.includes('type="radio" name="palette" value="' + value + '"'), product.id + ': ' + value);
      assert.doesNotMatch(html, /<select name="palette">/);
    }
  }
});

test("the language switch on French pages reads عر in Arabic letters, in the site's Arabic typeface", async () => {
  for (const page of ['index.html', 'vos-mots/index.html', 'collections/all/index.html', 'products/bracelet-bazi/index.html', 'checkout/index.html']) {
    const html = await readFile(path.join(root, 'dist', page), 'utf8');
    assert.match(html, /<span lang="ar" dir="rtl">عر<\/span><\/a>/, page);
    assert.doesNotMatch(html, /<span>AR<\/span>/, page);
    assert.match(html, /family=Tajawal:wght@700&text=%D8%B9%D8%B1/, page);
  }
  const polish = await readFile(path.join(root, 'polish.css'), 'utf8');
  assert.match(polish, /\.g-lang-switch span\[lang="ar"\]\{font-family:var\(--sans\);/);
});

test("the homepage keeps Rayda's own photo as it is and styles only its frame", async () => {
  for (const page of ['index.html', 'ar/index.html']) {
    const html = await readFile(path.join(root, 'dist', page), 'utf8');
    assert.match(html, /<div class="g-hero-photo"><img src="\/assets\/brand\/rayda\.jpg"/, page);
  }
  const css = (await readFile(path.join(root, 'layers.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  assert.match(css, /\.g-hero-photo\{[^}]*border-inline-start:16px solid var\(--cream\);margin-inline-start:-16px/);
  assert.doesNotMatch(css, /\.g-hero-photo img/);
});

test("product photos keep their size and crop: the main photo is shown whole and only its corners are rounded", async () => {
  const css = (await readFile(path.join(root, 'layers.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  const rule = css.match(/\.s-main-image>img\{([^}]*)\}/)[1];
  assert.match(rule, /max-width:100%;max-height:100%/);
  assert.match(rule, /border-radius:/);
  assert.doesNotMatch(rule, /object-fit|padding|transform|scale/);
});
test("AI photos follow each lifestyle scene instead of Rayda's photos, colours show their own photo, and the gallery says so", async () => {
  const ai = catalog.products.filter((p) => p.images.some((image) => image.src.includes('-ai-')));
  assert.equal(ai.length, 22);
  for (const p of ai) {
    // The lifestyle scene first (the BaZi necklace and the Arbre de Vie keyring have none), then only ChatGPT photos.
    const scene = p.images[0].src.endsWith('-ugc.jpg');
    assert.ok(scene || ['collier-bazi', 'porte-cles-arbre-vie'].includes(p.id), p.id + ' keeps its lifestyle photo first');
    if (scene) assert.equal(p.coverImageIndex, 0);
    for (const image of p.images.slice(scene ? 1 : 0)) {
      assert.match(image.src, new RegExp('/' + p.id + '-ai-[a-z-]+\\.jpg$'));
      assert.ok(image.alt.length > 10);
    }
  }
  assert.equal(ai.reduce((n, p) => n + p.images.filter((image) => image.src.includes('-ai-')).length, 0), 85);
  // Rayda sells the wallet in green, yellow and red only: no pink photo, and the group photo shows three.
  assert.ok(!catalog.products.find((p) => p.id === 'portefeuille-hafidha').images.some((image) => /rose|ai-couleurs/.test(image.src)));
  // The wallet's colour is chosen from the client's birth date, so it has no colour buttons.
  const wallet = catalog.products.find((p) => p.id === 'portefeuille-hafidha');
  assert.equal(wallet.options?.variant, undefined);
  assert.equal(wallet.variantImageIndex, undefined);
  const amour = catalog.products.find((p) => p.id === 'bracelet-amour');
  assert.match(amour.images[amour.variantImageIndex['Quartz rose uni · 100 TND']].src, /-ai-uni-wrist\.jpg$/);
  assert.match(amour.images[amour.variantImageIndex['Composition avec cœur · tarif à confirmer']].src, /-ai-coeur-wrist\.jpg$/);
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const fr = await readFile(path.join(root, 'dist/products/bracelet-bazi/index.html'), 'utf8');
  assert.match(fr, /Les photos sont des mises en scène créées à partir des photos de Rayda\. Votre pièce est composée pour vous/);
  const ar = await readFile(path.join(root, 'dist/ar/products/bracelet-bazi/index.html'), 'utf8');
  assert.match(ar, /الصور مشاهد مُعَدّة انطلاقًا من صور رايدا\./);
  // No page says that some photos are her own: none is shown as she sent it.
  for (const p of catalog.products) for (const dir of ['products/', 'ar/products/']) {
    assert.doesNotMatch(await readFile(path.join(root, 'dist', dir + p.slug, 'index.html'), 'utf8'), /ses propres photos|صورها الخاصة/, dir + p.slug);
  }
});
test("Rayda's notes: wallet name and price, her name in Arabic, no promised call or money, and the checkout questions", async () => {
  const wallet = catalog.products.find((p) => p.id === 'portefeuille-hafidha');
  assert.equal(wallet.price.min, 120);
  assert.ok(!wallet.details.some((line) => /promesse|garantit /.test(line)));
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const walletAr = await readFile(path.join(root, 'dist/ar/products/portefeuille-hafidha/index.html'), 'utf8');
  assert.match(walletAr, /<h1[^>]*>حافظة المال<\/h1>/);
  assert.doesNotMatch(walletAr, /محفظة حافظة المال|لا وعد بنتيجة مالية|name="variant" value="Vert"/);
  assert.match(walletAr, /120/);
  const reviews = await readFile(path.join(root, 'src/reviews.mjs'), 'utf8');
  for (const file of ['dist/ar/index.html', 'dist/ar/checkout/index.html', 'dist/ar/products/bracelet-bazi/index.html', 'dist/products/bracelet-bazi/index.html', 'dist/checkout/index.html']) {
    const html = await readFile(path.join(root, file), 'utf8');
    // Her name ends in alif; the only "رايدة" left is inside a client's own message, quoted word for word.
    const stray = (html.match(/[^<>]*رايدة[^<>]*/g) || []).filter((text) => !reviews.includes(text.trim().slice(0, 30)));
    assert.deepEqual(stray, [], file);
    assert.doesNotMatch(html, /Rayda vous appelle|Rayda vous recontacte|تتصل بكم رايد|تتواصل رايد/, file);
  }
  for (const file of ['dist/checkout/index.html', 'dist/ar/checkout/index.html']) {
    const html = await readFile(path.join(root, file), 'utf8');
    assert.match(html, /name="birthDate" type="date"[^>]*required/);
    assert.match(html, /<textarea name="goals"[^>]*required/);
    assert.match(html, /confidentielles et anonymes|الخصوصية وعدم الكشف عن الهوية/);
  }
});
test("emphasis.css is on every page, never sets a typeface, and personalised pieces say they are chosen for the buyer", async () => {
  const css = (await readFile(path.join(root, 'emphasis.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  assert.doesNotMatch(css, /font-family|font\s*:/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i, 'colours come from the site tokens');
  for (const p of catalog.products) assert.equal(p.options?.palettes, undefined, p.id + ' has no colour preference picker');
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  for (const file of ['dist/index.html', 'dist/ar/index.html', 'dist/products/bracelet-bazi/index.html', 'dist/ar/checkout/index.html']) {
    const html = await readFile(path.join(root, file), 'utf8');
    assert.ok(html.indexOf('/emphasis.css') > html.indexOf('/layers.css'), file);
  }
  for (const id of ['bracelet-bazi', 'collier-bazi', 'portefeuille-hafidha']) {
    assert.match(await readFile(path.join(root, 'dist/products/' + id + '/index.html'), 'utf8'), /class="s-tailored"><b>Composé pour vous, pas choisi sur catalogue\.<\/b> Vous ne choisissez/);
    assert.match(await readFile(path.join(root, 'dist/ar/products/' + id + '/index.html'), 'utf8'), /class="s-tailored"><b>تُصنع لكم أنتم، لا حسب الاختيار\.<\/b> لا تختارون/);
  }
  assert.doesNotMatch(await readFile(path.join(root, 'dist/products/decor-abondance/index.html'), 'utf8'), /s-tailored/);
});
test("motion.css and motion.js load last on every page, respect reduced motion and never set a typeface", async () => {
  const css = (await readFile(path.join(root, 'motion.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  assert.doesNotMatch(css, /font-family|font\s*:/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b/i, 'colours come from the site tokens');
  assert.match(css, /prefers-reduced-motion:reduce/);
  const js = await readFile(path.join(root, 'src/motion.js'), 'utf8');
  assert.match(js, /prefers-reduced-motion: reduce/);
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  for (const file of ['dist/index.html', 'dist/ar/index.html', 'dist/products/cle-de-vie/index.html', 'dist/ar/checkout/index.html']) {
    const html = await readFile(path.join(root, file), 'utf8');
    assert.ok(html.indexOf('/motion.css') > html.indexOf('/emphasis.css'), file);
    assert.match(html, /<script defer src="\/src\/motion\.js"><\/script>/, file);
  }
  // Miller's law: the checkout form is cut into three numbered groups.
  for (const file of ['dist/checkout/index.html', 'dist/ar/checkout/index.html']) {
    assert.equal(((await readFile(path.join(root, file), 'utf8')).match(/class="s-form-step"/g) || []).length, 3, file);
  }
});
test("Rayda's welcome and who-is texts lead the home pages, in French and in Arabic", async () => {
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const fr = await readFile(path.join(root, 'dist/index.html'), 'utf8');
  for (const text of ['Votre voyage vers la meilleure version de vous-même commence ici.', '<h2>Qui est Rayda\u00a0?</h2>', '<blockquote>Je suis Raida Ghrab, chercheuse en sciences énergétiques, en programmation du subconscient et Grand Maître en Reiki de l’Argent.</blockquote>', 'fondatrice de la marque I$$OLATEJ depuis 2017']) assert.ok(fr.includes(text), text);
  const ar = await readFile(path.join(root, 'dist/ar/index.html'), 'utf8');
  for (const text of ['ودع رحلة التحول الإيجابي تبدأ من هنا.', '<h2>من هي رايدا؟</h2>', '<blockquote>رايدا الغراب باحثة في علوم الطاقة و برمجة اللاوعي و جراند ماستر في ريكي المال</blockquote>', 'من بين رسائلي في الحياة مساعدتك على تطوير نسختك.']) assert.ok(ar.includes(text), text);
  // The old bio paragraphs are gone, replaced by her own words.
  assert.doesNotMatch(fr, /quatre mots qu’elle porte comme une signature/);
});
test("Rayda's book: three editions at 35, 42 and 45 TND, and her baccalaureate text only for that edition", async () => {
  const { priceLabel, priceLabelAr } = await import('../src/commerce-core.js');
  const book = catalog.products.find((p) => p.id === 'livre-excellence');
  assert.deepEqual([...book.options.variant], ['Primaire', 'Collège et lycée', 'Baccalauréat']);
  assert.equal(book.custom, false);
  assert.equal(priceLabel(book, 'Baccalauréat'), '45 TND');
  assert.equal(priceLabel(book, 'Primaire'), '35 TND');
  assert.equal(priceLabel(book, 'Collège et lycée'), '42 TND');
  assert.equal(priceLabelAr(book, 'Collège et lycée'), '42 د.ت');
  for (const [value, shot] of [['Primaire', 'primaire'], ['Collège et lycée', 'college'], ['Baccalauréat', 'bac']]) assert.match(book.images[book.variantImageIndex[value]].src, new RegExp('-ai-' + shot + '-'));
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  for (const [page, bac, general] of [['products/', 'En année de Baccalauréat, le vrai problème', 'La vraie réussite scolaire prend sa source à l’intérieur'], ['ar/products/', 'في سنة الباكالوريا، المشكلة ليست في صعوبة الدروس', 'تبدأ رحلة التميز الدراسي الحقيقي من الداخل']]) {
    const html = await readFile(path.join(root, 'dist', page + 'livre-excellence', 'index.html'), 'utf8');
    // The main text stands for the first two editions and shows first; the baccalaureate text waits, hidden, for its edition.
    const main = html.match(/<div class="s-story" id="description" data-for-variants="Primaire\|Collège et lycée">([\s\S]*?)<\/section>/)[1];
    const bacBlock = html.match(/<div class="s-story" id="description-baccalaureat" data-for-variants="Baccalauréat" hidden>([\s\S]*?)<\/section>/)[1];
    assert.ok(main.indexOf(general) > -1 && main.indexOf(general) < main.indexOf('id="description-baccalaureat"'), page);
    assert.ok(bacBlock.includes(bac), page);
    assert.ok(!main.slice(0, main.indexOf('id="description-baccalaureat"')).includes(bac), page);
  }
  const css = await readFile(path.join(root, 'commerce.css'), 'utf8');
  assert.match(css, /\.s-story\[hidden\]\{display:none\}/);
  const js = await readFile(path.join(root, 'src/commerce.js'), 'utf8');
  assert.match(js, /data-for-variants/);
  // Every edition has its price now, so "the price is given when we call you" is gone from the book's page; it still
  // shows while a choice without a price is picked (the heart model of the Énergie Amour bracelet).
  const fr = await readFile(path.join(root, 'dist/products/livre-excellence/index.html'), 'utf8');
  assert.doesNotMatch(fr, /Le prix vous est donné/);
  const amour = await readFile(path.join(root, 'dist/products/bracelet-amour/index.html'), 'utf8');
  assert.match(amour, /<p class="s-small s-price-hint" data-price-unknown hidden>Le prix vous est donné/);
  assert.match(js, /\[data-price-unknown\]/);
});
test("the learning accessories are prepared from the birth date: 100 TND for the bracelet and the cord necklace, 130 TND for the gold chain", async () => {
  const { priceLabel } = await import('../src/commerce-core.js');
  const piece = catalog.products.find((p) => p.id === 'accessoires-apprentissage');
  assert.equal(piece.custom, true);
  assert.equal(priceLabel(piece, 'Bracelet'), '100 TND');
  assert.equal(priceLabel(piece, 'Collier sur cordon'), '100 TND');
  assert.equal(priceLabel(piece, 'Collier sur chaîne dorée'), '130 TND');
  for (const slug of ['apprentissage', 'bracelets', 'colliers']) assert.ok(catalog.collections.find((c) => c.slug === slug).productIds.includes(piece.id), slug);
  // The book and the accessories each have their own type (and card), not one shared study collection.
  assert.deepEqual([...catalog.collections.find((c) => c.slug === 'livres').productIds], ['livre-excellence']);
  assert.deepEqual([...catalog.collections.find((c) => c.slug === 'apprentissage').productIds], ['accessoires-apprentissage', 'bouteille-verre']);
  assert.equal(catalog.collections.find((c) => c.slug === 'excellence-scolaire'), undefined);
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const ar = await readFile(path.join(root, 'dist/ar/products/accessoires-apprentissage/index.html'), 'utf8');
  for (const text of ['<h1>أكسسوارات تفعيل طاقة التعلم</h1>', 'تعتمد هذه المجموعة على ترددات الأحجار الكريمة', 'يتم إعداد القطعة بناءا على تاريخ الولادة', 'الأحجار يمكن أن تختلف من حيث العدد و النوع و الشكل و الحجم.']) assert.ok(ar.includes(text), text);
  const fr = await readFile(path.join(root, 'dist/products/accessoires-apprentissage/index.html'), 'utf8');
  assert.match(fr, /class="s-tailored"><b>Préparé pour vous\.<\/b> Vous choisissez la pièce/);
  assert.doesNotMatch(fr, /Le prix vous est donné/);
  // Her own French text (15 November), in place of the translation the page had before.
  for (const text of ['Cette collection s’appuie sur les fréquences des pierres précieuses', 'je veille sur l’aspect énergétique de chaque pièce', 'les Beaux Noms d’Allah (Al-Asma Al-Husna) et le Saint Coran.']) assert.ok(fr.includes(text), text);
  // Since 21 November 2026 the accessories sit in the Bracelets and Colliers groups (and their own collection page);
  // the home page and the Boutique show the eight groups, ending with the car pendants and the book.
  for (const file of ['dist/index.html', 'dist/collections/all/index.html', 'dist/ar/index.html', 'dist/ar/boutique/index.html']) {
    const html = await readFile(path.join(root, file), 'utf8');
    assert.doesNotMatch(html, /s-category-wide|excellence-scolaire/, file);
    const cards = [...html.matchAll(/<a class="s-category" href="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(cards.length, 8, file);
    assert.match(cards[6], /\/collections\/voiture\/$/, file);
    assert.match(cards[7], /\/products\/livre-excellence\/$/, file);
  }
});
test("paths: the home page and the Boutique open with Rayda's collections, each door leading to a page with only its pieces", async () => {
  const { pathsAr } = await import('../src/catalog-ar.mjs');
  assert.deepEqual([...catalog.paths.map((p) => p.slug)], ['etudes', 'abondance', 'amour']);
  for (const p of catalog.paths) {
    assert.match(p.slug, /^[a-z-]+$/);
    assert.ok(p.name && p.summary && p.description && p.productIds.length, p.slug);
    for (const id of p.productIds) assert.ok(catalog.products.some((x) => x.id === id), p.slug + ' ' + id);
    assert.ok(pathsAr[p.slug]?.name && pathsAr[p.slug].summary && pathsAr[p.slug].description, p.slug);
  }
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  // Before the product types: right after the welcome on the home pages, at the top of the Boutique.
  for (const [file, prefix] of [['dist/index.html', ''], ['dist/collections/all/index.html', ''], ['dist/ar/index.html', '/ar'], ['dist/ar/boutique/index.html', '/ar']]) {
    const main = (await readFile(path.join(root, file), 'utf8')).match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
    const at = main.indexOf('<section class="g-paths" id="chemins"');
    assert.ok(at > -1 && at < main.indexOf('class="s-category-grid"'), file);
    const doors = [...main.matchAll(/<a class="g-path" href="([^"]+)">/g)].map((m) => m[1]);
    assert.deepEqual(doors, [...catalog.paths.map((p) => prefix + '/parcours/' + p.slug + '/')], file);
  }
  const home = await readFile(path.join(root, 'dist/index.html'), 'utf8');
  // "/#chemins" (and "/ar/#chemins") opens the home page at the paths, for links Rayda shares.
  assert.ok(home.indexOf('<section class="g-paths" id="chemins"') > home.indexOf('<section class="g-hero">'));
  // Each path's page holds exactly its pieces, in French and in Arabic, and links to the other paths.
  for (const p of catalog.paths) {
    for (const prefix of ['', 'ar/']) {
      const html = await readFile(path.join(root, 'dist', prefix + 'parcours', p.slug, 'index.html'), 'utf8');
      assert.deepEqual([...html.matchAll(/data-product-card="([^"]+)"/g)].map((m) => m[1]), [...p.productIds], prefix + p.slug);
      for (const other of catalog.paths.filter((o) => o.slug !== p.slug)) assert.ok(html.includes('href="/' + prefix + 'parcours/' + other.slug + '/"'), prefix + p.slug + ' → ' + other.slug);
    }
  }
  // Her three collections by her own names ("مجموعة التألق العلمي", "مجموعة الوفرة", "مجموعة الحب").
  for (const [slug, fr, ar] of [['etudes', 'Excellence scolaire', 'التألق العلمي'], ['abondance', 'Abondance', 'الوفرة'], ['amour', 'Amour', 'الحب']]) {
    assert.ok((await readFile(path.join(root, 'dist/parcours', slug, 'index.html'), 'utf8')).includes('<h1>' + fr + '</h1>'), slug);
    assert.ok((await readFile(path.join(root, 'dist/ar/parcours', slug, 'index.html'), 'utf8')).includes('<h1>' + ar + '</h1>'), 'ar ' + slug);
  }
  assert.ok(pathsAr.etudes.description.startsWith('مجموعة التألق العلمي'));
  assert.ok(pathsAr.abondance.description.startsWith('مجموعة الوفرة'));
});
test("the bottle, the key necklace and the Feng Shui coins: her prices, her own texts, a scene, then ChatGPT photos", async () => {
  const { priceLabel, priceLabelAr } = await import('../src/commerce-core.js');
  const byId = (id) => catalog.products.find((p) => p.id === id);
  const bottle = byId('bouteille-verre'), key = byId('collier-cle'), coins = byId('pieces-feng-shui');
  assert.equal(priceLabel(bottle), '55 TND');
  assert.equal(priceLabel(key, 'Collier standard'), '45 TND');
  assert.equal(priceLabel(key, 'Collier long'), '55 TND');
  assert.equal(priceLabelAr(key, 'Collier long'), '55 د.ت');
  // Her price for the coins came on 19 November ("ثمنها 45", in reply to her own photo of them).
  assert.equal(priceLabel(coins), '45 TND');
  for (const p of [bottle, key, coins]) {
    assert.equal(p.custom, false, p.id);
    // A lifestyle scene first (the cover), then ChatGPT photos made from her photos (21 November). The bottle has
    // only its scene, which carries her real print.
    assert.match(p.images[0].src, new RegExp('/organized/' + p.id + '-ugc\\.jpg$'), p.id);
    assert.equal(p.coverImageIndex, 0);
    assert.ok(p.images.slice(1).every((image) => new RegExp('/organized/' + p.id + '-ai-[a-z-]+\\.jpg$').test(image.src)), p.id);
  }
  assert.deepEqual([bottle.images.length, key.images.length, coins.images.length], [1, 3, 3]);
  assert.ok(catalog.collections.find((c) => c.slug === 'apprentissage').productIds.includes('bouteille-verre'));
  assert.ok(catalog.collections.find((c) => c.slug === 'colliers').productIds.includes('collier-cle'));
  assert.ok(catalog.collections.find((c) => c.slug === 'objets-dores').productIds.includes('pieces-feng-shui'));
  // Her collections: the bottle with the book and the accessories; the key necklace, the BaZi bracelet and the coins
  // with the wallet, the card and the dollar-crown-infinity décor. The Clé de Vie is not in her list.
  const pieces = (slug) => [...catalog.paths.find((p) => p.slug === slug).productIds];
  assert.deepEqual(pieces('etudes'), ['livre-excellence', 'accessoires-apprentissage', 'bouteille-verre']);
  assert.deepEqual(pieces('abondance'), ['portefeuille-hafidha', 'carte-million-dollar', 'decor-abondance', 'collier-cle', 'bracelet-bazi', 'pieces-feng-shui', 'grenouille-fortune']);
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const page = (p) => readFile(path.join(root, 'dist', p, 'index.html'), 'utf8');
  const checks = [
    // The build sets a no-break space before French colons.
    ['products/bouteille-verre', ['Cette bouteille réunit deux dimensions complémentaires\u00a0:', '1. La dimension énergétique', 'Elle intègre des symboles, des affirmations positives ainsi que des versets du Coran.', 'votre fille ou votre fils est invité(e) à développer progressivement de nouveaux schémas de pensée', 'Car la réussite de nos enfants ne repose pas uniquement sur les connaissances, mais aussi sur la confiance en soi, l’encouragement et un environnement positif.']],
    ['ar/products/bouteille-verre', ['تجمع هذه القارورة بين بُعدين متكاملين:', 'الأول: البُعد الطاقي', 'وقد استلهمتُ جزءا من فكرتها من الأبحاث العلمية حول تأثير الكلمات والرموز في بلورات الماء.', 'الثاني: بُعد البرمجة الذهنية واللاوعي', 'لأن نجاح أبنائنا لا يحتاج إلى المعرفة وحدها، بل يحتاج أيضاً إلى الثقة بالنفس، والتحفيز، والبيئة الإيجابية.']],
    ['products/collier-cle', ['Lorsque l’on comprend que tout est énergie, et que les symboles peuvent générer des fréquences subtiles et interagir avec notre inconscient', 'La clé est un symbole profondément associé à la chance, à l’ouverture des portes et à la facilitation des choses, avec la permission de Dieu.', '<legend>Longueur</legend>', 'Collier standard', 'Collier long']],
    ['ar/products/collier-cle', ['عندما نعلم أن كل شيء طاقة و أن الرموز تُحدث ترددات لاواعية و تفاعلا خفيا مع اللاوعي نعرف أن وجود قلادة المفتاح في هذا الموقع ليس اعتباطيا فهي رمز يرتبط بمعاني الحظ و التسهيل بإذن الله و يتم تدعيم ذلك بالشحن الطاقي من خلال ريكي المال.', '<legend>الطول</legend>', 'قلادة عادية', 'قلادة طويلة']],
    ['products/pieces-feng-shui', ['<h1>Pièces chinoises Feng Shui</h1>', '45 TND']],
    ['ar/products/pieces-feng-shui', ['<h1>قطع نقدية صينية للفنج شوي</h1>', 'منتجات الفنج شوي']]
  ];
  for (const [file, texts] of checks) {
    const html = await page(file);
    for (const text of texts) assert.ok(html.includes(text), file + ': ' + text);
    // The gallery says its photos are staged scenes (the bottle's single photo: "La photo est une mise en scène…").
    assert.match(html, file.startsWith('ar/') ? /(الصور مشاهد مُعَدّة|الصورة مشهد مُعَدّ) انطلاقًا من صور رايدا\./ : /(Les photos sont des mises en scène créées|La photo est une mise en scène créée) à partir des photos de Rayda\./, file);
  }
});
test("the money frog and the love trophy: her prices, her texts in both languages, a scene and ChatGPT photos, her collections", async () => {
  const { priceLabel, priceLabelAr } = await import('../src/commerce-core.js');
  const byId = (id) => catalog.products.find((p) => p.id === id);
  const frog = byId('grenouille-fortune'), trophy = byId('trophee-amour');
  assert.equal(priceLabel(frog), '80 TND');
  assert.equal(priceLabelAr(frog), '80 د.ت');
  assert.equal(priceLabel(trophy), '115 TND');
  for (const p of [frog, trophy]) {
    assert.equal(p.custom, false, p.id);
    // A CreateUGC scene first (the cover), then ChatGPT photos made from her photos (20 November).
    assert.ok(p.images[0].src.endsWith('/organized/' + p.id + '-ugc.jpg'), p.id);
    assert.equal(p.coverImageIndex, 0, p.id);
    assert.ok(p.images.slice(1).every((image) => new RegExp('/organized/' + p.id + '-ai-[a-z]+\\.jpg$').test(image.src)), p.id);
    assert.ok(catalog.collections.find((c) => c.slug === 'objets-dores').productIds.includes(p.id), p.id);
  }
  assert.deepEqual([frog.images.length, trophy.images.length], [4, 3]);
  assert.match(trophy.images[0].alt, /« الله الجامع »/);
  // The frog joins her abundance collection; her love collection ("مجموعة الحب") opens with the trophy.
  const pieces = (slug) => [...catalog.paths.find((p) => p.slug === slug).productIds];
  assert.ok(pieces('abondance').includes('grenouille-fortune'));
  assert.deepEqual(pieces('amour'), ['trophee-amour', 'bouteille-amour', 'porte-cles-amour', 'bracelet-amour']);
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const page = (p) => readFile(path.join(root, 'dist', p, 'index.html'), 'utf8');
  const checks = [
    // The build sets a no-break space before French colons and question marks, and inside « ».
    ['products/grenouille-fortune', ['<h1>Grenouille de la fortune</h1>', '80 TND', 'grenouille à trois pattes, est l’un des symboles les plus emblématiques de richesse et d’abondance', 'avec une pièce d’or dans la bouche, symbole de chance et de prospérité', 'Elle vous est proposée chargée en Reiki de l’Argent.', 'Matière : résine et pièce en métal', 'Dimensions : 4,5 × 4 cm']],
    ['ar/products/grenouille-fortune', ['<h1>ضفدع المال</h1>', '80 د.ت', 'يعدّ ضفدع المال (المعروف أيضاً بـ &quot;تشان تشو&quot; أو الضفدع ذو الثلاثة أرجل) من أشهر رموز الثروة والوفرة في فلسفة الفنج شوي الصينية.', 'ويحمل في فمه عملة ذهبية ترمز الحظ السعيد وتدفق المال إلى المنزل أو مكان العمل.', 'يأتيكم مشحونا بريكي المال', 'الأبعاد: 4,5 سنتمتر × 4 سنتمتر']],
    ['products/trophee-amour', ['<h1>Trophée d’Amour</h1>', '115 TND', 'une pièce décorative conçue avec soin pour devenir un véritable ancrage visuel et spirituel', 'La programmation positive du subconscient', 'Vous pouvez également l’utiliser même si vous n’êtes pas encore mariée', 'des Beaux Noms d’Allah', '<li><p>Il apporte une touche décorative raffinée et une atmosphère chaleureuse, empreinte de spiritualité, à votre chambre ou à votre espace de vie.</p></li>']],
    ['ar/products/trophee-amour', ['<h1>رمز الحب</h1>', '115 د.ت', 'أقدم لك «رمز الحب»، وهو قطعة فنية مصممة بعناية لتعمل كمرساة بصرية وروحية تدعم توازنك العاطفي وتجذب إليك طاقة الاستقرار.', 'بوابتك نحو علاقة يسودها الحب الدائم والمودة والرحمة', 'علما بأنك يمكن أن تستعمليه حتى ان لم تكوني متزوجة لأنه مصمم ليساعدك على التخلص من جزء من البلوكات التي تمنع ارتباطك', '<li><p>يضفي لمسة جمالية وروحانية دافئة على غرفة النوم أو مساحة المعيشة.</p></li>', 'اجعل من منزلك مساحة تنبض بالحب والسكينة. اطلب «رمز الحب» الخاص بك اليوم وابدأ رحلة جديدة من التناغم العاطفي والروحي.']]
  ];
  for (const [file, texts] of checks) {
    const html = await page(file);
    for (const text of texts) assert.ok(html.includes(text), file + ': ' + text);
    // A plain point (no lead words) never prints an empty or "undefined" lead.
    assert.doesNotMatch(html, /<b>undefined<\/b>|<b><\/b>/, file);
    // The gallery says its photos are staged scenes made from Rayda's photos, and keeps its arrows (several photos).
    assert.match(html, file.startsWith('ar/') ? /الصور مشاهد مُعَدّة انطلاقًا من صور رايدا\./ : /Les photos sont des mises en scène créées à partir des photos de Rayda\./, file);
    assert.doesNotMatch(html, /s-gallery-single/, file);
  }
  // A piece with a single photo (the glass bottle and the Fleur de Vie car pendant, each with its scene only) shows no
  // arrows, counter or thumbnails.
  for (const file of ['products/bouteille-verre', 'ar/products/bouteille-verre', 'products/pendentif-voiture-fleur', 'ar/products/pendentif-voiture-fleur']) {
    assert.match(await page(file), /class="s-gallery s-gallery-single"/, file);
  }
  // Her love collection by her name, opening with the trophy, in both languages (the love bottle and the Amour keyring
  // joined it on 21 November).
  for (const [file, h1] of [['parcours/amour', 'Amour'], ['ar/parcours/amour', 'الحب']]) {
    const html = await page(file);
    assert.ok(html.includes('<h1>' + h1 + '</h1>'), file);
    assert.deepEqual([...html.matchAll(/data-product-card="([^"]+)"/g)].map((m) => m[1]), ['trophee-amour', 'bouteille-amour', 'porte-cles-amour', 'bracelet-amour'], file);
  }
});
test("the love bottle and the four energy keyrings: her prices, her texts word for word, a scene and ChatGPT photos; her new BaZi and learning pieces", async () => {
  const { priceLabel, priceLabelAr } = await import('../src/commerce-core.js');
  const { productTexts } = await import('../src/product-texts.mjs');
  const { productPitch } = await import('../src/product-pitch.mjs');
  const { productsAr } = await import('../src/catalog-ar.mjs');
  const byId = (id) => catalog.products.find((p) => p.id === id);
  const files = (p) => [...p.images].map((image) => image.src.split('/').pop());
  // The love bottle ("قارورة الحب"): glass, one litre, 55 TND, her text in both languages; a scene and two ChatGPT
  // photos, with her real print laid onto the bottle from her photos.
  const bottle = byId('bouteille-amour');
  assert.equal(priceLabel(bottle), '55 TND');
  assert.equal(priceLabelAr(bottle), '55 د.ت');
  assert.equal(bottle.custom, false);
  assert.deepEqual(files(bottle), ['bouteille-amour-ugc.jpg', 'bouteille-amour-ai-chevet.jpg', 'bouteille-amour-ai-table.jpg']);
  assert.ok(bottle.details.includes('Matière : verre') && bottle.details.includes('Contenance : 1 litre'));
  assert.ok(productsAr['bouteille-amour'].details.includes('المادة: بلور') && productsAr['bouteille-amour'].details.includes('السعة: لتر'));
  assert.deepEqual(productTexts['bouteille-amour'].fr.sections.map((section) => section.title), ['1. La programmation du subconscient', '2. La dynamisation énergétique de l’eau']);
  assert.equal(productTexts['bouteille-amour'].ar.intro.length, 2);
  // The four keyrings, 30 TND each: her own sentence is the description and the line on the page, in both languages,
  // and the verses written on each are in its details.
  const keyrings = {
    'porte-cles-amour': ['حامل مفاتيح مشحون يبرمج اللاوعي على المودة و الرحمة و علاقة الحب الدائمة', ['وجعل بينكم مودة ورحمة']],
    'porte-cles-chance': ['حامل مفاتيح مشحون يبرمج اللاوعي على الحظ و التسهيل', ['إنا فتحنا لك فتحا مبينا', 'وما يلقاها إلا ذو حظ عظيم']],
    'porte-cles-voyage': ['حامل مفاتيح مشحون يبرمج اللاوعي على تسهيل السفر', ['وقال اركبوا فيها بسم الله مجراها ومرساها', 'هو الذي جعل لكم الأرض ذلولا فامشوا في مناكبها']],
    'porte-cles-protection': ['حامل مفاتيح مشحون يبرمج اللاوعي على الحماية من الطاقات السلبية و التدرع الطاقي', ['فالله خير حافظا', 'وهو على كل شيء قدير']]
  };
  for (const [id, [ar, verses]] of Object.entries(keyrings)) {
    const k = byId(id);
    assert.equal(priceLabel(k), '30 TND', id);
    assert.equal(priceLabelAr(k), '30 د.ت', id);
    assert.equal(k.custom, false, id);
    assert.deepEqual(files(k), [id + '-ugc.jpg', id + '-ai-main.jpg', id + '-ai-lin.jpg'], id);
    assert.equal(productsAr[id].description, ar, id);
    assert.equal(productPitch[id].ar, ar, id);
    assert.equal(productPitch[id].fr, k.description, id);
    for (const verse of verses) {
      assert.ok(k.details.some((line) => line.includes('« ' + verse + ' »')), id + ': ' + verse);
      assert.ok(productsAr[id].details.some((line) => line.includes('«' + verse + '»')), id + ' (ar): ' + verse);
    }
  }
  // They join the keyring collection; her love collection has the bottle and the Amour keyring after the trophy.
  assert.deepEqual([...catalog.collections.find((c) => c.slug === 'porte-cles').productIds], ['porte-cles-pierre', 'porte-cles-arbre-vie', ...Object.keys(keyrings)]);
  assert.deepEqual([...catalog.paths.find((p) => p.slug === 'amour').productIds], ['trophee-amour', 'bouteille-amour', 'porte-cles-amour', 'bracelet-amour']);
  // Her new pieces (21 November), all as ChatGPT photos made from her photos: the BaZi necklace opens with her new
  // necklace worn, then her three necklaces laid flat; eight more bracelets; her two learning necklaces.
  assert.deepEqual(files(byId('collier-bazi')), ['collier-bazi-ai-porte.jpg', 'collier-bazi-ai-lapis.jpg', 'collier-bazi-ai-rose.jpg', 'collier-bazi-ai-tourmaline.jpg']);
  assert.deepEqual(files(byId('bracelet-bazi')).slice(-8), [...'abcdefgh'].map((l) => 'bracelet-bazi-ai-modele-' + l + '.jpg'));
  assert.deepEqual(files(byId('accessoires-apprentissage')).slice(-2), ['accessoires-apprentissage-ai-cordon-carnet.jpg', 'accessoires-apprentissage-ai-chaine-carnet.jpg']);
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const page = (p) => readFile(path.join(root, 'dist', p, 'index.html'), 'utf8');
  const checks = [
    ['products/bouteille-amour', ['<h1>Bouteille de l’Amour</h1>', '55 TND', '1 litre', '1. La programmation du subconscient', 'Elle vise à programmer le subconscient autour des valeurs de l’amour, de la tendresse, de la bienveillance et d’une belle harmonie au sein du couple.', 'Les personnes non mariées peuvent également l’utiliser.', '2. La dynamisation énergétique de l’eau', 'sont destinés à charger le noyau de l’eau en énergie.', 'qui accompagne votre démarche de mieux-être et vous aide à cultiver une fréquence intérieure en résonance avec l’amour, la tendresse et la miséricorde.']],
    ['ar/products/bouteille-amour', ['<h1>قارورة الحب</h1>', '55 د.ت', '1- برمجة اللاوعي على المودة و الرحمة و على العلاقة الجميلة بين الزوجين', 'علما ان غير المتزوجين يمكن أن يستعملوها', '2- شحن نواة الماء بطاقة القرآن الكريم و أسماء الله الحسنى و الرموز الطاقية', 'تساعدك على التشافي و على أن تكون على تردد الحب و المودة و الرحمة']]
  ];
  for (const [id, [ar]] of Object.entries(keyrings)) {
    checks.push(['products/' + id, ['<h1>' + byId(id).name + '</h1>', '30 TND', byId(id).description]]);
    checks.push(['ar/products/' + id, ['<h1>' + productsAr[id].name + '</h1>', '30 د.ت', ar]]);
  }
  for (const [file, texts] of checks) {
    const html = await page(file);
    for (const text of texts) assert.ok(html.includes(text), file + ': ' + text);
    // The gallery says its photos are staged scenes made from her photos, and keeps its arrows (three photos).
    assert.match(html, file.startsWith('ar/') ? /الصور مشاهد مُعَدّة انطلاقًا من صور رايدا\./ : /Les photos sont des mises en scène créées à partir des photos de Rayda\./, file);
    assert.doesNotMatch(html, /s-gallery-single/, file);
  }
  // Personalised pieces add that the buyer's piece can differ from the examples.
  assert.match(await page('products/collier-bazi'), /Les photos sont des mises en scène créées à partir des photos de Rayda\. Votre pièce est composée pour vous/);
  assert.match(await page('ar/products/collier-bazi'), /الصور مشاهد مُعَدّة انطلاقًا من صور رايدا\. تُركَّب قطعتكم/);
  assert.match(await page('products/accessoires-apprentissage'), /Les photos sont des mises en scène créées à partir des photos de Rayda\. Votre pièce est préparée pour vous/);
  // The Accompagnement page shows the new necklace worn, not the earlier example photo.
  for (const file of ['accompagnement', 'ar/accompagnement']) {
    const html = await page(file);
    assert.ok(html.includes('/assets/products/organized/collier-bazi-ai-porte.jpg'), file);
    assert.doesNotMatch(html, /collier-bazi-01\.jpg/, file);
  }
  // The keyring pages show the four new keyrings after the stone and Arbre de Vie keyrings, in French and in Arabic.
  for (const file of ['collections/porte-cles', 'ar/collections/porte-cles']) {
    const cards = [...(await page(file)).matchAll(/data-product-card="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(cards, ['porte-cles-pierre', 'porte-cles-arbre-vie', ...Object.keys(keyrings)], file);
  }
});
test("eight groups that show every piece, one photo of each group's pieces together, and a header whose controls read as buttons (21 November 2026)", async () => {
  const { shopGroups } = await import('../src/shop-pages.mjs');
  // Every one of the 24 pieces is in one of the eight groups the home page, the Boutique, the header panel and the menu show.
  assert.deepEqual(shopGroups.map((g) => g.slug), ['bracelets', 'colliers', 'porte-cles', 'portefeuilles', 'objets-dores', 'bouteilles', 'voiture', 'livres']);
  const grouped = new Set(shopGroups.flatMap((g) => g.product ? [g.product] : [...catalog.collections.find((c) => c.slug === g.slug).productIds]));
  assert.deepEqual([...catalog.products.filter((p) => !grouped.has(p.id)).map((p) => p.id)], []);
  assert.deepEqual([...catalog.collections.find((c) => c.slug === 'bouteilles').productIds], ['bouteille-verre', 'bouteille-amour']);
  assert.deepEqual([...catalog.collections.find((c) => c.slug === 'portefeuilles').productIds], ['portefeuille-hafidha', 'carte-million-dollar']);
  assert.ok(!catalog.collections.find((c) => c.slug === 'objets-dores').productIds.includes('carte-million-dollar'));
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  const page = (file) => readFile(path.join(root, 'dist', file, 'index.html'), 'utf8');
  // Each card names its group and says what is inside; the photos are labelled as scenes made from Rayda's photos.
  const home = await page('');
  for (const g of shopGroups) assert.ok(home.includes(`<h3>${g.name}</h3><p>${g.inside}</p>`), g.slug);
  assert.match(home, /Les photos sont des mises en scène créées à partir des photos de Rayda\./);
  const homeAr = await page('ar');
  for (const g of shopGroups) assert.ok(homeAr.includes(`<h3>${g.nameAr}</h3><p>${g.insideAr}</p>`), g.slug);
  assert.match(homeAr, /الصور مشاهد مُعَدّة انطلاقًا من صور رايدا\./);
  // The same header on every kind of page: each control has a visible word, Boutique opens the eight groups with
  // their photos, and the phone menu starts with the same eight groups.
  const fr = ['Réseaux', 'Boutique', 'Panier', 'Menu'];
  const ar = ['تابعونا', 'المتجر', 'سلتي', 'القائمة'];
  for (const [file, words] of [['', fr], ['collections/all', fr], ['collections/bouteilles', fr], ['products/carte-million-dollar', fr], ['checkout', fr], ['parcours/etudes', fr], ['ar', ar], ['ar/boutique', ar], ['ar/products/bouteille-amour', ar], ['ar/checkout', ar]]) {
    const html = await page(file);
    const header = html.match(/<header class="g-header">([\s\S]*?)<\/header>/)[1];
    for (const word of words) assert.ok(header.includes(`<span class="g-control-word">${word}</span>`) || header.includes(`<b class="g-control-word">${word}</b>`), file + ' ' + word);
    assert.ok(header.includes('<button class="g-shop-toggle" type="button" data-shop-toggle aria-expanded="false" aria-controls="g-shop-panel">'), file);
    assert.match(header, /<nav class="g-shop-panel" id="g-shop-panel" aria-label="[^"]+" data-shop-panel hidden>/, file);
    const tiles = [...header.matchAll(/<a class="g-shop-group" href="([^"]+)"><span class="g-shop-group-photo"><img src="([^"]+)"/g)];
    assert.deepEqual(tiles.map((m) => m[1]), shopGroups.map((g) => (file.startsWith('ar') ? '/ar' : '') + (g.product ? '/products/' + g.product + '/' : '/collections/' + g.slug + '/')), file);
    for (const [, , src] of tiles) await access(path.join(root, 'dist', src));
    assert.ok(header.includes(file.startsWith('ar') ? '<a class="g-shop-panel-all" href="/ar/boutique/">' : '<a class="g-shop-panel-all" href="/collections/all/">'), file);
    const menu = html.match(/<dialog class="g-menu"[\s\S]*?<\/dialog>/)[0];
    assert.equal((menu.match(/<a href="[^"]+"><img src="\/assets\/categories\/240\/groupe-/g) || []).length, 8, file);
    assert.ok(html.includes('<link rel="stylesheet" href="/header.css" />') && html.includes('<script defer src="/src/header.js"></script>'), file);
  }
  await access(path.join(root, 'dist/header.css'));
  await access(path.join(root, 'dist/src/header.js'));
});

test("coaching: slots come from Rayda's hours, a slot is held during payment and booked only once paid (24 November 2026)", async () => {
  const C = await import('../src/coaching-core.js');
  const now = Date.UTC(2026, 10, 30, 8, 0); // Monday 30 November 2026, 09:00 in Tunis
  const s = Object.assign({}, C.DEFAULT_COACHING, { exceptions: [{ date: '2026-12-02', closed: true }] });
  assert.deepEqual(C.tunisNow(now), { date: '2026-11-30', minutes: 540 });
  // Tuesday: 10:00-12:30 and 15:00-18:00, one-hour sessions every 30 minutes; today is too close (24 hours' notice).
  assert.deepEqual(C.daySlots(s, [], '2026-12-01', 60, now).map((x) => x.start), ['10:00', '10:30', '11:00', '11:30', '15:00', '15:30', '16:00', '16:30', '17:00']);
  assert.equal(C.daysOverview(s, [], 30, now)[0].status, 'soon');
  assert.equal(C.daysOverview(s, [], 30, now).find((d) => d.date === '2026-12-02').status, 'closed');
  assert.equal(C.daysOverview(s, [], 30, now).find((d) => d.date === '2026-12-06').status, 'closed'); // Sunday
  // Holding 10:30-11:30 blocks the 30-minute slots it covers, for everyone, until the hold lapses.
  const held = C.createHold(s, [], { minutes: 60, date: '2026-12-01', start: '10:30', client: { name: 'A' } }, now, 'b1');
  assert.ok(held.ok);
  assert.equal(held.booking.status, 'pending');
  assert.equal(held.booking.holdUntil, now + 15 * 60000);
  const taken = (bookings, at) => C.daySlots(s, bookings, '2026-12-01', 30, at).filter((x) => x.status === 'taken').map((x) => x.start);
  assert.deepEqual(taken(held.bookings, now), ['10:30', '11:00']);
  assert.deepEqual(C.createHold(s, held.bookings, { minutes: 30, date: '2026-12-01', start: '11:00' }, now, 'b2'), { ok: false, reason: 'taken' });
  assert.deepEqual(taken(held.bookings, now + 16 * 60000), [], 'an unpaid hold lapses on its own');
  // Paid: booked for good, and a second payment report changes nothing.
  const paid = C.confirmBooking(s, held.bookings, 'b1', { provider: 'demo' }, now + 5 * 60000);
  assert.ok(paid.ok);
  assert.equal(C.bookingState(paid.booking, now + 1e9), 'confirmed');
  assert.deepEqual(taken(paid.bookings, now + 30 * 60000), ['10:30', '11:00'], 'still taken after the hold would have lapsed');
  assert.ok(C.confirmBooking(s, paid.bookings, 'b1', {}, now).ok);
  // A late payment books the slot only if nobody took it meanwhile.
  const lapsed = C.createHold(s, [], { minutes: 30, date: '2026-12-01', start: '10:00' }, now, 'late');
  const other = C.createHold(s, lapsed.bookings, { minutes: 30, date: '2026-12-01', start: '10:00' }, now + 20 * 60000, 'other');
  assert.ok(other.ok);
  assert.deepEqual(C.confirmBooking(s, other.bookings, 'late', {}, now + 21 * 60000), { ok: false, reason: 'conflict' });
  // Rayda cancels: the slot is free again. A pause between sessions widens what a booking blocks.
  assert.deepEqual(taken(C.cancelBooking(paid.bookings, 'b1', 'rayda', now).bookings, now), []);
  const paused = Object.assign({}, s, { bufferMinutes: 30 });
  assert.deepEqual(C.daySlots(paused, paid.bookings, '2026-12-01', 30, now).filter((x) => x.status === 'taken').map((x) => x.start), ['10:00', '10:30', '11:00', '11:30']);
  // A session Rayda switched off cannot be held, nor can a slot outside her hours.
  const offline = Object.assign({}, s, { sessions: [{ minutes: 30, price: 80, enabled: true }, { minutes: 60, price: 140, enabled: false }] });
  assert.equal(C.createHold(offline, [], { minutes: 60, date: '2026-12-01', start: '10:00' }, now, 'x').reason, 'session');
  assert.equal(C.createHold(s, [], { minutes: 30, date: '2026-12-01', start: '13:00' }, now, 'x').reason, 'closed');
  assert.equal(C.createHold(offline, [], { minutes: 30, date: '2026-12-01', start: '10:00' }, now, 'x').booking.price, 80);
  assert.match(C.icsFor(paid.booking, 'Séance', ''), /DTSTART:20261201T093000Z\r\nDTEND:20261201T103000Z/);
});

test("coaching and Formations pages in both languages, linked from every page, with the logic's words and no promises (24 November 2026)", async () => {
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  assert.equal(configContext.window.STORE_CONFIG.coaching.mode, 'preview');
  const page = (file) => readFile(path.join(root, 'dist', file, 'index.html'), 'utf8');
  for (const [prefix, coaching, formations] of [['', 'Coaching', 'Formations'], ['ar/', 'الكوتشينغ', 'الدورات']]) {
    for (const file of ['', 'contact', 'products/cle-de-vie', 'coaching', 'formations']) {
      const html = await page(prefix + file);
      assert.ok(html.includes(`<a href="/${prefix}coaching/">${coaching}</a><a href="/${prefix}formations/">${formations}</a>`), prefix + file);
    }
    const book = await page(prefix + 'coaching');
    assert.match(book, /data-coaching="book"/);
    // One question at a time (24 November 2026, night): five steps, only the first showing, a button to go on from
    // each of the first four, a way back from the last four, a dot per step, and one submit at the end.
    assert.equal((book.match(/<section class="c-panel" data-panel="[1-5]"/g) || []).length, 5);
    assert.equal((book.match(/data-panel="[2-5]" hidden/g) || []).length, 4);
    assert.equal((book.match(/ data-next>/g) || []).length, 4);
    assert.equal((book.match(/ data-back>/g) || []).length, 4);
    assert.equal((book.match(/<li data-dot="[1-5]"/g) || []).length, 5);
    assert.equal((book.match(/type="submit"/g) || []).length, 1);
    assert.equal((book.match(/<input type="radio" name="minutes" value="(30|60)"/g) || []).length, 2);
    for (const field of ['name="name"', 'name="phone" type="tel"', 'name="email" type="email"']) assert.match(book, new RegExp(field + '[^>]*required'), field);
    assert.match(book, /data-coaching-preview hidden/);
    assert.match(book, /<script type="module" src="\/src\/coaching\.js"><\/script>/);
    assert.match(await page(prefix + 'coaching/paiement'), /data-coaching="pay"/);
    assert.match(await page(prefix + 'coaching/confirmation'), /data-coaching="done"/);
    const courses = await page(prefix + 'formations');
    assert.equal((courses.match(/class="c-course"/g) || []).length, 4);
    assert.match(courses, /<button class="c-player-play" type="button" disabled/);
    assert.match(courses, /https:\/\/wa\.me\/\d+\?text=/);
    assert.match(await page(prefix.replace(/\/$/, '')), /<section class="c-offers">/);
    assert.match(await page(prefix + 'accompagnement'), /<section class="c-banner">/);
  }
  const fr = await page('coaching');
  assert.ok(fr.includes('Il n’est réservé qu’une fois le paiement confirmé.'));
  assert.ok(fr.includes('ne garantit aucun résultat particulier'));
  assert.ok((await page('formations')).includes('elles ne garantissent aucun résultat, financier ou autre.'));
  assert.ok((await page('ar/formations')).includes('ولا تضمن أي نتيجة، مالية أو غيرها.'));
  for (const file of ['coaching', 'ar/coaching', 'formations', 'ar/formations']) assert.doesNotMatch(await page(file), /Rayda vous appelle|Rayda vous recontacte|تتصل بكم رايد|رايدة/, file);
  const js = await readFile(path.join(root, 'src/coaching.js'), 'utf8');
  assert.ok(js.includes('Nous vous contactons avant la séance') && js.includes('يقع الاتصال بكم قبل الجلسة'));
  for (const file of ['coaching.css', 'src/coaching.js', 'src/coaching-core.js', 'src/coaching-store.js', 'src/admin-coaching.js', 'src/courses-data.js']) await access(path.join(root, 'dist', file));
  // The admin: Rayda's hours, days off, prices, rules, bookings and the e-mails Resend will send; and her courses.
  const admin = await readFile(path.join(root, 'dist/admin/coaching/index.html'), 'utf8');
  for (const hook of ['data-week', 'data-bookings-table', 'data-weekly-form', 'data-exception-form', 'data-sessions-form', 'data-rules-form', 'data-outbox-table']) assert.ok(admin.includes(hook), hook);
  assert.match(admin, /<script type="module" src="\/src\/admin-coaching\.js"><\/script>/);
  assert.match(await readFile(path.join(root, 'dist/admin/formations/index.html'), 'utf8'), /data-add-course-form/);
  assert.match(await readFile(path.join(root, 'dist/admin/index.html'), 'utf8'), /href="\/admin\/coaching\/"/);
});

test("the leaf moves: the same drawing taken apart, a curtain between pages, loaders and blooms, and reduced motion respected (24 November 2026)", async () => {
  const { leafArt } = await import('../src/leaf-art.mjs');
  const { leaf } = await import('../src/guidance-pages.mjs');
  const art = leafArt(leaf);
  const shapes = (svg) => [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).sort();
  assert.deepEqual(shapes(art), shapes(leaf), 'every shape of the locked drawing, unchanged');
  assert.equal((art.match(/class="lf-leaf"/g) || []).length, 10);
  assert.match(art, /class="lf-stem"[^>]*pathLength="1"/);
  const css = await readFile(path.join(root, 'leaf.css'), 'utf8');
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.doesNotMatch(css.replace(/\/\*[\s\S]*?\*\//g, ''), /font-family|font\s*:/);
  const js = await readFile(path.join(root, 'src/leaf.js'), 'utf8');
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /pageshow/);
  if (configContext.window.STORE_CONFIG.siteMode !== 'guidance') return;
  for (const file of ['dist/index.html', 'dist/ar/index.html', 'dist/coaching/index.html', 'dist/ar/formations/index.html', 'dist/checkout/index.html', 'dist/products/bracelet-bazi/index.html']) {
    const html = await readFile(path.join(root, file), 'utf8');
    assert.ok(html.includes('<div class="lf-curtain" aria-hidden="true"><svg class="lf-art"'), file);
    assert.ok(html.indexOf("sessionStorage.getItem('lf-nav')") < html.indexOf('<body'), file + ': the curtain is decided before the page paints');
    assert.ok(html.includes('<link rel="stylesheet" href="/leaf.css" />') && html.includes('<script defer src="/src/leaf.js"></script>'), file);
  }
  const commerce = await readFile(path.join(root, 'src/commerce.js'), 'utf8');
  assert.match(commerce, /IssolatejLeaf\.go\(checkout/);
  assert.match(commerce, /IssolatejLeaf\?\.bloom\(result\)/);
});
