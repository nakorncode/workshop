import { createMiddleware } from 'hono/factory'
import { auth } from '../auth.js'

interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
}

export const getCurrentUser = createMiddleware<{
  Variables: {
    currentUser: User | undefined
  }
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (session?.user) {
    c.set('currentUser', session.user)
  }
  await next()
})
