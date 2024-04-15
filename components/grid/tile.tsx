/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  label,
  isAvailable,
  alt,
  ...props
}: {
  isAvailable?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-fit w-full flex-1 flex-col items-center justify-center space-y-3',
        !isAvailable && 'transition-opacity hover:opacity-50'
      )}
    >
      {props.src ? (
        <div
          className={clsx(
            'flex h-full w-full flex-col items-start justify-start rounded bg-brand-200 p-2',
            isAvailable && 'transition-all hover:-translate-y-1 hover:shadow-sm'
          )}
        >
          {!isAvailable && (
            <div className="relative inset-0 left-11 top-4 flex h-0 w-0 items-center justify-center">
              <p className="absolute h-fit w-fit rounded-sm bg-brand-100 px-2 py-1 text-[12px] font-semibold uppercase leading-none tracking-wide text-brand-900">
                Agotado
              </p>
            </div>
          )}
          <img
            className="aspect-square h-full w-full object-contain"
            alt={alt || label?.title}
            {...(props as any)}
          />
        </div>
      ) : null}

      {label ? (
        <Label title={label.title} amount={label.amount} currencyCode={label.currencyCode} />
      ) : null}
    </div>
  );
}
