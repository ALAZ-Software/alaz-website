import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LegalContent({ type }) {
  const t = await getTranslations('legal');
  const privacy = type === 'privacy';
  const missing = type === 'not-found';
  const section = missing ? 'notFound' : privacy ? 'privacy' : 'legal';

  return (
    <main className="w-full px-[clamp(24px,4.2vw,72px)] min-h-[70vh] pt-[130px] pb-[160px] mobile:pt-[105px]">
      <div className="font-mono text-[10px] font-normal tracking-[.085em] leading-[1.6] flex items-center justify-between text-dim border-t border-line pt-[19px] [&_a:hover]:text-white mobile:text-[9px] mobile:[&_span:last-child]:max-w-[50%] mobile:[&_span:last-child]:text-right"><span>{t('sectionTopLeft')}</span><span>{missing ? '404' : t('documentLabel')}</span></div>
      <h1 className="text-[length:clamp(80px,13vw,190px)] leading-[.86] tracking-[-.075em] font-black my-[130px] mb-[70px] mobile:my-[90px] mobile:mb-[50px]">{t(`${section}.title`)}<span className="text-[#6e6e6e]">.</span></h1>
      {missing ? <p className="text-mute text-[20px] mb-[60px]">{t('notFound.body')}</p> : privacy ? <div className="max-w-[780px] border-t border-line pt-[20px] mb-[85px]">
          <h2 className="text-[25px] tracking-[-.05em] mt-[45px] mb-[15px]">{t('privacy.h1')}</h2>
          <p className="text-mute leading-[1.8] text-[15px]">{t('privacy.p1')}</p>
          <h2 className="text-[25px] tracking-[-.05em] mt-[45px] mb-[15px]">{t('privacy.h2')}</h2>
          <p className="text-mute leading-[1.8] text-[15px]">{t('privacy.p2Before')}<a href="mailto:hello@alaz.pro">hello@alaz.pro</a>{t('privacy.p2After')}</p>
          <h2 className="text-[25px] tracking-[-.05em] mt-[45px] mb-[15px]">{t('privacy.h3')}</h2>
          <p className="text-mute leading-[1.8] text-[15px]">{t('privacy.p3')}</p>
        </div> : <div className="max-w-[780px] border-t border-line pt-[20px] mb-[85px]">
          <h2 className="text-[25px] tracking-[-.05em] mt-[45px] mb-[15px]">{t('legal.h1')}</h2>
          <p className="text-mute leading-[1.8] text-[15px]">{t('legal.p1')}</p>
          <h2 className="text-[25px] tracking-[-.05em] mt-[45px] mb-[15px]">{t('legal.h2')}</h2>
          <p className="text-mute leading-[1.8] text-[15px]">{t('legal.p2')}</p>
        </div>}
      <Link href="/" className="inline-flex items-center justify-between gap-[30px] border border-[rgba(255,255,255,.65)] min-h-[49px] px-[18px] font-mono text-[10px] tracking-[.03em] whitespace-nowrap [transition:background_.2s,color_.2s] hover:bg-white hover:text-black xs:min-h-[46px]">{t('backToHome')}</Link>
    </main>
  );
}

