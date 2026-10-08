import { getTranslations } from 'next-intl/server';
import Icon from '@/components/Icon';
import { Link } from '@/i18n/navigation';
import { fit } from '@/lib/fit';

export default async function LegalContent({ type }) {
  const t = await getTranslations('legal');
  const missing = type === 'not-found';
  const section = missing ? 'notFound' : type === 'privacy' ? 'privacy' : 'legal';
  const sections = missing ? [] : t.raw(`${section}.sections`);

  return (
    <main id="main" className="shell min-h-[70vh] pt-[calc(var(--header-h)+40px)] pb-[var(--s-7)]">
      <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{t('sectionTopLeft')}</span><span>{missing ? '404' : t('documentLabel')}</span></div>
      <h1 style={fit(t(`${section}.title`), '.')} className="fit t-display-1 uppercase [--fit-size:clamp(56px,8vw,140px)] my-[var(--s-5)]" data-reveal="lines">{t(`${section}.title`)}<span className="dot">.</span></h1>
      {missing ? <>
          <p className="t-lead text-fg-3 max-w-[40ch] mb-[var(--s-4)]" data-reveal="fade">{t('notFound.body')}</p>
          <ul className="flex flex-col border-t border-line max-w-[560px] mb-[var(--s-5)]">
            {t.raw('notFound.links').map((l, i) => <li key={l.href} data-reveal="fade" data-delay={i * 0.06}><Link href={l.href} className="group flex items-center justify-between py-[20px] border-b border-line t-title-sm uppercase hover:text-ember-hot">{l.label} <Icon name="arrow" size={20} className="transition-transform duration-fast group-hover:translate-x-[6px]" /></Link></li>)}
          </ul>
        </> : <div className="grid grid-cols-12 gap-[var(--col-gap)] tablet:flex tablet:flex-col">
          <aside className="col-span-3 tablet:hidden"><ol className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-[8px] border-t border-line pt-[16px]">{sections.map((s, i) => <li key={s.heading}><a href={`#s-${i}`} className="t-meta text-fg-4 hover:text-fg block py-[2px]">{s.heading}</a></li>)}</ol></aside>
          <div className="col-span-7 col-start-4 border-t border-line pt-[8px] mb-[var(--s-5)]">
            {sections.map(({ heading, body }, i) => <section key={heading} id={`s-${i}`} className="scroll-mt-[calc(var(--header-h)+24px)]">
              <h2 className="t-title-sm mt-[40px] mb-[12px]">{heading}</h2>
              <p className="t-body text-fg-3 max-w-[64ch]">{body}</p>
            </section>)}
          </div>
        </div>}
      <Link href="/" className="btn-ghost">{t('backToHome')}</Link>
    </main>
  );
}
