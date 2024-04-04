import { GridTileImage } from 'components/grid/tile';
import { getProducts } from 'lib/shopify';
import Link from 'next/link';

export async function HomeGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const products = await getCollectionProducts({ collection: 'homepage' });
  const products = await getProducts({ sortKey: 'CREATED_AT', reverse: true });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex flex-row flex-wrap gap-4">
        {products.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
