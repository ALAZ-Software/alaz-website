import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { SITE_NAME, TAGLINE } from '@/lib/seo';

// Branded 1200x630 share card: /og?title=…&eyebrow=…&locale=en
// Uses the same Archivo Black cut as the wordmark so the card matches the site.
export const runtime = 'nodejs';
export const revalidate = 86400;

let fontData;
async function archivoBlack() {
  if (!fontData) fontData = await readFile(path.join(process.cwd(), 'brand', 'logo', 'Archivo-Black.ttf'));
  return fontData;
}

const clean = (value, max) => (value ?? '').toString().replace(/\s+/g, ' ').trim().slice(0, max);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') === 'tr' ? 'tr' : 'en';
  const title = clean(searchParams.get('title'), 120) || TAGLINE[locale];
  const eyebrow = clean(searchParams.get('eyebrow'), 60);
  const font = await archivoBlack();
  const size = title.length > 70 ? 54 : title.length > 40 ? 68 : 84;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0a0a0a', color: '#fff', padding: '64px 72px', fontFamily: 'Archivo' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26, letterSpacing: 2, color: '#9fa3a9' }}>
          <span>{eyebrow || 'alaz.pro'}</span>
          <span>{TAGLINE[locale].toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', fontSize: size, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontSize: 96, lineHeight: 0.8, letterSpacing: -2 }}>
            {SITE_NAME}
            <span style={{ color: '#858585' }}>.</span>
          </div>
          <span style={{ fontSize: 26, letterSpacing: 2, color: '#9fa3a9' }}>İZMİR · NEW YORK</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: 'Archivo', data: font, weight: 900, style: 'normal' }] },
  );
}
