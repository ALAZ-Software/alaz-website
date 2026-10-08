'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import Icon from '@/components/Icon';
import { Link, usePathname } from '@/i18n/navigation';
import { motionBus } from '@/components/Motion';
import { cn } from '@/lib/utils';

const NAV_HREFS = ['/services', '/case-studies', '/about', '/blog'];
const NATIVE_LANGUAGE_NAMES = { en: 'English', tr: 'Türkçe' };
const CITIES = [{ label: 'İZMİR', tz: 'Europe/Istanbul' }, { label: 'NEW YORK', tz: 'America/New_York' }];

function useClocks() {
  const [times, setTimes] = useState(() => CITIES.map(() => ''));
  useEffect(() => {
    const tick = () => setTimes(CITIES.map((c) => new Intl.DateTimeFormat('en-GB', { timeZone: c.tz, hour: '2-digit', minute: '2-digit' }).format(new Date())));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return times;
}

// Header: transparent at the top, solid after 40px, hidden while scrolling down (see Motion.jsx).
// The menu is a full-screen overlay with a focus trap, Escape, inert content and a staggered entrance.
export default function Header() {
  const locale = useLocale();
  const otherLocale = locale === 'tr' ? 'en' : 'tr';
  const t = useTranslations('nav');
  const linkLabels = t.raw('linkLabels');
  const links = NAV_HREFS.map((href, i) => ({ href, label: linkLabels[i] }));
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overlay = useRef(null);
  const toggle = useRef(null);
  const times = useClocks();

  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const header = document.querySelector('[data-header]');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    if (header) { header.dataset.open = open ? 'true' : 'false'; if (open) header.dataset.hidden = 'false'; }
    if (!open) return undefined;
    [main, footer].forEach((el) => el?.setAttribute('inert', ''));
    motionBus.lenis ? motionBus.lenis.stop() : (document.body.style.overflow = 'hidden');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panel = overlay.current;
    const items = panel.querySelectorAll('[data-menu-item]');
    if (!reduced) {
      gsap.timeline()
        .fromTo(panel, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.inOut' })
        .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, '-=0.25');
    }
    panel.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { close(); toggle.current?.focus(); }
      if (e.key !== 'Tab') return;
      const focusable = panel.querySelectorAll('a, button');
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      [main, footer].forEach((el) => el?.removeAttribute('inert'));
      motionBus.lenis ? motionBus.lenis.start() : (document.body.style.overflow = '');
    };
  }, [open, close]);

  return <>
    <header data-header data-scrolled="false" data-hidden="false" className="site-header fixed inset-x-0 top-0 z-50 h-[var(--header-h)]">
      <div className="shell h-full grid grid-cols-[1fr_auto_1fr] items-center tablet:grid-cols-[1fr_auto_auto] tablet:gap-[15px]">
        <Link href="/" className="font-display text-[26px] font-black tracking-[-.02em] leading-none w-max mobile:text-[24px]" aria-label="ALAZ home" data-magnetic>ALAZ<span className="dot">.</span></Link>
        <nav className="flex items-center gap-[clamp(26px,3.2vw,52px)] tablet:hidden" aria-label="Main navigation">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return <Link key={link.href} href={link.href} className={cn('nav-link t-meta uppercase text-fg-3 hover:text-fg', isActive && 'text-fg is-active')} aria-current={isActive ? 'page' : undefined}>{link.label}</Link>;
          })}
        </nav>
        <div className="justify-self-end flex items-center gap-[18px] xs:gap-[10px]">
          <Link href={pathname} locale={otherLocale} className="t-meta uppercase text-fg-3 hover:text-fg tablet:hidden" aria-label={`${NATIVE_LANGUAGE_NAMES[otherLocale]}`}>{otherLocale.toUpperCase()}</Link>
          <Link href="/start-project" className="btn !min-h-[46px] !px-[20px] tablet:hidden" data-magnetic>{t('cta')} <Icon name="arrow" size={14} /></Link>
          <button ref={toggle} type="button" className="menu-toggle hidden tablet:flex items-center gap-[10px] t-meta uppercase text-fg" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((v) => !v)}>
            <span>{open ? 'CLOSE' : 'MENU'}</span><Icon name={open ? 'close' : 'plus'} size={18} />
          </button>
        </div>
      </div>
    </header>
    <div id="site-menu" ref={overlay} role="dialog" aria-modal="true" aria-label="Menu" className={cn('site-menu fixed inset-0 z-40 bg-ink flex-col', open ? 'flex' : 'hidden')} style={{ paddingTop: 'var(--header-h)' }}>
      <nav className="shell flex-1 flex flex-col justify-center py-[40px] overflow-y-auto" aria-label="Mobile navigation">
        {links.map((link) => <div key={link.href} className="overflow-hidden"><Link href={link.href} data-menu-item className={cn('block py-[10px] t-display-2 uppercase press', pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'text-fg' : 'text-fg-3 hover:text-fg')}>{link.label}</Link></div>)}
        <div className="overflow-hidden mt-[18px]"><Link href="/start-project" data-menu-item className="btn inline-flex">{t('cta')} <Icon name="arrow" size={14} /></Link></div>
      </nav>
      <div className="shell border-t border-line py-[22px] flex flex-wrap items-center justify-between gap-[16px] t-meta text-fg-3">
        <a href="mailto:hello@alaz.pro" className="text-fg">hello@alaz.pro</a>
        <span className="flex gap-[18px]">{CITIES.map((c, i) => <span key={c.label}>{c.label} {times[i]}</span>)}</span>
        <Link href={pathname} locale={otherLocale} className="text-fg">{otherLocale.toUpperCase()} · {NATIVE_LANGUAGE_NAMES[otherLocale]}</Link>
      </div>
    </div>
  </>;
}
