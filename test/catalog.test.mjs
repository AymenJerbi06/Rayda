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
  assert.equal(wallet.price, null);
  assert.match(wallet.priceNote, /Prix non communiqué/);
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
  assert.equal(catalog.products.reduce((count, product) => count + product.images.length, 0), 44);
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
  assert.equal(selectionTotal([{productId:'carte-million-dollar',variant:'Grande · 19 × 6 cm',quantity:2},{productId:'portefeuille-hafidha',quantity:1}],catalog.products),'100 TND + tarifs à confirmer');
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
