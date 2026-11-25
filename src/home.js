// The homepage's chapters (24 November 2026, night), the script half of home.css:
// - the bar of chapters: it sticks under the hero, steps down when the site's header slides in, lights the chapter
//   on screen with a small leaf, and its chips bring a chapter to the top of the screen;
// - the shop's two ways in (by family, by need), as tabs;
// - the clients' messages, one at a time: swipe, the arrows, or the keyboard.
// Plain script. Without it the page still reads top to bottom, with both ways into the shop shown.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var behavior = function () { return reduce.matches ? 'auto' : 'smooth'; };
  var rtl = document.documentElement.dir === 'rtl';
  var header = document.querySelector('.g-header');
  var guide = document.querySelector('[data-home-guide]');

  // Scroll so an element sits just under the bar. Going up, the site's header slides in too, so leave room for it.
  function bringUnderGuide(element, gap) {
    var top = element.getBoundingClientRect().top;
    var offset = (guide ? guide.offsetHeight : 0) + (gap || 14);
    if (top < 0 && header && header.classList.contains('is-floating')) offset += header.offsetHeight;
    window.scrollTo({ top: Math.max(0, window.scrollY + top - offset), behavior: behavior() });
  }

  /* ---------------- The bar of chapters ---------------- */
  if (guide) {
    var hero = guide.previousElementSibling;
    var list = guide.querySelector('.h-guide-list');
    var chips = Array.prototype.slice.call(guide.querySelectorAll('[data-chapter]'));
    var chapters = chips.map(function (chip) { return document.getElementById(chip.getAttribute('data-chapter')); });
    var current = -2;
    var quietUntil = 0;
    var ticking = false;

    var light = function (index) {
      if (index === current) return;
      current = index;
      chips.forEach(function (chip, i) {
        chip.classList.toggle('is-active', i === index);
        if (i === index) chip.setAttribute('aria-current', 'location'); else chip.removeAttribute('aria-current');
      });
      // Keep the lit chip in view inside the bar when the chips run wider than the screen (back to the first one
      // above the chapters).
      var chip = chips[index];
      if (list.scrollWidth <= list.clientWidth) return;
      if (!chip) { list.scrollTo({ left: 0, behavior: behavior() }); return; }
      var box = chip.getBoundingClientRect(), frame = list.getBoundingClientRect();
      list.scrollTo({ left: list.scrollLeft + (box.left + box.width / 2) - (frame.left + frame.width / 2), behavior: behavior() });
    };

    var update = function () {
      ticking = false;
      guide.classList.toggle('is-stuck', !!hero && hero.getBoundingClientRect().bottom <= 0);
      if (header) document.documentElement.style.setProperty('--h-header', (header.classList.contains('is-floating') ? header.offsetHeight : 64) + 'px');
      if (Date.now() < quietUntil) return; // a chip was pressed: the page is travelling there, don't flicker on the way
      var line = window.innerHeight * 0.35;
      var index = -1;
      chapters.forEach(function (section, i) { if (section && section.getBoundingClientRect().top <= line) index = i; });
      light(index);
    };

    chips.forEach(function (chip, i) {
      chip.addEventListener('click', function (event) {
        var section = chapters[i];
        if (!section) return;
        event.preventDefault();
        quietUntil = Date.now() + (reduce.matches ? 0 : 900);
        light(i);
        // Land on the chapter's label (a chapter's box can start under the rounded corner of the one before).
        bringUnderGuide(section.querySelector('.g-eyebrow') || section, 30);
        if (history.replaceState) history.replaceState(null, '', '#' + section.id);
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
      });
    });
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    // When the chips run wider than the screen, the strip fades at the edge where more are waiting.
    var edges = function () {
      var max = list.scrollWidth - list.clientWidth, at = Math.abs(list.scrollLeft);
      list.classList.toggle('more-start', max > 2 && at > 2);
      list.classList.toggle('more-end', max > 2 && at < max - 2);
    };
    list.addEventListener('scroll', edges, { passive: true });
    window.addEventListener('resize', edges);
    edges();
    if ('onscrollend' in window) window.addEventListener('scrollend', function () { quietUntil = 0; update(); });
    update();
  }

  /* ---------------- The shop: by family or by need ---------------- */
  var tablist = document.querySelector('[data-shop-tabs]');
  if (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute('aria-controls')); });
    var select = function (index, options) {
      options = options || {};
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        panels[i].classList.remove('is-in');
        if (on && options.animate && !reduce.matches) { void panels[i].offsetWidth; panels[i].classList.add('is-in'); }
      });
      tablist.setAttribute('data-active', String(index));
      if (options.focus) tabs[index].focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, { animate: true }); });
      tab.addEventListener('keydown', function (event) {
        var step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[event.key];
        var target = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : step ? (i + step + tabs.length) % tabs.length : -1;
        if (target < 0) return;
        event.preventDefault();
        select(target, { animate: true, focus: true });
      });
    });
    // /#chemins and /#creations, the homepage's older addresses, still open the right way in.
    var fromHash = function () {
      for (var i = 0; i < panels.length; i++) if (panels[i] && '#' + panels[i].id === location.hash) return i;
      return -1;
    };
    tablist.hidden = false;
    var start = fromHash();
    select(start > -1 ? start : 0);
    if (start > -1) window.requestAnimationFrame(function () { bringUnderGuide(tablist); });
    window.addEventListener('hashchange', function () {
      var index = fromHash();
      if (index > -1) { select(index, { animate: true }); bringUnderGuide(tablist); }
    });
  }

  /* ---------------- The clients' messages, one at a time ---------------- */
  var reviews = document.querySelector('[data-reviews]');
  if (reviews) {
    var track = reviews.querySelector('[data-reviews-track]');
    var cards = Array.prototype.slice.call(track.querySelectorAll('[data-review]'));
    var prev = reviews.querySelector('[data-reviews-prev]');
    var next = reviews.querySelector('[data-reviews-next]');
    var count = reviews.querySelector('[data-reviews-count]');
    var shown = 0;
    var settle = null;
    var steering = 0;

    // The frame takes the height of the message on show, so a short message leaves no gap under it.
    var fit = function () { if (cards[shown]) track.style.height = cards[shown].offsetHeight + 'px'; };
    var mark = function (index) {
      shown = index;
      count.textContent = String(index + 1);
      fit();
    };
    var go = function (index) {
      var target = cards[(index + cards.length) % cards.length];
      var box = target.getBoundingClientRect(), frame = track.getBoundingClientRect();
      steering = Date.now() + (reduce.matches ? 0 : 900);
      track.scrollTo({ left: track.scrollLeft + (box.left - frame.left), behavior: behavior() });
      mark(cards.indexOf(target));
    };
    prev.hidden = false;
    next.hidden = false;
    prev.addEventListener('click', function () { go(shown - 1); });
    next.addEventListener('click', function () { go(shown + 1); });
    // A swipe (or the keyboard inside the frame): when it settles, the message most in view is the one on show.
    // While the arrows are moving the frame, they decide.
    var nearest = function () {
      if (Date.now() < steering) return;
      var frame = track.getBoundingClientRect(), middle = frame.left + frame.width / 2, best = shown, distance = Infinity;
      cards.forEach(function (card, i) {
        var box = card.getBoundingClientRect(), gap = Math.abs(box.left + box.width / 2 - middle);
        if (gap < distance) { distance = gap; best = i; }
      });
      if (best !== shown) mark(best);
    };
    track.addEventListener('scroll', function () {
      clearTimeout(settle);
      settle = setTimeout(nearest, 90);
    }, { passive: true });
    track.addEventListener('scrollend', function () { steering = 0; nearest(); });
    // Opening a translation makes the message taller.
    track.addEventListener('toggle', fit, true);
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    fit();
  }
}());
