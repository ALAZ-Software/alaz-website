'use client';

import { useEffect, useRef } from 'react';

// Decorative loop for sections below the fold. Nothing is downloaded until the video is about
// to scroll into view, it pauses off screen, and it stays on the poster for visitors who ask
// for reduced motion or data saving. Above-the-fold heroes keep a plain autoplaying <video>.
export default function BackgroundVideo({ src, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        video.pause();
        return;
      }
      if (!video.getAttribute('src')) video.src = src;
      video.muted = true;
      video.play().catch(() => {});
    }, { rootMargin: '300px 0px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={ref} poster="/videos/poster.png" className={className} muted loop playsInline preload="none" aria-hidden="true" />;
}
