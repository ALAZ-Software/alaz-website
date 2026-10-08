import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import ContactInfo from '@/components/ContactInfo';
import { buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import BackgroundVideo from '@/components/BackgroundVideo';
import PoweredBy from '@/components/PoweredBy';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '/about', title: t('title'), description: t('description'), keywords: tSeo.raw('keywords.about') });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations('about');
  const tc = await getTranslations('contact');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const services = tRoot.raw('services');
  const heading = t.raw('heading');
  const originParagraphs = t.raw('originParagraphs');
  const disciplinesHeading = t.raw('disciplinesHeading');
  const principles = t.raw('principles');
  const processHeading = t.raw('processHeading');
  const processSteps = t.raw('processSteps');

  return <>
    <BreadcrumbJsonLd crumbs={[{ name: tSeo('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('about'), url: urlFor(locale, '/about') }]} />
    <main>
      <section className="w-full relative bg-[#090909] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,.35),transparent_40%,rgba(0,0,0,.35))] after:pointer-events-none">
        <video poster="/videos/poster.png" className="absolute inset-0 w-full h-full object-cover opacity-[.55] pointer-events-none" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/videos/about-section.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.60)_0%,rgba(9,9,9,.20)_50%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] relative z-[1] mobile:pt-[100px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div>
          <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-mute mt-[105px] mobile:mt-[85px]">{t('kicker')}</p>
          <h1 data-reveal="mask" style={fit(heading, '.')} className="fit [--fit-size:clamp(67px,12.4vw,205px)] font-black tracking-[-.075em] leading-[.86] my-[25px] mb-[70px] mobile:[--fit-size:clamp(60px,12.5vw,100px)]">{heading[0]}<br />{heading[1]}<span className="text-[#6e6e6e]">.</span></h1>
          <div className="flex justify-between items-end gap-[30px] pb-[44px] mobile:pb-[36px] mobile:items-start mobile:flex-col mobile:gap-[20px]"><p className="text-[length:clamp(18px,2vw,27px)] max-w-[550px] tracking-[-.04em] leading-[1.4]">{t('introText')}</p><span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('introNote')}</span></div>
          <PoweredBy label={tRoot('home.hero.poweredBy')} className="pb-[75px] mobile:pb-[60px]" />
        </div>
      </section>
      <section className="w-full relative bg-[#090909] overflow-hidden">
        <BackgroundVideo src="/videos/about-alaz-section.mp4" className="absolute inset-0 w-full h-full object-cover opacity-[.5] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.55)_0%,rgba(9,9,9,.4)_45%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[110px] pb-[110px] relative z-[1] mobile:pt-[90px] mobile:pb-[85px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('originEyebrowLeft')}</span><span>{t('originEyebrowRight')}</span></div>
          <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim mt-[75px] mobile:mt-[55px]">{t('originLabel')}</p>
          <h2 data-reveal="mask" style={fit(t('originWord'), '.')} className="fit [--fit-size:clamp(64px,9.5vw,150px)] font-black tracking-[-.07em] leading-[.85] mt-[18px] mb-[55px] mobile:mb-[35px]">{t('originWord')}<span className="text-[#6e6e6e]">.</span></h2>
          <div className="flex justify-between items-start gap-[60px] mobile:flex-col mobile:gap-[26px]">
            <div className="flex flex-col gap-[24px] max-w-[680px]">
              {originParagraphs.map((paragraph, i) => <p data-reveal="fade" style={{ '--reveal-delay': `${i * 100}ms` }} className="text-[length:clamp(18px,2vw,26px)] tracking-[-.03em] leading-[1.5]" key={i}>{paragraph}</p>)}
            </div>
            <p data-reveal="fade" className="text-[15px] leading-[1.7] text-mute max-w-[230px] shrink-0 mobile:max-w-none">{t('originDefinition')}</p>
          </div>
        </div>
      </section>
      {/* <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[35px] pb-[120px] mobile:pt-[20px] mobile:pb-[100px]">
        <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('principlesEyebrowLeft')}</span><span>{t('principlesEyebrowRight')}</span></div>
        {principles.map((item, i) => <article data-reveal="fade" style={{ '--reveal-delay': `${i * 60}ms` }} className="grid grid-cols-[15%_1fr_32%] gap-[25px] items-start border-b border-line py-[42px] pb-[48px] first-of-type:mt-[65px] first-of-type:border-t first-of-type:border-line mobile:grid-cols-[45px_1fr] mobile:gap-[12px] mobile:py-[30px]" key={item.number}><span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{item.number} / 03</span><h2 data-reveal="mask" className="text-[length:clamp(32px,4.2vw,65px)] tracking-[-.065em] leading-none font-bold mobile:text-[33px]">{item.title}</h2><p className="text-[15px] leading-[1.7] text-mute max-w-[370px] mobile:col-start-2">{item.body}</p></article>)}
      </div> */}
      {/* <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-[#111] pt-[110px] pb-[130px] mobile:pt-[90px] mobile:pb-[90px]" id="services">
        <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('disciplinesEyebrowLeft')}</span><span>{t('disciplinesEyebrowRight')}</span></div>
        <h2 data-reveal="mask" className="text-[length:clamp(65px,10vw,160px)] leading-[.85] tracking-[-.075em] my-[85px] font-black mobile:text-[length:clamp(59px,12vw,100px)] mobile:my-[65px]">{disciplinesHeading[0]}<br />{disciplinesHeading[1]}<span className="text-[#777]">.</span></h2>
        {services.map((service, i) => <article data-reveal="fade" style={{ '--reveal-delay': `${i * 60}ms` }} className="grid grid-cols-[15%_1fr_40px] gap-[20px] border-t border-line py-[37px] items-start last:border-b last:border-line mobile:grid-cols-[45px_1fr_20px] mobile:gap-[12px]" key={service.number}><span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{service.number} / 03</span><div><h3 className="text-[length:clamp(28px,3vw,48px)] tracking-[-.065em] font-bold mobile:text-[27px]">{service.title}</h3><p className="max-w-[660px] text-mute text-[15px] leading-[1.7] mt-[15px] mobile:text-[13px]">{service.detail}</p></div><ArrowUpRight size={20} strokeWidth={1.3} className="justify-self-end" /></article>)}
      </section> */}
      <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[110px] pb-[100px] mobile:pt-[85px] mobile:pb-[80px]">
        <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('processEyebrowLeft')}</span><span>{t('processEyebrowRight')}</span></div>
        <h2 data-reveal="mask" style={fit(processHeading, '.')} className="fit [--fit-size:clamp(50px,7.5vw,120px)] leading-[.85] tracking-[-.075em] my-[65px] font-black mobile:[--fit-size:clamp(44px,10vw,80px)] mobile:my-[45px]">{processHeading[0]}<br />{processHeading[1]}<span className="text-[#777]">.</span></h2>
        {processSteps.map((step, i) => <article data-reveal="fade" style={{ '--reveal-delay': `${i * 60}ms` }} className="grid grid-cols-[15%_1fr_32%] gap-[25px] items-start border-b border-line py-[42px] pb-[48px] first-of-type:border-t first-of-type:border-line mobile:grid-cols-[45px_1fr] mobile:gap-[12px] mobile:py-[30px]" key={step.number}><span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{step.number} / {String(processSteps.length).padStart(2, '0')}</span><h3 style={fit(step.title)} className="fit [--fit-size:clamp(32px,4.2vw,65px)] [--fit-avail:calc((100vw_-_2*var(--gutter))*.53_-_50px)] tracking-[-.065em] leading-none font-bold mobile:[--fit-size:33px] mobile:[--fit-avail:calc(100vw_-_2*var(--gutter)_-_57px)]">{step.title}</h3><p className="text-[15px] leading-[1.7] text-mute max-w-[370px] mobile:col-start-2">{step.body}</p></article>)}
      </div>
      <section className="w-full relative bg-[#090909] overflow-hidden">
        <BackgroundVideo src="/videos/about-end-section.mp4" className="absolute inset-0 w-full h-full object-cover opacity-[.5] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#090909_0%,rgba(9,9,9,.4)_45%,rgba(9,9,9,.55)_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[150px] pb-[160px] relative z-[1] flex items-end justify-between gap-[40px] mobile:pt-[95px] mobile:pb-[100px] mobile:items-start mobile:flex-col"><p className="text-[length:clamp(30px,4.5vw,72px)] font-extrabold tracking-[-.07em] leading-[1.05]">{t('endTextTop')}<br /><span className="text-[#777]">{t('endTextBottom')}</span></p><Link href="/start-project" className="inline-flex items-center justify-center gap-[22px] bg-white text-[#050505] px-[23px] py-[18px] text-[12px] font-extrabold tracking-[.04em] min-h-[58px] [transition:background_.2s_ease,transform_.2s_ease] hover:bg-[#d5d5d5] hover:[transform:translateY(-2px)] active:[transform:scale(.98)] xs:gap-[12px]">{t('startCta')} <ArrowUpRight size={17} /></Link></div>
      </section>
      <div className="w-full px-[clamp(24px,4.2vw,72px)] py-[80px] mobile:py-[60px]">
        <div className="border-t border-line pt-[36px] flex items-start justify-between gap-[40px] mobile:flex-col mobile:gap-[24px]">
          <div><p className="font-mono text-[12px] tracking-[.085em] text-[#bdbdbd]">{tc('label')}</p><a href={`mailto:${tc('email')}`} className="mt-[14px] inline-block font-mono text-[length:clamp(18px,2vw,26px)] font-light tracking-[.02em] text-white transition-colors duration-200 hover:text-mute">{tc('email')}</a></div>
          <ContactInfo large />
        </div>
      </div>
    </main>
  </>;
}


