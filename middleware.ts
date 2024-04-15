import { NextRequest, NextResponse } from 'next/server';

const locales = ['ar', 'g'];
const defaultLocale = 'ar';

const getLocale = (request: NextRequest) => {
  const country = request.geo?.country;
  if (country !== 'AR') return 'g';
  return defaultLocale;
};

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next).*)']
};
