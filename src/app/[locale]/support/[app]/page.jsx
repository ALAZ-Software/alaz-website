import AppLegalPage, { appLegalMetadata, appLegalParams } from '@/components/AppLegalPage';

export const dynamicParams = false;
export const generateStaticParams = appLegalParams;

export async function generateMetadata({ params }) {
  return appLegalMetadata('support', await params);
}

export default async function Page({ params }) {
  return <AppLegalPage doc="support" params={await params} />;
}
