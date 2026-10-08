import { getLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { BRAND_ALIASES, LEGAL_NAME, LOGO_URL, SITE_NAME, SITE_URL, SOCIAL_PROFILES, ogImageFor, TAGLINE } from '@/lib/seo';

// Entity graph for ALAZ. Rendered once in the locale layout so every route carries
// the Organization / WebSite identity. Per-page schemas (BlogPosting, FAQPage,
// BreadcrumbList, Service, SoftwareApplication) stack on top via each page's own JSON-LD.
const DESCRIPTIONS = {
  en: 'ALAZ (ALAZ Software) is a small software studio in İzmir and New York, founded in 2026. It designs and builds web applications, iOS and Android apps, and the backend systems, APIs and cloud infrastructure behind them, and ships its own products, Vocabulary and Market Hours.',
  tr: 'ALAZ (ALAZ Yazılım), 2026\'da kurulmuş, İzmir ve New York merkezli küçük bir yazılım stüdyosudur. Web uygulamaları, iOS ve Android uygulamaları ile bunların arkasındaki backend sistemlerini, API\'leri ve bulut altyapısını geliştirir; Vocabulary ve Market Hours adlı kendi ürünlerini yayınlar.',
};

export default async function StructuredData() {
  const locale = await getLocale();

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: BRAND_ALIASES,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', '@id': `${SITE_URL}/#logo`, url: LOGO_URL, contentUrl: LOGO_URL, width: 512, height: 512, caption: SITE_NAME },
    image: ogImageFor({ title: TAGLINE[locale] ?? TAGLINE.en, locale }).url,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.en,
    slogan: TAGLINE[locale] ?? TAGLINE.en,
    areaServed: 'Worldwide',
    foundingDate: '2026',
    // Keep in sync with `contact.offices` in messages/*.json.
    address: [
      { '@type': 'PostalAddress', streetAddress: '1250 Broadway, 36th Floor', addressLocality: 'New York', addressRegion: 'NY', postalCode: '10001', addressCountry: 'US' },
      { '@type': 'PostalAddress', streetAddress: 'Adalet Mah. Manas Blv. No:39, Folkart Towers B Blok Kat 31', addressLocality: 'Bayraklı', addressRegion: 'İzmir', postalCode: '35530', addressCountry: 'TR' },
    ],
    knowsAbout: [
      'Web Application Development',
      'Mobile App Development',
      'iOS Development',
      'Android Development',
      'Flutter',
      'React Native',
      'Next.js',
      'Backend Development',
      'API Integration',
      'Cloud Infrastructure',
      'Web Performance',
    ],
    knowsLanguage: ['en', 'tr'],
    email: 'hello@alaz.pro',
    ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@alaz.pro',
      contactType: 'customer service',
      url: `${SITE_URL}${locale === 'en' ? '' : `/${locale}`}/start-project`,
      availableLanguage: ['English', 'Turkish'],
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: BRAND_ALIASES,
    inLanguage: ['en', 'tr'],
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  );
}
