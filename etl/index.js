const createDatabase = require('./createDatabase')

const { load } = require('./load')

const {
  extractCustomers,
  extractProducts,
  extractOrders,
  extractOrderDetails,
  extractRevenue,
} = require('./extract')

const {
  transformCustomer,
  transformProduct,
  transformOrder,
  transformOrderDetail,
  transformRevenue
} = require('./transform')

async function extractCsv() {
  try {
    const [extractedCustomers, extractedProducts, extractedOrders, extractedOrderDetails, extractedRevenue] = await Promise.all([
      extractCustomers(),
      extractProducts(),
      extractOrders(),
      extractOrderDetails(),
      extractRevenue()
    ])

    return {
      customers: extractedCustomers,
      products: extractedProducts,
      orders: extractedOrders,
      orderDetails: extractedOrderDetails,
      revenue: extractedRevenue
    }
  } catch (error) {
    throw `Error extracting data; ${error}`
  }
}

async function transformCsv(data) {
  try {
    const [customers, products, orders, orderDetails, revenue] = await Promise.all([
      data.customers.map((customer) => transformCustomer(customer)),
      data.products.map((product) => transformProduct(product)),
      data.orders.map((order) => transformOrder(order)),
      data.orderDetails.map((orderDetail) => transformOrderDetail(orderDetail)),
      data.revenue.map((rev) => transformRevenue(rev)),
    ])

    return {
      customers,
      products,
      orders,
      orderDetails,
      revenue
    }
  } catch (error) {
    throw `Error transforming data; `, error
  }
}

async function main() {
  console.log(`Starting ETL pipeline`)

  // create database
  await createDatabase()

  // read/extract data from csv
  const extractedData = await extractCsv()

  // transform data
  const transformedData = await transformCsv(extractedData)

  // load data
  await load(transformedData)
  console.log(`Completed ETL`)
  process.exit()
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting ETL pipeline:',
    err,
  );
})