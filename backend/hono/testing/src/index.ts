import { Hono } from 'hono'
import { hash, verify } from '@node-rs/argon2'
import { sum } from './utils/sum.js'
import { HTTPException } from 'hono/http-exception'
import { SignJWT, jwtVerify } from 'jose'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

interface User {
  email: string
  password: string
}

const JWT_SECRET = 'RandomMePlease'
const users: User[] = []

export const app = new Hono()

.post('/handler/sum', async (c) => {
  const { a, b } = await c.req.json()
  return c.json({ result: a + b })
})

.post('/function/sum', async (c) => {
  const { a, b } = await c.req.json()
  return c.json({ result: sum(a, b) })
})

.post('/sign-up', zValidator('json', z.object({
  email: z.string().min(1).email(),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character'
  }),
})), async (c) => {
  const { email, password } = await c.req.json()
  const hashedPassword = await hash(password)
  users.push({ email, password: hashedPassword })
  return c.json({ message: 'Signed up' }, 201)
})

.post('/login', async (c) => {
  const { email, password } = await c.req.json()
  const user = users.find((user) => user.email === email)
  if (!user) {
    throw new HTTPException(401, { message: 'Invalid email or password' })
  }
  const isValid = await verify(user.password, password)
  if (!isValid) {
    throw new HTTPException(401, { message: 'Invalid email or password' })
  }
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(new TextEncoder().encode(JWT_SECRET))
  return c.json({ message: 'Signed in', data: { token } })
})

.get('/me', async (c) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
  const user = users.find((user) => user.email === payload.email)
  if (!user) {
    throw new HTTPException(404, { message: 'User not found' })
  }
  return c.json({ data: user })
})

.onError((err, c) => {
  const status = err instanceof HTTPException ? err.status : 500
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, status)
  }
  return c.json({ error: 'Internal server error' }, status)
})
