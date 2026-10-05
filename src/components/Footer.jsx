import { getTranslations } from 'next-intl/server';
import ContactInfo from '@/components/ContactInfo';
import { Link } from '@/i18n/navigation';

const FOOTER_HREFS = ['/blog', '/legal', '/privacy'];

export default async function Footer() {
  const t = await getTranslations('footer');
  const tc = await getTranslations('contact');
  const linkLabels = t.raw('linkLabels');
  const links = FOOTER_HREFS.map((href, i) => ({ href, label: linkLabels[i] }));

  return <footer className="bg-[#0d0d0d] border-t border-line">
    <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[clamp(65px,8vw,140px)] pb-[clamp(55px,7vw,115px)] flex items-end justify-between gap-[40px] overflow-hidden tablet:flex-col tablet:items-start mobile:pt-[80px] mobile:pb-[80px]">
      <div className="min-w-0 max-w-full">
        <div className="font-display font-black leading-[.8] tracking-[-.02em] -ml-[.044em] whitespace-nowrap max-w-full text-[length:clamp(90px,16vw,320px)] tablet:text-[17vw] mobile:text-[16vw] xs:text-[16vw] overflow-hidden" aria-hidden="true">ALAZ<span className="text-[.7em] text-[#858585] tracking-[-.1em]">.</span></div>
        <a href={`mailto:${tc('email')}`} className="mt-[28px] inline-block font-mono text-[13px] font-light tracking-[.04em] transition-colors duration-200 hover:text-mute">{tc('email')}</a>
      </div>
      <ContactInfo />
    </div>
    <div className="w-full px-[clamp(24px,4.2vw,72px)] border-t border-line min-h-[90px] flex items-center justify-between gap-[24px] text-dim tablet:flex-wrap tablet:pt-[25px] tablet:pb-[25px] mobile:gap-[20px]">
      <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6]">{t('copyright', { year: new Date().getFullYear() })}</span>
      <div className="flex gap-[clamp(12px,1.8vw,31px)] font-mono text-[9px] tracking-[.06em] tablet:order-3 tablet:w-full tablet:justify-between mobile:flex-wrap mobile:gap-x-[24px] mobile:gap-y-[15px] mobile:justify-start">
        {links.map(l => <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>)}
      </div>
      <a href="#top" className="font-mono text-[9px] whitespace-nowrap hover:text-white mobile:ml-auto">{t('backTop')}</a>
    </div>
  </footer>;
}

