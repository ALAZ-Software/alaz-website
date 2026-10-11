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
//  - reveals: data-reveal="lines" (masked line rise), "fade" (rise), "line" (hairline draw),
//             "wipe" (media opens from the left behind a hot edge)
//  - header: transparent at the top, solid after 40px, hidden while scrolling down
//  - page transitions: a curtain closes on link click and opens when the next page mounts
//  - custom cursor + magnetic buttons on fine pointers
//  - kinetic wordmark: Archivo's width axis follows the scroll and the pointer
//  - curtain footer: the footer content slides up to reveal the wordmark block, which warms and settles
//  - stacking blocks: [data-stack] items stick and the next one slides over the last (desktop)
//  - cover morph: a clicked cover lifts above the curtain and lands on the next page's hero image
//  - heat haze: [data-haze] type ripples while the page is pushed (scroll or pointer energy)
//  - heat trail: the pointer leaves a thin line that cools from white-hot to ember (fine pointers)
//  - reading progress bar
// Everything is skipped under prefers-reduced-motion; the CSS then keeps content visible.

const EASE = 'expo.out';
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const motionBus = { lenis: null, closeCurtain: null, morph: null };

// The footer's wordmark block is sticky under the footer content; it is uncovered while the content's
// bottom edge travels from the viewport bottom up to the block's height. ScrollTrigger must measure the
// scrolling block (.footer-top), never the sticky one: a sticky element's own position lies to it.
function footerReveal(scope) {
  const top = scope.querySelector('.site-footer .footer-top');
  const bottom = scope.querySelector('.site-footer .footer-bottom');
  if (!top || !bottom) return null;
  return { trigger: top, start: 'bottom bottom', end: () => `bottom bottom-=${bottom.offsetHeight}`, scrub: true };
}

function setupReveals(scope, { late = false } = {}) {
  const triggerFor = (el, start) => ({ trigger: el, start });

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
        ...triggerFor(el, 'top 88%'),
        once: true,
        onEnter: () => gsap.to(inners, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.07, delay: Number(el.dataset.delay || 0), onComplete: () => { split.revert(); el.removeAttribute('data-reveal'); } }),
      });
    });

    scope.querySelectorAll('[data-reveal="fade"]:not(.is-revealed)').forEach((el) => {
      el.classList.add('is-revealed');
      gsap.set(el, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        ...triggerFor(el, 'top 90%'),
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: EASE, delay: Number(el.dataset.delay || 0), clearProps: 'transform', onComplete: () => el.removeAttribute('data-reveal') }),
      });
    });

    scope.querySelectorAll('[data-reveal="line"]:not(.is-revealed)').forEach((el) => {
      el.classList.add('is-revealed');
      el.style.setProperty('--draw', 0);
      ScrollTrigger.create({
        ...triggerFor(el, 'top 92%'),
        once: true,
        onEnter: () => gsap.to(el, { '--draw': 1, duration: 1.2, ease: 'power3.out', onComplete: () => el.removeAttribute('data-reveal') }),
      });
    });

    // Media opens from the left; the ember line on its edge fades once the image is fully open.
    scope.querySelectorAll('[data-reveal="wipe"]:not(.is-revealed)').forEach((el) => {
      el.classList.add('is-revealed');
      el.style.setProperty('--wipe', 0);
      el.style.setProperty('--edge', 1);
      ScrollTrigger.create({
        ...triggerFor(el, 'top 85%'),
        once: true,
        onEnter: () => gsap.timeline({ delay: Number(el.dataset.delay || 0), onComplete: () => el.removeAttribute('data-reveal') })
          .to(el, { '--wipe': 100, duration: 1.3, ease: EASE })
          .to(el, { '--edge': 0, duration: 0.5, ease: 'power2.out' }, '-=0.55'),
      });
    });

    // The footer warms as the page ends: ink -> deep ember, over the footer's full height.
    // (Once per page: skipped when this pass only picks up elements that arrived late.)
    const footer = late ? null : scope.querySelector('.site-footer');
    const main = scope.querySelector('main');
    if (footer && main) gsap.fromTo(footer, { backgroundColor: '#0a0a0a' }, { backgroundColor: '#160c06', ease: 'none', scrollTrigger: { trigger: main, start: 'bottom bottom', end: () => `bottom bottom-=${footer.offsetHeight}`, scrub: true } });
    // The wordmark rises into its crop as the curtain opens.
    const reveal = late ? null : footerReveal(scope);
    const mark = scope.querySelector('.site-footer .footer-mark');
    if (reveal && mark) gsap.fromTo(mark, { y: 36 }, { y: 0, ease: 'none', scrollTrigger: reveal });

    // Parallax on tall media blocks.
    scope.querySelectorAll('[data-parallax]:not([data-parallax-on])').forEach((el) => {
      el.setAttribute('data-parallax-on', '');
      const amount = Number(el.dataset.parallax || 8);
      gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }, scope);
  return ctx;
}

// Kinetic wordmark. Each letter is a .k span; its Archivo width axis is driven by two things:
//  - scroll: the hero mark compresses (100 -> 78) as its section leaves; the footer mark arrives
//    compressed and settles to 100 as the page ends,
//  - the pointer (fine pointers only): letters near it widen by up to 22 and spring back.
// Nothing ever grows wider than the design width except under the pointer, so fit() stays valid.
function setupKinetic() {
  const marks = [...document.querySelectorAll('[data-kinetic]')];
  if (!marks.length) return () => {};
  const fine = window.matchMedia('(pointer: fine)').matches;
  const reveal = footerReveal(document);
  const pointer = { x: -1e4, y: -1e4 };

  const items = marks.map((el) => {
    const state = { el, chars: [], cur: [], boost: [], base: 100, active: false };
    const collect = () => { state.chars = [...el.querySelectorAll('.k')]; state.cur = state.chars.map(() => NaN); state.boost = state.chars.map(() => 0); };
    collect();
    state.collect = collect;
    if (el.dataset.kinetic === 'settle' && reveal) {
      ScrollTrigger.create({ ...reveal, onUpdate: (st) => { state.base = 88 + 12 * st.progress; } });
      state.base = 88;
    } else {
      ScrollTrigger.create({ trigger: el.closest('section') || el, start: 'top top', end: 'bottom top', scrub: true, onUpdate: (st) => { state.base = 100 - 22 * st.progress; } });
    }
    state.io = new IntersectionObserver(([entry]) => { state.active = entry.isIntersecting; }, { rootMargin: '50px' });
    state.io.observe(el);
    return state;
  });

  const tick = () => {
    items.forEach((s) => {
      if (!s.active) return;
      // The line reveal (SplitText) swaps the letters out and back; re-collect when they went stale.
      if (!s.chars.length || !s.chars[0].isConnected) s.collect();
      const rects = fine ? s.chars.map((c) => c.getBoundingClientRect()) : null;
      s.chars.forEach((c, i) => {
        let target = 0;
        if (rects) {
          const r = rects[i];
          const dist = Math.hypot((pointer.x - (r.left + r.width / 2)) / (r.width * 1.6), (pointer.y - (r.top + r.height / 2)) / (r.height * 1.2));
          target = 22 * Math.max(0, 1 - dist);
        }
        s.boost[i] += (target - s.boost[i]) * 0.14;
        const w = s.base + s.boost[i];
        if (Math.abs(w - s.cur[i]) > 0.05 || Number.isNaN(s.cur[i])) { s.cur[i] = w; c.style.fontVariationSettings = `'wdth' ${w.toFixed(2)}`; }
      });
    });
  };
  gsap.ticker.add(tick);
  const onMove = (e) => { pointer.x = e.clientX; pointer.y = e.clientY; };
  const onLeave = () => { pointer.x = -1e4; pointer.y = -1e4; };
  if (fine) { window.addEventListener('pointermove', onMove, { passive: true }); document.documentElement.addEventListener('mouseleave', onLeave); }
  return () => {
    gsap.ticker.remove(tick);
    items.forEach((s) => { s.io.disconnect(); s.chars.forEach((c) => { c.style.fontVariationSettings = ''; }); });
    if (fine) { window.removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('mouseleave', onLeave); }
  };
}

// Stacking blocks. [data-stack] holds [data-stack-item] children, each wrapping a [data-stack-inner].
// Desktop only; the class that makes them sticky is added here, so no-JS and reduced motion get a
// plain list. "peek": every covered item keeps its number and title showing, so the steps build up
// into an index. "cover": tall blocks stick by their bottom edge and the next one covers the last.
// Sticky items report their stuck position, so every scroll position is computed from the layout:
// the stack's top plus the heights of the items before (sticky never changes a height).
function setupStacks(scope) {
  const stacks = [...scope.querySelectorAll('[data-stack]')];
  if (!stacks.length) return () => {};
  // gsap.matchMedia undoes everything (class, inline styles, tweens) when the window drops below desktop.
  const mm = gsap.matchMedia(scope);
  mm.add('(min-width: 1001px)', () => {
    const offs = [];
    stacks.forEach((stack) => {
      const items = [...stack.children].filter((el) => el.hasAttribute('data-stack-item'));
      if (items.length < 2) return;
      const peek = stack.dataset.stack === 'peek';
      stack.classList.add('is-stacking');
      const tops = [];
      const peekOf = (el) => { const title = el.querySelector('h3'); return title ? Math.round(title.offsetTop + title.offsetHeight + 18) : 96; };
      const layout = () => {
        items.forEach((el) => { el.style.minHeight = ''; });
        const natural = items.map((el) => el.offsetHeight);
        const base = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76) + 24;
        let acc = base;
        items.forEach((el, i) => {
          const top = Math.min(peek ? acc : base, window.innerHeight - natural[i]);
          tops[i] = top;
          el.style.top = `${top}px`;
          el.style.zIndex = String(i + 1);
          if (peek) acc += peekOf(el);
        });
        // Every item ends on the same line, so the finished stack leaves the screen as one block
        // instead of folding up from the bottom as the list runs out.
        const line = Math.max(...items.map((el, i) => tops[i] + natural[i]));
        items.forEach((el, i) => { el.style.minHeight = `${line - tops[i]}px`; });
      };
      const layoutTop = (i) => {
        const cs = getComputedStyle(stack);
        let y = stack.getBoundingClientRect().top + window.scrollY + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop);
        for (let j = 0; j < i; j++) y += items[j].offsetHeight;
        return y;
      };
      layout();
      ScrollTrigger.addEventListener('refreshInit', layout);
      items.slice(0, -1).forEach((el, i) => {
        const inner = el.querySelector('[data-stack-inner]') || el;
        gsap.fromTo(inner, { opacity: 1, scale: 1 }, {
          opacity: peek ? 0.38 : 0.22,
          scale: peek ? 1 : 0.94,
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: { start: () => layoutTop(i + 1) - window.innerHeight, end: () => layoutTop(i + 1) - tops[i + 1], scrub: true, invalidateOnRefresh: true },
        });
      });
      offs.push(() => {
        ScrollTrigger.removeEventListener('refreshInit', layout);
        stack.classList.remove('is-stacking');
        items.forEach((el) => { el.style.top = ''; el.style.zIndex = ''; el.style.minHeight = ''; });
      });
    });
    return () => offs.forEach((off) => off());
  });
  return () => mm.revert();
}

// Cover morph, part one: copy the first visible [data-morph] cover into a fixed box above the curtain.
function liftCover(candidates) {
  const src = candidates.find((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return r.width > 40 && r.height > 24 && Number(cs.opacity) > 0.5 && cs.visibility !== 'hidden' && el.querySelector('img');
  });
  const img = src?.querySelector('img');
  if (!img || !(img.currentSrc || img.src)) return null;
  const r = src.getBoundingClientRect(); const cs = getComputedStyle(src);
  // The work index preview is tilted on hover; keep the tilt and straighten it in flight.
  const m = cs.transform && cs.transform !== 'none' ? new DOMMatrixReadOnly(cs.transform) : null;
  const w = src.offsetWidth; const h = src.offsetHeight;
  const box = document.createElement('div');
  box.className = 'morph';
  box.setAttribute('aria-hidden', 'true');
  const pic = document.createElement('img');
  pic.alt = ''; pic.decoding = 'sync'; pic.src = img.currentSrc || img.src;
  box.appendChild(pic);
  document.body.appendChild(box);
  gsap.set(box, { left: r.left + r.width / 2 - w / 2, top: r.top + r.height / 2 - h / 2, width: w, height: h, rotation: m ? (Math.atan2(m.b, m.a) * 180) / Math.PI : 0 });
  return { box, ratio: h / w };
}

// Cover morph, part two: fly the box onto the new page's [data-morph-target], then hand over to it.
function landCover(morph, target) {
  const { box } = morph;
  const handOver = () => {
    if (target) target.style.visibility = '';
    gsap.to(box, { opacity: 0, duration: 0.35, ease: 'power2.out', onComplete: () => box.remove() });
  };
  if (!target) { handOver(); return; }
  const r = target.getBoundingClientRect();
  gsap.to(box, { left: r.left, top: r.top, width: r.width, height: r.height, rotation: 0, duration: 0.95, ease: 'expo.inOut', onComplete: handOver });
}

// Heat haze. One SVG displacement filter, switched on only while there is energy: the page being
// scrolled (Lenis velocity) or the pointer moving over a hazy element's section. At rest the filter
// is removed, so idle pages pay nothing for it.
function setupHaze(lenis) {
  const els = [...document.querySelectorAll('[data-haze]')];
  if (!els.length) return () => {};
  let svg = document.getElementById('alaz-haze-defs');
  if (!svg) {
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'alaz-haze-defs';
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.innerHTML = '<filter id="alaz-haze" x="-4%" y="-14%" width="108%" height="128%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>';
    document.body.appendChild(svg);
  }
  const turbulence = svg.querySelector('feTurbulence');
  const displace = svg.querySelector('feDisplacementMap');
  const visible = new Set();
  const io = new IntersectionObserver((entries) => entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))));
  els.forEach((el) => io.observe(el));
  let energy = 0; let pointer = 0; let last = null; let applied = false; let phase = 0;
  const onMove = (e) => {
    if (last) {
      const over = [...visible].some((el) => { const r = (el.closest('section') || el).getBoundingClientRect(); return e.clientY >= r.top && e.clientY <= r.bottom; });
      if (over) pointer = Math.min(1, pointer + Math.hypot(e.clientX - last.x, e.clientY - last.y) / 420);
    }
    last = { x: e.clientX, y: e.clientY };
  };
  const tick = () => {
    pointer *= 0.9;
    const target = Math.max(Math.min(1, Math.abs(lenis?.velocity || 0) / 28), pointer * 0.6);
    energy += (target - energy) * (target > energy ? 0.22 : 0.07);
    const scale = energy * 9;
    const on = scale > 0.3 && visible.size > 0;
    if (on !== applied) { els.forEach((el) => { el.style.filter = on ? 'url(#alaz-haze)' : ''; }); applied = on; }
    if (!on) return;
    phase += 0.05;
    displace.setAttribute('scale', scale.toFixed(2));
    turbulence.setAttribute('baseFrequency', `0.006 ${(0.05 + Math.sin(phase) * 0.009).toFixed(4)}`);
  };
  gsap.ticker.add(tick);
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    gsap.ticker.remove(tick);
    io.disconnect();
    window.removeEventListener('pointermove', onMove);
    els.forEach((el) => { el.style.filter = ''; });
  };
}

// Heat trail: a thin line behind the pointer that is white-hot where it was just drawn and cools
// through amber to ember before it disappears (~0.5 s). The canvas only animates while a trail exists;
// screen blending makes it vanish over light surfaces.
function setupTrail() {
  if (!window.matchMedia('(pointer: fine)').matches) return () => {};
  const canvas = document.createElement('canvas');
  canvas.className = 'heat-trail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const g = canvas.getContext('2d');
  const LIFE = 520;
  const HOT = [255, 244, 230]; const SOFT = [255, 180, 84]; const EMBER = [255, 90, 31];
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const colour = (k) => (k > 0.5 ? mix(SOFT, HOT, (k - 0.5) * 2) : mix(EMBER, SOFT, k * 2)).join(',');
  let points = []; let running = false; let dpr = 1;
  const size = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
  };
  const draw = () => {
    const now = performance.now();
    points = points.filter((p) => now - p.t < LIFE);
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, canvas.width, canvas.height);
    if (!points.length) { running = false; return; }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.lineCap = 'round';
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1]; const b = points[i];
      const k = 1 - (now - b.t) / LIFE;
      const c = colour(k);
      g.strokeStyle = `rgba(${c},${(k * 0.2).toFixed(3)})`;
      g.lineWidth = 3 + k * 9;
      g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
      g.strokeStyle = `rgba(${c},${Math.min(1, k * 1.15).toFixed(3)})`;
      g.lineWidth = 0.8 + k * 2;
      g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
    }
    requestAnimationFrame(draw);
  };
  const onMove = (e) => {
    const p = points[points.length - 1];
    if (p && Math.hypot(e.clientX - p.x, e.clientY - p.y) < 2) return;
    points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    if (points.length > 48) points.shift();
    if (!running) { running = true; requestAnimationFrame(draw); }
  };
  size();
  window.addEventListener('resize', size);
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    window.removeEventListener('resize', size);
    window.removeEventListener('pointermove', onMove);
    canvas.remove();
  };
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

  // Scroll engine, header, cursor, heat trail: once per session.
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
    const offTrail = setupTrail();
    return () => {
      offHeader();
      offCursor();
      offTrail();
      gsap.ticker.remove(tick);
      lenis.destroy();
      motionBus.lenis = null;
    };
  }, []);

  // Curtain: close before navigating (called from the Link wrapper), open after the new route mounts.
  useEffect(() => {
    const curtain = document.querySelector('.curtain');
    const mark = curtain?.querySelector('.curtain-mark');
    motionBus.closeCurtain = (done, { from = [] } = {}) => {
      if (reduced() || !curtain) { done(); return; }
      const morph = from.length ? liftCover(from) : null;
      motionBus.morph = morph;
      const tl = gsap.timeline({ onComplete: done })
        .set(curtain, { transformOrigin: 'bottom' })
        .to(curtain, { scaleY: 1, duration: 0.5, ease: 'expo.inOut' });
      if (morph) {
        // The cover lifts to the middle of the screen while the page closes beneath it.
        const w = Math.min(window.innerWidth * 0.44, 720); const h = w * morph.ratio;
        tl.to(morph.box, { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2, width: w, height: h, rotation: 0, duration: 0.6, ease: 'expo.inOut' }, 0);
        // Safety net: if no new page picks the cover up, it fades away instead of staying on screen.
        setTimeout(() => { if (motionBus.morph === morph) { motionBus.morph = null; landCover(morph, null); } }, 6000);
      } else {
        tl.fromTo(mark, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.15');
      }
    };
    return () => { motionBus.closeCurtain = null; };
  }, []);

  // Per route: reset scroll, open the curtain, wire reveals, the kinetic marks and the progress bar.
  useEffect(() => {
    const lenis = lenisRef.current;
    const curtain = document.querySelector('.curtain');
    const mark = curtain?.querySelector('.curtain-mark');
    ScrollTrigger.getAll().forEach((t) => t.kill());
    if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);

    let ctx; let offKinetic; let offStacks; let offHaze; let observer; let lateTimer;
    const lateCtxs = [];
    const pending = () => document.querySelector('[data-reveal]:not(.is-revealed), [data-parallax]:not([data-parallax-on])');
    const start = () => {
      if (reduced()) {
        document.querySelectorAll('[data-reveal]').forEach((el) => { el.classList.add('is-revealed'); el.removeAttribute('data-reveal'); });
        return;
      }
      ctx = setupReveals(document.body);
      offKinetic = setupKinetic();
      offStacks = setupStacks(document.body);
      offHaze = setupHaze(lenis);
      ScrollTrigger.refresh();
      // Some pages render parts of themselves after hydration (the start-project form waits for its
      // query string, behind a Suspense boundary). Anything with a reveal that shows up later is wired
      // the same way, so it never stays hidden waiting for a pass that already ran.
      observer = new MutationObserver(() => {
        if (lateTimer || !pending()) return;
        lateTimer = setTimeout(() => {
          lateTimer = null;
          if (!pending()) return;
          lateCtxs.push(setupReveals(document.body, { late: true }));
          ScrollTrigger.refresh();
        }, 60);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };

    // A cover lifted on the previous page lands on this page's hero image, which stays hidden
    // (and skips its own reveal) until the cover arrives.
    const morph = motionBus.morph;
    motionBus.morph = null;
    const target = morph ? document.querySelector('[data-morph-target]') : null;
    if (target) { target.removeAttribute('data-reveal'); target.classList.add('is-revealed'); target.style.visibility = 'hidden'; }

    const intro = first.current && document.documentElement.classList.contains('intro');
    if (intro && curtain && !reduced()) {
      // First visit: the mark ignites (grey -> ember -> white) and the curtain lifts.
      const dot = mark.querySelector('.dot');
      try { sessionStorage.setItem('alaz-intro', '1'); } catch { /* private mode */ }
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
      if (morph) landCover(morph, target);
    } else {
      start();
    }
    first.current = false;
    const offProgress = setupProgress(lenis);
    return () => {
      observer?.disconnect(); clearTimeout(lateTimer);
      ctx?.revert(); lateCtxs.forEach((c) => c.revert()); offKinetic?.(); offStacks?.(); offHaze?.(); offProgress();
      document.querySelectorAll('[data-parallax-on]').forEach((el) => el.removeAttribute('data-parallax-on'));
      if (target) target.style.visibility = '';
    };
  }, [pathname]);

  return null;
}
