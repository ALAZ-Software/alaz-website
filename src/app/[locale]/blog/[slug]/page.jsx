import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Markdown from '@/components/Markdown';
import ReadProgress from '@/components/ReadProgress';
import enMessages from '@messages/en.json';
import JsonLd, { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LOGO_URL, ORG_ID, SITE_NAME, SITE_URL, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';

const readingTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));

export function generateStaticParams() {
  return enMessages.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPost' });
  const tRoot = await getTranslations({ locale });
  const post = tRoot.raw('blogPosts').find((item) => item.slug === slug);
  if (!post) return {};

  const title = t('metaTitleTemplate', { title: post.title });

  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title,
    description: post.excerpt,
    type: 'article',
    image: { url: post.cover, width: 1200, height: 630, alt: post.title },
    extraOpenGraph: { publishedTime: post.date, authors: ['ALAZ'] },
  });
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations('blogPost');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const posts = tRoot.raw('blogPosts');
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="pt-[76px] min-h-[70vh] mobile:pt-[66px] px-[clamp(24px,4.2vw,72px)]">
        <h1 data-reveal="mask" style={fit(t('notFoundHeading'))} className="fit [--fit-size:clamp(64px,12vw,200px)] font-black my-[25px]">{t('notFoundHeading')}</h1>
        <Link href="/blog" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">
          {t('backToBlogCta')} <ArrowLeft size={16} />
        </Link>
      </main>
    );
  }

  const time = readingTime(post.content);
  const next = posts.find((item) => item.slug !== post.slug) || posts[0];

  const postUrl = urlFor(locale, `/blog/${post.slug}`);

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, logo: { '@type': 'ImageObject', url: LOGO_URL } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
    inLanguage: locale,
  };

  return (
    <>
      <ReadProgress />
      <BreadcrumbJsonLd crumbs={[
        { name: tSeo('breadcrumbHome'), url: urlFor(locale) },
        { name: tSeo('blog'), url: urlFor(locale, '/blog') },
        { name: post.title, url: postUrl },
      ]} />
      <JsonLd data={blogPosting} />
      <main>
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] pb-[80px] mobile:pt-[100px]">
          <div data-reveal="line" className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right">
            <Link href="/blog">{t('allFieldNotes')}</Link>
            <span>{t('blogLabelPrefix')} / {post.tag}</span>
          </div>
          <p className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-mute mt-[110px] mobile:mt-[80px] mb-[22px]"><time dateTime={post.date}>{post.dateLabel}</time> — {time} {t('readingSuffix')}{post.updated && <> — {t('updatedPrefix')} <time dateTime={post.updated}>{post.updatedLabel}</time></>}</p>
          <h1 data-reveal="mask" style={fit(post.title)} className="fit [--fit-size:clamp(44px,6.4vw,112px)] leading-[.95] tracking-[-.06em] font-black mb-[28px] max-w-[1300px] mobile:[--fit-size:clamp(34px,9.6vw,56px)] mobile:leading-[1] mobile:mb-[30px]">{post.title.replace(/\s+/g, ' ')}</h1>
          <p data-reveal="fade" className="text-[length:clamp(19px,2.4vw,32px)] tracking-[-.04em] max-w-[740px] leading-[1.4] text-[#b4b4b4]">{post.excerpt}</p>
        </div>

        <div className="w-full h-[clamp(230px,38vw,520px)] bg-[#171717] overflow-hidden relative">
          <Image src={post.cover} alt={t('coverAlt', { title: post.title })} fill sizes="100vw" className="object-cover [filter:grayscale(1)_brightness(.82)]" priority />
        </div>

        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[35px]">
          <div className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] flex justify-between text-dim pb-[125px] mobile:pb-[70px]">
            <span>{t('fieldNotesLabel')}</span>
            <time dateTime={post.date}>{post.dateLabel}</time>
          </div>
          <Markdown content={post.content} />

          <div className="flex gap-[18px] items-start border-y border-line py-[30px] mt-[70px] max-w-[720px] mobile:py-[24px] mobile:mt-[50px]">
            <span className="w-[54px] h-[54px] bg-[#1a1a1a] border border-[#333] grid place-items-center flex-none text-[18px] font-extrabold text-white font-mono">A.</span>
            <div>
              <strong className="text-[14px] block">{post.author.name}</strong>
              <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim block mt-[3px]">// {post.author.role}</span>
              <p className="text-mute text-[14px] leading-[1.6] mt-[12px]">
                {t('authorIntroBefore')}{' '}
                <a href="mailto:hello@alaz.pro" className="text-white underline underline-offset-4">hello@alaz.pro</a>{' '}
                {t('authorIntroAfter')}
              </p>
            </div>
          </div>

          <Link href={`/blog/${next.slug}`} className="group flex justify-between items-end py-[70px] border-b border-line mobile:py-[55px]">
            <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('nextNoteLabel')}</span>
            <span className="text-[length:clamp(26px,3.4vw,46px)] font-extrabold tracking-[-.05em] leading-[1.05] flex gap-[18px] items-center max-w-[78%] mobile:text-[length:clamp(22px,6vw,30px)] mobile:leading-[1.1] mobile:gap-[12px] mobile:max-w-[80%] xs:text-[length:clamp(20px,7vw,26px)] xs:gap-[10px] xs:max-w-[82%]"><span className="min-w-0 line-clamp-2 [overflow-wrap:anywhere]">{next.title.replace(/\s+/g, ' ')}</span> <ArrowUpRight size={34} strokeWidth={1.2} className="flex-none transition-transform duration-200 group-hover:translate-x-[10px]" /></span>
          </Link>
        </div>

        <div className="w-full px-[clamp(24px,4.2vw,72px)] flex justify-between items-center gap-[24px] pt-[50px] pb-[135px] text-mute mobile:flex-col mobile:items-start">
          <span className="font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('contactPrompt')}</span>
          <Link href="/start-project" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">
            {t('contactCta')} <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
    </>
  );
}


