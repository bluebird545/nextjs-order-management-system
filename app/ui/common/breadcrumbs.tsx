import { ChevronRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

type Breadcrumb = {
  label: string
  href: string
  active?: boolean
}
type Props = {
  breadcrumbs: Breadcrumb[]
}
export default function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex absolute top-8">
      <ol className="inline-flex items-center text-xl space-x-1 md:space-x-2">
        {
          breadcrumbs.map((breadcrumb, i) => (
            <li key={breadcrumb.href} className="inline-flex items-center">
              <Link
                href={breadcrumb.href}
                className={`${breadcrumb.active ? 'text-blue-300' : 'hover:text-blue-300'}`}
              >{breadcrumb.label}</Link>

              { i < breadcrumbs.length - 1 &&<ChevronRightIcon className="w-5 h-5 mt-1 ms-2.5" />}
            </li>
          ))
        }
      </ol>
    </nav>
  )
}