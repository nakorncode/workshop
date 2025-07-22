"use server" // ประกาศให้เป็น Server Function ทั้งหมด

import { products } from "@/db/schema"
import db from "@/lib/db"
import { eq, InferSelectModel } from "drizzle-orm"
import z from "zod"

type Product = InferSelectModel<typeof products>
type ProductData = Omit<Product, "id">

// GET: /api/products
export async function getProducts() {
  const data = await db.select().from(products)
  return data
}

// GET: /api/products/:id
export async function getProductById(id: number) {
  const product = await db.select().from(products).where(eq(products.id, id)).get()
  if (!product) {
    throw new Error("Product not found")
  }
  return product
}

function validateProductData(data: ProductData) {
  const parsed = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
  }).parse(data)
  return parsed
}

// POST: /api/products
export async function createProduct(productData: ProductData) {
  const data = await validateProductData(productData)
  await db.insert(products).values(data)
}
