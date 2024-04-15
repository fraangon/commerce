import clsx from 'clsx';
import LocationLink from 'components/location-link';
import { Location } from 'lib/constants/locations';
import { Menu } from 'lib/shopify/types';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterMenuItem = ({ item, lang }: { item: Menu; lang: Location }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <LocationLink
        href={item.path}
        lang={lang}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </LocationLink>
    </li>
  );
};

export default function FooterMenu({ menu, lang }: { menu: Menu[]; lang: Location }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} lang={lang} />;
        })}
      </ul>
    </nav>
  );
}
