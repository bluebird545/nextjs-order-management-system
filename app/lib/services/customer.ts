import * as Customer from '../data/Customer'

export async function fetchCustomers(query?: string, filter?: string, sort?: string, page?: number) {
  try {
    const customers: Customer.ICustomer[] = await Customer.findAll(query, filter, sort, page)
  
    // if (!customers) throw Error('Customer not found')
  
    return customers
    
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch customers')
  }
}

export async function fetchCustomerPages(query: string, filter: string) {
  return await Customer.getCustomerPages(query, filter)
}

export async function fetchCustomerById(id: number) {
  try {
    const customer: Customer.ICustomer = await Customer.findById(id)
  
    if (!customer) throw Error('Customer not found')
  
    return customer
    
  } catch (error) {
    console.error('Database Error: ', error)
    throw new Error('Failed to fetch customer')
  }
}