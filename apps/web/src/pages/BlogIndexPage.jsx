import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import { blogPosts, getReadingTime } from '@/data/blogPosts';

const OG_IMAGE = 'https://images.hostinger.com/2aa88bd7-319c-4104-9497-307e490b6d51.png';

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Helmet>
        <title>Blog — ALAZ Engineering Studio</title>
        <meta
          name="description"
          content="Field notes on software architecture, high-performance web engineering, and building systems that hold up. Written by the ALAZ engineering studio."
        />
      </Helmet>
      <Seo
        title="Blog — ALAZ Engineering Studio"
        description="Field notes on software architecture, high-performance web engineering, and building systems that hold up. Written by the ALAZ engineering studio."
        image={OG_IMAGE}
        url="https://alaz.pro/blog"
        siteName="ALAZ"
        type="website"
      />
      <main className="subpage">
        <div className="frame page-intro">
          <div className="section-top mono">
            <span>BLOG / 001</span>
            <span>FIELD NOTES FROM THE STUDIO</span>
          </div>
          <p className="eyebrow">ENGINEERING, IN PLAIN LANGUAGE.</p>
          <h1>
            THE<br />BLOG<span>.</span>
          </h1>
          <div className="intro-bottom">
            <p>
              Notes on architecture, performance, and the craft of shipping software that holds up past the launch demo.
            </p>
            <span className="mono">ALAZ / WRITING 2025</span>
          </div>
        </div>

        <section className="frame" aria-label="Blog articles">
          <div className="blog-list">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} className="blog-card" key={post.slug}>
                <div className="blog-card-top mono">
                  <span className="blog-tag">{post.tag}</span>
                  <span>{post.dateLabel}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta mono">
                  <span className="blog-read">
                    <Clock size={13} strokeWidth={1.6} /> {getReadingTime(post.content)} MIN READ
                  </span>
                  <span className="blog-read-link">
                    READ <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="archive-note mono">
            <span>MORE FIELD NOTES INCOMING.</span>
            <span>ALAZ / BLOG</span>
          </div>
        </section>
      </main>
    </>
  );
}
