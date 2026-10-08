import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import enMessages from '@messages/en.json';
import JsonLd, { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LOGO_URL, ORG_ID, SITE_NAME, absoluteUrl, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import { STORE_LINKS } from '@/lib/stores';
import StoreButtons from '@/components/StoreButtons';

export function generateStaticParams() {
  return enMessages.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudy' });
  const tRoot = await getTranslations({ locale });
  const project = tRoot.raw('projects').find((item) => item.slug === slug);
  if (!project) return {};

  return buildMetadata({
    locale,
    path: `/case-studies/${project.slug}`,
    title: t('metaTitleTemplate', { name: project.name }),
    description: t('metaDescriptionTemplate', { name: project.name, summary: project.summary }),
    image: project.image ? { url: absoluteUrl(project.image), width: project.imageWidth ?? 1200, height: project.imageHeight ?? 630, alt: project.name } : undefined,
  });
}

export default async function CaseStudyPage({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations('caseStudy');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const project = projects.find(item => item.slug === slug);
  if (!project) return (
    <main className="pt-[76px] min-h-[70vh] mobile:pt-[66px] w-full px-[clamp(24px,4.2vw,72px)]">
      <h1 data-reveal="mask" style={fit(t('notFoundHeading'))} className="fit [--fit-size:clamp(64px,12vw,200px)] font-black my-[25px]">{t('notFoundHeading')}</h1>
      <Link href="/case-studies" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">
        {t('backToArchive')} <ArrowLeft size={16} />
      </Link>
    </main>
  );

  const stores = STORE_LINKS[project.slug];
  const currentIndex = projects.findIndex(item => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length] || projects[0];
  const challengeHeading = t.raw('challengeHeading');
  const approachHeading = t.raw('approachHeading');
  const outcomeHeading = t.raw('outcomeHeading');

  const url = urlFor(locale, `/case-studies/${project.slug}`);
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    headline: project.name,
    description: project.summary,
    ...(project.image ? { image: absoluteUrl(project.image) } : {}),
    ...(project.link ? { sameAs: [project.link.href] } : {}),
    genre: project.type,
    keywords: [project.discipline, project.type].join(', '),
    url,
    mainEntityOfPage: url,
    inLanguage: locale,
    creator: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: urlFor(locale) },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, logo: { '@type': 'ImageObject', url: LOGO_URL } },
  };

  return <>
    <BreadcrumbJsonLd crumbs={[
      { name: tSeo('breadcrumbHome'), url: urlFor(locale) },
      { name: tSeo('caseStudies'), url: urlFor(locale, '/case-studies') },
      { name: project.name, url },
    ]} />
    <JsonLd data={caseStudySchema} />
    <main>
      {/* The project visual sits behind the title, layered like the video heroes on the other pages. */}
      <section className="w-full relative bg-[#090909] overflow-hidden">
        {project.image && <Image src={project.heroImage ?? project.image} alt={t('imageAlt', { name: project.name })} fill sizes="100vw" className={project.colorImage ? 'object-cover [filter:brightness(.95)]' : 'object-cover [filter:grayscale(1)_brightness(.75)]'} priority />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.78)_0%,rgba(9,9,9,.30)_42%,rgba(9,9,9,.62)_72%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,.55)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] pb-[clamp(60px,7vw,110px)] min-h-[clamp(620px,92vh,980px)] relative z-[1] flex flex-col mobile:pt-[100px] mobile:min-h-[600px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-[#bdbdbd] border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right">
            <Link href="/case-studies">{t('allCaseStudies')}</Link>
            <span>{t('projectLabel')} / {project.number}</span>
          </div>
          <div className="mt-auto pt-[110px] mobile:pt-[80px]">
            <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-[#c9c9c9] mb-[22px]">{project.type} / {project.discipline}</p>
            <h1 data-reveal="mask" style={fit(project.name, '.')} className="fit [--fit-size:clamp(64px,12vw,200px)] leading-[.86] tracking-[-.075em] font-black mb-[22px] mobile:[--fit-size:clamp(64px,17vw,135px)] mobile:mb-[32px]">{project.name}<span className="text-[#8a8a8a]">.</span></h1>
            <p data-reveal="fade" className="text-[length:clamp(19px,2.4vw,32px)] tracking-[-.04em] max-w-[740px] leading-[1.4] text-[#d6d6d6]">{project.summary}</p>
            {(project.link || stores) && <div data-reveal="fade" className="mt-[34px] flex flex-wrap items-stretch gap-[14px]">
              {project.link && <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] bg-black/30 backdrop-blur-sm min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">{t('visitCta', { site: project.link.label })} <ArrowUpRight size={17} /></a>}
              {stores && <StoreButtons links={stores} downloadLabel={t('storeDownload')} soonLabel={t('storeSoon')} />}
            </div>}
          </div>
        </div>
      </section>

      <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[35px]">
        <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex justify-between text-dim pb-[90px] mobile:pb-[60px]">
          <span>{t('selectedWorkLabel')}</span>
          <span>{project.number} / {String(projects.length).padStart(2, '0')}</span>
        </div>

        <div className="grid grid-cols-2 gap-[50px] py-[65px] border-t border-line mobile:grid-cols-1 mobile:gap-0 mobile:py-[50px]">
          <div>
            <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim mb-[34px]">{t('challengeEyebrow')}</p>
            <h2 data-reveal="mask" style={fit(challengeHeading)} className="fit [--fit-size:clamp(38px,5vw,80px)] [--fit-avail:calc((100vw_-_2*var(--gutter)_-_50px)/2)] leading-[.99] tracking-[-.07em] font-extrabold mobile:[--fit-avail:calc(100vw_-_2*var(--gutter))]">{challengeHeading[0]}<br />{challengeHeading[1]}</h2>
          </div>
          <p data-reveal="fade" className="text-mute leading-[1.8] text-[length:clamp(16px,1.6vw,22px)] max-w-[520px] pt-[42px] mobile:pt-[25px]">{project.challenge}</p>
        </div>

        <div className="grid grid-cols-2 gap-[50px] py-[65px] border-t border-line mobile:grid-cols-1 mobile:gap-0 mobile:py-[50px]">
          <div>
            <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim mb-[34px]">{t('approachEyebrow')}</p>
            <h2 data-reveal="mask" style={fit(approachHeading)} className="fit [--fit-size:clamp(38px,5vw,80px)] [--fit-avail:calc((100vw_-_2*var(--gutter)_-_50px)/2)] leading-[.99] tracking-[-.07em] font-extrabold mobile:[--fit-avail:calc(100vw_-_2*var(--gutter))]">{approachHeading[0]}<br />{approachHeading[1]}</h2>
          </div>
          <p data-reveal="fade" className="text-mute leading-[1.8] text-[length:clamp(16px,1.6vw,22px)] max-w-[520px] pt-[42px] mobile:pt-[25px]">{project.approach}</p>
        </div>

        <div className="grid grid-cols-2 gap-[50px] py-[65px] border-t border-line mobile:grid-cols-1 mobile:gap-0 mobile:py-[50px]">
          <div>
            <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim mb-[34px]">{t('outcomeEyebrow')}</p>
            <h2 data-reveal="mask" style={fit(outcomeHeading)} className="fit [--fit-size:clamp(38px,5vw,80px)] [--fit-avail:calc((100vw_-_2*var(--gutter)_-_50px)/2)] leading-[.99] tracking-[-.07em] font-extrabold mobile:[--fit-avail:calc(100vw_-_2*var(--gutter))]">{outcomeHeading[0]}<br />{outcomeHeading[1]}</h2>
          </div>
          <p data-reveal="fade" className="text-mute leading-[1.8] text-[length:clamp(16px,1.6vw,22px)] max-w-[520px] pt-[42px] mobile:pt-[25px]">{project.outcome}</p>
        </div>

        {project.gallery?.length > 0 && (
          <section className="py-[65px] border-t border-line mobile:py-[50px]" aria-label={t('galleryEyebrow')}>
            <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex justify-between text-dim mb-[34px]">
              <span>{t('galleryEyebrow')}</span>
              <span>{String(project.gallery.length).padStart(2, '0')}</span>
            </div>
            <ul className="grid grid-cols-4 gap-[20px] mobile:grid-cols-2 mobile:gap-[12px]">
              {project.gallery.map((src, i) => (
                <li key={src} data-reveal="fade" style={{ '--reveal-delay': `${(i % 4) * 70}ms` }} className="relative aspect-[9/16] overflow-hidden border border-line bg-[#111]">
                  <Image src={src} alt={t('galleryAlt', { name: project.name, number: i + 1 })} fill sizes="(max-width: 760px) 50vw, 25vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid grid-cols-3 border-y border-line mobile:grid-cols-1">
          {project.markers.map((marker, i) => (
            <div key={marker} data-reveal="fade" style={{ '--reveal-delay': `${i * 80}ms` }} className="p-[35px_25px] border-r border-line min-h-[145px] first:pl-0 last:border-r-0 mobile:min-h-[110px] mobile:py-[22px] mobile:px-0 mobile:border-r-0 mobile:border-b mobile:border-line">
              <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim block mb-[35px] mobile:mb-[17px]">0{i + 1} / {t('deliverableLabel')}</span>
              <strong className="text-[15px] font-bold">{marker}</strong>
            </div>
          ))}
        </div>

        <Link href={`/case-studies/${next.slug}`} className="group flex justify-between items-end py-[70px] border-b border-line mobile:py-[55px]">
          <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('nextProjectLabel')} / {next.number}</span>
          <span className="text-[length:clamp(26px,3.4vw,46px)] font-extrabold tracking-[-.05em] leading-[1.05] flex gap-[18px] items-center max-w-[78%] mobile:text-[length:clamp(22px,6vw,30px)] mobile:leading-[1.1] mobile:gap-[12px] mobile:max-w-[80%] xs:text-[length:clamp(20px,7vw,26px)] xs:gap-[10px] xs:max-w-[82%]">
            <span className="min-w-0 [overflow-wrap:anywhere]">{next.name}</span> <ArrowRight size={38} strokeWidth={1.2} className="flex-none transition-transform duration-200 group-hover:translate-x-[10px]" />
          </span>
        </Link>
      </div>

      <div className="w-full px-[clamp(24px,4.2vw,72px)] flex justify-between items-center gap-[24px] pt-[50px] pb-[135px] text-mute mobile:flex-col mobile:items-start">
        <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('contactPrompt')}</span>
        <Link href="/start-project" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">
          {t('contactCta')} <ArrowUpRight size={17} />
        </Link>
      </div>
    </main>
  </>;
}

