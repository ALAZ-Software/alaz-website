import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // No Accept-Language redirect: crawlers and shared links always land on the URL they asked for.
  // Visitors switch language with the header toggle; hreflang tells search engines about the pair.
  localeDetection: false,
  // hreflang is already in the HTML; the Link header would be built from the request host.
  alternateLinks: false,
});
