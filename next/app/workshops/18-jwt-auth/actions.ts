'use server'

import { randomUUID } from 'node:crypto'
import { hash, verify } from 'argon2'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { jwtVerify, SignJWT } from 'jose'

interface User {
  id: string
  name: string
  password: string
}

const secret = 'super-secret-123'

const users: User[] = []

export async function signUp(state: any, formData: FormData) {
  const result = z.object({
    name: z.string(),
    password: z.string().min(6)
  }).safeParse(Object.fromEntries(formData))
  if (result.error) {
    return { error: result.error.errors[0].message }
  }
  const user = users.find(user => user.name === result.data.name)
  if (user) {
    return { error: 'User already exists' }
  }
  users.push({
    id: randomUUID(),
    name: result.data.name,
    password: await hash(result.data.password)
  })
  return { message: `Signed up for ${result.data.name}` }
}

export async function signIn(state: any, formData: FormData) {
  const result = z.object({
    name: z.string(),
    password: z.string()
  }).safeParse(Object.fromEntries(formData))
  if (result.error) {
    return { error: result.error.errors[0].message }
  }

  const user = users.find(user => user.name === result.data.name)
  if (!user) {
    return { error: 'User not found' }
  }

  const isValid = await verify(user.password, result.data.password)
  if (!isValid) {
    return { error: 'Invalid password' }
  }

  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(new TextEncoder().encode(secret))
  const cookieStore = await cookies()
  cookieStore.set('token', token)
  return { message: 'Signed in' }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('token')
  return { message: 'Signed out' }
}

export async function getCurrentUserSignedIn() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  if (!token) {
    return { user: null }
  }
  try {
    const { payload: { userId } } = await jwtVerify<{ userId: string }>(token.value, new TextEncoder().encode(secret))
    const user = users.find((user) => user.id === userId)
    if (!user) {
      return { user: null }
    }
    return { user }
  } catch (error) {
    return { user: null }
  }
}
