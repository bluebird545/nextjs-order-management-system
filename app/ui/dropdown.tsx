'use client'

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { useRef, useState } from "react"
import useClickOutside from "@/app/hooks/useOutsideClick"

type DropdownList = {
  title: string
  value: string // or key
  selected: boolean
}[]

type DropdownProps = {
  placeholder?: string
  titlePrefix?: string
  titleSuffix?: string
  list?: DropdownList
  children?: React.ReactNode
  resetThenSet: Function
}

function DropdownList({ list, selectListItem }: { list: DropdownList,selectListItem: Function }) {
  return list.map((listItem, i) => (
    <button
      key={i}
      type="button"
      onClick={() => selectListItem(listItem)}
      className={`block w-full text-left p-3 hover:bg-blue-100 hover:cursor-pointer dark:hover:bg-blue-500/50 ${listItem.selected && 'bg-blue-100 dark:bg-blue-500/50'}`}>
        {listItem.title}
    </button>
  ))
}

export default function Dropdown({ placeholder, titlePrefix, titleSuffix, list, children, resetThenSet }: DropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [title, setTitle] = useState('')
  const dropdownRef = useRef(null)

  const selectListItem = (item: { title: string, value: string, selected: boolean }) => {
    const { title, value } = item
    setShowDropdown(false)
    constructTitle(title)
    resetThenSet(value)
  }

  const constructTitle = (title: string) => {
    let headerTitle = ''

    if (titlePrefix) headerTitle += titlePrefix
    headerTitle += title
    if (titleSuffix) headerTitle += titleSuffix

    setTitle(headerTitle)
  }

  useClickOutside(dropdownRef, () => setShowDropdown(false), showDropdown)

  return (
    <div ref={dropdownRef} className="relative">
      <button type="button" onClick={() => setShowDropdown(!showDropdown)} className="px-3 py-1.5 min-w-24 inline-flex items-center border rounded-lg text-sm font-medium text-center text-slate-500 outline outline-2 outline-transparent focus:outline-slate-500 dark:text-slate-400 hover:text-slate-900 hover:border-slate-300 dark:focus:outline-slate-200 dark:hover:text-slate-200">
        {placeholder && !title ? placeholder : title}
        {
          showDropdown
          ? <ChevronUpIcon className="ml-3 h-3 w-3" />
          : <ChevronDownIcon className="ml-3 h-3 w-3" />
        }
      </button>

      { showDropdown && (
        <div className="absolute top-12 left-0 z-10 bg-white text-sm text-slate-700 divide-y divide-slate-100 dark:text-slate-200 border rounded-md shadow-xl w-44 dark:bg-slate-700">
          {
            list
            ? <DropdownList {...{list, selectListItem}} />
            : children 
          }
        </div>
      )}
    </div>
  )
}