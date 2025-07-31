import { error, fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions = {
  setName: async ({ request, cookies }) => {
    const formData = await request.formData()
    const name = formData.get('name') as string
    if (!name || name.trim() === '') {
      return error(400, "Name is required")
    }
    cookies.set('name', name, { httpOnly: true, path: '/' })
    return redirect(303, '/13-progressive-enhancement/show-name')
  },

  getSum: async ({ request }) => {
    const formData = await request.formData()
    const a = parseFloat(formData.get('a') as string)
    const b = parseFloat(formData.get('b') as string)
    if (isNaN(a) || isNaN(b)) {
      return fail(400, { error: "Both inputs must be valid numbers" })
    }
    return { sum: a + b }
  },

  slowResponse: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return { message: "This is a slow response" }
  }
} satisfies Actions
