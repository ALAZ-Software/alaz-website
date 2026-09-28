import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { media, services } from '@/data/siteData';

export default function AboutPage() {
  return <>
    <Helmet><title>About ALAZ — The Engineering Manifesto</title><meta name="description" content="ALAZ is an independent software architecture and engineering studio. We engineer permanence, favor data over dogma, and build with brutal efficiency." /></Helmet>
    <main className="about-page">
      <div className="frame about-intro"><div className="section-top mono"><span>STUDIO / 001</span><span>OUR OPERATING PRINCIPLES</span></div><p className="eyebrow">NOT AN AGENCY. AN ENGINEERING PRACTICE.</p><h1>WE ENGINEER<br />PERMANENCE<span>.</span></h1><div className="intro-bottom"><p>We exist to make complex systems simple enough to trust and strong enough to endure.</p><span className="mono">ALAZ / MANIFESTO 2025</span></div></div>
      <div className="about-image"><img src={media.laboratory} alt="Architectural engineering laboratory with precision workstations" /><span className="mono">FIG. 01 — THE PRACTICE OF PRECISION</span></div>
      <div className="frame principles"><div className="section-top mono"><span>01 / THE MANIFESTO</span><span>THREE PRINCIPLES / ONE STANDARD</span></div>
        {[
          ['01', 'DATA OVER DOGMA', 'Decisions deserve evidence. We question assumptions, measure what matters, and let reality shape the solution.'],
          ['02', 'BRUTAL EFFICIENCY', 'Every layer should earn its place. We remove complexity instead of hiding it behind a better-looking interface.'],
          ['03', 'ENGINEER PERMANENCE', 'The best work outlasts the launch. We build maintainable foundations that stay useful when the brief changes.'],
        ].map(item => <article className="principle" key={item[0]}><span className="mono">{item[0]} / 03</span><h2>{item[1]}</h2><p>{item[2]}</p></article>)}
      </div>
      <section className="frame about-services" id="services"><div className="section-top mono"><span>02 / OUR DISCIPLINES</span><span>THE WORK BEHIND THE WORK</span></div><h2>ENGINEERING<br />IS THE MEDIUM<span>.</span></h2>{services.map(service => <article key={service.number}><span className="mono">{service.number} / 03</span><div><h3>{service.title}</h3><p>{service.detail}</p></div><ArrowUpRight size={20} strokeWidth={1.3} /></article>)}</section>
      <div className="frame about-end"><p>GOOD SYSTEMS ARE INVISIBLE.<br /><span>THE IMPACT ISN'T.</span></p><Link to="/start-project" className="start-button">START A PROJECT <ArrowUpRight size={17} /></Link></div>
    </main>
  </>;
}
