import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import argon2 from '@node-rs/argon2'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { showRoutes } from 'hono/dev'

const prisma = new PrismaClient()

const app = new Hono()

app.get('/users', async (c) => {
  const users = await prisma.user.findMany()
  return c.json({ data: users })
})

const authInput = zValidator('json', z.object({
  email: z.string().email(),
  password: z.string().min(6),
}))

app.post('/bcrypt/sign-up', authInput, async (c) => {
  const data = c.req.valid('json')
  data.password = await bcrypt.hash(data.password, 10)
  await prisma.user.create({ data })
  return c.json({ message: 'Signed up (Bcrypt)' })
})

app.post('/bcrypt/login', authInput, async (c) => {
  const data = c.req.valid('json')
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user) {
    throw new HTTPException(401, { message: 'Invalid credentials' })
  }
  const isValid = await bcrypt.compare(data.password, user.password)
  if (!isValid) {
    throw new HTTPException(401, { message: 'Invalid credentials' })
  }
  return c.json({ message: 'Logged in (Bcrypt)', data: user })
})

app.post('/argon2/sign-up', authInput, async (c) => {
  const data = c.req.valid('json')
  data.password = await argon2.hash(data.password)
  await prisma.user.create({ data })
  return c.json({ message: 'Signed up (Argon2)' })
})

app.post('/argon2/login', authInput, async (c) => {
  const data = c.req.valid('json')
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user) {
    throw new HTTPException(401, { message: 'Invalid credentials' })
  }
  const isValid = await argon2.verify(user.password, data.password)
  if (!isValid) {
    throw new HTTPException(401, { message: 'Invalid credentials' })
  }
  return c.json({ message: 'Logged in (Argon2)', data: user })
})

showRoutes(app)

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
