import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import type { InferSelectModel } from "drizzle-orm"
import type { productsTable } from "../../../db/schema"

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/9-routing/api/products')
  if (!res.ok) {
    return error(400, 'Failed to fetch products')
  }
  const { data } = await res.json() as { data: InferSelectModel<typeof productsTable>[] }
  return { products: data }
}
