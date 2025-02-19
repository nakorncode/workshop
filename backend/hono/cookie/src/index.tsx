import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'

// ตั้งตัวแปร context ให้ได้ TypeScript https://hono.dev/docs/api/context#set-get
const app = new Hono<{
  Variables: {
    notificationMessage: string | undefined
  }
}>()

// Middleware สำหรับล้าง Cookie Message หลังจาก next() คือได้รัน Handler เสร็จแล้ว
app.use(async (c, next) => {
  const notificationMessage = getCookie(c, 'notificationMessage')
  c.set('notificationMessage', notificationMessage)
  await next()
  if (notificationMessage) {
    deleteCookie(c, 'notificationMessage')
  }
})

app.get('/', (c) => {
  const theme = getCookie(c, 'theme')
  const notificationMessage = c.get('notificationMessage')
  const css = `
    body.dark {
      background-color: black;
      color: white;
    }
    body.dark h1 {
      color: white;
    }
  `
  return c.html(
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>{css}</style>
    </head>
    <body className={theme === 'dark' ? 'dark' : ''}>
      <h1>Theme switcher</h1>
      {notificationMessage && <p>Message: {notificationMessage}</p>}
      <ul>
        <li><a href="/switch-theme?theme=dark">Theme: Dark</a></li>
        <li><a href="/switch-theme?theme=light">Theme: Light</a></li>
      </ul>
    </body>
    </html>
  )
})

app.get('/switch-theme', (c) => {
  const theme = c.req.query('theme')
  if (theme !== 'dark' && theme !== 'light') {
    throw new HTTPException(400, { message: 'Invalid theme' })
  }
  // c.res.headers.set('Set-Cookie', `theme=${theme}`)
  setCookie(c, 'theme', theme, {
    httpOnly: true, // ไม่ต้องการให้ JavaScript แก้ไข Cookie นี้ได้
    secure: process.env.NODE_ENV === 'production', // ใช้ HTTPS ก็ต่อเมื่อรันบน Production
    maxAge: 60 * 60 * 24 * 365, // 1 year (ไม่ควรตั้งนานเกิน 1 ปีกรณีที่ต้องการ Sesion ระยะยาว)
  })
  return c.redirect('/')
})

app.get('/make-notification/:message', (c) => {
  const message = c.req.param('message')
  // c.res.headers.set('Set-Cookie', `notification=${message}`)
  setCookie(c, 'notificationMessage', message)
  return c.redirect('/')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
