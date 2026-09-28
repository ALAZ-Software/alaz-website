import React from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const readingTime = (text) => Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));

export async function generateMetadata() {
  const t = await getTranslations('blogIndex.meta');
  return { title: t('title'), description: t('description') };
}

export default async function BlogIndexPage() {
  const t = await getTranslations('blogIndex');
  const tRoot = await getTranslations();
  const posts = [...tRoot.raw('blogPosts')].sort((a, b) => new Date(b.date) - new Date(a.date));
  const heading = t.raw('heading');

  return (
    <>
      <main className="subpage">
        <div className="frame page-intro">
          <div className="section-top mono">
            <span>{t('eyebrowLeft')}</span>
            <span>{t('eyebrowRight')}</span>
          </div>
          <p className="eyebrow">{t('kicker')}</p>
          <h1>
            {heading.map((line, i) => <React.Fragment key={line}>{line}{i < heading.length - 1 && <br />}</React.Fragment>)}<span>.</span>
          </h1>
          <div className="intro-bottom">
            <p>{t('introText')}</p>
            <span className="mono">{t('introNote')}</span>
          </div>
        </div>

        <section className="frame" aria-label={t('articlesAriaLabel')}>
          <div className="blog-list">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
                <div className="blog-card-top mono">
                  <span className="blog-tag">{post.tag}</span>
                  <span>{post.dateLabel}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta mono">
                  <span className="blog-read">
                    <Clock size={13} strokeWidth={1.6} /> {readingTime(post.content)} {t('readMinutesSuffix')}
                  </span>
                  <span className="blog-read-link">
                    {t('readCta')} <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="archive-note mono">
            <span>{t('noteLeft')}</span>
            <span>{t('noteRight')}</span>
          </div>
        </section>
      </main>
    </>
  );
}
