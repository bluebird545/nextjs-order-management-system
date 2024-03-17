'use client'

import dynamic from "next/dynamic"
import { formatCurrency } from "../lib/utils"
import { useState } from "react"

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Props = {
  title: string
  value?: number
  data: any
}
export default function Chart({ title, data, value }: Props) {

  const defaultOptions = {
    theme: {
      // mode: 'dark'
    },
    chart: {
      id: 'apexchart',
      height: "100%",
      width: "100%",
      dropShadow: { enabled: false },
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false
    },
  }

  const [chartOptions] = useState({ ...defaultOptions, ...data })

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          { value && <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{formatCurrency(value, '$')}</h5>}
          <p className="text-lg font-normal text-gray-500 dark:text-gray-200">{title}</p>
        </div>
      </div>

      <div>
        <ApexChart type='area' {...chartOptions} height={380} width={'100%'} className="text-slate-800 dark:text-slate-200" />
      </div>
    </div>
  )
}