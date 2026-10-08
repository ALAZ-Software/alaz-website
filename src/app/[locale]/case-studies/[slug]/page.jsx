import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import enMessages from '@messages/en.json';
import JsonLd, { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LOGO_URL, ORG_ID, SITE_NAME, absoluteUrl, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import { STORE_LINKS } from '@/lib/stores';
import StoreButtons from '@/components/StoreButtons';

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
  const theme = { '--project-bg': project.theme?.bg, '--project-fg': project.theme?.fg, '--project-accent': project.theme?.accent };

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
    <section className="grid grid-cols-12 gap-[var(--col-gap)] py-[var(--s-5)] border-t border-line mobile:flex mobile:flex-col" aria-labelledby={id}>
      <div className="col-span-6">
        <h2 id={id} className="t-meta uppercase text-fg-4 mb-[30px]">{eyebrow}</h2>
        <p style={fit(heading)} className="fit t-display-2 uppercase [--fit-avail:calc((100vw_-_2*var(--shell-pad))*.45)] mobile:[--fit-avail:calc(100vw_-_2*var(--shell-pad))]" data-reveal="lines">{heading[0]}<br />{heading[1]}</p>
      </div>
      <p className="t-lead text-fg-3 col-span-5 col-start-8 max-w-[46ch] pt-[42px] mobile:pt-[24px]" data-reveal="fade">{body}</p>
    </section>
  );

  return <>
    <BreadcrumbJsonLd crumbs={[
      { name: tSeo('breadcrumbHome'), url: urlFor(locale) },
      { name: tSeo('caseStudies'), url: urlFor(locale, '/case-studies') },
      { name, url },
    ]} />
    <JsonLd data={appSchema} />
    <main id="main" style={theme}>
      {/* Hero in the product's own colour: the image is shown, not buried under gradients. */}
      <section className="relative overflow-hidden bg-[var(--project-bg)] text-[var(--project-fg)]">
        <div className="shell relative z-[1] pt-[calc(var(--header-h)+40px)] pb-[var(--s-5)] min-h-[clamp(620px,92vh,980px)] flex flex-col">
          <div className="eyebrow t-meta uppercase !text-current !border-current/30 [&_a:hover]:opacity-70" data-reveal="line">
            <Link href="/case-studies">{t('allCaseStudies')}</Link>
            <span>{t('projectLabel')} / {project.number}</span>
          </div>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] items-end mt-auto pt-[var(--s-5)] mobile:flex mobile:flex-col mobile:items-start">
            <div className="col-span-7">
              <p className="t-meta uppercase opacity-70 mb-[20px]" data-reveal="fade">{project.type} / {project.discipline}</p>
              <h1 style={fit(project.name, '.')} className="fit t-display-1 uppercase mb-[24px] [--fit-avail:calc((100vw_-_2*var(--shell-pad))*.58)] mobile:[--fit-avail:calc(100vw_-_2*var(--shell-pad))]" data-reveal="lines">{project.name}<span className="dot">.</span></h1>
              <p className="t-lead max-w-[42ch] opacity-90" data-reveal="fade">{project.summary}</p>
              {(project.link || storeUrls.length > 0) && <div className="mt-[32px] flex flex-wrap items-stretch gap-[14px]" data-reveal="fade">
                {project.link && <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="btn-ghost !border-current hover:!bg-[var(--project-fg)] hover:!text-[var(--project-bg)]" data-magnetic>{t('visitCta', { site: project.link.label })} <Icon name="external" size={15} /></a>}
                {storeUrls.length > 0 && <StoreButtons links={stores} downloadLabel={t('storeDownload')} soonLabel={t('storeSoon')} />}
              </div>}
            </div>
            <div className="col-span-5 col-start-8 relative aspect-[16/10] overflow-hidden mobile:w-full" data-reveal="fade" data-delay="0.2">
              <Image src={project.heroImage ?? project.image} alt={project.heroAlt} fill sizes="(max-width: 760px) 100vw, 40vw" className="object-cover" priority data-parallax="5" />
            </div>
          </div>
        </div>
      </section>

      <div className="shell bg-ink">
        <dl className="grid grid-cols-5 border-b border-line py-[28px] gap-[20px] tablet:grid-cols-3 mobile:grid-cols-2" aria-label={t('factsLabel')}>
          {project.facts.map((fact) => <div key={fact.label}>
            <dt className="t-meta uppercase text-fg-4">{fact.label}</dt>
            <dd className="t-small font-medium mt-[6px] text-fg">{fact.href ? <a href={fact.href} target="_blank" rel="noopener noreferrer" className="border-b border-line-strong hover:border-ember">{fact.value}</a> : fact.value}</dd>
          </div>)}
        </dl>

        <Section id="problem-title" eyebrow={t('challengeEyebrow')} heading={project.headings.challenge} body={project.challenge} />
        <Section id="build-title" eyebrow={t('approachEyebrow')} heading={project.headings.approach} body={project.approach} />
        <Section id="shipped-title" eyebrow={t('outcomeEyebrow')} heading={project.headings.outcome} body={project.outcome} />

        {project.gallery?.length > 0 && (
          <section className="py-[var(--s-5)] border-t border-line" aria-labelledby="gallery-title">
            <div className="t-meta uppercase flex justify-between text-fg-4 mb-[30px]">
              <h2 id="gallery-title" className="font-normal text-inherit">{t('galleryEyebrow')}</h2>
              <span>{String(project.gallery.length).padStart(2, '0')}</span>
            </div>
            <ul className="rail-mobile grid grid-cols-4 gap-[var(--col-gap)] mobile:grid-cols-none">
              {project.gallery.map((src, i) => (
                <li key={src} className="relative aspect-[9/16] overflow-hidden border border-line bg-surface-2" data-reveal="fade" data-delay={(i % 4) * 0.07}>
                  <Image src={src} alt={project.galleryAlts?.[i] ?? `${name} ${i + 1}`} fill sizes="(max-width: 760px) 78vw, 25vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <ul className="grid grid-cols-3 border-y border-line mobile:grid-cols-1">
          {project.markers.map((marker, i) => (
            <li key={marker} className="py-[32px] pr-[24px] border-r border-line last:border-r-0 mobile:py-[20px] mobile:border-r-0 mobile:border-b mobile:border-line mobile:last:border-b-0" data-reveal="fade" data-delay={i * 0.08}>
              <span className="t-meta uppercase text-fg-4 block mb-[24px] mobile:mb-[10px]">0{i + 1} / {t('highlightLabel')}</span>
              <strong className="t-title-sm">{marker}</strong>
            </li>
          ))}
        </ul>

        <div className="t-meta uppercase flex justify-between items-center gap-[20px] py-[24px] border-b border-line text-fg-4 mobile:flex-col mobile:items-start">
          <span>{t('servicesPrompt')}</span>
          <Link href="/services" className="text-fg inline-flex items-center gap-[8px] hover:text-ember-soft">{t('servicesCta')} <Icon name="arrow" size={14} /></Link>
        </div>

        <Link href={`/case-studies/${next.slug}`} style={{ '--project-bg': next.theme?.bg, '--project-fg': next.theme?.fg }} className="project-row group flex justify-between items-end gap-[20px] py-[var(--s-5)] border-b border-line -mx-[var(--shell-pad)] px-[var(--shell-pad)]" data-cursor="NEXT">
          <span className="t-meta uppercase text-fg-4 shrink-0 group-hover:text-[var(--project-fg)]">{t('nextProjectLabel')} / {next.number}</span>
          <span className="t-display-2 uppercase flex gap-[18px] items-center text-right group-hover:text-[var(--project-fg)] transition-colors duration-fast [--fit-size:clamp(28px,4vw,72px)]">
            <span className="min-w-0">{next.name}</span> <Icon name="arrow" size={34} className="transition-transform duration-fast group-hover:translate-x-[10px]" />
          </span>
        </Link>

        <div className="flex justify-between items-center gap-[24px] pt-[var(--s-4)] pb-[var(--s-6)] mobile:flex-col mobile:items-start">
          <span className="t-meta uppercase text-fg-4">{t('contactPrompt')}</span>
          <Link href={`/start-project?from=${project.slug}`} className="btn-ghost" data-magnetic>{t('contactCta')} <Icon name="arrow" size={15} /></Link>
        </div>
      </div>
    </main>
  </>;
}
