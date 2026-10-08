'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// One motion system for the whole site:
//  - Lenis smooth scroll on the GSAP ticker, shared with ScrollTrigger
//  - reveals: data-reveal="lines" (masked line rise), "fade" (rise), "line" (hairline draw)
//  - header: transparent at the top, solid after 40px, hidden while scrolling down
//  - page transitions: a curtain closes on link click and opens when the next page mounts
//  - custom cursor + magnetic buttons on fine pointers
//  - reading progress bar
// Everything is skipped under prefers-reduced-motion; the CSS then keeps content visible.

const EASE = 'expo.out';
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const motionBus = { lenis: null, closeCurtain: null };

function setupReveals(scope) {
  const ctx = gsap.context(() => {
    scope.querySelectorAll('[data-reveal="lines"]:not(.is-revealed)').forEach((el) => {
      const split = new SplitText(el, { type: 'lines', linesClass: 'line' });
      split.lines.forEach((line) => {
        const inner = document.createElement('span');
        inner.className = 'line-inner';
        inner.style.display = 'block';
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.appendChild(inner);
      });
      el.classList.add('is-revealed');
      const inners = el.querySelectorAll('.line-inner');
      gsap.set(inners, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => gsap.to(inners, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.07, delay: Number(el.dataset.delay || 0), onComplete: () => { split.revert(); el.removeAttribute('data-reveal'); } }),
      });
    });

    scope.querySelectorAll('[data-reveal="fade"]:not(.is-revealed)').forEach((el) => {
      el.classList.add('is-revealed');
      gsap.set(el, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: EASE, delay: Number(el.dataset.delay || 0), clearProps: 'transform', onComplete: () => el.removeAttribute('data-reveal') }),
      });
    });

    scope.querySelectorAll('[data-reveal="line"]:not(.is-revealed)').forEach((el) => {
      el.classList.add('is-revealed');
      el.style.setProperty('--draw', 0);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => gsap.to(el, { '--draw': 1, duration: 1.2, ease: 'power3.out', onComplete: () => el.removeAttribute('data-reveal') }),
      });
    });

    // The footer warms as the page ends: ink -> deep ember.
    const footer = scope.querySelector('.site-footer');
    if (footer) gsap.fromTo(footer, { backgroundColor: '#0a0a0a' }, { backgroundColor: '#160c06', ease: 'none', scrollTrigger: { trigger: footer, start: 'top bottom', end: 'bottom bottom', scrub: true } });

    // Parallax on tall media blocks.
    scope.querySelectorAll('[data-parallax]').forEach((el) => {
      const amount = Number(el.dataset.parallax || 8);
      gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }, scope);
  return ctx;
}

function setupHeader(lenis) {
  const header = document.querySelector('[data-header]');
  if (!header) return () => {};
  let last = 0;
  const onScroll = ({ scroll, direction }) => {
    header.dataset.scrolled = scroll > 40 ? 'true' : 'false';
    if (header.dataset.open === 'true') return;
    if (scroll > 160 && direction === 1 && scroll > last) header.dataset.hidden = 'true';
    else if (direction === -1 || scroll <= 160) header.dataset.hidden = 'false';
    last = scroll;
  };
  if (lenis) lenis.on('scroll', onScroll);
  else {
    const native = () => onScroll({ scroll: window.scrollY, direction: window.scrollY > last ? 1 : -1 });
    window.addEventListener('scroll', native, { passive: true });
    return () => window.removeEventListener('scroll', native);
  }
  return () => lenis.off('scroll', onScroll);
}

function setupCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return () => {};
  const cursor = document.querySelector('.cursor');
  if (!cursor) return () => {};
  const label = cursor.querySelector('.cursor-label');
  const x = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const y = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  const move = (e) => { x(e.clientX); y(e.clientY); cursor.classList.add('is-active'); };
  const over = (e) => {
    const target = e.target.closest('[data-cursor], a, button, summary, label');
    if (!target) { cursor.classList.remove('is-link', 'is-label'); return; }
    const text = target.getAttribute('data-cursor');
    if (text) { label.textContent = text; cursor.classList.add('is-label'); cursor.classList.remove('is-link'); }
    else { cursor.classList.add('is-link'); cursor.classList.remove('is-label'); }
  };
  const leave = () => cursor.classList.remove('is-active');
  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerover', over, { passive: true });
  document.documentElement.addEventListener('mouseleave', leave);

  // Magnetic buttons: the element follows the pointer a little, then springs back.
  const magnets = [...document.querySelectorAll('[data-magnetic]')].map((el) => {
    const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - (r.left + r.width / 2)) * 0.3);
      my((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.45)' });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
  });

  return () => {
    window.removeEventListener('pointermove', move);
    document.removeEventListener('pointerover', over);
    document.documentElement.removeEventListener('mouseleave', leave);
    magnets.forEach((off) => off());
  };
}

function setupProgress(lenis) {
  const bar = document.querySelector('.read-progress');
  if (!bar) return () => {};
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight || 1;
    bar.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / max))})`;
  };
  if (lenis) { lenis.on('scroll', update); update(); return () => lenis.off('scroll', update); }
  window.addEventListener('scroll', update, { passive: true });
  update();
  return () => window.removeEventListener('scroll', update);
}

export default function Motion() {
  const pathname = usePathname();
  const lenisRef = useRef(null);
  const first = useRef(true);

  // Scroll engine, header, cursor: once per session.
  useEffect(() => {
    if (reduced()) {
      const offHeader = setupHeader(null);
      return offHeader;
    }
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), anchors: true });
    lenisRef.current = lenis;
    motionBus.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const offHeader = setupHeader(lenis);
    const offCursor = setupCursor();
    return () => {
      offHeader();
      offCursor();
      gsap.ticker.remove(tick);
      lenis.destroy();
      motionBus.lenis = null;
    };
  }, []);

  // Curtain: close before navigating (called from the Link wrapper), open after the new route mounts.
  useEffect(() => {
    const curtain = document.querySelector('.curtain');
    const mark = curtain?.querySelector('.curtain-mark');
    motionBus.closeCurtain = (done) => {
      if (reduced() || !curtain) { done(); return; }
      gsap.timeline({ onComplete: done })
        .set(curtain, { transformOrigin: 'bottom' })
        .to(curtain, { scaleY: 1, duration: 0.5, ease: 'expo.inOut' })
        .fromTo(mark, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.15');
    };
    return () => { motionBus.closeCurtain = null; };
  }, []);

  // Per route: reset scroll, open the curtain, wire reveals and the progress bar.
  useEffect(() => {
    const lenis = lenisRef.current;
    const curtain = document.querySelector('.curtain');
    const mark = curtain?.querySelector('.curtain-mark');
    ScrollTrigger.getAll().forEach((t) => t.kill());
    if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);

    let ctx;
    const start = () => {
      if (reduced()) {
        document.querySelectorAll('[data-reveal]').forEach((el) => { el.classList.add('is-revealed'); el.removeAttribute('data-reveal'); });
        return;
      }
      ctx = setupReveals(document.body);
      ScrollTrigger.refresh();
    };

    const intro = first.current && document.documentElement.classList.contains('intro');
    if (intro && curtain && !reduced()) {
      // First visit: the mark ignites (grey -> ember -> white) and the curtain lifts.
      const dot = mark.querySelector('.dot');
      try { sessionStorage.setItem('alaz-intro', '1'); } catch (e) { /* private mode */ }
      gsap.timeline({ onComplete: () => { document.documentElement.classList.remove('intro'); start(); } })
        .set(curtain, { scaleY: 1, transformOrigin: 'top' })
        .fromTo(mark, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE })
        .fromTo(dot, { color: '#3a3a3a' }, { color: '#ff5a1f', duration: 0.35 }, '-=0.1')
        .to(dot, { color: '#fff4e6', duration: 0.25 })
        .to(mark, { opacity: 0, duration: 0.2 }, '+=0.15')
        .to(curtain, { scaleY: 0, duration: 0.7, ease: 'expo.inOut' }, '-=0.05');
    } else if (!first.current && curtain && !reduced()) {
      gsap.timeline({ onStart: start })
        .to(mark, { opacity: 0, duration: 0.2 })
        .set(curtain, { transformOrigin: 'top' })
        .to(curtain, { scaleY: 0, duration: 0.6, ease: 'expo.inOut' }, '-=0.05');
    } else {
      start();
    }
    first.current = false;
    const offProgress = setupProgress(lenis);
    return () => { ctx?.revert(); offProgress(); };
  }, [pathname]);

  return null;
}
