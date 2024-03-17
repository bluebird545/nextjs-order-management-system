export function TableRowSkeleton() {
  return (
    <tr>
      <td className="w-4 p-4">
        <div className="h-6 w-6 bg-gray-100"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 rounded-full bg-gray-100"></div>
      </td>
      <td className="flex items-center justify-center">
        <div className="flex mt-6">
          <div className="h-2 w-2 rounded-full bg-gray-100"></div>
          <div className="h-2 w-2 rounded-full bg-gray-100"></div>
          <div className="h-2 w-2 rounded-full bg-gray-100"></div>
        </div>
      </td>
    </tr>
  )
}

export function TableSkeleton() {
  return (
    <table className="w-full text-left text-slate-800 dark:text-slate-200">
      <thead className="text-base text-slate-400 tracking-wide border-b border-slate-200 dark:border-slate-500">
        <tr>
          <th className="p-4">#</th>
          <th className="px-6 py-3">Order Id</th>
          <th className="px-6 py-3">Date</th>
          <th className="px-6 py-3">Customer</th>
          <th className="px-6 py-3">Total</th>
          <th className="px-6 py-3">Status</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </tbody>
    </table>
  )
}