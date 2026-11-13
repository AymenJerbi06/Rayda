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
}());
