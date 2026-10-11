'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/Icon';
import { EXCHANGES, exchangeStatus, forexStatus } from '@/lib/markets';

// A live strip of the markets Market Hours tracks: which exchanges are in their regular session
// right now and how long until that changes. Computed in the browser from each exchange's hours
// in its own time zone (daylight saving included); holidays live on markethours.live, linked here.
// The server renders the names only, so the markup never disagrees with the client clock.
// Motion: a slow drift, paused on hover; under reduced motion it is a plain scrollable row.
export default function MarketTicker({ bare = false }) {
  const t = useTranslations('markets');
  const [now, setNow] = useState(null);

  useEffect(() => {
    let interval;
    const tick = () => setNow(Date.now());
    tick();
    // Re-render on the minute boundary, then every minute.
    const timeout = setTimeout(() => { tick(); interval = setInterval(tick, 60000); }, 60000 - (Date.now() % 60000) + 50);
    const onVisible = () => { if (document.visibilityState === 'visible') tick(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { clearTimeout(timeout); clearInterval(interval); document.removeEventListener('visibilitychange', onVisible); };
  }, []);

  const duration = (ms) => {
    const total = Math.max(1, Math.round(ms / 60000));
    const d = Math.floor(total / 1440); const h = Math.floor((total % 1440) / 60); const m = total % 60;
    if (d) return [t('units.d', { n: d }), h ? t('units.h', { n: h }) : null].filter(Boolean).join(' ');
    if (h) return [t('units.h', { n: h }), m ? t('units.m', { n: m }) : null].filter(Boolean).join(' ');
    return t('units.m', { n: m });
  };

  const rows = [
    { id: t('fx'), status: now && forexStatus(now) },
    ...EXCHANGES.map((ex) => ({ id: ex.id, status: now && exchangeStatus(ex, now) })),
  ];

  const list = (copy) => (
    <ul className="ticker-list flex items-center gap-[44px] pr-[44px] shrink-0" aria-hidden={copy || undefined}>
      {rows.map(({ id, status }) => (
        <li key={id} className="flex items-center gap-[10px] whitespace-nowrap">
          <span className={status?.state === 'open' ? 'w-[6px] h-[6px] bg-ember shadow-[0_0_10px_2px_rgba(255,90,31,.45)]' : 'w-[6px] h-[6px] border border-fg-4'} aria-hidden="true" />
          <span className="text-fg">{id}</span>
          {status && <>
            <span className={status.state === 'open' ? 'text-ember-soft' : 'text-fg-3'}>{t(status.state)}</span>
            <span className="text-fg-4">· {t(`next.${status.next}`, { time: duration(status.ms) })}</span>
          </>}
        </li>
      ))}
    </ul>
  );

  const strip = (
    <div className="flex items-center gap-[clamp(16px,2vw,32px)] min-h-[54px] t-meta uppercase">
      <span className="shrink-0 text-fg-3 flex items-center gap-[10px]"><span className="text-fg">{t('label')}</span><span className="laptop:hidden">· {t('regular')}</span></span>
      <div className="ticker relative flex-1 min-w-0 overflow-hidden" aria-busy={now ? undefined : true}>
        <div className="ticker-track flex w-max">{list(false)}{list(true)}</div>
      </div>
      <a href="https://markethours.live" target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-[8px] text-fg-3 hover:text-fg mobile:hidden">{t('holidays')} <span className="text-fg">MARKETHOURS.LIVE</span> <Icon name="external" size={12} /></a>
    </div>
  );

  return (
    // bare: inside a page shell between two ruled blocks, so it draws no border of its own.
    <section className={bare ? undefined : 'border-b border-line bg-ink'} aria-label={t('ariaLabel')}>
      {bare ? strip : <div className="shell">{strip}</div>}
    </section>
  );
}
