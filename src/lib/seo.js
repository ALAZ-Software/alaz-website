import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://alaz.pro';
export const SITE_NAME = 'ALAZ';
export const ORG_ID = `${SITE_URL}/#organization`;
export const LEGAL_NAME = 'ALAZ Software';
// One sentence that every surface (title, OG, manifest, schema, llms.txt) agrees on.
export const TAGLINE = { en: 'Web, Mobile & Backend Software Studio', tr: 'Web, Mobil ve Backend Yazılım Stüdyosu' };
export const DEFAULT_TITLE = { en: `${SITE_NAME} — ${TAGLINE.en}`, tr: `${SITE_NAME} — ${TAGLINE.tr}` };
// Appended to every page title except the home page: "Services | ALAZ".
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

// Local images are stored as site paths ("/projects/…"); crawlers and structured data need absolute URLs.
export const absoluteUrl = (src) => (src.startsWith('/') ? `${SITE_URL}${src}` : src);
export const BRAND_ALIASES = ['ALAZ SOFTWARE', 'ALAZ Software', 'alaz.pro'];

// Assets live in /public so crawlers never depend on a third-party host.
// logo.png is square (512x512): Google requires >=112x112 and a crawlable, stable URL.
export const LOGO_URL = `${SITE_URL}/logo.png`;

// Social profiles go into Organization.sameAs. Add them only once they exist and carry the ALAZ name.
export const SOCIAL_PROFILES = [];

const OG_LOCALES = { en: 'en_US', tr: 'tr_TR' };

export const ogLocale = (locale) => OG_LOCALES[locale] ?? OG_LOCALES[routing.defaultLocale];

// Share cards are rendered on demand by /og (see src/app/og/route.jsx) from the page title,
// so every route gets a branded 1200x630 card instead of one static image.
export function ogImageFor({ title, eyebrow = '', locale = routing.defaultLocale, alt }) {
  const params = new URLSearchParams({ title, eyebrow, locale });
  return { url: `${SITE_URL}/og?${params.toString()}`, width: 1200, height: 630, alt: alt ?? title };
}

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

// `title` is the bare page title; the layout's title.template adds " | ALAZ" to the document title.
// `absoluteTitle: true` skips the template (home page, whose title already carries the brand).
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  image,
  eyebrow = '',
  absoluteTitle = false,
  type = 'website',
  robots,
  extraOpenGraph = {},
}) {
  const url = urlFor(locale, path);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const images = [image ?? ogImageFor({ title, eyebrow, locale })];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(robots ? { robots } : {}),
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: ogLocale(locale),
      alternateLocale: routing.locales.filter((l) => l !== locale).map(ogLocale),
      images,
      ...extraOpenGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((i) => ({ url: i.url, alt: i.alt })),
    },
  };
}
