'use client';

import clsx from 'clsx';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils/general';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

function VariantButton({
  value,
  option,
  searchParams,
  options,
  pathname,
  combinations,
  router
}: {
  value: string;
  option: ProductOption;
  searchParams: URLSearchParams;
  options: ProductOption[];
  pathname: string;
  combinations: Combination[];
  router: any;
}) {
  const optionNameLowerCase = option.name.toLowerCase();

  // Base option params on current params so we can preserve any other param state in the url.
  const optionSearchParams = new URLSearchParams(searchParams.toString());

  // Update the option params using the current option to reflect how the url *would* change,
  // if the option was clicked.
  optionSearchParams.set(optionNameLowerCase, value);
  const optionUrl = createUrl(pathname, optionSearchParams);

  // In order to determine if an option is available for sale, we need to:
  //
  // 1. Filter out all other param state
  // 2. Filter out invalid options
  // 3. Check if the option combination is available for sale
  //
  // This is the "magic" that will cross check possible variant combinations and preemptively
  // disable combinations that are not available. For example, if the color gray is only available in size medium,
  // then all other sizes should be disabled.
  const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
    options.find((option) => option.name.toLowerCase() === key && option.values.includes(value))
  );
  const isAvailableForSale = combinations.find((combination) =>
    filtered.every(([key, value]) => combination[key] === value && combination.availableForSale)
  );

  // The option is active if it's in the url params.
  const isActive = searchParams.get(optionNameLowerCase) === value;

  return (
    <button
      key={value}
      aria-disabled={!isAvailableForSale}
      disabled={!isAvailableForSale}
      onClick={() => {
        router.replace(optionUrl, { scroll: false });
      }}
      title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
      className={clsx(
        'flex h-7 w-7 min-w-[28px] items-center justify-center rounded border text-[16px] leading-none tracking-tight transition-all',
        {
          'cursor-default border-transparent bg-brand-900 text-brand-100': isActive,
          'bg-transparent text-brand-900 hover:scale-110': !isActive && isAvailableForSale,
          'pointer-events-none  cursor-not-allowed text-brand-900/60 opacity-50':
            !isAvailableForSale
        }
      )}
    >
      {value}
    </button>
  );
}

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return options.map((option) => (
    <dl className="flex flex-col justify-start space-y-2" key={option.id}>
      <dt className="text-[14px] font-normal leading-none tracking-tight">{option.name}</dt>
      <dd className="flex flex-row space-x-1">
        {option.values.map((value) => (
          <VariantButton
            key={value}
            value={value}
            option={option}
            searchParams={searchParams}
            options={options}
            pathname={pathname}
            combinations={combinations}
            router={router}
          />
        ))}
      </dd>
    </dl>
  ));
}
