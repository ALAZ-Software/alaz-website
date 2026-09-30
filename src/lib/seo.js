import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://alaz.pro';
export const SITE_NAME = 'ALAZ';
export const ORG_ID = `${SITE_URL}/#organization`;
export const LEGAL_NAME = 'ALAZ Software';
export const BRAND_ALIASES = ['ALAZ SOFTWARE', 'ALAZ Software', 'alaz.pro'];
export const TWITTER_HANDLE = '@alaz_pro';

// Assets live in /public so crawlers never depend on a third-party host.
// logo.png is square (512x512): Google requires >=112x112 and a crawlable, stable URL.
export const LOGO_URL = `${SITE_URL}/logo.png`;
export const OG_IMAGE = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ALAZ — Software & High-Performance Web Engineering' };

export const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/alaz-pro',
  'https://github.com/alaz-pro',
  'https://x.com/alaz_pro',
];

const OG_LOCALES = { en: 'en_US', tr: 'tr_TR' };

export const ogLocale = (locale) => OG_LOCALES[locale] ?? OG_LOCALES[routing.defaultLocale];

// `path` is locale-agnostic and starts with "/" (or is "" for the home page).
// The default locale has no prefix (localePrefix: 'as-needed').
export function urlFor(locale, path = '') {
  const clean = path === '/' ? '' : path;
  if (locale === routing.defaultLocale) return `${SITE_URL}${clean}` || SITE_URL;
  return `${SITE_URL}/${locale}${clean}`;
}

export function languageAlternates(path = '') {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, urlFor(l, path)]));
  languages['x-default'] = urlFor(routing.defaultLocale, path);
  return languages;
}

export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  keywords,
  image = OG_IMAGE,
  type = 'website',
  robots,
  extraOpenGraph = {},
}) {
  const url = urlFor(locale, path);
  const images = [image];
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(robots ? { robots } : {}),
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: ogLocale(locale),
      alternateLocale: routing.locales.filter((l) => l !== locale).map(ogLocale),
      images,
      ...extraOpenGraph,
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}
