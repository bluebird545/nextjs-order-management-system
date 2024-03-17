export type TableRowProps = {
  children: React.ReactNode
}

export default function TableRow({ children }: TableRowProps) {
  return (
    <tr className="hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-200 dark:border-slate-500">

      <td className="w-4 p-4">
        <input type="checkbox" name="" id="" />
      </td>

      {children}

      <td className="p-4"></td>
    </tr>
  )
}