import { getTranslations } from 'next-intl/server';

export default async function ContactInfo() {
  const t = await getTranslations('contact');
  const offices = t.raw('offices');
  return <div className="flex flex-col gap-[20px] t-meta text-fg-4">
    {offices.map((o) => <address key={o.region} className="not-italic leading-[1.7]"><span className="text-fg uppercase">{o.region}</span><br />{o.lines.map((l, i) => <span key={i}>{l}<br /></span>)}</address>)}
  </div>;
}
