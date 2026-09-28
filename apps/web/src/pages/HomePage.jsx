import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, CirclePower, MoveUpRight, ShieldCheck } from 'lucide-react';
import { media, projects, services } from '@/data/siteData';

const testimonials = [
  { number: '01', quote: '“They brought order to a system that had become impossible to reason about. The new architecture gave our team a clear path forward without slowing down delivery.”', name: 'MERVE T.', role: 'PROJECT MANAGER', focus: 'ARCHITECTURE' },
  { number: '02', quote: '“What stood out was the discipline. Every technical decision had a reason behind it, and the engineering never lost sight of the product we were trying to build.”', name: 'BURAK Y.', role: 'PRODUCT OWNER', focus: 'EXECUTION' },
  { number: '03', quote: '“We needed more than a polished interface. We needed a reliable foundation underneath it. ALAZ understood that distinction from the first conversation.”', name: 'SELIN A.', role: 'E-COMMERCE DIRECTOR', focus: 'RELIABILITY' },
];

export default function HomePage() {
  return <>
    <Helmet><title>ALAZ — Software Architecture & Engineering Studio</title><meta name="description" content="ALAZ designs resilient software architecture, native performance, and connected digital ecosystems. No bullshit. Just action." /></Helmet>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,.55) 0%, rgba(10,10,10,.10) 48%, #0a0a0a 100%), url('${media.earth}')` }} />
        <div className="hero-grid" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-content frame">
          <div className="hero-topline mono"><span><span className="status-square" /> SYSTEM_ACTIVE</span><span>ENGINEERING STUDIO / EST. 2025</span></div>
          <div className="hero-center">
            <p className="hero-kicker mono">INDEPENDENT SOFTWARE ARCHITECTURE STUDIO <span>— 001 / 005</span></p>
            <h1 id="hero-title">ALAZ<span className="hero-period">.</span></h1>
            <div className="hero-under"><p>NO BULLSHIT.<br />JUST ACTION.</p><p className="hero-intro">We architect the systems that make ambitious ideas operational. Built with intent. Engineered to last.</p></div>
          </div>
          <div className="hero-bottomline mono"><a href="#validation">SCROLL TO EXPLORE <ArrowDown size={14} /></a><span>PRECISION IS THE STANDARD. NOT THE GOAL.</span><span>01 / 05</span></div>
        </div>
      </section>

      <div className="signal-strip mono" aria-hidden="true"><div><span>ALAZ / SYSTEMS THINKING</span><span>◻</span><span>ENGINEERING WITHOUT COMPROMISE</span><span>◻</span><span>ALAZ / SYSTEMS THINKING</span><span>◻</span><span>ENGINEERING WITHOUT COMPROMISE</span><span>◻</span></div></div>

      <section className="validation section-shell frame" id="validation">
        <div className="section-top mono"><span>01 / EXTERNAL SIGNAL</span><span>TESTIMONIALS // 03</span></div>
        <div className="validation-heading"><h2>VALIDATION<span className="outlined-period">.</span></h2><ShieldCheck size={46} strokeWidth={1} aria-hidden="true" /></div>
        <p className="section-lead">The strongest systems earn their reputation in production.</p>
        <div className="testimonials">
          {testimonials.map(item => <article className="testimonial" key={item.number}>
            <div className="testimonial-top mono"><span>({item.number})</span><span>{item.focus}</span></div>
            <blockquote>{item.quote}</blockquote>
            <div className="testimonial-person"><span className="mini-line" /><div><strong>{item.name}</strong><span className="mono">// {item.role}</span></div></div>
          </article>)}
        </div>
      </section>
      <div className="trust-ticker mono"><div>TRUSTED PARTNERSHIP <span>✳</span> CLIENT SUCCESS <span>✳</span> ARCHITECTURAL INTEGRITY <span>✳</span> UNCOMPROMISING PRECISION <span>✳</span> TRUSTED PARTNERSHIP <span>✳</span> CLIENT SUCCESS <span>✳</span> ARCHITECTURAL INTEGRITY <span>✳</span> UNCOMPROMISING PRECISION <span>✳</span></div></div>

      <section className="capabilities section-shell frame" id="services">
        <div className="section-top mono"><span>02 / WHAT WE DO</span><span>DISCIPLINE OVER DECORATION</span></div>
        <div className="section-title-row"><h2>CORE<br />CAPABILITIES<span className="outlined-period">.</span></h2><Link to="/about#services" className="text-action">EXPLORE SERVICES <ArrowUpRight size={17} /></Link></div>
        <div className="services-grid">
          {services.map(service => <article className="service" key={service.number}>
            <div className="service-index mono">{service.number} <span>—</span> 03 <MoveUpRight size={18} /></div>
            <div className="service-content"><span className="mono service-category">// {service.category}</span><h3>{service.title}</h3><p>{service.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="selected section-shell frame" id="work">
        <div className="section-top mono"><span>03 / THE OUTPUT</span><span>SELECTED PROJECTS // 02</span></div>
        <div className="section-title-row"><h2>SELECTED<br />WORKS<span className="outlined-period">.</span></h2><Link to="/case-studies" className="outline-action">VIEW ALL PROJECTS <ArrowUpRight size={16} /></Link></div>
        <div className="projects-list">{projects.map(project => <Link to={`/case-studies/${project.slug}`} className="project" key={project.slug}>
          <div className="project-media"><img src={project.image} alt={`${project.name} ${project.type} engineering visual`} loading="lazy" /><span className="project-overlay-index mono">ALAZ / {project.number}</span><span className="project-arrow"><ArrowUpRight size={23} strokeWidth={1.5} /></span></div>
          <div className="project-info"><span className="mono">{project.number} / PROJECT</span><div><h3>{project.name} <span>— {project.discipline}</span></h3><p>{project.summary}</p></div><span className="mono project-type">{project.type} <ArrowRight size={14} /></span></div>
        </Link>)}</div>
      </section>

      <section className="start-section" id="contact" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,.76), rgba(10,10,10,.68)), url('${media.conduits}')` }}>
        <div className="start-inner frame"><div className="section-top mono"><span>04 / INITIATE</span><span>READY WHEN YOU ARE</span></div>
          <div className="start-center"><span className="mono start-eyebrow"><span className="status-square" /> COMMAND SEQUENCE READY</span><h2>START<br />PROJECT<span>.</span></h2><p>The next great system starts with a conversation.</p><Link to="/start-project" className="start-button"><CirclePower size={19} strokeWidth={2} /> START SEQUENCE <ArrowUpRight size={17} /></Link></div>
          <div className="start-bottom mono"><span>DESIGNED WITH INTENT / BUILT TO ENDURE</span><span>05 / 05</span></div>
        </div>
      </section>
    </main>
  </>;
}
