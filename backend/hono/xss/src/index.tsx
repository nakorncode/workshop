import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { SignJWT, jwtVerify } from 'jose'
import { HTTPException } from 'hono/http-exception'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'

const app = new Hono<{
  Variables: {
    user?: User
  }
}>()
const JWT_SECRET = 'MustBeSecret'

interface User {
  id: number
  username: string
  password: string
}

interface Article {
  id: number
  userId: number
  title: string
  body: string
}

const users: User[] = [
  { id: 1, username: 'john', password: '123' },
  { id: 2, username: 'i_am_hacker', password: '123' },
]

const articles: Article[] = [
  { id: 1, userId: 1, title: 'Article A', body: 'Laboris <b>voluptate</b> in irure magna deserunt cupidatat nisi.' },
  { id: 2, userId: 1, title: 'Article B', body: 'Tempor consectetur id <u>aliquip</u> consequat ut sunt labore.' },
  { id: 3, userId: 2, title: 'YET ANOTHER CLAIM YOUR REWARD', body: `
    <p>PLEASE WAIT 3 SECOND WE WILL HAVE YOUR DATA!</p>
    <script>
      setTimeout(() => {
        alert('HERE IS YOUR COOKIE: ' + document.cookie)
      }, 3000)
    </script>
  ` }
]

app.use(async (c, next) => {
  const token = getCookie(c, 'token')
  if (token) {
    try {
      const { payload: { userId } } = await jwtVerify<{ userId: number }>(token, new TextEncoder().encode(JWT_SECRET))
      const user = users.find((user) => user.id === userId)
      if (user) {
        c.set('user', user)
      }
    } catch (error) {
      deleteCookie(c, 'token')
    }
  }
  await next()
})

app.get('/', (c) => {
  const user = c.get('user')
  return c.html(
    <>
      {!user && (
        <>
          <h2>Login</h2>
          <form action="/login" method="post">
            <div>
              <label>Username</label>
              <input type="text" name="username" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" />
            </div>
            <button>Login</button>
          </form>
        </>
      )}
      {user && (
        <>
          <h2>Welcome, {user.username}</h2>
          <a href="/logout">Logout</a>
        </>
      )}

      <hr />

      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li>
            <a href={`/articles/${article.id}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
})

app.post('/login', async (c) => {
  const { username, password } = await c.req.parseBody() as { username: string; password: string }
  const user = users.find((user) => user.username === username && user.password === password)
  if (!user) {
    throw new HTTPException(400, { message: 'Invalid username or password' })
  }
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(new TextEncoder().encode(JWT_SECRET))
  // ⚠️ ส่วนนี้อันตรายมากถ้าลืม httpOnly เพราะจะเปิดโอกาสโจมตี XSS ขโมยข้อมูล Cookie สำหรับการเข้าสู่ระบบได้เช่นกัน
  setCookie(c, 'token', token)
  return c.redirect('/')
})

app.get('/logout', (c) => {
  deleteCookie(c, 'token')
  return c.redirect('/')
})

app.get('/articles/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const article = articles.find((article) => article.id === id)
  if (!article) {
    throw new HTTPException(404, { message: 'Article not found' })
  }
  return c.html(
    <>
      <h2>{article.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: article.body }}></p>
    </>
  )
})

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
