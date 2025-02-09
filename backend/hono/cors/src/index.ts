import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { SignJWT, jwtVerify } from 'jose'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()
const JWT_SECRET = 'MustBeSecret'

interface User {
  id: number
  username: string
  password: string
  credit: number
}

const users: User[] = [
  {
    id: 1,
    username: 'john',
    password: '123',
    credit: 2000
  },
  {
    id: 2,
    username: 'i_am_hacker',
    password: '123',
    credit: 100
  }
]

const withAuth = createMiddleware<{
  Variables: {
    userId: number
    user: User
  }
}>(async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  try {
    const { payload } = await jwtVerify(authHeader.split(' ')[1], new TextEncoder().encode(JWT_SECRET))
    if (!payload.userId || typeof payload.userId !== 'number') {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }
    c.set('userId', payload.userId)
    const user = users.find((user) => user.id === payload.userId)
    if (!user) {
      throw new HTTPException(401, { message: 'Unauthorized' })
    }
    c.set('user', user)
    await next()
  } catch (e) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
})

// ❌ อาจจะควรทำแค่เฉพาะ Dev Environment หรือ Production ที่มีความปลอดภัยสูง หรือเป็น Public API
// 👇 ควรตั้งค่าอนุญาตเฉพาะ origin ที่เรามั่นใจเท่านั้น
// https://hono.dev/docs/middleware/builtin/cors#usage
app.use('*', cors())

app.get('/api/users', async (c) => {
  return c.json({ data: users })
})

app.post('/api/login', zValidator('json', z.object({
  username: z.string().min(1),
  password: z.string()
})), async (c) => {
  const { username, password } = c.req.valid('json')
  const user = users.find((user) => user.username === username && user.password === password)
  if (!user) {
    throw new HTTPException(400, { message: 'Invalid username or password' })
  }
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(new TextEncoder().encode(JWT_SECRET))
  return c.json({ data: { token } })
})

app.get('/api/me', withAuth, async (c) => {
  return c.json({ data: c.get('user') })
})

app.post('/api/transfer', withAuth, zValidator('json', z.object({
  username: z.string().min(1),
  amount: z.number().min(0)
})), async (c) => {
  const { username, amount } = c.req.valid('json')
  const toUser = users.find((user) => user.username === username)
  if (!toUser) {
    throw new HTTPException(400, { message: 'Invalid username' })
  }
  const user = c.get('user')
  if (user.credit < amount) {
    throw new HTTPException(400, { message: 'Not enough credit' })
  }
  user.credit -= amount
  toUser.credit += amount
  return c.json({ data: { user, amount }, message: 'Transfer successful' })
})

app.onError((err, c) => {
  console.error(err)
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }
  return c.json({ error: 'Internal server error' }, 500)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
