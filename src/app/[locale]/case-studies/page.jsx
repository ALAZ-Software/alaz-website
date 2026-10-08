import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';

const GridLines = () => <div className="grid-lines" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'archive.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '/case-studies', title: t('title'), description: t('description'), eyebrow: tSeo('caseStudies') });
}

export default async function ArchivePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('archive');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const heading = t.raw('heading');
  const tableHeaders = t.raw('tableHeaders');

  return <>
    <BreadcrumbJsonLd crumbs={[{ name: tSeo('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('caseStudies'), url: urlFor(locale, '/case-studies') }]} />
    <main id="main" className="min-h-[70vh]">
      <section className="relative overflow-hidden bg-ink">
        <GridLines />
        <div className="shell relative z-[1] pt-[calc(var(--header-h)+40px)]">
          <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div>
          <p className="t-meta uppercase text-fg-3 mt-[var(--s-6)]" data-reveal="fade">{t('kicker')}</p>
          <h1 style={fit(heading, '.')} className="fit t-display-1 uppercase mt-[20px] mb-[var(--s-5)]" data-reveal="lines">{heading.join(' ')}<span className="dot">.</span></h1>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] items-end pb-[var(--s-5)] mobile:flex mobile:flex-col mobile:items-start"><p className="t-lead col-span-7 max-w-[48ch]" data-reveal="fade">{t('introText')}</p><span className="t-meta uppercase text-fg-4 col-span-4 col-start-9 text-right mobile:text-left" data-reveal="fade">{t('introNote', { count: String(projects.length).padStart(2, '0') })}</span></div>
        </div>
      </section>

      {/* Index: a row per project; hover colours the row with the product and shows the cover. */}
      <div className="shell">
        <div className="t-meta uppercase grid grid-cols-12 gap-[var(--col-gap)] text-fg-4 py-[18px] border-t border-line mobile:hidden" aria-hidden="true"><span className="col-span-1">{tableHeaders[0]}</span><span className="col-span-7">{tableHeaders[1]}</span><span className="col-span-3">{tableHeaders[2]}</span><span className="col-span-1 text-right">{tableHeaders[3]}</span></div>
        <ul className="border-t border-line mobile:border-t-0">
          {projects.map((project, i) => <li key={project.slug} data-reveal="fade" data-delay={i * 0.06}>
            <Link href={`/case-studies/${project.slug}`} style={{ '--project-bg': project.theme?.bg, '--project-fg': project.theme?.fg }} className="project-row group relative grid grid-cols-12 gap-[var(--col-gap)] items-center py-[clamp(28px,3.4vw,52px)] border-b border-line mobile:flex mobile:flex-col mobile:items-start mobile:gap-[16px]" data-cursor="VIEW">
              <span className="t-meta text-fg-4 col-span-1 group-hover:text-[var(--project-fg)]">{project.number}</span>
              <span className="col-span-7 min-w-0 flex flex-col gap-[10px]">
                <h2 style={fit(project.name)} className="fit t-display-1 uppercase [--fit-size:clamp(44px,7vw,120px)] [--fit-avail:calc((100vw_-_2*var(--shell-pad))*.55)] mobile:[--fit-avail:calc(100vw_-_2*var(--shell-pad))] group-hover:text-[var(--project-fg)] transition-colors duration-fast">{project.name}</h2>
                <span className="t-small text-fg-3 max-w-[60ch] group-hover:text-[var(--project-fg)] transition-colors duration-fast">{project.summary}</span>
              </span>
              <span className="t-meta uppercase text-fg-4 col-span-3 group-hover:text-[var(--project-fg)] transition-colors duration-fast">{project.discipline} · {project.type}</span>
              <Icon name="arrow" size={28} className="col-span-1 justify-self-end group-hover:text-[var(--project-fg)] transition-transform duration-fast group-hover:translate-x-[6px] mobile:hidden" />
              <span className="project-preview absolute right-[8%] top-1/2 w-[300px] aspect-[16/10] -translate-y-1/2 opacity-0 pointer-events-none overflow-hidden border border-line transition-[opacity,transform] duration-base ease-out group-hover:opacity-100 group-hover:[transform:translateY(-50%)_rotate(-2deg)] mobile:hidden" aria-hidden="true"><Image src={project.image} alt="" fill sizes="300px" className="object-cover" /></span>
              <span className="relative hidden mobile:block w-full aspect-[16/10] overflow-hidden border border-line" aria-hidden="true"><Image src={project.image} alt="" fill sizes="100vw" className="object-cover" /></span>
            </Link>
          </li>)}
        </ul>
        <div className="t-meta uppercase flex justify-between items-center gap-[20px] py-[23px] pb-[var(--s-7)] text-fg-4 mobile:flex-col mobile:items-start"><span>{t('noteLeft')}</span><span className="flex items-center gap-[14px]">{t('noteRight')} <Link href="/start-project" className="text-fg inline-flex items-center gap-[8px] hover:text-ember-soft">{t('noteCta')} <Icon name="arrow" size={14} /></Link></span></div>
      </div>
    </main>
  </>;
}
