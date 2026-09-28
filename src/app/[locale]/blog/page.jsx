import React from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo';

const readingTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogIndex.meta' });
  return buildMetadata({ locale, path: '/blog', title: t('title'), description: t('description') });
}

export default async function BlogIndexPage() {
  const t = await getTranslations('blogIndex');
  const tRoot = await getTranslations();
  const posts = [...tRoot.raw('blogPosts')].sort((a, b) => new Date(b.date) - new Date(a.date));
  const heading = t.raw('heading');

  return (
    <>
      <main className="pt-[76px] min-h-[70vh] mobile:pt-[66px]">
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[52px] mobile:pt-[32px]">
          <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right">
            <span>{t('eyebrowLeft')}</span>
            <span>{t('eyebrowRight')}</span>
          </div>
          <p className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute mt-[clamp(80px,10vw,155px)] mobile:mt-[85px]">{t('kicker')}</p>
          <h1 className="text-[length:clamp(84px,16vw,270px)] leading-[.86] tracking-[-.075em] font-black mt-[25px] mb-[60px] mobile:text-[length:clamp(75px,17vw,135px)] mobile:mb-[40px]">
            {heading.map((line, i) => <React.Fragment key={line}>{line}{i < heading.length - 1 && <br />}</React.Fragment>)}<span className="text-[#6e6e6e]">.</span>
          </h1>
          <div className="flex justify-between items-end gap-[30px] pb-[75px] mobile:pb-[60px] mobile:items-start mobile:flex-col mobile:gap-[20px]">
            <p className="text-[length:clamp(18px,2vw,27px)] max-w-[550px] tracking-[-.04em] leading-[1.4]">{t('introText')}</p>
            <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('introNote')}</span>
          </div>
        </div>

        <section className="w-full px-[clamp(24px,4.2vw,72px)]" aria-label={t('articlesAriaLabel')}>
          <div className="grid grid-cols-2 border-t border-line mobile:grid-cols-1">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} className="group flex flex-col border-r border-line border-b border-line p-[32px_32px_30px] min-h-[320px] transition-colors duration-200 ease-in-out even:border-r-0 hover:bg-[#141414] mobile:border-r-0 mobile:min-h-[260px] mobile:py-[26px] mobile:px-0 mobile:first:border-t-0" key={post.slug}>
                <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex justify-between items-center text-dim">
                  <span className="font-mono border border-[#333] px-[9px] py-[4px] text-[#cfcfcf] tracking-[.06em]">{post.tag}</span>
                  <span>{post.dateLabel}</span>
                </div>
                <h3 className="text-[length:clamp(22px,2.5vw,36px)] tracking-[-.055em] leading-[1.08] font-extrabold my-[20px] mb-[14px] text-white">{post.title}</h3>
                <p className="text-mute text-[14px] leading-[1.6] flex-1">{post.excerpt}</p>
                <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex justify-between items-center mt-[24px] border-t border-line pt-[16px] text-dim">
                  <span className="inline-flex items-center gap-[8px]">
                    <Clock size={13} strokeWidth={1.6} /> {readingTime(post.content)} {t('readMinutesSuffix')}
                  </span>
                  <span className="inline-flex items-center gap-[7px] text-[#cfcfcf] transition-[gap,color] duration-200 ease-in-out group-hover:gap-[12px] group-hover:text-white">
                    {t('readCta')} <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex justify-between py-[23px] pb-[155px] text-dim mobile:pb-[100px]">
            <span>{t('noteLeft')}</span>
            <span>{t('noteRight')}</span>
          </div>
        </section>
      </main>
    </>
  );
}


