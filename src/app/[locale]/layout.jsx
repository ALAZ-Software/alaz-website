import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import NextTopLoader from 'nextjs-toploader';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import '../globals.css';

const archivo = Archivo({ subsets: ['latin'], weight: ['600', '700', '900'], variable: '--font-archivo', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains-mono', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Set these in the hosting environment (see .env.example); unset values emit no tag.
const bing = process.env.BING_SITE_VERIFICATION;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
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
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <NextTopLoader
          color="#ffffff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 24px 4px #ffffff, 0 0 12px 2px #ffffff, 0 0 6px 1px #ffffff"
          zIndex={99999}
        />
        <NextIntlClientProvider messages={messages}>
          <StructuredData />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
