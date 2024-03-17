export const formatCurrency = (amount: number, prefix?: string) => {
  return prefix ? `${prefix}${new Intl.NumberFormat('en-US').format(amount)}` : new Intl.NumberFormat('en-US').format(amount)
}

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat(locale, options)
  return formatter.format(date)
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export const formatRevenueChart = (revenue: any) => {
  const groupByYear = (fn: any) => [(acc: any, item: any) => ((acc[fn(item)] ??= []).push(item), acc), {}];

  const revByYear = revenue.reduce(...groupByYear((x: any) => x.year))

  const data = {
    options: {
      chart: {
        type: 'area',
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'month',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
  }

  data.series = Object.keys(revByYear).map((key) => {
    return {
      name: key,
      data: Object.values(revByYear[key]).map(({ revenue }: any) => revenue)
    }
  })

  return data
}