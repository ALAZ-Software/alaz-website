import { SITE_URL } from '@/lib/seo';

// A bot-specific group replaces the "*" group for that bot, so every group repeats its rules.
const BOTS = ['*', 'Googlebot', 'Bingbot', 'YandexBot', 'Slurp', 'DuckDuckBot', 'Applebot'];

export default function robots() {
  return {
    rules: BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
