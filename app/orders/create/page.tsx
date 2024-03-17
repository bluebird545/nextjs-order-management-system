import { fetchCustomers } from "@/app/lib/services/customer"
import { fetchProducts } from "@/app/lib/services/product"
import CreateOrderForm from "@/app/ui/orders/create-form"

export default async function Page() {
  const [customers, products] = await Promise.all([
    fetchCustomers(),
    fetchProducts()
  ])

  return (
    <main>
      <div className="my-6 flex items-center justify-between">
        <h1 className="text-slate-800 text-3xl font-medium dark:text-slate-200">Create Order</h1>
      </div>

      <div className="border border-slate-200 bg-white dark:bg-slate-700 rounded-md dark:border-slate-500">
        <CreateOrderForm customers={customers} products={products} />
      </div>
    </main>
  )
}