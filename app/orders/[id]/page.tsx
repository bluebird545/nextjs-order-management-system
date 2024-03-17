import { fetchOrderById } from "@/app/lib/services/order"
import { fetchCustomerById } from "@/app/lib/services/customer"
import Breadcrumbs from "@/app/ui/common/breadcrumbs"
import CustomerForm from "@/app/ui/orders/edit-customer-form"
import { PencilIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import OrderOverview from "@/app/ui/orders/tabs"

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

        <div className="grid grid-cols-12 gap-x-4">
          <div className="md:col-span-8 p-4 border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500">

            <OrderOverview order={order} />
          </div>

          <div className="md:col-span-4 p-4 border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500">
            <CustomerForm customer={customer} />
          </div>
        </div>

        <div className="w-full border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500">
          { orderItems ? (
            <table className="w-full text-left text-slate-800 dark:text-slate-200">
              <thead className="text-base text-slate-400 tracking-wide border-b border-slate-200 dark:border-slate-500">
                <tr>
                  <th className="p-4">#</th>
                  <th className="px-6 py-4"></th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Quantity</th>
                </tr>
              </thead>

              <tbody>
                {
                  orderItems.map((orderItem: any) => (
                    <tr key={orderItem.id} className="hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-200 dark:border-slate-500">
                      <td className="w-4 p-4">
                        <input type="checkbox" name="" id="" />
                      </td>
                      <td className="px-6 py-4 inline-flex">
                        <div className="border rounded-md h-16 w-16 overflow-hidden">
                          <Image src={orderItem.image} width={50} height={50} alt={`Image of product ${orderItem.name}`} className="w-full h-full object-cover object-center" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {orderItem.name}
                      </td>
                      <td className="px-6 py-4">{orderItem.price}</td>
                      <td className="px-6 py-4">{orderItem.quantity}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center p-8">
              <p className="text-2xl font-medium">No order items.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}