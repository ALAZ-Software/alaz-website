import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/siteData.tr';

export default function ArchivePageTR() {
  return <>
    <Helmet><html lang="tr" /><title>Vaka Çalışmaları — ALAZ Mühendislik</title><meta name="description" content="Bulut altyapısı, sistem tasarımı ve doğal performans alanlarında ALAZ mühendislik vaka çalışmalarını keşfedin." /></Helmet>
    <main className="subpage archive-page frame">
      <div className="page-intro"><div className="section-top mono"><span>İNDEKS / 001</span><span>ARŞİV / SEÇİLMİŞ İŞ</span></div><p className="eyebrow">İNŞA ETTİKLERİMİZİN BİR İNDEKSİ</p><h1>İŞLER<span>.</span></h1><div className="intro-bottom"><p>Teknik zorluklar. Düşünülmüş çözümler. Sonrası için mühendislikle inşa edilmiş sistemler.</p><span className="mono">DOSYADAKİ PROJELER / 002</span></div></div>
      <div className="archive-head mono"><span>NO.</span><span>PROJE / DİSİPLİN</span><span>KAPSAM</span><span>GÖRÜNTÜLE</span></div>
      {projects.map(project => <Link to={`/tr/case-studies/${project.slug}`} className="archive-item" key={project.slug}>
        <span className="mono archive-number">{project.number} /</span><div className="archive-name"><h2>{project.name}</h2><span className="mono">{project.discipline}</span></div><span className="mono archive-scope">{project.type}</span><ArrowUpRight className="archive-arrow" size={28} strokeWidth={1.3} />
        <div className="archive-preview"><img src={project.image} alt="" loading="lazy" /></div>
      </Link>)}
      <div className="archive-note mono"><span>İNDEKS SONU</span><span>DAHA FAZLA SİSTEM GELİŞTİRİLİYOR</span></div>
    </main>
  </>;
}
