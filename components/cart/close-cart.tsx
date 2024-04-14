import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-brand-900/[0.07] bg-brand-900/5 text-brand-900 transition-colors">
      <XMarkIcon
        className={clsx('h-6 transition-all ease-in-out group-hover:scale-110 ', className)}
      />
    </div>
  );
}
