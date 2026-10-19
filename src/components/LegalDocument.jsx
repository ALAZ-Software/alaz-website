import Markdown from '@/components/Markdown';
import { fit } from '@/lib/fit';

// The page frame shared by every legal text: eyebrow, display title, an optional row of links
// under it, the table of contents on the left and the numbered sections on the right.
// `markdown` renders section bodies with lists, bold and links (the app documents); without it a
// body is one plain paragraph (the site's own texts in messages/*.json).
export default function LegalDocument({ eyebrow, label, title, nav, sections, markdown = false, children }) {
  return (
    <main id="main" className="shell min-h-[70vh] pt-[calc(var(--header-h)+40px)] pb-[var(--s-7)]">
      <div className="eyebrow t-meta uppercase" data-reveal="line"><span>{eyebrow}</span><span>{label}</span></div>
      <h1 style={fit(title, '.')} className="fit t-display-1 uppercase [--fit-size:clamp(56px,8vw,140px)] my-[var(--s-5)]" data-reveal="lines">{title}<span className="dot">.</span></h1>
      {nav}
      <div className="grid grid-cols-12 gap-[var(--col-gap)] tablet:flex tablet:flex-col">
        <aside className="col-span-3 tablet:hidden"><ol className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-[8px] border-t border-line pt-[16px]">{sections.map((s, i) => <li key={s.heading}><a href={`#s-${i}`} className="t-meta text-fg-4 hover:text-fg block py-[2px]">{s.heading}</a></li>)}</ol></aside>
        <div className="col-span-7 col-start-4 border-t border-line pt-[8px] mb-[var(--s-5)]">
          {sections.map(({ heading, body }, i) => <section key={heading} id={`s-${i}`} className="scroll-mt-[calc(var(--header-h)+24px)]">
            <h2 className="t-title-sm mt-[40px] mb-[12px]">{heading}</h2>
            {markdown ? <Markdown content={body} className="t-body text-fg-3 max-w-[64ch] [&_p:last-child]:mb-0 [&_ul:last-child]:mb-0" /> : <p className="t-body text-fg-3 max-w-[64ch]">{body}</p>}
          </section>)}
        </div>
      </div>
      {children}
    </main>
  );
}
