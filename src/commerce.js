import { escapeHtml as esc, priceLabel, priceLabelAr, priceBounds, selectionTotal, selectionTotalAr, normalizeSelection, filterProducts } from './commerce-core.js';
const isAr = document.documentElement.lang === 'ar';
const priceLabelAuto = isAr ? priceLabelAr : priceLabel;
const selectionTotalAuto = isAr ? selectionTotalAr : selectionTotal;

const products = window.STORE_CATALOG.products;
const key = 'atelier-cart'; // Keep selections made in the previous storefront.
let items = [];
try { items = normalizeSelection(JSON.parse(localStorage.getItem(key) || '[]'), products); } catch { /* A malformed or blocked store starts empty. */ }
const selection = document.getElementById('s-selection');
let dialogTrigger;

function openDialog(dialog, trigger) {
  dialogTrigger = trigger;
  dialog.showModal();
  document.body.classList.add('s-dialog-open');
}
document.querySelectorAll('.s-selection,.s-lightbox').forEach(dialog => {
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.classList.remove('s-dialog-open'); dialogTrigger?.focus({ preventScroll: true }); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});
function lineMarkup(item, index) {
  const p = products.find(product => product.id === item.productId);
  const image = p.images[p.variantImageIndex?.[item.variant] ?? p.coverImageIndex ?? 0];
  const displayName = isAr ? (window.STORE_PRODUCT_NAMES_AR?.[p.id] || p.name) : p.name;
  const href = (isAr ? '/ar' : '') + '/products/' + p.slug + '/';
  return `<article class="s-line"><a href="${href}" tabindex="-1" aria-hidden="true"><img src="${image.src}" alt="" width="100" height="120" /></a><div><h3><a href="${href}">${esc(displayName)}</a></h3><p>${esc([item.variant,item.palette].filter(Boolean).join(' · '))}</p><strong>${priceLabelAuto(p, item.variant)}</strong><div class="s-line-quantity"><button type="button" data-line-step="-1" data-index="${index}" aria-label="${isAr ? 'إنقاص كمية ' : 'Diminuer la quantité de '}${esc(displayName)}" ${item.quantity === 1 ? 'disabled' : ''}>−</button><span aria-label="${isAr ? 'الكمية' : 'Quantité'}">${item.quantity}</span><button type="button" data-line-step="1" data-index="${index}" aria-label="${isAr ? 'زيادة كمية ' : 'Augmenter la quantité de '}${esc(displayName)}" ${item.quantity === 20 ? 'disabled' : ''}>+</button><button type="button" data-remove="${index}" aria-label="${isAr ? 'إزالة ' : 'Retirer '}${esc(displayName)}">${isAr ? 'إزالة' : 'Retirer'}</button></div></div></article>`;
}
function renderSelection() {
  const count = items.reduce((sum,item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-selection-count]').forEach(badge => { badge.textContent = count; });
  const markup = items.length ? items.map(lineMarkup).join('') : (isAr
    ? '<div class="s-empty"><h3>تبدأ رغباتكم هنا.</h3><p>أعجبتكم قطعة؟ أضيفوها إلى اختياركم للحديث عنها مع رايدة.</p><a class="g-button" href="/ar/boutique/">اكتشفوا الإبداعات ↗</a></div>'
    : '<div class="s-empty"><h3>Vos envies commencent ici.</h3><p>Une pièce vous plaît ? Ajoutez-la à votre sélection pour en parler avec Rayda.</p><a class="g-button" href="/collections/all/">Découvrir les créations ↗</a></div>');
  document.querySelectorAll('[data-selection-lines],[data-checkout-lines]').forEach(el => { el.innerHTML = markup; });
  document.querySelector('[data-selection-footer]').hidden = !items.length;
  document.querySelectorAll('[data-selection-total],[data-checkout-total]').forEach(el => { el.textContent = selectionTotalAuto(items,products); });
  const form = document.querySelector('[data-selection-form]');
  if (form) {
    form.hidden = !items.length;
    form.querySelector('.g-form-result').hidden = true;
    form.querySelector('[type="submit"]').disabled = false;
  }
}
function persist() {
  try { localStorage.setItem(key,JSON.stringify(items)); } catch { document.querySelector('[data-storage-message]').hidden = false; }
  renderSelection();
}
renderSelection();
document.querySelectorAll('[data-open-selection]').forEach(button => button.addEventListener('click', () => openDialog(selection,button)));
document.addEventListener('click', event => {
  const step = event.target.closest('[data-line-step]');
  const remove = event.target.closest('[data-remove]');
  if (!step && !remove) return;
  const scope = event.target.closest('[data-selection-lines],[data-checkout-lines]');
  const index = Number(step ? step.dataset.index : remove.dataset.remove);
  if (!items[index]) return;
  if (step) items[index].quantity = Math.max(1, Math.min(20, items[index].quantity + Number(step.dataset.lineStep)));
  else items.splice(index,1);
  persist();
  // Replacing the line must not strand keyboard focus on the document body.
  const destination = remove ? scope.querySelector('[data-remove]') : scope.querySelector(`[data-index="${index}"][data-line-step="${step.dataset.lineStep}"]:not([disabled])`);
  (destination || scope.querySelector('a') || selection.querySelector('[data-close-dialog]')).focus();
});
window.addEventListener('storage', event => {
  if (event.key !== key) return;
  try { items = normalizeSelection(JSON.parse(event.newValue || '[]'), products); } catch { items = []; }
  renderSelection();
});

// Existing cards are kept in the document so all products are readable without JS.
const catalog = document.querySelector('[data-collection]');
if (catalog) {
  const container = catalog.querySelector('[data-products]');
  const cards = new Map([...container.children].map(card => [card.dataset.productCard,card]));
  const list = products.filter(p => cards.has(p.id));
  const search = catalog.querySelector('[data-search]'), mode = catalog.querySelector('[data-mode]'), sort = catalog.querySelector('[data-sort]');
  const params = new URLSearchParams(location.search);
  if (['custom','ready'].includes(params.get('mode'))) mode.value = params.get('mode');
  if (params.get('q')) search.value = params.get('q');
  function updateCatalog() {
    catalog.querySelectorAll('[data-shop-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.shopMode===mode.value)));
    const filtered = filterProducts(list,{search:search.value,mode:mode.value,sort:sort.value,extraText:p=>isAr?(window.STORE_PRODUCT_NAMES_AR?.[p.id]||''):''});
    cards.forEach(card => { card.hidden = true; });
    filtered.forEach(p => { const card=cards.get(p.id); card.hidden=false; container.append(card); });
    catalog.querySelector('[data-results]').textContent = isAr
      ? (filtered.length === 1 ? 'قطعة واحدة للاكتشاف' : filtered.length + ' قطعة للاكتشاف')
      : filtered.length + (filtered.length === 1 ? ' pièce à découvrir' : ' pièces à découvrir');
    catalog.querySelector('[data-empty]').hidden = !!filtered.length;
  }
  search.addEventListener('input', updateCatalog); mode.addEventListener('change',updateCatalog); sort.addEventListener('change',updateCatalog);
  catalog.querySelector('[data-reset]').addEventListener('click', () => { search.value='';mode.value='all';sort.value='featured';updateCatalog();search.focus(); });
  catalog.querySelectorAll('[data-shop-mode]').forEach(button=>button.addEventListener('click',()=>{mode.value=button.dataset.shopMode;updateCatalog();}));
  updateCatalog();
}

const productRoot = document.querySelector('[data-product]');
if (productRoot) {
  const p = products.find(product => product.id === productRoot.dataset.product);
  const form = productRoot.querySelector('[data-product-form]');
  const quantity = form.elements.quantity;
  let imageIndex = p.coverImageIndex || 0;
  function showImage(index) {
    imageIndex = (index + p.images.length) % p.images.length;
    const image = p.images[imageIndex];
    document.querySelectorAll('[data-main-image],[data-zoom-image]').forEach(img => { img.src=image.src;img.alt=image.alt; });
    document.querySelectorAll('[data-image-count]').forEach(el => { el.textContent = (imageIndex+1) + ' / ' + p.images.length; });
    productRoot.querySelectorAll('[data-image]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.image) === imageIndex)));
  }
  productRoot.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click',()=>showImage(Number(button.dataset.image))));
  document.querySelectorAll('[data-gallery-step]').forEach(button => button.addEventListener('click',()=>showImage(imageIndex+Number(button.dataset.galleryStep))));
  const zoom = document.getElementById('s-lightbox');
  productRoot.querySelector('[data-zoom]').addEventListener('click', event => openDialog(zoom,event.currentTarget));
  zoom.addEventListener('keydown', event => {
    if (event.key==='ArrowLeft'||event.key==='ArrowRight') { event.preventDefault();showImage(imageIndex+(event.key==='ArrowLeft'?-1:1)); }
  });
  form.querySelectorAll('[data-quantity]').forEach(button => button.addEventListener('click',()=>{ quantity.value=Math.max(1,Math.min(20,Number(quantity.value || 1)+Number(button.dataset.quantity))); }));
  form.elements.variant?.addEventListener('change', () => {
    const variant = form.elements.variant.value;
    productRoot.querySelectorAll('[data-price]').forEach(el => { el.textContent = priceLabelAuto(p,variant); });
    if (p.variantImageIndex?.[variant] !== undefined) showImage(p.variantImageIndex[variant]);
  });
  if (p.availability==='sold-out') form.querySelectorAll('[type="submit"]').forEach(button => { button.disabled = true; });
  form.addEventListener('submit',event=>{
    event.preventDefault();
    if (!form.reportValidity() || p.availability==='sold-out') return;
    const intent = event.submitter?.dataset.intent || 'cart';
    const item = normalizeSelection([{productId:p.id,quantity:quantity.value,variant:form.elements.variant?.value,palette:form.elements.palette?.value}],products)[0];
    const existing = items.find(line=>line.productId===item.productId && line.variant===item.variant && line.palette===item.palette);
    if (existing) existing.quantity=Math.min(20,existing.quantity+item.quantity); else items.push(item);
    persist();
    if (intent === 'buy') { window.location.href = (isAr ? '/ar' : '') + '/checkout/'; return; }
    openDialog(selection,event.submitter);
  });
}

// Placing an order here is a demo: it records the order and decrements stock in the same
// localStorage the admin panel reads, so the two stay in sync without a real backend yet.
// Rayda reaches out to the customer directly — there is no WhatsApp hand-off at this step.
function readAdminStore(storeKey, fallback) { try { const raw = localStorage.getItem(storeKey); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }
function writeAdminStore(storeKey, value) { try { localStorage.setItem(storeKey, JSON.stringify(value)); } catch { /* Private browsing or a full quota: the order still completes for this visit. */ } }
// Mirrors admin.js's STOCK_SEED so stock still decrements correctly even if nobody has opened
// /admin/ on this browser yet (the two stay in sync whichever page is visited first).
const STOCK_SEED = {
  'bracelet-bazi': null, 'collier-bazi': null,
  'bracelet-amour': 14, 'porte-cles-pierre': 9, 'porte-cles-arbre-vie': 11,
  'portefeuille-hafidha': 6, 'carte-million-dollar': 20, 'decor-abondance': 8,
  'cle-de-vie': 10, 'fleur-de-vie': 0, 'pendentif-voiture-fleur': 15, 'pendentif-voiture-ankh': 15
};
function submitOrder({ name, phone, city }) {
  const orderItems = items.map(item => {
    const p = products.find(product => product.id === item.productId);
    return { productId: item.productId, qty: item.quantity, price: priceBounds(p, item.variant)?.min ?? 0 };
  });
  const deliveryFee = Number(readAdminStore('admin_settings', {}).deliveryFee ?? 10);
  const total = orderItems.reduce((sum, item) => sum + item.qty * item.price, 0) + deliveryFee;
  const stock = readAdminStore('admin_stock', {});
  orderItems.forEach(item => {
    if (!stock[item.productId]) { const seed = STOCK_SEED[item.productId]; stock[item.productId] = { stock: seed, soldOut: seed === 0 }; }
    const entry = stock[item.productId];
    if (entry.stock == null) return;
    entry.stock = Math.max(0, entry.stock - item.qty);
    if (entry.stock === 0) entry.soldOut = true;
  });
  writeAdminStore('admin_stock', stock);
  const orders = readAdminStore('admin_orders', []);
  orders.push({ id: 'order-' + Math.random().toString(36).slice(2,9), name, phone, city, items: orderItems, status: 'Nouvelle', date: new Date().toISOString(), total });
  writeAdminStore('admin_orders', orders);
}

const selectionForm = document.querySelector('[data-selection-form]');
if (selectionForm) {
  const result = selectionForm.querySelector('.g-form-result');
  selectionForm.addEventListener('input',event=>{ result.hidden=true;event.target.setCustomValidity?.(''); });
  selectionForm.addEventListener('submit',event=>{
    event.preventDefault();
    if (!items.length || !selectionForm.reportValidity()) return;
    const name = selectionForm.elements.name.value.trim();
    const phone = selectionForm.elements.phone.value.trim();
    if (!name) { selectionForm.elements.name.setCustomValidity(isAr ? 'يرجى إدخال اسمكم.' : 'Merci de renseigner votre prénom.'); selectionForm.reportValidity(); return; }
    if (!phone) { selectionForm.elements.phone.setCustomValidity(isAr ? 'يرجى إدخال رقم هاتفكم.' : 'Merci de renseigner votre numéro de téléphone.'); selectionForm.reportValidity(); return; }
    submitOrder({ name, phone, city: selectionForm.elements.city.value.trim() });
    items = [];
    persist();
    // persist() just hid the form (empty selection) and the result panel — show the confirmation instead.
    selectionForm.hidden = false;
    result.hidden = false;
    selectionForm.querySelector('[type="submit"]').disabled = true;
  });
}

// A question from a product retains its context without sharing anything externally.
const contact = document.querySelector('[data-contact-form]');
const piece = new URLSearchParams(location.search).get('piece');
if (contact && piece && products.some(p=>p.name===piece)) contact.elements.message.value='Bonjour Rayda, je souhaite en savoir plus sur : '+piece+'.';
