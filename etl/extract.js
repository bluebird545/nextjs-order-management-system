const CsvReader = require('./reader')

async function extractCustomers() {
  console.log(`Extracting customers...`)
  return new CsvReader('customers.csv')
    .readRecords()
    .then((data) => {
      return data
    })
}

async function extractProducts() {
  console.log(`Extracting products...`)
  return new CsvReader('products.csv')
    .readRecords()
    .then((data) => {
      return data
    })
}

async function extractOrders() {
  console.log(`Extracting orders...`)
  return new CsvReader('orders.csv')
    .readRecords()
    .then((data) => {
      return data
    })
}

async function extractOrderDetails() {
  console.log(`Extracting order details...`)
  return new CsvReader('order_details.csv')
    .readRecords()
    .then((data) => {
      return data
    })
}

async function extractRevenue() {
  console.log(`Extracting revenue...`)
  return new CsvReader('revenue.csv')
    .readRecords()
    .then((data) => {
      return data
    })
}

module.exports = { extractCustomers, extractProducts, extractOrders, extractOrderDetails, extractRevenue }