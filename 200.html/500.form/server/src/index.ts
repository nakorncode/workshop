import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { writeFile } from 'fs/promises'
import { Hono } from 'hono'
import { orderBy } from 'lodash-es'
import path from 'path'
import { v4 as uuid } from 'uuid'

const app = new Hono()

interface Book {
  title: string
  price: number
  quantity: number
  cover?: string
}

const books: Book[] = [
  { title: 'Book A', price: 100, quantity: 30 },
  { title: 'Book B', price: 200, quantity: 20 },
  { title: 'Book C', price: 300, quantity: 10 },
  { title: 'Book D', price: 250, quantity: 15 },
]

app.get('/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  const sort = c.req.query('sort')
  const order = c.req.query('order')
  let data = books
  if (sort && order) {
    data = orderBy(data, sort, order === 'desc' ? 'desc' : 'asc')
  }
  return c.json({ data })
})

app.post('/books', async (c) => {
  const body = await c.req.parseBody()
  const title = String(body['title'])
  const price = Number(body['price']) || 0
  const quantity = Number(body['quantity']) || 0
  const book: Book = { title, price, quantity }
  const coverFile = body['cover']
  if (coverFile instanceof File) {
    const coverPath = `${uuid()}${path.extname(coverFile.name)}`
    await writeFile('public/' + coverPath, Buffer.from(await coverFile.arrayBuffer()))
    book.cover = 'http://localhost:3000/' + coverPath
  }
  books.push(book)
  c.status(201)
  return c.json({ message: 'Book created', data: book })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
