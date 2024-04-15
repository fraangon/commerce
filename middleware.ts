import { NextRequest, NextResponse } from 'next/server';

const locales = ['ar', 'intl'];

function getLocale(request: NextRequest): string {
  const geo = request.geo?.country?.toUpperCase() || 'INTL';

  return geo === 'AR' ? 'ar' : 'intl';
}

function extractLangFromUrl(href: string) {
  const urlObject = new URL(href);
  const segments = urlObject.pathname.split('/').filter(Boolean);
  const lang = segments.length > 0 ? segments[0] : null;

  return lang;
}

export function middleware(request: NextRequest) {
  const { href } = request.nextUrl;

  console.log('request.nextUrl', request.nextUrl);
  const lang = extractLangFromUrl(href);

  const pathnameHasLocale = locales.some((locale) => locale === lang);
  console.log('pathnameHasLocale', pathnameHasLocale, lang);

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
