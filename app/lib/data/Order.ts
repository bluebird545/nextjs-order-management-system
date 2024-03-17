import * as db from '@/app/lib/db'

export interface IOrder {
  id: number
  customer_id: number
  first_name?: string
  last_name?: string
  date?: any
  total?: number
  status: string
  num_items?: number
}

export async function create(data: any) {
  try {    
    const date = new Date().toISOString().split('T')[0]

    const statement = {
      text: `
        INSERT INTO orders(customer_id, date, status, total)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
      `,
      values: [data.customer_id, date, data.status, data.total]
    }

    const result = await db.query(statement)

    if (result.rows.length > 0) return result.rows[0].id
    else return null

  } catch (error) {
    throw error
  }
}

export async function update(data: IOrder) {
  try {
    const statement = {
      text: `
        UPDATE orders
        SET
          customer_id = $2,
          status = $3,
          total = $4
        WHERE id = $1;
      `,
      values: [data.id, data.customer_id, data.status, data.total]
    }

    await db.query(statement)

  } catch (error) {
    throw error
  }
}

export async function findAll(query: string, filter: string, sort: string, page: number) {
  const ORDERS_PER_PAGE = 10

  const offset = (page - 1) * ORDERS_PER_PAGE

  const sortBy = sort.substring(0, sort.lastIndexOf("_"))
  const sortDir = sort.substring(sort.lastIndexOf("_") + 1).toUpperCase()
  const sortFrom = sortBy !== 'first_name' ? 'orders.' : 'customers.'

  try {
    const statement = `
      SELECT orders.*, customers.first_name, customers.last_name
      FROM orders
      INNER JOIN customers ON orders.customer_id = customers.id
      WHERE
        (customers.first_name ILIKE '%${query}%' OR
        customers.last_name ILIKE '%${query}%' OR
        orders.id::text ILIKE '%${query}%') AND
        orders.status ILIKE '%${filter}%'
      ORDER BY ${sort ? `${sortFrom}${sortBy} ${sortDir}` : 'orders.date DESC'}
      LIMIT ${ORDERS_PER_PAGE} OFFSET ${offset};
    `
    
    const result = await db.query(statement)

    return result.rows
  } catch (error) {
    throw error
  }
}

export async function findById(id: number) {
  try {
    const query = `
      WITH items AS ( SELECT order_id, SUM(quantity) AS "num_items" FROM order_details WHERE order_id = $1 GROUP BY order_id )
      SELECT orders.*,
      CASE WHEN items.num_items IS NULL THEN 0 ELSE items.num_items::integer END
      FROM orders
      LEFT JOIN items
      ON orders.id = items.order_id
      WHERE orders.id = $1;
    `

    const result = await db.query(query, [id])

    if (result.rows.length > 0) return result.rows[0]
    else return null

  } catch (error) {
    throw error
    // console.error('Database Error: ', error)
    // throw new Error('Failed to fetch order.')
  }
}

export async function getOrderPages(query: string, filter: string) {
  try {
    const orderCount = await db.query(`
      SELECT COUNT(*)
      FROM orders
      JOIN customers ON orders.customer_id = customers.id
      WHERE
        (customers.first_name ILIKE '%${query}%' OR
        customers.last_name ILIKE '%${query}%' OR
        orders.id::text ILIKE '%${query}%') AND
        orders.status ILIKE '%${filter}%';
    `)
  
    return Math.ceil(Number(orderCount.rows[0].count / 10))

  } catch (error) {
    throw error
  }
}

// module.exports = Order