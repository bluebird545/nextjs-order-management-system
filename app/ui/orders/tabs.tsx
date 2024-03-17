'use client'

import { IOrder } from "@/app/lib/data/Order"
import { IOrderItem } from "@/app/lib/data/OrderItem"
import { OrderCustomer, OrderDetailsProduct } from "@/app/lib/models"
import { formatDateToLocal } from "@/app/lib/utils"
import { CheckIcon, CreditCardIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type Props = {
  order: IOrder
}

export default function OrderOverview({ order }: Props) {
  const [currentTab, setCurrentTab] = useState('tab-item-1')

  const [showStatusChange, toggleStatusChange] = useState(false)

  const [status, setStatus] = useState(order.status)
  const statusOptions = ['pending', 'completed', 'cancelled', 'on hold']

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    toggleStatusChange(!showStatusChange)
  }

  return (
    <div>
      <nav aria-label="Tabs" role="tablist" className="flex space-x-2">
        <button
          type="button"
          id="tab-item-1"
          data-hs-tab="#tab-item-1"
          aria-controls="tab-item-1"
          role="tab"
          className={`py-4 px-1 border-b-2 border-transparent text-slate-800 text-lg font-medium dark:text-slate-200 ${ currentTab === 'tab-item-1' ? 'border-b-blue-500' : '' }`}
          onClick={() => setCurrentTab('tab-item-1')}
        >OVERVIEW</button>

        <button
          type="button"
          id="tab-item-2"
          data-hs-tab="#tab-item-2"
          aria-controls="tab-item-2"
          role="tab"
          className={`py-4 px-1 border-b-2 border-transparent text-slate-800 text-lg font-medium dark:text-slate-200 ${ currentTab === 'tab-item-2' ? 'border-b-blue-500' : '' }`}
          onClick={() => setCurrentTab('tab-item-2')}
        >NOTES</button>
      </nav>

      <div className="mt-3">
        <div
          id="tabs-1"
          aria-labelledby="tab-item-1"
          role="tabpanel"
          className={`text-slate-700 dark:text-slate-200 ${ currentTab === 'tab-item-1' ? '' : 'hidden' }`}
        >
          <div className="flex item-center justify-between text-xl mb-3">
            <div>CREATED</div>

            <div>{formatDateToLocal(order.date)}</div>
          </div>
          <div className="flex item-center justify-between text-xl mb-3">
            <div>STATUS</div>
            <div className="relative">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="lastDaysdropdown"
                data-dropdown-placement="bottom"
                onClick={() => toggleStatusChange(!showStatusChange)}
                className={`inline-flex items-center py-2 px-3 rounded-full uppercase font-medium ${status === 'pending' && 'bg-violet-100 text-violet-600'} ${status === 'cancelled' && 'bg-red-100 text-red-600'} ${status === 'completed' && 'bg-green-100 text-green-600'} ${status === 'on hold' && 'bg-blue-100 text-blue-600'}`}
                type="button">
                  {status}
                <svg className="w-2.5 ml-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>

              {
                showStatusChange && (
                  <div id="lastDaysdropdown" className="absolute right-8 z-10 bg-white divide-y divide-slate-100 rounded-lg shadow w-44 dark:bg-slate-700">
                    <ul className="text-sm text-slate-700 dark:text-slate-200" aria-labelledby="dropdownDefaultButton">
                      { statusOptions.map((status: string) => (
                        <li key={status}>
                          <button onClick={() => handleStatusChange(status)} className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{status}</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        <div
          id="tab-2"
          aria-labelledby="tab-item-2"
          role="tabpanel"
          className={`${ currentTab === 'tab-item-2' ? '' : 'hidden' }`}
        >
          {/* TAB 2 CONTENT */}
          <div>
            <div className="flex items-center justify-center mt-20 text-violet-300 text-2xl">COMING SOON...</div>
          </div>
        </div>
      </div>
    </div>
  )
}