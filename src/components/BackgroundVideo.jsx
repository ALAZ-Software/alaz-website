'use client';

import { useEffect, useRef } from 'react';

// Looping background media, poster first. The video file is only requested once the element
// is near the viewport, never under prefers-reduced-motion or a data-saver connection, and it
// pauses while off screen. The source is picked in JS (Chromium ignores <source media>):
//   sources = { h264: { 720, 1080, 1440 }, av1?: { 720, 1080, 1440 } }  (paths to .mp4 files)
// Encode the files with scripts/video-encode.sh so their blacks match the page ink.
export default function BackgroundVideo({ poster, sources, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !sources) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection;
    const slow = Boolean(conn?.saveData) || /(^|-)[23]g$/.test(conn?.effectiveType || '');
    if (reduced || slow) return undefined;
    video.muted = true;

    const pick = () => {
      const px = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
      return px > 2200 ? '1440' : px > 1100 ? '1080' : '720';
    };
    const load = () => {
      if (video.dataset.loaded) return;
      const av1 = sources.av1 && video.canPlayType('video/mp4; codecs="av01.0.08M.10"') !== '';
      const set = (av1 && sources.av1) || sources.h264 || {};
      const size = pick();
      video.src = set[size] || set['1080'] || set['720'] || set['1440'] || '';
      video.dataset.loaded = 'true';
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { load(); video.play().catch(() => {}); } else video.pause();
    }, { rootMargin: '200px' });
    io.observe(video);
    return () => { io.disconnect(); video.pause(); };
  }, [sources]);

  return <video ref={ref} className={`bg-video ${className}`} poster={poster} muted loop playsInline preload="none" disablePictureInPicture aria-hidden="true" tabIndex={-1} />;
}
