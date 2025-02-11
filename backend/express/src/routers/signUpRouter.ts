import { Router } from 'express'
import { getAuth, User } from '../middleware/getAuth'
import { z } from 'zod'
import { auth } from '../auth'
import { makeNotification } from '../utils/notification'

const router = Router()

router.get('/', getAuth, (req, res) => {
  const user = res.app.get('user') as User | undefined
  if (user) {
    return res.redirect('/')
  }
  return res.render('sign-up')
})

router.post('/', async (req, res) => {
  const data = await z.object({
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
  }).parseAsync(req.body)
  await auth.api.signUpEmail({
    body: data
  })
  makeNotification(res, ['Sign-up successful. You can login now.'])
  return res.redirect('/login')
})

export default router
