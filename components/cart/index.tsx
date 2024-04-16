import { Location } from 'lib/constants/locations';
import { getCart } from 'lib/shopify';
import { getCartId } from 'lib/utils/cart';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart({ lang }: { lang: Location }) {
  const cartId = cookies().get(getCartId(lang))?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId, lang);
  }

  return <CartModal cart={cart} lang={lang} />;
}
