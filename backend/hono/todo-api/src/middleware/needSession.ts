import { createMiddleware } from 'hono/factory'
import { auth } from '../auth.js'
import type { User } from './getCurrentUser.js'
import { HTTPException } from 'hono/http-exception'

export const needSession = createMiddleware<{
  Variables: {
    currentUser: User
  }
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session?.user) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  c.set('currentUser', session.user)
  await next()
})
