const cart = [];
const reviews = [
  { quote: "Merci, j’ai pris ce bracelet chez toi et je l’adore.", name: "Cliente · message Instagram", detail: "Extrait traduit et anonymisé · accord de republication à confirmer" },
  { quote: "Je voulais te remercier pour les deux bracelets reçus il y a quelques années.", name: "Cliente · message privé", detail: "Paraphrase anonymisée · autres détails privés retirés" },
];
let reviewIndex = 0;
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const formatTnd = (amount) => `${amount} TND`;

function toast(message) {
  const element = $(".toast");
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => element.classList.remove("show"), 2600);
}

function changeReview(direction) {
  reviewIndex = (reviewIndex + direction + reviews.length) % reviews.length;
  const review = reviews[reviewIndex];
  const card = $(".review-card");
  card.style.opacity = "0";
  window.setTimeout(() => {
    $(".review-quote", card).textContent = review.quote;
    $(".review-name", card).textContent = review.name;
    $(".review-detail", card).textContent = review.detail;
    $(".review-index", card).innerHTML = `${String(reviewIndex + 1).padStart(2, "0")} <i>/ ${String(reviews.length).padStart(2, "0")}</i>`;
    $(".review-progress i").style.width = `${((reviewIndex + 1) / reviews.length) * 100}%`;
    card.style.opacity = "1";
  }, 150);
}

$(".review-prev").addEventListener("click", () => changeReview(-1));
$(".review-next").addEventListener("click", () => changeReview(1));

const mobileMenu = $(".mobile-menu");
mobileMenu.addEventListener("click", () => {
  const open = mobileMenu.getAttribute("aria-expanded") !== "true";
  mobileMenu.setAttribute("aria-expanded", String(open));
  $(".main-nav").classList.toggle("open", open);
});
$$ (".main-nav a").forEach((link) => link.addEventListener("click", () => {
  mobileMenu.setAttribute("aria-expanded", "false");
  $(".main-nav").classList.remove("open");
}));

$$ (".filter-tab").forEach((button) => button.addEventListener("click", () => {
  $$(".filter-tab").forEach((tab) => tab.classList.toggle("active", tab === button));
  const filter = button.dataset.filter;
  $$(".product-card").forEach((card) => {
    card.hidden = filter !== "all" && card.dataset.kind !== filter;
  });
}));

const drawer = $(".cart-drawer");
const overlay = $(".overlay");
const cartItemsElement = $(".cart-items");

function openCart() {
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add("show"));
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("show");
  window.setTimeout(() => { overlay.hidden = true; }, 250);
  document.body.style.overflow = "";
}

function makeId() {
  return window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function addToCart(name, price, details = "", priceLabel = formatTnd(price)) {
  const item = cart.find((entry) => entry.name === name && entry.details === details);
  if (item) item.quantity += 1;
  else cart.push({ id: makeId(), name, price, priceLabel, details, quantity: 1 });
  renderCart();
  toast("Ajouté à votre sélection.");
  openCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasUnquotedPrice = cart.some((item) => item.price <= 0);
  const hasRangePrice = cart.some((item) => item.priceLabel.includes("–"));
  $(".bag-count").textContent = count;
  $(".drawer-count").textContent = `(${count})`;
  $(".cart-total-value").textContent = hasUnquotedPrice
    ? (total > 0 ? `Dès ${formatTnd(total)} + tarif à confirmer` : "Tarif à confirmer")
    : (hasRangePrice ? `Dès ${formatTnd(total)}` : formatTnd(total));
  $(".empty-cart").hidden = count > 0;
  $(".cart-bottom").hidden = count === 0;
  cartItemsElement.replaceChildren();

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    const art = document.createElement("div");
    art.className = "cart-item-art";
    art.textContent = "✧";
    const info = document.createElement("div");
    const name = document.createElement("div");
    name.className = "cart-item-name";
    name.textContent = item.name;
    const meta = document.createElement("div");
    meta.className = "cart-item-meta";
    meta.textContent = item.details || "Création à confirmer avec Raïda";
    const quantity = document.createElement("div");
    quantity.className = "quantity-control";
    quantity.innerHTML = `<button type="button" aria-label="Diminuer">−</button><span>${item.quantity}</span><button type="button" aria-label="Augmenter">＋</button>`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "cart-item-remove";
    remove.textContent = "Retirer";
    info.append(name, meta, quantity, remove);
    const price = document.createElement("div");
    price.className = "cart-item-price";
    price.textContent = `${item.priceLabel}${item.quantity > 1 ? ` × ${item.quantity}` : ""}`;
    row.append(art, info, price);
    cartItemsElement.append(row);
    const [decrease, increase] = $$ ("button", quantity);
    decrease.addEventListener("click", () => {
      if (item.quantity > 1) item.quantity -= 1;
      else cart.splice(cart.indexOf(item), 1);
      renderCart();
    });
    increase.addEventListener("click", () => { item.quantity += 1; renderCart(); });
    remove.addEventListener("click", () => {
      cart.splice(cart.indexOf(item), 1);
      renderCart();
    });
  });
}

$(".bag-button").addEventListener("click", openCart);
$(".close-drawer").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
$(".close-and-shop").addEventListener("click", () => {
  closeCart();
  $("#boutique").scrollIntoView({ behavior: "smooth" });
});

const customDialog = $(".custom-dialog");
const customForm = $(".custom-form");
const productChoice = customForm.elements.productChoice;
function syncCustomBrief() {
  const option = productChoice.selectedOptions[0];
  const product = option.value;
  const price = Number(option.dataset.price);
  const priceLabel = option.dataset.priceLabel;
  customForm.elements.product.value = product;
  customForm.elements.price.value = String(price);
  customForm.elements.priceLabel.value = priceLabel;
  $(".brief-product").textContent = product;
  $(".brief-preference").textContent = `Intention · ${customForm.elements.intention.value}`;
  $(".brief-palette").textContent = `Palette · ${customForm.elements.palette.value}`;
}
function openCustomize(name) {
  const form = $(".custom-form");
  const choice = [...form.elements.productChoice.options].find((option) => option.value === name);
  if (choice) form.elements.productChoice.value = choice.value;
  syncCustomBrief();
  if (!customDialog.open) customDialog.showModal();
}
productChoice.addEventListener("change", syncCustomBrief);
customForm.elements.intention.addEventListener("change", syncCustomBrief);
$$ ('input[name="palette"]', customForm).forEach((input) => input.addEventListener("change", syncCustomBrief));
$$ (".customize-action").forEach((button) => button.addEventListener("click", () => openCustomize(button.dataset.product)));
$(".start-custom").addEventListener("click", () => openCustomize("Bracelet BaZi personnalisé"));
$(".custom-dialog .dialog-close").addEventListener("click", () => customDialog.close());
customDialog.addEventListener("click", (event) => { if (event.target === customDialog) customDialog.close(); });
$(".custom-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const intention = form.elements.intention.value;
  const hasBirthday = Boolean(form.elements.birthday.value);
  const name = form.elements.product.value;
  const price = Number(form.elements.price.value);
  const priceLabel = form.elements.priceLabel.value;
  const palette = form.elements.palette.value;
  const note = form.elements.note.value.trim();
  const details = `${hasBirthday ? "Date partagée pour la lecture BaZi" : ""} · ${intention} · palette souhaitée : ${palette}${note ? ` · note : ${note}` : ""}`;
  customDialog.close();
  form.reset();
  addToCart(name, price, details, priceLabel);
});

$$ (".add-action").forEach((button) => button.addEventListener("click", () => addToCart(button.dataset.product, Number(button.dataset.price))));
$$ (".quick-view").forEach((button) => button.addEventListener("click", () => {
  const card = button.closest(".product-card");
  const name = $("h3", card).textContent;
  const description = $(".product-subtitle", card).textContent;
  toast(`${name} · ${description}`);
}));

$$ (".wallet-swatch").forEach((button) => button.addEventListener("click", () => {
  const card = button.closest(".product-card");
  const image = $(".product-photo img", card);
  image.src = button.dataset.image;
  image.alt = button.dataset.alt;
  $$ (".wallet-swatch", card).forEach((swatch) => swatch.setAttribute("aria-pressed", String(swatch === button)));
  toast("Aperçu du coloris. La teinte finale sera confirmée après lecture BaZi.");
}));

const checkoutDialog = $(".checkout-dialog");
$(".checkout-open").addEventListener("click", () => {
  closeCart();
  checkoutDialog.showModal();
});
$(".checkout-close").addEventListener("click", () => checkoutDialog.close());
checkoutDialog.addEventListener("click", (event) => { if (event.target === checkoutDialog) checkoutDialog.close(); });
$(".checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  $(".checkout-form").hidden = true;
  $(".checkout-success").hidden = false;
});
$(".checkout-done").addEventListener("click", () => {
  checkoutDialog.close();
  $(".checkout-form").hidden = false;
  $(".checkout-success").hidden = true;
  cart.splice(0, cart.length);
  renderCart();
});

const searchDialog = $(".search-dialog");
const searchInput = $(".search-input");
function renderSearchResults() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const resultsElement = $(".search-results");
  resultsElement.replaceChildren();
  const cards = $$(".product-card").filter((card) => {
    const haystack = `${$("h3", card).textContent} ${$(".product-category", card).textContent} ${$(".product-subtitle", card).textContent}`.toLocaleLowerCase("fr");
    return query && haystack.includes(query);
  });
  if (!query) return;
  if (!cards.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = "Aucune création ne correspond à cette recherche.";
    resultsElement.append(empty);
    return;
  }
  cards.forEach((card) => {
    const result = document.createElement("a");
    result.className = "search-result";
    result.href = "#boutique";
    const title = document.createElement("span");
    title.textContent = $("h3", card).textContent;
    const price = document.createElement("small");
    price.textContent = $(".product-price", card).textContent.trim();
    result.append(title, price);
    result.addEventListener("click", () => searchDialog.close());
    resultsElement.append(result);
  });
}
$(".search-button").addEventListener("click", () => {
  searchDialog.showModal();
  window.setTimeout(() => searchInput.focus(), 50);
});
$(".search-close").addEventListener("click", () => searchDialog.close());
searchInput.addEventListener("input", renderSearchResults);

$$ (".newsletter-form").forEach((form) => form.addEventListener("submit", (event) => {
  event.preventDefault();
  toast("Merci — l'inscription est simulée dans ce prototype.");
  form.reset();
}));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && drawer.classList.contains("open")) closeCart();
});
