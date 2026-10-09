// Shared by the static renderer and browser. No customer information is stored here.
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
export const money = value => new Intl.NumberFormat('fr-TN', { maximumFractionDigits: 0 }).format(value) + ' TND';
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
export function priceLabelAr(product, variant = '') {
  const price = priceBounds(product, variant);
  return !price ? 'السعر يُؤكَّد لاحقًا' : price.min === price.max ? moneyAr(price.min) : moneyAr(price.min) + ' – ' + moneyAr(price.max);
}
export function selectionTotal(items, products) {
  let min = 0, max = 0, unknown = false;
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;
    const price = priceBounds(product, item.variant);
    if (!price) { unknown = true; continue; }
    min += price.min * item.quantity; max += price.max * item.quantity;
  }
  if (unknown) return min ? money(min) + ' + tarifs à confirmer' : 'Tarifs à confirmer';
  return min === max ? money(min) : money(min) + ' – ' + money(max);
}
export function selectionTotalAr(items, products) {
  let min = 0, max = 0, unknown = false;
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) continue;
    const price = priceBounds(product, item.variant);
    if (!price) { unknown = true; continue; }
    min += price.min * item.quantity; max += price.max * item.quantity;
  }
  if (unknown) return min ? moneyAr(min) + ' + أسعار تُؤكَّد لاحقًا' : 'الأسعار تُؤكَّد لاحقًا';
  return min === max ? moneyAr(min) : moneyAr(min) + ' – ' + moneyAr(max);
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
export function selectionMessage(items, products, name, city = '') {
  return 'Bonjour Rayda, je m’appelle ' + name + '.\nJe souhaiterais en savoir plus sur cette sélection Issolatej :\n\n' + items.map(item => {
    const p = products.find(product => product.id === item.productId);
    const options = [item.variant, item.palette].filter(Boolean).join(' · ');
    return '• ' + item.quantity + ' × ' + p.name + (options ? ' (' + options + ')' : '') + ' — ' + priceLabel(p, item.variant);
  }).join('\n') + '\n\nTotal indicatif : ' + selectionTotal(items, products) + ', hors livraison.' + (city ? '\nVille de livraison : ' + city + '.' : '') + '\nPouvez-vous me confirmer les détails, la disponibilité et la livraison ?';
}
export function selectionMessageAr(items, products, name, city = '', namesAr = {}) {
  return 'السلام عليكم رايدة، اسمي ' + name + '.\nأرغب في معرفة المزيد حول هذا الاختيار من إيصولاتاج:\n\n' + items.map(item => {
    const p = products.find(product => product.id === item.productId);
    const options = [item.variant, item.palette].filter(Boolean).join(' · ');
    return '• ' + item.quantity + ' × ' + (namesAr[p.id] || p.name) + (options ? ' (' + options + ')' : '') + ' — ' + priceLabelAr(p, item.variant);
  }).join('\n') + '\n\nالمجموع التقريبي: ' + selectionTotalAr(items, products) + '، دون احتساب التوصيل.' + (city ? '\nمدينة التوصيل: ' + city + '.' : '') + '\nهل يمكنك تأكيد التفاصيل والتوفر والتوصيل؟';
}
