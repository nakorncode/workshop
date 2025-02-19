import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { createMiddleware } from 'hono/factory'
import { serveStatic } from '@hono/node-server/serve-static'
import { trimTrailingSlash } from 'hono/trailing-slash'

const app = new Hono()

// สร้าง Middleware เป็น Function: https://hono.dev/docs/helpers/factory#createmiddleware
const timing = createMiddleware(async (c, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  c.header('X-Response-Time', `${end - start}ms`)
})

// เรียกใช้ Middleware ทุก Routing
app.use(logger()) // https://hono.dev/docs/middleware/builtin/logger
app.use(trimTrailingSlash()) // https://hono.dev/docs/middleware/builtin/trailing-slash
app.use(timing)

// กำหนดให้ /public/* เรียกแล้วได้ไฟล์ https://hono.dev/docs/getting-started/nodejs#serve-static-files
app.use('/public/*', serveStatic({
  root: './public',
  rewriteRequestPath: (path) => path.replace(/^\/public/, '')
}))

app.get('/', (c) => c.json({ message: 'Hello world' }))
app.get('/about', (c) => c.json({ message: 'About page' }))

app.get('/delay/:second', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, +c.req.param('second') * 1000))
  return c.json({ message: 'Done' })
})

// กำหนด Middleware แบบ Anonymous Function เฉพาะหน้า /admin/*
app.use('/admin/*', async (c, next) => {
  const adminToken = c.req.header('X-Admin-Token')
  if (adminToken !== 'shh-this-is-secret') {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  await next()
})
app.get('/admin', (c) => c.json({ message: 'Welcome to admin panel' }))
app.get('/admin/other-page', (c) => c.json({ message: 'Welcome to other page' }))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
