import db from "$lib/db"
import { eq } from "drizzle-orm"
import { productsTable } from "../../../../../db/schema"
import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ params }) => {
  const id = Number(params.id)
  const product = await db.select().from(productsTable).where(eq(productsTable.id, id)).get()
  if (!product) {
    return json({ error: 'Product not found' }, { status: 404 })
  }
  return json({ data: product })
}

export const DELETE: RequestHandler = async ({ params }) => {
  const id = Number(params.id)
  const result = await db.delete(productsTable).where(eq(productsTable.id, id))
  if (result.rowsAffected === 0) {
    return json({ error: 'Product not found' }, { status: 404 })
  }
  return json({ message: 'Product deleted successfully' }, { status: 200 })
}
