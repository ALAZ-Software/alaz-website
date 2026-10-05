import React from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowDown, ArrowRight, ArrowUpRight, CirclePower, MoveUpRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';
import { fit } from '@/lib/fit';
import BackgroundVideo from '@/components/BackgroundVideo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '', title: t('title'), description: t('description'), keywords: tSeo.raw('keywords.home') });
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const tRoot = await getTranslations();
  const media = tRoot.raw('media');
  const testimonials = tRoot.raw('testimonials');
  const services = tRoot.raw('services');
  const projects = tRoot.raw('projects');
  const validationHeading = t.raw('validation.heading');
  const capabilitiesHeading = t.raw('capabilities.heading');
  const selectedHeading = t.raw('selected.heading');
  const startHeading = t.raw('start.heading');
  const ticker = t.raw('ticker');

  return <>
    <main>
      <section className="min-h-dvh relative bg-[#090909] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,.19),transparent_40%,rgba(0,0,0,.18))] after:pointer-events-none" aria-labelledby="hero-title">
        <video poster="/videos/poster.png" className="absolute inset-0 w-full h-full object-cover object-[center_56%] opacity-[.62] mobile:object-[54%_center]" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/videos/dark-planet.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.55)_0%,rgba(10,10,10,.10)_48%,#0a0a0a_100%)] pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none" aria-hidden="true"><i className="border-r border-[rgba(255,255,255,.065)]" /><i className="border-r border-[rgba(255,255,255,.065)]" /><i className="border-r border-[rgba(255,255,255,.065)]" /></div>
        <div className="w-full px-[clamp(24px,4.2vw,72px)] min-h-dvh pt-[100px] flex flex-col relative z-[1] mobile:pt-[66px]">
          <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-[#a6a6a6] pt-[35px] mobile:pt-[25px]">
            <span className="flex items-center gap-[10px]"><span className="inline-block w-[6px] h-[6px] bg-white flex-none align-middle" /> {t('hero.status')}</span><span className="mobile:hidden">{t('hero.toplineRight')}</span>
          </div>
          <div className="my-auto relative pt-[30vh] px-0 pb-[2vh] mobile:pb-[8vh]">
            <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex justify-between max-w-[780px] text-[#b9b9b9] mt-0 mr-0 mb-[8px] ml-[1.2vw]">{t('hero.kicker')} <span className="mobile:hidden">— 001 / 005</span></p>
            <h1 id="hero-title" className="font-display font-black leading-[.8] tracking-[-.02em] -ml-[.044em] whitespace-nowrap max-w-full text-[length:clamp(90px,16vw,320px)] tablet:text-[17vw] mobile:text-[16vw] xs:text-[16vw]">ALAZ<span className="text-[.7em] text-[#858585] tracking-[-.1em]">.</span></h1>
            <div className="flex justify-between items-start gap-[30px] mt-[clamp(42px,5vw,85px)] pl-[1.2vw] mobile:mt-[42px] mobile:pl-0 mobile:flex-col mobile:gap-[23px]">
              <p data-reveal="fade" className="text-[length:clamp(22px,2.9vw,48px)] leading-[1.08] tracking-[-.065em] font-extrabold mobile:text-[length:clamp(25px,7vw,39px)] xs:text-[28px]">{t('hero.taglineTop')}<br />{t('hero.taglineBottom')}</p>
              <p data-reveal="fade" style={{ '--reveal-delay': '120ms' }} className="max-w-[290px] text-[#c3c5c8] text-[13px] leading-[1.6] mt-[2px] mr-[9%] mb-0 tablet:mr-[2%] mobile:max-w-[280px]">{t('hero.intro')}</p>
            </div>
          </div>
          <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-[#a6a6a6] pt-[26px] pb-[31px] border-t border-[rgba(255,255,255,.22)] xs:pb-[24px]">
            <a href="#validation" className="flex items-center gap-[10px] hover:text-white">{t('hero.scrollCta')} <ArrowDown size={14} /></a><span className="mobile:hidden">{t('hero.bottomNote')}</span><span className="xs:hidden">01 / 05</span>
          </div>
        </div>
      </section>

      <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] h-[49px] flex items-center whitespace-nowrap border-y border-line overflow-hidden text-[#73777d] bg-[#111]" aria-hidden="true">
        <div className="flex items-center w-max animate-signal-marquee">
          <div className="flex items-center flex-none">
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
          </div>
          <div className="flex items-center flex-none">
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
            <span className="px-[28px] flex-none">{t('signal.a')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span><span className="px-[28px] flex-none">{t('signal.b')}</span><span className="px-[28px] flex-none text-[#eee]">◻</span>
          </div>
        </div>
      </div>

      <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-[#0e0e0e] pt-0 " id="validation">
        <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('validation.eyebrowLeft')}</span><span>{t('validation.eyebrowRight')}</span></div>
        <div className="flex items-center justify-between mt-[72px] mobile:mt-[60px] [&_svg]:text-[#aaa] mobile:[&_svg]:w-[30px]"><h2 data-reveal="mask" style={fit(validationHeading, '.')} className="fit [--fit-size:clamp(64px,10.5vw,180px)] [--fit-avail:calc(100vw_-_2*var(--gutter)_-_76px)] leading-[.85] tracking-[-.075em] font-black mobile:[--fit-size:clamp(57px,13vw,95px)] xs:[--fit-size:13vw]">{validationHeading[0]}<span className="text-[#5f5f5f]">.</span></h2><ShieldCheck size={46} strokeWidth={1} aria-hidden="true" /></div>
        <p data-reveal="fade" className="text-mute text-[length:clamp(14px,1.3vw,17px)] leading-[1.6] mt-[28px] mobile:mt-[25px]">{t('validation.lead')}</p>
        <div className="grid grid-cols-3 border-y border-line mt-[72px] mobile:grid-cols-1 mobile:mt-[50px]">
          {testimonials.map((item, i) => <article data-reveal="fade" style={{ '--reveal-delay': `${i * 80}ms` }} className="min-h-[385px] pt-[30px] px-[34px] pb-[34px] flex flex-col border-r border-line first:pl-0 last:border-r-0 last:pr-0 tablet:px-[20px] mobile:min-h-[260px] mobile:py-[25px] mobile:px-0 mobile:border-r-0 mobile:border-b mobile:border-line mobile:last:border-b-0" key={item.number}>
            <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex justify-between text-dim"><span>({item.number})</span><span>{item.focus}</span></div>
            <blockquote className="text-[length:clamp(15px,1.3vw,20px)] leading-[1.5] font-medium tracking-[-.035em] pt-[38px] px-0 pb-[35px] mobile:text-[18px] mobile:py-[25px]">{item.quote}</blockquote>
            <div className="flex gap-[14px] items-start mt-auto">
              <span className="w-[20px] h-px bg-white mt-[7px]" />
              <div className="flex flex-col gap-[3px]"><strong className="text-[12px] tracking-[.02em]">{item.name}</strong><span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">// {item.role}</span></div>
            </div>
          </article>)}
        </div>
      </section>




      <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-ink pb-0" id="services">
        <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('capabilities.eyebrowLeft')}</span><span>{t('capabilities.eyebrowRight')}</span></div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[74px] mb-[60px] mobile:items-start mobile:flex-col mobile:mt-[55px] mobile:mb-[44px]"><h2 data-reveal="mask" style={fit(capabilitiesHeading, '.')} className="fit [--fit-size:clamp(64px,10.5vw,180px)] leading-[.85] tracking-[-.075em] font-black mobile:[--fit-size:clamp(57px,13vw,95px)] xs:[--fit-size:13vw]">{capabilitiesHeading[0]}<br />{capabilitiesHeading[1]}<span className="text-[#5f5f5f]">.</span></h2><Link href="/services" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">{t('capabilities.exploreCta')} <ArrowUpRight size={17} /></Link></div>
        <div className="grid grid-cols-3 border-y border-line mobile:grid-cols-1">
          {services.map((service, i) => <article data-reveal="fade" style={{ '--reveal-delay': `${i * 80}ms` }} className="flex flex-col justify-between min-h-[400px] pt-[29px] px-[35px] pb-[38px] border-r border-line transition-colors duration-200 first:pl-0 last:pr-0 last:border-r-0 hover:bg-[#141414] tablet:px-[20px] mobile:min-h-[295px] mobile:py-[25px] mobile:px-0 mobile:border-r-0 mobile:border-b mobile:border-line mobile:last:border-b-0" key={service.number}>
            <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex gap-[9px] items-center text-[#e1e1e1]">{service.number} <span className="text-[#666]">—</span> 03 <MoveUpRight size={18} className="ml-auto" /></div>
            <div><span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">// {service.category}</span><h3 style={fit(service.title)} className="fit [--fit-size:clamp(27px,2.9vw,48px)] [--fit-avail:calc((100vw_-_2*var(--gutter))/3_-_70px)] leading-[1.06] tracking-[-.065em] my-[20px] font-extrabold max-w-[400px] tablet:[--fit-size:30px] tablet:[--fit-avail:calc((100vw_-_2*var(--gutter))/3_-_40px)] mobile:[--fit-size:clamp(30px,7vw,42px)] mobile:[--fit-avail:calc(100vw_-_2*var(--gutter))]">{service.title}</h3><p className="text-[13px] text-mute leading-[1.7] max-w-[315px] mobile:max-w-[480px]">{service.description}</p></div>
          </article>)}
        </div>
      </section>


      <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] border-y border-line h-[55px] flex items-center overflow-hidden whitespace-nowrap text-mute bg-[#141414]" aria-hidden="true">
        <div className="flex items-center w-max animate-ticker">
          <div className="flex items-center flex-none">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
              <React.Fragment key={i}>
                <span className="px-[25px] flex-none">{item}</span>
                <span className="px-[25px] text-white flex-none mobile:px-[15px]">✳</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center flex-none">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
              <React.Fragment key={i}>
                <span className="px-[25px] flex-none">{item}</span>
                <span className="px-[25px] text-white flex-none mobile:px-[15px]">✳</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>


      <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-[#111] pt-0 pb-[60px]" id="work">
        <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right">
          <span>{t('selected.eyebrowLeft')}</span>
          <span>{t('selected.eyebrowRight', { count: String(projects.length).padStart(2, '0') })}</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[74px] mb-[60px] mobile:items-start mobile:flex-col mobile:mt-[55px] mobile:mb-[44px]">
          <h2 data-reveal="mask" style={fit(selectedHeading, '.')} className="fit [--fit-size:clamp(64px,10.5vw,180px)] leading-[.85] tracking-[-.075em] font-black mobile:[--fit-size:clamp(57px,13vw,95px)] xs:[--fit-size:13vw]">
            {selectedHeading[0]}<br />{selectedHeading[1]}<span className="text-[#5f5f5f]">.</span>
          </h2>
          <Link href="/case-studies" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">
            {t('selected.viewAllCta')} <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-[36px] gap-y-[56px] mobile:grid-cols-1 mobile:gap-y-[44px]">
          {projects.map((project, i) => (
            <Link href={`/case-studies/${project.slug}`} className="group flex flex-col" key={project.slug} data-reveal="fade" style={{ '--reveal-delay': `${i * 90}ms` }}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#161616] border border-line/70 after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,.2),transparent_40%,rgba(0,0,0,.35))] after:pointer-events-none">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={t('selected.imageAlt', { name: project.name, type: project.type })}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover [filter:grayscale(1)_brightness(.8)] transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.03] group-hover:[filter:grayscale(1)_brightness(1)]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-[24px] bg-[#141414]">
                    <span className="font-mono text-[12px] tracking-[.1em] text-dim uppercase">ALAZ / SPECIMEN {project.number}</span>
                    <span className="font-mono text-[12px] text-[#555] tracking-[.08em] mt-[6px]">// ASSET IN PROGRESS</span>
                  </div>
                )}
                <span className="absolute top-[20px] left-[20px] text-white z-[1] font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] bg-black/60 backdrop-blur-md px-[10px] py-[4px] border border-white/10">
                  ALAZ / {project.number}
                </span>
                <span className="w-[42px] h-[42px] grid place-items-center border border-white/20 bg-black/60 backdrop-blur-md absolute right-[20px] bottom-[20px] z-[1] transition-all duration-200 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>
              <div className="pt-[22px] pb-[20px] border-b border-line flex flex-col">
                <div className="flex items-center justify-between font-mono text-[12px] tracking-[.085em] text-dim mb-[8px]">
                  <span>{project.number} / {project.discipline}</span>
                  <span className="tablet:hidden">{project.type}</span>
                </div>
                <h3 className="text-[length:clamp(22px,2.2vw,34px)] font-extrabold tracking-[-.05em] leading-[1.15] text-white transition-colors group-hover:text-[#eee]">
                  {project.name}
                </h3>
                <p className="text-mute text-[13px] leading-[1.6] mt-[8px] line-clamp-2">
                  {project.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="min-h-[680px] relative bg-[#090909] overflow-hidden mobile:min-h-[650px]" id="contact">
        <BackgroundVideo src="/videos/start-a-project-hero.mp4" className="absolute inset-0 w-full h-full object-cover opacity-[.62]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.76)_0%,rgba(10,10,10,.68)_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] min-h-[680px] flex flex-col relative z-[1] mobile:min-h-[650px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right mt-[65px] text-[#bababa] mobile:mt-[35px]"><span>{t('start.eyebrowLeft')}</span><span>{t('start.eyebrowRight')}</span></div>
          <div className="text-center m-auto">
            <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] inline-flex items-center gap-[11px] border border-[#555] px-[18px] py-[12px] text-[#d9d9d9]"><span className="inline-block w-[6px] h-[6px] bg-white flex-none align-middle" /> {t('start.badge')}</span>
            <h2 data-reveal="mask" style={fit(startHeading, '.')} className="fit [--fit-size:clamp(80px,12.5vw,200px)] leading-[.8] tracking-[-.075em] font-black mt-[44px] mb-[30px] mobile:[--fit-size:clamp(68px,14vw,110px)] xs:[--fit-size:14vw]">{startHeading[0]}<br />{startHeading[1]}<span className="text-[#777]">.</span></h2>
            <p data-reveal="fade" className="text-[14px] text-[#b4b4b4] mb-[34px]">{t('start.paragraph')}</p>
            <Link href="/start-project" className="group relative inline-flex items-center justify-center gap-[18px] bg-black/40 backdrop-blur-md border border-white/20 text-white/90 px-[32px] py-[20px] min-h-[58px] font-mono text-[12px] font-semibold tracking-[0.2em] uppercase rounded-none transition-all duration-300 hover:bg-white hover:text-black hover:border-white active:scale-[0.98] xs:px-[22px] xs:gap-[12px]">
              <span className="absolute -top-[1px] -left-[1px] w-[7px] h-[7px] border-t-2 border-l-2 border-white/60 group-hover:border-black transition-colors duration-200 pointer-events-none" />
              <span className="absolute -top-[1px] -right-[1px] w-[7px] h-[7px] border-t-2 border-r-2 border-white/60 group-hover:border-black transition-colors duration-200 pointer-events-none" />
              <span className="absolute -bottom-[1px] -left-[1px] w-[7px] h-[7px] border-b-2 border-l-2 border-white/60 group-hover:border-black transition-colors duration-200 pointer-events-none" />
              <span className="absolute -bottom-[1px] -right-[1px] w-[7px] h-[7px] border-b-2 border-r-2 border-white/60 group-hover:border-black transition-colors duration-200 pointer-events-none" />
              <span className="relative flex h-2 w-2 items-center justify-center flex-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 group-hover:bg-emerald-700 transition-colors duration-200" />
              </span>
              <span className="whitespace-nowrap">{t('start.button')}</span>
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-none" />
            </Link>
          </div>
          <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex justify-between text-[#aaa] pt-[25px] pb-[30px] border-t border-line"><span className="mobile:max-w-[240px]">{t('start.bottomNote')}</span><span>05 / 05</span></div>
        </div>
      </section>
    </main >
  </>;
}

