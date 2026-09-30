import { getLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { BRAND_ALIASES, LEGAL_NAME, LOGO_URL, OG_IMAGE, SITE_NAME, SITE_URL, SOCIAL_PROFILES } from '@/lib/seo';

// Entity graph for ALAZ. Rendered once in the locale layout so every route carries
// the Organization / WebSite identity. Per-page schemas (BlogPosting, FAQPage,
// BreadcrumbList, Service) stack on top via each page's own JSON-LD.
const DESCRIPTIONS = {
  en: 'ALAZ (ALAZ Yazılım) is an independent software architecture and high-performance web engineering studio. We build resilient systems, native performance, and connected digital ecosystems.',
  tr: 'ALAZ (ALAZ Yazılım), bağımsız bir yazılım mimarisi ve yüksek performanslı web mühendisliği stüdyosudur. Dayanıklı sistemler, yüksek performans ve birbirine bağlı dijital ekosistemler geliştiririz.',
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
    knowsAbout: [
      'Software Architecture',
      'High-Performance Web Engineering',
      'Full-Stack Development',
      'Cloud Infrastructure',
      'Next.js',
      'System Design',
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
