import { getTranslations } from 'next-intl/server';
import IntakeForm from '@/components/IntakeForm';

export async function generateMetadata() {
  const t = await getTranslations('intake.meta');
  return { title: t('title'), description: t('description') };
}

export default function StartProjectPage() {
  return <IntakeForm />;
}
