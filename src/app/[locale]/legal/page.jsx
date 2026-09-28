import { getTranslations } from 'next-intl/server';
import LegalContent from '@/components/LegalContent';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.legal.meta' });
  return buildMetadata({ locale, path: '/legal', title: t('title'), description: t('description') });
}

export default function LegalPage() {
  return <LegalContent type="legal" />;
}
