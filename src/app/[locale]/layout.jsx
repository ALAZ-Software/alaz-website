import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import Motion from '@/components/Motion';
import { DEFAULT_TITLE, SITE_NAME, SITE_URL, TITLE_TEMPLATE } from '@/lib/seo';
import '../globals.css';

// latin-ext carries the Turkish glyphs (İ, ı, Ğ, ğ, Ş, ş); without it they fall back to a system font.
const archivo = Archivo({ subsets: ['latin', 'latin-ext'], weight: ['700', '900'], variable: '--font-archivo', display: 'swap' });
const inter = Inter({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '700'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'latin-ext'], weight: ['400', '500'], variable: '--font-jetbrains-mono', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Set these in the hosting environment (see .env.example); unset values emit no tag.
const bing = process.env.BING_SITE_VERIFICATION;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE.en, template: TITLE_TEMPLATE },
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    ...(bing ? { other: { 'msvalidate.01': bing } } : {}),
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  // Lets every route below render statically (no per-request header lookup for the locale).
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-ready');try{if(!sessionStorage.getItem('alaz-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('intro')}catch(e){}" }} />
        <link rel="preconnect" href="https://images.hostinger.com" />
        <link rel="dns-prefetch" href="https://images.hostinger.com" />
      </head>
      <body id="top">
        <NextIntlClientProvider messages={messages}>
          <Motion />
          <StructuredData />
          <a href="#main" className="skip-link">Skip to content</a>
          <Header />
          {children}
          <Footer />
          <div className="curtain" aria-hidden="true"><span className="curtain-mark"><span>ALAZ<span className="dot">.</span></span></span></div>
          <div className="cursor" aria-hidden="true"><span className="cursor-label" /></div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
