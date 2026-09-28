import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, CirclePower, MoveUpRight, ShieldCheck } from 'lucide-react';
import { media, projects, services } from '@/data/siteData.tr';

const testimonials = [
  { number: '01', quote: '“Akıl yürütülmesi imkânsız hale gelmiş bir sisteme düzen getirdiler. Yeni mimari, teslimatı yavaşlatmadan ekibimize net bir yol haritası verdi.”', name: 'MERVE T.', role: 'PROJE YÖNETİCİSİ', focus: 'MİMARİ' },
  { number: '02', quote: '“Öne çıkan şey disiplindi. Her teknik kararın arkasında bir neden vardı ve mühendislik, inşa etmeye çalıştığımız ürünü hiç gözden kaybetmedi.”', name: 'BURAK Y.', role: 'ÜRÜN SAHİBİ', focus: 'YÜRÜTME' },
  { number: '03', quote: '“Cilalı bir arayüzden fazlasına ihtiyacımız vardı. Altında güvenilir bir temel lazımdı. ALAZ bu ayrımı ilk sohbetten anladı.”', name: 'SELİN A.', role: 'E-TİCARET DİREKTÖRÜ', focus: 'GÜVENİLİRLİK' },
];

export default function HomePageTR() {
  return <>
    <Helmet><html lang="tr" /><title>ALAZ — Yazılım Mimari & Mühendislik Stüdyosu</title><meta name="description" content="ALAZ dayanıklı yazılım mimarisi, doğal performans ve bağlı dijital ekosistemler tasarlar. Lafı fazla değil. İşe odaklı." /></Helmet>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,.55) 0%, rgba(10,10,10,.10) 48%, #0a0a0a 100%), url('${media.earth}')` }} />
        <div className="hero-grid" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-content frame">
          <div className="hero-topline mono"><span><span className="status-square" /> SİSTEM_AKTİF</span><span>MÜHENDİSLİK STÜDYOSU / KUR. 2025</span></div>
          <div className="hero-center">
            <p className="hero-kicker mono">BAĞIMSIZ YAZILIM MİMARİSİ STÜDYOSU <span>— 001 / 005</span></p>
            <h1 id="hero-title">ALAZ<span className="hero-period">.</span></h1>
            <div className="hero-under"><p>BOŞ LAF YOK.<br />SADECE İŞ.</p><p className="hero-intro">İddialı fikirleri operasyonel kılan sistemlerin mimarisini yaparız. Niyetle tasarlandı. Dayanacak şekilde inşa edildi.</p></div>
          </div>
          <div className="hero-bottomline mono"><a href="#validation">KEŞFETMEK İÇİN KAYDIR <ArrowDown size={14} /></a><span>İSABET STANDARTTIR. HEDEF DEĞİL.</span><span>01 / 05</span></div>
        </div>
      </section>

      <div className="signal-strip mono" aria-hidden="true"><div><span>ALAZ / SİSTEM DÜŞÜNCESİ</span><span>◻</span><span>TAVİZSİZ MÜHENDİSLİK</span><span>◻</span><span>ALAZ / SİSTEM DÜŞÜNCESİ</span><span>◻</span><span>TAVİZSİZ MÜHENDİSLİK</span><span>◻</span></div></div>

      <section className="validation section-shell frame" id="validation">
        <div className="section-top mono"><span>01 / DIŞ SİNYAL</span><span>REFERANSLAR // 03</span></div>
        <div className="validation-heading"><h2>DOĞRULAMA<span className="outlined-period">.</span></h2><ShieldCheck size={46} strokeWidth={1} aria-hidden="true" /></div>
        <p className="section-lead">En güçlü sistemler itibarlarını üretimde kazanırlar.</p>
        <div className="testimonials">
          {testimonials.map(item => <article className="testimonial" key={item.number}>
            <div className="testimonial-top mono"><span>({item.number})</span><span>{item.focus}</span></div>
            <blockquote>{item.quote}</blockquote>
            <div className="testimonial-person"><span className="mini-line" /><div><strong>{item.name}</strong><span className="mono">// {item.role}</span></div></div>
          </article>)}
        </div>
      </section>
      <div className="trust-ticker mono"><div>GÜVENİLİR ORTAKLIK <span>✳</span> MÜŞTERİ BAŞARISI <span>✳</span> MİMARİ BÜTÜNLÜK <span>✳</span> TAVİZSİZ İSABET <span>✳</span> GÜVENİLİR ORTAKLIK <span>✳</span> MÜŞTERİ BAŞARISI <span>✳</span> MİMARİ BÜTÜNLÜK <span>✳</span> TAVİZSİZ İSABET <span>✳</span></div></div>

      <section className="capabilities section-shell frame" id="services">
        <div className="section-top mono"><span>02 / NE YAPIYORUZ</span><span>CİLA DEĞİL DİSİPLİN</span></div>
        <div className="section-title-row"><h2>ÇEKİRDEK<br />YETKİNLİKLER<span className="outlined-period">.</span></h2><Link to="/tr/about#services" className="text-action">HİZMETLERİ KEŞFET <ArrowUpRight size={17} /></Link></div>
        <div className="services-grid">
          {services.map(service => <article className="service" key={service.number}>
            <div className="service-index mono">{service.number} <span>—</span> 03 <MoveUpRight size={18} /></div>
            <div className="service-content"><span className="mono service-category">// {service.category}</span><h3>{service.title}</h3><p>{service.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="selected section-shell frame" id="work">
        <div className="section-top mono"><span>03 / ÇIKTI</span><span>SEÇİLMİŞ PROJELER // 02</span></div>
        <div className="section-title-row"><h2>SEÇİLMİŞ<br />İŞLER<span className="outlined-period">.</span></h2><Link to="/tr/case-studies" className="outline-action">TÜM PROJELER <ArrowUpRight size={16} /></Link></div>
        <div className="projects-list">{projects.map(project => <Link to={`/tr/case-studies/${project.slug}`} className="project" key={project.slug}>
          <div className="project-media"><img src={project.image} alt={`${project.name} ${project.type} mühendislik görseli`} loading="lazy" /><span className="project-overlay-index mono">ALAZ / {project.number}</span><span className="project-arrow"><ArrowUpRight size={23} strokeWidth={1.5} /></span></div>
          <div className="project-info"><span className="mono">{project.number} / PROJE</span><div><h3>{project.name} <span>— {project.discipline}</span></h3><p>{project.summary}</p></div><span className="mono project-type">{project.type} <ArrowRight size={14} /></span></div>
        </Link>)}</div>
      </section>

      <section className="start-section" id="contact" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,.76), rgba(10,10,10,.68)), url('${media.conduits}')` }}>
        <div className="start-inner frame"><div className="section-top mono"><span>04 / BAŞLAT</span><span>HAZIR OLDUĞUNUZDA</span></div>
          <div className="start-center"><span className="mono start-eyebrow"><span className="status-square" /> KOMUT DİZİSİ HAZIR</span><h2>PROJE<br />BAŞLAT<span>.</span></h2><p>Bir sonraki büyük sistem bir sohbetle başlar.</p><Link to="/tr/start-project" className="start-button"><CirclePower size={19} strokeWidth={2} /> DİZİYİ BAŞLAT <ArrowUpRight size={17} /></Link></div>
          <div className="start-bottom mono"><span>NİYETLE TASARLANDI / DAYANACAK ŞEKİLDE İNŞA EDİLDİ</span><span>05 / 05</span></div>
        </div>
      </section>
    </main>
  </>;
}
