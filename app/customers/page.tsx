import { Suspense } from "react";
import { fetchCustomerPages, fetchCustomers } from "../lib/services/customer";
import CustomersTable from "@/app/ui/customers/table";
import { TableSkeleton } from "@/app/ui/orders/skeletons";
import TablePagination from "@/app/ui/table/table-pagination";
import TableSearch from "@/app/ui/table/table-search";
import TableFilter from "@/app/ui/table/table-filter";
import Button from "@/app/ui/common/button";

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

  const [totalPages, customers] = await Promise.all([
    fetchCustomerPages(query, filter),
    fetchCustomers(query, filter, sort, page)
  ])

  return (
    <main>
      <div className="my-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-x-2">
          <h1 className="text-slate-800 text-3xl font-medium dark:text-slate-200">Customers</h1>
        </div>

        {/* <Button text="New Customer" href="/customers/create" icon="plus" /> */}
      </div>

      <div className="mb-6 flex justify-between">
        <TableSearch
          placeholder="Search customers by name or email"
        />
      </div>


      <Suspense key={query + page} fallback={<TableSkeleton />}>
        <CustomersTable {...{customers}} />
      </Suspense>

      <TablePagination totalPages={totalPages} />
    </main>
  )
}