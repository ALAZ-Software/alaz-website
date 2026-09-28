import { notFound } from 'next/navigation';

// Any path under a valid locale that doesn't match a real route lands here,
// so it resolves into the locale layout and hits `[locale]/not-found.jsx`
// with the correct language chrome instead of a generic fallback.
export default function CatchAll() {
  notFound();
}
