import { Hono } from 'hono'
import storeAuth from '../middleware/storeAuth.js'
import { ShowNotification } from '../components/ShowNotification.js'
import { zValidator } from '../utils/zValidator.js'
import { z } from 'zod'
import { auth } from '../auth.js'
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
        <h1 className="mt-4">Sign-up</h1>
        <hr />
        <ShowNotification context={c}></ShowNotification>
        <form action="/sign-up" method="post">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" required />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">Password Confirm</label>
            <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        <p class="mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </>
  )
})

const validator = zValidator(z.object({
  name: z.string({ message: 'Name is required' }).min(1, { message: 'Name is required' }),
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ message: 'Password is required' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
  }),
  passwordConfirm: z.string({ message: 'Password confirmation is required' }),
}).superRefine(({ password, passwordConfirm }, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match'
    })
  }
}))

app.post('/', validator, async (c) => {
  const data = await c.req.valid('form')
  await auth.api.signUpEmail({
    body: data
  })
  makeNotification(c, ['Sign-up successful. You can login now.'])
  return c.redirect('/login')
})

export default app

