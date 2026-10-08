import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import HeatField from '@/components/HeatField';

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
    <main id="main">
      <section className="relative overflow-hidden bg-ink">
        <div className="heat-field-wrap"><HeatField variant="quiet" /></div>
        <div className="shell relative z-[1] pt-[calc(var(--header-h)+40px)]">
          <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div>
          <p className="t-meta uppercase text-fg-3 mt-[var(--s-6)]" data-reveal="fade">{t('kicker')}</p>
          <h1 style={fit(heading, '.')} className="fit t-display-1 uppercase mt-[20px] mb-[var(--s-5)]" data-reveal="lines">{heading[0]}<br />{heading[1]}<span className="dot">.</span></h1>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] items-end pb-[var(--s-5)] mobile:flex mobile:flex-col mobile:items-start"><p className="t-lead col-span-7 max-w-[48ch]" data-reveal="fade">{t('introText')}</p><span className="t-meta uppercase text-fg-4 col-span-4 col-start-9 text-right mobile:text-left" data-reveal="fade">{t('introNote')}</span></div>
        </div>
      </section>

      {/* 01 The name: the flame, drawn by the shader. */}
      <section className="relative overflow-hidden bg-ink" aria-labelledby="origin-title">
        <div className="heat-field-wrap"><HeatField variant="band" /></div>
        <div className="shell relative z-[1] py-[var(--s-6)]">
          <div className="eyebrow t-meta uppercase" data-reveal="line"><span>01 / {t('originEyebrowLeft')}</span><span>{t('originEyebrowRight')}</span></div>
          <p className="t-meta uppercase text-fg-4 mt-[var(--s-5)]" data-reveal="fade">{t('originLabel')}</p>
          <h2 id="origin-title" style={fit(t('originWord'), '.')} className="fit t-display-1 uppercase mt-[16px] mb-[var(--s-4)]" data-reveal="lines">{t('originWord')}<span className="dot">.</span></h2>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] mobile:flex mobile:flex-col">
            <div className="col-span-7 flex flex-col gap-[24px]">
              {originParagraphs.map((paragraph, i) => <p className="t-lead max-w-[50ch]" data-reveal="fade" data-delay={i * 0.1} key={i}>{paragraph}</p>)}
            </div>
            <p className="t-small text-fg-3 col-span-3 col-start-10 max-w-[30ch] mobile:max-w-none" data-reveal="fade">{t('originDefinition')}</p>
          </div>
        </div>
      </section>

      {/* 02 Our own products */}
      <section className="shell bg-surface py-[var(--s-6)]" aria-labelledby="products-title">
        <div className="eyebrow t-meta uppercase" data-reveal="line"><span>02 / {t('productsEyebrowLeft')}</span><span>{t('productsEyebrowRight')}</span></div>
        <div className="grid grid-cols-12 gap-[var(--col-gap)] items-end mt-[var(--s-5)] mb-[var(--s-4)] mobile:flex mobile:flex-col mobile:items-start">
          <h2 id="products-title" style={fit(productsHeading, '.')} className="fit t-display-2 uppercase col-span-7" data-reveal="lines">{productsHeading[0]}<br />{productsHeading[1]}<span className="dot">.</span></h2>
          <div className="col-span-4 col-start-9 flex flex-col gap-[20px] items-start"><p className="t-body text-fg-3" data-reveal="fade">{t('productsText')}</p><Link href="/case-studies" className="link-draw t-meta uppercase">{t('productsCta')} <Icon name="arrow" size={14} /></Link></div>
        </div>
        <ul className="grid grid-cols-2 gap-[var(--col-gap)] mobile:grid-cols-1">
          {projects.map((project, i) => <li key={project.slug} className="group border-t border-line pt-[22px]" data-reveal="fade" data-delay={i * 0.1}>
            <Link href={`/case-studies/${project.slug}`} className="flex gap-[22px] items-start mobile:flex-col" data-cursor="VIEW">
              <span className="relative block w-[200px] shrink-0 aspect-[16/10] overflow-hidden bg-surface-2 border border-line mobile:w-full"><Image src={project.image} alt={project.coverAlt} fill sizes="(max-width: 760px) 100vw, 200px" className="object-cover transition-transform duration-base ease-out group-hover:scale-[1.04]" /></span>
              <span className="flex flex-col">
                <span className="t-meta uppercase text-fg-4">{project.number} / {project.discipline}</span>
                <span className="t-title mt-[8px] text-fg">{project.name}</span>
                <span className="t-small text-fg-3 mt-[8px]">{project.summary}</span>
              </span>
            </Link>
          </li>)}
        </ul>
      </section>

      {/* 03 How we work: steps stack as you scroll. */}
      <section className="shell bg-ink py-[var(--s-6)]" aria-labelledby="process-title">
        <div className="eyebrow t-meta uppercase" data-reveal="line"><span>03 / {t('processEyebrowLeft')}</span><span>{t('processEyebrowRight')}</span></div>
        <h2 id="process-title" style={fit(processHeading, '.')} className="fit t-display-2 uppercase my-[var(--s-5)]" data-reveal="lines">{processHeading[0]}<br />{processHeading[1]}<span className="dot">.</span></h2>
        <ol>
          {processSteps.map((step, i) => <li key={step.number} className="grid grid-cols-12 gap-[var(--col-gap)] items-start border-t border-line py-[var(--s-4)] last:border-b mobile:grid-cols-[60px_1fr] mobile:gap-[12px]" data-reveal="fade" data-delay={i * 0.06}><span className="t-meta text-fg-4 col-span-1">{step.number} / 04</span><h3 className="t-display-2 uppercase col-span-5 [--fit-size:clamp(32px,4.2vw,72px)]">{step.title}</h3><p className="t-body text-fg-3 col-span-4 col-start-9 max-w-[44ch] mobile:col-start-2 mobile:col-span-1">{step.body}</p></li>)}
        </ol>
        <Link href="/services" className="link-draw t-meta uppercase mt-[var(--s-4)]">{t('servicesCta')} <Icon name="arrow" size={14} /></Link>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <div className="heat-field-wrap"><HeatField variant="quiet" /></div>
        <div className="shell relative z-[1] py-[var(--s-7)] flex items-end justify-between gap-[40px] mobile:flex-col mobile:items-start"><p className="t-display-2 uppercase [--fit-size:clamp(30px,4.5vw,72px)]" data-reveal="lines">{t('endTextTop')}<br /><span className="text-fg-4">{t('endTextBottom')}</span></p><Link href="/start-project" className="btn" data-magnetic>{t('startCta')} <Icon name="arrow" size={15} /></Link></div>
      </section>
    </main>
  </>;
}
