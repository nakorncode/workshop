import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

interface Toy {
  id: number
  name: string
  tags: string[]
  price: number
  quantity: number
}

const toys: Toy[] = [
  { id: 1, name: 'Teddy Bear', tags: ['soft', 'fun', 'kids'], price: 850, quantity: 15 },
  { id: 2, name: 'Lego Set', tags: ['creative', 'fun', 'popular'], price: 1700, quantity: 10 },
  { id: 3, name: 'Toy Car', tags: ['vehicle', 'kids', 'fun'], price: 500, quantity: 30 },
  { id: 4, name: 'Doll House', tags: ['decor', 'fun', 'kids'], price: 3400, quantity: 5 },
  { id: 5, name: 'Action Figure', tags: ['adventure', 'fun', 'popular'], price: 680, quantity: 25 },
  { id: 6, name: 'Puzzle', tags: ['brain', 'fun', 'kids'], price: 340, quantity: 40 },
  { id: 7, name: 'Board Game', tags: ['family', 'fun', 'strategy'], price: 1200, quantity: 8 },
  { id: 8, name: 'RC Helicopter', tags: ['tech', 'fun', 'flying'], price: 2040, quantity: 12 },
  { id: 9, name: 'Stuffed Elephant', tags: ['soft', 'kids', 'cute'], price: 1020, quantity: 18 },
  { id: 10, name: 'Rubik\'s Cube', tags: ['brain', 'challenge', 'fun'], price: 410, quantity: 50 },
]

app.get('/', (c) => {
  return c.html(`
    <h1>Search Toys</h1>
    <form action="/toys" method="get">
      <div>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" placeholder="Name" />
      </div>
      <div>
        <label for="tag">Tag:</label>
        <input type="text" name="tag" id="tag" placeholder="Tag" />
      </div>
      <div>
        <label for="priceMin">Price Min:</label>
        <input type="number" name="priceMin" id="priceMin" placeholder="Price Min" />
      </div>
      <div>
        <label for="priceMax">Price Max:</label>
        <input type="number" name="priceMax" id="priceMax" placeholder="Price Max" />
      </div>
      <div>
        <label for="quantityMin">Quantity Min:</label>
        <input type="number" name="quantityMin" id="quantityMin" placeholder="Quantity Min" />
      </div>
      <div>
        <label for="quantityMax">Quantity Max:</label>
        <input type="number" name="quantityMax" id="quantityMax" placeholder="Quantity Max" />
      </div>
      <div>
        <button type="submit">Search</button>
      </div>
    </form>
  `)
})

app.get('/toys', async (c) => {
  const query = c.req.query()
  let data = structuredClone(toys)
  if (query.name) {
    data = data.filter((toy) => toy.name.toLowerCase().includes(query.name.toLowerCase()))
  }
  if (query.tag) {
    data = data.filter((toy) => toy.tags.some((tag) => query.tag.includes(tag)))
  }
  if (query.priceMin) {
    data = data.filter((toy) => toy.price >= parseInt(query.priceMin))
  }
  if (query.priceMax) {
    data = data.filter((toy) => toy.price <= parseInt(query.priceMax))
  }
  if (query.quantityMin) {
    data = data.filter((toy) => toy.quantity >= parseInt(query.quantityMin))
  }
  if (query.quantityMax) {
    data = data.filter((toy) => toy.quantity <= parseInt(query.quantityMax))
  }
  const accept = c.req.header('Accept')
  if (accept && (accept.includes('application/json'))) {
    return c.json({ total: data.length, data })
  }
  return c.html(`
    <h1>Result</h1>
    <p>Total: ${data.length}</p>
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Tags</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((toy) => `
          <tr>
            <td>${toy.name}</td>
            <td>${toy.tags.join(', ')}</td>
            <td>${toy.price}</td>
            <td>${toy.quantity}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
