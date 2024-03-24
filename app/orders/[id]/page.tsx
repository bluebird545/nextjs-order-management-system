import { fetchOrderById } from "@/app/lib/services/order"
import { fetchCustomerById } from "@/app/lib/services/customer"
import Breadcrumbs from "@/app/ui/common/breadcrumbs"
import OrderDetails from "@/app/ui/orders/order-details"
import { PencilIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

type Props = {
  params: { id: string }
}
export default async function Page({ params }: Props) {
  const orderId = Number(params.id)

  const { order, orderItems } = await fetchOrderById(orderId)
  const customer = await fetchCustomerById(order.customer_id)

  return (
    <main className="">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Orders', href: '/orders' },
          { label: `Details`, href: `/orders/${orderId}`, active: true },
        ]}
      />
      
      <div className="space-y-8">
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <h1 className="text-slate-800 text-3xl font-medium dark:text-slate-200">Order <span className="font-light">#{orderId}</span></h1>
          </div>

          <div className="inline-flex items-center gap-x-4">
            <Link href={`/orders/${orderId}/edit`} className="inline-flex items-center dark:text-slate-200 hover:underline">
              <PencilIcon className="w-4 mr-2" />
              <span>Edit Order</span>
            </Link>

            <Link href={`/orders`} className="py-2  px-3 rounded-md bg-blue-300 hover:bg-blue-400">Back To Orders</Link>
          </div>
        </div>

        { orderItems ? (
          <OrderDetails order={order} orderItems={orderItems} customer={customer} />
        ) : (
          <div className="w-full border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500 flex items-center justify-center p-8">
            <p className="text-2xl font-medium">No order items.</p>
          </div>
        )}
      </div>
    </main>
  )
}