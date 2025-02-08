import { getCollections } from 'lib/shopify';
import { Collection } from 'lib/shopify/types';
import Link from 'next/link';
import React from 'react';
import { GridTileImage } from './tile';

type Props = {};

const CategoriesGridItem = ({ data, size }: { data: Collection, size?: 'full' | 'normal' }) => {
  const { title, image, path } = data;
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={path}
        prefetch={true}
      >
        <GridTileImage
          src={image?.url ? image.url : "/images/logo.jpg"}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={true}
          alt={title}
          label={{
            position:'bottom',
            title: title as string,
            amount: '0',
            currencyCode: 'EUR'
          }}
        />
      </Link>
    </div>
  );
};

const CategoriesGrid = async (props: Props) => {
  // Collections that start with `hidden-*` are hidden from the search page.
  const categories: Collection[] = await getCollections();

  return (
    <>
    <h1 className='p-4 block text-3xl'>Categories Grid</h1>
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-3 md:grid-rows-auto">
      {categories.map((c) => (
          <div key={c.title}>
          <CategoriesGridItem data={c} size='normal' />
        </div>
      ))}
    </section>
      </>
  );
};

export default CategoriesGrid;
