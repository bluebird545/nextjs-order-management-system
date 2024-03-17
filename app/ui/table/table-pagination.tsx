'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function TablePagination({ totalPages }: { totalPages: number }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPaginationUrl = useCallback((pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }, [pathname, searchParams])

  const generatePagination = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (currentPage <= 3)
      return [1, 2, 3, '...', totalPages - 1, totalPages]

    if (currentPage >= totalPages - 2)
      return [1, 2, '...', totalPages - 2, totalPages -1, totalPages]

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  const pagination = generatePagination()

  return (
    <div className="my-4 flex items-center justify-between" aria-label='Table pagination'>
      <span className='text-sm font-normal text-slate-500 dark:text-gslateray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
        {/* Showing<span className='font-semibold text-slate-900 dark:text-white'>1-10</span> of <span className='font-semibold text-slate-900 dark:text-white'>{totalPages}</span> */}
      </span>

      <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
        <li className=''>
          <button
            onClick={() => { router.push(createPaginationUrl(currentPage - 1)) }}
            disabled={currentPage - 1 <= 0 && true}
            className={`rounded-s-lg flex items-center justify-center px-3 h-8 ms-0 leading-tight text-slate-500 border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800  dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white disabled:text-slate-300 disabled:bg-slate-100 disabled:dark:bg-slate-600 disabled:hover:cursor-not-allowed`}>Previous</button>
        </li>
        {
          pagination.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined

            if (index === 0) position = 'first'
            if (index === pagination.length - 1) position = 'last'
            if (pagination.length === 1) position = 'single'
            if (page === '...') position = 'middle'

            return (
              <li key={index}>
                <button
                  onClick={() => { router.push(createPaginationUrl(page)) }}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-slate-300 dark:border-slate-700 ${currentPage === page ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-700 dark:text-white' : 'text-slate-500 bg-transparent hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'}`}
                >{page}</button>
              </li>
            )
          })
        }
        <li className=''>
          <button
            onClick={() => { router.push(createPaginationUrl(currentPage + 1)) }}
            disabled={currentPage + 1 > totalPages && true}
            className={`rounded-e-lg flex items-center justify-center px-3 h-8 ms-0 leading-tight text-slate-500 border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800  dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white disabled:text-slate-300 disabled:bg-slate-100 disabled:dark:bg-slate-600 disabled:hover:cursor-not-allowed`}>Next</button>
        </li>
      </ul>
    </div>
  )
}