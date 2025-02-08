import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import emailValidator from 'email-validator'
import { z } from 'zod'

const app = new Hono()

interface User {
  email: string
  password: string
}

const users: User[] = []

// - At least 8 characters long.
// - Contains at least one uppercase letter.
// - Contains at least one lowercase letter.
// - Contains at least one digit.
// - Contains at least one special character (e.g., !@#$%^&*).
// - Does not contain whitespace.
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/

app.get('/users', (c) => c.json({ data: users }))

app.post('/common/sign-up', async (c) => {
  const data = await c.req.json()
  if (!data.email) {
    return c.json({ message: 'Email is required' }, 400)
  }
  if (!emailValidator.validate(data.email)) {
    return c.json({ message: 'Invalid email' }, 400)
  }
  if (!data.password) {
    return c.json({ message: 'Password is required' }, 400)
  }
  if (!strongPassword.test(data.password)) {
    return c.json({ message: 'Password must be strong' }, 400)
  }
  users.push(data)
  return c.json({ message: 'Signed up' })
})

app.post('/zod/sign-up', async (c) => {
  const data = await c.req.json()
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(strongPassword, { message: 'Password must be strong' }),
  })
  const parsed = schema.safeParse(data)
  if (parsed.error) {
    return c.json({ error: parsed.error }, 400)
  }
  users.push(parsed.data)
  return c.json({ message: 'Signed up' })
})

app.post('/middleware/sign-up', zValidator('json', z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(strongPassword, { message: 'Password must be strong' }),
})), async (c) => {
  const parsed = c.req.valid('json')
  users.push(parsed)
  return c.json({ message: 'Signed up' })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
