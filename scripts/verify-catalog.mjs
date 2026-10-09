import { readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const context = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "src/catalog.js"), "utf8"), context);
const catalog = context.window.STORE_CATALOG;
const demoContext = { window: {} };
vm.runInNewContext(await readFile(path.join(root, "src/demo-catalog.js"), "utf8"), demoContext);
const demoCatalog = demoContext.window.STORE_DEMO_CATALOG;
const errors = [];
const ids = new Set(catalog.products.map((x) => x.id));
const slugs = new Set(catalog.products.map((x) => x.slug));
if (ids.size !== catalog.products.length) errors.push("Product IDs are not unique.");
if (slugs.size !== catalog.products.length) errors.push("Product slugs are not unique.");
for (const collection of catalog.collections) {
  for (const id of collection.productIds) if (!ids.has(id)) errors.push(collection.slug + " references missing product " + id + ".");
}
for (const product of catalog.products) {
  if (!/^[a-z0-9-]+$/.test(product.slug)) errors.push("Invalid slug: " + product.slug);
  if (!product.images.length) errors.push(product.id + " has no images.");
  if (!product.price && !product.priceNote.toLowerCase().includes("non communiqué")) errors.push(product.id + " needs a missing-price note.");
  for (const image of product.images) {
    const file = path.join(root, image.src.replace(/^\//, ""));
    try { await access(file); } catch { errors.push("Missing product image: " + image.src); }
  }
}
const demoIds = new Set(demoCatalog.products.map((x) => x.id));
const demoSlugs = new Set(demoCatalog.products.map((x) => x.slug));
if (demoIds.size !== demoCatalog.products.length) errors.push("Preview product IDs are not unique.");
if (demoSlugs.size !== demoCatalog.products.length) errors.push("Preview product slugs are not unique.");
for (const collection of demoCatalog.collections) {
  for (const id of collection.productIds) if (!demoIds.has(id)) errors.push("Preview collection " + collection.slug + " references missing item " + id + ".");
}
for (const product of demoCatalog.products) {
  for (const image of product.images) {
    const file = path.join(root, image.src.replace(/^\//, ""));
    try { await access(file); } catch { errors.push("Missing preview image: " + image.src); }
  }
}
for (const file of ["index.html", "storefront.css", "src/app.js", "src/site-config.js", "src/catalog.js", "src/demo-catalog.js"]) {
  const body = await readFile(path.join(root, file), "utf8");
  if (/moonrise\s*crystals/i.test(body)) errors.push("External brand name found in " + file + ".");
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("Catalog checks passed: " + catalog.products.length + " preserved products and " + catalog.collections.length + " collections; " + catalog.products.reduce((sum, product) => sum + product.images.length, 0) + " product photos available.");
