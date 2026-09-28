import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/siteData';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const project = projects.find(item => item.slug === slug);
  if (!project) return <main className="subpage frame"><h1>PROJECT NOT FOUND.</h1><Link to="/case-studies" className="text-action">BACK TO ARCHIVE <ArrowLeft size={16} /></Link></main>;
  const next = projects.find(item => item.slug !== slug);
  return <>
    <Helmet><title>{project.name} — ALAZ Case Study</title><meta name="description" content={`${project.name}: ${project.summary} Read this ALAZ engineering case study.`} /></Helmet>
    <main className="case-page">
      <div className="frame case-intro"><div className="section-top mono"><Link to="/case-studies">← ALL CASE STUDIES</Link><span>PROJECT / {project.number}</span></div><p className="eyebrow">{project.type} / {project.discipline}</p><h1>{project.name}<span>.</span></h1><p className="case-summary">{project.summary}</p></div>
      <div className="case-hero"><img src={project.image} alt={`${project.name} technical engineering visual`} /></div>
      <div className="frame case-detail"><div className="case-meta mono"><span>ALAZ / SELECTED WORK</span><span>{project.number} / 02</span></div><div className="case-body"><div><p className="eyebrow">01 / THE CHALLENGE</p><h2>BUILD FOR<br />WHAT'S NEXT.</h2></div><p>{project.challenge}</p></div><div className="case-body"><div><p className="eyebrow">02 / THE APPROACH</p><h2>PRECISION<br />AT EVERY LAYER.</h2></div><p>{project.approach}</p></div><div className="case-body"><div><p className="eyebrow">03 / THE OUTCOME</p><h2>LESS NOISE.<br />MORE SIGNAL.</h2></div><p>{project.outcome}</p></div><div className="case-markers">{project.markers.map((marker, i) => <div key={marker}><span className="mono">0{i + 1} / DELIVERABLE</span><strong>{marker}</strong></div>)}</div><Link to={`/case-studies/${next.slug}`} className="next-project"><span className="mono">NEXT PROJECT / {next.number}</span><span>{next.name} <ArrowRight size={38} strokeWidth={1.2} /></span></Link></div>
      <div className="case-contact frame"><span className="mono">HAVE A COMPLEX CHALLENGE?</span><Link to="/start-project" className="outline-action">LET'S TALK <ArrowUpRight size={17} /></Link></div>
    </main>
  </>;
}
