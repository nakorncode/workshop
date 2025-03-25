import { jwtVerify } from 'jose'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    const config = useRuntimeConfig()
    const token = useCookie('token')
    if (!token.value) {
      return navigateTo('/')
    }
    try {
      const decoded = await jwtVerify(token.value, new TextEncoder().encode(config.jwtSecret))
      if (!decoded.payload.isAdmin) {
        return navigateTo('/')
      }
    } catch (error) {
      return navigateTo('/')
    }
  }
})