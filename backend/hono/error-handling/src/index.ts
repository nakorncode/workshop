import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

interface Movie {
  id: number
  title: string
  year: number
  rating: number
}

const movies: Movie[] = [
  { id: 1, title: 'The A', year: 1999, rating: 8.7 },
  { id: 2, title: 'The B', year: 2003, rating: 8.2 },
  { id: 3, title: 'The C', year: 2007, rating: 7.9 },
]

app.get('/api/movies', (c) => {
  return c.json(movies)
})

app.get('/api/movies/:id', (c) => {
  const id = c.req.param('id')
  if (!/^\d+$/.test(id)) {
    throw new HTTPException(400, { message: 'Invalid id' })
  }
  const movie = movies.find(m => m.id === +id)
  if (!movie) {
    // return c.notFound()
    throw new HTTPException(404, { message: 'Movie not found' })
  }
  return c.json(movie)
})

app.get('/', (c) => {
  return c.html(`
    <h1>Add movie as json</h1>
    <form action="/movies" method="post" >
      <textarea name="movie" cols="30" rows="10">{
  "title": "",
  "year": 0,
  "rating": 0
}</textarea>
      <button type="submit">Add</button>
    </form>

    <hr>

    <ul>
      ${movies.map(m => `<li>${m.title} (${m.year}) - ${m.rating}</li>`).join('')}
    </ul>
  `)
})

app.post('/movies', async (c) => {
  const data = await c.req.parseBody()
  const movie = JSON.parse(String(data.movie))
  movies.push(movie)
  return c.redirect('/')
})

app.onError((err, c) => {
  const status = err instanceof HTTPException ? err.status : 500
  const accept = c.req.header('Accept')
  if (accept && accept.includes('application/json')) {
    return c.json({ success: false, error: err.message }, status)
  }
  return c.text(err.message, status)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
