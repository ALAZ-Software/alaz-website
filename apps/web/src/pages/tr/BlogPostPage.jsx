import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Seo from '@/components/Seo';
import Markdown from '@/components/Markdown';
import { getPostBySlug, blogPosts, getReadingTime } from '@/data/blogPosts.tr';

const ORG_URL = 'https://alaz.pro';

export default function BlogPostPageTR() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight || 1;
      setProgress(Math.min(100, Math.max(0, (scrollTop / max) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  if (!post) {
    return (
      <main className="subpage frame">
        <h1>YAZI BULUNAMADI.</h1>
        <Link to="/tr/blog" className="text-action">
          BLOGA DÖN <ArrowLeft size={16} />
        </Link>
      </main>
    );
  }

  const readingTime = getReadingTime(post.content);
  const next = blogPosts.find((item) => item.slug !== post.slug) || blogPosts[0];

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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${ORG_URL}/tr/blog/${post.slug}` },
    inLanguage: 'tr',
  };

  return (
    <>
      <div className="read-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <Helmet>
        <html lang="tr" />
        <title>{post.title} — ALAZ Blog</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json">{JSON.stringify(blogPosting)}</script>
      </Helmet>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.cover}
        url={`${ORG_URL}/tr/blog/${post.slug}`}
        siteName="ALAZ"
        type="article"
      />
      <main className="case-page">
        <div className="frame case-intro">
          <div className="section-top mono">
            <Link to="/tr/blog">← TÜM NOTLAR</Link>
            <span>BLOG / {post.tag}</span>
          </div>
          <p className="eyebrow">{post.dateLabel} — {readingTime} DK OKUMA</p>
          <h1>{post.title.replace(/\s+/g, ' ')}</h1>
          <p className="case-summary">{post.excerpt}</p>
        </div>

        <div className="blog-cover">
          <img src={post.cover} alt={`${post.title} — kapak görseli`} />
        </div>

        <div className="frame case-detail">
          <div className="case-meta mono">
            <span>ALAZ / STÜDYO NOTLARI</span>
            <span>{post.dateLabel}</span>
          </div>
          <Markdown content={post.content} />

          <div className="author-block">
            <span className="avatar mono">A.</span>
            <div>
              <strong>{post.author.name}</strong>
              <span className="mono">// {post.author.role}</span>
              <p>
                ALAZ bağımsız bir yazılım mimarisi ve web mühendisliği stüdyosudur. Bize{' '}
                <a href="mailto:hello@alaz.pro">hello@alaz.pro</a> adresinden ulaşın.
              </p>
            </div>
          </div>

          <Link to={`/tr/blog/${next.slug}`} className="next-project">
            <span className="mono">SONRAKİ NOT</span>
            <span>{next.title.replace(/\s+/g, ' ').slice(0, 48)}… <ArrowUpRight size={34} strokeWidth={1.2} /></span>
          </Link>
        </div>

        <div className="case-contact frame">
          <span className="mono">DAYANACAK BİR ŞEY İNŞA ETMEK Mİ İSTİYORSUNUZ?</span>
          <Link to="/tr/start-project" className="outline-action">
            PROJE BAŞLAT <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
    </>
  );
}
