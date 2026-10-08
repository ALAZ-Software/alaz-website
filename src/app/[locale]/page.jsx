import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buildMetadata } from '@/lib/seo';
import { fit } from '@/lib/fit';
import BackgroundVideo from '@/components/BackgroundVideo';

const EYEBROW = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right';
const H2 = 'fit [--fit-size:clamp(64px,10.5vw,180px)] leading-[.85] tracking-[-.075em] font-black mobile:[--fit-size:clamp(57px,13vw,95px)] xs:[--fit-size:13vw]';
const MONO = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6]';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return buildMetadata({ locale, path: '', title: t('title'), description: t('description'), absoluteTitle: true });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tRoot = await getTranslations();
  const services = tRoot.raw('services');
  const projects = tRoot.raw('projects');
  const posts = [...tRoot.raw('blogPosts')].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  const facts = t.raw('hero.facts');
  const selectedHeading = t.raw('selected.heading');
  const capabilitiesHeading = t.raw('capabilities.heading');
  const writingHeading = t.raw('writing.heading');
  const startHeading = t.raw('start.heading');
  const count = String(projects.length).padStart(2, '0');

  return <>
    <main>
      {/* Hero. The wordmark is the brand; the h1 is the one sentence that says what ALAZ does. */}
      <section className="min-h-dvh relative bg-[#090909] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,.19),transparent_40%,rgba(0,0,0,.18))] after:pointer-events-none" aria-labelledby="hero-title">
        <video poster="/videos/poster.png" className="absolute inset-0 w-full h-full object-cover object-[center_56%] opacity-[.62] mobile:object-[54%_center]" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/dark-planet.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.55)_0%,rgba(10,10,10,.10)_48%,#0a0a0a_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] min-h-dvh pt-[100px] flex flex-col relative z-[1] mobile:pt-[66px]">
          <div className={cn(MONO, 'flex items-center justify-between text-[#a6a6a6] pt-[35px] mobile:pt-[25px]')}>
            <span>{t('hero.toplineLeft')}</span><span className="mobile:hidden">{t('hero.toplineRight')}</span>
          </div>
          <div className="my-auto relative pt-[22vh] px-0 pb-[2vh] mobile:pt-[14vh] mobile:pb-[6vh]">
            <p className={cn(MONO, 'text-[#b9b9b9] mb-[8px] ml-[1.2vw] mobile:ml-0')}>{t('hero.kicker')}</p>
            <p className="font-display font-black leading-[.8] tracking-[-.02em] -ml-[.044em] whitespace-nowrap max-w-full text-[length:clamp(90px,16vw,320px)] tablet:text-[17vw] mobile:text-[16vw] xs:text-[16vw]" aria-hidden="true">{t('hero.wordmark')}<span className="text-[.7em] text-[#858585] tracking-[-.1em]">.</span></p>
            <div className="flex justify-between items-start gap-[30px] mt-[clamp(42px,5vw,85px)] pl-[1.2vw] mobile:mt-[42px] mobile:pl-0 mobile:flex-col mobile:gap-[23px]">
              <h1 id="hero-title" data-reveal="fade" className="font-display text-[length:clamp(22px,2.9vw,48px)] leading-[1.08] tracking-[-.05em] font-black max-w-[12ch] mobile:text-[length:clamp(25px,7vw,39px)] xs:text-[28px]">{t('hero.taglineTop')}<br />{t('hero.taglineBottom')}</h1>
              <p data-reveal="fade" style={{ '--reveal-delay': '120ms' }} className="max-w-[330px] text-[#c3c5c8] text-[15px] leading-[1.6] mt-[2px] mr-[9%] tablet:mr-[2%] mobile:max-w-[320px]">{t('hero.intro')}</p>
            </div>
            <ul className={cn(MONO, 'flex flex-wrap gap-x-[32px] gap-y-[12px] text-[#a6a6a6] mt-[clamp(32px,3.4vw,56px)] pl-[1.2vw] mobile:pl-0 mobile:mt-[32px] mobile:flex-col mobile:gap-y-[10px]')}>
              {facts.map((f) => <li key={f.label}>
                {f.external
                  ? <a href={f.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[8px] hover:text-white"><span className="text-white">{f.label}</span> — {f.value} <ArrowUpRight size={13} aria-hidden="true" /></a>
                  : <Link href={f.href} className="hover:text-white"><span className="text-white">{f.label}</span> — {f.value}</Link>}
              </li>)}
            </ul>
          </div>
          <div className={cn(MONO, 'flex items-center justify-between text-[#a6a6a6] pt-[26px] pb-[31px] border-t border-[rgba(255,255,255,.22)] xs:pb-[24px]')}>
            <a href="#work" className="flex items-center gap-[10px] hover:text-white">{t('hero.seeWork')} <ArrowDown size={14} aria-hidden="true" /></a>
            <a href={`mailto:${t('hero.email')}`} className="hover:text-white">{t('hero.email')}</a>
          </div>
        </div>
      </section>

      {/* Work. The products are the proof, so they come first. */}
      <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-[#111] pt-0 pb-[60px]" id="work" aria-labelledby="work-title">
        <div data-reveal="line" className={EYEBROW}>
          <span>{t('selected.eyebrowLeft')}</span>
          <span>{t('selected.eyebrowRight', { count })}</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[74px] mb-[60px] mobile:items-start mobile:flex-col mobile:mt-[55px] mobile:mb-[44px]">
          <h2 id="work-title" data-reveal="mask" style={fit(selectedHeading, '.')} className={H2}>
            {selectedHeading[0]}<br />{selectedHeading[1]}<span className="text-[#5f5f5f]">.</span>
          </h2>
          <Link href="/case-studies" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">
            {t('selected.viewAllCta')} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-[36px] gap-y-[56px] mobile:grid-cols-1 mobile:gap-y-[44px]">
          {projects.map((project, i) => (
            <article key={project.slug} data-reveal="fade" style={{ '--reveal-delay': `${i * 90}ms` }} className="group flex flex-col">
              <Link href={`/case-studies/${project.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-[#161616] border border-line/70 after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(180deg,rgba(0,0,0,.06),transparent_40%,rgba(0,0,0,.2))]" aria-label={project.name}>
                <Image src={project.image} alt={project.coverAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] [filter:brightness(.94)] group-hover:[filter:brightness(1)]" />
                <span className="w-[42px] h-[42px] grid place-items-center border border-white/20 bg-black/60 backdrop-blur-md absolute right-[20px] bottom-[20px] z-[1] transition-colors duration-200 group-hover:bg-white group-hover:text-black" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </Link>
              <div className="pt-[22px] pb-[20px] border-b border-line flex flex-col">
                <div className={cn(MONO, 'flex items-center justify-between text-dim mb-[8px]')}>
                  <span>{project.number} / {project.discipline}</span>
                  {project.link
                    ? <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[6px] text-white hover:text-mute"><span className="inline-block w-[6px] h-[6px] bg-white" aria-hidden="true" /> {t('selected.liveLabel')} · {project.link.label}</a>
                    : <span className="tablet:hidden">{project.type}</span>}
                </div>
                <h3 className="text-[length:clamp(22px,2.2vw,34px)] font-extrabold tracking-[-.05em] leading-[1.15] text-white">
                  <Link href={`/case-studies/${project.slug}`} className="transition-colors group-hover:text-[#eee]">{project.name}</Link>
                </h3>
                <p className="text-mute text-[14px] leading-[1.6] mt-[8px]">{project.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services. Each card links to its section on the services page. */}
      <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-ink pb-[70px]" id="services" aria-labelledby="services-title">
        <div data-reveal="line" className={EYEBROW}><span>{t('capabilities.eyebrowLeft')}</span><span>{t('capabilities.eyebrowRight')}</span></div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[74px] mb-[40px] mobile:items-start mobile:flex-col mobile:mt-[55px] mobile:mb-[34px]">
          <h2 id="services-title" data-reveal="mask" style={fit(capabilitiesHeading, '.')} className={H2}>{capabilitiesHeading[0]}<br />{capabilitiesHeading[1]}<span className="text-[#5f5f5f]">.</span></h2>
          <Link href="/services" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">{t('capabilities.exploreCta')} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <p data-reveal="fade" className="text-mute text-[length:clamp(15px,1.3vw,18px)] leading-[1.6] max-w-[640px] mb-[50px] mobile:mb-[36px]">{t('capabilities.lead')}</p>
        <div className="grid grid-cols-3 border-y border-line mobile:grid-cols-1">
          {services.map((service, i) => <Link href={service.href} key={service.number} data-reveal="fade" style={{ '--reveal-delay': `${i * 80}ms` }} className="group flex flex-col justify-between min-h-[400px] pt-[29px] px-[35px] pb-[38px] border-r border-line transition-colors duration-200 first:pl-0 last:pr-0 last:border-r-0 hover:bg-[#141414] tablet:px-[20px] mobile:min-h-0 mobile:py-[25px] mobile:px-0 mobile:border-r-0 mobile:border-b mobile:border-line mobile:last:border-b-0">
            <div className={cn(MONO, 'flex gap-[9px] items-center text-[#e1e1e1]')}>{service.number} <span className="text-[#666]">—</span> 03 <ArrowUpRight size={18} className="ml-auto transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" aria-hidden="true" /></div>
            <div className="mobile:mt-[22px]"><span className={cn(MONO, 'text-dim')}>{service.category}</span><h3 style={fit(service.title)} className="fit [--fit-size:clamp(27px,2.9vw,48px)] [--fit-avail:calc((100vw_-_2*var(--gutter))/3_-_70px)] leading-[1.06] tracking-[-.065em] my-[20px] font-extrabold max-w-[400px] tablet:[--fit-size:30px] tablet:[--fit-avail:calc((100vw_-_2*var(--gutter))/3_-_40px)] mobile:[--fit-size:clamp(30px,7vw,42px)] mobile:[--fit-avail:calc(100vw_-_2*var(--gutter))]">{service.title}</h3><p className="text-[14px] text-mute leading-[1.7] max-w-[340px] mobile:max-w-[480px]">{service.description}</p><p className="text-[13px] text-[#8a8e94] leading-[1.7] max-w-[340px] mt-[12px] mobile:max-w-[480px]">{service.detail}</p></div>
          </Link>)}
        </div>
      </section>

      {/* Latest posts. */}
      <section className="w-full px-[clamp(24px,4.2vw,72px)] bg-[#0e0e0e] pb-[80px]" id="writing" aria-labelledby="writing-title">
        <div data-reveal="line" className={EYEBROW}><span>{t('writing.eyebrowLeft')}</span><span>{t('writing.eyebrowRight')}</span></div>
        <div className="flex flex-wrap items-end justify-between gap-[30px] mt-[74px] mb-[50px] mobile:items-start mobile:flex-col mobile:mt-[55px] mobile:mb-[40px]">
          <h2 id="writing-title" data-reveal="mask" style={fit(writingHeading, '.')} className="fit [--fit-size:clamp(48px,8vw,130px)] leading-[.88] tracking-[-.07em] font-black mobile:[--fit-size:clamp(44px,11vw,80px)]">{writingHeading[0]}<br />{writingHeading[1]}<span className="text-[#5f5f5f]">.</span></h2>
          <Link href="/blog" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">{t('writing.allCta')} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="grid grid-cols-2 border-t border-line mobile:grid-cols-1">
          {posts.map((post, i) => <Link key={post.slug} href={`/blog/${post.slug}`} data-reveal="fade" style={{ '--reveal-delay': `${i * 80}ms` }} className="group flex flex-col border-b border-line border-r border-line p-[30px_32px_28px] even:border-r-0 transition-colors duration-200 hover:bg-[#141414] mobile:border-r-0 mobile:px-0 mobile:py-[24px]">
            <div className={cn(MONO, 'flex justify-between text-dim')}><span>{post.tag}</span><time dateTime={post.date}>{post.dateLabel}</time></div>
            <h3 className="text-[length:clamp(22px,2.2vw,32px)] tracking-[-.05em] leading-[1.1] font-extrabold mt-[18px] mb-[12px]">{post.title}</h3>
            <p className="text-mute text-[14px] leading-[1.6]">{post.excerpt}</p>
            <span className={cn(MONO, 'inline-flex items-center gap-[7px] text-[#cfcfcf] mt-[22px] transition-[gap] duration-200 group-hover:gap-[12px]')}>{t('writing.readCta')} <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" /></span>
          </Link>)}
        </div>
      </section>

      {/* Start a project. */}
      <section className="min-h-[640px] relative bg-[#090909] overflow-hidden" id="contact" aria-labelledby="start-title">
        <BackgroundVideo src="/videos/start-a-project-hero.mp4" className="absolute inset-0 w-full h-full object-cover opacity-[.62]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,.76)_0%,rgba(10,10,10,.68)_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] min-h-[640px] flex flex-col relative z-[1]">
          <div data-reveal="line" className={cn(EYEBROW, 'mt-[65px] text-[#bababa] mobile:mt-[35px]')}><span>{t('start.eyebrowLeft')}</span><span>{t('start.eyebrowRight')}</span></div>
          <div className="my-auto py-[70px] mobile:py-[50px] flex flex-wrap items-end justify-between gap-[40px] mobile:flex-col mobile:items-start">
            <div>
              <h2 id="start-title" data-reveal="mask" style={fit(startHeading, '.')} className="fit [--fit-size:clamp(80px,12.5vw,200px)] leading-[.8] tracking-[-.075em] font-black mobile:[--fit-size:clamp(68px,14vw,110px)] xs:[--fit-size:14vw]">{startHeading[0]}<br />{startHeading[1]}<span className="text-[#777]">.</span></h2>
              <p data-reveal="fade" className="text-[16px] text-[#b4b4b4] leading-[1.6] max-w-[520px] mt-[30px]">{t('start.paragraph')}</p>
            </div>
            <div className="flex flex-col gap-[18px] items-start">
              <Link href="/start-project" className="inline-flex items-center justify-center gap-[22px] bg-white text-[#050505] px-[26px] py-[19px] text-[12px] font-extrabold tracking-[.04em] min-h-[58px] [transition:background_.2s_ease,transform_.2s_ease] hover:bg-[#d5d5d5] hover:[transform:translateY(-2px)] active:[transform:scale(.98)]">
                {t('start.button')} <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <span className={cn(MONO, 'text-[#aaa]')}>{t('start.emailPrefix')} <a href={`mailto:${t('hero.email')}`} className="text-white hover:text-mute">{t('hero.email')}</a></span>
            </div>
          </div>
          <div className={cn(MONO, 'flex justify-between text-[#aaa] pt-[25px] pb-[30px] border-t border-line')}><span>{t('start.bottomNote')}</span><span>{t('hero.toplineRight')}</span></div>
        </div>
      </section>
    </main>
  </>;
}
