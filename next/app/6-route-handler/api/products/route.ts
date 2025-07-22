import { z } from "zod"
import db from "@/lib/db"
import { products } from "@/db/schema"

export async function GET() {
  const data = await db.select().from(products)
  return Response.json(data)
}

export async function POST(request: Request) {
  const productSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0)
  })
  const result = productSchema.safeParse(await request.json())
  if (!result.success) {
    return new Response("Invalid product data", { status: 400 })
  }
  const product = result.data
  await db.insert(products).values(product)
  return new Response("Product created successfully!", { status: 201 })
}
