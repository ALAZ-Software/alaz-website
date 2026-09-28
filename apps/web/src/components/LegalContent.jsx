import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LegalContent({ type }) {
  const t = await getTranslations('legal');
  const privacy = type === 'privacy';
  const missing = type === 'not-found';
  const section = missing ? 'notFound' : privacy ? 'privacy' : 'legal';

  return (
    <main className="subpage legal-page frame"><div className="section-top mono"><span>{t('sectionTopLeft')}</span><span>{missing ? '404' : t('documentLabel')}</span></div><h1>{t(`${section}.title`)}<span>.</span></h1>
      {missing ? <p>{t('notFound.body')}</p> : privacy ? <div className="legal-copy"><h2>{t('privacy.h1')}</h2><p>{t('privacy.p1')}</p><h2>{t('privacy.h2')}</h2><p>{t('privacy.p2Before')}<a href="mailto:hello@alaz.pro">hello@alaz.pro</a>{t('privacy.p2After')}</p><h2>{t('privacy.h3')}</h2><p>{t('privacy.p3')}</p></div> : <div className="legal-copy"><h2>{t('legal.h1')}</h2><p>{t('legal.p1')}</p><h2>{t('legal.h2')}</h2><p>{t('legal.p2')}</p></div>}
      <Link href="/" className="outline-action">{t('backToHome')}</Link>
    </main>
  );
}
