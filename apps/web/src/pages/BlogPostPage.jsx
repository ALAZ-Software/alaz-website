import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Seo from '@/components/Seo';
import Markdown from '@/components/Markdown';
import { getPostBySlug, blogPosts, getReadingTime } from '@/data/blogPosts';

const ORG_URL = 'https://alaz.pro';

export default function BlogPostPage() {
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
        <h1>POST NOT FOUND.</h1>
        <Link to="/blog" className="text-action">
          BACK TO BLOG <ArrowLeft size={16} />
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
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${ORG_URL}/blog/${post.slug}` },
    inLanguage: 'en',
  };

  return (
    <>
      <div className="read-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <Helmet>
        <title>{post.title} — ALAZ Blog</title>
        <meta name="description" content={post.excerpt} />
        <script type="application/ld+json">{JSON.stringify(blogPosting)}</script>
      </Helmet>
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.cover}
        url={`${ORG_URL}/blog/${post.slug}`}
        siteName="ALAZ"
        type="article"
      />
      <main className="case-page">
        <div className="frame case-intro">
          <div className="section-top mono">
            <Link to="/blog">← ALL FIELD NOTES</Link>
            <span>BLOG / {post.tag}</span>
          </div>
          <p className="eyebrow">{post.dateLabel} — {readingTime} MIN READ</p>
          <h1>{post.title.replace(/\s+/g, ' ')}</h1>
          <p className="case-summary">{post.excerpt}</p>
        </div>

        <div className="blog-cover">
          <img src={post.cover} alt={`${post.title} — cover visual`} />
        </div>

        <div className="frame case-detail">
          <div className="case-meta mono">
            <span>ALAZ / FIELD NOTES</span>
            <span>{post.dateLabel}</span>
          </div>
          <Markdown content={post.content} />

          <div className="author-block">
            <span className="avatar mono">A.</span>
            <div>
              <strong>{post.author.name}</strong>
              <span className="mono">// {post.author.role}</span>
              <p>
                ALAZ is an independent software architecture and web engineering studio. Reach us at{' '}
                <a href="mailto:hello@alaz.pro">hello@alaz.pro</a>.
              </p>
            </div>
          </div>

          <Link to={`/blog/${next.slug}`} className="next-project">
            <span className="mono">NEXT FIELD NOTE</span>
            <span>{next.title.replace(/\s+/g, ' ').slice(0, 48)}… <ArrowUpRight size={34} strokeWidth={1.2} /></span>
          </Link>
        </div>

        <div className="case-contact frame">
          <span className="mono">WANT TO BUILD SOMETHING THAT HOLDS UP?</span>
          <Link to="/start-project" className="outline-action">
            START A PROJECT <ArrowUpRight size={17} />
          </Link>
        </div>
      </main>
    </>
  );
}
