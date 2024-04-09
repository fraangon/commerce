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

const IBMPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin']
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={IBMPlexSans.className}>
      <body className="flex flex-col justify-center bg-brand-100 text-brand-900">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col justify-start">
          <Navbar />
          <Suspense>
            <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center">
              {children}
            </main>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
