// Shared by the static renderer and browser. No customer information is stored here.
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
export const money = value => new Intl.NumberFormat('fr-TN', { maximumFractionDigits: 0 }).format(value) + ' TND';
// Delivery in Tunisia costs 7 TND, as Rayda set it: added to every order and shown wherever delivery is mentioned.
export const DELIVERY_FEE = 7;
export const deliveryLabel = money(DELIVERY_FEE);
// Every product photo has a lighter 480px copy (scripts/make-product-thumbnails.ps1) used by cards,
// gallery thumbnails and the cart; the full photo stays for the main product image and the zoom view.
export const thumbSrc = src => String(src).replace('/assets/products/organized/', '/assets/products/organized/480/');
export function priceBounds(product, variant = '') {
  if (product.variantPrices && Object.hasOwn(product.variantPrices, variant)) {
    const value = product.variantPrices[variant];
    return value == null ? null : { min: value, max: value };
  }
  return product.price;
}
export function priceLabel(product, variant = '') {
  const price = priceBounds(product, variant);
  return !price ? 'Tarif à confirmer' : price.min === price.max ? money(price.min) : money(price.min) + ' – ' + money(price.max);
}
const moneyAr = value => new Intl.NumberFormat('ar-TN', { maximumFractionDigits: 0 }).format(value) + ' د.ت';
export const deliveryLabelAr = moneyAr(DELIVERY_FEE);
export function priceLabelAr(product, variant = '') {
  const price = priceBounds(product, variant);
  return !price ? 'السعر يُؤكَّد لاحقًا' : price.min === price.max ? moneyAr(price.min) : moneyAr(price.min) + ' – ' + moneyAr(price.max);
}
function sumSelection(items, products) {
  let min = 0, max = 0, unknown = false;
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;
    const price = priceBounds(product, item.variant);
    if (!price) { unknown = true; continue; }
    min += price.min * item.quantity; max += price.max * item.quantity;
  }
  return { min, max, unknown };
}
export function selectionTotal(items, products) {
  const { min, max, unknown } = sumSelection(items, products);
  if (unknown) return min ? money(min) + ' + tarifs à confirmer' : 'Tarifs à confirmer';
  return min === max ? money(min) : money(min) + ' – ' + money(max);
}
export function selectionTotalAr(items, products) {
  const { min, max, unknown } = sumSelection(items, products);
  if (unknown) return min ? moneyAr(min) + ' + أسعار تُؤكَّد لاحقًا' : 'الأسعار تُؤكَّد لاحقًا';
  return min === max ? moneyAr(min) : moneyAr(min) + ' – ' + moneyAr(max);
}
// What the customer pays on delivery: the pieces plus the delivery fee.
export function selectionTotalWithDelivery(items, products, fee = DELIVERY_FEE) {
  const { min, max, unknown } = sumSelection(items, products);
  const low = min + fee, high = max + fee;
  const range = low === high ? money(low) : money(low) + ' – ' + money(high);
  return unknown ? range + ' + tarifs à confirmer' : range;
}
export function selectionTotalWithDeliveryAr(items, products, fee = DELIVERY_FEE) {
  const { min, max, unknown } = sumSelection(items, products);
  const low = min + fee, high = max + fee;
  const range = low === high ? moneyAr(low) : moneyAr(low) + ' – ' + moneyAr(high);
  return unknown ? range + ' + أسعار تُؤكَّد لاحقًا' : range;
}
export function normalizeSelection(value, products) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 100).flatMap(item => {
    if (!item || typeof item !== 'object') return [];
    const p = products.find(product => product.id === item.productId);
    if (!p) return [];
    const variant = p.options?.variant?.includes(item.variant) ? item.variant : p.options?.variant?.[0] || '';
    const palette = p.options?.palettes?.includes(item.palette) ? item.palette : '';
    return [{ productId: p.id, quantity: Math.min(20, Math.max(1, Math.floor(Number(item.quantity) || 1))), variant, palette }];
  });
}
export function filterProducts(products, { search = '', mode = 'all', sort = 'featured', extraText = () => '' } = {}) {
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const query = normalize(search.trim());
  const list = products.filter(p => (mode === 'all' || (mode === 'custom' ? p.custom : !p.custom)) && normalize(p.name + ' ' + p.eyebrow + ' ' + p.description + ' ' + extraText(p)).includes(query));
  if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name, 'fr'));
  if (sort === 'price-asc' || sort === 'price-desc') list.sort((a,b) => {
    if (!a.price) return b.price ? 1 : 0;
    if (!b.price) return -1;
    return sort === 'price-asc' ? a.price.min - b.price.min : b.price.min - a.price.min;
  });
  return list;
}
