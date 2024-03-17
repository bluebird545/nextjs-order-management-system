import {
  DocumentPlusIcon,
  PresentationChartLineIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline'
import styles from '@/app/ui/dashboard/dashboard.module.scss'

interface Props {
  title: string
  value: number
  type: 'total' | 'customers' | 'pending' | 'cancelled'
  trend?: 'increase' | 'decrease'
  trendValue?: number
}

const iconMap = {
  total: DocumentPlusIcon,
  pending: CurrencyDollarIcon,
  customers: UserGroupIcon,
  cancelled: PresentationChartLineIcon
}

export default function Card(props: Props) {
  const Icon = iconMap[props.type];

  return (
    <div className={`w-1/2 px-4 py-6 flex rounded-md text-slate-200 bg-gradient-to-bl from-slate-300 md:w-1/4 ${styles.card}`}>
      <div className='flex-1'>
        <p className='text-lg'>{props.title}</p>
        <h3 className='text-3xl'>{props.value}</h3>

        {
          props.trend && (
            <div className='bg-slate-200 flex gap-x-0.5 w-fit p-2 rounded-md text-sm mt-2'>
              {
                props.trend === 'increase'
                ? (
                    <>
                      <span className='text-green-500'>{props.trendValue}%</span>
                      <ArrowTrendingUpIcon className='w-5 stroke-2 stroke-green-500' />
                    </>
                  )
                : (
                    <>
                      <span className='text-red-500'>{props.trendValue}%</span>
                      <ArrowTrendingDownIcon className='w-5 stroke-2 stroke-red-500' />
                    </>
                  )
                }
            </div>
          )
        }
      </div>

      <div>
        <Icon className={`${styles.icon} w-14`} />
      </div>
    </div>
  )
}