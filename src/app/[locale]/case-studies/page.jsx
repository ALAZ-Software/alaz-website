import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'archive.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '/case-studies', title: t('title'), description: t('description'), keywords: tSeo.raw('keywords.archive') });
}

export default async function ArchivePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations('archive');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const heading = t.raw('heading');
  const tableHeaders = t.raw('tableHeaders');

  return <>
    <BreadcrumbJsonLd crumbs={[{ name: tSeo('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('caseStudies'), url: urlFor(locale, '/case-studies') }]} />
    <main className="w-full min-h-[70vh]">
      <section className="w-full relative bg-[#090909] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,.35),transparent_40%,rgba(0,0,0,.35))] after:pointer-events-none">
        <video poster="/videos/poster.png" className="absolute inset-0 w-full h-full object-cover opacity-[.55] pointer-events-none" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/videos/the-work-section.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.60)_0%,rgba(9,9,9,.20)_50%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] relative z-[1] mobile:pt-[100px]">
          <div data-reveal="line" className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div>
          <p className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute mt-[clamp(80px,10vw,155px)] mobile:mt-[85px]">{t('kicker')}</p>
          <h1 data-reveal="mask" style={fit(heading, '.')} className="fit [--fit-size:clamp(84px,16vw,270px)] leading-[.86] tracking-[-.075em] font-black mt-[25px] mb-[60px] mobile:[--fit-size:clamp(75px,17vw,135px)] mobile:mb-[40px]">{heading.join(' ')}<span className="text-[#6e6e6e]">.</span></h1>
          <div className="flex justify-between items-end gap-[30px] pb-[75px] mobile:pb-[60px] mobile:items-start mobile:flex-col mobile:gap-[20px]"><p className="text-[length:clamp(18px,2vw,27px)] max-w-[550px] tracking-[-.04em] leading-[1.4]">{t('introText')}</p><span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('introNote', { count: String(projects.length).padStart(2, '0') })}</span></div>
        </div>
      </section>
      <div className="w-full px-[clamp(24px,4.2vw,72px)]">
        <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] grid grid-cols-[15%_1fr_25%_50px] text-dim py-[18px] border-t border-line mobile:grid-cols-[14%_1fr_30px] mobile:[&>span:nth-child(3)]:hidden"><span>{tableHeaders[0]}</span><span>{tableHeaders[1]}</span><span>{tableHeaders[2]}</span><span className="justify-self-end whitespace-nowrap">{tableHeaders[3]}</span></div>
        {projects.map((project, i) => <Link data-reveal="fade" style={{ '--reveal-delay': `${i * 60}ms` }} href={`/case-studies/${project.slug}`} className="group relative grid grid-cols-[15%_1fr_25%_50px] items-center min-h-[200px] border-t border-line transition-[padding,background] duration-[250ms] ease-in-out last-of-type:border-b last-of-type:border-line hover:pl-[20px] hover:bg-[#141414] mobile:grid-cols-[14%_1fr_30px] mobile:min-h-[145px] mobile:hover:pl-0 mobile:hover:bg-transparent" key={project.slug}>
          <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{project.number} /</span>
          <div className="min-w-0"><h2 style={fit(project.name)} className="fit [--fit-size:clamp(48px,7vw,105px)] [--fit-avail:calc((100vw_-_2*var(--gutter))*.6_-_50px)] tracking-[-.08em] leading-none font-extrabold mobile:[--fit-size:55px] mobile:[--fit-avail:calc((100vw_-_2*var(--gutter))*.86_-_30px)] xs:[--fit-size:43px]">{project.name}</h2><span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute xs:text-[9px]">{project.discipline}</span></div>
          <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim mobile:hidden">{project.type}</span>
          <ArrowUpRight className="justify-self-end" size={28} strokeWidth={1.3} />
          <div className="absolute z-[2] right-[10%] top-1/2 w-[220px] h-[130px] opacity-0 pointer-events-none -translate-y-[40%] -rotate-4 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:-translate-y-1/2 group-hover:-rotate-4 mobile:hidden"><Image src={project.image} alt={t('previewAlt', { name: project.name })} fill sizes="220px" className="object-cover [filter:grayscale(1)]" /></div>
        </Link>)}
        <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex justify-between py-[23px] pb-[155px] text-dim mobile:pb-[100px]"><span>{t('noteLeft')}</span><span>{t('noteRight')}</span></div>
      </div>
    </main>
  </>;
}


