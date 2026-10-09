(function () {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    root.classList.add('g-motion');
    revealItems.forEach(item => observer.observe(item));
    reduced.addEventListener('change', event => {
      if (event.matches) { root.classList.remove('g-motion'); observer.disconnect(); }
    });
  }

  const menu = document.getElementById('g-menu');
  const toggle = document.querySelector('.g-menu-toggle');
  let closeTimer;
  function finishClose() {
    if (menu.open) menu.close();
    menu.classList.remove('is-open');
    document.body.classList.remove('g-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus({ preventScroll: true });
  }
  function closeMenu(immediate) {
    clearTimeout(closeTimer);
    menu.classList.remove('is-open');
    if (immediate || reduced.matches) finishClose();
    else closeTimer = setTimeout(finishClose, 300);
  }
  toggle.addEventListener('click', () => {
    clearTimeout(closeTimer);
    menu.showModal();
    document.body.classList.add('g-menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
  });
  menu.querySelector('.g-menu-close').addEventListener('click', () => closeMenu(false));
  menu.addEventListener('cancel', event => { event.preventDefault(); closeMenu(false); });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu(true);
    if (event.target === menu) {
      const bounds = menu.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right) closeMenu(false);
    }
  });
  window.matchMedia('(min-width: 1025px)').addEventListener('change', event => {
    if (event.matches && menu.open) closeMenu(true);
  });
  document.querySelectorAll('.g-desktop-nav a, .g-menu nav a').forEach(link => {
    if (link.pathname === location.pathname && !link.hash) link.setAttribute('aria-current', 'page');
  });

  const topButton = document.querySelector('.g-top');
  const updateTop = () => { topButton.hidden = window.scrollY < 500; };
  window.addEventListener('scroll', updateTop, { passive: true });
  updateTop();
  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced.matches ? 'instant' : 'smooth' });
  });

  const quotes = [...document.querySelectorAll('[data-quote]')];
  let quoteIndex = 0;
  function showQuote(index) {
    quoteIndex = (index + quotes.length) % quotes.length;
    quotes.forEach((quote, i) => {
      quote.classList.toggle('is-active', i === quoteIndex);
      quote.setAttribute('aria-hidden', String(i !== quoteIndex));
    });
    document.querySelector('[data-quote-count]').textContent = '0' + (quoteIndex + 1) + ' / 0' + quotes.length;
  }
  if (quotes.length) {
    document.querySelector('[data-quote-prev]').addEventListener('click', () => showQuote(quoteIndex - 1));
    document.querySelector('[data-quote-next]').addEventListener('click', () => showQuote(quoteIndex + 1));
  }

  document.querySelectorAll('.g-faq-list details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open) detail.parentElement.querySelectorAll('details').forEach(other => {
        if (other !== detail) other.open = false;
      });
    });
  });

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    const result = form.querySelector('.g-form-result');
    form.addEventListener('input', event => {
      result.hidden = true;
      if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const message = String(data.get('message') || '').trim();
      if (!name || !message) {
        const field = form.elements.namedItem(!name ? 'name' : 'message');
        field.setCustomValidity('Merci de renseigner ce champ.');
        field.reportValidity();
        return;
      }
      const phoneLink = document.querySelector('.g-contact-phone').href;
      const text = 'Bonjour Rayda, je m’appelle ' + name + '.\n' + data.get('subject') + '\n\n' + message;
      result.querySelector('a').href = phoneLink + '?text=' + encodeURIComponent(text);
      result.hidden = false;
    });
  });
}());
