// The leaf in motion, the script half of leaf.css: the curtain between pages, a loader for anything that takes a
// moment, and a bloom for confirmed orders and bookings. Other scripts reach it as window.IssolatejLeaf.
// Plain script, no dependencies. If it fails or the visitor prefers reduced motion, links and forms work as before.
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var curtain = document.querySelector('.lf-curtain');
  var template = curtain && curtain.querySelector('.lf-art');
  var leaving = false;

  // A copy of the leaf drawing, ready to animate.
  function art(extraClass) {
    if (!template) return null;
    var copy = template.cloneNode(true);
    if (extraClass) copy.setAttribute('class', 'lf-art ' + extraClass);
    return copy;
  }

  // Leaving for another page of the site: the curtain grows from the pressed link, then the page changes.
  function go(url, origin) {
    var target = new URL(url, location.href);
    if (!curtain || reduce.matches || leaving) { location.href = target.href; return; }
    leaving = true;
    var x = innerWidth / 2, y = innerHeight / 2;
    if (origin && typeof origin.clientX === 'number' && (origin.clientX || origin.clientY)) { x = origin.clientX; y = origin.clientY; }
    else if (origin && origin.getBoundingClientRect) { var box = origin.getBoundingClientRect(); x = box.left + box.width / 2; y = box.top + box.height / 2; }
    Array.prototype.forEach.call(document.querySelectorAll('dialog[open]'), function (dialog) { try { dialog.close(); } catch (e) { /* already closing */ } });
    root.style.setProperty('--lf-x', Math.round(x) + 'px');
    root.style.setProperty('--lf-y', Math.round(y) + 'px');
    root.classList.remove('lf-arrive');
    root.classList.add('lf-leave');
    try { sessionStorage.setItem('lf-nav', String(Date.now())); } catch (e) { /* the next page simply opens without the curtain */ }
    setTimeout(function () { location.href = target.href; }, 380);
  }

  function isPageLink(link) {
    if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download') || link.hasAttribute('data-no-curtain')) return false;
    var url;
    try { url = new URL(link.href, location.href); } catch (e) { return false; }
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return false;
    if (/\.[a-z0-9]{2,5}$/i.test(url.pathname) && !/\.html?$/i.test(url.pathname)) return false; // a picture or a file
    if (url.pathname.indexOf('/admin') === 0) return false;
    return !(url.pathname === location.pathname && url.search === location.search); // same page: a jump, not a new page
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!isPageLink(link) || reduce.matches || !curtain) return;
    event.preventDefault();
    go(link.href, event);
  });

  // Back and forward restore a page from memory: it must not come back covered.
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) { leaving = false; root.classList.remove('lf-leave', 'lf-arrive'); }
  });
  // Arriving: leaf.css lifts the curtain on its own; this only tidies up once it is gone.
  if (root.classList.contains('lf-arrive')) setTimeout(function () { root.classList.remove('lf-arrive'); }, 1000);

  // A loader: the leaf opening and closing, with a line saying what is on its way.
  function loader(label, onForest) {
    var box = document.createElement('div');
    box.className = 'lf-loader' + (onForest ? ' on-forest' : '');
    box.setAttribute('role', 'status');
    var drawing = art();
    if (drawing) box.appendChild(drawing);
    if (label) { var text = document.createElement('span'); text.textContent = label; box.appendChild(text); }
    return box;
  }

  // A bloom: the leaf grows above a confirmation message.
  function bloom(container) {
    if (!container || container.querySelector('.lf-bloom')) return;
    var holder = document.createElement('div');
    holder.className = 'lf-bloom';
    holder.setAttribute('aria-hidden', 'true');
    var drawing = art('lf-grow');
    if (!drawing) return;
    holder.appendChild(drawing);
    container.insertBefore(holder, container.firstChild);
  }

  // The basket: each time it opens, a small leaf grows beside its title (the drawer's content is redrawn on open).
  var basketTitle = document.getElementById('s-selection-title');
  if (basketTitle && template) {
    var mark = document.createElement('span');
    mark.className = 'lf-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.appendChild(art('lf-grow'));
    basketTitle.insertBefore(mark, basketTitle.firstChild);
  }

  window.IssolatejLeaf = { go: go, art: art, loader: loader, bloom: bloom };
}());
