import { SITE_URL } from '@/lib/seo';

// Escaping "<" keeps CMS/translation strings from closing the script tag early.
const serialize = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />;
}

// items: [{ q, a }] already resolved for the active locale.
export function FaqJsonLd({ items }) {
  if (!items?.length) return null;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }}
    />
  );
}

// crumbs: [{ name, url }] in order, last item is the current page.
export function BreadcrumbJsonLd({ crumbs }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: c.url.startsWith('http') ? c.url : `${SITE_URL}${c.url}`,
        })),
      }}
    />
  );
}
