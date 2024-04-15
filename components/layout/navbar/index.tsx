import LocationLink from 'components/location-link';
import { Location } from 'lib/constants/locations';
import { ITEMS } from 'lib/constants/navegation';
import Logo from './logo';

export default async function Navbar({ lang }: { lang: Location }) {
  return (
    <div className="h-0 w-full">
      <div className="fixed left-0 top-0 z-10 flex w-full flex-row items-center justify-center bg-gradient-to-b from-brand-100 to-transparent pb-2">
        <nav className="items-bottom flex w-full max-w-default justify-start gap-4 p-4">
          <div className="flex w-full flex-row items-end justify-start gap-4">
            <LocationLink
              href="/"
              className="transition-opacity duration-75 hover:opacity-60"
              lang={lang}
            >
              <Logo className="h-8 w-fit fill-brand-900" />
            </LocationLink>
          </div>

          <ul className="flex w-full items-center justify-between gap-4">
            {ITEMS.map(({ component: Component, href, key, label }) => (
              <li
                key={key}
                className="text-[14px] font-medium leading-none tracking-tight text-brand-900 transition-opacity duration-75 hover:opacity-60"
              >
                {Component ? (
                  <Component lang={lang} />
                ) : (
                  <LocationLink href={href} lang={lang}>
                    {label}
                  </LocationLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
