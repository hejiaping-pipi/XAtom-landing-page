const homePage = document.body?.classList.contains('home-page');

if (homePage) {
  const homeArtboardWidth = 1440;
  const syncHomePreviewScale = () => {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const scale = viewportWidth <= 767 ? 1 : Math.min(1, viewportWidth / homeArtboardWidth);
    document.documentElement.style.setProperty('--mobile-diagram-scale', String(Math.min(1, (Math.max(360, viewportWidth) - 40) / 901)));
    document.documentElement.style.setProperty('--home-preview-scale', String(scale));
  };

  syncHomePreviewScale();
  window.addEventListener('resize', syncHomePreviewScale, { passive: true });
}

const setupPageScrollMotion = () => {
  if (!homePage || !('IntersectionObserver' in window)) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;

  const revealGroups = [
    ['.scenario-intro', ['.section-head', '.wide-cards']],
    ['.adaptive', ['.adaptive-heading', '.adaptive-frame']],
    ['.simple-use', ['.simple-use-stage', '.simple-use-features']],
    ['.capture-moments', ['.capture-heading', '.capture-carousel']],
    ['.how', ['.how-title', '.how-step']],
    ['.shell-showcase', ['.shell-showcase-header', '.shell-collection-viewport', '.shell-benefits']],
    ['.personalized-gifts', ['.personalized-gifts-image', '.personalized-gifts-content']],
    ['.supported-models', ['.supported-models-heading', '.supported-model-card']],
    ['.final-promo', ['.final-promo-heading', '.final-promo-visual']],
    ['.home-site-footer', ['.site-footer-top', '.site-footer-bottom']],
  ];

  const revealItems = [];
  revealGroups.forEach(([sectionSelector, itemSelectors]) => {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    let revealIndex = 0;
    itemSelectors.forEach((selector) => {
      section.querySelectorAll(selector).forEach((item) => {
        item.classList.add('scroll-reveal');
        item.style.setProperty('--reveal-order', String(revealIndex));
        if (item.matches('.wide-cards,.adaptive-frame,.simple-use-stage,.capture-carousel,.shell-collection-viewport,.personalized-gifts-image,.final-promo-visual')) {
          item.classList.add('scroll-reveal-media');
        }
        revealItems.push(item);
        revealIndex += 1;
      });
    });
  });

  if (!revealItems.length) return;
  document.documentElement.classList.add('scroll-motion-ready');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-scroll-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12,
  });

  revealItems.forEach((item) => observer.observe(item));
};

// Scroll build-in animations disabled.

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href');
    const target = href.length > 1 ? document.getElementById(href.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.carousel-arrow').forEach((button) => {
  button.addEventListener('pointerenter', () => button.classList.add('is-hovered'));
  button.addEventListener('pointerleave', () => button.classList.remove('is-hovered'));
  button.addEventListener('pointercancel', () => button.classList.remove('is-hovered'));
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const homeNavigation = document.querySelector('#home-navigation');
const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
const homeHeader = document.querySelector('.home-page .nav');
const mobileMenuBreakpoint = window.matchMedia('(max-width:767px)');
const pageLayers = [...document.querySelectorAll('main,footer')];

const setMobileMenuState = (open, { restoreFocus = false } = {}) => {
  const shouldOpen = Boolean(open && mobileMenuBreakpoint.matches);
  homeNavigation?.classList.toggle('is-open', shouldOpen);
  mobileMenuPanel?.classList.toggle('is-open', shouldOpen);
  homeHeader?.classList.toggle('is-menu-open', shouldOpen);
  document.documentElement.classList.toggle('mobile-nav-open', shouldOpen);
  document.body?.classList.toggle('mobile-nav-open', shouldOpen);
  pageLayers.forEach((element) => { element.inert = shouldOpen; });
  mobileMenuToggle?.setAttribute('aria-expanded', String(shouldOpen));
  mobileMenuToggle?.setAttribute('aria-label', shouldOpen ? 'Close menu' : 'Open menu');
  if (mobileMenuPanel) {
    if (mobileMenuBreakpoint.matches) mobileMenuPanel.setAttribute('aria-hidden', String(!shouldOpen));
    else mobileMenuPanel.removeAttribute('aria-hidden');
    if (shouldOpen) mobileMenuPanel.scrollTop = 0;
  }
  if (!shouldOpen && restoreFocus) mobileMenuToggle?.focus();
};

const closeMobileMenu = (options) => setMobileMenuState(false, options);

mobileMenuToggle?.addEventListener('click', () => {
  setMobileMenuState(!homeHeader?.classList.contains('is-menu-open'));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && homeHeader?.classList.contains('is-menu-open')) {
    closeMobileMenu({ restoreFocus: true });
  }
});
const primaryNavigationLinks = [...document.querySelectorAll('.nav-main a')];

primaryNavigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (link.getAttribute('aria-disabled') === 'true') return;
    closeMobileMenu();
    primaryNavigationLinks.forEach((item) => {
      item.classList.remove('is-active');
      item.removeAttribute('aria-current');
    });
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');
  });
});

document.querySelectorAll('.mobile-nav-utility,.wordmark').forEach((link) => {
  link.addEventListener('click', () => closeMobileMenu());
});

const resetMobileMenuAcrossBreakpoint = () => closeMobileMenu();
if (mobileMenuBreakpoint.addEventListener) mobileMenuBreakpoint.addEventListener('change', resetMobileMenuAcrossBreakpoint);
else mobileMenuBreakpoint.addListener(resetMobileMenuAcrossBreakpoint);
setMobileMenuState(false);

const enableMobileSwipe = (surface, changeSlide) => {
  if (!surface) return;
  let gesture;
  surface.style.touchAction = 'pan-y pinch-zoom';
  surface.addEventListener('dragstart', event => event.preventDefault());
  surface.addEventListener('pointerdown', event => {
    if (!window.matchMedia('(max-width:767px)').matches || event.button !== 0 || event.isPrimary === false || event.target.closest('button,a')) return;
    gesture = { id:event.pointerId, x:event.clientX, y:event.clientY };
    surface.setPointerCapture(event.pointerId);
  });
  surface.addEventListener('pointerup', event => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    gesture = null;
    if (surface.hasPointerCapture(event.pointerId)) surface.releasePointerCapture(event.pointerId);
    if (Math.abs(dx) >= 30 && Math.abs(dx) > Math.abs(dy) * 1.3) changeSlide(dx < 0 ? 1 : -1);
  });
  surface.addEventListener('pointercancel', () => { gesture = null; });
  surface.addEventListener('lostpointercapture', () => { gesture = null; });
};

const createMobilePagination = (parent, count, label, selectPage, playback = false) => {
  const control = document.createElement('div');
  control.className = 'mobile-pagination';
  control.setAttribute('role', 'group');
  control.setAttribute('aria-label', label);
  const pages = document.createElement('div');
  pages.className = 'mobile-pagination-pages';
  const buttons = Array.from({ length: count }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Go to slide ${index + 1} of ${count}`);
    button.addEventListener('click', () => selectPage(index));
    pages.append(button);
    return button;
  });
  control.append(pages);
  let playButton;
  if (playback) {
    playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.className = 'mobile-pagination-play';
    playButton.setAttribute('aria-label', 'Pause slideshow');
    const icon = document.createElement('img');
    icon.src = 'assets/home/mobile-pagination-play.svg';
    icon.alt = '';
    playButton.append(icon);
    control.append(playButton);
  }
  parent.append(control);
  const sync = (activeIndex) => buttons.forEach((button, index) => {
    button.classList.toggle('is-active', index === activeIndex);
    if (index === activeIndex) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  sync(0);
  return { sync, playButton };
};

const hero = document.querySelector('.hero');
const heroSlides = hero ? [...hero.querySelectorAll('.hero-slide')] : [];
const heroPageTabs = hero ? [...hero.querySelectorAll('.hero-page-tabs button')] : [];
const heroAutoplayToggle = hero?.querySelector('.hero-autoplay-toggle');

if (heroSlides.length > 1) {
  let activeSlide = Math.max(0, heroSlides.findIndex((slide) => slide.classList.contains('is-active')));
  let carouselTimer;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let playbackPaused = reduceMotion;
  const mobilePages = createMobilePagination(hero, heroSlides.length, 'Hero pages', (index) => {
    showSlide(index);
    restartCarousel();
  }, true);
  const syncPlayback = () => {
    mobilePages.playButton.classList.toggle('is-playing', !playbackPaused);
    mobilePages.playButton.setAttribute('aria-label', playbackPaused ? 'Play slideshow' : 'Pause slideshow');
    mobilePages.playButton.querySelector('img').src = playbackPaused ? 'assets/home/mobile-hero-play.svg' : 'assets/home/mobile-hero-pause.svg';
  };
  mobilePages.playButton.addEventListener('click', () => {
    playbackPaused = !playbackPaused;
    if (playbackPaused) stopCarousel();
    else startCarousel();
    syncPlayback();
  });
  syncPlayback();

  const syncHeroControls = () => {
    heroPageTabs.forEach((tab, index) => {
      const selected = index === activeSlide;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
  };

  const showSlide = (nextIndex) => {
    activeSlide = (nextIndex + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, index) => {
      const selected = index === activeSlide;
      slide.classList.toggle('is-active', selected);
      slide.setAttribute('aria-hidden', String(!selected));
    });
    syncHeroControls();
    mobilePages.sync(activeSlide);
  };

  const startCarousel = () => {
    if (playbackPaused || document.hidden || carouselTimer) return;
    carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 5000);
  };

  const stopCarousel = () => {
    window.clearInterval(carouselTimer);
    carouselTimer = undefined;
  };

  const restartCarousel = () => {
    stopCarousel();
    startCarousel();
  };

  heroPageTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      showSlide(index);
      restartCarousel();
    });
  });

  heroAutoplayToggle?.addEventListener('click', () => {
    showSlide(activeSlide + 1);
    restartCarousel();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCarousel();
    else startCarousel();
  });

  showSlide(activeSlide);
  startCarousel();
}

const adaptiveSection = document.querySelector('.adaptive');

if (adaptiveSection) {
  const track = adaptiveSection.querySelector('.scenario-grid');
  const cards = [...adaptiveSection.querySelectorAll('.scenario-card')];
  const previousButton = adaptiveSection.querySelector('.scenario-previous');
  const nextButton = adaptiveSection.querySelector('.scenario-next');
  const viewportWidth = () => window.matchMedia('(max-width:767px)').matches ? track.parentElement.clientWidth : 1312;
  let trackOffset = 0;
  let currentCardIndex = 0;
  let dragPointerId;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragStartOffset = 0;
  let dragged = false;
  let ignoreClick = false;
  let touchGesture;
  let mobilePages;
  const maxTrackOffset = () => Math.max(0, track.scrollWidth - viewportWidth());
  const moveTrack = (nextOffset) => {
    trackOffset = Math.min(Math.max(0, nextOffset), maxTrackOffset());
    track.style.transform = `translateX(${-trackOffset}px)`;
  };
  window.addEventListener('resize', () => moveTrack(trackOffset));
  const moveToCard = (nextIndex) => {
    currentCardIndex = Math.min(Math.max(0, nextIndex), cards.length - 1);
    moveTrack(cards[currentCardIndex].offsetLeft);
    mobilePages?.sync(currentCardIndex);
  };
  const revealCard = (card) => {
    currentCardIndex = cards.indexOf(card);
    mobilePages?.sync(currentCardIndex);
    const left = card.offsetLeft;
    const right = left + card.offsetWidth;
    if (left < trackOffset) moveTrack(left);
    else if (right > trackOffset + viewportWidth()) moveTrack(right - viewportWidth());
  };
  mobilePages = createMobilePagination(
    adaptiveSection.querySelector('.adaptive-frame'),
    cards.length,
    'Role pages',
    (index) => moveToCard(index),
  );
  const setCardState = (card, expanded) => {
    const button = card.querySelector('.scenario-detail');
    const label = card.querySelector('.scenario-tag').textContent.trim();
    card.classList.toggle('is-expanded', expanded);
    card.setAttribute('aria-expanded', String(expanded));
    button.classList.toggle('is-open', expanded);
    button.setAttribute('aria-label', `${expanded ? 'Close' : 'Open'} ${label} details`);
  };
  const toggleCard = (card) => {
    if (window.matchMedia('(max-width:767px)').matches) return;
    const willExpand = !card.classList.contains('is-expanded');
    cards.forEach((item) => setCardState(item, item === card && willExpand));
    window.setTimeout(() => revealCard(card), 460);
  };
  cards.forEach((card) => {
    card.addEventListener('click', () => toggleCard(card));
    card.addEventListener('keydown', (event) => {
      if (event.target !== card) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); toggleCard(card);
      }
    });
  });
  previousButton.addEventListener('click', (event) => {event.stopPropagation();moveToCard(currentCardIndex - 1);});
  nextButton.addEventListener('click', (event) => {event.stopPropagation();moveToCard(currentCardIndex + 1);});
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch' || event.button !== 0) return;
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragStartOffset = trackOffset;
    dragged = false;
  });
  track.addEventListener('pointermove', (event) => {
    if (event.pointerId !== dragPointerId) return;
    const delta = event.clientX - dragStartX;
    if (!dragged && window.matchMedia('(max-width:767px)').matches && Math.abs(event.clientY - dragStartY) > Math.abs(delta)) return;
    if (!dragged && Math.abs(delta) > 5) {
      dragged = true;track.setPointerCapture(dragPointerId);track.classList.add('is-dragging');
    }
    if (!dragged) return;
    moveTrack(dragStartOffset - delta);
  });
  const finishRoleDrag = (event) => {
    if (event.pointerId !== dragPointerId) return;
    if (track.hasPointerCapture(dragPointerId)) track.releasePointerCapture(dragPointerId);
    track.classList.remove('is-dragging');
    dragPointerId = undefined;
    if (dragged) {
      currentCardIndex = cards.reduce((closestIndex, card, index) => Math.abs(card.offsetLeft - trackOffset) < Math.abs(cards[closestIndex].offsetLeft - trackOffset) ? index : closestIndex, 0);
      if (window.matchMedia('(max-width:767px)').matches) {
        const distance = event.clientX - dragStartX;
        const startIndex = cards.reduce((closestIndex, card, index) => Math.abs(card.offsetLeft - dragStartOffset) < Math.abs(cards[closestIndex].offsetLeft - dragStartOffset) ? index : closestIndex, 0);
        moveToCard(Math.abs(distance) >= 40 ? startIndex + (distance < 0 ? 1 : -1) : startIndex);
      }
      ignoreClick = true;window.setTimeout(() => {ignoreClick = false;}, 0);
    }
  };
  track.addEventListener('pointerup', finishRoleDrag);
  track.addEventListener('pointercancel', finishRoleDrag);
  track.addEventListener('touchstart', (event) => {
    if (!window.matchMedia('(max-width:767px)').matches || event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchGesture = { x: touch.clientX, y: touch.clientY, index: currentCardIndex };
  }, { passive: true });
  track.addEventListener('touchend', (event) => {
    if (!touchGesture || !window.matchMedia('(max-width:767px)').matches) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchGesture.x;
    const dy = touch.clientY - touchGesture.y;
    const startIndex = touchGesture.index;
    touchGesture = undefined;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      moveToCard(startIndex + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  track.addEventListener('touchcancel', () => {
    touchGesture = undefined;
  }, { passive: true });
  track.addEventListener('click', (event) => {
    if (!ignoreClick) return;
    event.preventDefault();event.stopPropagation();
  }, true);
  adaptiveSection.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') moveToCard(currentCardIndex - 1);
    if (event.key === 'ArrowRight') moveToCard(currentCardIndex + 1);
  });
}

const simpleUseSection = document.querySelector('.simple-use');

if (simpleUseSection) {
  const slides = [...simpleUseSection.querySelectorAll('[data-simple-use-slide]')];
  const previousButton = simpleUseSection.querySelector('.simple-use-previous');
  const nextButton = simpleUseSection.querySelector('.simple-use-next');
  let activeSlide = 0;
  const mobilePages = createMobilePagination(simpleUseSection.querySelector('.simple-use-stage'), slides.length, 'Simple use pages', (index) => showSimpleUseSlide(index));

  const showSimpleUseSlide = (nextIndex) => {
    slides[activeSlide].classList.remove('is-active');
    slides[activeSlide].setAttribute('aria-hidden', 'true');
    activeSlide = (nextIndex + slides.length) % slides.length;
    slides[activeSlide].classList.add('is-active');
    slides[activeSlide].setAttribute('aria-hidden', 'false');
    mobilePages.sync(activeSlide);
  };

  enableMobileSwipe(simpleUseSection.querySelector('.simple-use-stage'), (direction) => showSimpleUseSlide(activeSlide + direction));

  previousButton.addEventListener('click', () => showSimpleUseSlide(activeSlide - 1));
  nextButton.addEventListener('click', () => showSimpleUseSlide(activeSlide + 1));

  simpleUseSection.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSimpleUseSlide(activeSlide - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSimpleUseSlide(activeSlide + 1);
    }
  });
}

const captureSection = document.querySelector('.capture-moments');

if (captureSection) {
  const tabs = [...captureSection.querySelectorAll('[data-capture-tab]')];
  const slides = [...captureSection.querySelectorAll('[data-capture-slide]')];
  let activeTab = 0;
  const mobilePages = createMobilePagination(captureSection, slides.length, 'Everyday situations pages', (index) => selectCaptureTab(index));

  const selectCaptureTab = (nextIndex, moveFocus = false) => {
    activeTab = (nextIndex + tabs.length) % tabs.length;

    tabs.forEach((tab, index) => {
      const selected = index === activeTab;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      slides[index].classList.toggle('is-active', selected);
      slides[index].setAttribute('aria-hidden', String(!selected));
    });

    if (moveFocus) tabs[activeTab].focus();
    mobilePages.sync(activeTab);
  };

  enableMobileSwipe(captureSection.querySelector('.capture-carousel'), (direction) => selectCaptureTab(activeTab + direction));

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCaptureTab(index));
    tab.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        selectCaptureTab(activeTab - 1, true);
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        selectCaptureTab(activeTab + 1, true);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        selectCaptureTab(0, true);
      }
      if (event.key === 'End') {
        event.preventDefault();
        selectCaptureTab(tabs.length - 1, true);
      }
    });
  });
}

const shellShowcase = document.querySelector('.shell-showcase');

if (shellShowcase) {
  const viewport = shellShowcase.querySelector('.shell-collection-viewport');
  const previousButton = shellShowcase.querySelector('.shell-previous');
  const nextButton = shellShowcase.querySelector('.shell-next');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cardStep = 234;
  let shellPointerId;
  let shellDragStartX = 0;
  let shellDragStartScroll = 0;

  const moveShells = (direction) => {
    viewport.scrollBy({
      left: direction * cardStep,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  previousButton.addEventListener('click', () => moveShells(-1));
  nextButton.addEventListener('click', () => moveShells(1));

  viewport.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    shellPointerId = event.pointerId;
    shellDragStartX = event.clientX;
    shellDragStartScroll = viewport.scrollLeft;
    viewport.setPointerCapture(shellPointerId);
    viewport.classList.add('is-dragging');
  });

  viewport.addEventListener('pointermove', (event) => {
    if (event.pointerId !== shellPointerId) return;
    viewport.scrollLeft = shellDragStartScroll - (event.clientX - shellDragStartX);
  });

  const finishShellDrag = (event) => {
    if (event.pointerId !== shellPointerId) return;
    if (viewport.hasPointerCapture(shellPointerId)) viewport.releasePointerCapture(shellPointerId);
    viewport.classList.remove('is-dragging');
    shellPointerId = undefined;
  };

  viewport.addEventListener('pointerup', finishShellDrag);
  viewport.addEventListener('pointercancel', finishShellDrag);
}

const simpleStage = document.querySelector('.simple-use-stage');
if (simpleStage && 'ResizeObserver' in window) {
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--mobile-diagram-scale', String(Math.min(1, simpleStage.clientWidth / 901)));
  }).observe(simpleStage);
}
