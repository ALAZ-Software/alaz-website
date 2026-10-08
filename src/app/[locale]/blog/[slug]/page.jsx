import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import Markdown from '@/components/Markdown';
import ReadProgress from '@/components/ReadProgress';
import enMessages from '@messages/en.json';
import JsonLd, { BreadcrumbJsonLd } from '@/components/JsonLd';
import { LOGO_URL, ORG_ID, SITE_NAME, SITE_URL, buildMetadata, urlFor } from '@/lib/seo';
import { fit } from '@/lib/fit';

const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const readingTime = (text) => Math.max(1, Math.round(wordCount(text) / 200));
const headings = (content) => content.split('\n').filter((l) => /^##\s/.test(l)).map((l) => l.replace(/^##\s/, '')).map((text) => ({ text, id: text.toLowerCase().replace(/[*`[\]()]/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') }));

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
  const toc = headings(post.content).filter((h) => !/^(sources|kaynaklar)$/i.test(h.text));

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
      <main id="main">
        <article>
          <header className="shell pt-[calc(var(--header-h)+40px)] pb-[var(--s-5)]">
            <div className="eyebrow t-meta uppercase [&_a:hover]:text-fg" data-reveal="line">
              <Link href="/blog">{t('allFieldNotes')}</Link>
              <span>{t('blogLabelPrefix')} / {post.tag}</span>
            </div>
            <p className="t-meta uppercase text-fg-3 mt-[var(--s-5)] mb-[22px] flex flex-wrap gap-x-[10px]" data-reveal="fade"><time dateTime={post.date}>{post.dateLabel}</time><span aria-hidden="true">—</span><span>{time} {t('readingSuffix')}</span>{post.updated && post.updated !== post.date && <><span aria-hidden="true">—</span><span className="whitespace-nowrap">{t('updatedPrefix')} <time dateTime={post.updated}>{post.updatedLabel}</time></span></>}</p>
            <h1 style={fit(post.title)} className="fit t-display-1 uppercase [--fit-size:clamp(40px,6vw,108px)] mb-[28px] max-w-[22ch]" data-reveal="lines">{post.title.replace(/\s+/g, ' ')}</h1>
            <p className="t-lead text-fg-3 max-w-[52ch]" data-reveal="fade">{post.excerpt}</p>
          </header>

          {post.cover && <div className="w-full h-[clamp(230px,38vw,520px)] bg-surface-2 overflow-hidden relative">
            <Image src={post.cover} alt={post.coverAlt} fill sizes="100vw" className="object-cover [filter:grayscale(1)_brightness(.82)]" priority data-parallax="8" />
          </div>}

          <div className="shell pt-[var(--s-5)] grid grid-cols-12 gap-[var(--col-gap)] tablet:flex tablet:flex-col">
            <aside className="col-span-3 tablet:hidden" aria-label="Contents">
              {toc.length > 1 && <ol className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-[8px] border-t border-line pt-[16px]">
                {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="t-meta text-fg-4 hover:text-fg block py-[2px]">{h.text}</a></li>)}
              </ol>}
            </aside>
            <div className="col-span-8 col-start-4">
              <Markdown content={post.content} />
              <footer className="flex gap-[18px] items-start border-y border-line py-[30px] mt-[var(--s-5)] max-w-[720px]">
                <span className="w-[54px] h-[54px] bg-surface-2 border border-line grid place-items-center flex-none text-[18px] font-black text-fg font-display" aria-hidden="true">A<span className="dot">.</span></span>
                <div>
                  <strong className="t-small block font-medium">{post.author.name}</strong>
                  <span className="t-meta text-fg-4 block mt-[3px]">{post.author.role}</span>
                  <p className="t-small text-fg-3 mt-[12px] max-w-[60ch]">
                    {t('authorIntroBefore')}
                    <a href="mailto:hello@alaz.pro" className="text-fg underline underline-offset-4 decoration-fg-4 hover:decoration-ember">hello@alaz.pro</a>
                    {t('authorIntroAfter')} <Link href="/about" className="text-fg underline underline-offset-4 decoration-fg-4 hover:decoration-ember">{t('aboutLinkLabel')}</Link>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </article>

        <div className="shell">
          <Link href={`/blog/${next.slug}`} className="group flex justify-between items-end gap-[20px] py-[var(--s-5)] border-b border-line mobile:flex-col mobile:items-start" data-cursor="NEXT">
            <span className="t-meta uppercase text-fg-4 shrink-0">{t('nextNoteLabel')}</span>
            <span className="t-title flex gap-[18px] items-end text-right max-w-[26ch] mobile:text-left"><span className="min-w-0">{next.title.replace(/\s+/g, ' ')}</span> <Icon name="arrow" size={28} className="transition-transform duration-fast group-hover:translate-x-[10px]" /></span>
          </Link>
          <div className="flex justify-between items-center gap-[24px] pt-[var(--s-4)] pb-[var(--s-6)] mobile:flex-col mobile:items-start">
            <span className="t-meta uppercase text-fg-4">{t('contactPrompt')}</span>
            <Link href="/start-project" className="btn-ghost" data-magnetic>{t('contactCta')} <Icon name="arrow" size={15} /></Link>
          </div>
        </div>
      </main>
    </>
  );
}
