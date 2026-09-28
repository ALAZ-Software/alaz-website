import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';

const CONTENT = {
  en: {
    eyebrow: 'ALAZ / ENGINEERING STUDIO',
    talk: 'HAVE A SYSTEM IN MIND?',
    copyright: '© 2025 ALAZ ENGINEERING. ALL RIGHTS RESERVED.',
    backTop: 'BACK TO TOP ↑',
    links: [
      { label: 'BLOG', to: '/blog' },
      { label: 'LEGAL', to: '/legal' },
      { label: 'PRIVACY', to: '/privacy' },
    ],
  },
  tr: {
    eyebrow: 'ALAZ / MÜHENDİSLİK STÜDYOSU',
    talk: 'AKLINIZDA BİR SİSTEM Mİ VAR?',
    copyright: '© 2025 ALAZ MÜHENDİSLİK. TÜM HAKLARI SAKLIDIR.',
    backTop: 'BAŞA DÖN ↑',
    links: [
      { label: 'BLOG', to: '/tr/blog' },
      { label: 'YASAL', to: '/tr/legal' },
      { label: 'GİZLİLİK', to: '/tr/privacy' },
    ],
  },
};

export default function Footer({ lang = 'en' }) {
  const t = CONTENT[lang] || CONTENT.en;
  return <footer className="site-footer">
    <div className="footer-top frame">
      <span className="eyebrow">{t.eyebrow}</span>
      <div className="footer-contact"><a href="mailto:hello@alaz.pro" className="footer-email"><Mail size={15} /> hello@alaz.pro</a><Link to={lang === 'tr' ? '/tr/start-project' : '/start-project'} className="footer-talk">{t.talk} <ArrowUpRight size={16} /></Link></div>
    </div>
    <div className="footer-word frame" aria-hidden="true">ALAZ<span>.</span></div>
    <div className="footer-bottom frame">
      <span className="mono">{t.copyright}</span>
      <div className="footer-links"><a href="https://www.linkedin.com/company/alaz-pro" target="_blank" rel="noopener noreferrer">LINKEDIN</a><a href="https://x.com/alaz_pro" target="_blank" rel="noopener noreferrer">TWITTER</a><a href="https://github.com/alaz-pro" target="_blank" rel="noopener noreferrer">GITHUB</a>{t.links.map(l => <Link key={l.label} to={l.to}>{l.label}</Link>)}</div>
      <Link to={lang === 'tr' ? '/tr' : '/'} className="back-top">{t.backTop}</Link>
    </div>
  </footer>;
}
