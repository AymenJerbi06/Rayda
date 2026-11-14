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
test("catalog has twelve unique products in eight browseable collections", () => {
  assert.equal(catalog.products.length, 12);
  assert.equal(new Set(catalog.products.map((x) => x.slug)).size, 12);
  assert.equal(catalog.collections.length, 8);
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
  // 11 lifestyle scenes (one leading each of 11 products), 50 ChatGPT photos made from Rayda's photos for 10 of them,
  // and Rayda's own 3 photos of the two pieces without AI photos (the Arbre de Vie keyring and the Fleur de Vie pendant).
  assert.equal(catalog.products.reduce((count, product) => count + product.images.length, 0), 62);
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
    ...catalog.collections.filter(c=>c.slug!=='all').map(c=>'ar/collections/'+c.slug), ...catalog.products.map(p=>'ar/products/'+p.slug)];
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


test("the opening hero and its animation hooks are preserved exactly", async () => {
  const previous = await readFile(path.join(root,'backups/issolatej-before-products-2026-10-08/guidance-pages.mjs'),'utf8');
  const current = await readFile(path.join(root,'src/guidance-pages.mjs'),'utf8');
  const hero = text => text.match(/const home = `(<section class="g-hero">[\s\S]*?<\/section>)/)[1];
  assert.equal(hero(current),hero(previous));
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
  // Hero, products, approach intro, pillars, Rayda's bio, shifts/benefits, testimonial teaser.
  assert.equal((main.match(/<section /g)||[]).length,7);
  assert.equal((main.match(/class="s-category"/g)||[]).length,6);
  assert.doesNotMatch(main,/assets\/products\//);
  for (const name of ['bracelets','colliers','porte-cles','portefeuilles','objets-dores','voiture']) {
    assert.ok(home.includes('/assets/categories/'+name+'.webp'));
    await access(path.join(root,'dist/assets/categories',name+'.webp'));
  }
  const shop = await readFile(path.join(root,'dist/collections/all/index.html'),'utf8');
  assert.match(shop,/Tout découvrir/);
  assert.match(shop,/Créé pour vous/);
  assert.match(shop,/À choisir/);
  assert.match(shop,/assets\/products\/organized/);
  // The Boutique page leads with the same type-first category grid as the homepage, by design.
  assert.equal((shop.match(/class="s-category"/g)||[]).length,6);
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
  assert.equal(filterProducts(catalog.products,{mode:'custom'}).length,3);
  assert.equal(filterProducts(catalog.products,{mode:'ready'}).length,9);
  assert.equal(filterProducts(catalog.products,{search:'energie amour'}).length,1);
  assert.equal(filterProducts(catalog.products,{search:'no-such-piece'}).length,0);
  const sorted=filterProducts(catalog.products,{sort:'price-asc'});
  assert.equal(sorted[0].id,'carte-million-dollar');
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
  const { reviews } = await import('../src/reviews.mjs');
  assert.equal(reviews.length, 5);
  const page = await readFile(path.join(root, 'dist/vos-mots/index.html'), 'utf8');
  assert.equal((page.match(/<blockquote lang="ar" dir="rtl">/g) || []).length, 5);
  assert.equal((page.match(/class="g-translation"/g) || []).length, 5);
  assert.match(page, /Traduit de l’arabe/);
  assert.match(page, /family=Markazi\+Text/);
  const ar = await readFile(path.join(root, 'dist/ar/vos-mots/index.html'), 'utf8');
  assert.ok(ar.includes('ربي يباركلك مدام رايدة حبيتي'));
  assert.doesNotMatch(ar, /g-translation/);
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
      assert.match(html, /<div class="s-story" id="description">/);
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
  assert.equal(ai.length, 10);
  for (const p of ai) {
    assert.ok(p.images[0].src.endsWith('-ugc.jpg'), p.id + ' keeps its lifestyle photo first');
    assert.equal(p.coverImageIndex, 0);
    for (const image of p.images.slice(1)) {
      assert.match(image.src, new RegExp('/' + p.id + '-ai-[a-z-]+\\.jpg$'));
      assert.ok(image.alt.length > 10);
    }
  }
  assert.equal(ai.reduce((n, p) => n + p.images.length - 1, 0), 48);
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
  const keyring = await readFile(path.join(root, 'dist/products/porte-cles-arbre-vie/index.html'), 'utf8');
  assert.doesNotMatch(keyring, /mises en scène/);
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
