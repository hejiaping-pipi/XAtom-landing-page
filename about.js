const syncAboutPreviewScale = () => {
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const isMobile = window.matchMedia('(max-width:767px)').matches;
  const scale = isMobile ? 1 : Math.min(1, viewportWidth / 1440);
  document.documentElement.style.setProperty('--about-preview-scale', String(scale));
};

syncAboutPreviewScale();
window.addEventListener('resize', syncAboutPreviewScale, { passive: true });

const filmToggle = document.querySelector('[data-film-toggle]');
const brandFilm = document.querySelector('[data-brand-film]');
const brandHero = brandFilm?.closest('.about-hero');

if (brandFilm && filmToggle) {
  const syncFilmToggle = () => {
    const isPlaying = !brandFilm.paused && !brandFilm.ended;
    filmToggle.classList.toggle('is-playing', isPlaying);
    filmToggle.setAttribute('aria-pressed', String(isPlaying));
    const chinese = document.documentElement.lang === 'zh-CN';
    filmToggle.setAttribute('aria-label', chinese
      ? `${isPlaying ? '暂停' : '播放'} XATOM 品牌影片`
      : `${isPlaying ? 'Pause' : 'Play'} XATOM brand film`);
  };
  const showFilmCover = () => {
    brandFilm.pause();
    brandHero.classList.remove('is-film-visible');
    syncFilmToggle();
  };
  const playFilm = () => {
    const playback = brandFilm.play();
    playback?.catch((error) => {
      // A deliberate pause may cancel a pending play without losing its frame.
      if (error.name === 'AbortError') syncFilmToggle();
      else showFilmCover();
    });
  };

  brandFilm.addEventListener('playing', () => {
    brandHero.classList.add('is-film-visible');
    syncFilmToggle();
  });
  brandFilm.addEventListener('play', syncFilmToggle);
  brandFilm.addEventListener('pause', syncFilmToggle);
  brandFilm.addEventListener('ended', showFilmCover);
  brandFilm.addEventListener('error', showFilmCover);
  document.addEventListener('xatom-language-change', syncFilmToggle);

  filmToggle.addEventListener('click', () => {
    if (!brandFilm.paused && !brandFilm.ended) {
      brandFilm.pause();
      return;
    }
    if (brandFilm.ended || !brandHero.classList.contains('is-film-visible')) brandFilm.currentTime = 0;
    // Autoplay is muted; a deliberate play/resume action enables the soundtrack.
    brandFilm.muted = false;
    playFilm();
  });

  brandFilm.muted = true;
  brandFilm.defaultMuted = true;
  brandFilm.loop = false;
  brandFilm.playsInline = true;
  syncFilmToggle();
  if (brandFilm.ended) showFilmCover();
  else if (!brandFilm.paused && brandFilm.readyState >= 2) {
    brandHero.classList.add('is-film-visible');
  } else playFilm();
}

const replayVideos = document.querySelectorAll('[data-replay-video]');
const replayTimers = new Map();
const waitingVideos = new Set();

const setupReplayVideo = (video) => {
  const frame = video.parentElement;
  const replayDelay = Number(video.dataset.replayDelay) || 20000;
  const transitionDuration = Number(video.dataset.replayTransition) || 0;
  let transitionFrame;
  let returnAnimation;

  const clearTransition = () => {
    returnAnimation?.cancel();
    returnAnimation = undefined;
    transitionFrame?.remove();
    transitionFrame = undefined;
  };

  const returnToFirstFrame = () => {
    clearTransition();
    if (!transitionDuration || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.currentTime = 0;
      return;
    }

    // Hold the actual last video frame while the video seeks underneath it.
    const snapshot = document.createElement('canvas');
    snapshot.className = 'video-frame-transition';
    snapshot.setAttribute('aria-hidden', 'true');
    snapshot.width = video.videoWidth;
    snapshot.height = video.videoHeight;
    const context = snapshot.getContext('2d');
    if (!context || !snapshot.width || !snapshot.height) {
      video.currentTime = 0;
      return;
    }
    context.drawImage(video, 0, 0);
    transitionFrame = snapshot;
    frame.append(snapshot);
    video.addEventListener('seeked', () => {
      if (transitionFrame !== snapshot) return;
      returnAnimation = snapshot.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: transitionDuration,
        easing: 'cubic-bezier(.4, 0, .2, 1)',
        fill: 'forwards',
      });
      returnAnimation.finished.then(() => {
        if (transitionFrame === snapshot) clearTransition();
      }).catch(() => {});
    }, { once: true });
    video.currentTime = 0;
  };

  video.muted = true;
  video.defaultMuted = true;
  video.loop = false;
  video.playsInline = true;

  const play = () => {
    clearTransition();
    waitingVideos.delete(video);
    frame?.classList.remove('is-replay-waiting');
    video.currentTime = 0;
    const playback = video.play();
    playback?.catch(() => {});
  };

  video.addEventListener('ended', () => {
    waitingVideos.add(video);
    frame?.classList.add('is-replay-waiting');
    video.pause();
    returnToFirstFrame();
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
