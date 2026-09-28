import React from 'react';
import { getTranslations } from 'next-intl/server';
import { ArrowDown, ArrowRight, ArrowUpRight, CirclePower, MoveUpRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('home.meta');
  return { title: t('title'), description: t('description') };
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const tRoot = await getTranslations();
  const media = tRoot.raw('media');
  const testimonials = tRoot.raw('testimonials');
  const services = tRoot.raw('services');
  const projects = tRoot.raw('projects');
  const validationHeading = t.raw('validation.heading');
  const capabilitiesHeading = t.raw('capabilities.heading');
  const selectedHeading = t.raw('selected.heading');
  const startHeading = t.raw('start.heading');
  const ticker = t.raw('ticker');

  return <>
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <video className="hero-video" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
          <source src="/videos/dark-planet.mp4" type="video/mp4" />
        </video>
        <div className="hero-image-overlay" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-content frame">
          <div className="hero-topline mono"><span><span className="status-square" /> {t('hero.status')}</span><span>{t('hero.toplineRight')}</span></div>
          <div className="hero-center">
            <p className="hero-kicker mono">{t('hero.kicker')} <span>— 001 / 005</span></p>
            <h1 id="hero-title">ALAZ<span className="hero-period">.</span></h1>
            <div className="hero-under"><p>{t('hero.taglineTop')}<br />{t('hero.taglineBottom')}</p><p className="hero-intro">{t('hero.intro')}</p></div>
          </div>
          <div className="hero-bottomline mono"><a href="#validation">{t('hero.scrollCta')} <ArrowDown size={14} /></a><span>{t('hero.bottomNote')}</span><span>01 / 05</span></div>
        </div>
      </section>

      <div className="signal-strip mono" aria-hidden="true"><div><span>{t('signal.a')}</span><span>◻</span><span>{t('signal.b')}</span><span>◻</span><span>{t('signal.a')}</span><span>◻</span><span>{t('signal.b')}</span><span>◻</span></div></div>

      <section className="validation section-shell frame" id="validation">
        <div className="section-top mono"><span>{t('validation.eyebrowLeft')}</span><span>{t('validation.eyebrowRight')}</span></div>
        <div className="validation-heading"><h2>{validationHeading[0]}<span className="outlined-period">.</span></h2><ShieldCheck size={46} strokeWidth={1} aria-hidden="true" /></div>
        <p className="section-lead">{t('validation.lead')}</p>
        <div className="testimonials">
          {testimonials.map(item => <article className="testimonial" key={item.number}>
            <div className="testimonial-top mono"><span>({item.number})</span><span>{item.focus}</span></div>
            <blockquote>{item.quote}</blockquote>
            <div className="testimonial-person"><span className="mini-line" /><div><strong>{item.name}</strong><span className="mono">// {item.role}</span></div></div>
          </article>)}
        </div>
      </section>
      <div className="trust-ticker mono"><div>{[...ticker, ...ticker].map((item, i) => <React.Fragment key={i}>{item} <span>✳</span> </React.Fragment>)}</div></div>

      <section className="capabilities section-shell frame" id="services">
        <div className="section-top mono"><span>{t('capabilities.eyebrowLeft')}</span><span>{t('capabilities.eyebrowRight')}</span></div>
        <div className="section-title-row"><h2>{capabilitiesHeading[0]}<br />{capabilitiesHeading[1]}<span className="outlined-period">.</span></h2><Link href="/about#services" className="text-action">{t('capabilities.exploreCta')} <ArrowUpRight size={17} /></Link></div>
        <div className="services-grid">
          {services.map(service => <article className="service" key={service.number}>
            <div className="service-index mono">{service.number} <span>—</span> 03 <MoveUpRight size={18} /></div>
            <div className="service-content"><span className="mono service-category">// {service.category}</span><h3>{service.title}</h3><p>{service.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="selected section-shell frame" id="work">
        <div className="section-top mono"><span>{t('selected.eyebrowLeft')}</span><span>{t('selected.eyebrowRight')}</span></div>
        <div className="section-title-row"><h2>{selectedHeading[0]}<br />{selectedHeading[1]}<span className="outlined-period">.</span></h2><Link href="/case-studies" className="outline-action">{t('selected.viewAllCta')} <ArrowUpRight size={16} /></Link></div>
        <div className="projects-list">{projects.map(project => <Link href={`/case-studies/${project.slug}`} className="project" key={project.slug}>
          <div className="project-media"><Image src={project.image} alt={t('selected.imageAlt', { name: project.name, type: project.type })} fill sizes="100vw" /><span className="project-overlay-index mono">ALAZ / {project.number}</span><span className="project-arrow"><ArrowUpRight size={23} strokeWidth={1.5} /></span></div>
          <div className="project-info"><span className="mono">{project.number} / {t('selected.numberSuffix')}</span><div><h3>{project.name} <span>— {project.discipline}</span></h3><p>{project.summary}</p></div><span className="mono project-type">{project.type} <ArrowRight size={14} /></span></div>
        </Link>)}</div>
      </section>

      <section className="start-section" id="contact" style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,.76), rgba(10,10,10,.68)), url('${media.conduits}')` }}>
        <div className="start-inner frame"><div className="section-top mono"><span>{t('start.eyebrowLeft')}</span><span>{t('start.eyebrowRight')}</span></div>
          <div className="start-center"><span className="mono start-eyebrow"><span className="status-square" /> {t('start.badge')}</span><h2>{startHeading[0]}<br />{startHeading[1]}<span>.</span></h2><p>{t('start.paragraph')}</p><Link href="/start-project" className="start-button"><CirclePower size={19} strokeWidth={2} /> {t('start.button')} <ArrowUpRight size={17} /></Link></div>
          <div className="start-bottom mono"><span>{t('start.bottomNote')}</span><span>05 / 05</span></div>
        </div>
      </section>
    </main>
  </>;
}
