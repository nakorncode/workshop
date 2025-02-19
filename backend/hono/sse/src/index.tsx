import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'

const app = new Hono()

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Joe Dan' }
]
const connections: { id: string; controller: ReadableStreamDefaultController }[] = []

app.get('/', (c) => {
  const userId = Number(getCookie(c, 'userId'))
  const user = users.find((u) => u.id === userId)
  if (!user) {
    return c.html(
      <>
        <h1>Please login</h1>
        <ul>
          {users.map((u) => (
            <li>
              <a href={`/test/login/${u.id}`}>{u.name}</a>
            </li>
          ))}
        </ul>
      </>
    )
  } else {
    return c.html(
      <>
        <h1>Hello {user.name}</h1>
        <a href="/logout">Logout</a>
        <script dangerouslySetInnerHTML={{
          __html: `
            const eventSource = new EventSource(\`/sse/notification?date=${Date.now()}\`)
            eventSource.onmessage = (event) => {
              alert(event.data)
            }
          `
        }}></script>
      </>
    )
  }
})

app.get('/logout', (c) => {
  deleteCookie(c, 'userId')
  return c.redirect('/')
})

app.get('/test/login/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const user = users.find((u) => u.id === id)
  if (!user) {
    return c.text('User not found', 404)
  }
  setCookie(c, 'userId', String(user.id))
  return c.redirect('/')
})

app.get('/sse/notification', (c) => {
  const date = Number(c.req.query('date'))
  const userId = Number(getCookie(c, 'userId'))
  if (!userId) {
    return c.text('Unauthorized', 401)
  }
  if (!date || isNaN(date)) {
    return c.text('Invalid date', 400)
  }

  const stream = new ReadableStream({
    start(controller) {
      connections.push({ id: `${userId}-${date}`, controller })
    }
  })

  c.req.raw.signal.addEventListener('abort', () => {
    connections.splice(connections.findIndex((c) => c.id === `${userId}-${date}`), 1)
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
})

app.post('/api/make-notification', async (c) => {
  const { text, userId } = await c.req.json() as { text: string; userId: number }
  const user = users.find((u) => u.id === userId)
  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }
  const controllers = connections.filter((c) => c.id.startsWith(`${userId}-`))
  for (const { controller } of controllers) {
    controller.enqueue(`data: ${text}\n\n`)
  }
  return c.json({ message: 'Notification sent', total: controllers.length })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
