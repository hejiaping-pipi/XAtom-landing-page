const filmToggle = document.querySelector('[data-film-toggle]');

filmToggle?.addEventListener('click', () => {
  const isPlaying = filmToggle.classList.toggle('is-playing');
  filmToggle.setAttribute('aria-pressed', String(isPlaying));
  filmToggle.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} XATOM brand film`);
});
