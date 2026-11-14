// Motion and ease of use, the script half of motion.css. Plain script, no dependencies.
// Each block names the principle it serves. Nothing here is needed to browse or order:
// if it fails or the visitor prefers reduced motion, the site works as before.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };

  // Squash and stretch + follow through: a pressed button springs back past its size.
  document.addEventListener('pointerup', function (event) {
    var button = event.target.closest && event.target.closest('.g-button, .g-text-link, .s-add-secondary');
    if (!button || reduce.matches) return;
    button.classList.remove('m-released');
    void button.offsetWidth;
    button.classList.add('m-released');
    button.addEventListener('animationend', function () { button.classList.remove('m-released'); }, { once: true });
  });

  // Follow through and overlapping action: lists arrive one item after another when they scroll into view.
  var sequences = $$('.s-trust-row, .s-benefits, .s-story-steps, .s-steps-row, .s-checkout-totals');
  if ('IntersectionObserver' in window && !reduce.matches) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('m-in');
        seen.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    sequences.forEach(function (list) { list.classList.add('m-seq'); seen.observe(list); });
  }

  // Pose to pose: each photo change is one clear step, not a blur between two.
  var mainImage = document.querySelector('[data-main-image]');
  if (mainImage && 'MutationObserver' in window) {
    new MutationObserver(function () {
      if (reduce.matches) return;
      mainImage.classList.remove('m-pose');
      void mainImage.offsetWidth;
      mainImage.classList.add('m-pose');
    }).observe(mainImage, { attributes: true, attributeFilter: ['src'] });
    // Doherty threshold: the next photo is fetched before it is asked for, so it shows at once.
    $$('.s-thumbnails button img').forEach(function (thumb, index) {
      if (index === 0 || index > 3) return;
      var next = new Image();
      next.decoding = 'async';
      next.src = thumb.getAttribute('src').replace('/480/', '/');
    });
  }

  // Arcs + exaggerated feedback: a piece added to the selection flies to the bag in a curve, and the bag answers.
  var bag = document.querySelector('.s-selection-toggle');
  var count = bag && bag.querySelector('[data-selection-count]');
  function bump() {
    if (!bag || reduce.matches) return;
    bag.classList.remove('m-bump');
    void bag.offsetWidth;
    bag.classList.add('m-bump');
  }
  if (count && 'MutationObserver' in window) {
    var last = count.textContent;
    new MutationObserver(function () {
      if (count.textContent !== last && Number(count.textContent) > Number(last)) bump();
      last = count.textContent;
    }).observe(count, { childList: true, characterData: true, subtree: true });
  }
  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form.matches || !form.matches('[data-product-form]')) return;
    var submitter = event.submitter;
    if (!submitter || submitter.dataset.intent !== 'cart' || !bag || reduce.matches || !form.checkValidity()) return;
    if (!document.body.animate) return;
    var from = submitter.getBoundingClientRect();
    var to = bag.getBoundingClientRect();
    var photo = document.querySelector('[data-main-image]');
    var dot = document.createElement(photo ? 'img' : 'span');
    if (photo) { dot.src = photo.currentSrc || photo.src; dot.alt = ''; }
    dot.className = 'm-fly';
    document.body.appendChild(dot);
    var x0 = from.left + from.width / 2 - 27, y0 = from.top + from.height / 2 - 27;
    var x1 = to.left + to.width / 2 - 27, y1 = to.top + to.height / 2 - 27;
    // The curve: across at a steady pace, up fast then easing — two eases make an arc.
    var lift = Math.min(160, Math.abs(y1 - y0) * 0.5 + 60);
    var frames = [];
    for (var i = 0; i <= 12; i++) {
      var t = i / 12;
      var x = x0 + (x1 - x0) * t;
      var y = y0 + (y1 - y0) * t - Math.sin(Math.PI * t) * lift;
      frames.push({ transform: 'translate(' + x + 'px,' + y + 'px) scale(' + (1 - 0.6 * t) + ')', opacity: t > 0.9 ? 0.4 : 1 });
    }
    dot.animate(frames, { duration: 620, easing: 'cubic-bezier(.45,.05,.35,1)' }).onfinish = function () { dot.remove(); };
  }, true);

  // Exaggerated feedback: a field that is refused shakes once, so the eye lands on it.
  document.addEventListener('invalid', function (event) {
    var field = event.target;
    if (reduce.matches || !field.classList) return;
    var box = field.closest('label') || field;
    box.classList.remove('m-invalid');
    void box.offsetWidth;
    box.classList.add('m-invalid');
  }, true);

  // Solid drawing in 3D: a card leans slightly toward the pointer, like a photo held in the hand.
  if (finePointer.matches && !reduce.matches) {
    $$('.s-card, .s-category').forEach(function (card) {
      var face = card.querySelector('.s-card-image, .s-category-photo');
      if (!face) return;
      card.addEventListener('pointermove', function (event) {
        var r = face.getBoundingClientRect();
        var px = (event.clientX - r.left) / r.width - 0.5;
        var py = (event.clientY - r.top) / r.height - 0.5;
        face.style.setProperty('--ry', (px * 5).toFixed(2) + 'deg');
        face.style.setProperty('--rx', (-py * 4).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () { face.style.removeProperty('--rx'); face.style.removeProperty('--ry'); });
    });
  }

  // Doherty threshold: a page is fetched the moment a link is aimed at, so the click feels instant.
  var fetched = {};
  function warm(event) {
    var link = event.target.closest && event.target.closest('a[href^="/"]');
    if (!link || link.target === '_blank') return;
    var url = link.getAttribute('href').split('#')[0];
    if (!url || fetched[url] || url === location.pathname) return;
    if (navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || ''))) return;
    fetched[url] = true;
    var hint = document.createElement('link');
    hint.rel = 'prefetch'; hint.href = url; hint.as = 'document';
    document.head.appendChild(hint);
  }
  document.addEventListener('pointerenter', warm, true);
  document.addEventListener('touchstart', warm, { capture: true, passive: true });
  // And a pressed link or order button says "working" straight away.
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a.g-button[href^="/"], a.g-text-link[href^="/"]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || link.getAttribute('href').charAt(1) === '#') return;
    link.classList.add('m-busy');
  });
  window.addEventListener('pageshow', function () { $$('.m-busy').forEach(function (el) { el.classList.remove('m-busy'); }); });

  // Postel's law: accept the phone number however it is typed (spaces, dots, 00216, Arabic digits), then tidy it.
  var arabicDigits = /[٠-٩۰-۹]/g;
  function latinDigits(value) { return value.replace(arabicDigits, function (d) { var c = d.charCodeAt(0); return String(c - (c >= 0x06F0 ? 0x06F0 : 0x0660)); }); }
  function tidyPhone(value) {
    var v = latinDigits(value).replace(/[^\d+]/g, '');
    if (v.indexOf('00') === 0) v = '+' + v.slice(2);
    var digits = v.replace(/\D/g, '');
    if (v.charAt(0) !== '+' && digits.length === 8) return digits.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3');
    if (v.indexOf('+216') === 0 && digits.length === 11) return '+216 ' + digits.slice(3).replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3');
    return v;
  }
  $$('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', function () { if (arabicDigits.test(input.value)) { arabicDigits.lastIndex = 0; input.value = latinDigits(input.value); } });
    input.addEventListener('blur', function () { if (input.value.trim()) { input.value = tidyPhone(input.value); input.dispatchEvent(new Event('input', { bubbles: true })); } });
  });
  $$('input[name="postalCode"]').forEach(function (input) {
    input.addEventListener('blur', function () { input.value = latinDigits(input.value).replace(/\s+/g, ''); });
  });
  $$('input[name="name"], input[name="city"], input[name="address"]').forEach(function (input) {
    input.addEventListener('blur', function () { input.value = input.value.replace(/\s+/g, ' ').trim(); });
  });
})();
