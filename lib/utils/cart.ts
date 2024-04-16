import { Location } from 'lib/constants/locations';

export const getCartId = (lang: string | Location) => `cartId:${lang}`;
