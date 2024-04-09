import { GridTileImage } from 'components/grid/tile';
import { getProducts } from 'lib/shopify';
import Link from 'next/link';
import { getProductsForRow, isProductAvailable } from './utils';

export async function HomeGrid() {
  const products = await getProducts({ sortKey: 'CREATED_AT', reverse: true });

  if (!products?.length) return null;

  return (
    <div className="w-full overflow-x-auto px-4 pb-6 pt-1">
      <ul className="flex w-full flex-row flex-wrap gap-4">
        {getProductsForRow(products, 2).map((row: any, indexRow: number) => (
          <li key={indexRow} className="flex w-full flex-row gap-4">
            {row.map((product: any, indexProduct: number) => (
              <Link
                key={`${product.handle}${indexProduct}`}
                href={`/product/${product.handle}`}
                className="h-fit w-full"
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode
                  }}
                  isAvailable={isProductAvailable(product)}
                  src={product.featuredImage?.url}
                />
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
