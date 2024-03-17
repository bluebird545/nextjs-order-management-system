'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import Dropdown from "../dropdown"

type TableFilterProps = {
  filter: string
  filters: {
    title: string
    value: string // or label
    selected: boolean
  }[]
}

export default function TableFilter({ filter, filters }: TableFilterProps) {
  const [statusFilter, setStatusFilter] = useState(filters.find((filter) => filter.selected === true)!.value)

  const [filterList, setFilterList] = useState(filters) 
  
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const pathname = usePathname()
  const params = useSearchParams()

  const handleFilterChange = (value: string) => {
    let temp = [...filterList]
    temp.forEach((item) => item.selected = false)
    const index = temp.findIndex((item) => item.value === value)
    temp[index].selected = true
    
    setFilterList(temp)
    setStatusFilter(value)
    handleFilter()
  }

  const handleFilter = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1') //reset page to 1 on a new search
    if (statusFilter !== 'all') params.set('filter', statusFilter.toString())
    else params.delete('filter')

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  useEffect(() => {
    const hasFilter = params.get('filter')
    if (hasFilter) setStatusFilter(hasFilter)
  }, [params])
  
  return (
    <Dropdown
      placeholder={filter}
      titlePrefix={`${filter}: `}
      list={filterList}
      resetThenSet={handleFilterChange}
    />
  )
}