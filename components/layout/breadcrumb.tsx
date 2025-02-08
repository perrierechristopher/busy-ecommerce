'use client';
import { Collection } from 'lib/shopify/types';
import { MenuX, Path } from 'lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { title } from 'process';
import React, { useEffect } from 'react';

/**
 * Menus will be hardcoded, we will write a query to fetch them and create
 * an object holding them that the breadcrumbs component will use to
 * define the segment
 *
 */

type Props = {
  menus: MenuX[];
};

const BreadCrumbs = ({ menus }: Props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const [hierarchy, setHierarchy] = React.useState<any>([{title: "Home", path: "/"}]);

  useEffect(() => {
    setHierarchy((state: any) => {
      let newHierarchy = new Set(state);
  
      const currentMenu = menus.find((m) => m.path === pathname) as Path;

      if (JSON.stringify(currentMenu) === JSON.stringify({title: "Home", path: "/"})) {
        return [{title: "Home", path: "/"}];
      }
      if(currentMenu && !newHierarchy.has(currentMenu)) {
      // Add menus from path segments if they are not already included
      pathSegments.forEach((path) => {
        const foundMenu = menus.find((m) => m.path === `/${path}`);
        if (foundMenu && !newHierarchy.has(foundMenu)) {
          newHierarchy.add(foundMenu as MenuX);
        }
      });
        newHierarchy.add(currentMenu);
      } else if(currentMenu && newHierarchy.has(currentMenu)) {
        newHierarchy = new Set(Array.from(newHierarchy).slice(0,Array.from(newHierarchy).indexOf(currentMenu)+1))
      } else {
        newHierarchy.add({title: pathSegments[pathSegments.length-1], path: pathname})
      }
  
      return Array.from(new Set(newHierarchy));
    });
  
  }, [pathname]);

  useEffect(() => {
    console.log(hierarchy)
  },[hierarchy])
  
  return (
    <nav className="px-4 pb-4 text-sm">
      <ol className="flex space-x-2">
        {/* <li>
          <Link href="/" className="text-lg text-white">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          return (
            <li key={href} className="flex items-center space-x-2">
              <span className="text-lg">{'>'}</span>
              <Link href={href} className="text-lg capitalize text-white">
                {segment}
              </Link>
            </li>
          );
        })} */}
        {
          hierarchy.map((h: Path, index: number)=>{
            const href = hierarchy[index].path;
            return (
              <li key={href} className="flex items-center space-x-2">
                {index > 0 && <span className="text-lg">{'>'}</span> }
                <Link href={href} className="text-lg capitalize text-white">
                  {h.title}
                </Link>
              </li>
            )
          })
        }
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
