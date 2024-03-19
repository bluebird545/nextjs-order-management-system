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

function transformRevenue(revenue) {
  // transform month to 4 chars; January -> Jan
  return revenue
}

module.exports = { transformCustomer, transformProduct, transformOrder, transformOrderDetail, transformRevenue }