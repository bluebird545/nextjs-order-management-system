import * as db from '@/app/lib/db'

export async function fetchDashboardData() {
  const orderCount = `SELECT COUNT(*) FROM orders;`
  const pendingOrderCount = `SELECT COUNT(*) FROM orders WHERE status='pending';`
  const completedOrderCount = `SELECT COUNT(*) FROM orders WHERE status='completed';`
  const cancelledOrderCount = `SELECT COUNT(*) FROM orders WHERE status='cancelled';`

  const customerCount = `SELECT COUNT(*) FROM customers;`
  const revenue = `SELECT * FROM revenue;`
  const revenueSums = `SELECT year, SUM(revenue) FROM revenue GROUP BY YEAR;`

  const data = await Promise.all([
    db.query(orderCount),
    db.query(pendingOrderCount),
    db.query(completedOrderCount),
    db.query(cancelledOrderCount),
    db.query(customerCount),
    db.query(revenue),
    db.query(revenueSums),
  ])

  const numOfOrders = Number(data[0].rows[0].count ?? '0')
  const numOfPendingOrders = Number(data[1].rows[0].count ?? '0')
  const numOfCompletedOrders = Number(data[2].rows[0].count ?? '0')
  const numOfCancelledOrders = Number(data[3].rows[0].count ?? '0')
  const numOfCustomers = Number(data[4].rows[0].count ?? '0')

  const totalRevenue = data[5].rows
  const totalRevenueByYear = data[6].rows

  return {
    numOfOrders,
    numOfPendingOrders,
    numOfCompletedOrders,
    numOfCancelledOrders,
    numOfCustomers,
    totalRevenue,
    totalRevenueByYear
  }
}