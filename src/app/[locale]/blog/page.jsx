import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';

const MONO = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6]';
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
  const heading = t.raw('heading');

  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: tSeo('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('blog'), url: urlFor(locale, '/blog') }]} />
      <main className="pt-[76px] min-h-[70vh] mobile:pt-[66px]">
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[52px] mobile:pt-[32px]">
          <div data-reveal="line" className={`${MONO} flex items-center justify-between text-dim border-t border-line pt-[19px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right`}>
            <span>{t('eyebrowLeft')}</span>
            <span>{t('eyebrowRight', { count: String(posts.length).padStart(2, '0') })}</span>
          </div>
          <p className={`${MONO} text-mute mt-[clamp(60px,8vw,120px)] mobile:mt-[70px]`}>{t('kicker')}</p>
          <h1 data-reveal="mask" style={fit(heading, '.')} className="fit [--fit-size:clamp(84px,14vw,220px)] leading-[.86] tracking-[-.075em] font-black mt-[25px] mb-[50px] mobile:[--fit-size:clamp(75px,17vw,135px)] mobile:mb-[40px]">
            {heading.join(' ')}<span className="text-[#6e6e6e]">.</span>
          </h1>
          <div className="flex justify-between items-end gap-[30px] pb-[60px] mobile:pb-[48px] mobile:items-start mobile:flex-col mobile:gap-[20px]">
            <p data-reveal="fade" className="text-[length:clamp(18px,2vw,27px)] max-w-[640px] tracking-[-.03em] leading-[1.4]">{t('introText')}</p>
            <span className={`${MONO} text-dim whitespace-nowrap`}>{t('introNote')}</span>
          </div>
        </div>

        <section className="w-full px-[clamp(24px,4.2vw,72px)]" aria-label={t('articlesAriaLabel')}>
          <div className="grid grid-cols-2 border-t border-line mobile:grid-cols-1">
            {posts.map((post, i) => (
              <Link data-reveal="fade" style={{ '--reveal-delay': `${(i % 2) * 80}ms` }} href={`/blog/${post.slug}`} className="group flex flex-col border-r border-line border-b border-line p-[32px_32px_30px] min-h-[320px] transition-colors duration-200 ease-in-out even:border-r-0 hover:bg-[#141414] mobile:border-r-0 mobile:min-h-[260px] mobile:py-[26px] mobile:px-0 mobile:first:border-t-0" key={post.slug}>
                <div className={`${MONO} flex justify-between items-center text-dim`}>
                  <span className="text-[#cfcfcf]">{post.tag}</span>
                  <time dateTime={post.date}>{post.dateLabel}</time>
                </div>
                <h2 className="text-[length:clamp(22px,2.5vw,36px)] tracking-[-.05em] leading-[1.08] font-extrabold my-[20px] mb-[14px] text-white">{post.title}</h2>
                <p className="text-mute text-[14px] leading-[1.6] flex-1">{post.excerpt}</p>
                <div className={`${MONO} flex justify-between items-center mt-[24px] border-t border-line pt-[16px] text-dim`}>
                  <span>{readingTime(post.content)} {t('readMinutesSuffix')}</span>
                  <span className="inline-flex items-center gap-[7px] text-[#cfcfcf] transition-[gap,color] duration-200 ease-in-out group-hover:gap-[12px] group-hover:text-white">
                    {t('readCta')} <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className={`${MONO} flex justify-between py-[23px] pb-[155px] text-dim mobile:pb-[100px] mobile:flex-col mobile:gap-[8px]`}>
            <span>{t('noteLeft')}</span>
            <a href="mailto:hello@alaz.pro" className="hover:text-white">{t('noteRight')}</a>
          </div>
        </section>
      </main>
    </>
  );
}
