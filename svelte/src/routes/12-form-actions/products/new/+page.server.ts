import z from "zod"
import type { Actions } from "./$types"
import { fail, redirect } from "@sveltejs/kit"
import { productsTable } from "../../../../db/schema"
import db from "$lib/db"

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const title = formData.get('title')
    const description = formData.get('description')
    const price = parseFloat(formData.get('price') as string)
    const result = z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      price: z.number().positive("Price must be a positive number")
    }).safeParse({
      title,
      description,
      price
    })
    if (!result.success) {
      return fail(400, { error: result.error.issues[0].message })
    }
    await db.insert(productsTable).values(result.data)
    return redirect(303, "/12-form-actions/products")
  }
} satisfies Actions
