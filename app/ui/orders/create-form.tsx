'use client'

import { createOrder } from "@/app/lib/services/order"
import { useCallback, useState } from "react"
import Link from "next/link"
import StatusInput from "./status-input"
import CustomerSelectionInput from "./customer-selection-input"
import ProductSelectInput from "./product-selection-input"
import { IProduct } from "@/app/lib/data/Product"
import { ICustomer } from "@/app/lib/data/Customer"
import OrderTotal from "./order-total"

type Props = {
  customers: ICustomer[]
  products: IProduct[]
}

export default function CreateOrderForm({ customers, products }: Props) {
  const [orderTotal, setOrderTotal] = useState(0)
  const [customerId, setCustomerId] = useState<number | null>(null)
  const [orderStatus, setOrderStatus] = useState<string | null>(null)
  const [orderItems, setOrderItems] = useState<{ id: number, quantity: number }[]>([])

  const handleInputChange = (name: string, value: any) => {
    if (name === 'customerId') setCustomerId(value)
    
    if (name === 'items') setOrderItems(value)
    
    if (name === 'status') setOrderStatus(value)
  }

  const handleTotalChange = useCallback((value: number) => {
    setOrderTotal(value)
  }, [])

  const createNewOrder = createOrder.bind(
    null,
    {
      customerId,
      status: orderStatus,
      items: orderItems,
      total: orderTotal
    }
  )

  return (
    <form action={createNewOrder}>
      <div className="p-4 md:p-6">
        <CustomerSelectionInput
          customers={customers}
          onCustomerChange={handleInputChange}
        />

        <StatusInput onStatusChange={handleInputChange} />

        <ProductSelectInput
          products={products}
          onOrderItemChange={handleInputChange}
        />

        <OrderTotal
          orderItems={orderItems.map((item) => ({ ...item, price: products.find((p) => p.id === item.id)?.price || 0 }))}
          onTotalChange={handleTotalChange}
        />
      </div>

      <div className="flex items-center justify-end gap-x-2 my-8 mr-4 md:mr-6">
        <Link href='/orders' className="px-4 py-2 rounded-full text-slate-600 hover:underline">Cancel</Link>
        <button type="submit" className="px-4 py-2 rounded-full text-slate-600 bg-blue-100 hover:bg-blue-200">Create Order</button>
        {/* maybe create a prompt to confirm the creation of the order */}
      </div>
    </form>
  )
}