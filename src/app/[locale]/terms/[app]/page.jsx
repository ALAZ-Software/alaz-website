import AppLegalPage, { appLegalMetadata, appLegalParams } from '@/components/AppLegalPage';

export const dynamicParams = false;
export const generateStaticParams = appLegalParams;

export async function generateMetadata({ params }) {
  return appLegalMetadata('terms', await params);
}

export default async function Page({ params }) {
  return <AppLegalPage doc="terms" params={await params} />;
}
