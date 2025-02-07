import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/say/:message', (c) => {
  const message = c.req.param('message')
  const accept = c.req.header('Accept') || 'text/plain'
  if (accept.includes('application/json')) {
    return c.json({ message })
  } else if (accept.includes('text/html')) {
    return c.html(`<h1 style="color: red;">${message}</h1>`)
  } else if (accept.includes('text/plain') || accept.includes('*/*')) {
    return c.text(message)
  }
  return c.text('Unsupported Media Type', 415)
})

serve(app, (info) => {
  console.log(`Server started on http://localhost:${info.port}`)
})
