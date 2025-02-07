import { serve } from '@hono/node-server'
import { Hono } from 'hono'

type Status = 'active' | 'inactive'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
  status: Status
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 100, quantity: 10, status: 'active' },
  { id: 2, name: 'Product 2', price: 200, quantity: 20, status: 'inactive' },
  { id: 3, name: 'Product 3', price: 300, quantity: 30, status: 'active' },
]

const app = new Hono()

app.get('/products', (c) => {
  return c.json({ data: products })
})

app.post('/products', async (c) => {
  const product = await c.req.json() as Product
  products.push({ ...product, id: products.length + 1 })
  c.status(201)
  return c.json({ message: 'Product created' })
})

app.get('/products/:id', (c) => {
  const id = Number(c.req.param('id'))
  const product = products.find((p) => p.id === id)
  if (!product) {
    c.status(404)
    return c.json({ message: 'Product not found' })
  }
  return c.json({ data: product })
})

app.put('/products/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const product = await c.req.json() as Product
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    c.status(404)
    return c.json({ message: 'Product not found' })
  }
  products[index] = { ...product, id: products[index].id }
  return c.json({ message: 'Product updated' })
})

app.patch('/products/:id/status', async (c) => {
  const id = Number(c.req.param('id'))
  const product = await c.req.json() as { status: Status }
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    c.status(404)
    return c.json({ message: 'Product not found' })
  }
  products[index] = { ...products[index], status: product.status }
  return c.json({ message: 'Product status updated' })
})

app.patch('/products/:id/quantity', async (c) => {
  const id = Number(c.req.param('id'))
  const product = await c.req.json() as { quantity: number }
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    c.status(404)
    return c.json({ message: 'Product not found' })
  }
  products[index] = { ...products[index], quantity: product.quantity }
  return c.json({ message: 'Product quantity updated' })
})

app.delete('/products/:id', (c) => {
  const id = Number(c.req.param('id'))
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    c.status(404)
    return c.json({ message: 'Product not found' })
  }
  products.splice(index, 1)
  return c.json({ message: 'Product deleted' })
})

serve(app, (info) => {
  console.log(`Server started on http://localhost:${info.port}`)
})
