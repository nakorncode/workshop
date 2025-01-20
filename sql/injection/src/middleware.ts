import { createMiddleware } from 'hono/factory'
import { checkAuthId } from './token.js'

export const auth = createMiddleware<{
  Variables: { userId: number }
}>(async (c, next) => {
  const userId = await checkAuthId(c)
  if (!userId) {
    return c.redirect('/login')
  }
  c.set('userId', userId)
  await next()
})
