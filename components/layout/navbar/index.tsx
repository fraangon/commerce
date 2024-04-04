import HeaderLogo from 'components/icons/header-logo';

export default async function Navbar() {
  // const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <HeaderLogo />

      {/* <Suspense fallback={<OpenCart />}>
          <Cart />
        </Suspense>  */}
    </nav>
  );
}
