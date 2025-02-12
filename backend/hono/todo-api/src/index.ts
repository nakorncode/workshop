import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { showRoutes } from 'hono/dev'
import { auth } from './auth.js'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors({
  origin: 'http://localhost:3001',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))

app.get('/ok', (c) => {
  return c.json({ message: 'ok' })
})

showRoutes(app)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
