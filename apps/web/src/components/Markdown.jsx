import React from 'react';

// Minimal, dependency-free markdown renderer tuned for long-form posts.
// Supports: # ## ### headings, paragraphs, - lists, > blockquotes, --- hr,
// and inline **bold**, `code`, [text](url).
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
      nodes.push(
        <a key={key++} href={lm[2]} target="_blank" rel="noopener noreferrer">
          {lm[1]}
        </a>
      );
    } else if (tok.startsWith('**')) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('`')) {
      nodes.push(<code key={key++}>{tok.slice(1, -1)}</code>);
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
      blocks.push(<p key={`p-${blocks.length}`}>{renderInline(para.join(' '))}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(<ul key={`ul-${blocks.length}`}>{list}</ul>);
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
      blocks.push(<h3 key={`h3-${blocks.length}`}>{renderInline(line.replace(/^###\s/, ''))}</h3>);
      return;
    }
    if (/^##\s/.test(line)) {
      flushPara();
      flushList();
      blocks.push(<h2 key={`h2-${blocks.length}`}>{renderInline(line.replace(/^##\s/, ''))}</h2>);
      return;
    }
    if (/^#\s/.test(line)) {
      flushPara();
      flushList();
      blocks.push(<h2 key={`h2-${blocks.length}`}>{renderInline(line.replace(/^#\s/, ''))}</h2>);
      return;
    }
    if (/^>\s/.test(line)) {
      flushPara();
      flushList();
      blocks.push(<blockquote key={`q-${blocks.length}`}>{renderInline(line.replace(/^>\s/, ''))}</blockquote>);
      return;
    }
    if (/^---+$/.test(line.trim())) {
      flushPara();
      flushList();
      blocks.push(<hr key={`hr-${blocks.length}`} />);
      return;
    }
    if (/^[-*]\s/.test(line)) {
      flushPara();
      if (!list) list = [];
      list.push(<li key={`li-${list.length}`}>{renderInline(line.replace(/^[-*]\s/, ''))}</li>);
      return;
    }
    flushList();
    para.push(line.trim());
  });

  flushPara();
  flushList();

  return <div className="prose">{blocks}</div>;
}
