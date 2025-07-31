import { login } from "$lib/usersDemo"
import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types.js"
import { jwtVerify, SignJWT } from "jose"
import { JWT_SECRET } from "$env/static/private"

let incorrectUsername: string | null = null

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("token")
  let correctUsername: string | null = null
  if (token) {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    correctUsername = payload.username as string
  }
  return { incorrectUsername, correctUsername }
}

export const actions = {
  incorrect: async ({ request }) => {
    const formData = await request.formData()
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const result = login(username, password)
    if (!result.success || !result.user) {
      return fail(400, { error: result.message })
    }
    incorrectUsername = result.user.username
    return redirect(303, '/14-global-state')
  },

  correct: async ({ request, cookies }) => {
    const formData = await request.formData()
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    const result = login(username, password)
    if (!result.success || !result.user) {
      return fail(400, { error: result.message })
    }
    const token = await new SignJWT({ username: result.user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(JWT_SECRET))
    cookies.set("token", token, { httpOnly: true, path: '/' })
    return redirect(303, '/14-global-state')
  }
}
