import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Markdown from '@/components/Markdown';
import ReadProgress from '@/components/ReadProgress';
import enMessages from '@messages/en.json';
import JsonLd, { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LOGO_URL, ORG_ID, SITE_NAME, SITE_URL, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';

const MONO = 'font-mono text-[12px] font-normal tracking-[.085em] leading-[1.6]';
const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const readingTime = (text) => Math.max(1, Math.round(wordCount(text) / 200));

// Slugs come from messages/en.json; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return enMessages.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const tRoot = await getTranslations({ locale });
  const post = tRoot.raw('blogPosts').find((item) => item.slug === slug);
  if (!post) notFound();

  return buildMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    type: 'article',
    image: { url: post.cover, width: 1200, height: 630, alt: post.coverAlt },
    extraOpenGraph: { publishedTime: post.date, modifiedTime: post.updated || post.date, authors: [`${SITE_URL}/about`], section: post.tag, tags: [post.tag] },
  });
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blogPost');
  const tSeo = await getTranslations('seo');
  const tRoot = await getTranslations();
  const posts = [...tRoot.raw('blogPosts')].sort((a, b) => new Date(b.date) - new Date(a.date));
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const time = readingTime(post.content);
  const index = posts.findIndex((item) => item.slug === slug);
  const next = posts[(index + 1) % posts.length];
  const postUrl = urlFor(locale, `/blog/${post.slug}`);

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    articleSection: post.tag,
    keywords: post.tag,
    wordCount: wordCount(post.content),
    timeRequired: `PT${time}M`,
    author: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 } },
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
        <article>
          <header className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] pb-[60px] mobile:pt-[100px]">
            <div data-reveal="line" className={`${MONO} flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white`}>
              <Link href="/blog">{t('allFieldNotes')}</Link>
              <span>{t('blogLabelPrefix')} / {post.tag}</span>
            </div>
            <p className={`${MONO} text-mute mt-[90px] mobile:mt-[70px] mb-[22px] flex flex-wrap gap-x-[10px]`}><time dateTime={post.date}>{post.dateLabel}</time><span aria-hidden="true">—</span><span>{time} {t('readingSuffix')}</span>{post.updated && post.updated !== post.date && <><span aria-hidden="true">—</span><span className="whitespace-nowrap">{t('updatedPrefix')} <time dateTime={post.updated}>{post.updatedLabel}</time></span></>}</p>
            <h1 data-reveal="mask" style={fit(post.title)} className="fit [--fit-size:clamp(44px,6.4vw,112px)] leading-[.95] tracking-[-.05em] font-black mb-[28px] max-w-[1300px] mobile:[--fit-size:clamp(34px,9.6vw,56px)] mobile:leading-[1] mobile:mb-[30px]">{post.title.replace(/\s+/g, ' ')}</h1>
            <p data-reveal="fade" className="text-[length:clamp(19px,2.4vw,32px)] tracking-[-.03em] max-w-[740px] leading-[1.4] text-[#b4b4b4]">{post.excerpt}</p>
          </header>

          {post.cover && <div className="w-full h-[clamp(230px,38vw,520px)] bg-[#171717] overflow-hidden relative">
            <Image src={post.cover} alt={post.coverAlt} fill sizes="100vw" className="object-cover [filter:grayscale(1)_brightness(.82)]" priority />
          </div>}

          <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[70px] mobile:pt-[50px]">
            <Markdown content={post.content} />

            <footer className="flex gap-[18px] items-start border-y border-line py-[30px] mt-[70px] max-w-[720px] mobile:py-[24px] mobile:mt-[50px]">
              <span className="w-[54px] h-[54px] bg-[#1a1a1a] border border-[#333] grid place-items-center flex-none text-[18px] font-extrabold text-white font-display" aria-hidden="true">A.</span>
              <div>
                <strong className="text-[14px] block">{post.author.name}</strong>
                <span className={`${MONO} text-dim block mt-[3px]`}>{post.author.role}</span>
                <p className="text-mute text-[14px] leading-[1.6] mt-[12px]">
                  {t('authorIntroBefore')}
                  <a href="mailto:hello@alaz.pro" className="text-white underline underline-offset-4">hello@alaz.pro</a>
                  {t('authorIntroAfter')} <Link href="/about" className="text-white underline underline-offset-4">{t('aboutLinkLabel')}</Link>
                </p>
              </div>
            </footer>
          </div>
        </article>

        <div className="w-full px-[clamp(24px,4.2vw,72px)]">
          <Link href={`/blog/${next.slug}`} className="group flex justify-between items-end gap-[20px] py-[70px] border-b border-line mobile:py-[55px]">
            <span className={`${MONO} text-dim shrink-0`}>{t('nextNoteLabel')}</span>
            <span className="text-[length:clamp(22px,3vw,40px)] font-extrabold tracking-[-.05em] leading-[1.1] flex gap-[18px] items-end text-right max-w-[78%] mobile:text-[length:clamp(18px,5vw,26px)] mobile:gap-[12px] mobile:max-w-[82%]"><span className="min-w-0">{next.title.replace(/\s+/g, ' ')}</span> <ArrowUpRight size={34} strokeWidth={1.2} className="flex-none transition-transform duration-200 group-hover:translate-x-[10px]" aria-hidden="true" /></span>
          </Link>
        </div>

        <div className="w-full px-[clamp(24px,4.2vw,72px)] flex justify-between items-center gap-[24px] pt-[50px] pb-[135px] text-mute mobile:flex-col mobile:items-start">
          <span className={`${MONO} text-dim`}>{t('contactPrompt')}</span>
          <Link href="/start-project" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[12px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">
            {t('contactCta')} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </main>
    </>
  );
}
