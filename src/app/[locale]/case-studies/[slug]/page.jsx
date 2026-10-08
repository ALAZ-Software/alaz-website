import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import enMessages from '@messages/en.json';
import JsonLd, { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LOGO_URL, ORG_ID, SITE_NAME, absoluteUrl, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import { STORE_LINKS } from '@/lib/stores';
import StoreButtons from '@/components/StoreButtons';

const MONO = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6]';
const titleCase = (s) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

// Slugs come from messages/en.json; anything else is a real 404, not a page that says "not found".
export const dynamicParams = false;

export function generateStaticParams() {
  return enMessages.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudy' });
  const tRoot = await getTranslations({ locale });
  const project = tRoot.raw('projects').find((item) => item.slug === slug);
  if (!project) notFound();

  return buildMetadata({
    locale,
    path: `/case-studies/${project.slug}`,
    title: t('metaTitleTemplate', { name: titleCase(project.name) }),
    description: project.metaDescription,
    type: 'article',
    image: { url: absoluteUrl(project.image), width: project.imageWidth ?? 1200, height: project.imageHeight ?? 630, alt: project.coverAlt },
  });
}

export default async function CaseStudyPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('caseStudy');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const stores = STORE_LINKS[project.slug];
  const storeUrls = Object.values(stores ?? {}).filter(Boolean);
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length] || projects[0];
  const name = titleCase(project.name);
  const url = urlFor(locale, `/case-studies/${project.slug}`);

  // The products are real software, so they get a SoftwareApplication entity, not a generic CreativeWork.
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': project.link ? 'WebApplication' : 'MobileApplication',
    '@id': `${url}#app`,
    name,
    description: project.summary,
    applicationCategory: project.schema?.category,
    operatingSystem: project.schema?.os,
    image: absoluteUrl(project.image),
    ...(project.gallery ? { screenshot: project.gallery.map(absoluteUrl) } : {}),
    ...(project.link ? { url: project.link.href, browserRequirements: 'Requires JavaScript' } : {}),
    ...(storeUrls.length ? { installUrl: storeUrls, sameAs: storeUrls } : {}),
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@id': ORG_ID },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 } },
    inLanguage: locale,
    mainEntityOfPage: url,
  };

  const Section = ({ eyebrow, heading, body, id }) => (
    <section className="grid grid-cols-2 gap-[50px] py-[65px] border-t border-line mobile:grid-cols-1 mobile:gap-0 mobile:py-[50px]" aria-labelledby={id}>
      <div>
        <h2 id={id} className={`${MONO} text-dim mb-[34px]`}>{eyebrow}</h2>
        <p data-reveal="mask" style={fit(heading)} className="fit [--fit-size:clamp(38px,5vw,80px)] [--fit-avail:calc((100vw_-_2*var(--gutter)_-_50px)/2)] leading-[.99] tracking-[-.07em] font-extrabold font-display mobile:[--fit-avail:calc(100vw_-_2*var(--gutter))]">{heading[0]}<br />{heading[1]}</p>
      </div>
      <p data-reveal="fade" className="text-mute leading-[1.8] text-[length:clamp(16px,1.6vw,22px)] max-w-[560px] pt-[42px] mobile:pt-[25px]">{body}</p>
    </section>
  );

  return <>
    <BreadcrumbJsonLd crumbs={[
      { name: tSeo('breadcrumbHome'), url: urlFor(locale) },
      { name: tSeo('caseStudies'), url: urlFor(locale, '/case-studies') },
      { name, url },
    ]} />
    <JsonLd data={appSchema} />
    <main>
      <section className="w-full relative bg-[#090909] overflow-hidden">
        <Image src={project.heroImage ?? project.image} alt={project.heroAlt} fill sizes="100vw" className="object-cover [filter:brightness(.95)]" priority />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.78)_0%,rgba(9,9,9,.30)_42%,rgba(9,9,9,.62)_72%,#090909_100%)] pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,.55)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] pb-[clamp(60px,7vw,110px)] min-h-[clamp(620px,92vh,980px)] relative z-[1] flex flex-col mobile:pt-[100px] mobile:min-h-[600px]">
          <div data-reveal="line" className={`${MONO} flex items-center justify-between text-[#bdbdbd] border-t border-line pt-[19px] [&_a:hover]:text-white`}>
            <Link href="/case-studies">{t('allCaseStudies')}</Link>
            <span>{t('projectLabel')} / {project.number}</span>
          </div>
          <div className="mt-auto pt-[110px] mobile:pt-[80px]">
            <p className={`${MONO} text-[#c9c9c9] mb-[22px]`}>{project.type} / {project.discipline}</p>
            <h1 data-reveal="mask" style={fit(project.name, '.')} className="fit [--fit-size:clamp(64px,12vw,200px)] leading-[.86] tracking-[-.075em] font-black mb-[22px] mobile:[--fit-size:clamp(64px,17vw,135px)] mobile:mb-[32px]">{project.name}<span className="text-[#8a8a8a]">.</span></h1>
            <p data-reveal="fade" className="text-[length:clamp(19px,2.4vw,32px)] tracking-[-.04em] max-w-[740px] leading-[1.4] text-[#d6d6d6]">{project.summary}</p>
            {(project.link || stores) && <div data-reveal="fade" className="mt-[34px] flex flex-wrap items-stretch gap-[14px]">
              {project.link && <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] bg-black/30 backdrop-blur-sm min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">{t('visitCta', { site: project.link.label })} <ArrowUpRight size={17} aria-hidden="true" /></a>}
              {stores && storeUrls.length > 0 && <StoreButtons links={stores} downloadLabel={t('storeDownload')} soonLabel={t('storeSoon')} />}
            </div>}
          </div>
        </div>
      </section>

      <div className="w-full px-[clamp(24px,4.2vw,72px)]">
        {/* Project facts */}
        <dl className="grid grid-cols-5 border-b border-line py-[28px] gap-[20px] tablet:grid-cols-3 mobile:grid-cols-2" aria-label={t('factsLabel')}>
          {project.facts.map((fact) => <div key={fact.label}>
            <dt className={`${MONO} text-dim`}>{fact.label}</dt>
            <dd className="text-[15px] font-semibold tracking-[-.01em] mt-[6px] text-white">{fact.href ? <a href={fact.href} target="_blank" rel="noopener noreferrer" className="border-b border-[#555] hover:border-white">{fact.value}</a> : fact.value}</dd>
          </div>)}
        </dl>

        <Section id="problem-title" eyebrow={t('challengeEyebrow')} heading={project.headings.challenge} body={project.challenge} />
        <Section id="build-title" eyebrow={t('approachEyebrow')} heading={project.headings.approach} body={project.approach} />
        <Section id="shipped-title" eyebrow={t('outcomeEyebrow')} heading={project.headings.outcome} body={project.outcome} />

        {project.gallery?.length > 0 && (
          <section className="py-[65px] border-t border-line mobile:py-[50px]" aria-labelledby="gallery-title">
            <div className={`${MONO} flex justify-between text-dim mb-[34px]`}>
              <h2 id="gallery-title" className="font-normal text-inherit">{t('galleryEyebrow')}</h2>
              <span>{String(project.gallery.length).padStart(2, '0')}</span>
            </div>
            <ul className="grid grid-cols-4 gap-[20px] mobile:grid-cols-2 mobile:gap-[12px]">
              {project.gallery.map((src, i) => (
                <li key={src} data-reveal="fade" style={{ '--reveal-delay': `${(i % 4) * 70}ms` }} className="relative aspect-[9/16] overflow-hidden border border-line bg-[#111]">
                  <Image src={src} alt={project.galleryAlts?.[i] ?? `${name} ${i + 1}`} fill sizes="(max-width: 760px) 50vw, 25vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <ul className="grid grid-cols-3 border-y border-line mobile:grid-cols-1">
          {project.markers.map((marker, i) => (
            <li key={marker} data-reveal="fade" style={{ '--reveal-delay': `${i * 80}ms` }} className="p-[35px_25px] border-r border-line min-h-[145px] first:pl-0 last:border-r-0 mobile:min-h-0 mobile:py-[22px] mobile:px-0 mobile:border-r-0 mobile:border-b mobile:border-line">
              <span className={`${MONO} text-dim block mb-[35px] mobile:mb-[12px]`}>0{i + 1} / {t('highlightLabel')}</span>
              <strong className="text-[15px] font-bold">{marker}</strong>
            </li>
          ))}
        </ul>

        <div className={`${MONO} flex justify-between items-center gap-[20px] py-[26px] border-b border-line text-dim mobile:flex-col mobile:items-start`}>
          <span>{t('servicesPrompt')}</span>
          <Link href="/services" className="text-white inline-flex items-center gap-[8px] hover:text-mute">{t('servicesCta')} <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>

        <Link href={`/case-studies/${next.slug}`} className="group flex justify-between items-end gap-[20px] py-[70px] border-b border-line mobile:py-[55px]">
          <span className={`${MONO} text-dim shrink-0`}>{t('nextProjectLabel')} / {next.number}</span>
          <span className="text-[length:clamp(26px,3.4vw,46px)] font-extrabold tracking-[-.05em] leading-[1.05] flex gap-[18px] items-center text-right mobile:text-[length:clamp(20px,5.6vw,30px)] mobile:leading-[1.1] mobile:gap-[12px]">
            <span className="min-w-0">{next.name}</span> <ArrowRight size={38} strokeWidth={1.2} className="flex-none transition-transform duration-200 group-hover:translate-x-[10px]" aria-hidden="true" />
          </span>
        </Link>
      </div>

      <div className="w-full px-[clamp(24px,4.2vw,72px)] flex justify-between items-center gap-[24px] pt-[50px] pb-[135px] text-mute mobile:flex-col mobile:items-start">
        <span className={`${MONO} text-dim`}>{t('contactPrompt')}</span>
        <Link href={`/start-project?from=${project.slug}`} className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">
          {t('contactCta')} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </main>
  </>;
}
