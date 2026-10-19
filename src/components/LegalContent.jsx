import { getTranslations } from 'next-intl/server';
import Icon from '@/components/Icon';
import LegalDocument from '@/components/LegalDocument';
import { Link } from '@/i18n/navigation';
import { fit } from '@/lib/fit';

export default async function LegalContent({ type }) {
  const t = await getTranslations('legal');
  const back = <Link href="/" className="btn-ghost">{t('backToHome')}</Link>;

  if (type === 'not-found') {
    return (
      <main id="main" className="shell min-h-[70vh] pt-[calc(var(--header-h)+40px)] pb-[var(--s-7)]">
        <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('sectionTopLeft')}</span><span>404</span></div>
        <h1 style={fit(t('notFound.title'), '.')} className="fit t-display-1 uppercase [--fit-size:clamp(56px,8vw,140px)] my-[var(--s-5)]" data-reveal="lines">{t('notFound.title')}<span className="dot">.</span></h1>
        <p className="t-lead text-fg-3 max-w-[40ch] mb-[var(--s-4)]" data-reveal="fade">{t('notFound.body')}</p>
        <ul className="flex flex-col border-t border-line max-w-[560px] mb-[var(--s-5)]">
          {t.raw('notFound.links').map((l, i) => <li key={l.href} data-reveal="fade" data-delay={i * 0.06}><Link href={l.href} className="group flex items-center justify-between py-[20px] border-b border-line t-title-sm uppercase heat-text">{l.label} <Icon name="arrow" size={20} className="transition-transform duration-fast group-hover:translate-x-[6px]" /></Link></li>)}
        </ul>
        {back}
      </main>
    );
  }

  const section = type === 'privacy' ? 'privacy' : 'legal';
  return (
    <LegalDocument eyebrow={t('sectionTopLeft')} label={t('documentLabel')} title={t(`${section}.title`)} sections={t.raw(`${section}.sections`)}>
      {back}
    </LegalDocument>
  );
}
