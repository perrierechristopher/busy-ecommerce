'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BreadCrumbs = () => {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter(Boolean);

    return (
        <nav className="text-sm px-4 pb-4">
          <ol className="flex space-x-2">
            <li>
              <Link href="/" className="text-white text-lg">Home</Link>
            </li>
            {pathSegments.map((segment, index) => {
              const href = "/" + pathSegments.slice(0, index + 1).join("/");
              return (
                <li key={href} className="flex items-center space-x-2">
                  <span className='text-lg'>{">"}</span>
                  <Link href={href} className="text-white text-lg capitalize">{segment}</Link>
                </li>
              );
            })}
          </ol>
        </nav>
      );
}

export default BreadCrumbs