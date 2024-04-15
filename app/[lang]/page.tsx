import { HomeGrid } from 'components/home-grid';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'La pilcha mas pituca de la via lactea',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage({ params: { lang } }) {
  return (
    <Suspense>
      <HomeGrid lang={lang} />
      <Suspense>
        <Footer />
      </Suspense>
    </Suspense>
  );
}
