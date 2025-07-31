import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import type { InferSelectModel } from "drizzle-orm"
import type { productsTable } from "../../../../db/schema"

export const load: PageLoad = async ({ params, fetch }) => {
  const res = await fetch(`/9-routing/api/products/${params.id}`)
  if (!res.ok && res.status === 404) {
    return error(404, 'Product not found')
  }
  const { data } = await res.json() as { data: InferSelectModel<typeof productsTable> }
  return { product: data }
}
