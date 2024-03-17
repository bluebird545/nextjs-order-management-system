import * as Product from '../data/Product'

export async function fetchProducts(query?: string, filter?: string, sort?: string, page?: number) {
  try {
    const products: Product.IProduct[] = await Product.findAll(query, filter, sort, page)

    return products
    
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch products')
  }
}

export async function fetchProductPages(query: string, filter: string) {
  return await Product.findProductPages(query, filter)
}