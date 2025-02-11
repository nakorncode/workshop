import { Router } from 'express'
import { getAuth, User } from '../middleware/getAuth'

const router = Router()

router.get('/', getAuth, (req, res) => {
  const user = res.app.get('user') as User | undefined
  if (user) {
    return res.redirect('/')
  }
  return res.render('login')
})

export default router
