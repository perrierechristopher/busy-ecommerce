'use client';
import Link from 'next/link';
import React from 'react';
import { Collection, Menu } from 'lib/shopify/types';
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { MenuX } from 'lib/types';

type Props = {
  menu: MenuX[];
  collections: Collection[];
  schema: 'flat' | 'hierarchical';
};

export const HierarchicalSchema = ({
  menu,
  title,
  view,
  closeMenu
}: {
  menu: MenuX[] | [] ;
  title?: string;
  view?: string;
  closeMenu?: any;
}) => {
  const [childrenMenu, setChildrenMenu] = React.useState<string | null>(null);

  switch (view) {
    case 'mobile':
      return (
        <>
          {menu.length ? (
            <ul className="flex w-full flex-col">
              {menu.map((item: MenuX) => (
                <li
                  className="relative flex flex-col py-2 text-xl text-black dark:text-white"
                  key={item.path}
                >
                  <div className="flex items-center">
                    <Link
                      className="transition-colors hover:text-neutral-500"
                      href={item.path}
                      prefetch={true}
                      onClick={closeMenu}
                    >
                      {item.title}
                    </Link>
                    {Array.from(item?.children || []).length > 0 && (
                      <ChevronDownIcon
                        className='ml-3 h-4 my-auto cursor-pointer transition-colors hover:text-neutral-500'
                        onClick={() =>
                          setChildrenMenu(item.title)
                        }
                      />
                    )}
                  </div>

                  {childrenMenu===item.title && item?.children ? (
                    <div className="ml-10">
                      <HierarchicalSchema
                        menu={item.children as MenuX[]}
                        view="mobile"
                        closeMenu={closeMenu}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      );
    default:
      return (
        <div className="absolute left-0 z-50 w-48 rounded-lg border border-white bg-black shadow-lg">
          {title && <h5 className="pl-4 pt-2">{title}</h5>}
          <ul className="relative p-4">
            {menu?.map((item: MenuX) => (
              <li key={item.title} className="group my-2">
                <Link
                  href={item.path}
                  prefetch={true}
                  onMouseEnter={() => setChildrenMenu(item.title)}
                  // onMouseLeave={() => setChildrenMenu(null)}
                  className="text-neutral-500 hover:text-white hover:underline"
                >
                  {item.title}
                </Link>

                {childrenMenu === item.title && !!item.children ? (
                  <div className="absolute left-full top-0 ml-0">
                    <HierarchicalSchema title={item.title} menu={item.children} />
                  </div>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
  }
};

const CustomMenuSchema = ({ menu, schema, collections }: Props) => {
  const newMenu: MenuX[] = React.useMemo(() => {
    return menu.map((m) => ({
      ...m,
      children: m.title.match(/collections/i)
        ? collections.map((c) => ({ title: c.title, path: c.path }))
        : []
    }));
  }, [menu, collections]);

  const [openMenu, setOpenMenu] = React.useState(false);

  return schema === 'flat' ? (
    <ul className="hidden gap-6 text-sm md:flex md:items-center">
      {newMenu.map((item) => (
        <li key={item.title}>
          <Link href={item.path} prefetch={true} className="text-neutral-500 hover:text-black">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div className="relative hidden md:block" onMouseLeave={() => setOpenMenu(false)}>
      <button className="rounded px-4 py-2 text-white" onMouseEnter={() => setOpenMenu(true)}>
        <Bars3Icon className="h-5 cursor-pointer" />
      </button>

      {openMenu && <HierarchicalSchema menu={newMenu} />}
    </div>
  );
};

export default CustomMenuSchema;
