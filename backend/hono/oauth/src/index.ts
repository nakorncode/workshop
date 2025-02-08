import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { HTTPException } from 'hono/http-exception'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { randomUUID } from 'node:crypto'
import { ofetch } from 'ofetch'
import { jwtVerify, SignJWT } from 'jose'
import { createMiddleware } from 'hono/factory'
import { config } from 'dotenv'
import { showRoutes } from 'hono/dev'

config()

const prisma = new PrismaClient()
const app = new Hono()

const authMiddleware = createMiddleware<{
  Variables: {
    accountId: number
  }
}>(async (c, next) => {
  const token = getCookie(c, 'token')
  if (!token) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  const { payload: { accountId } } = await jwtVerify<{ accountId: number }>(token, new TextEncoder().encode(process.env.JWT_SECRET))
  c.set('accountId', accountId)
  await next()
})

app.get('/auth/google', async (c) => {
  const state = randomUUID()
  setCookie(c, 'oauthState', state, { httpOnly: true })
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID)
  url.searchParams.set('redirect_uri', process.env.GOOGLE_CALLBACK_URL)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile')
  url.searchParams.set('state', state)
  return c.redirect(url)
})

app.get('/auth/google/callback', async (c) => {
  const error = c.req.query('error')
  if (error) {
    throw new HTTPException(400, { message: error })
  }
  const stateFromCookie = getCookie(c, 'oauthState')
  if (!stateFromCookie) {
    throw new HTTPException(400, { message: 'Invalid state' })
  }
  const state = c.req.query('state')
  if (state !== stateFromCookie) {
    throw new HTTPException(400, { message: 'Invalid state' })
  }
  const code = c.req.query('code')
  const tokenResponse = await ofetch<{
    access_token: string
  }>('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    }
  })
  const userInfoEmailResponse = await ofetch<{
    id: string
    email: string
    name: string
  }>('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
    headers: {
      Authorization: `Bearer ${tokenResponse.access_token}`,
    }
  })
  const provider = await prisma.provider.findFirst({
    where: {
      provider: 'google',
      providerId: userInfoEmailResponse.id,
    }
  })
  let accountId: number
  if (!provider) {
    const newAccount = await prisma.account.create({
      data: {
        name: userInfoEmailResponse.name,
        providers: {
          create: {
            provider: 'google',
            providerId: userInfoEmailResponse.id
          }
        }
      }
    })
    accountId = newAccount.id
  } else {
    accountId = provider.accountId
  }
  const token = await new SignJWT({ accountId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
  setCookie(c, 'token', token)
  return c.redirect('/me')
})

app.get('/me', authMiddleware, async (c) => {
  return c.json({ accountId: c.get('accountId') })
})

app.get('/logout', async (c) => {
  deleteCookie(c, 'token')
  return c.text('Logged out')
})

app.onError((err, c) => {
  console.error(err)
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }
  return c.json({ error: 'Internal server error' }, 500)
})

showRoutes(app)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
