// 👉 Integration Testing

import { expect, test, describe, beforeAll } from 'vitest'
import { app } from './index.js'
import { testClient } from 'hono/testing'
import type { ZodError } from 'zod'

test('call /handler/sum receive a: 3, b: 6 return 9', async () => {
  const res = await testClient(app).handler.sum.$post({
    json: { a: 3, b: 6 }
  })
  expect(await res.json()).toEqual({ result: 9 })
})

describe('POST: /sign-up', () => {
  test.each([
    'test',
    'test@',
    '@test.com',
    'test@example',
    'test@example.'
  ])('should fail if incorrect email: %s', async (email) => {
    const data = await testClient(app)['sign-up'].$post({
      json: {
        email,
        password: 'TheStrongPass123!'
      }
    }).then(res => res.json()) as { error: ZodError }
    expect(data.error.issues[0].message).toBe('Invalid email')
  })
  test.each([
    '12345678',
    'abcdefgh',
    'ABCDEFGH',
    'Password',
    'password123',
    'Password123',
    'Password!',
    'password123!'
  ])('should fail if weak password: %s', async (password) => {
    const data = await testClient(app)['sign-up'].$post({
      json: {
        email: 'john@me.com',
        password
      }
    }).then(res => res.json()) as { error: ZodError }
    expect(data.error.issues[0].message).toBe('Password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character')
  })
})

describe('POST: /login', () => {
  // เริ่มทำงานก่อนรัน test อื่นๆ เพื่อสร้างรหัสผ่านจำลอง สำหรับระบบอื่นอาจจะต้องลบก่อนสร้างใหม่
  beforeAll(async () => {
    await testClient(app)['sign-up'].$post({
      json: {
        email: 'john@me.com',
        password: 'TheStrongPass123!'
      }
    })
  })

  test.each([
    { email: 'user', password: 'password' },
    { email: 'anna@me.com', password: 'TheStrongPass123!' },
    { email: 'john@me.com', password: 'TheStrongPass123' },
  ])('should fail if incorrect email or password: %j', async ({ email, password }) => {
    const data = await testClient(app)['login'].$post({
      json: {
        email,
        password
      }
    }).then(res => res.json()) as { error: string }
    expect(data.error).toBe('Invalid email or password')
  })
})

describe('GET: /me', () => {
  test('should fail if not authenticated', async () => {
    const data = await testClient(app)['me'].$get().then(res => res.json()) as { error: string }
    expect(data.error).toBe('Unauthorized')
  })
  test('should return user email', async () => {
    const { data: { token } } = await testClient(app)['login'].$post({
      json: {
        email: 'john@me.com',
        password: 'TheStrongPass123!'
      }
    }).then(res => res.json())
    const { data } = await testClient(app)['me'].$get({}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
    expect(data.email).toBe('john@me.com')
  })
})
