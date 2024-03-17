'use client'

import { capitalizeFirstLetter, formatDateToLocal } from "@/app/lib/utils"
import { IOrder } from "@/app/lib/data/Order"
import { UpdateOrder } from "@/app/ui/orders/table-actions"
import Table from "@/app/ui/table/index"
import TableHead from "@/app/ui/table/tablehead"
import TableBody from "@/app/ui/table/tablebody"
import TableRow from "@/app/ui/table/tablerow"
import NoDataError from "@/app/ui/no-data"

type Props = {
  orders: IOrder[]
}

export default function OrdersTable({ orders }: Props) {

  const columns = [
    { label: 'Order ID', accessor: 'id', sortable: false },
    { label: 'Date', accessor: 'date', sortable: true },
    { label: 'Customer', accessor: 'first_name', sortable: true },
    { label: 'Total', accessor: '', sortable: false },
    { label: 'Status', accessor: '', sortable: false },
  ]

  if (!orders) {
    return (
      <NoDataError type="Orders" />
    )
  }

  return (
    <Table>
      <TableHead {...{columns}} />

      <TableBody>
        {
          orders.map(({ id, date, first_name, last_name, total, status }, i) => (
            <TableRow key={i}>
              <td className="px-6 py-4">{id}</td>
              <td className="px-6 py-4">{formatDateToLocal(date)}</td>
              <td className="px-6 py-4">{first_name} {last_name}</td>
              <td className="px-6 py-4">${total}</td>
              <td className="px-6 py-4">
                <span
                  className={`py-2 px-3 rounded-full text-sm font-medium ${status === 'pending' && 'bg-violet-100 text-violet-600'} ${status === 'cancelled' && 'bg-red-100 text-red-600'} ${status === 'completed' && 'bg-green-100 text-green-600'} ${status === 'on hold' && 'bg-blue-100 text-blue-600'}`}>
                  {capitalizeFirstLetter(status)}
                </span>
              </td>
              <td>
                <UpdateOrder orderId={id} />
              </td>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}