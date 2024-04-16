'use client';

import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { locationNames, locationsArray } from 'lib/constants/locations';

export function LocationSelector({ actualLang }: { actualLang: Location }) {
  return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button className="flex flex-row items-center">
          <span>{(actualLang as any) === 'ar' ? 'Argentina' : 'Internacional'}</span>
          <span className="ml-1 mt-[2px] flex rotate-90 opacity-70">{`>`}</span>
        </Menu.Button>
      </div>
      <Menu.Items className="absolute -left-2 mt-2 w-fit origin-top-left rounded border border-brand-900/5 bg-brand-100 shadow-sm">
        <div className="px-1 py-1 ">
          {locationsArray.map((location) => (
            <Menu.Item key={location}>
              {({ active }) => (
                <a
                  href={`/${location}`}
                  key={location}
                  className={clsx(
                    'group flex w-full items-center rounded-md px-2 py-2 pr-8 text-[14px] font-medium leading-none transition-all',
                    active ? 'bg-brand-900/5 ' : '',
                    location === (actualLang as unknown as string)
                      ? 'text-brand-900'
                      : 'text-brand-900/80'
                  )}
                >
                  {locationNames[location]}
                </a>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
