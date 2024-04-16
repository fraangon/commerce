import LocationLink from 'components/location-link';
import { Location } from 'lib/constants/locations';
import { ITEMS, SOCIALS } from 'lib/constants/navegation';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer({ lang }: { lang: Location }) {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || 'Keyframe';

  const sections = [
    {
      label: 'Sitio',
      items: ITEMS
    },
    {
      label: 'Redes',
      items: SOCIALS
    }
  ];

  return (
    <footer className="flex w-full flex-row px-4  text-[14px] leading-none text-brand-900">
      <div className="flex w-full flex-row gap-4 border-t border-brand-900/5 py-10">
        <div className="flex w-full flex-row space-y-2">
          {sections.map(({ label, items }) => (
            <div key={label} className="flex w-full flex-col space-y-2">
              <span className="font-semibold">{label}</span>
              {items
                .filter(({ href }) => href)
                .map(({ href, label }) => (
                  <LocationLink
                    key={href}
                    href={href as string}
                    lang={lang}
                    {...(href?.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="cursor-pointer text-brand-900/80 transition-all hover:opacity-60"
                  >
                    {label}
                  </LocationLink>
                ))}
            </div>
          ))}
        </div>

        <div className="flex w-full flex-row space-x-2">
          <div className="flex w-full flex-col space-y-2">
            <span>Hecho en Buenos Aires.</span>
          </div>

          <div className="flex w-full flex-col space-y-2">
            <span className="text-right">
              &copy; {copyrightDate} {copyrightName}.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
