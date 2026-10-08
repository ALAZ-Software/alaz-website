import { getLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { BRAND_ALIASES, LEGAL_NAME, LOGO_URL, OG_IMAGE, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from '@/lib/seo';

// Entity graph for ALAZ. Rendered once in the locale layout so every route carries
// the Organization / WebSite identity. Per-page schemas (BlogPosting, FAQPage,
// BreadcrumbList, Service) stack on top via each page's own JSON-LD.
const DESCRIPTIONS = {
  en: 'ALAZ (ALAZ Software) is an independent software studio that builds web applications, iOS and Android apps, and the backend systems, APIs and cloud infrastructure behind them.',
  tr: 'ALAZ (ALAZ Yazılım), web uygulamaları, iOS ve Android mobil uygulamalar ile bunların arkasındaki backend sistemlerini, API entegrasyonlarını ve bulut altyapısını geliştiren bağımsız bir yazılım stüdyosudur.',
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
    image: OG_IMAGE.url,
    description: DESCRIPTIONS[locale] ?? DESCRIPTIONS.en,
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
      'Backend Development',
      'API Integration',
      'Cloud Infrastructure',
      'Software Architecture',
      'Web Performance',
    ],
    knowsLanguage: ['en', 'tr'],
    email: 'hello@alaz.pro',
    sameAs: SOCIAL_PROFILES,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@alaz.pro',
      contactType: 'sales',
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
