import { createMiddleware } from 'hono/factory'
import { auth } from '../auth.js'
import type { User } from './storeAuth.js'
import { HTTPException } from 'hono/http-exception'

export default createMiddleware<{
  Variables: {
    user: NonNullable<User>
  }
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session?.user) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  c.set('user', session.user)
  await next()
})
