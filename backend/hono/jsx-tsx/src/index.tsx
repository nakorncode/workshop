import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PageUser } from './pages/PageUser.js'
import { users } from './data/user.js'
import { PageUserNew } from './pages/PageUserNew.js'
import { PageHome } from './pages/PageHome.js'
import { products } from './data/product.js'
import { jsxRenderer } from 'hono/jsx-renderer'

const app = new Hono()

app.get('/', (c) => {
  return c.html(<PageHome></PageHome>)
})

app.get('/users', (c) => {
  return c.html(<PageUser users={users}></PageUser>)
})

app.get('/users/new', (c) => {
  return c.html(<PageUserNew></PageUserNew>)
})

app.post('/users', async (c) => {
  const data = await c.req.parseBody()
  users.push({
    id: users.length + 1,
    name: String(data.name),
    email: String(data.email),
    birthDate: new Date(String(data.birthDate)),
    role: String(data.role)
  })
  return c.redirect('/users')
})

app.use('/products/*', jsxRenderer((props) => {
  return (
    <>
      <h1>Product Management</h1>
      <ul>
        <li><a href="/">Back to Homepage</a></li>
        <li><a href="/products">Product list</a></li>
        <li><a href="/products/new">New product</a></li>
      </ul>

      <hr />

      <main>
        {props.children}
      </main>
    </>
  )
}))

app.get('/products', (c) => {
  return c.render(
    <>
      <h2>Products</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
})

app.get('/products/new', (c) => {
  return c.render(
    <>
      <h2>New Product</h2>
      <form action="/products" method="post">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" placeholder="Price" />
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity" placeholder="Quantity" />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <div>
            <label>
              <input type="checkbox" name="tags" value="smartphone" /> Smartphone
            </label>
            <label>
              <input type="checkbox" name="tags" value="android" /> Android
            </label>
            <label>
              <input type="checkbox" name="tags" value="ios" /> iOS
            </label>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
})

app.post('/products', async (c) => {
  const data = await c.req.parseBody({ all: true })
  products.push({
    id: products.length + 1,
    title: String(data.name),
    price: Number(data.price),
    quantity: Number(data.quantity),
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : []
  })
  return c.redirect('/products')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
