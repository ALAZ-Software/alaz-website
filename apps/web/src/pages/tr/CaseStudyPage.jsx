import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/siteData.tr';

export default function CaseStudyPageTR() {
  const { slug } = useParams();
  const project = projects.find(item => item.slug === slug);
  if (!project) return <main className="subpage frame"><h1>PROJE BULUNAMADI.</h1><Link to="/tr/case-studies" className="text-action">ARŞİVE DÖN <ArrowLeft size={16} /></Link></main>;
  const next = projects.find(item => item.slug !== slug);
  return <>
    <Helmet><html lang="tr" /><title>{project.name} — ALAZ Vaka Çalışması</title><meta name="description" content={`${project.name}: ${project.summary} Bu ALAZ mühendislik vaka çalışmasını okuyun.`} /></Helmet>
    <main className="case-page">
      <div className="frame case-intro"><div className="section-top mono"><Link to="/tr/case-studies">← TÜM VAKA ÇALIŞMALARI</Link><span>PROJE / {project.number}</span></div><p className="eyebrow">{project.type} / {project.discipline}</p><h1>{project.name}<span>.</span></h1><p className="case-summary">{project.summary}</p></div>
      <div className="case-hero"><img src={project.image} alt={`${project.name} teknik mühendislik görseli`} /></div>
      <div className="frame case-detail"><div className="case-meta mono"><span>ALAZ / SEÇİLMİŞ İŞ</span><span>{project.number} / 02</span></div><div className="case-body"><div><p className="eyebrow">01 / ZORLUK</p><h2>SONRAKİ İÇİN<br />İNŞA ET.</h2></div><p>{project.challenge}</p></div><div className="case-body"><div><p className="eyebrow">02 / YAKLAŞIM</p><h2>HER KATMANA<br />İSABET.</h2></div><p>{project.approach}</p></div><div className="case-body"><div><p className="eyebrow">03 / SONUÇ</p><h2>DAHA AZ GÜRÜLTÜ.<br />DAHA FAZLA SİNYAL.</h2></div><p>{project.outcome}</p></div><div className="case-markers">{project.markers.map((marker, i) => <div key={marker}><span className="mono">0{i + 1} / TESLİMAT</span><strong>{marker}</strong></div>)}</div><Link to={`/tr/case-studies/${next.slug}`} className="next-project"><span className="mono">SONRAKİ PROJE / {next.number}</span><span>{next.name} <ArrowRight size={38} strokeWidth={1.2} /></span></Link></div>
      <div className="case-contact frame"><span className="mono">KARMAŞIK BİR ZORLUĞUNUZ MU VAR?</span><Link to="/tr/start-project" className="outline-action">KONUŞALIM <ArrowUpRight size={17} /></Link></div>
    </main>
  </>;
}
