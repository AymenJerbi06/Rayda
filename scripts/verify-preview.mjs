import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const context = { window: {} };
vm.runInNewContext(await readFile(new URL('src/catalog.js', root), 'utf8'), context);
const catalog = context.window.STORE_CATALOG;
const pages = ['/', '/ar/', '/home.css', '/src/home.js', '/a-propos/', '/accompagnement/', '/contact/', '/checkout/',
  '/coaching/', '/coaching/paiement/', '/coaching/confirmation/', '/formations/', '/ar/coaching/', '/ar/formations/', '/admin/coaching/', '/admin/formations/',
  ...catalog.collections.map(c => '/collections/' + c.slug + '/'),
  ...catalog.products.map(p => '/products/' + p.slug + '/')];
const images = [...new Set(catalog.products.flatMap(p => p.images.map(i => i.src))),
  ...(await readdir(new URL('dist/assets/categories/', root), { withFileTypes: true })).filter(d => d.isFile()).map(d => '/assets/categories/' + d.name),
  ...(await readdir(new URL('dist/assets/categories/240/', root))).map(n => '/assets/categories/240/' + n),
  ...(await readdir(new URL('dist/assets/avis/', root))).map(n => '/assets/avis/' + n)];
for (const [label, urls] of [['pages', pages], ['images', images]]) {
  for (const url of urls) {
    const response = await fetch('http://127.0.0.1:4174' + url);
    await response.arrayBuffer();
    if (!response.ok) throw new Error(url + ': ' + response.status);
  }
  console.log('HTTP 200: ' + urls.length + ' ' + label);
}
for (const module of ['commerce-core.js', 'coaching.js', 'coaching-core.js', 'coaching-store.js', 'admin-coaching.js']) {
  const script = await fetch('http://127.0.0.1:4174/src/' + module);
  if (!script.ok || !/javascript/.test(script.headers.get('content-type') || '')) throw new Error('Incorrect JavaScript MIME type for ' + module);
}
console.log('Browser module MIME is JavaScript.');
