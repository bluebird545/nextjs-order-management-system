'use client'

import { IOrder } from "@/app/lib/data/Order"
import { IOrderItem } from "@/app/lib/data/OrderItem"
import { Customer } from "@/app/lib/models"
import OrderTotal from "./order-total"
import Image from "next/image"
import CustomerForm from "./edit-customer-form"

type Props = {
  order: IOrder
  orderItems: IOrderItem[]
  customer: Customer
}

export default function OrderDetails({ order, orderItems, customer }: Props) {
  return (
    <div>
      <div className="w-full border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500">

        <table className="w-full text-left text-slate-800 dark:text-slate-200">
          <thead className="text-base text-slate-400 tracking-wide border-b border-slate-200 dark:border-slate-500">
            <tr>
              <th colSpan={4} className="px-6 py-3 whitespace-nowrap">Ordered Items</th>
            </tr>
          </thead>

          <tbody>
            {
              orderItems.map((orderItem: any) => (
                <tr key={orderItem.id} className="hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-200 dark:border-slate-500">
                  <td className="px-6 py-4 inline-flex">
                    <div className="border rounded-md h-16 w-16 overflow-hidden">
                      <Image src={orderItem.image} width={50} height={50} alt={`Image of product ${orderItem.name}`} className="w-full h-full object-cover object-center" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {orderItem.name}
                  </td>
                  <td className="px-6 py-4">${orderItem.price} <span>X</span> ${orderItem.quantity}</td>
                  <td className="px-6 py-4">${orderItem.price * orderItem.quantity}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <OrderTotal orderItems={orderItems} />
      </div>

      <div className="mt-8 w-full border border-slate-200 p-6 dark:bg-slate-700 rounded-md dark:border-slate-500">
        <CustomerForm customer={customer} />
      </div>
    </div>
  )
}