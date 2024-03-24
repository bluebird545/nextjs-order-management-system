const db = require('../app/lib/db')

async function loadCustomers(customers) {
  console.log(`Seeding customers into database...`)

  try {
    const result = await Promise.all(
      customers.map(
        (customer) => db.query({
          text: `
            INSERT INTO customers(id, first_name, last_name, email, phone, address_street_one, address_street_two, address_city, address_state, address_zipcode)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (id) DO NOTHING;
          `,
          values: Object.values(customer)
        })
      )
    )

    db.query(`SELECT setval('customers_id_seq', (SELECT MAX(id) from "customers"))`)

    console.log(`Seeded ${result.length} customers`)
  } catch (error) {
    console.log(`Error seeding customer data: `, error)
    throw error
  }
}

async function loadProducts(products) {
  console.log(`Seeding products into database...`)

  try {
    const result = await Promise.all(
      products.map(
        (product) => db.query({
          text: `
            INSERT INTO products(id, name, price, description, category, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO NOTHING;
          `,
          values: Object.values(product)
        })
      )
    )

    db.query(`SELECT setval('products_id_seq', (SELECT MAX(id) from "products"))`)

    console.log(`Seeded ${result.length} products`)
  } catch (error) {
    console.log(`Error seeding product data: `, error)
    throw error
  }
}

async function loadOrders(orders) {
  console.log(`Seeding orders into database...`)

  try {
    const result = await Promise.all(
      orders.map(
        (order) => db.query({
          text: `
            INSERT INTO orders(id, customer_id, total, date, status)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO NOTHING;
          `,
          values: Object.values(order)
        })
      )
    )

    db.query(`SELECT setval('orders_id_seq', (SELECT MAX(id) from "orders"))`)

    console.log(`Seeded ${result.length} orders`)
  } catch (error) {
    console.log(`Error seeding orders data: `, error)
    throw error
  }
}

async function loadOrderDetails(orderDetails) {
  console.log(`Seeding order details into database...`)
  try {
    const result = await Promise.all(
      orderDetails.map(
        (order) => db.query({
          text: `
            INSERT INTO order_details(id, order_id, product_id, quantity)
            VALUES($1, $2, $3, $4)
            ON CONFLICT (id) DO NOTHING;
          `,
          values: Object.values(order)
        })
      )
    )

    db.query(`SELECT setval('order_details_id_seq', (SELECT MAX(id) from "order_details"))`)

    console.log(`Seeded ${result.length} order_details`)
  } catch (error) {
    console.log(`Error seeding order details data: `, error)
    throw error
  }
}

async function loadRevenue(revenue) {
  console.log(`Seeding revenue into database...`)

  try {
    const result = await Promise.all(
      revenue.map(
        (data) => db.query({
          text: `
            INSERT INTO revenue(month, year, revenue)
            VALUES($1, $2, $3);
          `,
          values: Object.values(data)
        })
      )
    )

    // db.query(`SELECT setval('revenue_id_seq', (SELECT MAX(id) from "revenue"))`)
    
    console.log(`Seeded ${result.length} revenue`)
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function load({ customers, products, orders, orderDetails, revenue }) {
  try {
   await Promise.all([
      loadCustomers(customers),
      loadProducts(products),
      loadOrders(orders),
      loadOrderDetails(orderDetails),
      loadRevenue(revenue)
    ])
  } catch (error) {
    throw `Error loading database; `, error
  }
}

module.exports = { load }