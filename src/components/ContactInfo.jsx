import { getTranslations } from 'next-intl/server';

export default async function ContactInfo({ large = false }) {
  const t = await getTranslations('contact');
  const offices = t.raw('offices');
  return <div className={`flex gap-[clamp(28px,4vw,64px)] font-mono tracking-[.04em] ${large ? 'text-[14px] leading-[1.8] text-[#bdbdbd] mobile:flex-col mobile:gap-[24px]' : 'flex-col !gap-[20px] text-[12px] leading-[1.7] text-dim'}`}>
    {offices.map(o => <address key={o.region} className="not-italic"><span className="text-white">{o.region}</span><br />{o.lines.map((l, i) => <span key={i}>{l}<br /></span>)}</address>)}
  </div>;
}
