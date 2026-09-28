// Entity graph for ALAZ. Rendered once at the app root so every route carries
// the Organization / WebSite / SoftwareApplication identity. Per-page schemas
// (e.g. BlogPosting) stack on top via each page's own JSON-LD script.
const ORG_URL = 'https://alaz.pro';
const LOGO = 'https://images.hostinger.com/2aa88bd7-319c-4104-9497-307e490b6d51.png';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORG_URL}/#organization`,
  name: 'ALAZ',
  url: ORG_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO,
    width: 1200,
    height: 630,
  },
  image: LOGO,
  description:
    'ALAZ is an independent software architecture and high-performance web engineering studio. We build resilient systems, native performance, and connected digital ecosystems.',
  founder: { '@type': 'Person', name: 'ALAZ Team' },
  areaServed: 'Global',
  email: 'hello@alaz.pro',
  sameAs: [
    'https://www.linkedin.com/company/alaz-pro',
    'https://github.com/alaz-pro',
    'https://x.com/alaz_pro',
    'https://www.crunchbase.com/organization/alaz',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@alaz.pro',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${ORG_URL}/#website`,
  url: ORG_URL,
  name: 'ALAZ',
  inLanguage: 'en',
  publisher: { '@id': `${ORG_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${ORG_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ALAZ Engineering Services',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  url: ORG_URL,
  description:
    'High-performance web engineering and software architecture services: resilient system design, native performance optimization, and connected digital ecosystems.',
  provider: { '@id': `${ORG_URL}/#organization` },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};

export default function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }} />
    </>
  );
}
