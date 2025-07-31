import type { PageServerLoad } from "./$types"
import { productsTable } from "../../../db/schema"
import db from "$lib/db"

export const load: PageServerLoad = async () => {
  const products = await db.select().from(productsTable)
  return { products }
}
