(() => {
  const menu = document.querySelector('[data-academic-menu]');
  const nav = document.querySelector('[data-academic-nav]');

  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menu?.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });

  document.querySelectorAll('#content p').forEach((paragraph) => {
    const first = paragraph.firstElementChild;
    if (!first || first.tagName !== 'B' || !/^Abstract:/i.test(first.textContent.trim())) return;

    const details = document.createElement('details');
    details.className = 'abstract-details';
    const summary = document.createElement('summary');
    summary.textContent = 'Read abstract';
    const copy = document.createElement('p');
    while (paragraph.firstChild) copy.append(paragraph.firstChild);
    copy.querySelector('b')?.remove();
    details.append(summary, copy);
    paragraph.replaceWith(details);
  });

  const headings = [...document.querySelectorAll('#content h2')];
  headings.forEach((heading) => {
    const parent = heading.parentElement;
    if (!parent || parent.classList.contains('paper-entry')) return;
    const wrapper = document.createElement('section');
    wrapper.className = 'paper-entry';
    heading.before(wrapper);
    wrapper.append(heading);
    let next = wrapper.nextSibling;
    while (next) {
      if (next.nodeType === Node.ELEMENT_NODE && next.matches('h1, h2, hr, .flag_border, a[name]')) break;
      const current = next;
      next = next.nextSibling;
      wrapper.append(current);
    }
  });

  document.querySelectorAll('a[name]').forEach((anchor) => {
    if (!anchor.id) anchor.id = anchor.getAttribute('name');
  });

  const revealItems = document.querySelectorAll('.flag_border, .paper-entry');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  revealItems.forEach((item) => item.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealItems.forEach((item) => observer.observe(item));
})();
