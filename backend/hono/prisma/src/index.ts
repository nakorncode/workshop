import { serve } from '@hono/node-server'
import { PrismaClient } from '@prisma/client'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()
const prisma = new PrismaClient()

app.get('/api/products', async (c) => {
  const page = c.req.query('page') || 1
  const perPage = c.req.query('perPage') || 10
  // const products = await prisma.product.findMany()
  // const total = await prisma.product.count()
  const [ products, total ] = await Promise.all([
    prisma.product.findMany({
      skip: (Number(page) - 1) * Number(perPage),
      take: Number(perPage),
      orderBy: {
        updatedAt: 'desc'
      },
      include: {
        category: true
      }
    }),
    prisma.product.count()
  ])
  return c.json({
    total,
    currentPage: page,
    itemPerPage: perPage,
    data: products
  })
})

app.post('/api/products', async (c) => {
  const json = await c.req.json()
  const product = await prisma.product.create({
    data: {
      title: json.title,
      price: json.price,
      quantity: json.quantity,
      categoryId: json.categoryId
    }
  })
  return c.json({
    message: 'Product created',
    data: product
  }, 201)
})

app.get('/api/products/:id', async (c) => {
  const id = c.req.param('id')
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      category: true
    }
  })
  if (!product) {
    throw new HTTPException(404, { message: 'Product not found' })
  }
  return c.json(product)
})

app.put('/api/products/:id', async (c) => {
  const id = c.req.param('id')
  const json = await c.req.json()
  const product = await prisma.product.update({
    where: {
      id: Number(id)
    },
    data: {
      title: json.title,
      price: json.price,
      quantity: json.quantity,
      categoryId: json.categoryId
    }
  })
  return c.json({
    message: 'Product updated',
    data: product
  })
})

app.patch('/api/products/:id/quantity', async (c) => {
  const id = c.req.param('id')
  const json = await c.req.json()
  const product = await prisma.product.update({
    where: {
      id: Number(id)
    },
    data: {
      quantity: json.quantity
    }
  })
  return c.json({
    message: 'Product quantity updated',
    data: product
  })
})

app.delete('/api/products/:id', async (c) => {
  const id = c.req.param('id')
  const product = await prisma.product.delete({
    where: {
      id: Number(id)
    }
  })
  return c.json({
    message: 'Product deleted',
    data: product
  })
})

app.onError((err, c) => {
  const status = err instanceof HTTPException ? err.status : 500
  return c.json({ message: err.message }, status)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
