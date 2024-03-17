'use client';

import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  CubeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  // { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
  { name: 'Orders', href: '/orders', icon: ShoppingBagIcon },
  { name: 'Inventory', href: '/inventory', icon: CubeIcon },
  { name: 'Customers', href: '/customers', icon: UserGroupIcon }
]

export default function NavLinks({ open }: { open: boolean}) {
  const pathname = usePathname()

  return (
    <>
      {
        links.map((link) => {
          const LinkIcon = link.icon

          return(
            <Link
              href={link.href}
              key={link.name}
              className={`h-[48px] mt-2 p-2 flex items-center gap-x-4 grow text-sm  rounded-md hover:bg-slate-200 hover:bg-opacity-30 ${pathname === link.href && 'bg-slate-200 bg-opacity-30'}` }
            >
              
              <LinkIcon className='w-6' />
              <span className={`text-base font-medium flex-1 transition-all duration-200 ${!open && 'opacity-0 hidden'}`}>{link.name}</span>
            </Link>
          )
        })
      }
    </>
  )
}