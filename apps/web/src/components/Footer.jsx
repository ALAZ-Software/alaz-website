import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const FOOTER_HREFS = ['/blog', '/legal', '/privacy'];

export default async function Footer() {
  const t = await getTranslations('footer');
  const linkLabels = t.raw('linkLabels');
  const links = FOOTER_HREFS.map((href, i) => ({ href, label: linkLabels[i] }));

  return <footer className="site-footer">
    <div className="footer-top frame">
      <span className="eyebrow">{t('eyebrow')}</span>
      <div className="footer-contact"><a href="mailto:hello@alaz.pro" className="footer-email"><Mail size={15} /> hello@alaz.pro</a><Link href="/start-project" className="footer-talk">{t('talk')} <ArrowUpRight size={16} /></Link></div>
    </div>
    <div className="footer-word frame" aria-hidden="true">ALAZ<span>.</span></div>
    <div className="footer-bottom frame">
      <span className="mono">{t('copyright')}</span>
      <div className="footer-links"><a href="https://www.linkedin.com/company/alaz-pro" target="_blank" rel="noopener noreferrer">LINKEDIN</a><a href="https://x.com/alaz_pro" target="_blank" rel="noopener noreferrer">TWITTER</a><a href="https://github.com/alaz-pro" target="_blank" rel="noopener noreferrer">GITHUB</a>{links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
      <Link href="/" className="back-top">{t('backTop')}</Link>
    </div>
  </footer>;
}
