'use client'

import Link from 'next/link'
import {
  ChevronDoubleRightIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import NavLinks from '@/app/ui/common/navlinks'
import { useState } from 'react'

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <div className={`relative min-h-screen p-5 pt-8 text-slate-800 border-r border-slate-200  bg-white shadow-lg will-change-height transition-all duration-300 dark:text-slate-200 dark:border-slate-500 dark:bg-slate-700 ${open ? 'w-72' : 'w-20'}`}>
      <button className={`w-6 h-6 absolute top-9 -right-3 bg-white rounded-full border border-slate-400 dark:border-slate-600 cursor-pointer hover:scale-110 ${open && 'rotate-180'}`} onClick={() => setOpen(!open)}>
        <ChevronDoubleRightIcon className='w-3.5 h-full mx-auto text-slate-800' />
      </button>

      <Link href='/dashboard' className='inline-flex'>
        <ChartBarIcon className={`w-10 bg-gradient-to-tr from-white to-violet-400 rounded-lg p-1.5 text-slate-50 mr-2 transition-transform duration-500 dark:from-slate-200 dark:to-violet-300 ${open && 'rotate-[360deg]'}`} />
        <h1 className={`text-2xl font-medium tracking-wide transition-all duration-300 ${!open && 'scale-0'}`}>OMS</h1>
      </Link>


      <div className='pt-2'>
        <NavLinks open={open} />
      </div>
    </div>
  )
}