import { JWT_SECRET } from "$env/static/private"
import type { Handle } from "@sveltejs/kit"
import { jwtVerify } from "jose"

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token")
  if (token) {
    try {
      const user = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
      event.locals.currentUsername = user.payload.username as string
    } catch (error) {
      console.error("Invalid token:", error)
      event.locals.currentUsername = null
    }
  }
  const response = await resolve(event)
  return response
}
