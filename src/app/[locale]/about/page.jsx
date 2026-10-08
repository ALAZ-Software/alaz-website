import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import BackgroundVideo from '@/components/BackgroundVideo';

const EYEBROW = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right';
const MONO = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6]';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '/about', title: t('title'), description: t('description'), eyebrow: tSeo('about') });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const heading = t.raw('heading');
  const originParagraphs = t.raw('originParagraphs');
  const productsHeading = t.raw('productsHeading');
  const processHeading = t.raw('processHeading');
  const processSteps = t.raw('processSteps');

  return <>
    <BreadcrumbJsonLd crumbs={[{ name: tSeo('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('about'), url: urlFor(locale, '/about') }]} />
    <main>
      <section className="w-full relative bg-[#090909] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,.35),transparent_40%,rgba(0,0,0,.35))] after:pointer-events-none">
        <video poster="/videos/poster.png" className="absolute inset-0 w-full h-full object-cover opacity-[.55] pointer-events-none" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/about-section.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.60)_0%,rgba(9,9,9,.20)_50%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] relative z-[1] mobile:pt-[100px]">
          <div data-reveal="line" className={EYEBROW}><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div>
          <p className={`${MONO} text-mute mt-[105px] mobile:mt-[85px]`}>{t('kicker')}</p>
          <h1 data-reveal="mask" style={fit(heading, '.')} className="fit [--fit-size:clamp(67px,12.4vw,205px)] font-black tracking-[-.075em] leading-[.86] my-[25px] mb-[70px] mobile:[--fit-size:clamp(60px,12.5vw,100px)]">{heading[0]}<br />{heading[1]}<span className="text-[#6e6e6e]">.</span></h1>
          <div className="flex justify-between items-end gap-[30px] pb-[75px] mobile:pb-[60px] mobile:items-start mobile:flex-col mobile:gap-[20px]"><p className="text-[length:clamp(18px,2vw,27px)] max-w-[640px] tracking-[-.03em] leading-[1.4]">{t('introText')}</p><span className={`${MONO} text-dim whitespace-nowrap`}>{t('introNote')}</span></div>
        </div>
      </section>

      {/* 01 The name */}
      <section className="w-full relative bg-[#090909] overflow-hidden" aria-labelledby="origin-title">
        <BackgroundVideo src="/videos/about-alaz-section.mp4" className="absolute inset-0 w-full h-full object-cover opacity-[.5] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.55)_0%,rgba(9,9,9,.4)_45%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[110px] pb-[110px] relative z-[1] mobile:pt-[90px] mobile:pb-[85px]">
          <div data-reveal="line" className={EYEBROW}><span>01 / {t('originEyebrowLeft')}</span><span>{t('originEyebrowRight')}</span></div>
          <p className={`${MONO} text-dim mt-[75px] mobile:mt-[55px]`}>{t('originLabel')}</p>
          <h2 id="origin-title" data-reveal="mask" style={fit(t('originWord'), '.')} className="fit [--fit-size:clamp(64px,9.5vw,150px)] font-black tracking-[-.07em] leading-[.85] mt-[18px] mb-[55px] mobile:mb-[35px]">{t('originWord')}<span className="text-[#6e6e6e]">.</span></h2>
          <div className="flex justify-between items-start gap-[60px] mobile:flex-col mobile:gap-[26px]">
            <div className="flex flex-col gap-[24px] max-w-[680px]">
              {originParagraphs.map((paragraph, i) => <p data-reveal="fade" style={{ '--reveal-delay': `${i * 100}ms` }} className="text-[length:clamp(18px,2vw,26px)] tracking-[-.03em] leading-[1.5]" key={i}>{paragraph}</p>)}
            </div>
            <p data-reveal="fade" className="text-[15px] leading-[1.7] text-mute max-w-[260px] shrink-0 mobile:max-w-none">{t('originDefinition')}</p>
          </div>
        </div>
      </section>

      {/* 02 Our own products */}
      <section className="w-full px-[clamp(24px,4.2vw,72px)] pt-[110px] pb-[100px] mobile:pt-[85px] mobile:pb-[80px]" aria-labelledby="products-title">
        <div data-reveal="line" className={EYEBROW}><span>02 / {t('productsEyebrowLeft')}</span><span>{t('productsEyebrowRight')}</span></div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[65px] mb-[30px] mobile:flex-col mobile:items-start mobile:mt-[45px]">
          <h2 id="products-title" data-reveal="mask" style={fit(productsHeading, '.')} className="fit [--fit-size:clamp(50px,7.5vw,120px)] leading-[.85] tracking-[-.075em] font-black mobile:[--fit-size:clamp(44px,10vw,80px)]">{productsHeading[0]}<br />{productsHeading[1]}<span className="text-[#777]">.</span></h2>
          <Link href="/case-studies" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">{t('productsCta')} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <p data-reveal="fade" className="text-mute text-[length:clamp(15px,1.3vw,18px)] leading-[1.6] max-w-[640px] mb-[50px]">{t('productsText')}</p>
        <ul className="grid grid-cols-2 gap-[36px] mobile:grid-cols-1">
          {projects.map((project, i) => <li key={project.slug} data-reveal="fade" style={{ '--reveal-delay': `${i * 90}ms` }} className="group border-t border-line pt-[22px]">
            <Link href={`/case-studies/${project.slug}`} className="flex gap-[22px] items-start mobile:flex-col">
              <span className="relative block w-[180px] shrink-0 aspect-[16/10] overflow-hidden bg-[#161616] border border-line/70 mobile:w-full"><Image src={project.image} alt={project.coverAlt} fill sizes="(max-width: 760px) 100vw, 180px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></span>
              <span className="flex flex-col">
                <span className={`${MONO} text-dim`}>{project.number} / {project.discipline}</span>
                <span className="text-[length:clamp(22px,2.2vw,32px)] font-extrabold tracking-[-.05em] leading-[1.1] mt-[8px] text-white">{project.name}</span>
                <span className="text-mute text-[14px] leading-[1.6] mt-[8px]">{project.summary}</span>
              </span>
            </Link>
          </li>)}
        </ul>
      </section>

      {/* 03 How we work */}
      <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[20px] pb-[100px] mobile:pb-[80px]">
        <div data-reveal="line" className={EYEBROW}><span>03 / {t('processEyebrowLeft')}</span><span>{t('processEyebrowRight')}</span></div>
        <h2 data-reveal="mask" style={fit(processHeading, '.')} className="fit [--fit-size:clamp(50px,7.5vw,120px)] leading-[.85] tracking-[-.075em] my-[65px] font-black mobile:[--fit-size:clamp(44px,10vw,80px)] mobile:my-[45px]">{processHeading[0]}<br />{processHeading[1]}<span className="text-[#777]">.</span></h2>
        <ol>
          {processSteps.map((step, i) => <li key={step.number} data-reveal="fade" style={{ '--reveal-delay': `${i * 60}ms` }} className="grid grid-cols-[15%_1fr_32%] gap-[25px] items-start border-b border-line py-[42px] pb-[48px] first-of-type:border-t first-of-type:border-line mobile:grid-cols-[60px_1fr] mobile:gap-[12px] mobile:py-[30px]"><span className={`${MONO} text-dim`}>{step.number} / 04</span><h3 className="text-[length:clamp(32px,4.2vw,65px)] tracking-[-.065em] leading-none font-bold mobile:text-[33px]">{step.title}</h3><p className="text-[15px] leading-[1.7] text-mute max-w-[420px] mobile:col-start-2">{step.body}</p></li>)}
        </ol>
        <Link href="/services" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] mt-[40px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">{t('servicesCta')} <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>

      <section className="w-full relative bg-[#090909] overflow-hidden">
        <BackgroundVideo src="/videos/about-end-section.mp4" className="absolute inset-0 w-full h-full object-cover opacity-[.5] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#090909_0%,rgba(9,9,9,.4)_45%,rgba(9,9,9,.55)_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[150px] pb-[160px] relative z-[1] flex items-end justify-between gap-[40px] mobile:pt-[95px] mobile:pb-[100px] mobile:items-start mobile:flex-col"><p className="font-display text-[length:clamp(30px,4.5vw,72px)] font-black tracking-[-.06em] leading-[1.05]">{t('endTextTop')}<br /><span className="text-[#777]">{t('endTextBottom')}</span></p><Link href="/start-project" className="inline-flex items-center justify-center gap-[22px] bg-white text-[#050505] px-[23px] py-[18px] text-[12px] font-extrabold tracking-[.04em] min-h-[58px] [transition:background_.2s_ease,transform_.2s_ease] hover:bg-[#d5d5d5] hover:[transform:translateY(-2px)] active:[transform:scale(.98)] xs:gap-[12px]">{t('startCta')} <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </section>
    </main>
  </>;
}
