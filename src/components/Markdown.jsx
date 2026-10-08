import { Link } from '@/i18n/navigation';

// Minimal, dependency-free markdown renderer tuned for long-form posts.
// Supports: # ## ### headings, paragraphs, - lists, > blockquotes, --- hr,
// and inline **bold**, `code`, [text](url). Links starting with "/" stay on the site in the reader's language.
// Stable heading ids so sections can be deep-linked (e.g. /blog/post#the-short-version).
const slugify = (text) => text.toLowerCase().replace(/[*`[\]()]/g, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '');

const renderInline = (text) => {
  const nodes = [];
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let key = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('[')) {
      const lm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const linkClass = 'text-fg border-b border-line-strong transition-colors duration-fast hover:border-ember';
      if (lm[2].startsWith('/')) nodes.push(<Link key={key++} href={lm[2]} className={linkClass}>{lm[1]}</Link>);
      else if (lm[2].startsWith('mailto:')) nodes.push(<a key={key++} href={lm[2]} className={linkClass}>{lm[1]}</a>);
      else nodes.push(<a key={key++} href={lm[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>{lm[1]}</a>);
    } else if (tok.startsWith('**')) {
      nodes.push(<strong key={key++} className="text-fg font-bold">{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('`')) {
      nodes.push(<code key={key++} className="font-mono text-[.84em] bg-surface-2 border border-line px-[7px] py-[2px] text-fg-2">{tok.slice(1, -1)}</code>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

export default function Markdown({ content }) {
  const lines = content.split('\n');
  const blocks = [];
  let list = null;
  let para = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push(<p key={`p-${blocks.length}`} className="mb-[24px]">{renderInline(para.join(' '))}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(<ul key={`ul-${blocks.length}`} className="m-0 mb-[26px] p-0 list-none">{list}</ul>);
      list = null;
    }
  };

  lines.forEach((line) => {
    if (!line.trim()) {
      flushPara();
      flushList();
      return;
    }
    if (/^###\s/.test(line)) {
      flushPara();
      flushList();
      const text = line.replace(/^###\s/, '');
      blocks.push(<h3 key={`h3-${blocks.length}`} id={slugify(text)} className="t-title-sm text-fg mt-[42px] mb-[14px] scroll-mt-[calc(var(--header-h)+24px)]">{renderInline(text)}</h3>);
      return;
    }
    if (/^##\s/.test(line)) {
      flushPara();
      flushList();
      const text = line.replace(/^##\s/, '');
      blocks.push(<h2 key={`h2-${blocks.length}`} id={slugify(text)} className="t-title text-fg mt-[58px] mb-[18px] scroll-mt-[calc(var(--header-h)+24px)] mobile:mt-[42px] mobile:mb-[14px]">{renderInline(text)}</h2>);
      return;
    }
    if (/^#\s/.test(line)) {
      flushPara();
      flushList();
      const text = line.replace(/^#\s/, '');
      blocks.push(<h2 key={`h2-${blocks.length}`} id={slugify(text)} className="t-title text-fg mt-[58px] mb-[18px] scroll-mt-[calc(var(--header-h)+24px)] mobile:mt-[42px] mobile:mb-[14px]">{renderInline(text)}</h2>);
      return;
    }
    if (/^>\s/.test(line)) {
      flushPara();
      flushList();
      blocks.push(<blockquote key={`q-${blocks.length}`} className="border-l-2 border-ember py-[4px] pl-[22px] text-fg-3 mb-[26px] text-[.96em]">{renderInline(line.replace(/^>\s/, ''))}</blockquote>);
      return;
    }
    if (/^---+$/.test(line.trim())) {
      flushPara();
      flushList();
      blocks.push(<hr key={`hr-${blocks.length}`} className="border-0 border-t border-line my-[42px]" />);
      return;
    }
    if (/^[-*]\s/.test(line)) {
      flushPara();
      if (!list) list = [];
      list.push(<li key={`li-${list.length}`} className="relative pl-[26px] mb-[13px] leading-[1.7] before:content-[''] before:absolute before:left-0 before:top-[.7em] before:w-[13px] before:h-px before:bg-ember">{renderInline(line.replace(/^[-*]\s/, ''))}</li>);
      return;
    }
    flushList();
    para.push(line.trim());
  });

  flushPara();
  flushList();

  return <div className="max-w-[68ch] text-fg-2 text-[length:clamp(16px,1.3vw,19px)] leading-[1.72] [hyphens:auto] mobile:text-[16px]">{blocks}</div>;
}
