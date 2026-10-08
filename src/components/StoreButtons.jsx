// Brand marks from Simple Icons (CC0). Swap these for the official badge artwork once the apps are live.
const STORES = [
  { key: 'appStore', name: 'APP STORE', path: 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701' },
  { key: 'googlePlay', name: 'GOOGLE PLAY', path: 'M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z' },
];

const BASE = 'inline-flex items-center gap-[14px] min-h-[56px] px-[18px] border font-mono text-left leading-none [transition:background_.2s,color_.2s,border-color_.2s] xs:px-[14px]';

export default function StoreButtons({ links = {}, downloadLabel, soonLabel, className = '' }) {
  return <div className={`flex flex-wrap items-stretch gap-[14px] ${className}`}>
    {STORES.map(({ key, name, path }) => {
      const href = links[key];
      const content = <>
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px] flex-none" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
        <span className="flex flex-col gap-[7px]">
          <span className="text-[10px] tracking-[.12em] opacity-70">{href ? downloadLabel : soonLabel}</span>
          <span className="text-[15px] font-semibold tracking-[.06em]">{name}</span>
        </span>
      </>;
      return href
        ? <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={`${BASE} border-[rgba(255,255,255,.65)] bg-black/30 backdrop-blur-sm hover:bg-white hover:text-black`}>{content}</a>
        : <span key={key} role="link" aria-disabled="true" className={`${BASE} border-[rgba(255,255,255,.22)] bg-black/30 text-[#9a9a9a] cursor-default`}>{content}</span>;
    })}
  </div>;
}
