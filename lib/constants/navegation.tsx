import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import { Suspense } from 'react';
import { Location } from './locations';

export const ITEMS = [
  {
    key: 'products',
    label: 'Products',
    href: '/'
  },
  {
    key: 'about',
    label: 'Nosotros',
    href: '/about'
  },
  {
    key: 'contact',
    label: 'Contacto',
    href: '/contact'
  },
  {
    key: 'cart',
    label: 'Carrito',
    component: ({ lang }: { lang: Location }) => (
      <Suspense fallback={<OpenCart />}>
        <Cart lang={lang} />
      </Suspense>
    )
  }
];

export const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/keyframear/',
    key: 'instagram'
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCQWuiDgoNcw6XEZkP_r8KXA',
    key: 'youtube'
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@keyframear',
    key: 'tiktok'
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/Keyframear',
    key: 'twitter'
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.es/keyframear/',
    key: 'pinterest'
  }
];
