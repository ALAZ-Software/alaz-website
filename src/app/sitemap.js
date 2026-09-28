import { routing } from '@/i18n/routing';
import { languageAlternates, urlFor } from '@/lib/seo';
import en from '../../messages/en.json';

// Locale-agnostic paths. Slugs are identical across locales (verified in messages/*.json).
const STATIC_PATHS = [
  { path: '', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/case-studies', priority: 0.8 },
  { path: '/about', priority: 0.7 },
  { path: '/blog', priority: 0.7 },
  { path: '/start-project', priority: 0.6 },
  { path: '/legal', priority: 0.2 },
  { path: '/privacy', priority: 0.2 },
];

const dynamicPaths = [
  ...en.projects.map((p) => ({ path: `/case-studies/${p.slug}`, priority: 0.6 })),
  ...en.blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, lastModified: new Date(p.date) })),
];

// lastModified is only emitted where a real date exists; a fake "now" trains crawlers to ignore it.
export default function sitemap() {
  return [...STATIC_PATHS, ...dynamicPaths].flatMap(({ path, priority, lastModified }) =>
    routing.locales.map((locale) => ({
      url: urlFor(locale, path),
      ...(lastModified ? { lastModified } : {}),
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
