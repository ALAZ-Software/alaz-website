'use client';

import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';

const NAV_HREFS = ['/case-studies', '/blog', '/about', '/about#services'];
const NATIVE_LANGUAGE_NAMES = { en: 'İNGİLİZCE', tr: 'TÜRKÇE' };

export default function Header() {
  const locale = useLocale();
  const otherLocale = locale === 'tr' ? 'en' : 'tr';
  const t = useTranslations('nav');
  const linkLabels = t.raw('linkLabels');
  const links = NAV_HREFS.map((href, i) => ({ href, label: linkLabels[i] }));

  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="wordmark" aria-label="ALAZ home">ALAZ<span className="wordmark-dot">.</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(link => {
          const isActive = !link.href.includes('#') && pathname === link.href;
          return <Link key={link.href} href={link.href} className={`nav-link ${isActive ? 'is-active' : ''}`}>{link.label}</Link>;
        })}
      </nav>
      <div className="header-right">
        <Link href="/" locale={otherLocale} className="lang-toggle" aria-label="Switch language">{otherLocale.toUpperCase()}</Link>
        <Link href="/start-project" className="header-cta">{t('cta')} <ArrowUpRight size={15} strokeWidth={2.2} /></Link>
        <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={25} /> : <Menu size={25} />}</button>
      </div>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">
      {links.map((link, i) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{link.label}<ArrowUpRight size={21} /></Link>)}
      <Link href="/start-project" onClick={() => setOpen(false)}><span className="mono">0{links.length + 1}</span>{t('cta')}<ArrowUpRight size={21} /></Link>
      <Link href="/" locale={otherLocale} onClick={() => setOpen(false)} className="lang-mobile"><span className="mono">↗</span>{otherLocale.toUpperCase()} / {NATIVE_LANGUAGE_NAMES[otherLocale]}</Link>
    </nav>}
  </header>;
}
