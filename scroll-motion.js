(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const pageGroups = {
    home: [
      ['.scenario-intro', ['.section-head', '.feature-card']],
      ['.adaptive', ['.adaptive-heading', '.scenario-card']],
      ['.simple-use', ['.simple-use-stage', '.simple-use-features']],
      ['.capture-moments', ['.capture-heading', '.capture-carousel']],
      ['.how', ['.how-title', '.how-step']],
      ['.shell-showcase', ['.shell-showcase-header', '.shell-collection-viewport', '.shell-benefit']],
      ['.personalized-gifts', ['.personalized-gifts-image', '.personalized-gifts-content']],
      ['.supported-models', ['.supported-models-heading', '.supported-model-card']],
      ['.final-promo', ['.final-promo-heading', '.final-promo-visual']],
    ],
    about: [
      ['.about-platform', ['.about-heading', '.platform-illustration', '.platform-content > p']],
      ['.about-bits', ['.about-heading', '.bits-visual']],
      ['.about-physical', ['.about-heading', '.physical-visual', '.physical-copy']],
    ],
    product: [
      ['.product-purchase', ['.product-gallery', '.product-meta', '.colour-picker', '.quantity-picker', '.purchase-actions', '.payment-methods']],
      ['.product-size', ['.feature-heading', '.size-visual']],
      ['.product-fashion', ['.feature-heading', '.fashion-images > img']],
      ['.product-ways', ['.feature-heading', '.way-panel']],
      ['.product-gift-set', ['.feature-heading', '.gift-components', '.gift-lifestyle']],
      ['.personalized-banner', ['.personalized-image', '.personalized-copy']],
    ],
  };

  const groups = document.body.classList.contains('home-page')
    ? pageGroups.home
    : document.querySelector('.about-page')
      ? pageGroups.about
      : document.querySelector('.product-page')
        ? pageGroups.product
        : [];

  const revealItems = [];

  groups.forEach(([groupSelector, itemSelectors]) => {
    const group = document.querySelector(groupSelector);
    if (!group) return;

    let order = 0;
    itemSelectors.forEach((selector) => {
      group.querySelectorAll(selector).forEach((item) => {
        if (item.classList.contains('scroll-fade-item')) return;
        item.classList.add('scroll-fade-item');
        item.style.setProperty('--scroll-fade-order', String(order));
        revealItems.push(item);
        order += 1;
      });
    });
  });

  const footer = document.querySelector('.site-footer');
  if (footer) {
    const footerItems = footer.querySelectorAll([
      '.site-footer-brand > *',
      '.site-footer-contact > *',
      '.site-footer-social > *',
      '.site-footer-bottom > *',
    ].join(','));

    footerItems.forEach((item, index) => {
      item.classList.add('scroll-fade-item');
      item.style.setProperty('--scroll-fade-order', String(index % 6));
      revealItems.push(item);
    });
  }

  if (!revealItems.length) return;
  document.documentElement.classList.add('scroll-fade-ready');

  const pendingItems = new Set(revealItems);
  const reveal = (item) => {
    item.classList.add('is-scroll-fade-visible');
    pendingItems.delete(item);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -6% 0px',
    threshold: 0.08,
  });

  revealItems.forEach((item) => observer.observe(item));

  let scrollFrame;
  const revealPassedItems = () => {
    scrollFrame = undefined;
    const triggerLine = window.innerHeight * .94;
    pendingItems.forEach((item) => {
      if (item.getBoundingClientRect().top <= triggerLine) {
        reveal(item);
        observer.unobserve(item);
      }
    });
  };

  const queuePassedItemCheck = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(revealPassedItems);
  };

  window.addEventListener('scroll', queuePassedItemCheck, { passive: true });
  window.addEventListener('resize', queuePassedItemCheck, { passive: true });
  queuePassedItemCheck();
})();
