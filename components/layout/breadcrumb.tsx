'use client';
import { MenuX, Path } from 'lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {
  menus: MenuX[];
};

const BreadCrumbs = ({ menus }: Props) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  // Load hierarchy from localStorage or default to home
  const [hierarchy, setHierarchy] = useState<MenuX[]>(() => {
    if (typeof window !== 'undefined') {
      const savedHierarchy = localStorage.getItem('breadcrumbsHierarchy');
      return savedHierarchy ? JSON.parse(savedHierarchy) : [{ title: 'Home', path: '/' }];
    }
    return [{ title: 'Home', path: '/' }];
  });

  useEffect(() => {
    setHierarchy((state) => {
      let newHierarchy = [...state];

      // Find current menu item
      const currentMenu = menus.find((m) => m.path === pathname) as MenuX;

      // Reset hierarchy if Home
      if (pathname === '/') {
        return [{ title: 'Home', path: '/' }];
      }

      if (newHierarchy.indexOf(currentMenu) !== -1) {
        return newHierarchy.slice(0, newHierarchy.indexOf(currentMenu)+1);
      }

      if (currentMenu) {
        // Ensure each menu item in the hierarchy is unique
        const updatedHierarchy = [...newHierarchy];

        pathSegments.forEach((segment, i) => {
          // const fullPath = '/' + pathSegments.slice(0, i + 1).join('/');
          const foundMenu = menus.find((m) => m.path === `/${segment}`);

          if (foundMenu && !updatedHierarchy.some((h) => h.path === foundMenu.path)) {
            updatedHierarchy.push(foundMenu);
          }
        });

        // Add current page if not already in the hierarchy
        if (!updatedHierarchy.some((h) => h.path === currentMenu.path)) {
          updatedHierarchy.push(currentMenu);
        }

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('breadcrumbsHierarchy', JSON.stringify(updatedHierarchy));
        }

        return updatedHierarchy;
      }

      return newHierarchy;
    });
  }, [pathname]);

  return (
    <nav className="px-4 pb-4 text-sm">
      <ol className="flex space-x-2">
        {hierarchy.map((h: Path, index: number) => (
          <li key={h.path} className="flex items-center space-x-2">
            {index > 0 && <span className="text-lg">{'>'}</span>}
            <Link href={h.path || '/'} className="text-lg capitalize text-white">
              {h.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
