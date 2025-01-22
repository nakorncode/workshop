import express from 'express'
import { db } from './db'

const app = express()

app.use(express.json())

app.post('/sign-up', async (req, res) => {
  await db.table('users').insert({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  res.json({ message: 'User created' })
})

app.get('/users', async (req, res) => {
  const page = Number(req.query.page) || 1
  const offset = (page - 1) * 10
  const query = req.query.q as string
  const users = await db.table('users')
    .select('id', 'name', 'email', 'created_at')
    .where(function (this: any) {
      if (query) {
        this.where('name', 'like', `%${query}%`).orWhere('email', 'like', `%${query}%`)
      }
    })
    .offset(offset)
    .limit(10)
  res.json(users)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})