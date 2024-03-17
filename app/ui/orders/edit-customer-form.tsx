'use client'

import { Customer } from "@/app/lib/models"
import { WrenchIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type Props = {
  customer: Customer
}

export default function CustomerForm({ customer }: Props) {
  const [isReadOnly, setIsReadyOnly] = useState(true)

  const [form, setForm] = useState({
    firstName: customer.first_name,
    lastName: customer.last_name,
    email: customer.email,
    phone: customer.phone,
    streetOne: customer.address_street_one,
    streetTwo: customer.address_street_two,
    city: customer.address_city,
    state: customer.address_state,
    zipcode: customer.address_zipcode
  })

  const handleFormChange = (target: string, value: string) => {
    setForm(form => ({
      ...form,
      [target]: value
    }))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-slate-800 text-lg font-medium dark:text-slate-200">CUSTOMER</h2>

        <button type="button" className="px-4 py-3 inline-flex items-center uppercase font-medium tracking-wide text-slate-600 bg-slate-200/70 hover:bg-slate-200 rounded-md dark:text-slate-100 dark:bg-slate-400/70 dark:hover:bg-slate-400" onClick={() => setIsReadyOnly(!setIsReadyOnly)}>
          <WrenchIcon className="w-4 h-4 mr-2" />
          <span>Update</span>
        </button>
      </div>
      
      <form action="">
        <div className="text-slate-700 dark:text-slate-200 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full relative group">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={(e) => handleFormChange('firstName', e.currentTarget.value)}
              disabled={isReadOnly}
              className="block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
          </div>

          <div className="w-full relative group">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={(e) => handleFormChange('lastName', e.currentTarget.value)}
              disabled={isReadOnly}
              className="block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
          </div>

          <div className="w-full relative group">
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={(e) => handleFormChange('email', e.currentTarget.value)}
              disabled={isReadOnly}
              className="block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>

          <div className="w-full relative group">
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={(e) => handleFormChange('phone', e.currentTarget.value)}
              disabled={isReadOnly}
              className="block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          </div>

          <div className="sm:col-span-2 relative group">
            <input
              type="text"
              id="streetOne"
              name="streetOne"
              value={form.streetOne}
              onChange={(e) => handleFormChange('streetOne', e.currentTarget.value)}
              disabled={isReadOnly}
              className="w-full block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="streetOne" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
          </div>

          <div className="sm:col-span-2 relative group">
            <input
              type="text"
              id="streetTwo"
              name="streetTwo"
              value={form.streetTwo}
              onChange={(e) => handleFormChange('streetTwo', e.currentTarget.value)}
              disabled={isReadOnly}
              className="w-full block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="streetTwo" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street</label>
          </div>

          <div className="w-full relative group">
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={(e) => handleFormChange('city', e.currentTarget.value)}
              disabled={isReadOnly}
              className="w-full block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
          </div>

          <div className="w-full relative group">
            <input
              type="text"
              id="state"
              name="state"
              value={form.state}
              onChange={(e) => handleFormChange('state', e.currentTarget.value)}
              disabled={isReadOnly}
              className="w-full block py-2.5 px-0 bg-transparent border-b-2 text-slate-700 border-slate-300 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 dark:text-slate-200 dark:border-slate-500 disabled:text-slate-500 peer"
            />
            
            <label htmlFor="state" className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
          </div>
        </div>
      </form>
    </div>
  )
}