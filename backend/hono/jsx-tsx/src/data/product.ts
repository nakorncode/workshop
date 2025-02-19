export interface Product {
  id: number
  title: string
  price: number
  quantity: number
  tags: string[]
}

export const products: Product[] = [
  { id: 1, title: 'iPhone', price: 999, quantity: 50, tags: ['smartphone', 'ios'] },
  { id: 2, title: 'Samsung Galaxy', price: 899, quantity: 30, tags: ['smartphone', 'android'] },
  { id: 3, title: 'Google Pixel', price: 799, quantity: 20, tags: ['smartphone', 'android'] },
]
