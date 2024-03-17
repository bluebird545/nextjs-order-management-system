import * as db from '@/app/lib/db'

export interface IOrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  name: string
  price: number
  total_price: number
  description: string
  image: string
}

export async function create(data: any) {
  try {
    const statement = {
      text: `
        INSERT INTO order_details (order_id, product_id, quantity)
        VALUES ($1, $2, $3);
      `,
      values: Object.values(data)
    }

    await db.query(statement)

  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to update order item.')
  }
}

export async function update(orderId: number, data: { productId: number, quantity: number }) {
  try {
    const statement = {
      text: `
        UPDATE order_details
        SET
          product_id = $1,
          quantity = $2
        WHERE order_id = ${orderId} AND product_id = $1;
      `,
      values: Object.values(data)
    }

    await db.query(statement)

  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to update order item.')
  }
}

export async function findInOrder(order_id: number) {
  try {
    const query = {
      text: `
        WITH temporary_order AS ( SELECT * FROM order_details WHERE order_id = $1 )
        SELECT
          temporary_order.*,
          products.name,
          products.price,
          products.price * temporary_order.quantity AS "total_price",
          products.description,
          products.image
        FROM temporary_order
        JOIN products
        ON temporary_order.product_id = products.id
      `,
      values: [order_id]
    }

    const result = await db.query(query)

    if (result.rows.length > 0) return result.rows
    else return null

  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch order item.')
  }
}

export async function findOne(data: any) {
  try {
    const statement = {
      text: `
        SELECT
          order_details.*,
          products.name,
          products.price * order_details.quantity AS "total_price",
          products.description
        FROM order_details
        JOIN products
          ON order_details.product_id = products.id
        WHERE order_id = $1 AND product_id = $2;
      `,
      values: Object.values(data)
    }

    const result = await db.query(statement)

    // check for valid results
    if (result.rows.length > 0) return result.rows[0]
    else return null
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch order item.')
  }
}

// export async function delete() {}