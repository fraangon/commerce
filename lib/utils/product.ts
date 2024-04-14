import { Product } from 'lib/shopify/types';

export const getProductJsonLd = (product: Product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.featuredImage.url,
  offers: {
    '@type': 'AggregateOffer',
    availability: product.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    priceCurrency: product.priceRange.minVariantPrice.currencyCode,
    highPrice: product.priceRange.maxVariantPrice.amount,
    lowPrice: product.priceRange.minVariantPrice.amount
  }
});
