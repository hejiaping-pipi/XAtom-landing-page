const mobileSiteBreakpoint = window.matchMedia('(max-width:767px)');

document.querySelectorAll('[data-mobile-nav]').forEach((header) => {
  const toggle = header.querySelector('[data-mobile-nav-toggle]');
  const panel = header.querySelector('[data-mobile-nav-panel]');
  const pageLayers = [...document.body.children].filter((element) => (
    element !== header && element.tagName !== 'SCRIPT'
  ));

  const setOpen = (open, { restoreFocus = false } = {}) => {
    const shouldOpen = Boolean(open && mobileSiteBreakpoint.matches);
    header.classList.toggle('is-menu-open', shouldOpen);
    document.documentElement.classList.toggle('mobile-site-nav-open', shouldOpen);
    document.body.classList.toggle('mobile-site-nav-open', shouldOpen);
    pageLayers.forEach((element) => { element.inert = shouldOpen; });
    toggle?.setAttribute('aria-expanded', String(shouldOpen));
    toggle?.setAttribute('aria-label', shouldOpen ? 'Close menu' : 'Open menu');
    if (panel) {
      if (mobileSiteBreakpoint.matches) panel.setAttribute('aria-hidden', String(!shouldOpen));
      else panel.removeAttribute('aria-hidden');
      if (shouldOpen) panel.scrollTop = 0;
    }
    if (!shouldOpen && restoreFocus) toggle?.focus();
  };

  toggle?.addEventListener('click', () => setOpen(!header.classList.contains('is-menu-open')));
  header.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.getAttribute('aria-disabled') === 'true') return;
      setOpen(false);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
      setOpen(false, { restoreFocus: true });
    }
  });
  const resetAcrossBreakpoint = () => setOpen(false);
  if (mobileSiteBreakpoint.addEventListener) mobileSiteBreakpoint.addEventListener('change', resetAcrossBreakpoint);
  else mobileSiteBreakpoint.addListener(resetAcrossBreakpoint);
  setOpen(false);
});
