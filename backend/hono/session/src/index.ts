import { serve } from '@hono/node-server'
import { randomBytes } from 'node:crypto'
import { type Context, Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import argon2 from '@node-rs/argon2'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'
import { showRoutes } from 'hono/dev'

const prisma = new PrismaClient()
const app = new Hono()

const sessionCookieKey = 'session'
const maxAge = 60 * 60 * 24 * 7 // 7 days

function generateNewExpiresAt(): Date {
  return new Date(Date.now() + maxAge * 1000)
}

async function createSession(c: Context, userId: number): Promise<void> {
  const key = randomBytes(32).toString('hex')
  await prisma.session.create({
    select: { id: true },
    data: {
      userId,
      key,
      expiresAt: generateNewExpiresAt(),
    }
  })
  setCookie(c, sessionCookieKey, key, {
    httpOnly: true,
    maxAge,
  })
}

const inputAuth = zValidator('json', z.object({
  email: z.string().email(),
  password: z.string().min(6),
}))

const mustAuth = createMiddleware<{
  Variables: {
    userId: number
  }
}>(async (c, next) => {
  const key = getCookie(c, sessionCookieKey)
  const session = await prisma.session.findUnique({
    where: { key },
  })
  if (!session) {
    deleteCookie(c, sessionCookieKey)
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  if (session.expiresAt < new Date()) {
    deleteCookie(c, sessionCookieKey)
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  session.expiresAt = generateNewExpiresAt()
  await prisma.session.update({
    where: { id: session.id },
    data: { expiresAt: session.expiresAt }
  })
  c.set('userId', session.userId)
  await next()
})

app.post('/sign-up', inputAuth, async (c) => {
  const data = c.req.valid('json')
  data.password = await argon2.hash(data.password)
  await prisma.user.create({ data })
  return c.json({ message: 'Signed up' })
})

app.post('/login', inputAuth, async (c) => {
  const data = c.req.valid('json')
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user) {
    throw new HTTPException(401, { message: 'Invalid credentials' })
  }
  if (!await argon2.verify(user.password, data.password)) {
    throw new HTTPException(401, { message: 'Invalid credentials' })
  }
  await createSession(c, user.id)
  return c.json({ message: 'Logged in' })
})

app.get('/me', mustAuth, async (c) => {
  const userId = c.get('userId')
  const user = await prisma.user.findUnique({ where: { id: userId } })
  return c.json({ data: user })
})

showRoutes(app)

app.onError((err, c) => {
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
