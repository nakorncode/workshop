import { Product } from '~/utils/dataTypes'

const products: Product[] = [
  { id: 1, title: 'Product 1', price: 100 },
  { id: 2, title: 'Product 2', price: 200 },
]

export default defineEventHandler(async (event) => {
  return {
    products
  }
})