import { createMiddleware } from 'hono/factory'
import { auth } from '../auth.js'

export type User = {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined;
} | undefined

export default createMiddleware<{
  Variables: {
    user: User
  }
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  c.set('user', session?.user)
  await next()
})
