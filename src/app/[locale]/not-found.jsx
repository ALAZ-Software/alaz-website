import { getTranslations } from 'next-intl/server';
import LegalContent from '@/components/LegalContent';

export async function generateMetadata() {
  const t = await getTranslations('legal.notFound.meta');
  return { title: t('title'), description: t('description'), robots: { index: false, follow: true } };
}

export default function NotFound() {
  return <LegalContent type="not-found" />;
}
