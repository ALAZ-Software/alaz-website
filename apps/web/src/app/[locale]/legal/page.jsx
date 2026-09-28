import { getTranslations } from 'next-intl/server';
import LegalContent from '@/components/LegalContent';

export async function generateMetadata() {
  const t = await getTranslations('legal.legal.meta');
  return { title: t('title'), description: t('description') };
}

export default function LegalPage() {
  return <LegalContent type="legal" />;
}
