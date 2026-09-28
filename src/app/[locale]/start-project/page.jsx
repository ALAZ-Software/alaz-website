import { getTranslations } from 'next-intl/server';
import IntakeForm from '@/components/IntakeForm';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'intake.meta' });
  return buildMetadata({ locale, path: '/start-project', title: t('title'), description: t('description') });
}

export default function StartProjectPage() {
  return <IntakeForm />;
}
