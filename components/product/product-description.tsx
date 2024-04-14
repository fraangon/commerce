import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="flex aspect-square w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-xs flex-col items-start justify-start space-y-8">
          <h1 className="text-[24px] font-medium leading-none tracking-tight">{product.title}</h1>

          <span className="text-[18px] font-medium leading-none tracking-tight">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              className=""
            />
          </span>

          <VariantSelector options={product.options} variants={product.variants} />

          {product.descriptionHtml ? (
            <Prose
              className="mb-6 text-sm leading-tight dark:text-white/[60%]"
              html={product.descriptionHtml}
            />
          ) : null}

          <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
        </div>
      </div>
    </>
  );
}
