import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getCollectionProducts, getCollections, getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import CustomMenuSchema from './schema';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');
  const collections = await getCollections()
  const products = await Promise.all(
    collections.map(async (c) => {
      const productsForCollection = await getCollectionProducts({ collection: c.handle });
      return { collection: c.title, products: productsForCollection };
    })
  );

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} collections={collections} products={products} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/2">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          <CustomMenuSchema menu={menu} collections={collections} schema='flat'/>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
