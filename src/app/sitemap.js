import { routing } from '@/i18n/routing';
import { absoluteUrl, languageAlternates, urlFor } from '@/lib/seo';
import { APP_LEGAL_DOCS, APPS } from '@/content/app-legal';
import en from '../../messages/en.json';
import tr from '../../messages/tr.json';

const MESSAGES = { en, tr };

// Locale-agnostic paths. Slugs are identical across locales (verified in messages/*.json).
const postDate = (p) => new Date(p.updated || p.date);
const latestPostDate = new Date(Math.max(...en.blogPosts.map(postDate)));

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

// A project's cover and screenshots are localised, so its image list is resolved per locale.
const projectImages = (locale, slug) => {
  const project = (MESSAGES[locale] ?? en).projects.find((p) => p.slug === slug);
  return [project.image, ...(project.webGallery ?? []), ...(project.gallery ?? [])].filter(Boolean).map(absoluteUrl);
};

const dynamicPaths = [
  ...en.projects.map((p) => ({ path: `/case-studies/${p.slug}`, priority: 0.6, changeFrequency: 'monthly', images: (locale) => projectImages(locale, p.slug) })),
  ...en.blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: 'monthly', lastModified: postDate(p), images: p.cover ? [p.cover] : undefined })),
  // The app documents are English only.
  ...APPS.flatMap((app) => Object.keys(APP_LEGAL_DOCS).map((doc) => ({ path: `/${doc}/${app.repo}`, priority: 0.2, changeFrequency: 'yearly', lastModified: new Date(app.updated), locales: [routing.defaultLocale] }))),
];

// lastModified is only emitted where a real date exists; a fake "now" trains crawlers to ignore it.
export default function sitemap() {
  return [...STATIC_PATHS, ...dynamicPaths].flatMap(({ path, priority, changeFrequency, lastModified, images, locales = routing.locales }) =>
    locales.map((locale) => {
      const imageList = typeof images === 'function' ? images(locale) : images;
      return {
        url: urlFor(locale, path),
        ...(lastModified ? { lastModified } : {}),
        changeFrequency,
        priority,
        ...(imageList?.length ? { images: imageList } : {}),
        alternates: { languages: languageAlternates(path, locales) },
      };
    }),
  );
}
