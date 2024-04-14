'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function Button({
  classname,
  children,
  disabled,
  ...props
}: {
  classname?: string;
  disabled: boolean;
  children: React.ReactNode;
  onClick?: any;
}) {
  return (
    <button
      className={clsx(
        'flex w-full items-center justify-center rounded bg-brand-900 px-4 py-3 text-[16px] font-semibold tracking-normal text-brand-100 transition-all',
        disabled ? 'cursor-not-allowed opacity-60 hover:opacity-60' : 'hover:bg-brand-900/90',
        classname
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();

  if (!availableForSale) {
    return (
      <Button disabled aria-disabled>
        Out Of Stock
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button aria-label="Please select an option" aria-disabled disabled>
        Add To Cart
      </Button>
    );
  }

  return (
    <Button
      disabled={pending}
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
    >
      Add To Cart
    </Button>
  );
}

export function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant} className="w-full">
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
