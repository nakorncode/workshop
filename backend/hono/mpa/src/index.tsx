import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import ejs from 'ejs'
import handlebars from 'handlebars'
import { readFileSync } from 'node:fs'

const app = new Hono()

interface Product {
  name: string
  price: number
}

const products: Product[] = [
  { name: 'iPhone', price: 1000 },
  { name: 'iPad', price: 800 },
  { name: 'Pixel', price: 500 },
  { name: 'Galaxy', price: 900 },
  { name: 'Mi', price: 700 }
]

app.get('/inline/say/:message', (c) => {
  return c.html(`
    <h1 style="color: red;">Say: ${c.req.param('message')}</h1>
    <ul>
      ${products.map((p) => `<li>${p.name} - ${p.price}</li>`).join('')}
    </ul>
  `)
})

app.get('/ejs/say/:message', (c) => {
  const html = ejs.renderFile('./views/index.ejs', {
    message: c.req.param('message'),
    products
  })
  return c.html(html)
})

app.get('/handlebars/say/:message', (c) => {
  const hbs = readFileSync('./views/index.hbs', 'utf-8')
  const template = handlebars.compile(hbs)
  const html = template({
    message: c.req.param('message'),
    products
  })
  return c.html(html)
})

app.get('/jsx/say/:message', (c) => {
  // Hono สามารถใช้งาน JSX ได้ด้วย ดูวิธีใช้งานที่ https://hono.dev/docs/guides/jsx
  return c.html(
    <>
      <h1 style="color: red;">Say: {c.req.param('message')}</h1>
      <ul>
        {products.map((p) => <li>{p.name} - {p.price}</li>)}
      </ul>
    </>
  )
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
