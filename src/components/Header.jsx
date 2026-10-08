'use client';

import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const NAV_HREFS = ['/services', '/case-studies', '/about', '/blog'];
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

  return <header className={cn('fixed inset-x-0 top-0 z-40 h-[76px] border-b border-line backdrop-saturate-150 [transition:background-color_.35s_ease,backdrop-filter_.35s_ease,-webkit-backdrop-filter_.35s_ease] mobile:h-[66px]', open ? 'bg-[#0a0a0a] backdrop-blur-0' : 'bg-[rgba(10,10,10,.55)] backdrop-blur-[14px]')}>
    <div className="h-full grid grid-cols-[1fr_auto_1fr] items-center px-[clamp(24px,4.2vw,72px)] tablet:grid-cols-[1fr_auto_auto] tablet:gap-[15px] mobile:h-[66px]">
      <Link href="/" className="font-display text-balance text-[26px] font-black tracking-[-.02em] leading-none w-max mobile:text-[25px]" aria-label="ALAZ home">ALAZ<span className="text-[#777]">.</span></Link>
      <nav className="flex items-center gap-[clamp(26px,3.2vw,52px)] tablet:hidden" aria-label="Main navigation">
        {links.map(link => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return <Link key={link.href} href={link.href} className={cn('font-mono text-[12px] tracking-[.075em] text-[#aaa] transition-colors duration-200 ease-in-out hover:text-white', isActive && 'text-white')} aria-current={isActive ? 'page' : undefined}>{link.label}</Link>;
        })}
      </nav>
      <div className="justify-self-end flex items-center gap-[18px] xs:gap-[10px]">
        <Link href={pathname} locale={otherLocale} className="font-mono text-[12px] tracking-[.08em] text-[#aaa] border border-line px-[11px] py-[9px] transition-colors duration-200 hover:text-white hover:border-[#888] [@media(max-width:359px)]:hidden" aria-label="Switch language">{otherLocale.toUpperCase()}</Link>
        <Link href="/start-project" className="inline-flex items-center gap-[22px] whitespace-nowrap pt-[15px] pr-[19px] pb-[15px] pl-[22px] bg-white text-[#080808] rounded-none text-[12px] tracking-[.04em] font-extrabold transition-[background,transform] duration-200 ease-in-out hover:bg-[#d5d5d5] hover:-translate-y-[2px] active:scale-[.98] mobile:gap-[8px] mobile:py-[12px] mobile:px-[13px] mobile:[&>svg]:hidden xs:px-[11px]">{t('cta')} <ArrowUpRight size={15} strokeWidth={2.2} /></Link>
        <button type="button" className="hidden bg-transparent border-0 text-white p-[9px] tablet:block" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={25} /> : <Menu size={25} />}</button>
      </div>
    </div>
    {open && <nav className="hidden tablet:flex tablet:flex-col absolute top-full inset-x-0 min-h-[calc(100dvh-76px)] px-[clamp(24px,4.2vw,72px)] py-[45px] bg-[#0a0a0a] border-t border-line mobile:min-h-[calc(100dvh-66px)]" aria-label="Mobile navigation">
      {links.map((link, i) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-center gap-[18px] border-b border-line py-[24px] text-[25px] font-extrabold tracking-[-.04em]"><span className="font-mono text-[12px] text-dim">0{i + 1}</span>{link.label}<ArrowUpRight size={21} className="ml-auto" /></Link>)}
      <Link href="/start-project" onClick={() => setOpen(false)} className="flex items-center gap-[18px] border-b border-line py-[24px] text-[25px] font-extrabold tracking-[-.04em]"><span className="font-mono text-[12px] text-dim">0{links.length + 1}</span>{t('cta')}<ArrowUpRight size={21} className="ml-auto" /></Link>
      <Link href={pathname} locale={otherLocale} onClick={() => setOpen(false)} className="flex items-center gap-[18px] border-b border-line py-[24px] text-[18px] font-extrabold tracking-[-.04em] text-mute"><span className="font-mono text-[12px] text-dim">↗</span>{otherLocale.toUpperCase()} / {NATIVE_LANGUAGE_NAMES[otherLocale]}<ArrowUpRight size={21} className="ml-auto" /></Link>
    </nav>}
  </header>;
}
