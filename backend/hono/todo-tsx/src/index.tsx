import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import layout from './layout.js'
import { auth } from './auth.js'
import { showRoutes } from 'hono/dev'
import homepage from './routes/homepage.js'
import login from './routes/login.js'
import signUp from './routes/signUp.js'
import { HTTPException } from 'hono/http-exception'
import { makeNotification } from './utils/notification.js'

const app = new Hono()

app.use(layout)

app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))

// https://hono.dev/docs/api/routing#grouping
app.route('/', homepage)
app.route('/login', login)
app.route('/sign-up', signUp)

app.onError((err, c) => {
  console.error(err)
  const message = err instanceof HTTPException ? err.message : 'Internal server error'
  try {
    const messages = JSON.parse(message)
    if (!Array.isArray(messages)) throw new Error('Not array')
    makeNotification(c, messages, 'danger')
  } catch (error) {
    makeNotification(c, [message], 'danger')
  }
  return c.redirect(c.req.header('Referer') ?? '/')
})

showRoutes(app)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
