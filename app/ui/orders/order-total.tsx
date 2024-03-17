import { useEffect, useState } from "react"

type Props = {
  orderItems: {
    id: string | number
    price: number
    quantity: number
  }[]
  onTotalChange: Function
}

export default function OrderTotal({ orderItems, onTotalChange }: Props) {
  const [orderSubtotal, setOrderSubtotal] = useState(0)
  const [orderTotal, setOrderTotal] = useState(0)

  useEffect(() => {
    let subtotal = 0

    if (orderItems.length > 0) {
      orderItems.map((item) => subtotal =+ (item.price * item.quantity))

      setOrderSubtotal(subtotal)
      setOrderTotal(subtotal)
      onTotalChange(subtotal)
    }
  },
  [orderItems, onTotalChange])
  

  return (
    <div className="grid grid-cols-12 items-start gap-x-6 mb-2">
      <div className="col-span-8"></div>
      <div className="col-span-4 p-2 bg-slate-100 space-y-2 rounded-md dark:bg-slate-600">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-200">
          <p>Subtotal:</p>
          <p>${orderSubtotal}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-200">
          <p>Discount (+/-):</p>
          <p>$0</p>
        </div>

        <div className="flex items-center justify-between font-medium text-slate-600 dark:text-slate-200">
          <p>Total:</p>
          <p>${orderTotal}</p>
        </div>
      </div>
    </div>
  )
}