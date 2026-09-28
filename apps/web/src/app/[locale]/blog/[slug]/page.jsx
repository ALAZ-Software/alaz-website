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
      <main className="subpage frame">
        <h1>{t('notFoundHeading')}</h1>
        <Link href="/blog" className="text-action">
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
      <main className="case-page">
        <div className="frame case-intro">
          <div className="section-top mono">
            <Link href="/blog">{t('allFieldNotes')}</Link>
            <span>{t('blogLabelPrefix')} / {post.tag}</span>
          </div>
          <p className="eyebrow">{post.dateLabel} — {time} {t('readingSuffix')}</p>
          <h1>{post.title.replace(/\s+/g, ' ')}</h1>
          <p className="case-summary">{post.excerpt}</p>
        </div>

        <div className="blog-cover">
          <Image src={post.cover} alt={t('coverAlt', { title: post.title })} fill sizes="100vw" priority />
        </div>

        <div className="frame case-detail">
          <div className="case-meta mono">
            <span>{t('fieldNotesLabel')}</span>
            <span>{post.dateLabel}</span>
          </div>
          <Markdown content={post.content} />

          <div className="author-block">
            <span className="avatar mono">A.</span>
            <div>
              <strong>{post.author.name}</strong>
              <span className="mono">// {post.author.role}</span>
              <p>
                {t('authorIntroBefore')}
                <a href="mailto:hello@alaz.pro">hello@alaz.pro</a>
                {t('authorIntroAfter')}
              </p>
            </div>
          </div>

          <Link href={`/blog/${next.slug}`} className="next-project">
            <span className="mono">{t('nextNoteLabel')}</span>
            <span>{next.title.replace(/\s+/g, ' ').slice(0, 48)}… <ArrowUpRight size={34} strokeWidth={1.2} /></span>
          </Link>
        </div>

        <div className="case-contact frame">
          <span className="mono">{t('contactPrompt')}</span>
          <Link href="/start-project" className="outline-action">
            {t('contactCta')} <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
    </>
  );
}
