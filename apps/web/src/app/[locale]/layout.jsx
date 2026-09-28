import { NextIntlClientProvider } from 'next-intl';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import '../globals.css';

const archivo = Archivo({ subsets: ['latin'], weight: ['600', '700', '900'], variable: '--font-archivo', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains-mono', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL('https://alaz.pro'),
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <StructuredData />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
