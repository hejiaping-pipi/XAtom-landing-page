const filmToggle = document.querySelector('[data-film-toggle]');

filmToggle?.addEventListener('click', () => {
  const isPlaying = filmToggle.classList.toggle('is-playing');
  filmToggle.setAttribute('aria-pressed', String(isPlaying));
  filmToggle.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} XATOM brand film`);
});

const replayVideos = document.querySelectorAll('[data-replay-video]');
const replayTimers = new Map();
const waitingVideos = new Set();

const setupReplayVideo = (video) => {
  const frame = video.parentElement;
  const replayDelay = Number(video.dataset.replayDelay) || 20000;

  video.muted = true;
  video.defaultMuted = true;
  video.loop = false;
  video.playsInline = true;

  const play = () => {
    waitingVideos.delete(video);
    frame?.classList.remove('is-replay-waiting');
    video.currentTime = 0;
    const playback = video.play();
    playback?.catch(() => {});
  };

  video.addEventListener('ended', () => {
    waitingVideos.add(video);
    frame?.classList.add('is-replay-waiting');
    video.currentTime = 0;
    window.clearTimeout(replayTimers.get(video));
    replayTimers.set(video, window.setTimeout(play, replayDelay));
  });
};

replayVideos.forEach((video) => setupReplayVideo(video));

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.paused && !waitingVideos.has(entry.target)) {
        const playback = entry.target.play();
        playback?.catch(() => {});
      }
    });
  }, { threshold: 0.05 });

  replayVideos.forEach((video) => videoObserver.observe(video));
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  replayVideos.forEach((video) => {
    if (video.paused && !waitingVideos.has(video)) {
      const playback = video.play();
      playback?.catch(() => {});
    }
  });
});
