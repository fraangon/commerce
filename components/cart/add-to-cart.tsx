'use client';

import Button from 'components/Button';
import { addItem } from 'components/cart/actions';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

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
        Sin Stock
      </Button>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button aria-label="Please select an option" aria-disabled disabled>
        Agregar al carrito
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
      {pending ? 'Agregando...' : 'Agregar al carrito'}
    </Button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  lang
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  lang: string;
}) {
  const [message, formAction] = useFormState(
    (prevState: any, selectedVariantId: any) => addItem(prevState, selectedVariantId, lang as any),
    null
  );
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
