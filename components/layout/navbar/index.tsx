import { ITEMS } from 'lib/constants/navegation';
import Link from 'next/link';
import Logo from './logo';

export default async function Navbar() {
  return (
    <div className="h-0 w-full">
      <div className="fixed left-0 top-0 z-10 flex w-full flex-row items-center justify-center bg-gradient-to-b from-brand-100 to-transparent pb-2">
        <nav className="items-bottom flex w-full max-w-default justify-start gap-4 p-4">
          <div className="flex w-full flex-row items-end justify-start gap-4">
            <Link href="/" className="transition-opacity duration-75 hover:opacity-60">
              <Logo className="h-8 w-fit fill-brand-900" />
            </Link>
          </div>

          <ul className="flex w-full items-center justify-between gap-4">
            {ITEMS.map(({ component: Component, href, key, label }) => (
              <li
                key={key}
                className="text-[14px] font-medium leading-none tracking-tight text-brand-900 transition-opacity duration-75 hover:opacity-60"
              >
                {Component ? <Component /> : <Link href={href}>{label}</Link>}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
