import { Hono } from 'hono'
import storeAuth from '../middleware/storeAuth.js'
import { ShowNotification } from '../components/ShowNotification.js'
import { zValidator } from '../utils/zValidator.js'
import { z } from 'zod'
import { auth } from '../auth.js'
import { HTTPException } from 'hono/http-exception'
import { APIError } from 'better-auth/api'
import { makeNotification } from '../utils/notification.js'

const app = new Hono()

app.get('/', storeAuth, (c) => {
  const user = c.get('user')
  if (user) {
    return c.redirect('/')
  }
  return c.render(
    <>
      <div className="container" style={{ maxWidth: '360px' }}>
        <h1 className="mt-4">Login</h1>
        <hr />
        <ShowNotification context={c}></ShowNotification>
        <form action="/login" method="post">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        <p class="mt-3">
          Don&apos;t have an account? <a href="/sign-up">Sign-up</a>
        </p>
      </div>
    </>
  )
})

const validator = zValidator(z.object({
  email: z.string({ message: 'Email is required' }),
  password: z.string({ message: 'Password is required' }),
}))

app.post('/', validator, async (c) => {
  const data = await c.req.valid('form')
  try {
    const res = await auth.api.signInEmail({
      body: data,
      asResponse: true
    })
    // ส่งต่อ Cookie จาก Response Better Auth ไปยัง Response Hono ของเรา
    // ไม่เช่นนั้น Cookie จะถูก Set แค่บน Hono Server (ไม่ได้ Set บน Client)
    c.res.headers.set('Set-Cookie', res.headers.get('Set-Cookie') ?? '')
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 'UNAUTHORIZED') {
        throw new HTTPException(401, { message: 'Invalid credentials' })
      }
      throw new HTTPException(401, { message: error.message })
    }
    throw error
  }
  makeNotification(c, ['Login successful.'])
  return c.redirect('/')
})

export default app
