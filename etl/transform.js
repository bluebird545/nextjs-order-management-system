function transformCustomer(customer) {
  return customer
}

function transformProduct(product) {
  return product
}

function transformOrder(order) {
  return {
    id: order.order_id,
    customer_id: order.customer_id,
    total: order.order_total_usd,
    date: order.order_date,
    status: order.order_status.toLowerCase(),
  }
}

function transformOrderDetail(orderDetails) {
  return orderDetails
}

function transformRevenue({ month, year, revenue }) {
  // transform month to 4 chars; January -> Jan
  return {
    month: month,
    year: Number(year),
    revenue: Number(revenue)
  }
}

module.exports = { transformCustomer, transformProduct, transformOrder, transformOrderDetail, transformRevenue }