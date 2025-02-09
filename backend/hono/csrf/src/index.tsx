import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { SignJWT, jwtVerify } from 'jose'
import { getCookie, setCookie } from 'hono/cookie'
import { createMiddleware } from 'hono/factory'

const app = new Hono()
const JWT_SECRET = 'MustBeSecret'

interface User {
  id: number
  username: string
  password: string
  credit: number
  posts?: Post[]
}

interface Post {
  id: number
  title: string
}

const users: User[] = [
  {
    id: 1,
    username: 'john',
    password: '123',
    credit: 2000,
    posts: [
      { id: 1, title: 'Hello world' },
      { id: 2, title: 'I am John' },
      { id: 3, title: 'Nice to meet you' }
    ]
  },
  {
    id: 2,
    username: 'i_am_hacker',
    password: '123',
    credit: 100
  }
]

const withAuth = createMiddleware<{
  Variables: {
    userId: number
    user: User
  }
}>(async (c, next) => {
  const token = getCookie(c, 'token')
  if (!token) {
    return c.html(<div>Unauthorized</div>, 401)
  }
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    if (!payload.userId || typeof payload.userId !== 'number') {
      return c.html(<div>Unauthorized</div>, 401)
    }
    c.set('userId', payload.userId)
    const user = users.find((user) => user.id === payload.userId)
    if (!user) {
      return c.html(<div>User not found</div>, 404)
    }
    c.set('user', user)
    await next()
  } catch (e) {
    return c.html(<div>Unauthorized</div>, 401)
  }
})

app.get('/', (c) => {
  return c.html(
    <ul>
      <li><a href="/login">Login</a></li>
    </ul>
  )
})

app.get('/users', async (c) => {
  return c.html(
    <>
      <ul>
        {users.map((user) => (
          <li>
            <span>Username: {user.username}; Credit: {user.credit}</span>
          </li>
        ))}
      </ul>

      <ul>
        {users.map((user) => (
          user.posts?.map((post) => (
            <li>
              <span>Post by {user.username}: {post.title}</span>
            </li>
          ))
        ))}
      </ul>
    </>
  )
})

app.get('/login', (c) => {
  return c.html(
    <form action="/login" method="post">
      <label>
        Username:
        <input name="username" />
      </label>
      <label>
        Password:
        <input name="password" type="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  )
})

app.post('/login', async (c) => {
  const { username, password } = await c.req.parseBody() as { username: string; password: string }
  const user = users.find((user) => user.username === username && user.password === password)
  if (!user) {
    return c.html(<div>Invalid username or password</div>, 400)
  }
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(new TextEncoder().encode(JWT_SECRET))
  // ❌ ส่วนนี้ถ้าเราตั้ง sameSite: 'none' จะเกิดปัญหาโจมตี CSRF ง่ายอย่างมาก (จะใช้ SameSite: None ได้ก็ต่อเมื่อมีค่า Secure)
  setCookie(c, 'token', token, { httpOnly: true, sameSite: 'none', secure: true })
  return c.redirect('/me')
})

app.get('/me', withAuth, async (c) => {
  const user = c.get('user')
  return c.html(
    <>
      <div>
        <div>Username: {user.username}</div>
        <div>Credit: {user.credit}</div>
      </div>
      <div>
        <ul>
          {user.posts?.map((post) => (
            <li>{post.title} <a href={`/posts/${post.id}/delete`}>Delete</a></li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          <li><a href="/transfer">Transfer</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </>
  )
})

app.get('/transfer', withAuth, async (c) => {
  const user = c.get('user')
  return c.html(
    <>
      <div>Credit left: {user.credit}</div>
      <form action="/transfer" method="post">
        <label>
          To Username:
          <input name="username" />
        </label>
        <label>
          Amount:
          <input name="amount" />
        </label>
        <button type="submit">Begin Transfer</button>
      </form>
    </>
  )
})

app.post('/transfer', withAuth, async (c) => {
  const { username, amount } = await c.req.parseBody() as { username: string; amount: string }
  const amountNumber = Number(amount)
  if (isNaN(amountNumber)) {
    return c.html(<div>Invalid amount</div>, 400)
  }
  const toUser = users.find((user) => user.username === username)
  if (!toUser) {
    return c.html(<div>Invalid username</div>, 400)
  }
  const user = c.get('user')
  if (user.credit < amountNumber) {
    return c.html(<div>Not enough credit</div>, 400)
  }
  user.credit -= amountNumber
  toUser.credit += amountNumber
  return c.html(
    <div>Success to transfer {amountNumber} credit to {toUser.username}</div>
  )
})

// ❌ การลบข้อมูลถือว่าเป็น Sensitive เช่นนี้ควรใช้ Method POST เพื่อป้องกัน CSRF
app.get('/posts/:id/delete', withAuth, async (c) => {
  const postId = c.req.param('id')
  const user = c.get('user')
  const post = user.posts?.find((post) => post.id === Number(postId))
  if (!post) {
    return c.html(<div>Invalid post</div>, 400)
  }
  user.posts = user.posts?.filter((post) => post.id !== Number(postId))
  return c.html(<div>Success to delete post</div>)
})

app.get('/logout', withAuth, async (c) => {
  setCookie(c, 'token', '', { httpOnly: true })
  return c.redirect('/')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
