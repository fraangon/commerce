'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { removeItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { Location } from 'lib/constants/locations';
import type { CartItem } from 'lib/shopify/types';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full border border-brand-900/20 bg-brand-100 text-brand-900 transition-all duration-200',
        {
          'cursor-not-allowed px-0': pending
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-brand-900" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-brand-900" />
      )}
    </button>
  );
}

export function DeleteItemButton({ lang, item }: { lang: Location; item: CartItem }) {
  const [message, formAction] = useFormState(
    (prevState: any, lineId: any) => removeItem(prevState, lineId, lang as any),
    null
  );
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
