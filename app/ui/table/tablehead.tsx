'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid"

function Sort({ direction }: { direction: 'up' | 'down' | 'default' }) {
  return (
    <div className="h-5 inline-flex">
      <ArrowDownIcon className={`h-3.5 w-3.5 stroke-2 [&>path]:stroke-[2] self-end ${direction === 'down' && 'text-slate-600'}`} />
      <ArrowUpIcon className={`h-3.5 w-3.5 stroke-2 [&>path]:stroke-[2] self-start ${direction === 'up' && 'text-slate-600'}`} />
    </div>
  )
}

type TableHeadProps = {
  columns: {
    label: string
    accessor: string
    sortable: boolean
    icon?: string
  }[]
}

export default function TableHead({ columns }: TableHeadProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [sortBy, setSortBy] = useState('')
  const [sortDir, setSortDir] = useState('')

  const handleSort = (sort: string) => {
    const dir = sort === sortBy && sortDir === 'asc' ? 'desc' : 'asc'
    setSortBy(sort)
    setSortDir(dir)

    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', `${sort}_${dir}`)
    router.push(`${pathname}?${params.toString()}`)
  }

  const direction = (sort: string) => {
    return sortBy === sort && sortDir === 'asc' ? 'up' : sortBy === sort && sortDir === 'desc' ? 'down' : 'default'
  }

  return (
    <thead className="text-sm text-slate-400 tracking-wide border-b border-slate-200 dark:border-slate-500">
      <tr>
        <th className="p-4">#</th>

        {
          columns.map(({ label, accessor, sortable }, i) => {
            if (sortable) {
              return (
                <th key={accessor + i} onClick={() => handleSort(accessor)} className="px-6 py-3">
                  <span className="inline-flex items-center gap-x-2">
                    {label}
                    <Sort direction={direction(accessor)} />
                  </span>
                </th>
              )
            } else {
              return (
                <th key={accessor + i} className="px-6 py-3">
                  {label}
                </th>
              )
            }
          })
        }

        <th className="p-4 text-center">Action</th>
      </tr>
    </thead>
  )
}