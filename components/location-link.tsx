import { defaultLocation } from 'lib/constants/locations';
import Link from 'next/link';

export default function LocationLink({ href, children, lang = defaultLocation, ...props }: any) {
  const isExternal = href.startsWith('http');
  const localizedHref = isExternal ? href : `/${lang}${href}`;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
