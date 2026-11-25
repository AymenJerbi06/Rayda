import { escapeHtml as esc, priceLabel, priceLabelAr, priceBounds, selectionTotal, selectionTotalAr, selectionTotalWithDelivery, selectionTotalWithDeliveryAr, DELIVERY_FEE, normalizeSelection, filterProducts, thumbSrc } from './commerce-core.js';
const isAr = document.documentElement.lang === 'ar';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const priceLabelAuto = isAr ? priceLabelAr : priceLabel;
const selectionTotalAuto = isAr ? selectionTotalAr : selectionTotal;
const totalWithDeliveryAuto = isAr ? selectionTotalWithDeliveryAr : selectionTotalWithDelivery;

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
  dialog.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => dialog.close()));
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
  return `<article class="s-line"><a href="${href}" tabindex="-1" aria-hidden="true"><img src="${thumbSrc(image.src)}" alt="" width="100" height="120" decoding="async" /></a><div><h3><a href="${href}">${esc(displayName)}</a></h3><p>${esc([item.variant,item.palette].filter(Boolean).join(' · '))}</p><strong>${priceLabelAuto(p, item.variant)}</strong><div class="s-line-quantity"><button type="button" data-line-step="-1" data-index="${index}" aria-label="${isAr ? 'إنقاص كمية ' : 'Diminuer la quantité de '}${esc(displayName)}" ${item.quantity === 1 ? 'disabled' : ''}>−</button><span aria-label="${isAr ? 'الكمية' : 'Quantité'}">${item.quantity}</span><button type="button" data-line-step="1" data-index="${index}" aria-label="${isAr ? 'زيادة كمية ' : 'Augmenter la quantité de '}${esc(displayName)}" ${item.quantity === 20 ? 'disabled' : ''}>+</button><button type="button" data-remove="${index}" aria-label="${isAr ? 'إزالة ' : 'Retirer '}${esc(displayName)}">${isAr ? 'إزالة' : 'Retirer'}</button></div></div></article>`;
}
let shownCount = null;
function renderSelection() {
  const count = items.reduce((sum,item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-selection-count]').forEach(badge => { badge.textContent = count; });
  // A small pulse on the bag icon confirms that something was added, even when the drawer stays closed.
  if (shownCount !== null && count > shownCount) document.querySelectorAll('.s-selection-toggle').forEach(toggle => {
    toggle.classList.remove('is-bumped'); void toggle.offsetWidth; toggle.classList.add('is-bumped');
  });
  shownCount = count;
  const markup = items.length ? items.map(lineMarkup).join('') : (isAr
    ? '<div class="s-empty"><h3>تبدأ رغباتكم هنا.</h3><p>أعجبتكم قطعة؟ أضيفوها إلى سلتكم للحديث عنها مع رايدا.</p><a class="g-button" href="/ar/boutique/">اكتشفوا الإبداعات ↗</a></div>'
    : '<div class="s-empty"><h3>Vos envies commencent ici.</h3><p>Une pièce vous plaît ? Ajoutez-la à votre panier pour en parler avec Rayda.</p><a class="g-button" href="/collections/all/">Découvrir les créations ↗</a></div>');
  document.querySelectorAll('[data-selection-lines],[data-checkout-lines]').forEach(el => { el.innerHTML = markup; });
  document.querySelector('[data-selection-footer]').hidden = !items.length;
  document.querySelectorAll('[data-selection-total],[data-checkout-total]').forEach(el => { el.textContent = selectionTotalAuto(items,products); });
  document.querySelectorAll('[data-checkout-grand-total]').forEach(el => { el.textContent = totalWithDeliveryAuto(items,products); });
  // Custom pieces (BaZi bracelets and necklaces, the Hafidha El Mel wallet) cannot be made without the birth date,
  // and the wallet also needs the client's goals: the checkout asks for them, and only then.
  const needsBirth = items.some(item => products.find(p => p.id === item.productId)?.custom);
  const hasWallet = items.some(item => item.productId === 'portefeuille-hafidha');
  const hasBazi = items.some(item => item.productId !== 'portefeuille-hafidha' && products.find(p => p.id === item.productId)?.custom);
  document.querySelectorAll('[data-personal-fields]').forEach(box => {
    box.hidden = !needsBirth;
    box.querySelector('[name="birthDate"]').disabled = !needsBirth;
    box.querySelector('[name="birthDate"]').max = new Date().toISOString().slice(0, 10);
    box.querySelector('[data-goals-field]').hidden = !hasWallet;
    box.querySelector('[name="goals"]').disabled = !hasWallet;
    box.querySelector('[data-personal-bazi]').hidden = !hasBazi;
    box.querySelector('[data-personal-wallet]').hidden = !hasWallet;
  });
  const form = document.querySelector('[data-selection-form]');
  if (form) {
    form.hidden = !items.length;
    if (items.length) form.classList.remove('is-complete');
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
  const strip = productRoot.querySelector('.s-thumbnails');
  const isRtl = document.documentElement.dir === 'rtl';
  const preloaded = new Set();
  // Fetch the neighbouring photos once someone starts browsing, so the next one appears without a wait.
  function preload(index) {
    const src = p.images[(index + p.images.length) % p.images.length].src;
    if (preloaded.has(src)) return;
    preloaded.add(src);
    const next = new Image(); next.decoding = 'async'; next.src = src;
  }
  function showImage(index) {
    imageIndex = (index + p.images.length) % p.images.length;
    const image = p.images[imageIndex];
    document.querySelectorAll('[data-main-image],[data-zoom-image]').forEach(img => {
      if (img.getAttribute('src') !== image.src) { img.classList.remove('is-fresh'); void img.offsetWidth; img.classList.add('is-fresh'); }
      img.src=image.src;img.alt=image.alt;
    });
    document.querySelectorAll('[data-image-count]').forEach(el => { el.textContent = (imageIndex+1) + ' / ' + p.images.length; });
    productRoot.querySelectorAll('[data-image]').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.image) === imageIndex)));
    // Keep the active thumbnail in view when the arrows or a swipe move past the visible strip.
    const thumb = strip?.querySelector(`[data-image="${imageIndex}"]`);
    if (thumb && strip.scrollWidth > strip.clientWidth) {
      const stripBox = strip.getBoundingClientRect(), thumbBox = thumb.getBoundingClientRect();
      strip.scrollBy({ left: (thumbBox.left + thumbBox.width / 2) - (stripBox.left + stripBox.width / 2), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
    preload(imageIndex + 1); preload(imageIndex - 1);
  }
  productRoot.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click',()=>showImage(Number(button.dataset.image))));
  document.querySelectorAll('[data-gallery-step]').forEach(button => button.addEventListener('click',()=>showImage(imageIndex+Number(button.dataset.galleryStep))));
  const zoom = document.getElementById('s-lightbox');
  // Swipe between photos on touch screens, both on the page and in the zoom view. In Arabic the
  // gallery reads right to left, so the direction of a swipe is mirrored too.
  let swipedAt = 0;
  function enableSwipe(surface) {
    if (!surface) return;
    let start = null;
    surface.addEventListener('pointerdown', event => { start = event.pointerType === 'mouse' ? null : { x: event.clientX, y: event.clientY }; });
    surface.addEventListener('pointercancel', () => { start = null; });
    surface.addEventListener('pointerup', event => {
      if (!start) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      swipedAt = Date.now();
      const forward = dx < 0 ? 1 : -1;
      showImage(imageIndex + (isRtl ? -forward : forward));
    });
  }
  const zoomButton = productRoot.querySelector('[data-zoom]');
  enableSwipe(zoomButton);
  enableSwipe(zoom?.querySelector('[data-zoom-image]'));
  zoomButton.addEventListener('click', event => { if (Date.now() - swipedAt > 400) openDialog(zoom,event.currentTarget); });
  // The pinned mobile buy bar only appears once the main buy buttons have scrolled out of view.
  const buybar = productRoot.querySelector('.s-mobile-buybar');
  const mainBuy = productRoot.querySelector('.s-buy-row') || productRoot.querySelector('.s-add');
  if (buybar && mainBuy && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => buybar.classList.toggle('is-tucked', entry.isIntersecting)).observe(mainBuy);
  }
  zoom.addEventListener('keydown', event => {
    if (event.key==='ArrowLeft'||event.key==='ArrowRight') { event.preventDefault();showImage(imageIndex+(event.key==='ArrowLeft'?-1:1)); }
  });
  form.querySelectorAll('[data-quantity]').forEach(button => button.addEventListener('click',()=>{ quantity.value=Math.max(1,Math.min(20,Number(quantity.value || 1)+Number(button.dataset.quantity))); }));
  // Models, sizes and colours are radio buttons now (a select or a hidden field also works): listen on the form.
  // Rayda wrote her own text for some choices (the baccalaureate edition of her book): show the text for the
  // picked choice and point the "read her description" link at it.
  function showVariantText(variant) {
    let shown = null;
    productRoot.querySelectorAll('[data-for-variants]').forEach(block => {
      block.hidden = !block.dataset.forVariants.split('|').includes(variant);
      if (!block.hidden) shown = block;
    });
    if (shown) productRoot.querySelectorAll('a[href^="#description"]').forEach(link => link.setAttribute('href', '#' + shown.id));
  }
  form.addEventListener('change', event => {
    if (event.target.name !== 'variant') return;
    const variant = form.elements.variant.value;
    productRoot.querySelectorAll('[data-price]').forEach(el => { el.textContent = priceLabelAuto(p,variant); });
    productRoot.querySelectorAll('[data-price-unknown]').forEach(el => { el.hidden = !!priceBounds(p, variant); });
    showVariantText(variant);
    if (p.variantImageIndex?.[variant] !== undefined) showImage(p.variantImageIndex[variant]);
  });
  // A browser that restores the last choice on reload gets the matching price and text, not the first choice's.
  if (form.elements.variant?.value && form.elements.variant.value !== p.options?.variant?.[0]) {
    productRoot.querySelectorAll('[data-price]').forEach(el => { el.textContent = priceLabelAuto(p, form.elements.variant.value); });
    productRoot.querySelectorAll('[data-price-unknown]').forEach(el => { el.hidden = !!priceBounds(p, form.elements.variant.value); });
    showVariantText(form.elements.variant.value);
  }
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
  'cle-de-vie': 10, 'fleur-de-vie': 0, 'pendentif-voiture-fleur': 15, 'pendentif-voiture-ankh': 15,
  'livre-excellence': null, 'accessoires-apprentissage': null,
  'bouteille-verre': null, 'collier-cle': null, 'pieces-feng-shui': null
};
function submitOrder({ name, phone, address, city, postalCode, birthDate, goals }) {
  const orderItems = items.map(item => {
    const p = products.find(product => product.id === item.productId);
    return { productId: item.productId, qty: item.quantity, price: priceBounds(p, item.variant)?.min ?? 0 };
  });
  // The same 7 TND the customer saw on the checkout page.
  const deliveryFee = DELIVERY_FEE;
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
  orders.push({ id: 'order-' + Math.random().toString(36).slice(2,9), name, phone, address, city, postalCode, birthDate, goals, items: orderItems, status: 'Nouvelle', date: new Date().toISOString(), total });
  writeAdminStore('admin_orders', orders);
}

const selectionForm = document.querySelector('[data-selection-form]');
if (selectionForm) {
  const result = selectionForm.querySelector('.g-form-result');
  selectionForm.addEventListener('input',event=>{ result.hidden=true;event.target.setCustomValidity?.(''); });
  // Rayda confirms every order by phone, so the number is typed twice and both must match.
  const digits = value => String(value).replace(/\D/g, '');
  const checkPhones = () => {
    const { phone, phoneConfirm } = selectionForm.elements;
    if (!phone || !phoneConfirm) return;
    phone.setCustomValidity(!phone.value || digits(phone.value).length >= 8 ? '' : isAr ? 'أدخلوا رقم هاتف كاملًا.' : 'Entrez un numéro de téléphone complet.');
    phoneConfirm.setCustomValidity(!phoneConfirm.value || digits(phoneConfirm.value).slice(-8) === digits(phone.value).slice(-8) ? '' : isAr ? 'الرقمان غير متطابقين.' : 'Les deux numéros ne correspondent pas.');
  };
  selectionForm.addEventListener('submit',event=>{
    event.preventDefault();
    checkPhones();
    if (!items.length || !selectionForm.reportValidity()) return;
    const name = selectionForm.elements.name.value.trim();
    const phone = selectionForm.elements.phone.value.trim();
    submitOrder({
      name, phone,
      address: selectionForm.elements.address.value.trim(),
      city: selectionForm.elements.city.value.trim(),
      postalCode: selectionForm.elements.postalCode.value.trim(),
      // Empty unless the selection holds a custom piece (the fields are disabled otherwise).
      birthDate: selectionForm.elements.birthDate?.disabled ? '' : selectionForm.elements.birthDate?.value || '',
      goals: selectionForm.elements.goals?.disabled ? '' : selectionForm.elements.goals?.value.trim() || ''
    });
    items = [];
    persist();
    // persist() just hid the form (empty selection) and the result panel — show the confirmation instead.
    // The filled-in fields are cleared and folded away so the confirmation is the one thing left to read,
    // and it is brought into view, since on a phone it would otherwise sit below the fold.
    selectionForm.reset();
    selectionForm.classList.add('is-complete');
    selectionForm.hidden = false;
    result.hidden = false;
    selectionForm.querySelector('[type="submit"]').disabled = true;
    result.tabIndex = -1;
    result.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
  });
}

// A question from a product retains its context without sharing anything externally.
const contact = document.querySelector('[data-contact-form]');
const piece = new URLSearchParams(location.search).get('piece');
if (contact && piece && products.some(p=>p.name===piece)) contact.elements.message.value='Bonjour Rayda, je souhaite en savoir plus sur : '+piece+'.';
