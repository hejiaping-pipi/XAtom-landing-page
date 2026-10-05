const filmToggle = document.querySelector('[data-film-toggle]');

filmToggle?.addEventListener('click', () => {
  const isPlaying = filmToggle.classList.toggle('is-playing');
  filmToggle.setAttribute('aria-pressed', String(isPlaying));
  filmToggle.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} XATOM brand film`);
});

const aboutMenu = document.querySelector('.about-menu-toggle');
const aboutNavigation = document.querySelector('#about-navigation');
aboutMenu?.addEventListener('click', () => {
  const open = aboutNavigation.classList.toggle('is-open');
  aboutMenu.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && aboutNavigation?.classList.contains('is-open')) {
    aboutNavigation.classList.remove('is-open');
    aboutMenu.setAttribute('aria-expanded', 'false');
    aboutMenu.focus();
  }
});
