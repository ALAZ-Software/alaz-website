'use client';

import { useEffect } from 'react';

// Branded error boundary: the site never falls back to the framework's white screen.
export default function LocaleError({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="shell min-h-[70vh] pt-[calc(var(--header-h)+60px)] pb-[120px]">
      <p className="t-meta uppercase text-fg-4 eyebrow">Something broke</p>
      <h1 className="t-display-2 uppercase mt-[60px] mb-[30px]">This page<br />hit an error<span className="dot">.</span></h1>
      <p className="t-lead text-fg-3 max-w-[560px]">Our side, not yours. Try again, or write to <a href="mailto:hello@alaz.pro" className="text-fg underline underline-offset-4">hello@alaz.pro</a> if it keeps happening.</p>
      <button type="button" onClick={reset} className="btn mt-[40px]">Try again</button>
    </main>
  );
}
