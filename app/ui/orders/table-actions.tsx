import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function UpdateOrder({ orderId }: { orderId: number}) {
  return (
    <Link href={`/orders/${orderId}/edit`} className="hover:text-blue-300 dark:hover:text-blue-400">
      <PencilSquareIcon className="w-5 h-5" />
    </Link>
  )
}

export function DeleteOrder({ orderId }: { orderId: string }) {
  const deleteOrderWithId = deleteOrder.bind(null. id)
  return (
    <form action={deleteOrderWithId}>
      <button>
        <span>Delete Order</span>
      </button>
    </form>
  )
}