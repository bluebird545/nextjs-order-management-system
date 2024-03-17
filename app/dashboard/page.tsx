import {
  fetchDashboardData
} from '@/app/lib/data'
import Card from '@/app/ui/dashboard/card'
import Chart from '@/app/ui/chart'
import DashboardSkeleton from '../ui/dashboard/skeleton'
import { formatRevenueChart } from '../lib/utils'

export default async function Page() {
  const {
    numOfOrders,
    numOfPendingOrders,
    numOfCompletedOrders,
    numOfCancelledOrders,
    numOfCustomers,
    totalRevenue,
    totalRevenueByYear
  } = await fetchDashboardData()

  const formattedRevData = formatRevenueChart(totalRevenue)
  
  return (
    <main>      
      <div className='w-full my-6'>
        <h1 className="text-slate-800 text-2xl font-medium dark:text-slate-200">Dashboard</h1>
      </div>

      <div className="flex flex-wrap gap-x-4 md:flex-nowrap">
        <Card title='Total Orders' value={numOfOrders} type='total' trend='increase' trendValue={12} />
        <Card title='Total Customers' value={numOfCustomers} type='customers' trend='increase' trendValue={24.12} />
        <Card title='Pending Orders' value={numOfPendingOrders} type='pending' trend='decrease' trendValue={4.15} />
        <Card title='Cancelled Orders' value={numOfCancelledOrders} type='cancelled' trend='decrease' trendValue={0.123} />
      </div>

      <div className='w-full mt-12'>
        <div className='w-full border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500'>
          <Chart title='Total Revenue' data={formattedRevData}  />
        </div>
      </div>
    </main>
  )
}