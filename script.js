const homePage = document.body?.classList.contains('home-page');

if (homePage) {
  const homeArtboardWidth = 1440;
  const syncHomePreviewScale = () => {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const scale = viewportWidth <= 767 ? 1 : Math.min(1, viewportWidth / homeArtboardWidth);
    document.documentElement.style.setProperty('--mobile-diagram-scale', String(Math.min(1, (viewportWidth - 40) / 901)));
    document.documentElement.style.setProperty('--home-preview-scale', String(scale));
  };

  syncHomePreviewScale();
  window.addEventListener('resize', syncHomePreviewScale, { passive: true });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.carousel-arrow').forEach((button) => {
  button.addEventListener('pointerenter', () => button.classList.add('is-hovered'));
  button.addEventListener('pointerleave', () => button.classList.remove('is-hovered'));
  button.addEventListener('pointercancel', () => button.classList.remove('is-hovered'));
});

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const homeNavigation = document.querySelector('#home-navigation');
const closeMobileMenu = () => {
  homeNavigation?.classList.remove('is-open');
  mobileMenuToggle?.setAttribute('aria-expanded', 'false');
};
mobileMenuToggle?.addEventListener('click', () => {
  const open = homeNavigation.classList.toggle('is-open');
  mobileMenuToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && homeNavigation?.classList.contains('is-open')) {
    closeMobileMenu();
    mobileMenuToggle.focus();
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

const hero = document.querySelector('.hero');
const heroSlides = hero ? [...hero.querySelectorAll('.hero-slide')] : [];
const heroPageTabs = hero ? [...hero.querySelectorAll('.hero-page-tabs button')] : [];
const heroAutoplayToggle = hero?.querySelector('.hero-autoplay-toggle');

if (heroSlides.length > 1) {
  let activeSlide = Math.max(0, heroSlides.findIndex((slide) => slide.classList.contains('is-active')));
  let carouselTimer;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  };

  const startCarousel = () => {
    if (reduceMotion || document.hidden || carouselTimer) return;
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
  let dragStartOffset = 0;
  let dragged = false;
  let ignoreClick = false;

  const maxTrackOffset = () => Math.max(0, track.scrollWidth - viewportWidth());

  const moveTrack = (nextOffset) => {
    trackOffset = Math.min(Math.max(0, nextOffset), maxTrackOffset());
    track.style.transform = `translateX(${-trackOffset}px)`;
  };

  window.addEventListener('resize', () => moveTrack(trackOffset));

  const moveToCard = (nextIndex) => {
    currentCardIndex = Math.min(Math.max(0, nextIndex), cards.length - 1);
    moveTrack(cards[currentCardIndex].offsetLeft);
  };

  const revealCard = (card) => {
    currentCardIndex = cards.indexOf(card);
    const left = card.offsetLeft;
    const right = left + card.offsetWidth;
    if (left < trackOffset) moveTrack(left);
    else if (right > trackOffset + viewportWidth()) moveTrack(right - viewportWidth());
  };

  const setCardState = (card, expanded) => {
    const button = card.querySelector('.scenario-detail');
    const label = card.querySelector('.scenario-tag').textContent.trim();
    card.classList.toggle('is-expanded', expanded);
    card.setAttribute('aria-expanded', String(expanded));
    button.classList.toggle('is-open', expanded);
    button.setAttribute('aria-label', `${expanded ? 'Close' : 'Open'} ${label} details`);
  };

  const toggleCard = (card) => {
    const willExpand = !card.classList.contains('is-expanded');
    cards.forEach((item) => setCardState(item, item === card && willExpand));
    window.setTimeout(() => revealCard(card), 460);
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => toggleCard(card));
    card.addEventListener('keydown', (event) => {
      if (event.target !== card) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard(card);
      }
    });
  });

  previousButton.addEventListener('click', (event) => {
    event.stopPropagation();
    moveToCard(currentCardIndex - 1);
  });

  nextButton.addEventListener('click', (event) => {
    event.stopPropagation();
    moveToCard(currentCardIndex + 1);
  });

  track.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    dragPointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartOffset = trackOffset;
    dragged = false;
  });

  track.addEventListener('pointermove', (event) => {
    if (event.pointerId !== dragPointerId) return;
    const delta = event.clientX - dragStartX;
    if (!dragged && Math.abs(delta) > 5) {
      dragged = true;
      track.setPointerCapture(dragPointerId);
      track.classList.add('is-dragging');
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
      currentCardIndex = cards.reduce((closestIndex, card, index) => (
        Math.abs(card.offsetLeft - trackOffset) < Math.abs(cards[closestIndex].offsetLeft - trackOffset) ? index : closestIndex
      ), 0);
      ignoreClick = true;
      window.setTimeout(() => { ignoreClick = false; }, 0);
    }
  };

  track.addEventListener('pointerup', finishRoleDrag);
  track.addEventListener('pointercancel', finishRoleDrag);
  track.addEventListener('click', (event) => {
    if (!ignoreClick) return;
    event.preventDefault();
    event.stopPropagation();
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

  const showSimpleUseSlide = (nextIndex) => {
    slides[activeSlide].classList.remove('is-active');
    slides[activeSlide].setAttribute('aria-hidden', 'true');
    activeSlide = (nextIndex + slides.length) % slides.length;
    slides[activeSlide].classList.add('is-active');
    slides[activeSlide].setAttribute('aria-hidden', 'false');
  };

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
  };

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
