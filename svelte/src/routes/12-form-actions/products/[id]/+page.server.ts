import { error } from "console"
import type { Actions } from "./$types"
import db from "$lib/db"
import { productsTable } from "../../../../db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "@sveltejs/kit"

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const id = formData.get('id') as string
    if (!id) {
      return error(400, "Product ID is required")
    }
    const result = await db.delete(productsTable).where(eq(productsTable.id, +id))
    if (result.rowsAffected === 0) {
      return error(404, "Product not found")
    }
    return redirect(303, "/12-form-actions/products")
  }
} satisfies Actions
