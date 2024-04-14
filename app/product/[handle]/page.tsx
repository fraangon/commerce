import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Footer from 'components/layout/footer';
import { ProductDescription } from 'components/product/product-description';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import { getProductJsonLd } from 'lib/utils/product';
import Image from 'next/image';

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

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const mainImage: any = product.images[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductJsonLd(product))
        }}
      />
      <div className="flex w-full max-w-default flex-row space-x-4 px-4">
        <div className="flex aspect-square h-full w-full cursor-pointer justify-center rounded bg-brand-200">
          <Image
            src={mainImage.url}
            alt={mainImage.altText}
            width={mainImage.width}
            height={mainImage.height}
            className="aspect-square h-full w-full object-cover"
          />
        </div>
        <ProductDescription product={product} />
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
