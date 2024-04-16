'use server';

import { TAGS } from 'lib/constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { getCartId } from 'lib/utils/cart';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(prevState: any, selectedVariantId: string | undefined, lang: string) {
  let cartId = cookies().get(getCartId(lang))?.value;
  let cart;
  console.log('Step 1:addItem', cartId);

  if (cartId) {
    cart = await getCart(cartId, lang as any);
  }

  console.log('Step 2:addItem', cartId, cart);

  if (!cartId || !cart) {
    console.log('Step 2.1:!cartId || !cart', cartId, cart);
    cart = await createCart(lang as any);
    cartId = cart.id;
    cookies().set(getCartId(lang), cartId);
  }

  console.log('Step 3:addItem', cartId);

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  console.log('Step 4:addItem', cartId, selectedVariantId);

  try {
    console.log('Step 5:addItem', cartId, selectedVariantId, lang);
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }], lang as any);
    revalidateTag(TAGS.cart);
  } catch (e) {
    console.log('Step 6:addItem', cartId);
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, lineId: string, lang: Location) {
  const cartId = cookies().get(getCartId(lang as any))?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  },
  lang: Location
) {
  const cartId = cookies().get(getCartId(lang as any))?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error updating item quantity';
  }
}
