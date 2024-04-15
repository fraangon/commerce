import clsx from 'clsx';
import LocationLink from './location-link';

export default function Button({
  classname,
  children,
  disabled = false,
  ...props
}: {
  classname?: string;
  disabled?: boolean;
  children: React.ReactNode;
  href?: string;
  onClick?: any;
}) {
  const Component: any = props.href ? LocationLink : 'button';

  return (
    <Component
      className={clsx(
        'flex w-full items-center justify-center rounded bg-brand-900 px-4 py-3 text-[16px] font-semibold tracking-normal text-brand-100 transition-all',
        disabled ? 'cursor-not-allowed opacity-60 hover:opacity-60' : 'hover:bg-brand-900/90',
        classname
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
}
