'use client';

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';
import { motionBus } from '@/components/Motion';

const nav = createNavigation(routing);

export const { usePathname, useRouter, redirect, getPathname } = nav;

// The site's Link: an ordinary next-intl link that lets the page-transition curtain
// close before the route changes. Modifier clicks, hashes and new tabs behave natively.
export function Link({ href, onClick, locale, ...rest }) {
  const router = nav.useRouter();
  const pathname = nav.usePathname();
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const target = typeof href === 'string' ? href : href?.pathname;
    if (!target || !target.startsWith('/') || target.startsWith('/#')) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || rest.target === '_blank') return;
    if (!motionBus.closeCurtain) return;
    if (target === pathname && !locale) { event.preventDefault(); motionBus.lenis ? motionBus.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    event.preventDefault();
    motionBus.closeCurtain(() => router.push(href, locale ? { locale } : undefined));
  };
  return <nav.Link href={href} locale={locale} onClick={handleClick} {...rest} />;
}
