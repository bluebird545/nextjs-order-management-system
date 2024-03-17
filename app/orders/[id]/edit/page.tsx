import { fetchOrderById } from "@/app/lib/services/order"
import { fetchCustomers } from "@/app/lib/services/customer"
import { fetchProducts } from "@/app/lib/services/product"
import EditOrderForm from "@/app/ui/orders/edit-form"

type Props = {
  params: { id: number }
}

export default async function Page({ params }: Props) {
  const orderId = params.id

  const [{ order, orderItems }, allCustomers, allProducts] = await Promise.all([
    fetchOrderById(orderId),
    fetchCustomers(),
    fetchProducts()
  ])

  return (
    <main>
      <div className="my-6 flex items-center justify-between">
        <h1 className="text-slate-800 text-3xl font-medium dark:text-slate-200">Edit Order</h1>
      </div>

      <div className="border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500">
        <EditOrderForm order={order} orderItems={orderItems} customers={allCustomers} products={allProducts} />
      </div>
    </main>
  )
}