import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import Seo from '@/components/Seo';
import { blogPosts, getReadingTime } from '@/data/blogPosts.tr';

const OG_IMAGE = 'https://images.hostinger.com/2aa88bd7-319c-4104-9497-307e490b6d51.png';

export default function BlogIndexPageTR() {
  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Helmet>
        <html lang="tr" />
        <title>Blog — ALAZ Mühendislik Stüdyosu</title>
        <meta
          name="description"
          content="Yazılım mimarisi, yüksek performanslı web mühendisliği ve dayanan sistemler inşa etme üzerine stüdyo notları. ALAZ mühendislik stüdyosu tarafından yazıldı."
        />
      </Helmet>
      <Seo
        title="Blog — ALAZ Mühendislik Stüdyosu"
        description="Yazılım mimarisi, yüksek performanslı web mühendisliği ve dayanan sistemler inşa etme üzerine stüdyo notları. ALAZ mühendislik stüdyosu tarafından yazıldı."
        image={OG_IMAGE}
        url="https://alaz.pro/tr/blog"
        siteName="ALAZ"
        type="website"
      />
      <main className="subpage">
        <div className="frame page-intro">
          <div className="section-top mono">
            <span>BLOG / 001</span>
            <span>STÜDYODAN NOTLAR</span>
          </div>
          <p className="eyebrow">MÜHENDİSLİK, SADE DİLDE.</p>
          <h1>
            BLOG<span>.</span>
          </h1>
          <div className="intro-bottom">
            <p>
              Mimari, performans ve lansman demosunun ötesinde dayanan yazılım yayınlama zanaatı üzerine notlar.
            </p>
            <span className="mono">ALAZ / YAZIM 2025</span>
          </div>
        </div>

        <section className="frame" aria-label="Blog yazıları">
          <div className="blog-list">
            {posts.map((post) => (
              <Link to={`/tr/blog/${post.slug}`} className="blog-card" key={post.slug}>
                <div className="blog-card-top mono">
                  <span className="blog-tag">{post.tag}</span>
                  <span>{post.dateLabel}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta mono">
                  <span className="blog-read">
                    <Clock size={13} strokeWidth={1.6} /> {getReadingTime(post.content)} DK OKUMA
                  </span>
                  <span className="blog-read-link">
                    OKU <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="archive-note mono">
            <span>DAHA FAZLA NOT GELİYOR.</span>
            <span>ALAZ / BLOG</span>
          </div>
        </section>
      </main>
    </>
  );
}
