"use server"

import { products } from "@/db/schema"
import db from "@/lib/db"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import z from "zod"

interface StatusState {
  error?: string
  success?: string
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getProducts() {
  const data = await db.select().from(products)
  return data
}

export async function createProduct(state: StatusState, formData: FormData): Promise<StatusState> {
  await delay(2000)
  const product = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
  }).safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
  })
  if (product.error) {
    return { error: product.error.issues[0].message, success: undefined }
  }
  await db.insert(products).values(product.data)
  revalidatePath("/9-server-action-hooks")
  return { error: undefined, success: "Product created successfully" }
}

