import { serve } from '@hono/node-server'
import { type Context, Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import argon2 from '@node-rs/argon2'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { createMiddleware } from 'hono/factory'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { SignJWT, jwtVerify } from 'jose'
import { showRoutes } from 'hono/dev'

const prisma = new PrismaClient()
const app = new Hono()

const JWT_ACCESS_SECRET = 'secret1'
const JWT_REFRESH_SECRET = 'secret2'

const inputAuth = zValidator('json', z.object({
  email: z.string().email(),
  password: z.string().min(6),
}))

async function generateNewJWTAndSetCookie(c: Context, userId: number) {
  const [accessToken, refreshToken] = await Promise.all([
    new SignJWT({ userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30m')
      .sign(new TextEncoder().encode(JWT_ACCESS_SECRET)),
    new SignJWT({ userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30d')
      .sign(new TextEncoder().encode(JWT_REFRESH_SECRET)),
  ])
  setCookie(c, 'accessToken', accessToken)
  setCookie(c, 'refreshToken', refreshToken)
}

const mustAuth = createMiddleware<{
  Variables: {
    userId: number
  }
}>(async (c, next) => {
  const accessToken = getCookie(c, 'accessToken')
  if (!accessToken) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  const refreshToken = getCookie(c, 'refreshToken')
  if (!refreshToken) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  try {
    const { payload: { userId } } = await jwtVerify<{ userId: number }>(accessToken, new TextEncoder().encode(JWT_ACCESS_SECRET))
    c.set('userId', userId)
    await next()
  } catch (error) {
    try {
      const { payload: { userId } } = await jwtVerify<{ userId: number }>(refreshToken, new TextEncoder().encode(JWT_REFRESH_SECRET))
      generateNewJWTAndSetCookie(c, userId)
      c.set('userId', userId)
      await next()
    } catch (error) {
      deleteCookie(c, 'accessToken', { httpOnly: true })
      deleteCookie(c, 'refreshToken', { httpOnly: true })
      throw new HTTPException(401, { message: 'Unauthorized' })
    }
  }
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
  generateNewJWTAndSetCookie(c, user.id)
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
