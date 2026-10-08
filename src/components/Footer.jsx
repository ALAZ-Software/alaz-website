import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import ContactInfo from '@/components/ContactInfo';
import { Link } from '@/i18n/navigation';

const NAV_HREFS = ['/services', '/case-studies', '/about', '/blog', '/start-project'];
const LEGAL_HREFS = ['/legal', '/privacy'];
const MONO = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6]';

// The footer is a destination: a real CTA, every main page, the products and the two offices.
export default async function Footer() {
  const t = await getTranslations('footer');
  const tc = await getTranslations('contact');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const nav = NAV_HREFS.map((href, i) => ({ href, label: t.raw('navLabels')[i] }));
  const legal = LEGAL_HREFS.map((href, i) => ({ href, label: t.raw('linkLabels')[i] }));

  return <footer className="bg-[#0d0d0d] border-t border-line">
    <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[clamp(65px,8vw,120px)] pb-[clamp(55px,6vw,90px)] grid grid-cols-[1.4fr_1fr_1fr] gap-[48px] tablet:grid-cols-1 tablet:gap-[40px]">
      <div className="min-w-0">
        <p className="font-display font-black leading-[.9] tracking-[-.04em] text-[length:clamp(34px,4.6vw,72px)] max-w-[14ch]">{t('talk')}</p>
        <Link href="/start-project" className="mt-[28px] inline-flex items-center gap-[18px] border-b border-white pb-[10px] font-mono text-[12px] tracking-[.03em] uppercase [transition:gap_.2s_ease] hover:gap-[26px]">{t('talkCta')} <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <p className={`${MONO} text-dim mt-[36px]`}>{t('emailLabel')}</p>
        <a href={`mailto:${tc('email')}`} className="mt-[6px] inline-block font-mono text-[length:clamp(16px,1.6vw,22px)] tracking-[.02em] text-white transition-colors duration-200 hover:text-mute">{tc('email')}</a>
      </div>
      <nav aria-label={t('navLabel')} className="flex flex-col gap-[28px]">
        <div>
          <p className={`${MONO} text-dim mb-[14px]`}>{t('navLabel')}</p>
          <ul className="flex flex-col gap-[10px]">
            {nav.map((l) => <li key={l.href}><Link href={l.href} className="font-mono text-[13px] tracking-[.06em] text-[#cfcfcf] hover:text-white">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className={`${MONO} text-dim mb-[14px]`}>{t('productsLabel')}</p>
          <ul className="flex flex-col gap-[10px]">
            {projects.map((p) => <li key={p.slug} className="flex flex-wrap items-center gap-x-[10px]">
              <Link href={`/case-studies/${p.slug}`} className="font-mono text-[13px] tracking-[.06em] text-[#cfcfcf] hover:text-white">{p.name}</Link>
              {p.link && <a href={p.link.href} target="_blank" rel="noopener noreferrer" className={`${MONO} text-dim inline-flex items-center gap-[5px] hover:text-white`}>{p.link.label} <ArrowUpRight size={11} aria-hidden="true" /></a>}
            </li>)}
          </ul>
        </div>
      </nav>
      <ContactInfo />
    </div>
    <div className="w-full px-[clamp(24px,4.2vw,72px)] border-t border-line min-h-[90px] flex items-center justify-between gap-[24px] text-dim tablet:flex-wrap tablet:pt-[25px] tablet:pb-[25px] mobile:gap-[20px]">
      <span className={MONO}>{t('copyright', { year: new Date().getFullYear() })}</span>
      <div className="flex gap-[clamp(12px,1.8vw,31px)] font-mono text-[12px] tracking-[.06em] tablet:order-3 tablet:w-full mobile:flex-wrap mobile:gap-x-[24px] mobile:gap-y-[15px]">
        {legal.map((l) => <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>)}
      </div>
      <a href="#top" className="font-mono text-[12px] whitespace-nowrap hover:text-white mobile:ml-auto">{t('backTop')}</a>
    </div>
  </footer>;
}
