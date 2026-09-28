import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Markdown from '@/components/Markdown';
import ReadProgress from '@/components/ReadProgress';
import enMessages from '@messages/en.json';

const ORG_URL = 'https://alaz.pro';
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

  return {
    title,
    description: post.excerpt,
    alternates: { canonical: locale === 'en' ? `${ORG_URL}/blog/${post.slug}` : `${ORG_URL}/${locale}/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      url: locale === 'en' ? `${ORG_URL}/blog/${post.slug}` : `${ORG_URL}/${locale}/blog/${post.slug}`,
      siteName: 'ALAZ',
      type: 'article',
      locale: locale === 'en' ? 'en_US' : 'tr_TR',
      images: [{ url: post.cover, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@alaz_pro',
      title,
      description: post.excerpt,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations('blogPost');
  const tRoot = await getTranslations();
  const posts = tRoot.raw('blogPosts');
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="pt-[76px] min-h-[70vh] mobile:pt-[66px] px-[clamp(24px,4.2vw,72px)]">
        <h1 className="text-[length:clamp(64px,12vw,200px)] font-black my-[25px]">{t('notFoundHeading')}</h1>
        <Link href="/blog" className="inline-flex items-center gap-[18px] border-b border-white pb-[12px] font-mono text-[11px] tracking-[.03em] whitespace-nowrap [transition:gap_.2s_ease] hover:gap-[26px]">
          {t('backToBlogCta')} <ArrowLeft size={16} />
        </Link>
      </main>
    );
  }

  const time = readingTime(post.content);
  const next = posts.find((item) => item.slug !== post.slug) || posts[0];

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author.name },
    publisher: { '@id': `${ORG_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': locale === 'en' ? `${ORG_URL}/blog/${post.slug}` : `${ORG_URL}/${locale}/blog/${post.slug}` },
    inLanguage: locale,
  };

  return (
    <>
      <ReadProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
      <main>
        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[128px] pb-[80px] mobile:pt-[100px]">
          <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right">
            <Link href="/blog">{t('allFieldNotes')}</Link>
            <span>{t('blogLabelPrefix')} / {post.tag}</span>
          </div>
          <p className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-mute mt-[110px] mobile:mt-[80px] mb-[22px]">{post.dateLabel} — {time} {t('readingSuffix')}</p>
          <h1 className="text-[length:clamp(64px,12vw,200px)] leading-[.86] tracking-[-.075em] font-black mb-[22px] mobile:text-[length:clamp(75px,17vw,135px)] mobile:mb-[40px]">{post.title.replace(/\s+/g, ' ')}</h1>
          <p className="text-[length:clamp(19px,2.4vw,32px)] tracking-[-.04em] max-w-[740px] leading-[1.4] text-[#b4b4b4]">{post.excerpt}</p>
        </div>

        <div className="w-full h-[clamp(230px,38vw,520px)] bg-[#171717] overflow-hidden relative">
          <Image src={post.cover} alt={t('coverAlt', { title: post.title })} fill sizes="100vw" className="object-cover [filter:grayscale(1)_brightness(.82)]" priority />
        </div>

        <div className="w-full px-[clamp(24px,4.2vw,72px)] pt-[35px]">
          <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex justify-between text-dim pb-[125px] mobile:pb-[70px]">
            <span>{t('fieldNotesLabel')}</span>
            <span>{post.dateLabel}</span>
          </div>
          <Markdown content={post.content} />

          <div className="flex gap-[18px] items-start border-y border-line py-[30px] mt-[70px] max-w-[720px] mobile:py-[24px] mobile:mt-[50px]">
            <span className="w-[54px] h-[54px] bg-[#1a1a1a] border border-[#333] grid place-items-center flex-none text-[18px] font-extrabold text-white font-mono">A.</span>
            <div>
              <strong className="text-[14px] block">{post.author.name}</strong>
              <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim block mt-[3px]">// {post.author.role}</span>
              <p className="text-mute text-[14px] leading-[1.6] mt-[12px]">
                {t('authorIntroBefore')}{' '}
                <a href="mailto:hello@alaz.pro" className="text-white underline underline-offset-4">hello@alaz.pro</a>{' '}
                {t('authorIntroAfter')}
              </p>
            </div>
          </div>

          <Link href={`/blog/${next.slug}`} className="group flex justify-between items-end py-[70px] border-b border-line mobile:py-[55px]">
            <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('nextNoteLabel')}</span>
            <span className="text-[length:clamp(26px,3.4vw,46px)] font-extrabold tracking-[-.05em] leading-[1.05] flex gap-[18px] items-center max-w-[78%] mobile:text-[length:clamp(22px,6vw,30px)] mobile:leading-[1.1] mobile:gap-[12px] mobile:max-w-[80%] xs:text-[length:clamp(20px,7vw,26px)] xs:gap-[10px] xs:max-w-[82%]">{next.title.replace(/\s+/g, ' ').slice(0, 48)}… <ArrowUpRight size={34} strokeWidth={1.2} className="transition-transform duration-200 group-hover:translate-x-[10px]" /></span>
          </Link>
        </div>

        <div className="w-full px-[clamp(24px,4.2vw,72px)] flex justify-between items-center pt-[50px] pb-[135px] text-mute">
          <span className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] text-dim">{t('contactPrompt')}</span>
          <Link href="/start-project" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[10px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">
            {t('contactCta')} <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
    </>
  );
}


