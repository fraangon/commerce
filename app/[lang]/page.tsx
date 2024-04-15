import { HomeGrid } from 'components/HomeGrid';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'La pilcha mas pituca de la via lactea',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage({ params: { lang } }: { params: { lang: string } }) {
  console.log('Home page', lang);
  return (
    <Suspense>
      <HomeGrid />
      <Suspense>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
