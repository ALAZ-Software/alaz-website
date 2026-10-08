import { getTranslations, setRequestLocale } from 'next-intl/server';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';

const readingTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogIndex.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '/blog', title: t('title'), description: t('description'), eyebrow: tSeo('blog') });
}

export default async function BlogIndexPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blogIndex');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const posts = [...tRoot.raw('blogPosts')].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [latest, ...rest] = posts;
  const heading = t.raw('heading');

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: tSeo('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('blog'), url: urlFor(locale, '/blog') }]} />
      <main id="main" className="min-h-[70vh]">
        <div className="shell pt-[calc(var(--header-h)+40px)]">
          <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight', { count: String(posts.length).padStart(2, '0') })}</span></div>
          <p className="t-meta uppercase text-fg-3 mt-[var(--s-5)]" data-reveal="fade">{t('kicker')}</p>
          <h1 style={fit(heading, '.')} className="fit t-display-1 uppercase mt-[20px] mb-[var(--s-4)]" data-reveal="lines">{heading.join(' ')}<span className="dot">.</span></h1>
          <div className="grid grid-cols-12 gap-[var(--col-gap)] items-end pb-[var(--s-4)] mobile:flex mobile:flex-col mobile:items-start"><p className="t-lead col-span-7 max-w-[48ch]" data-reveal="fade">{t('introText')}</p><span className="t-meta uppercase text-fg-4 col-span-4 col-start-9 text-right mobile:text-left" data-reveal="fade">{t('introNote')}</span></div>
        </div>

        <section className="shell" aria-label={t('articlesAriaLabel')}>
          {/* Latest post, full width */}
          <Link href={`/blog/${latest.slug}`} className="group grid grid-cols-12 gap-[var(--col-gap)] border-t border-line py-[var(--s-5)] transition-colors duration-fast hover:bg-surface -mx-[var(--shell-pad)] px-[var(--shell-pad)] mobile:flex mobile:flex-col" data-reveal="fade" data-cursor="READ">
            <div className="t-meta uppercase col-span-3 flex flex-col gap-[8px] text-fg-4"><span className="text-fg-2">{latest.tag}</span><time dateTime={latest.date}>{latest.dateLabel}</time><span>{readingTime(latest.content)} {t('readMinutesSuffix')}</span></div>
            <div className="col-span-8 col-start-4">
              <h2 className="t-display-2 uppercase [--fit-size:clamp(32px,4.6vw,80px)] max-w-[18ch]">{latest.title}</h2>
              <p className="t-lead text-fg-3 mt-[22px] max-w-[52ch]">{latest.excerpt}</p>
              <span className="link-draw t-meta uppercase mt-[28px]">{t('readCta')} <Icon name="arrow" size={14} /></span>
            </div>
          </Link>
          <div className="grid grid-cols-2 border-t border-line mobile:grid-cols-1">
            {rest.map((post, i) => (
              <Link href={`/blog/${post.slug}`} className="group flex flex-col border-r border-line border-b border-line p-[32px_32px_30px] min-h-[300px] transition-colors duration-fast even:border-r-0 hover:bg-surface mobile:border-r-0 mobile:py-[26px] mobile:px-0" key={post.slug} data-reveal="fade" data-delay={(i % 2) * 0.08} data-cursor="READ">
                <div className="t-meta uppercase flex justify-between items-center text-fg-4"><span className="text-fg-2">{post.tag}</span><time dateTime={post.date}>{post.dateLabel}</time></div>
                <h2 className="t-title mt-[20px] mb-[14px] max-w-[22ch]">{post.title}</h2>
                <p className="t-small text-fg-3 flex-1 max-w-[60ch]">{post.excerpt}</p>
                <div className="t-meta uppercase flex justify-between items-center mt-[24px] border-t border-line pt-[16px] text-fg-4">
                  <span>{readingTime(post.content)} {t('readMinutesSuffix')}</span>
                  <span className="inline-flex items-center gap-[7px] text-fg-2 transition-[gap,color] duration-fast group-hover:gap-[12px] group-hover:text-fg">{t('readCta')} <Icon name="arrow" size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="t-meta uppercase flex justify-between py-[23px] pb-[var(--s-7)] text-fg-4 mobile:flex-col mobile:gap-[8px]">
            <span>{t('noteLeft')}</span>
            <a href="mailto:hello@alaz.pro" className="hover:text-fg">{t('noteRight')}</a>
          </div>
        </section>
      </main>
    </>
  );
}
