'use client'

import Link from 'next/link'
import {
  UserIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { ThemeSwitch } from '../theme-switch'

export default function Navbar() {
  return (
    <nav className='text-slate-800 h-20 absolute top-0 left-0 w-full p-4 border-b border-slate-200 shadow-sm bg-white dark:border-slate-500 dark:text-slate-200 dark:bg-slate-700'>
      <div className='flex items-center justify-end gap-x-4'>
        <button className='rounded-md p-2 hover:bg-slate-200 hover:bg-opacity-30'>
          <BellIcon className='w-5' />
        </button>

        <ThemeSwitch />


        <Link href='/' className='inline-flex rounded-md p-2'>
          <UserIcon className='w-5 mr-2' />
          <span className={`text-base flex-1 transition-all duration-200`}>Account</span>
        </Link>
      </div>
    </nav>
  )
}