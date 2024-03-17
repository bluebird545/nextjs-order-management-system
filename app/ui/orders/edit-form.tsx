'use client'

import { useCallback, useEffect, useState } from "react"
import { IOrder } from "@/app/lib/data/Order"
import { IOrderItem } from "@/app/lib/data/OrderItem"
import { ICustomer } from "@/app/lib/data/Customer"
import { IProduct } from "@/app/lib/data/Product"
import { updateOrder } from "@/app/lib/services/order"
import Link from "next/link"
import ProductSelectInput from "./product-selection-input"
import CustomerSelectionInput from "./customer-selection-input"
import StatusInput from "./status-input"
import OrderTotal from "./order-total"

type Props = {
  order: IOrder
  orderItems: IOrderItem[]
  customers: ICustomer[]
  products: IProduct[]
}

export default function EditOrderForm({ order, orderItems: items, customers, products }: Props) {
  const [orderTotal, setOrderTotal] = useState(order.total)
  const [customerId, setCustomerId] = useState<number | null>(order.customer_id)
  const [orderStatus, setOrderStatus] = useState<string | null>(order.status)
  const [orderItems, setOrderItems] = useState<{ id: number, quantity: number }[]>([])

  const handleInputChange = (name: string, value: any) => {
    if (name === 'customerId') setCustomerId(value)
    
    if (name === 'items') setOrderItems(value)
    
    if (name === 'status') setOrderStatus(value)
  }

  const handleTotalChange = useCallback((value: number) => {
    setOrderTotal(value)
  }, [])

  const updateOrderWithId = updateOrder.bind(
    null,
    order.id,
    {
      customerId,
      status: orderStatus,
      items: orderItems,
      total: orderTotal
    }
  )

  useEffect(() => {
    if (items && items.length > 0) {
      setOrderItems(items.map((item) => ({ id: item.product_id, quantity: item.quantity })))
    }
  }, [])

  return (
    <form action={updateOrderWithId}>
      <div className="p-4 md:p-6">
        <CustomerSelectionInput
          customers={customers}
          seletedCustomerId={order.customer_id}
          onCustomerChange={handleInputChange}
        />

        <StatusInput
          order={order}
          onStatusChange={handleInputChange}
        />

        <ProductSelectInput
          canSelectNewProducts={false}
          orderItems={items}
          products={products}
          onOrderItemChange={handleInputChange}
        />

        <OrderTotal
          orderItems={orderItems.map((item) => ({ ...item, price: products.find((p) => p.id === item.id)?.price || 0 }))}
          onTotalChange={handleTotalChange}
        />

      </div>

      <div className="flex items-center justify-end gap-x-2 my-8 mr-4 md:mr-6">
        <Link href={`/orders/${order.id}`} className="px-4 py-2 rounded-full text-blue-400 border border-slate-300 hover:border-slate-600 hover:text-blue-600">Cancel</Link>

        <button type="submit" className="px-4 py-2 rounded-full text-slate-100 bg-blue-400 hover:bg-blue-600">Save Order</button>
      </div>
    </form>
  )
}