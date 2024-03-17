'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

type TableSearchProps = {
  placeholder?: string
}

export default function TableSearch({ placeholder }: TableSearchProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1') //reset page to 1 on a new search
    if (term) params.set('query', term)
    else params.delete('query')

    replace(`${pathname}?${params.toString()}`)
  }, 300) // run code after 300ms of the user stop typing

  return (
    <div className='relative'>
      <div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
        <MagnifyingGlassIcon aria-hidden='true' className='w-4 h-4 stroke-2 absolute pointer-events-none text-slate-500 dark:text-slate-200' />
      </div>
      <input
        type='text'
        className='block px-3 py-2 ps-10 text-sm border rounded-lg w-80 bg-translate text-slate-900 placholder:text-slate-500 focus:placeholder:text-slate-900 focus:outline-slate-500 hover:placeholder:text-slate-900
        dark:hover:placeholder:text-slate-200
        dark:focus:placeholder:text-slate-200 dark:text-slate-200 dark:focus:outline-slate-200 dark:bg-slate-800'
        placeholder={placeholder || 'Search'}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}