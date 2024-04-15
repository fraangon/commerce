import { HomeGrid } from 'components/home-grid';
import Footer from 'components/layout/footer';
import { Location } from 'lib/constants/locations';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'La pilcha mas pituca de la via lactea',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage({ params: { lang } }: { params: { lang: Location } }) {
  return (
    <Suspense>
      <HomeGrid lang={lang} />
      <Suspense>
        <Footer lang={lang} />
      </Suspense>
    </Suspense>
  );
}
