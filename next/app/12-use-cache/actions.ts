"use server"

import { products } from "@/db/schema"
import db from "@/lib/db"
import z from "zod"

const productSchema = z.object({
  title: z.string().min(1),
  price: z.number().min(0),
  description: z.string().min(1),
})

export async function createProduct(formData: FormData) {
  const parsedData = productSchema.safeParse({
    title: formData.get("title"),
    price: parseFloat(formData.get("price") as string),
    description: formData.get("description"),
  })
  if (!parsedData.success) {
    throw new Error("Invalid product data")
  }
  await db.insert(products).values(parsedData.data)
}
