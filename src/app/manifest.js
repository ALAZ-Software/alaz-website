export default function manifest() {
  return {
    name: 'ALAZ — Software Architecture & Engineering Studio',
    short_name: 'ALAZ',
    description: 'Resilient software architecture, native performance, and connected digital ecosystems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
