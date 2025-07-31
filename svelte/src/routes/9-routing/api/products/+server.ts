import z from "zod"
import type { RequestHandler } from "./$types"
import db from "$lib/db"
import { productsTable } from "../../../../db/schema"
import { json } from "@sveltejs/kit"

const schema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500),
  price: z.number().min(0),
})

export const GET: RequestHandler = async () => {
  const products = await db.select().from(productsTable)
  return json({ data: products })
}

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json()
  const result = schema.safeParse(data)
  if (!result.success) {
    return json({ error: result.error.issues[0].message }, { status: 400 })
  }
  await db.insert(productsTable).values(result.data)
  return json({ message: "Product created successfully" }, { status: 201 })
}
