import { access, cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { thumbSrc } from './commerce-core.js';
import { guidanceRoutes, renderGuidancePage, leaf } from './guidance-pages.mjs';
import { coachingBookPage, coachingPayPage, coachingDonePage, formationsPage, coachingTitles } from './coaching-pages.mjs';
import { leafArt } from './leaf-art.mjs';
import { courses } from './courses.mjs';
import { collectionPage, productPage, checkoutPage, pathPage, shopGroups } from './shop-pages.mjs';
import { arGuidanceRoutes, renderGuidancePageAr } from './guidance-pages-ar.mjs';
import { productPageAr, checkoutPageAr, collectionPageAr, pathPageAr } from './shop-pages-ar.mjs';
import { collectionsAr, productsAr, pathsAr } from './catalog-ar.mjs';
import { adminLoginPage, adminDashboardPage, adminProductsPage, adminPromoCodesPage, adminOrdersPage, adminSettingsPage, adminCoachingPage, adminCoursesPage } from './admin-pages.mjs';

// French typography: a non-breaking space keeps ?, !, :, ; and » with the word before them (and « with
// the word after it), so they never start a line on their own. Only text between tags is touched.
const frenchSpacing = html => html.replace(/>([^<]+)</g, (match, text) => '>' + text.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ') + '<');

export async function buildGuidance(project, output, config) {
  // output is resolved by build.mjs to this project's dist directory.
  if (path.resolve(output) !== path.join(path.resolve(project), 'dist')) throw new Error('Unexpected build directory');
  // Cards, gallery thumbnails and the cart use the 480px photo copies; stop before touching dist if one is missing.
  const catalogCheck = { window: {} };
  vm.runInNewContext(await readFile(path.join(project, 'src', 'catalog.js'), 'utf8'), catalogCheck);
  const missingCopies = [];
  for (const product of catalogCheck.window.STORE_CATALOG.products) for (const image of product.images) {
    try { await access(path.join(project, thumbSrc(image.src).replace(/^\//, ''))); } catch { missingCopies.push(image.src); }
  }
  if (missingCopies.length) throw new Error('Missing 480px photo copies for ' + missingCopies.join(', ') + '. Run scripts/make-product-thumbnails.ps1, then build again.');
  await rm(output, { recursive: true, force: true });
  await mkdir(path.join(output, 'src'), { recursive: true });
  await mkdir(path.join(output, 'assets', 'brand'), { recursive: true });
  for (const asset of ['rayda.jpg', 'reflection-journal.png', 'leaf-mark.svg']) {
    await cp(path.join(project, 'assets', 'brand', asset), path.join(output, 'assets', 'brand', asset));
  }
  for (const file of ['guidance.css', 'commerce.css', 'polish.css', 'layers.css', 'emphasis.css', 'motion.css', 'header.css', 'leaf.css', 'coaching.css']) await cp(path.join(project, file), path.join(output, file));
  await cp(path.join(project, 'src', 'admin.css'), path.join(output, 'admin.css'));
  for (const file of ['guidance.js', 'social-menu.js', 'leaf.js', 'coaching.js', 'coaching-core.js', 'coaching-store.js', 'admin-coaching.js', 'ux.js', 'motion.js', 'header.js', 'contact-ar.js', 'commerce.js', 'commerce-core.js', 'site-config.js', 'catalog.js', 'admin.js']) {
    await cp(path.join(project, 'src', file), path.join(output, 'src', file));
  }
  await mkdir(path.join(output, 'assets', 'products'), { recursive: true });
  await cp(path.join(project, 'assets', 'products', 'organized'), path.join(output, 'assets', 'products', 'organized'), { recursive: true });
  // The family photo of each shop group, and its 240px copy for the header's Boutique panel and the phone menu.
  await mkdir(path.join(output, 'assets', 'categories', '240'), { recursive: true });
  for (const group of shopGroups) {
    for (const folder of ['', '240']) {
      await cp(path.join(project, 'assets', 'categories', folder, 'groupe-' + group.slug + '.webp'), path.join(output, 'assets', 'categories', folder, 'groupe-' + group.slug + '.webp'));
    }
  }
  // The screenshot behind each review (profile pictures blurred), opened from the button under the review.
  await cp(path.join(project, 'assets', 'avis'), path.join(output, 'assets', 'avis'), { recursive: true });
  const context = { window: {} };
  vm.runInNewContext(await readFile(path.join(project, 'src', 'catalog.js'), 'utf8'), context);
  const catalog = context.window.STORE_CATALOG;
  const home = frenchSpacing(renderGuidancePage('', config, catalog));
  await writeFile(path.join(output, 'index.html'), home);
  // Keep the source entry usable for simple static servers too.
  await writeFile(path.join(project, 'index.html'), home);
  for (const route of guidanceRoutes) {
    const dir = path.join(output, route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), frenchSpacing(renderGuidancePage(route, config, catalog)));
  }
  // Coaching (agenda, payment step, confirmation) and Formations, in both languages.
  const whatsapp = 'https://wa.me/' + config.contact.phone.replace(/\D/g, '');
  const art = className => leafArt(leaf, className);
  const coachingRoutes = lang => [
    { route: 'coaching', title: coachingTitles[lang].book, content: coachingBookPage(lang, whatsapp) },
    { route: 'coaching/paiement', title: coachingTitles[lang].pay, content: coachingPayPage(lang) },
    { route: 'coaching/confirmation', title: coachingTitles[lang].done, content: coachingDonePage(lang) },
    { route: 'formations', title: coachingTitles[lang].formations, content: formationsPage(lang, whatsapp, art) }
  ];
  // The admin's Formations page starts from the same list as the public page.
  await writeFile(path.join(output, 'src', 'courses-data.js'), 'window.ISSOLATEJ_COURSES = ' + JSON.stringify(courses) + ';');
  const shopRoutes = catalog.collections.map(collection => ({ route: 'collections/' + collection.slug, title: collection.name, content: collectionPage(collection, catalog) }))
    .concat(catalog.products.map(product => ({ route: 'products/' + product.slug, title: product.name, content: productPage(product, catalog) })), [{ route: 'checkout', title: 'Votre sélection, avec Rayda', content: checkoutPage }])
    .concat((catalog.paths || []).map(path => ({ route: 'parcours/' + path.slug, title: path.name, content: pathPage(path, catalog) })), coachingRoutes('fr'));
  for (const entry of shopRoutes) {
    const dir = path.join(output, entry.route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), frenchSpacing(renderGuidancePage(entry.route, config, catalog, entry)));
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
    .concat(catalog.products.map(product => ({ route: 'products/' + product.slug, title: productsAr[product.id]?.name || product.name, content: productPageAr(product, catalog) })), [{ route: 'checkout', title: 'اختياركم، مع رايدا', content: checkoutPageAr }])
    .concat((catalog.paths || []).map(path => ({ route: 'parcours/' + path.slug, title: pathsAr[path.slug]?.name || path.name, content: pathPageAr(path, catalog) })), coachingRoutes('ar'));
  for (const entry of arShopRoutes) {
    const dir = path.join(output, 'ar', entry.route);
    await mkdir(dir, { recursive: true });
    const content = entry.kind === 'collection' ? collectionPageAr(entry.data, catalog) : entry.content;
    await writeFile(path.join(dir, 'index.html'), renderGuidancePageAr(entry.route, config, catalog, { title: entry.title, content }));
  }
  const adminRoutes = [['login', adminLoginPage], ['', adminDashboardPage], ['products', adminProductsPage], ['promo-codes', adminPromoCodesPage], ['orders', adminOrdersPage], ['coaching', adminCoachingPage], ['formations', adminCoursesPage], ['settings', adminSettingsPage]];
  for (const [route, render] of adminRoutes) {
    const dir = path.join(output, 'admin', route);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), render());
  }
  console.log('Built ' + (1 + guidanceRoutes.length + shopRoutes.length) + ' Issolatej pages (' + (1 + arGuidanceRoutes.length + arShopRoutes.length) + ' in Arabic) and a ' + adminRoutes.length + '-page admin demo: Rayda, vos mots, ' + catalog.products.length + ' products, ' + catalog.collections.length + ' collections and a buy-now checkout flow.');
}
