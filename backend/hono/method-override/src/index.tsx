import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { methodOverride } from 'hono/method-override'

const app = new Hono()

interface Task {
  id: number
  title: string
  done: boolean
}

const tasks: Task[] = [
  { id: 1, title: 'Create a new design for the marketing campaign', done: false },
  { id: 2, title: 'Send the design to the marketing team for feedback', done: true },
  { id: 3, title: 'Create a new version of the design based on the feedback', done: false },
]

// https://hono.dev/docs/middleware/builtin/method-override
app.use(methodOverride({ app }))

app.get('/', (c) => {
  return c.html(
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((t) => (
          <li>
            <span>{t.done ? '✅' : '❌'} {t.title}</span>
            <div style="display: inline-flex; gap: 0.25em; margin-left: 0.5em;">
              <form action={`/api/tasks/${t.id}/success`} method="post">
                <input type="hidden" name="_method" value="PATCH" />
                <button>Success</button>
              </form>
              <form action={`/api/tasks/${t.id}`} method="post">
                <input type="hidden" name="_method" value="DELETE" />
                <button>Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>

      <form action="/api/tasks" method="post">
        <input type="text" name="title" placeholder="Please input" />
        <button type="submit">Add task</button>
      </form>
    </>
  )
})

app.get('/api/tasks', (c) => c.json({ data: tasks }))

app.post('/api/tasks', async (c) => {
  let data: any
  if (c.req.header('Content-Type')?.includes('application/json')) {
    data = await c.req.json()
  } else if (c.req.header('Content-Type')?.includes('application/x-www-form-urlencoded')) {
    data = await c.req.parseBody()
  } else {
    throw new HTTPException(415, { message: 'Unsupported Media Type' })
  }
  tasks.push({ ...data, id: tasks.length + 1 })
  return c.req.header('Accept')?.includes('text/html') ? c.redirect('/') : c.json({ message: 'Task created' }, 201)
})

app.patch('/api/tasks/:id/success', async (c) => {
  const id = c.req.param('id')
  const index = tasks.findIndex((t) => t.id === +id)
  if (index === -1) {
    throw new HTTPException(404, { message: 'Task not found' })
  }
  tasks[index].done = true
  return c.req.header('Accept')?.includes('text/html') ? c.redirect('/') : c.json({ message: 'Task updated' })
})

app.delete('/api/tasks/:id', (c) => {
  const id = c.req.param('id')
  const index = tasks.findIndex((t) => t.id === +id)
  if (index === -1) {
    throw new HTTPException(404, { message: 'Task not found' })
  }
  tasks.splice(index, 1)
  return c.req.header('Accept')?.includes('text/html') ? c.redirect('/') : c.json({ message: 'Task deleted' })
})

app.onError((err, c) => {
  const status = err instanceof HTTPException ? err.status : 500
  const accept = c.req.header('Accept')
  if (accept && accept.includes('text/html')) {
    return c.html(`<p>${err.message}</p>`)
  }
  return c.json({ message: err.message }, status)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

