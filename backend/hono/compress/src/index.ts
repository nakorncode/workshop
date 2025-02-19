import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { compress } from 'hono/compress'

const app = new Hono()

const longText = 'abc\n'.repeat(1000)

app.get('/without-compress/short', (c) => {
  return c.text('Hello world')
})

app.get('/without-compress/long', (c) => {
  return c.text(longText)
})

// https://hono.dev/docs/middleware/builtin/compress
app.get('/with-compress/short', compress(), (c) => {
  return c.text('Hello world')
})

app.get('/with-compress/long', compress(), (c) => {
  return c.text(longText)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
