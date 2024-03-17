function CardSkeleton() {
  return <div className={`w-1/2 h-36 px-4 py-6 flex rounded-md bg-gradient-to-bl from-gray-50 to-gray-200 md:w-1/4`}></div>
}

function ChartSkeletion() {
  return (
    <div className='col-span-8 border-4 border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500'>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
            <div className="mb-4 h-4 w-36 rounded-md bg-gray-100" />
          </div>
          <div className="mb-4 h-4 w-36 rounded-md bg-gray-100" />
        </div>

        <div className="mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4" />

      </div>
    </div>
    )
  }
  
  export default function DashboardSkeleton() {
    return(
      <div className="overflow-hidden relative shimmer">
      <div className='w-full my-6'>
        <div className="h-7 w-40 rounded-md bg-gray-100 text-2xl font-medium" />
      </div>
      
      <div className="flex flex-wrap gap-x-4 md:flex-nowrap">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
      <div className='w-full grid grid-cols-12 gap-x-4 mt-12'>
        <ChartSkeletion />

        <div className="col-span-4 border-4 border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500"></div>
      </div>
    </div>
  )
}