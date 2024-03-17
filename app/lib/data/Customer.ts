import * as db from '@/app/lib/db'

export interface ICustomer {
  id: string,
  first_name: string
  last_name: string
  email: string
  phone: string
  address_street_one: string
  address_street_two: string
  address_city: string
  address_state: string
  address_zipcode: string
}

export async function create() {}

export async function findAll(query?: string, filter?: string, sort?: string, page?: number) {
  const ORDERS_PER_PAGE = 10

  const sortBy = sort && sort.substring(0, sort.lastIndexOf("_"))
  const sortDir = sort && sort.substring(sort.lastIndexOf("_") + 1).toUpperCase()
  
  try {
    let statement = { text: ''}

    if (page) {
      const offset = (page - 1) * ORDERS_PER_PAGE
      
      statement.text = `
        SELECT * FROM customers
        WHERE
          customers.first_name ILIKE '%${query}%' OR
          customers.last_name ILIKE '%${query}%' OR
          customers.email ILIKE '%${query}%'
        ORDER BY ${sort ? `customers.${sortBy} ${sortDir}` : 'id'}
        LIMIT ${ORDERS_PER_PAGE} OFFSET ${offset};
      `
    } else {
      statement.text = `SELECT * FROM customers ORDER BY id;`
    }

    const result = await db.query(statement)

    if (result.rows.length > 0) return result.rows
    else return null
    
  } catch (error) {
    throw error
  }
}

export async function getCustomerPages(query: string, filter: string) {
  try {
    const statment = `
      SELECT COUNT(*)
      FROM customers
      WHERE
        customers.first_name ILIKE '%${query}%' OR
        customers.last_name ILIKE '%${query}%'
      ;
    `

    const result = await db.query(statment)

    return Math.ceil(Number(result.rows[0].count) / 10)
  } catch (error) {
    throw error
  }
}

export async function findById(id: number) {
  try {
    const query = {
      text: `
        SELECT * FROM customers WHERE id = $1;
      `,
      values: [id]
    }

    const result = await db.query(query)

    if (result.rows.length > 0) return result.rows[0]
    else return null
    
  } catch (error) {
    throw error
  }
}