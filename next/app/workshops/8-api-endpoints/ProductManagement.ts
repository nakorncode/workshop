'use server'

import { z } from 'zod'

interface Product {
  id: number;
  name: string;
  price: number;
  active: boolean
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 10, active: true },
  { id: 2, name: 'Product 2', price: 20, active: true },
  { id: 3, name: 'Product 3', price: 30, active: true },
]

export async function getProducts() {
  return products
}

export async function getProduct(byId: number) {
  return products.find(product => product.id === byId)
}

export async function searchProduct(byName: string) {
  return products.find(product => product.name === byName)
}

export async function searchPriceRange(min: number, max: number) {
  return products.filter(product => product.price >= min && product.price <= max)
}

export async function addProduct(product: Omit<Product, 'id'>) {
  products.push({ ...product, id: products.length + 1 })
}

export async function updateProduct(id: number, product: Omit<Product, 'id'>) {
  const index = products.findIndex(product => product.id === id)
  products[index] = { ...product, id }
}

export async function toggleActiveProduct(id: number) {
  const index = products.findIndex(product => product.id === id)
  products[index].active = !products[index].active
}

export async function removeProduct(id: number) {
  const index = products.findIndex(product => product.id === id)
  products.splice(index, 1)
}

export async function validateProduct(product: Product) {
  return z.object({
    name: z.string().min(3),
    price: z.number().min(1),
    active: z.boolean().default(true),
  }).safeParseAsync(product)
}
