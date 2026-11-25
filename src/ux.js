// Site-wide interaction polish, kept apart from the locked guidance.js, which still runs the reveal
// animations, mobile menu, back-to-top button, FAQ and contact draft exactly as before.
(function () {
  'use strict';

  // The header looks and sits exactly as designed at the top of the page. Once it has scrolled away,
  // a compact copy slides back in whenever the visitor scrolls up (to reach the menu, Boutique or the
  // bag) and tucks away again while they read down the page.
  var header = document.querySelector('.g-header');
  if (header && 'requestAnimationFrame' in window) {
    var floating = false;
    var ticking = false;
    var lastY = window.scrollY;
    var lastWidth = window.innerWidth;
    var staticHeight = header.offsetHeight;

    var setFloating = function (on) {
      if (on === floating) return;
      floating = on;
      // Switching in or out of the floating state must not animate, only showing and hiding it does.
      header.classList.add('is-instant');
      if (on) {
        document.body.style.setProperty('--header-space', staticHeight + 'px');
        document.body.classList.add('has-floating-header');
        header.classList.add('is-floating');
      } else {
        header.classList.remove('is-floating', 'is-shown');
        document.body.classList.remove('has-floating-header');
      }
      void header.offsetHeight;
      header.classList.remove('is-instant');
    };

    var update = function () {
      ticking = false;
      var y = Math.max(0, window.scrollY);
      if (y <= 2) { setFloating(false); lastY = y; return; }
      if (!floating) {
        if (y > staticHeight + 120) setFloating(true);
        lastY = y;
        return;
      }
      // A few pixels of tolerance so a resting thumb or a trackpad wobble doesn't flicker the header.
      if (y < lastY - 8) { header.classList.add('is-shown'); lastY = y; }
      else if (y > lastY + 8) { header.classList.remove('is-shown'); lastY = y; }
    };

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    // Phones fire resize when their address bar slides; only a real width change needs re-measuring.
    window.addEventListener('resize', function () {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      setFloating(false);
      staticHeight = header.offsetHeight;
      update();
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { if (!floating) staticHeight = header.offsetHeight; });
    }
    // Keyboard users tabbing back up into a tucked-away header always see where focus is.
    header.addEventListener('focusin', function () { if (floating) header.classList.add('is-shown'); });
    update();
  }

  // On phones the collection links form one swipeable row; start it with the current collection in view.
  var centerCurrentCollection = function () {
    document.querySelectorAll('.s-collections').forEach(function (row) {
      var current = row.querySelector('[aria-current]');
      if (!current || row.scrollWidth <= row.clientWidth) return;
      var rowBox = row.getBoundingClientRect();
      var box = current.getBoundingClientRect();
      row.scrollLeft += (box.left + box.width / 2) - (rowBox.left + rowBox.width / 2);
    });
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(centerCurrentCollection);
  else centerCurrentCollection();

  // "Voir la capture d'écran" under a review opens the real message, Rayda's screenshot, in a dialog over the page.
  // Without dialog support, or with Ctrl, Cmd, Shift or a middle click, the link opens the picture itself.
  var captureLinks = document.querySelectorAll('a[data-capture]');
  if (captureLinks.length && typeof HTMLDialogElement === 'function') {
    var arabic = (document.documentElement.lang || '').indexOf('ar') === 0;
    var capture = null;
    var opener = null;
    var buildCapture = function () {
      var dialog = document.createElement('dialog');
      dialog.className = 'g-capture';
      dialog.setAttribute('aria-labelledby', 'g-capture-title');
      dialog.innerHTML = '<div class="g-capture-head"><p id="g-capture-title"></p><button type="button" class="s-dialog-close" aria-label="' +
        (arabic ? 'إغلاق الصورة' : 'Fermer la capture d’écran') + '">×</button></div>' +
        '<div class="g-capture-frame"><img alt="" decoding="async" /></div><p class="g-capture-note"></p>';
      document.body.appendChild(dialog);
      capture = { dialog: dialog, title: dialog.querySelector('#g-capture-title'), frame: dialog.querySelector('.g-capture-frame'), image: dialog.querySelector('img'), note: dialog.querySelector('.g-capture-note') };
      // While the screenshot loads, the site's leaf opens and closes in its place (src/leaf.js).
      if (window.IssolatejLeaf) {
        var loading = window.IssolatejLeaf.loader(arabic ? 'جارٍ تحميل الصورة…' : 'Chargement de la capture…', true);
        loading.classList.add('g-capture-loading');
        capture.frame.appendChild(loading);
      }
      var loaded = function () { capture.frame.classList.remove('is-loading'); };
      capture.image.addEventListener('load', loaded);
      capture.image.addEventListener('error', loaded);
      dialog.querySelector('.s-dialog-close').addEventListener('click', function () { dialog.close(); });
      // A click on the dimmed page around the dialog closes it.
      dialog.addEventListener('click', function (event) {
        if (event.target !== dialog) return;
        var box = dialog.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
      });
      dialog.addEventListener('close', function () {
        document.body.classList.remove('s-dialog-open');
        capture.image.removeAttribute('src');
        if (opener) opener.focus({ preventScroll: true });
      });
    };
    Array.prototype.forEach.call(captureLinks, function (link) {
      link.addEventListener('click', function (event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        if (!capture) buildCapture();
        opener = link;
        var size = (link.getAttribute('data-capture') || '').split('x');
        capture.image.width = Number(size[0]) || 900;
        capture.image.height = Number(size[1]) || 1200;
        capture.image.alt = link.getAttribute('data-capture-alt') || '';
        capture.frame.classList.add('is-loading');
        capture.image.src = link.getAttribute('href');
        if (capture.image.complete && capture.image.naturalWidth) capture.frame.classList.remove('is-loading');
        var name = document.createElement('bdi');
        name.className = 'g-review-name';
        name.lang = 'ar';
        name.dir = 'rtl';
        name.textContent = link.getAttribute('data-capture-name') || '';
        capture.title.textContent = '';
        capture.title.appendChild(name);
        capture.title.appendChild(document.createTextNode(' · ' + (link.getAttribute('data-capture-context') || '')));
        capture.note.textContent = link.getAttribute('data-capture-note') || '';
        capture.dialog.showModal();
        capture.frame.scrollTop = 0;
        document.body.classList.add('s-dialog-open');
      });
    });
  }
}());
