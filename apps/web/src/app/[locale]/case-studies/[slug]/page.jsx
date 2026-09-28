import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import enMessages from '@messages/en.json';

export function generateStaticParams() {
  return enMessages.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = await getTranslations('caseStudy');
  const tRoot = await getTranslations();
  const project = tRoot.raw('projects').find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: t('metaTitleTemplate', { name: project.name }),
    description: t('metaDescriptionTemplate', { name: project.name, summary: project.summary }),
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const t = await getTranslations('caseStudy');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const project = projects.find(item => item.slug === slug);
  if (!project) return <main className="subpage frame"><h1>{t('notFoundHeading')}</h1><Link href="/case-studies" className="text-action">{t('backToArchive')} <ArrowLeft size={16} /></Link></main>;
  const next = projects.find(item => item.slug !== slug);
  const challengeHeading = t.raw('challengeHeading');
  const approachHeading = t.raw('approachHeading');
  const outcomeHeading = t.raw('outcomeHeading');

  return <>
    <main className="case-page">
      <div className="frame case-intro"><div className="section-top mono"><Link href="/case-studies">{t('allCaseStudies')}</Link><span>{t('projectLabel')} / {project.number}</span></div><p className="eyebrow">{project.type} / {project.discipline}</p><h1>{project.name}<span>.</span></h1><p className="case-summary">{project.summary}</p></div>
      <div className="case-hero"><Image src={project.image} alt={t('imageAlt', { name: project.name })} fill sizes="100vw" priority /></div>
      <div className="frame case-detail"><div className="case-meta mono"><span>{t('selectedWorkLabel')}</span><span>{project.number} / 02</span></div><div className="case-body"><div><p className="eyebrow">{t('challengeEyebrow')}</p><h2>{challengeHeading[0]}<br />{challengeHeading[1]}</h2></div><p>{project.challenge}</p></div><div className="case-body"><div><p className="eyebrow">{t('approachEyebrow')}</p><h2>{approachHeading[0]}<br />{approachHeading[1]}</h2></div><p>{project.approach}</p></div><div className="case-body"><div><p className="eyebrow">{t('outcomeEyebrow')}</p><h2>{outcomeHeading[0]}<br />{outcomeHeading[1]}</h2></div><p>{project.outcome}</p></div><div className="case-markers">{project.markers.map((marker, i) => <div key={marker}><span className="mono">0{i + 1} / {t('deliverableLabel')}</span><strong>{marker}</strong></div>)}</div><Link href={`/case-studies/${next.slug}`} className="next-project"><span className="mono">{t('nextProjectLabel')} / {next.number}</span><span>{next.name} <ArrowRight size={38} strokeWidth={1.2} /></span></Link></div>
      <div className="case-contact frame"><span className="mono">{t('contactPrompt')}</span><Link href="/start-project" className="outline-action">{t('contactCta')} <ArrowUpRight size={17} /></Link></div>
    </main>
  </>;
}
