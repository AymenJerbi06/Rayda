(function () {
  "use strict";
  // Demo-only admin panel. There is no server yet: the credential below and every piece of data
  // (stock, orders, promo codes, bundles, settings) live in this browser's localStorage so the
  // client can see and click through how the panel will work. All of this gets replaced by real
  // authentication and a Supabase-backed API in a later pass.
  var ADMIN_CREDENTIALS = { email: "rayda@issolatej.com", password: "Issolatej2026" };
  var SESSION_KEY = "admin_session";
  var SESSION_TTL = 12 * 60 * 60 * 1000;

  function money(value) { return new Intl.NumberFormat("fr-TN", { maximumFractionDigits: 0 }).format(value) + " TND"; }
  function uid(prefix) { return prefix + "-" + Math.random().toString(36).slice(2, 9); }
  function getStore(key, fallback) { try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; } }
  function setStore(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }

  function isLoggedIn() {
    var session = getStore(SESSION_KEY, null);
    return !!(session && session.at && Date.now() - session.at < SESSION_TTL);
  }

  var STOCK_SEED = {
    "bracelet-bazi": null, "collier-bazi": null,
    "bracelet-amour": 14, "porte-cles-pierre": 9, "porte-cles-arbre-vie": 11,
    "portefeuille-hafidha": 6, "carte-million-dollar": 20, "decor-abondance": 8,
    "cle-de-vie": 10, "fleur-de-vie": 0, "pendentif-voiture-fleur": 15, "pendentif-voiture-ankh": 15
  };

  function daysAgo(n) { var d = new Date(Date.now() - n * 86400000); return d; }
  function formatDate(d) { return new Intl.DateTimeFormat("fr-TN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d); }

  var ORDER_SEED = [
    { name: "Sirine B.", phone: "+216 20 123 456", address: "12 Rue de Marseille", city: "Tunis", postalCode: "1002", items: [{ productId: "bracelet-amour", qty: 1, price: 100 }], status: "Livrée", daysAgo: 21 },
    { name: "Yosra K.", phone: "+216 55 987 321", address: "5 Avenue Habib Bourguiba", city: "Sousse", postalCode: "4000", items: [{ productId: "collier-bazi", qty: 1, price: 320 }], status: "Livrée", daysAgo: 18 },
    { name: "Ahmed T.", phone: "+216 28 456 789", address: "Résidence Essalem, bloc B", city: "Sfax", postalCode: "3000", items: [{ productId: "carte-million-dollar", qty: 2, price: 50 }], status: "Confirmée", daysAgo: 14 },
    { name: "Nour E.", phone: "+216 22 334 556", address: "27 Rue du Lac", city: "Tunis", postalCode: "1053", items: [{ productId: "bracelet-bazi", qty: 1, price: 160 }], status: "Confirmée", daysAgo: 12 },
    { name: "Mohamed A.", phone: "+216 50 112 233", address: "Cité El Wafa, villa 9", city: "Nabeul", postalCode: "8000", items: [{ productId: "decor-abondance", qty: 1, price: 60 }, { productId: "cle-de-vie", qty: 1, price: 70 }], status: "Livrée", daysAgo: 9 },
    { name: "Salma R.", phone: "+216 29 887 665", address: "3 Rue Ibn Khaldoun", city: "Tunis", postalCode: "1001", items: [{ productId: "portefeuille-hafidha", qty: 1, price: 90 }], status: "Nouvelle", daysAgo: 4 },
    { name: "Houssem G.", phone: "+216 24 556 778", address: "18 Avenue de la Liberté", city: "Bizerte", postalCode: "7000", items: [{ productId: "pendentif-voiture-fleur", qty: 1, price: 80 }], status: "Nouvelle", daysAgo: 2 },
    { name: "Ines M.", phone: "+216 21 998 776", address: "9 Rue des Oliviers", city: "Tunis", postalCode: "1004", items: [{ productId: "porte-cles-arbre-vie", qty: 3, price: 35 }], status: "Annulée", daysAgo: 7 },
    { name: "Rania S.", phone: "+216 26 443 221", address: "Résidence Yasmine, apt 4", city: "Monastir", postalCode: "5000", items: [{ productId: "fleur-de-vie", qty: 1, price: 80 }], status: "Livrée", daysAgo: 1 }
  ];

  var PROMO_SEED = [
    { id: uid("promo"), code: "BIENVENUE10", type: "percent", value: 10, limit: 50, used: 12, active: true },
    { id: uid("promo"), code: "RAYDA2026", type: "amount", value: 20, limit: 20, used: 20, active: false }
  ];

  function catalogProducts() {
    var catalog = window.STORE_CATALOG;
    return catalog && catalog.products ? catalog.products : [];
  }
  function catalogCollections() {
    var catalog = window.STORE_CATALOG;
    return catalog && catalog.collections ? catalog.collections.filter(function (c) { return c.slug !== "all"; }) : [];
  }
  function productById(id) {
    var found = catalogProducts().filter(function (p) { return p.id === id; })[0];
    if (found) return found;
    return customProducts().filter(function (p) { return p.id === id; })[0] || null;
  }
  function productName(id) { var p = productById(id); return p ? p.name : id; }

  function stockState() {
    var stored = getStore("admin_stock", null);
    if (stored) return stored;
    var seeded = {};
    Object.keys(STOCK_SEED).forEach(function (id) {
      var stock = STOCK_SEED[id];
      seeded[id] = { stock: stock, soldOut: stock === 0 };
    });
    setStore("admin_stock", seeded);
    return seeded;
  }
  function saveStockState(state) { setStore("admin_stock", state); }
  function customProducts() { return getStore("admin_custom_products", []); }
  function saveCustomProducts(list) { setStore("admin_custom_products", list); }
  function bundles() { return getStore("admin_bundles", []); }
  function saveBundles(list) { setStore("admin_bundles", list); }
  function promoCodes() {
    var stored = getStore("admin_promo_codes", null);
    if (stored) return stored;
    setStore("admin_promo_codes", PROMO_SEED);
    return PROMO_SEED;
  }
  function savePromoCodes(list) { setStore("admin_promo_codes", list); }
  function orders() {
    var stored = getStore("admin_orders", null);
    if (stored) return stored;
    var seeded = ORDER_SEED.map(function (order) {
      return {
        id: uid("order"), name: order.name, phone: order.phone, address: order.address, city: order.city, postalCode: order.postalCode,
        items: order.items, status: order.status, date: daysAgo(order.daysAgo).toISOString(),
        total: order.items.reduce(function (sum, item) { return sum + item.qty * item.price; }, 0) + 10
      };
    });
    setStore("admin_orders", seeded);
    return seeded;
  }
  function saveOrders(list) { setStore("admin_orders", list); }
  function settings() { return getStore("admin_settings", { deliveryFee: 10, resendEnabled: false, notifyEmail: "" }); }
  function saveSettings(value) { setStore("admin_settings", value); }

  function allProductsWithStock() {
    var state = stockState();
    var list = catalogProducts().concat(customProducts());
    return list.map(function (p) {
      var entry = state[p.id] || { stock: p.stock != null ? p.stock : null, soldOut: false };
      return Object.assign({}, p, { stock: entry.stock, soldOut: entry.soldOut });
    });
  }

  function stockBadge(p) {
    if (p.soldOut) return '<span class="a-badge off">Épuisé</span>';
    if (p.stock == null) return '<span class="a-badge ok">Sur commande</span>';
    if (p.stock <= 3) return '<span class="a-badge warn">' + p.stock + ' restants</span>';
    return '<span class="a-badge ok">' + p.stock + ' en stock</span>';
  }

  function initLoginPage() {
    if (isLoggedIn()) { window.location.href = "/admin/"; return; }
    var form = document.querySelector("[data-login-form]");
    var error = document.querySelector("[data-login-error]");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var email = String(data.get("email") || "").trim().toLowerCase();
      var password = String(data.get("password") || "");
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setStore(SESSION_KEY, { at: Date.now() });
        window.location.href = "/admin/";
      } else {
        error.textContent = "E-mail ou mot de passe incorrect.";
        error.hidden = false;
      }
    });
  }

  function wireChrome() {
    var logout = document.querySelector("[data-admin-logout]");
    if (logout) logout.addEventListener("click", function () { localStorage.removeItem(SESSION_KEY); window.location.href = "/admin/login/"; });
  }

  function renderDashboard() {
    var allOrders = orders();
    var counted = allOrders.filter(function (o) { return o.status === "Confirmée" || o.status === "Livrée"; });
    var revenue = counted.reduce(function (sum, o) { return sum + o.total; }, 0);
    var products = allProductsWithStock();
    var lowStock = products.filter(function (p) { return p.stock != null && p.stock <= 3 && !p.soldOut; }).length;
    var soldOutCount = products.filter(function (p) { return p.soldOut; }).length;

    var sold = {};
    allOrders.filter(function (o) { return o.status !== "Annulée"; }).forEach(function (o) {
      o.items.forEach(function (item) { sold[item.productId] = (sold[item.productId] || 0) + item.qty; });
    });
    var topIds = Object.keys(sold).sort(function (a, b) { return sold[b] - sold[a]; }).slice(0, 6);

    document.querySelector("[data-stat-grid]").innerHTML = [
      ["Revenu (confirmé + livré)", money(revenue), counted.length + " commande" + (counted.length === 1 ? "" : "s")],
      ["Commandes au total", String(allOrders.length), allOrders.filter(function (o) { return o.status === "Nouvelle"; }).length + " nouvelle(s)"],
      ["Pièces en stock faible", String(lowStock), "3 unités ou moins"],
      ["Pièces épuisées", String(soldOutCount), "à réapprovisionner"]
    ].map(function (s) { return '<div class="a-stat-card"><span>' + s[0] + "</span><strong>" + s[1] + "</strong><em>" + s[2] + "</em></div>"; }).join("");

    document.querySelector("[data-top-products]").innerHTML = topIds.map(function (id) {
      var p = products.filter(function (prod) { return prod.id === id; })[0];
      return "<tr><td>" + productName(id) + "</td><td>" + sold[id] + "</td><td>" + (p ? (p.stock == null ? "Sur commande" : p.stock) : "—") + "</td><td>" + (p ? stockBadge(p) : "—") + "</td></tr>";
    }).join("") || '<tr><td colspan="4" class="a-empty-note">Pas encore de ventes.</td></tr>';

    document.querySelector("[data-recent-orders]").innerHTML = allOrders
      .slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); }).slice(0, 6)
      .map(function (o) { return "<tr><td>" + o.name + "</td><td>" + o.phone + "</td><td>" + money(o.total) + "</td><td>" + statusBadge(o.status) + "</td><td>" + formatDate(new Date(o.date)) + "</td></tr>"; })
      .join("");
  }

  function statusBadge(status) {
    var cls = status === "Livrée" ? "ok" : status === "Confirmée" ? "ok" : status === "Annulée" ? "off" : "warn";
    return '<span class="a-badge ' + cls + '">' + status + "</span>";
  }

  function renderProducts() {
    var select = document.querySelector("[data-collection-options]");
    if (select) select.innerHTML = catalogCollections().map(function (c) { return '<option value="' + c.slug + '">' + c.name + "</option>"; }).join("");
    function refreshBundleOptions() {
      var bundleOptions = document.querySelector("[data-bundle-product-options]");
      if (!bundleOptions) return;
      bundleOptions.innerHTML = catalogProducts().concat(customProducts()).map(function (p) {
        return '<label class="a-field a-checkbox" style="font-weight:500"><input type="checkbox" name="bundleProduct" value="' + p.id + '" />' + p.name + "</label>";
      }).join("");
    }
    refreshBundleOptions();

    function renderTable() {
      var products = allProductsWithStock();
      document.querySelector("[data-products-table]").innerHTML = products.map(function (p) {
        var image = p.images && p.images[0] ? p.images[0].src : "";
        return "<tr data-product-row=\"" + p.id + "\"><td><div class=\"a-product-cell\">" + (image ? '<img src="' + image + '" alt="" />' : "") + "<div><b>" + p.name + "</b><small>" + (p.custom ? "Création personnalisée" : "Prêt à offrir") + "</small></div></div></td><td>" + (p.price ? money(p.price.min) : "Sur devis") + "</td><td>" + (p.stock == null ? '<span class="a-badge ok">Sur commande</span>' : '<input class="a-stock-input" type="number" min="0" value="' + p.stock + '" data-stock-field="' + p.id + '" />') + "</td><td><label class=\"a-switch\"><input type=\"checkbox\" data-soldout-field=\"" + p.id + "\" " + (p.soldOut ? "checked" : "") + " /><span></span></label></td><td class=\"a-row-actions\">" + (customProducts().some(function (c) { return c.id === p.id; }) ? '<button type="button" class="a-icon-btn danger" data-remove-product="' + p.id + '" title="Retirer la pièce">✕</button>' : "") + "</td></tr>";
      }).join("");

      document.querySelectorAll("[data-stock-field]").forEach(function (input) {
        input.addEventListener("change", function () {
          var state = stockState();
          var id = input.dataset.stockField;
          var value = Math.max(0, Number(input.value) || 0);
          state[id] = state[id] || { stock: null, soldOut: false };
          state[id].stock = value;
          if (value > 0 && state[id].soldOut) state[id].soldOut = false;
          saveStockState(state);
          renderTable();
        });
      });
      document.querySelectorAll("[data-soldout-field]").forEach(function (toggle) {
        toggle.addEventListener("change", function () {
          var state = stockState();
          var id = toggle.dataset.soldoutField;
          state[id] = state[id] || { stock: null, soldOut: false };
          state[id].soldOut = toggle.checked;
          saveStockState(state);
          renderTable();
        });
      });
      document.querySelectorAll("[data-remove-product]").forEach(function (button) {
        button.addEventListener("click", function () {
          saveCustomProducts(customProducts().filter(function (p) { return p.id !== button.dataset.removeProduct; }));
          renderTable(); renderBundlesTable(); refreshBundleOptions();
        });
      });
    }

    function renderBundlesTable() {
      var list = bundles();
      document.querySelector("[data-bundles-empty]").hidden = list.length > 0;
      document.querySelector("[data-bundles-table]").innerHTML = list.map(function (b) {
        return "<tr><td><b>" + b.name + "</b></td><td>" + b.productIds.map(productName).join(", ") + "</td><td>" + money(b.price) + '</td><td class="a-row-actions"><button type="button" class="a-icon-btn danger" data-remove-bundle="' + b.id + '" title="Supprimer">✕</button></td></tr>';
      }).join("");
      document.querySelectorAll("[data-remove-bundle]").forEach(function (button) {
        button.addEventListener("click", function () { saveBundles(bundles().filter(function (b) { return b.id !== button.dataset.removeBundle; })); renderBundlesTable(); });
      });
    }

    renderTable();
    renderBundlesTable();

    var addForm = document.querySelector("[data-add-product-form]");
    addForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(addForm);
      var name = String(data.get("name") || "").trim();
      var price = Number(data.get("price")) || 0;
      if (!name || !price) return;
      var id = uid("produit");
      var product = {
        id: id, slug: id, name: name, nameAr: String(data.get("nameAr") || "").trim(),
        eyebrow: "Ajouté depuis l’espace admin", custom: data.get("custom") === "on",
        price: { min: price, max: price, currency: "TND" }, images: [], collections: [data.get("collection")]
      };
      saveCustomProducts(customProducts().concat(product));
      var state = stockState();
      var stockValue = data.get("custom") === "on" ? null : Math.max(0, Number(data.get("stock")) || 0);
      state[id] = { stock: stockValue, soldOut: stockValue === 0 };
      saveStockState(state);
      addForm.reset();
      renderTable(); refreshBundleOptions();
    });

    var bundleForm = document.querySelector("[data-add-bundle-form]");
    bundleForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(bundleForm);
      var name = String(data.get("name") || "").trim();
      var price = Number(data.get("price")) || 0;
      var productIds = Array.from(bundleForm.querySelectorAll('input[name="bundleProduct"]:checked')).map(function (input) { return input.value; });
      if (!name || !price || productIds.length < 2) { window.alert("Choisissez un nom, un prix et au moins deux pièces."); return; }
      saveBundles(bundles().concat({ id: uid("bundle"), name: name, price: price, productIds: productIds }));
      bundleForm.reset();
      renderBundlesTable();
    });
  }

  function renderPromoCodes() {
    function renderTable() {
      var list = promoCodes();
      document.querySelector("[data-promo-table]").innerHTML = list.map(function (p) {
        var discount = p.type === "percent" ? p.value + " %" : money(p.value);
        return "<tr><td><b>" + p.code + "</b></td><td>" + discount + "</td><td>" + p.used + " / " + p.limit + '</td><td><label class="a-switch"><input type="checkbox" data-promo-active="' + p.id + '" ' + (p.active ? "checked" : "") + ' /><span></span></label></td><td class="a-row-actions"><button type="button" class="a-icon-btn danger" data-remove-promo="' + p.id + '" title="Supprimer">✕</button></td></tr>';
      }).join("");
      document.querySelectorAll("[data-promo-active]").forEach(function (toggle) {
        toggle.addEventListener("change", function () {
          var list = promoCodes().map(function (p) { return p.id === toggle.dataset.promoActive ? Object.assign({}, p, { active: toggle.checked }) : p; });
          savePromoCodes(list);
        });
      });
      document.querySelectorAll("[data-remove-promo]").forEach(function (button) {
        button.addEventListener("click", function () { savePromoCodes(promoCodes().filter(function (p) { return p.id !== button.dataset.removePromo; })); renderTable(); });
      });
    }
    renderTable();
    var form = document.querySelector("[data-add-promo-form]");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var code = String(data.get("code") || "").trim().toUpperCase();
      var value = Number(data.get("value")) || 0;
      var limit = Number(data.get("limit")) || 1;
      if (!code || !value) return;
      savePromoCodes(promoCodes().concat({ id: uid("promo"), code: code, type: data.get("type"), value: value, limit: limit, used: 0, active: true }));
      form.reset();
      renderTable();
    });
  }

  function renderOrders() {
    var statuses = ["Nouvelle", "Confirmée", "Livrée", "Annulée"];
    function renderTable() {
      var list = orders().slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      document.querySelector("[data-orders-table]").innerHTML = list.map(function (o) {
        var itemsLabel = o.items.map(function (item) { return item.qty + "× " + productName(item.productId); }).join(", ");
        var addressLabel = [o.address, o.city, o.postalCode].filter(Boolean).join(", ") || "—";
        var options = statuses.map(function (s) { return '<option value="' + s + '" ' + (s === o.status ? "selected" : "") + ">" + s + "</option>"; }).join("");
        return "<tr><td>" + o.name + "</td><td>" + o.phone + "</td><td>" + addressLabel + "</td><td>" + itemsLabel + "</td><td>" + money(o.total) + '</td><td><select class="a-field" style="padding:7px 10px" data-order-status="' + o.id + '">' + options + "</select></td><td>" + formatDate(new Date(o.date)) + "</td></tr>";
      }).join("");
      document.querySelectorAll("[data-order-status]").forEach(function (select) {
        select.addEventListener("change", function () {
          var list = orders().map(function (o) { return o.id === select.dataset.orderStatus ? Object.assign({}, o, { status: select.value }) : o; });
          saveOrders(list);
        });
      });
    }
    renderTable();
  }

  function renderSettings() {
    var current = settings();
    var deliveryForm = document.querySelector("[data-delivery-form]");
    deliveryForm.elements.deliveryFee.value = current.deliveryFee;
    deliveryForm.addEventListener("submit", function (event) {
      event.preventDefault();
      saveSettings(Object.assign({}, settings(), { deliveryFee: Number(deliveryForm.elements.deliveryFee.value) || 0 }));
      window.alert("Frais de livraison enregistrés.");
    });
    var emailForm = document.querySelector("[data-email-form]");
    emailForm.elements.resendEnabled.checked = !!current.resendEnabled;
    emailForm.elements.notifyEmail.value = current.notifyEmail || "";
    emailForm.addEventListener("submit", function (event) {
      event.preventDefault();
      saveSettings(Object.assign({}, settings(), { resendEnabled: emailForm.elements.resendEnabled.checked, notifyEmail: emailForm.elements.notifyEmail.value.trim() }));
      window.alert("Préférences de notification enregistrées.");
    });
  }

  var page = document.body.dataset.adminPage;
  if (page) {
    if (!isLoggedIn()) { window.location.href = "/admin/login/"; return; }
    wireChrome();
    if (page === "dashboard") renderDashboard();
    else if (page === "products") renderProducts();
    else if (page === "promo-codes") renderPromoCodes();
    else if (page === "orders") renderOrders();
    else if (page === "settings") renderSettings();
  } else {
    initLoginPage();
  }
}());
