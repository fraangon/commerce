import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Footer from 'components/layout/footer';
import { ProductDescription } from 'components/product/product-description';
import ProductImages from 'components/product/product-images';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { Location } from 'lib/constants/locations';
import { getProduct } from 'lib/shopify';
import { getProductJsonLd } from 'lib/utils/product';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({
  params: { handle, lang }
}: {
  params: { handle: string; lang: Location };
}) {
  const product = await getProduct(handle);

  if (!product) return notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductJsonLd(product))
        }}
      />
      <div className="flex w-full max-w-default flex-row space-x-4 px-4 pb-20">
        <ProductImages images={product.images} />
        <ProductDescription product={product} />
      </div>
      <Suspense>
        <Footer lang={lang} />
      </Suspense>
    </>
  );
}
