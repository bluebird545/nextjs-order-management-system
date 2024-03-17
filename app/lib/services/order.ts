'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as Order from '../data/Order'
import * as OrderItem from '../data/OrderItem'

const OrderSchema = z.object({
  id: z.string(),
  customerId: z.number(),
  total: z.coerce.number(),
  date: z.string(),
  status: z.enum(['pending', 'on hold', 'cancelled', 'completed'])
})

const OrderItemSchema = z.object({
  id: z.string(),
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number()
})

export async function fetchOrderPages(query: string, filter: string) {
  try {
    return await Order.getOrderPages(query, filter)
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch order pages')
  }
}

export async function fetchOrders(query: string, filter: string, sort: string, page: number) {
  try {
    const orders: Order.IOrder[] = await Order.findAll(query, filter, sort, page)

    return orders
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch orders')
  }
}

export async function fetchOrderById(id: number) {
  try {
    const order: Order.IOrder = await Order.findById(id)
  
    const orderItems: OrderItem.IOrderItem[] = await OrderItem.findInOrder(id)
  
    if (!order) throw Error('Order not found')
  
    return { order, orderItems }
    
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch order')
  }
}

const CreateOrder = OrderSchema.omit({ id: true, date: true })
const CreateOrderItem = OrderItemSchema.omit({ id: true })
const UpdateOrder = OrderSchema.omit({ id: true, date: true })

const UpdateOrderItems = OrderItemSchema.omit({ id: true, orderId: true }) 
// const OrderItems = z.array(OrderItemSchema)

export async function createOrder(formData: any) {
  const { customerId, total, status } = CreateOrder.parse({
    customerId: formData.customerId,
    total: formData.total,
    status: formData.status,
  })

  const newOrderId = await Order.create({ customer_id: customerId, status, total })
  
  // iterate through order items to create order items
  for (const item of formData.items) {

    const orderItem = CreateOrderItem.parse({
      orderId: newOrderId,
      productId: item.id,
      quantity: item.quantity
    })
  
    await OrderItem.create(orderItem)
  }
  
  revalidatePath('/orders')
  redirect('/orders')
}

export async function updateOrder(id: any, formData: any) {
  const { customerId, total, status } = UpdateOrder.parse({
    customerId: formData.customerId,
    total: formData.total,
    status: formData.status,
  })

  await Order.update({ id, customer_id: customerId, status, total })

  // iterate through order items to update order items
  for (const item of formData.items) {

    const updateOrderItem = UpdateOrderItems.parse({
      productId: item.id,
      quantity: item.quantity
    })

    // grab cartItem, if it already exists in cart
    let orderItem = await OrderItem.findOne({ order_id: id, product_id: updateOrderItem.productId })

    if (orderItem) {
      // update quantity if order item already exists
      // let updatedQuantity = orderItem.quantity + item.quantity
      let updatedQuantity = item.quantity
      // update only if quantity is not the same
      if (updatedQuantity !== orderItem.quantity) {
        orderItem = await OrderItem.update(id, updateOrderItem)
      }
    } else {
      const newOrderItem = CreateOrderItem.parse({
        orderId: id,
        productId: item.id,
        quantity: item.quantity
      })
      orderItem = await OrderItem.create(newOrderItem)
    }
  
  }

  revalidatePath('/orders')
  redirect('/orders')
}