import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export async function generateMetadata() {
  const t = await getTranslations('about.meta');
  return { title: t('title'), description: t('description') };
}

export default async function AboutPage() {
  const t = await getTranslations('about');
  const tRoot = await getTranslations();
  const media = tRoot.raw('media');
  const services = tRoot.raw('services');
  const heading = t.raw('heading');
  const disciplinesHeading = t.raw('disciplinesHeading');
  const principles = t.raw('principles');

  return <>
    <main className="about-page">
      <div className="frame about-intro"><div className="section-top mono"><span>{t('eyebrowLeft')}</span><span>{t('eyebrowRight')}</span></div><p className="eyebrow">{t('kicker')}</p><h1>{heading[0]}<br />{heading[1]}<span>.</span></h1><div className="intro-bottom"><p>{t('introText')}</p><span className="mono">{t('introNote')}</span></div></div>
      <div className="about-image"><Image src={media.laboratory} alt={t('imageAlt')} fill sizes="100vw" priority /><span className="mono">{t('imageCaption')}</span></div>
      <div className="frame principles"><div className="section-top mono"><span>{t('principlesEyebrowLeft')}</span><span>{t('principlesEyebrowRight')}</span></div>
        {principles.map(item => <article className="principle" key={item.number}><span className="mono">{item.number} / 03</span><h2>{item.title}</h2><p>{item.body}</p></article>)}
      </div>
      <section className="frame about-services" id="services"><div className="section-top mono"><span>{t('disciplinesEyebrowLeft')}</span><span>{t('disciplinesEyebrowRight')}</span></div><h2>{disciplinesHeading[0]}<br />{disciplinesHeading[1]}<span>.</span></h2>{services.map(service => <article key={service.number}><span className="mono">{service.number} / 03</span><div><h3>{service.title}</h3><p>{service.detail}</p></div><ArrowUpRight size={20} strokeWidth={1.3} /></article>)}</section>
      <div className="frame about-end"><p>{t('endTextTop')}<br /><span>{t('endTextBottom')}</span></p><Link href="/start-project" className="start-button">{t('startCta')} <ArrowUpRight size={17} /></Link></div>
    </main>
  </>;
}
