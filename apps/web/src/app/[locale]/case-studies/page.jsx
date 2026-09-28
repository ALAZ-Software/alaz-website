import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('archive.meta');
  return { title: t('title'), description: t('description') };
}

export default async function ArchivePage() {
  const t = await getTranslations('archive');
  const tRoot = await getTranslations();
  const projects = tRoot.raw('projects');
  const heading = t.raw('heading');
  const tableHeaders = t.raw('tableHeaders');

  return <>
    <main className="subpage archive-page frame">
      <div className="page-intro"><div className="section-top mono"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div><p className="eyebrow">{t('kicker')}</p><h1>{heading.join(' ')}<span>.</span></h1><div className="intro-bottom"><p>{t('introText')}</p><span className="mono">{t('introNote')}</span></div></div>
      <div className="archive-head mono"><span>{tableHeaders[0]}</span><span>{tableHeaders[1]}</span><span>{tableHeaders[2]}</span><span>{tableHeaders[3]}</span></div>
      {projects.map(project => <Link href={`/case-studies/${project.slug}`} className="archive-item" key={project.slug}>
        <span className="mono archive-number">{project.number} /</span><div className="archive-name"><h2>{project.name}</h2><span className="mono">{project.discipline}</span></div><span className="mono archive-scope">{project.type}</span><ArrowUpRight className="archive-arrow" size={28} strokeWidth={1.3} />
        <div className="archive-preview"><Image src={project.image} alt="" fill sizes="220px" /></div>
      </Link>)}
      <div className="archive-note mono"><span>{t('noteLeft')}</span><span>{t('noteRight')}</span></div>
    </main>
  </>;
}
