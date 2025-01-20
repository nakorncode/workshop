import type { Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'ForExample123'

export async function generate(userId: number) {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '365d'
  })
}

export async function verify(token: string) {
  try {
    const decode = jwt.verify(token, JWT_SECRET)
    if (!decode) {
      return null
    }
    if (typeof decode === 'string') {
      return null
    }
    return decode
  } catch (error) {
    return null
  }
}

export async function setAuth(c: Context, userId: number) {
  const token = await generate(userId)
  return setCookie(c, 'token', token)
}

export function clearAuth(c: Context) {
  return deleteCookie(c, 'token')
}

export async function checkAuthId(c: Context): Promise<number | null> {
  const token = getCookie(c, 'token')
  if (!token) {
    return null
  }
  const user = await verify(token)
  if (!user) {
    return null
  }
  user.id = Number(user.id)
  if (isNaN(user.id)) {
    return null
  }
  return user.id
}
