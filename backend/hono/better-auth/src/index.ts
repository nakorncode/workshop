import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { createMiddleware } from 'hono/factory'
import { auth } from './auth.js'
import { showRoutes } from 'hono/dev'

const app = new Hono()

app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))

const needAuth = createMiddleware<{
  Variables:{
    user: {
      id: string;
      email: string;
      emailVerified: boolean;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null | undefined | undefined;
    }
  }
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  c.set('user', session.user)
  await next()
})

app.get('/me', needAuth, async (c) => {
  const user = c.get('user')
  return c.json({ data: user })
})

app.onError((err, c) => {
  console.error(err)
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }
  return c.json({ error: 'Internal server error' }, 500)
})

showRoutes(app)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
