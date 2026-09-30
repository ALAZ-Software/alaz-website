import { getTranslations } from 'next-intl/server';
import IntakeForm from '@/components/IntakeForm';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { buildMetadata, urlFor } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'intake.meta' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return buildMetadata({ locale, path: '/start-project', title: t('title'), description: t('description'), keywords: tSeo.raw('keywords.startProject') });
}

export default async function StartProjectPage({ params }) {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: tSeo('breadcrumbHome'), url: urlFor(locale) }, { name: tSeo('startProject'), url: urlFor(locale, '/start-project') }]} />
      <IntakeForm />
    </>
  );
}
