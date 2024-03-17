import { IOrder } from "@/app/lib/data/Order"

type Props = {
  order?: IOrder
  onStatusChange: Function
}

export default function StatusInput({ order, onStatusChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStatusChange('status', e.target.value)
  }
  return (
    <fieldset className="mb-4">
      <legend className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        Set order status
      </legend>
      <div className="px-[14px] py-3 border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500">
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              id="pending"
              name="status"
              type="radio"
              value="pending"
              defaultChecked={order && order.status === 'pending'}
              onChange={(e) => handleChange(e)}
              className="h-4 w-4 cursor-pointer border-slate-300 bg-slate-100 text-slate-600"
            />
            <label
              htmlFor="pending"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-violet-100 text-violet-600"
            >
              Pending 
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="hold"
              name="status"
              type="radio"
              value="on hold"
              defaultChecked={order && order.status === 'on hold'}
              onChange={(e) => handleChange(e)}
              className="h-4 w-4 cursor-pointer border-slate-300 bg-slate-100 text-slate-600"
            />
            <label
              htmlFor="hold"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-600"
            >
              On Hold 
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="completed"
              name="status"
              type="radio"
              value="completed"
              defaultChecked={order && order.status === 'completed'}
              onChange={(e) => handleChange(e)}
              className="h-4 w-4 cursor-pointer border-slate-300 bg-slate-100 text-slate-600"
            />
            <label
              htmlFor="completed"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-green-100 text-green-600"
            >
              Completed
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cancelled"
              name="status"
              type="radio"
              value="cancelled"
              defaultChecked={order && order.status === 'cancelled'}
              onChange={(e) => handleChange(e)}
              className="h-4 w-4 cursor-pointer border-slate-300 bg-slate-100 text-slate-600"
            />
            <label
              htmlFor="cancelled"
              className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-red-100 text-red-600"
            >
              Cancelled
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  )
}