import { getTranslations } from 'next-intl/server';
import Icon from '@/components/Icon';
import ContactInfo from '@/components/ContactInfo';
import { Link } from '@/i18n/navigation';

const NAV_HREFS = ['/services', '/case-studies', '/about', '/blog', '/start-project'];
const LEGAL_HREFS = ['/legal', '/privacy'];

// The footer is a destination: a real CTA, every main page, the products, the two offices,
// and the wordmark cooling at the bottom of the page.
export default async function Footer() {
  const t = await getTranslations('footer');
  const tc = await getTranslations('contact');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const nav = NAV_HREFS.map((href, i) => ({ href, label: t.raw('navLabels')[i] }));
  const legal = LEGAL_HREFS.map((href, i) => ({ href, label: t.raw('linkLabels')[i] }));

  return <footer className="site-footer relative overflow-hidden bg-ink border-t border-line">
    <div className="shell pt-[var(--s-6)] pb-[var(--s-4)] grid grid-cols-12 gap-[var(--col-gap)] tablet:flex tablet:flex-col tablet:gap-[40px]">
      <div className="col-span-6 min-w-0">
        <p className="t-display-2 uppercase max-w-[12ch]" data-reveal="lines">{t('talk')}</p>
        <Link href="/start-project" className="link-draw t-meta uppercase mt-[28px]">{t('talkCta')} <Icon name="arrow" size={14} /></Link>
        <p className="t-meta uppercase text-fg-4 mt-[40px]">{t('emailLabel')}</p>
        <a href={`mailto:${tc('email')}`} className="mt-[6px] inline-block font-mono text-[length:clamp(18px,2vw,28px)] tracking-[.01em] text-fg transition-colors duration-fast hover:text-ember-soft">{tc('email')}</a>
      </div>
      <nav aria-label={t('navLabel')} className="col-span-3 col-start-7 flex flex-col gap-[28px]">
        <div>
          <p className="t-meta uppercase text-fg-4 mb-[14px]">{t('navLabel')}</p>
          <ul className="flex flex-col gap-[10px]">
            {nav.map((l) => <li key={l.href}><Link href={l.href} className="t-meta uppercase text-fg-2 hover:text-fg">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="t-meta uppercase text-fg-4 mb-[14px]">{t('productsLabel')}</p>
          <ul className="flex flex-col gap-[10px]">
            {projects.map((p) => <li key={p.slug} className="flex flex-wrap items-center gap-x-[10px]">
              <Link href={`/case-studies/${p.slug}`} className="t-meta uppercase text-fg-2 hover:text-fg">{p.name}</Link>
              {p.link && <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="t-meta text-fg-4 inline-flex items-center gap-[5px] hover:text-fg">{p.link.label} <Icon name="external" size={11} /></a>}
            </li>)}
          </ul>
        </div>
      </nav>
      <div className="col-span-3 col-start-10"><ContactInfo /></div>
    </div>
    <div className="shell relative pt-[var(--s-4)]" aria-hidden="true">
      <p className="footer-mark font-display font-black leading-[.78] tracking-[-.03em] -ml-[.044em] whitespace-nowrap text-[length:clamp(120px,22vw,440px)] text-fg-2 select-none">ALAZ<span className="dot text-[.7em] tracking-[-.1em]">.</span></p>
    </div>
    <div className="shell border-t border-line min-h-[80px] flex items-center justify-between gap-[24px] text-fg-4 tablet:flex-wrap tablet:py-[22px]">
      <span className="t-meta">{t('copyright', { year: new Date().getFullYear() })}</span>
      <div className="flex gap-[clamp(12px,1.8vw,31px)] t-meta uppercase tablet:order-3 tablet:w-full">
        {legal.map((l) => <Link key={l.href} href={l.href} className="hover:text-fg">{l.label}</Link>)}
      </div>
      <a href="#top" className="t-meta uppercase whitespace-nowrap hover:text-fg">{t('backTop')}</a>
    </div>
  </footer>;
}
