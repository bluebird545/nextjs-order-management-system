import { Suspense } from "react";
import { fetchProductPages, fetchProducts } from "../lib/services/product";
import ProductsTable from "@/app/ui/inventory/table";
import TablePagination from "@/app/ui/table/table-pagination";
import { TableSkeleton } from "@/app/ui/orders/skeletons";
import Button from "@/app/ui/common/button";
import TableSearch from "@/app/ui/table/table-search";
import TableFilter from "@/app/ui/table/table-filter";

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
  
  const [totalPages, products] = await Promise.all([
    fetchProductPages(query, filter),
    fetchProducts(query, filter, sort, page)
  ])

  return (
    <main>
      <div className="my-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-x-2">
          <h1 className="text-slate-800 text-3xl font-medium dark:text-slate-200">Products</h1>
        </div>

        {/* <Button text="New Inventory" href="/inventory/create" icon="plus" /> */}
      </div>

      <div className="mb-6 flex justify-between">
        <TableSearch
          placeholder="Search products by name"
        />
        <TableFilter
          filter="Category"
          filters={[
            {title: 'All', value: 'all', selected: true},
            {title: 'Electronics', value: 'electronics', selected: false},
            {title: "Men's Clothing", value: "men's clothing", selected: false},
            {title: "Women's clothing", value: "women's clothing", selected: false},
            {title: "Jewelery", value: "jewelery", selected: false},
          ]}
        />
      </div>

      <Suspense key={query + page} fallback={<TableSkeleton />}>
        <ProductsTable {...{products}} />
      </Suspense>

      <TablePagination totalPages={totalPages} />
    </main>
  )
}