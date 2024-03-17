import {
  PlusIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

type ButtonProps = {
  text: string
  action?: () => void | Function
  href?: string
  icon?: 'plus'
}

const iconMap = {
  plus: PlusIcon
}

export default function Button({ text, action, href, icon }: ButtonProps) {
  const Icon = icon ? iconMap[icon] : null

  if (action) {
    return (
      <button
        onClick={() => action}
        className="inline-flex items-center py-2 px-3 bg-blue-400 text-slate-200 rounded-lg hover:bg-blue-500"
      >{text}</button>
    )
  } else {
    return (
      <Link href={href!} className="inline-flex items-center py-2 px-3 bg-blue-400 text-slate-200 rounded-lg hover:bg-blue-500">
        { Icon ? <Icon className="w-4 mr-2 stroke-[4]" /> :null}
        {text}
      </Link>
    )
  }
}