import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const CONTENT = {
  en: {
    links: [
      { label: 'CASE STUDIES', to: '/case-studies' },
      { label: 'BLOG', to: '/blog' },
      { label: 'ABOUT', to: '/about' },
      { label: 'SERVICES', to: '/#services' },
    ],
    cta: 'START A PROJECT',
    ctaTo: '/start-project',
    langLabel: 'TR',
    langTo: '/tr',
  },
  tr: {
    links: [
      { label: 'VAKA ÇALIŞMALARI', to: '/tr/case-studies' },
      { label: 'BLOG', to: '/tr/blog' },
      { label: 'HAKKINDA', to: '/tr/about' },
      { label: 'HİZMETLER', to: '/tr/#services' },
    ],
    cta: 'PROJE BAŞLAT',
    ctaTo: '/tr/start-project',
    langLabel: 'EN',
    langTo: '/',
  },
};

export default function Header({ lang = 'en' }) {
  const t = CONTENT[lang] || CONTENT.en;
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return <header className="site-header">
    <div className="header-inner">
      <Link to={lang === 'tr' ? '/tr' : '/'} className="wordmark" aria-label="ALAZ home">ALAZ<span className="wordmark-dot">.</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {t.links.map(link => <NavLink key={link.label} to={link.to} className={({ isActive }) => `nav-link ${isActive && !link.to.endsWith('#services') ? 'is-active' : ''}`}>{link.label}</NavLink>)}
      </nav>
      <div className="header-right">
        <Link to={t.langTo} className="lang-toggle" aria-label="Switch language">{t.langLabel}</Link>
        <Link to={t.ctaTo} className="header-cta">{t.cta} <ArrowUpRight size={15} strokeWidth={2.2} /></Link>
        <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={25} /> : <Menu size={25} />}</button>
      </div>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">
      {t.links.map((link, i) => <Link key={link.label} to={link.to} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{link.label}<ArrowUpRight size={21} /></Link>)}
      <Link to={t.ctaTo} onClick={() => setOpen(false)}><span className="mono">0{t.links.length + 1}</span>{t.cta}<ArrowUpRight size={21} /></Link>
      <Link to={t.langTo} onClick={() => setOpen(false)} className="lang-mobile"><span className="mono">↗</span>{t.langLabel} / {lang === 'tr' ? 'İNGİLİZCE' : 'TÜRKÇE'}</Link>
    </nav>}
  </header>;
}
