import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.get('/guest', (c) => {
  return c.text('Welcome guest')
})

// https://hono.dev/docs/middleware/builtin/basic-auth
app.get('/admin', basicAuth({ username: 'admin', password: 'password' }), (c) => {
  return c.text('Welcome admin')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
