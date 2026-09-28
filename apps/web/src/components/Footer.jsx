import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const FOOTER_HREFS = ['/blog', '/legal', '/privacy'];

export default async function Footer() {
  const t = await getTranslations('footer');
  const linkLabels = t.raw('linkLabels');
  const links = FOOTER_HREFS.map((href, i) => ({ href, label: linkLabels[i] }));

  return <footer className="bg-[#0d0d0d] border-t border-line">
    <div className="w-full px-[clamp(24px,4.2vw,72px)] h-[104px] flex justify-between items-center border-b border-line mobile:h-[95px]">
      <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute xs:max-w-[120px]">{t('eyebrow')}</span>
      <div className="flex items-center gap-[clamp(20px,3vw,48px)]">
        <a href="mailto:hello@alaz.pro" className="font-mono text-[11px] flex items-center gap-[9px] transition-colors duration-200 hover:text-mute"><Mail size={15} /> hello@alaz.pro</a>
        <Link href="/start-project" className="font-mono text-[11px] flex items-center gap-[9px] transition-colors duration-200 hover:text-mute mobile:text-[9px] mobile:gap-[7px]">{t('talk')} <ArrowUpRight size={16} /></Link>
      </div>
    </div>
    <div className="w-full px-[clamp(24px,4.2vw,72px)] font-display font-black leading-[.8] tracking-[-.02em] -ml-[.044em] whitespace-nowrap max-w-full text-[length:clamp(90px,16vw,320px)] tablet:text-[17vw] mobile:text-[16vw] xs:text-[16vw] pt-[clamp(65px,8vw,140px)] pb-[clamp(55px,7vw,115px)] overflow-hidden mobile:pt-[80px] mobile:pb-[80px]" aria-hidden="true">ALAZ<span className="text-[.7em] text-[#858585] tracking-[-.1em]">.</span></div>
    <div className="w-full px-[clamp(24px,4.2vw,72px)] border-t border-line min-h-[90px] flex items-center justify-between gap-[24px] text-dim tablet:flex-wrap tablet:pt-[25px] tablet:pb-[25px] mobile:gap-[20px]">
      <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6]">{t('copyright')}</span>
      <div className="flex gap-[clamp(12px,1.8vw,31px)] font-mono text-[9px] tracking-[.06em] tablet:order-3 tablet:w-full tablet:justify-between mobile:flex-wrap mobile:gap-x-[24px] mobile:gap-y-[15px] mobile:justify-start">
        <a href="https://www.linkedin.com/company/alaz-pro" target="_blank" rel="noopener noreferrer" className="hover:text-white">LINKEDIN</a>
        <a href="https://x.com/alaz_pro" target="_blank" rel="noopener noreferrer" className="hover:text-white">TWITTER</a>
        <a href="https://github.com/alaz-pro" target="_blank" rel="noopener noreferrer" className="hover:text-white">GITHUB</a>
        {links.map(l => <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>)}
      </div>
      <Link href="/" className="font-mono text-[9px] whitespace-nowrap hover:text-white mobile:ml-auto">{t('backTop')}</Link>
    </div>
  </footer>;
}

