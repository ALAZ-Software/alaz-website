import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/siteData';

export default function ArchivePage() {
  return <>
    <Helmet><title>Case Studies — ALAZ Engineering</title><meta name="description" content="Explore ALAZ engineering case studies in cloud infrastructure, system design, and native performance." /></Helmet>
    <main className="subpage archive-page frame">
      <div className="page-intro"><div className="section-top mono"><span>INDEX / 001</span><span>ARCHIVE / SELECTED WORK</span></div><p className="eyebrow">AN INDEX OF WHAT WE BUILD</p><h1>THE WORK<span>.</span></h1><div className="intro-bottom"><p>Technical challenges. Considered solutions. Systems engineered for what comes next.</p><span className="mono">PROJECTS ON FILE / 002</span></div></div>
      <div className="archive-head mono"><span>NO.</span><span>PROJECT / DISCIPLINE</span><span>SCOPE</span><span>VIEW</span></div>
      {projects.map(project => <Link to={`/case-studies/${project.slug}`} className="archive-item" key={project.slug}>
        <span className="mono archive-number">{project.number} /</span><div className="archive-name"><h2>{project.name}</h2><span className="mono">{project.discipline}</span></div><span className="mono archive-scope">{project.type}</span><ArrowUpRight className="archive-arrow" size={28} strokeWidth={1.3} />
        <div className="archive-preview"><img src={project.image} alt="" loading="lazy" /></div>
      </Link>)}
      <div className="archive-note mono"><span>END OF INDEX</span><span>MORE SYSTEMS IN DEVELOPMENT</span></div>
    </main>
  </>;
}
