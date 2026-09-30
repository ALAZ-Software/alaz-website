import { SITE_URL } from '@/lib/seo';

// A bot-specific group replaces the "*" group for that bot, so every group repeats its rules.
const SEARCH_BOTS = ['*', 'Googlebot', 'Bingbot', 'YandexBot', 'Slurp', 'DuckDuckBot', 'Applebot'];
// AI crawlers and assistants. Listed explicitly so the intent is on record, not left to the "*" default.
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];
const BOTS = [...SEARCH_BOTS, ...AI_BOTS];

export default function robots() {
  return {
    rules: BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: ['/api/'] })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
