import { routing } from '@/i18n/routing';
import { languageAlternates, urlFor } from '@/lib/seo';
import en from '../../messages/en.json';

// Locale-agnostic paths. Slugs are identical across locales (verified in messages/*.json).
const latestPostDate = new Date(Math.max(...en.blogPosts.map((p) => new Date(p.date))));

const STATIC_PATHS = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly', lastModified: latestPostDate },
  { path: '/start-project', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/legal', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
];

const dynamicPaths = [
  ...en.projects.map((p) => ({ path: `/case-studies/${p.slug}`, priority: 0.6, changeFrequency: 'monthly', images: p.image ? [p.image] : undefined })),
  ...en.blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date(p.date), images: p.cover ? [p.cover] : undefined })),
];

// lastModified is only emitted where a real date exists; a fake "now" trains crawlers to ignore it.
export default function sitemap() {
  return [...STATIC_PATHS, ...dynamicPaths].flatMap(({ path, priority, changeFrequency, lastModified, images }) =>
    routing.locales.map((locale) => ({
      url: urlFor(locale, path),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency,
      priority,
      ...(images ? { images } : {}),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
