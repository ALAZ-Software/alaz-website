import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('about.meta');
  return { title: t('title'), description: t('description') };
}

export default async function AboutPage() {
  const t = await getTranslations('about');
  const tRoot = await getTranslations();
  const media = tRoot.raw('media');
  const services = tRoot.raw('services');
  const heading = t.raw('heading');
  const disciplinesHeading = t.raw('disciplinesHeading');
  const principles = t.raw('principles');

  return <>
    <main>
      <section className="w-full relative bg-[#090909] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,.35),transparent_40%,rgba(0,0,0,.35))] after:pointer-events-none">
        <video className="absolute inset-0 w-full h-full object-cover opacity-[.55] pointer-events-none" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/videos/about-section.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.60)_0%,rgba(9,9,9,.20)_50%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] relative z-[1] mobile:pt-[100px]">
          <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div>
          <p className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute mt-[105px] mobile:mt-[85px]">{t('kicker')}</p>
          <h1 className="text-[length:clamp(67px,12.4vw,205px)] font-black tracking-[-.075em] leading-[.86] my-[25px] mb-[70px] mobile:text-[length:clamp(60px,12.5vw,100px)]">{heading[0]}<br />{heading[1]}<span className="text-[#6e6e6e]">.</span></h1>
          <div className="flex justify-between items-end gap-[30px] pb-[75px] mobile:pb-[60px] mobile:items-start mobile:flex-col mobile:gap-[20px]"><p className="text-[length:clamp(18px,2vw,27px)] max-w-[550px] tracking-[-.04em] leading-[1.4]">{t('introText')}</p><span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('introNote')}</span></div>
        </div>
      </section>
      <div className="h-[clamp(340px,53vw,800px)] relative bg-[#171717]"><Image src={media.laboratory} alt={t('imageAlt')} fill sizes="100vw" className="object-cover [filter:grayscale(1)_brightness(.78)]" priority /><span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] absolute bottom-[24px] left-[clamp(24px,4.2vw,72px)] text-white">{t('imageCaption')}</span></div>
      <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[145px] pb-[120px] mobile:pt-[90px] mobile:pb-[100px]">
        <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('principlesEyebrowLeft')}</span><span>{t('principlesEyebrowRight')}</span></div>
        {principles.map(item => <article className="grid grid-cols-[15%_1fr_32%] gap-[25px] items-start border-b border-line py-[42px] pb-[48px] first-of-type:mt-[65px] first-of-type:border-t first-of-type:border-line mobile:grid-cols-[45px_1fr] mobile:gap-[12px] mobile:py-[30px]" key={item.number}><span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{item.number} / 03</span><h2 className="text-[length:clamp(32px,4.2vw,65px)] tracking-[-.065em] leading-none font-bold mobile:text-[33px]">{item.title}</h2><p className="text-[15px] leading-[1.7] text-mute max-w-[370px] mobile:col-start-2">{item.body}</p></article>)}
      </div>
      <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-[#111] pt-[110px] pb-[130px] mobile:pt-[90px] mobile:pb-[90px]" id="services">
        <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('disciplinesEyebrowLeft')}</span><span>{t('disciplinesEyebrowRight')}</span></div>
        <h2 className="text-[length:clamp(65px,10vw,160px)] leading-[.85] tracking-[-.075em] my-[85px] font-black mobile:text-[length:clamp(59px,12vw,100px)] mobile:my-[65px]">{disciplinesHeading[0]}<br />{disciplinesHeading[1]}<span className="text-[#777]">.</span></h2>
        {services.map(service => <article className="grid grid-cols-[15%_1fr_40px] gap-[20px] border-t border-line py-[37px] items-start last:border-b last:border-line mobile:grid-cols-[45px_1fr_20px] mobile:gap-[12px]" key={service.number}><span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{service.number} / 03</span><div><h3 className="text-[length:clamp(28px,3vw,48px)] tracking-[-.065em] font-bold mobile:text-[27px]">{service.title}</h3><p className="max-w-[660px] text-mute text-[15px] leading-[1.7] mt-[15px] mobile:text-[13px]">{service.detail}</p></div><ArrowUpRight size={20} strokeWidth={1.3} className="justify-self-end" /></article>)}
      </section>
      <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[150px] pb-[160px] flex items-end justify-between gap-[40px] mobile:pt-[95px] mobile:pb-[100px] mobile:items-start mobile:flex-col"><p className="text-[length:clamp(30px,4.5vw,72px)] font-extrabold tracking-[-.07em] leading-[1.05]">{t('endTextTop')}<br /><span className="text-[#777]">{t('endTextBottom')}</span></p><Link href="/start-project" className="inline-flex items-center justify-center gap-[22px] bg-white text-[#050505] px-[23px] py-[18px] text-[11px] font-extrabold tracking-[.04em] min-h-[58px] [transition:background_.2s_ease,transform_.2s_ease] hover:bg-[#d5d5d5] hover:[transform:translateY(-2px)] active:[transform:scale(.98)] xs:gap-[12px]">{t('startCta')} <ArrowUpRight size={17} /></Link></div>
    </main>
  </>;
}


