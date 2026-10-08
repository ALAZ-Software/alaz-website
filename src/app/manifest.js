import { DEFAULT_TITLE, SITE_NAME } from '@/lib/seo';

export default function manifest() {
  return {
    id: '/',
    name: DEFAULT_TITLE.en,
    short_name: SITE_NAME,
    description: 'ALAZ designs and builds web applications, iOS and Android apps and the backends behind them, from İzmir and New York.',
    lang: 'en',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
}
