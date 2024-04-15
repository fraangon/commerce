import { SHOPIFY_GRAPHQL_API_ENDPOINT } from 'lib/constants';
import { ensureStartsWith } from 'lib/utils/general';

const domainGlobal = process.env.SHOPIFY_STORE_DOMAIN_GLOBAL
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN_GLOBAL, 'https://')
  : '';
const endpointGlobal = `${domainGlobal}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const keyGlobal = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN_GLOBAL!;

const domainAr = process.env.SHOPIFY_STORE_DOMAIN_AR
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN_AR, 'https://')
  : '';
const endpointAr = `${domainAr}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const keyAr = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN_AR!;

export const endpointConfig = {
  g: { endpoint: endpointGlobal, key: keyGlobal, domain: domainGlobal },
  ar: { endpoint: endpointAr, key: keyAr, domain: domainAr }
};
