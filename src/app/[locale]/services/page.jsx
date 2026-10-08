import { getTranslations, setRequestLocale } from 'next-intl/server';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import JsonLd, { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { ORG_ID, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import HeatField from '@/components/HeatField';

const GridLines = () => <div className="grid-lines" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '/services', title: t('title'), description: t('description'), eyebrow: tSeo('services') });
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  const tAbout = await getTranslations({ locale, namespace: 'about' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  const projects = (await getTranslations({ locale })).raw('projects');
  const heading = t.raw('heading');
  const overviewTitle = t.raw('overviewTitle');
  const items = t.raw('items');
  const labels = t.raw('itemLabels');
  const processTitle = t.raw('processTitle');
  const processSteps = t.raw('processSteps');
  const faqTitle = t.raw('faqTitle');
  const faqs = t.raw('faqs');
  const url = urlFor(locale, '/services');

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${tSeo('services')} — ALAZ`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Service', name: item.title, description: item.description, url: `${url}#${item.id}`, serviceType: item.title, provider: { '@id': ORG_ID }, areaServed: 'Worldwide' },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: t('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('services'), url }]} />
      <JsonLd data={itemList} />
      <FaqJsonLd items={faqs} />
      <main id="main">
        <section className="relative overflow-hidden bg-ink">
          <GridLines />
          <div className="shell relative z-[1] pt-[calc(var(--header-h)+40px)]">
            <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div>
            <p className="t-meta uppercase text-fg-3 mt-[var(--s-6)]" data-reveal="fade">{t('kicker')}</p>
            <h1 style={fit(heading, '.')} className="fit t-display-1 uppercase mt-[20px] mb-[var(--s-5)]" data-reveal="lines">{heading[0]}<br />{heading[1]}<span className="dot">.</span></h1>
            <div className="grid grid-cols-12 gap-[var(--col-gap)] items-end pb-[var(--s-5)] mobile:flex mobile:flex-col mobile:items-start">
              <p className="t-lead col-span-7 max-w-[48ch]" data-reveal="fade">{t('introText')}</p>
              <span className="t-meta uppercase text-fg-4 col-span-4 col-start-9 text-right mobile:text-left" data-reveal="fade">{t('introNote')}</span>
            </div>
          </div>
        </section>

        {/* Sticky index + five service blocks */}
        <section className="shell bg-ink pb-[var(--s-6)]">
          <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('overviewEyebrowLeft')}</span><span>{t('overviewEyebrowRight')}</span></div>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] items-end mt-[var(--s-5)] mb-[var(--s-5)] mobile:flex mobile:flex-col mobile:items-start">
            <h2 style={fit(overviewTitle, '.')} className="fit t-display-1 uppercase col-span-7" data-reveal="lines">{overviewTitle[0]}<br />{overviewTitle[1]}<span className="dot">.</span></h2>
            <p className="t-body text-fg-3 col-span-4 col-start-9" data-reveal="fade">{t('overviewText')}</p>
          </div>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] tablet:flex tablet:flex-col">
            <nav aria-label={t('overviewEyebrowLeft')} className="col-span-3 tablet:sticky tablet:top-[var(--header-h)] tablet:z-[5] tablet:bg-ink/90 tablet:backdrop-blur tablet:-mx-[var(--shell-pad)] tablet:px-[var(--shell-pad)] tablet:py-[12px]">
              <ol className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-[6px] tablet:flex-row tablet:overflow-x-auto tablet:[scrollbar-width:none] tablet:static">
                {items.map((item) => <li key={item.id} className="shrink-0"><a href={`#${item.id}`} className="t-meta uppercase text-fg-4 hover:text-fg flex gap-[12px] py-[6px] tablet:border tablet:border-line tablet:px-[12px]"><span>{item.number}</span><span>{item.title}</span></a></li>)}
              </ol>
            </nav>
            <div className="col-span-9 flex flex-col">
              {items.map((item) => (
                <article key={item.id} id={item.id} className="border-t border-line py-[var(--s-5)] scroll-mt-[calc(var(--header-h)+16px)] last:border-b" data-reveal="fade">
                  <div className="flex items-baseline justify-between gap-[20px] t-meta uppercase text-fg-4 mb-[24px]"><span>{item.number} / {String(items.length).padStart(2, '0')}</span><span>{item.category}</span></div>
                  <h2 style={fit(item.title)} className="fit t-display-2 uppercase [--fit-avail:calc((100vw_-_2*var(--shell-pad))*.7)] tablet:[--fit-avail:calc(100vw_-_2*var(--shell-pad))]">{item.title}</h2>
                  <p className="t-lead text-fg-2 mt-[22px] max-w-[52ch]">{item.description}</p>
                  <div className="grid grid-cols-9 gap-[var(--col-gap)] mt-[var(--s-4)] mobile:flex mobile:flex-col">
                    <div className="col-span-5">
                      <p className="t-meta uppercase text-fg-4">{labels.whatItIs}</p>
                      <p className="t-body text-fg-3 mt-[10px] max-w-[56ch]">{item.whatItIs}</p>
                      <p className="t-meta uppercase text-fg-4 mt-[32px]">{labels.deliverables}</p>
                      <ul className="mt-[10px] max-w-[56ch]">
                        {item.deliverables.map((d) => <li key={d} className="flex gap-[14px] t-body text-fg-3 py-[9px] border-t border-line first:border-t-0"><span className="text-ember" aria-hidden="true">—</span><span>{d}</span></li>)}
                      </ul>
                    </div>
                    <div className="col-span-3 col-start-7 flex flex-col gap-[28px]">
                      <div>
                        <p className="t-meta uppercase text-fg-4">{labels.stack}</p>
                        <p className="t-small text-fg-2 mt-[10px] leading-[1.9]">{item.stack.join(' · ')}</p>
                      </div>
                      <div><p className="t-meta uppercase text-fg-4">{labels.outcome}</p><p className="t-small text-fg-2 mt-[10px]">{item.outcome}</p></div>
                      <div><p className="t-meta uppercase text-fg-4">{labels.bestFor}</p><p className="t-small text-fg-3 mt-[10px]">{item.bestFor}</p></div>
                      {item.proof && projects.some((p) => p.slug === item.proof.slug) && (
                        <div><p className="t-meta uppercase text-fg-4">{labels.proof}</p><p className="t-small mt-[10px]"><Link href={`/case-studies/${item.proof.slug}`} className="text-fg border-b border-line-strong transition-colors duration-fast hover:border-ember">{item.proof.label}</Link></p></div>
                      )}
                      <Link href={`/start-project?type=${item.id}`} className="link-draw t-meta uppercase self-start">{labels.cta} <Icon name="arrow" size={14} /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="shell bg-surface py-[var(--s-6)]">
          <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('processEyebrowLeft')}</span><span>{t('processEyebrowRight')}</span></div>
          <h2 style={fit(processTitle, '.')} className="fit t-display-2 uppercase my-[var(--s-5)]" data-reveal="lines">{processTitle[0]}<br />{processTitle[1]}<span className="dot">.</span></h2>
          <ol className="grid grid-cols-4 gap-[var(--col-gap)] laptop:grid-cols-2 mobile:grid-cols-1 [&>li]:border-t [&>li]:border-line">
            {processSteps.map((step, i) => (
              <li key={step.number} className="pt-[22px] pb-[30px]" data-reveal="fade" data-delay={i * 0.08}>
                <span className="t-meta text-fg-4">{step.number} / {String(processSteps.length).padStart(2, '0')}</span>
                <h3 className="t-title-sm mt-[14px]">{step.title}</h3>
                <p className="t-small text-fg-3 mt-[12px] max-w-[36ch]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="shell bg-ink py-[var(--s-6)]">
          <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('faqEyebrowLeft')}</span><span>{t('faqEyebrowRight')}</span></div>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] mt-[var(--s-5)] tablet:flex tablet:flex-col">
            <h2 style={fit(faqTitle, '.')} className="fit t-display-2 uppercase col-span-5 [--fit-avail:calc((100vw_-_2*var(--shell-pad))*.4)] tablet:[--fit-avail:calc(100vw_-_2*var(--shell-pad))] self-start sticky top-[calc(var(--header-h)+24px)] tablet:static" data-reveal="lines">{faqTitle[0]}<br />{faqTitle[1]}<span className="dot">.</span></h2>
            <div className="col-span-6 col-start-7">
              {faqs.map((faq) => (
                <details key={faq.q} className="faq group border-t border-line last:border-b py-[22px]">
                  <summary className="flex items-center justify-between gap-[20px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="t-title-sm">{faq.q}</span>
                    <Icon name="plus" size={18} className="text-fg-4 transition-transform duration-fast group-open:rotate-45" />
                  </summary>
                  <p className="t-body text-fg-3 mt-[14px] max-w-[60ch]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink">
          <div className="heat-field-wrap"><HeatField variant="quiet" /></div>
          <div className="shell relative z-[1] py-[var(--s-7)] flex items-end justify-between gap-[40px] mobile:flex-col mobile:items-start">
            <p className="t-display-2 uppercase [--fit-size:clamp(30px,4.5vw,72px)]" data-reveal="lines">{tAbout('endTextTop')}<br /><span className="text-fg-4">{tAbout('endTextBottom')}</span></p>
            <Link href="/start-project" className="btn" data-magnetic>{tAbout('startCta')} <Icon name="arrow" size={15} /></Link>
          </div>
        </section>
      </main>
    </>
  );
}
