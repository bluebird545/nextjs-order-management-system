const db = require('../app/lib/db')

async function createCustomersTable() {
  console.log('Creating customers table...')

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL NOT NULL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255),
        address_street_one VARCHAR(255),
        address_street_two VARCHAR(255),
        address_city VARCHAR(255),
        address_state VARCHAR(255),
        address_zipcode VARCHAR(255)
      );
    `)
  } catch (error) {
    throw 'Error creating customers table'
  }
}

async function createProductsTable() {
  console.log('Creating products table...')

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
      );
    `)
  } catch (error) {
    throw 'Error creating products table'
  }
}

async function createOrdersTable() {
  console.log('Creating orders table...')

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL NOT NULL PRIMARY KEY,
        customer_id INT NOT NULL REFERENCES customers(id),
        total FLOAT NOT NULL,
        date DATE NOT NULL DEFAULT NOW(),
        status VARCHAR(255) NOT NULL
      );
    `)
  } catch (error) {
    throw 'Error creating orders orders table'
  }
}

async function createOrderDetailsTable() {
  console.log('Creating order_details table...')

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS order_details(
        id SERIAL NOT NULL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id),
        product_id INT NOT NULL REFERENCES products(id),
        quantity INT NOT NULL
      );
    `)    
  } catch (error) {
    throw 'Error creating order_details table'
  }
}

async function createRevenueTable() {
  console.log('Creating revenue table...')

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(20) NOT NULL,
        year INT NOT NULL,
        revenue INT NOT NULL
      );
    `)    
  } catch (error) {
    throw 'Error creating revenue table'
  }
}


async function createDatabase() {
  console.log('Creating database...')

  try {
      await createCustomersTable()
      await createProductsTable()
      await createOrdersTable()
      await createOrderDetailsTable()
      await createRevenueTable()
  } catch (err) {
    console.error('An error occurred while initializing the database. Error [ ', err, ' ]')
  }
}

module.exports = createDatabase