import { HomeGrid } from 'components/HomeGrid';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'La pilcha mas pituca de la via lactea',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <Suspense>
      <HomeGrid />
      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </Suspense>
  );
}
