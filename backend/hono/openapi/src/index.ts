import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { z } from 'zod'
import { describeRoute, openAPISpecs } from 'hono-openapi'
import { resolver, validator as zValidator } from 'hono-openapi/zod'
import { apiReference } from '@scalar/hono-api-reference'
import { showRoutes } from 'hono/dev'

const app = new Hono()

app.get('/say/:message', describeRoute({
  description: 'Say message to user',
  responses: {
    200: {
      description: 'Success',
      content: {
        'text/html': {
          schema: resolver(z.string())
        },
        'application/json': {
          schema: resolver(z.object({  message: z.string() }))
        }
      }
    }
  },
}), (c) => {
  const message = c.req.param('message')
  if (c.req.header('Accept')?.includes('application/json')) {
    return c.json({ message: `Say: ${message}` })
  }
  return c.text(`Say: ${message}`)
})

interface Product {
  name: string
  price: number
  tags: string[]
}

const products: Product[] = [
  { name: 'iPhone', price: 1000, tags: ['phone', 'apple'] },
  { name: 'iPad', price: 800, tags: ['tablet', 'apple'] },
  { name: 'Pixel', price: 500, tags: ['phone', 'google'] },
  { name: 'Galaxy', price: 900, tags: ['phone', 'samsung'] },
  { name: 'Mi', price: 700, tags: ['phone', 'xiaomi'] }
]

app.get('/products', describeRoute({
  description: 'Get all products',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(z.object({
            data: z.object({
              name: z.string(),
              price: z.number(),
              tags: z.array(z.string())
            })
          }))
        }
      }
    }
  }
}), zValidator('query', z.object({
  name: z.string().optional(),
  tags: z.string().optional()
})), (c) => {
  const { name, tags } = c.req.valid('query')
  let data = products
  if (name) {
    data = data.filter(p => p.name.includes(name))
  }
  if (tags) {
    data = data.filter(p => p.tags.includes(tags))
  }
  return c.json({ data })
})

app.post('/products', describeRoute({
  description: 'Create new product',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: resolver(z.object({
            message: z.string(),
            data: z.object({
              name: z.string(),
              price: z.number(),
              tags: z.array(z.string())
            })
          }))
        }
      }
    }
  }
}), zValidator('json', z.object({
  name: z.string(),
  price: z.number(),
  tags: z.array(z.string())
})), (c) => {
  const body = c.req.valid('json')
  products.push(body)
  return c.json({ message: 'Product created', data: body })
})

app.get('/openapi', openAPISpecs(app))
app.get('/docs', apiReference({ spec: { url: '/openapi' } }))

showRoutes(app)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
