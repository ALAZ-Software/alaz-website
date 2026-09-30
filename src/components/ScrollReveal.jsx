'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Adds `is-revealed` to [data-reveal] elements once they enter the viewport (one time each).
// The visual states live in globals.css, so server components only need the data attribute.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('is-revealed');
          observer.unobserve(el);
          // Drop the attribute once the transition is over so it never interferes with hover transitions.
          const delay = parseInt(el.style.getPropertyValue('--reveal-delay'), 10) || 0;
          setTimeout(() => el.removeAttribute('data-reveal'), delay + 800);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
