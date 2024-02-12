import Navbar from 'components/layout/navbar';
import { IBM_Plex_Sans } from 'next/font/google';

import { ReactNode, Suspense } from 'react';
import './globals.css';

const SITE_NAME = 'Keyframe';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const IBMPlexSans = IBM_Plex_Sans({
    weight: ['100', '200', '300', '400', '500', '600', '700']
  });
  return (
    <html lang="en" className={IBMPlexSans.className}>
      <body className="bg-neutral-50 text-black selection:bg-sky-300 ">
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
