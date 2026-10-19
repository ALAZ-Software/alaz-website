import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LegalDocument from '@/components/LegalDocument';
import { APP_LEGAL_DOCS, APPS, findApp } from '@/content/app-legal';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

// The privacy policy, terms, account deletion and support pages of each mobile app, at
// /<doc>/<GitHub repo name> (e.g. /privacy/simple-note-flutter). They are what the App Store,
// Google Play, RevenueCat and the apps themselves link to, so each one is a real, server-rendered
// page that names its app. English only: /tr/<doc>/<repo> redirects here (next.config.js).
const ENGLISH = [routing.defaultLocale];

// Every locale lists the apps (Next drops all paths of a route when one parent locale returns none);
// the Turkish URLs never render: next.config.js redirects them and the page 404s without it.
export function appLegalParams() {
  return APPS.map((app) => ({ app: app.repo }));
}

export async function appLegalMetadata(doc, { locale, app: repo }) {
  const app = findApp(repo);
  if (!app) return {};
  const { title, description } = APP_LEGAL_DOCS[doc];
  return buildMetadata({ locale, path: `/${doc}/${app.repo}`, title: `${title} — ${app.name}`, description: description(app.name), eyebrow: app.name, locales: ENGLISH });
}

const formatDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default async function AppLegalPage({ doc, params: { locale, app: repo } }) {
  setRequestLocale(locale);
  const app = findApp(repo);
  if (!app || locale !== routing.defaultLocale) notFound();
  const t = await getTranslations('legal');

  const nav = <nav aria-label={`${app.name} documents`} className="flex flex-wrap gap-x-[28px] gap-y-[10px] t-meta uppercase mb-[var(--s-5)]" data-reveal="fade">
    {Object.entries(APP_LEGAL_DOCS).map(([key, d]) => <Link key={key} href={`/${key}/${app.repo}`} aria-current={key === doc ? 'page' : undefined} className={cn('hover:text-fg', key === doc ? 'text-fg border-b border-ember' : 'text-fg-4')}>{d.title}</Link>)}
  </nav>;

  return (
    <LegalDocument eyebrow={app.name} label={`Last updated: ${formatDate(app.updated)}`} title={APP_LEGAL_DOCS[doc].title} nav={nav} sections={app[doc]} markdown>
      <Link href="/" className="btn-ghost">{t('backToHome')}</Link>
    </LegalDocument>
  );
}
