import { Suspense } from "react"
import { fetchOrderPages, fetchOrders } from "@/app/lib/services/order"
import OrdersTable from "@/app/ui/orders/table"
import TableFilter from "@/app/ui/table/table-filter"
import TableSearch from "@/app/ui/table/table-search"
import { TableSkeleton } from "@/app/ui/orders/skeletons"
import TablePagination from "@/app/ui/table/table-pagination"
import Button from "@/app/ui/common/button"

type Props = {
  searchParams: {
    query?: string
    filter?: string
    sort?: string
    page?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const query  = searchParams?.query || ''
  const filter = searchParams?.filter || ''
  const sort   = searchParams?.sort || ''
  const page   = Number(searchParams?.page || 1)

  const [totalPages, orders] = await Promise.all([
    fetchOrderPages(query, filter),
    fetchOrders(query, filter, sort, page)
  ])

  return (
    <main>
      <div className="my-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-x-2">
          <h1 className="text-slate-800 text-3xl font-medium dark:text-slate-200">Orders</h1>
        </div>     

        <Button text="New Order" href="/orders/create" icon="plus" />
      </div>

      <div className="mb-6 flex justify-between">
        <TableSearch
          placeholder="Search for orders by ID or customer"
        />
        <TableFilter
          filter="Status"
          filters={[
            {title: 'All', value: 'all', selected: true},
            {title: 'Pending', value: 'pending', selected: false},
            {title: 'Completed', value: 'completed', selected: false},
            {title: 'On Hold', value: 'on hold', selected: false},
            {title: 'Cancelled', value: 'cancelled', selected: false}
          ]}
        />
      </div>

      <Suspense key={query + page} fallback={<TableSkeleton />}>
        <OrdersTable {...{orders}} />
      </Suspense>

      <TablePagination totalPages={totalPages} />
    </main>
  )
}