'use client';

// Last-resort boundary for errors thrown by the root layout itself.
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '120px 24px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: '.06em', color: '#767a80' }}>ALAZ</p>
        <h1 style={{ fontSize: 48, lineHeight: 1, margin: '24px 0' }}>Something broke.</h1>
        <p style={{ color: '#9a9ea4', maxWidth: 520 }}>Our side, not yours. Try again, or write to hello@alaz.pro.</p>
        <button type="button" onClick={reset} style={{ marginTop: 32, background: '#fff', color: '#0a0a0a', border: 0, padding: '18px 24px', fontWeight: 800, cursor: 'pointer' }}>Try again</button>
      </body>
    </html>
  );
}
