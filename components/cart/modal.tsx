/* eslint-disable @next/next/no-img-element */
'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Button from 'components/Button';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import { createUrl } from 'lib/utils/general';

import LocationLink from 'components/location-link';
import { Location } from 'lib/constants/locations';
import { Fragment, useEffect, useRef, useState } from 'react';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart, lang }: { cart: Cart | undefined; lang: Location }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-brand-100/50" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-brand-900/5 bg-brand-100/90 p-4 text-brand-900 shadow-md backdrop-blur-md md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-[18px] font-semibold leading-none">Carrito</p>

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-[18px] font-bold leading-none">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchParams = {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      });

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li key={i} className="flex w-full flex-col border-b border-brand-900/10">
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton item={item} lang={lang} />
                            </div>
                            <div className="z-30 flex flex-row space-x-4">
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-brand-900/5 bg-brand-200">
                                <img
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.merchandise.product.featuredImage.altText ||
                                    item.merchandise.product.title
                                  }
                                  src={item.merchandise.product.featuredImage.url}
                                />
                              </div>

                              <div className="flex flex-col justify-start gap-1 py-1">
                                <LocationLink
                                  href={merchandiseUrl}
                                  onClick={closeCart}
                                  className="cursor-pointer text-[16px] font-medium leading-none tracking-tight"
                                  lang={lang}
                                >
                                  {item.merchandise.product.title}
                                </LocationLink>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p className="text-[14px] text-brand-900/80">
                                    {item.merchandise.selectedOptions
                                      .map((option) => `${option.name}: ${option.value}`)
                                      .join(' - ')}
                                  </p>
                                ) : null}
                                <div className="flex h-9 w-fit flex-row items-center rounded border border-brand-900/20">
                                  <EditItemQuantityButton item={item} type="minus" />
                                  <p className="w-6 text-center">
                                    <span className="w-full text-sm font-semibold">
                                      {item.quantity}
                                    </span>
                                  </p>
                                  <EditItemQuantityButton item={item} type="plus" />
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-start justify-start gap-2 py-1">
                              <span className="flex text-[16px] font-medium leading-none tracking-tight text-brand-900">
                                <Price
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                />
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-brand-900">
                    <div className="mb-3 flex items-center justify-between border-b border-brand-900/10 pb-1">
                      <p className="font-medium">Taxes</p>
                      <Price
                        className="text-right text-base"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-brand-900/10 pb-1 pt-1">
                      <p className="font-medium">Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-brand-900/10 pb-1 pt-1">
                      <p className="font-medium">Total</p>
                      <Price
                        className="text-right text-base"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>

                  <Button href={cart.checkoutUrl}>Ir a pagar</Button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
