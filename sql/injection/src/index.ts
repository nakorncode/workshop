import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db, initDatabaseWithSample, type User } from './db.js'
import { checkAuthId, clearAuth, setAuth } from './token.js'
import { auth } from './middleware.js'

const app = new Hono()

await initDatabaseWithSample()

app.get('/', async (c) => {
  const userId = await checkAuthId(c)
  return c.html(`
    <h1>Home</h1>
    ${userId ? `
      <a href="/me">My profile (${userId})</a> | <a href="/logout">Logout</a>
    ` : `<a href="/login">Login</a>`}
  `)
})

app.get('/login', (c) => {
  return c.html(`
    <h1>Login</h1>
    <form action="/login" method="post">
      <input type="email" name="email" id="email" placeholder="Email" />
      <input type="password" name="password" id="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  `)
})

app.post('/login', async (c) => {
  const { email, password } = await c.req.parseBody<{ email: string, password: string }>()

  // ❌ อย่าหาทำเด็ดขาด ทำแบบนี้จะเกิดการ Injection ได้
  // ➡️ Email = `jane@me.com' --`
  const query = `SELECT id FROM users WHERE email = '${email}' AND password = '${password}'`
  console.log('Query:', query)
  const user = await db.prepare(query).get() as { id: number } | undefined

  // ✅ แบบนี้ถึงจะไม่เกิดการ Injection คือใช้ ? ใน Statement แทน
  // const user = await db.prepare('SELECT id FROM users WHERE email = ? AND password = ?').get(email, password) as { id: number } | undefined

  if (!user) {
    return c.html('Invalid email or password')
  }
  await setAuth(c, user.id)
  return c.redirect('/')
})

app.get('/logout', async (c) => {
  clearAuth(c)
  return c.redirect('/')
})

app.get('/me', auth, async (c) => {
  const userId = c.get('userId')
  const user = await db.prepare('SELECT id, displayName, email FROM users WHERE id = ?').get(userId) as Omit<User, 'password'>
  return c.html(`
    <h1>My profile (${userId})</h1>
    <ul>
      <li>Display name: ${user.displayName}</li>
      <li>Email: ${user.email}</li>
    </ul>
    <form action="/me" method="post">
      <input type="text" name="displayName" id="displayName" placeholder="Display name" value="${user.displayName}" />
      <button type="submit">Update</button>
    </form>
  `)
})

app.post('/me', auth, async (c) => {
  try {
    const userId = c.get('userId')
    const { displayName } = await c.req.parseBody<{ displayName: string }>()

    // ❌ .exec() ไม่ปลอดภัยอย่างมาก https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#execstring---this
    // ➡️ Display Name = `; DROP TABLE users --`
    const query = `UPDATE users SET displayName = '${displayName}' WHERE id = ${userId}`
    console.log('Query:', query)
    await db.exec(query)

    // ✅ แบบนี้ถึงจะไม่เกิดการ Injection ต้องพยายามใช้ Safe Statement ตามที่ Driver มีให้เราใช้
    // await db.prepare('UPDATE users SET displayName = ? WHERE id = ?').run(displayName, userId)
    return c.redirect('/me')
  } catch (error) {
    return c.html(String(error))
  }
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
