import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

function printSumResult(a: number, b: number): string {
  return `Result: ${a} + ${b} = ${a + b}`
}

app.post('/sum', async (c) => {
  const contentType = c.req.header('Content-Type')
  if (!contentType) {
    return c.text('Content-Type header is required', 400)
  }
  if (contentType.includes('application/json')) {
    const data = await c.req.json()
    return c.text(printSumResult(data.a, data.b))
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const data = await c.req.parseBody()
    return c.text(printSumResult(Number(data.a), Number(data.b)))
  }
  if (contentType.includes('multipart/form-data')) {
    const data = await c.req.parseBody()
    return c.text(printSumResult(Number(data.a), Number(data.b)))
  }
  if (contentType.includes('text/plain')) {
    const data = await c.req.text()
    const [a, b] = data.split(' ')
    return c.text(printSumResult(Number(a), Number(b)))
  }
  return c.text('Unsupported Content-Type', 415)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
