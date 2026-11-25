// The header's Boutique button opens the panel of the shop's eight groups under the header (see header.css).
// Escape, a click elsewhere, moving focus out of the panel or scrolling on closes it. Kept apart from the locked
// guidance.js, which still runs the phone menu.
(function () {
  'use strict';
  var toggle = document.querySelector('[data-shop-toggle]');
  var panel = document.getElementById('g-shop-panel');
  if (!toggle || !panel) return;
  var openedAt = 0;

  var isOpen = function () { return !panel.hidden; };
  var open = function () {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    openedAt = window.scrollY;
  };
  var close = function (returnFocus) {
    if (!isOpen()) return;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus({ preventScroll: true });
  };

  // The click is left to bubble, so the social links popover (src/social-menu.js) closes when Boutique opens.
  toggle.addEventListener('click', function () {
    if (isOpen()) close(false); else open();
  });
  // Listening in the capture phase also catches clicks on buttons that stop their own clicks, such as "@ Réseaux",
  // so only one of the two panels is ever open.
  document.addEventListener('click', function (event) {
    if (isOpen() && !panel.contains(event.target) && !toggle.contains(event.target)) close(false);
  }, true);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) close(true);
  });
  panel.addEventListener('focusout', function (event) {
    var next = event.relatedTarget;
    if (next && !panel.contains(next) && !toggle.contains(next)) close(false);
  });
  window.addEventListener('scroll', function () {
    if (isOpen() && Math.abs(window.scrollY - openedAt) > 160) close(false);
  }, { passive: true });
}());
