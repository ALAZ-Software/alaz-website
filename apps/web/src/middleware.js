import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 renamed the `middleware` file convention to `proxy`, but that
// rename isn't picked up yet in this exact Next/next-intl combo, so this
// still uses the `middleware` name (fully supported, just deprecated). It
// must live next to `app/` — since this project uses `src/app`, that means
// `src/middleware.js`, not the package root.
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
