import { SignJWT } from 'jose'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const data = await z.object({
    email: z.string().email(),
    password: z.string().min(6)
  }).parseAsync(body)
  const user = users.find((u) => u.email === data.email && u.password === data.password)
  if (!user) {
    throw createError({
      message: 'Invalid email or password',
      status: 401
    })
  }
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(new TextEncoder().encode(config.jwtSecret))
  setCookie(event, 'token', token, {
    httpOnly: true,
  })
  return { data: { name: user.name, email: user.email } }
})