import { GridTileImage } from 'components/grid/tile';
import LocationLink from 'components/location-link';
import { Location } from 'lib/constants/locations';
import { getProducts } from 'lib/shopify';
import { getProductsForRow, isProductAvailable } from './utils';

export async function HomeGrid({ lang }: { lang: Location }) {
  const products = await getProducts({ sortKey: 'CREATED_AT', reverse: true, location: lang });

  if (!products?.length) return null;

  return (
    <div className="w-full overflow-x-auto px-4 pb-20 pt-20">
      <ul className="flex w-full flex-row flex-wrap gap-4">
        {getProductsForRow(products, 2).map((row: any, indexRow: number) => (
          <li key={indexRow} className="flex w-full flex-row gap-4">
            {row.map((product: any, indexProduct: number) => (
              <LocationLink
                key={`${product.handle}${indexProduct}`}
                href={`/product/${product.handle}`}
                className="h-fit w-full"
                lang={lang}
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
              </LocationLink>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
