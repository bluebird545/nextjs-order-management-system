import * as db from '@/app/lib/db'

export interface IProduct {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
}

export async function create() {}

export async function findAll(query?: string, filter?: string, sort?: string, page?: number) {
  const ORDERS_PER_PAGE = 10

  const sortBy = sort && sort.substring(0, sort.lastIndexOf("_"))
  const sortDir = sort && sort.substring(sort.lastIndexOf("_") + 1).toUpperCase()

  try {
    let statement = { text: '' }

    if (page) {
      const offset = (page - 1) * ORDERS_PER_PAGE

      statement.text = `
        SELECT * FROM products
        WHERE
          name ILIKE $$%${query}%$$ AND
          category ILIKE $$%${filter}%$$
        ORDER BY ${sort ? `${sortBy} ${sortDir}` : 'id'}
        LIMIT ${ORDERS_PER_PAGE} OFFSET ${offset};
      `
    } else {
      statement.text = `
        SELECT * FROM products
        ORDER BY ${sort ? `products.${sortBy} ${sortDir}` : 'id'};
      `
    }

    const result = await db.query(statement)

    if (result.rows.length > 0) return result.rows
    else return null
    
  } catch (error) {
    throw error
  }
}

export async function findProductPages(query: string, filter: string) {
  try {
    const statement = `
      SELECT COUNT(*)
      FROM products
      WHERE
        name ILIKE $$%${query}%$$ AND
        category ILIKE $$%${filter}%$$;
    `

    const result = await db.query(statement)

    return Math.ceil(Number(result.rows[0].count / 10))
  } catch (error) {
    throw error
  }
}