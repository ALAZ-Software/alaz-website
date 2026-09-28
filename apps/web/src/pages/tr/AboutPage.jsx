import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { media, services } from '@/data/siteData.tr';

export default function AboutPageTR() {
  return <>
    <Helmet><html lang="tr" /><title>ALAZ Hakkında — Mühendislik Manifestosu</title><meta name="description" content="ALAZ bağımsız bir yazılım mimarisi ve mühendislik stüdyosudur. Kalıcılığı mühendislikle yaparız, dogmadan çok veriyi tercih ederiz ve acımasız verimlilikle inşa ederiz." /></Helmet>
    <main className="about-page">
      <div className="frame about-intro"><div className="section-top mono"><span>STÜDYO / 001</span><span>İŞLETME İLKELERİMİZ</span></div><p className="eyebrow">BİR AJANS DEĞİL. BİR MÜHENDİSLİK UYGULAMASI.</p><h1>KALICILIĞI<br />MÜHENDİSLİKLE İNŞA EDERİZ<span>.</span></h1><div className="intro-bottom"><p>Karmaşık sistemleri güvenecek kadar basit ve dayanacak kadar güçlü yapmak için varız.</p><span className="mono">ALAZ / MANİFESTO 2025</span></div></div>
      <div className="about-image"><img src={media.laboratory} alt="İsabetli iş istasyonlarıyla mimari mühendislik laboratuvarı" /><span className="mono">ŞEK. 01 — İSABET UYGULAMASI</span></div>
      <div className="frame principles"><div className="section-top mono"><span>01 / MANİFESTO</span><span>ÜÇ İLKE / TEK STANDART</span></div>
        {[
          ['01', 'DOGMA DEĞİL VERİ', 'Kararlar kanıta dayanır. Varsayımları sorgularız, önemli olanı ölçeriz ve çözümü gerçeklik şekillendirir.'],
          ['02', 'ACIMASIZ VERİMLİLİK', 'Her katman yerini hak etmeli. Karmaşıklığı daha iyi görünen bir arayüzün arkasına saklamak yerine kaldırırız.'],
          ['03', 'KALICILIĞI MÜHENDİSLİKLE İNŞA ET', 'En iyi iş lansmanın ötesine geçer. Brief değiştiğinde yararlı kalan bakımı yapılabilir temeller inşa ederiz.'],
        ].map(item => <article className="principle" key={item[0]}><span className="mono">{item[0]} / 03</span><h2>{item[1]}</h2><p>{item[2]}</p></article>)}
      </div>
      <section className="frame about-services" id="services"><div className="section-top mono"><span>02 / DİSİPLİNLERİMİZ</span><span>İŞİN ARKASINDAKİ İŞ</span></div><h2>MÜHENDİSLİK<br />ORTAMDIR<span>.</span></h2>{services.map(service => <article key={service.number}><span className="mono">{service.number} / 03</span><div><h3>{service.title}</h3><p>{service.detail}</p></div><ArrowUpRight size={20} strokeWidth={1.3} /></article>)}</section>
      <div className="frame about-end"><p>İYİ SİSTEMLER GÖRÜNMEZ.<br /><span>ETKİSİ GÖRÜNÜR.</span></p><Link to="/tr/start-project" className="start-button">PROJE BAŞLAT <ArrowUpRight size={17} /></Link></div>
    </main>
  </>;
}
