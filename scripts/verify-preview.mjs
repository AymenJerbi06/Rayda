import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const context = { window: {} };
vm.runInNewContext(await readFile(new URL('src/catalog.js', root), 'utf8'), context);
const catalog = context.window.STORE_CATALOG;
const pages = ['/', '/a-propos/', '/accompagnement/', '/contact/', '/checkout/',
  ...catalog.collections.map(c => '/collections/' + c.slug + '/'),
  ...catalog.products.map(p => '/products/' + p.slug + '/')];
const images = [...new Set(catalog.products.flatMap(p => p.images.map(i => i.src))),
  ...(await readdir(new URL('dist/assets/categories/', root))).map(n => '/assets/categories/' + n)];
for (const [label, urls] of [['pages', pages], ['images', images]]) {
  for (const url of urls) {
    const response = await fetch('http://127.0.0.1:4174' + url);
    await response.arrayBuffer();
    if (!response.ok) throw new Error(url + ': ' + response.status);
  }
  console.log('HTTP 200: ' + urls.length + ' ' + label);
}
const script = await fetch('http://127.0.0.1:4174/src/commerce-core.js');
if (!/javascript/.test(script.headers.get('content-type') || '')) throw new Error('Incorrect JavaScript MIME type');
console.log('Browser module MIME is JavaScript.');
