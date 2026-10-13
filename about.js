const filmToggle = document.querySelector('[data-film-toggle]');

filmToggle?.addEventListener('click', () => {
  const isPlaying = filmToggle.classList.toggle('is-playing');
  filmToggle.setAttribute('aria-pressed', String(isPlaying));
  filmToggle.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} XATOM brand film`);
});

const loopVideos = document.querySelectorAll('[data-loop-video]');

const playContinuously = (video) => {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;

  const play = () => {
    if (video.ended) video.currentTime = 0;
    const playback = video.play();
    playback?.catch(() => {});
  };

  const revealVideo = () => {
    video.removeAttribute('poster');
    play();
  };

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) revealVideo();
  else video.addEventListener('loadeddata', revealVideo, { once: true });

  video.addEventListener('ended', () => {
    video.currentTime = 0;
    play();
  });

  return play;
};

const resumeVideo = new Map();
loopVideos.forEach((video) => resumeVideo.set(video, playContinuously(video)));

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) resumeVideo.get(entry.target)?.();
    });
  }, { threshold: 0.05 });

  loopVideos.forEach((video) => videoObserver.observe(video));
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  loopVideos.forEach((video) => resumeVideo.get(video)?.());
});
