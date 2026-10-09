import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { guidanceRoutes, renderGuidancePage } from './guidance-pages.mjs';
import { collectionPage, productPage, checkoutPage } from './shop-pages.mjs';
import { arGuidanceRoutes, renderGuidancePageAr } from './guidance-pages-ar.mjs';
import { productPageAr, checkoutPageAr, collectionPageAr } from './shop-pages-ar.mjs';
import { collectionsAr, productsAr } from './catalog-ar.mjs';

export async function buildGuidance(project, output, config) {
  // output is resolved by build.mjs to this project's dist directory.
  if (path.resolve(output) !== path.join(path.resolve(project), 'dist')) throw new Error('Unexpected build directory');
  await rm(output, { recursive: true, force: true });
  await mkdir(path.join(output, 'src'), { recursive: true });
  await mkdir(path.join(output, 'assets', 'brand'), { recursive: true });
  for (const asset of ['rayda.jpg', 'reflection-journal.png', 'leaf-mark.svg']) {
    await cp(path.join(project, 'assets', 'brand', asset), path.join(output, 'assets', 'brand', asset));
  }
  for (const file of ['guidance.css', 'commerce.css']) await cp(path.join(project, file), path.join(output, file));
  for (const file of ['guidance.js', 'social-menu.js', 'commerce.js', 'commerce-core.js', 'site-config.js', 'catalog.js']) {
    await cp(path.join(project, 'src', file), path.join(output, 'src', file));
  }
  await mkdir(path.join(output, 'assets', 'products'), { recursive: true });
  await cp(path.join(project, 'assets', 'products', 'organized'), path.join(output, 'assets', 'products', 'organized'), { recursive: true });
  await mkdir(path.join(output, 'assets', 'categories'), { recursive: true });
  for (const category of ['bracelets', 'colliers', 'porte-cles', 'portefeuilles', 'objets-dores', 'voiture']) {
    await cp(path.join(project, 'assets', 'categories', category + '.webp'), path.join(output, 'assets', 'categories', category + '.webp'));
  }
  const context = { window: {} };
  vm.runInNewContext(await readFile(path.join(project, 'src', 'catalog.js'), 'utf8'), context);
  const catalog = context.window.STORE_CATALOG;
  const home = renderGuidancePage('', config, catalog);
  await writeFile(path.join(output, 'index.html'), home);
  // Keep the source entry usable for simple static servers too.
  await writeFile(path.join(project, 'index.html'), home);
  for (const route of guidanceRoutes) {
    const dir = path.join(output, route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), renderGuidancePage(route, config, catalog));
  }
  const shopRoutes = catalog.collections.map(collection => ({ route: 'collections/' + collection.slug, title: collection.name, content: collectionPage(collection, catalog) }))
    .concat(catalog.products.map(product => ({ route: 'products/' + product.slug, title: product.name, content: productPage(product, catalog) })), [{ route: 'checkout', title: 'Votre sélection, avec Rayda', content: checkoutPage }]);
  for (const entry of shopRoutes) {
    const dir = path.join(output, entry.route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), renderGuidancePage(entry.route, config, catalog, entry));
  }
  const arNamesScript = 'window.STORE_PRODUCT_NAMES_AR = ' + JSON.stringify(Object.fromEntries(catalog.products.map(p => [p.id, productsAr[p.id]?.name || p.name]))) + ';';
  await writeFile(path.join(output, 'src', 'catalog-ar-names.js'), arNamesScript);
  const arHome = renderGuidancePageAr('', config, catalog);
  await mkdir(path.join(output, 'ar'), { recursive: true });
  await writeFile(path.join(output, 'ar', 'index.html'), arHome);
  for (const route of arGuidanceRoutes) {
    const dir = path.join(output, 'ar', route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), renderGuidancePageAr(route, config, catalog));
  }
  const arShopRoutes = catalog.collections.filter(c => c.slug !== 'all').map(collection => ({ route: 'collections/' + collection.slug, title: collectionsAr[collection.slug]?.name || collection.name, content: null, kind: 'collection', data: collection }))
    .concat(catalog.products.map(product => ({ route: 'products/' + product.slug, title: productsAr[product.id]?.name || product.name, content: productPageAr(product, catalog) })), [{ route: 'checkout', title: 'اختياركنّ، مع رايدة', content: checkoutPageAr }]);
  for (const entry of arShopRoutes) {
    const dir = path.join(output, 'ar', entry.route);
    await mkdir(dir, { recursive: true });
    const content = entry.kind === 'collection' ? collectionPageAr(entry.data, catalog) : entry.content;
    await writeFile(path.join(dir, 'index.html'), renderGuidancePageAr(entry.route, config, catalog, { title: entry.title, content }));
  }
  console.log('Built ' + (1 + guidanceRoutes.length + shopRoutes.length) + ' Issolatej pages (' + (1 + arGuidanceRoutes.length + arShopRoutes.length) + ' in Arabic): Rayda, vos mots, 12 products, 8 collections and a WhatsApp selection flow.');
}
