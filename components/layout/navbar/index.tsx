import HeaderLogo from 'components/icons/header-logo';

export default async function Navbar() {
  // const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative z-50 mb-[-30px] flex max-w-7xl items-center justify-between p-4">
      <HeaderLogo />

      {/* <Suspense fallback={<OpenCart />}>
          <Cart />
        </Suspense>  */}
    </nav>
  );
}
