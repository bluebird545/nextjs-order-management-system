export interface Customer {
  id: string
  // created_at: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  address_street_one?: string
  address_street_two?: string
  address_city?: string
  address_state?: string
  address_zipcode?: string
}

export interface User {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  password: '1234'
}

export interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
}

export interface Order {
  id: string
  customer_id: string
  date: any
  total: number
  status: string
  // created_at: string
  // products: {
  //   product_id: string
  //   quantity: number
  // }[]
}



export interface OrderCustomer extends Order, Customer {}


export interface OrderDetail {
  id: string
  order_id: string
  product_id: string
  quantity: number
}

export interface OrderDetailsProduct {
  id: string
  order_id: string
  product_id: string
  quantity: number
  name: string
  price: number
  image: string
}

export interface OrderJson extends Order {
  customer: Customer,
  products: OrderDetailsProduct[]
}