'use client';

import { useEffect, useState } from 'react';

export default function ReadProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight || 1;
      setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="read-progress" style={{ width: `${progress}%` }} aria-hidden="true" />;
}
