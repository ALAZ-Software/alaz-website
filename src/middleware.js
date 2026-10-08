import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = typeof createMiddleware === 'function' ? createMiddleware : createMiddleware.default;

export default intlMiddleware(routing);

export const config = {
  matcher: ['/((?!api|og|_next|_vercel|.*\\..*).*)'],
};
