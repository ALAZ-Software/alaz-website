import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import JsonLd, { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { ORG_ID, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';
import BackgroundVideo from '@/components/BackgroundVideo';

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
      item: {
        '@type': 'Service',
        name: item.title,
        description: item.description,
        url: `${url}#${item.id}`,
        serviceType: item.title,
        provider: { '@id': ORG_ID },
        areaServed: 'Worldwide',
      },
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: t('breadcrumbHome'), url: urlFor(locale) },
          { name: tSeo('services'), url },
        ]}
      />
      <JsonLd data={itemList} />
      <FaqJsonLd items={faqs} />
      <main>
        {/* Hero Section */}
        <section className="w-full relative bg-[#090909] overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(0,0,0,.35),transparent_40%,rgba(0,0,0,.35))] after:pointer-events-none">
          <video
            poster="/videos/poster.png"
            className="absolute inset-0 w-full h-full object-cover opacity-[.5] pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/videos/services-section.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,.60)_0%,rgba(9,9,9,.20)_50%,#090909_100%)] pointer-events-none" aria-hidden="true" />
          <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] relative z-[1] mobile:pt-[100px]">
            <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right">
              <span>{t('eyebrowLeft')}</span>
              <span>{t('eyebrowRight')}</span>
            </div>
            <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-mute mt-[105px] mobile:mt-[85px]">
              {t('kicker')}
            </p>
            <h1 data-reveal="mask" style={fit(heading, '.')} className="fit [--fit-size:clamp(67px,12.4vw,205px)] font-black tracking-[-.075em] leading-[.86] my-[25px] mb-[70px] mobile:[--fit-size:clamp(60px,12.5vw,100px)]">
              {heading[0]}
              <br />
              {heading[1]}
              <span className="text-[#6e6e6e]">.</span>
            </h1>
            <div className="flex justify-between items-end gap-[30px] pb-[75px] mobile:pb-[60px] mobile:items-start mobile:flex-col mobile:gap-[20px]">
              <p data-reveal="fade" className="text-[length:clamp(18px,2vw,27px)] max-w-[550px] tracking-[-.04em] leading-[1.4]">
                {t('introText')}
              </p>
              <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">
                {t('introNote')}
              </span>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full px-[clamp(24px,4.2vw,72px)] pt-[80px] pb-[40px] bg-[#090909] mobile:pt-[60px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px]">
            <span>{t('overviewEyebrowLeft')}</span>
            <span>{t('overviewEyebrowRight')}</span>
          </div>
          <div className="flex justify-between items-end gap-[40px] mt-[70px] mobile:flex-col mobile:items-start mobile:mt-[50px] mobile:gap-[24px]">
            <h2 data-reveal="mask" style={fit(overviewTitle, '.')} className="fit [--fit-size:clamp(48px,8vw,130px)] font-black tracking-[-.07em] leading-[.88]">
              {overviewTitle[0]}
              <br />
              {overviewTitle[1]}
              <span className="text-[#6e6e6e]">.</span>
            </h2>
            <p data-reveal="fade" className="text-[15px] leading-[1.7] text-mute max-w-[340px] mobile:max-w-none">{t('overviewText')}</p>
          </div>
          <nav aria-label={t('overviewEyebrowRight')} className="flex flex-wrap gap-[10px] mt-[50px]">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-mono text-[12px] tracking-[.085em] text-dim border border-line px-[14px] py-[10px] transition-colors duration-200 hover:text-white hover:border-white/40"
              >
                {item.number} / {item.title}
              </a>
            ))}
          </nav>
        </section>

        {/* Core Services Section */}
        <section className="w-full px-[clamp(24px,4.2vw,72px)] pt-[40px] pb-[100px] bg-[#090909] mobile:pb-[70px]">
          <div className="flex flex-col">
            {items.map((item) => (
              <article
                data-reveal="fade"
                key={item.id}
                id={item.id}
                className="group border-t border-line py-[50px] scroll-mt-[90px] transition-colors duration-200 hover:bg-[#0f0f0f] px-[15px] -mx-[15px] mobile:py-[35px]"
              >
                <div className="grid grid-cols-[12%_1fr_36%] gap-[30px] items-start mobile:grid-cols-1 mobile:gap-[20px]">
                  <div className="flex flex-col gap-[8px]">
                    <span className="font-mono text-[12px] font-bold tracking-[.085em] text-dim">
                      {item.number} / {String(items.length).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[12px] font-normal tracking-[.085em] text-mute uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h2 style={fit(item.title)} className="fit [--fit-size:clamp(30px,4.5vw,60px)] [--fit-avail:calc((100vw_-_2*var(--gutter))*.52_-_60px)] font-extrabold tracking-[-.06em] leading-[1] text-white mobile:[--fit-avail:calc(100vw_-_2*var(--gutter))]">
                      {item.title}
                    </h2>
                    <p className="text-[18px] text-white/90 tracking-[-.02em] leading-[1.5] mt-[18px] max-w-[600px]">
                      {item.description}
                    </p>

                    <p className="font-mono text-[12px] tracking-[.085em] text-dim mt-[34px]">{labels.whatItIs}</p>
                    <p className="text-[15px] text-mute leading-[1.7] mt-[10px] max-w-[600px]">{item.whatItIs}</p>

                    <p className="font-mono text-[12px] tracking-[.085em] text-dim mt-[30px]">{labels.deliverables}</p>
                    <ul className="mt-[12px] max-w-[600px]">
                      {item.deliverables.map((d) => (
                        <li key={d} className="flex gap-[14px] text-[15px] text-mute leading-[1.6] py-[9px] border-t border-line first:border-t-0">
                          <span className="font-mono text-dim" aria-hidden="true">+</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-[28px] pt-[5px] mobile:pt-0">
                    <div>
                      <p className="font-mono text-[12px] tracking-[.085em] text-dim">{labels.stack}</p>
                      <ul className="flex flex-wrap gap-[8px] mt-[12px]">
                        {item.stack.map((tech) => (
                          <li key={tech} className="font-mono text-[12px] tracking-[.05em] text-mute border border-line px-[10px] py-[6px]">{tech}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[12px] tracking-[.085em] text-dim">{labels.outcome}</p>
                      <p className="text-[14px] leading-[1.7] text-white/85 mt-[10px]">{item.outcome}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[12px] tracking-[.085em] text-dim">{labels.bestFor}</p>
                      <p className="text-[14px] leading-[1.7] text-mute mt-[10px]">{item.bestFor}</p>
                    </div>
                    {item.proof && projects.some((p) => p.slug === item.proof.slug) && (
                      <div>
                        <p className="font-mono text-[12px] tracking-[.085em] text-dim">{labels.proof}</p>
                        <p className="text-[14px] leading-[1.7] text-mute mt-[10px]"><Link href={`/case-studies/${item.proof.slug}`} className="text-white border-b border-[#555] transition-colors duration-200 hover:border-white">{item.proof.label}</Link></p>
                      </div>
                    )}
                    <Link href={`/start-project?type=${item.id}`} className="inline-flex items-center gap-[14px] self-start font-mono text-[12px] tracking-[.03em] border-b border-white pb-[8px] [transition:gap_.2s_ease] hover:gap-[22px]">{labels.cta} <ArrowUpRight size={14} aria-hidden="true" /></Link>
                  </div>
                </div>
              </article>
            ))}
            <div className="border-b border-line w-full" />
          </div>
        </section>

        {/* Process Section */}
        <section className="w-full px-[clamp(24px,4.2vw,72px)] pt-[20px] pb-[110px] bg-[#090909] mobile:pb-[80px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px]">
            <span>{t('processEyebrowLeft')}</span>
            <span>{t('processEyebrowRight')}</span>
          </div>
          <h2 data-reveal="mask" style={fit(processTitle, '.')} className="fit [--fit-size:clamp(48px,8vw,130px)] font-black tracking-[-.07em] leading-[.88] my-[70px] mobile:my-[50px]">
            {processTitle[0]}
            <br />
            {processTitle[1]}
            <span className="text-[#6e6e6e]">.</span>
          </h2>
          <ol className="grid grid-cols-4 gap-[30px] mobile:grid-cols-1 mobile:gap-0 [&>li]:border-t [&>li]:border-line">
            {processSteps.map((step, i) => (
              <li key={step.number} data-reveal="fade" style={{ '--reveal-delay': `${i * 80}ms` }} className="pt-[22px] pb-[30px] pr-[10px]">
                <span className="font-mono text-[12px] tracking-[.085em] text-dim">{step.number} / {String(processSteps.length).padStart(2, '0')}</span>
                <h3 className="text-[24px] font-extrabold tracking-[-.05em] mt-[14px]">{step.title}</h3>
                <p className="text-[15px] leading-[1.7] text-mute mt-[12px]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ Section */}
        <section className="w-full px-[clamp(24px,4.2vw,72px)] pt-[20px] pb-[120px] bg-[#090909] mobile:pb-[80px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px]">
            <span>{t('faqEyebrowLeft')}</span>
            <span>{t('faqEyebrowRight')}</span>
          </div>
          <div className="grid grid-cols-[1fr_1.2fr] gap-[60px] mt-[70px] tablet:grid-cols-1 tablet:gap-[40px] mobile:mt-[50px]">
            <h2 data-reveal="mask" style={fit(faqTitle, '.')} className="fit [--fit-size:clamp(48px,8vw,130px)] [--fit-avail:calc((100vw_-_2*var(--gutter)_-_60px)/2.2)] font-black tracking-[-.07em] leading-[.88] tablet:[--fit-avail:calc(100vw_-_2*var(--gutter))]">
              {faqTitle[0]}
              <br />
              {faqTitle[1]}
              <span className="text-[#6e6e6e]">.</span>
            </h2>
            <div>
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-t border-line last:border-b py-[22px]">
                  <summary className="flex items-center justify-between gap-[20px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-[18px] font-bold tracking-[-.03em] leading-[1.35]">{faq.q}</span>
                    <span className="font-mono text-dim text-[18px] shrink-0 group-open:hidden" aria-hidden="true">+</span>
                    <span className="font-mono text-dim text-[18px] shrink-0 hidden group-open:inline" aria-hidden="true">−</span>
                  </summary>
                  <p className="text-[15px] leading-[1.7] text-mute mt-[14px] max-w-[620px]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full relative bg-[#090909] overflow-hidden">
          <BackgroundVideo src="/videos/about-end-section.mp4" className="absolute inset-0 w-full h-full object-cover opacity-[.5] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#090909_0%,rgba(9,9,9,.4)_45%,rgba(9,9,9,.55)_100%)] pointer-events-none" aria-hidden="true" />
          <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[150px] pb-[160px] relative z-[1] flex items-end justify-between gap-[40px] mobile:pt-[95px] mobile:pb-[100px] mobile:items-start mobile:flex-col">
            <p className="font-display text-[length:clamp(30px,4.5vw,72px)] font-black tracking-[-.06em] leading-[1.05]">
              {tAbout('endTextTop')}
              <br />
              <span className="text-[#777]">{tAbout('endTextBottom')}</span>
            </p>
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-[22px] bg-white text-[#050505] px-[23px] py-[18px] text-[12px] font-extrabold tracking-[.04em] min-h-[58px] [transition:background_.2s_ease,transform_.2s_ease] hover:bg-[#d5d5d5] hover:[transform:translateY(-2px)] active:[transform:scale(.98)] xs:gap-[12px]"
            >
              {tAbout('startCta')} <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
