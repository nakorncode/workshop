import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth'
import expressListRoutes from 'express-list-routes'
import { needSession } from './middleware/needSession'
import { prisma } from './prisma'
import { checkOwnTodo } from './middleware/checkOwnTodo'

const app = express()

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

app.all('/api/auth/*', toNodeHandler(auth))

app.use(express.json())

app.get('/ok', (req, res) => {
  res.send({ message: 'ok' })
})

app.get('/todos', needSession, async (req, res) => {
  const user = res.locals.currentUser
  const data = await prisma.todo.findMany({
    where: {
      userId: user.id,
      isArchived: req.query.withArchived === 'true'
    },
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })
  res.json({ data })
})

app.post('/todos', needSession, async (req, res) => {
  const user = res.locals.currentUser
  const data = await prisma.todo.create({
    data: {
      ...req.body,
      userId: user.id
    }
  })
  res.status(201).json({ data })
})

app.post('/todos/:todoId/items', needSession, checkOwnTodo, async (req, res) => {
  const todoId = req.params.todoId
  const data = await prisma.todoItem.create({
    data: {
      ...req.body,
      todoId
    }
  })
  res.status(201).json({ data })
})

app.patch('/todos/:todoId/mark-all-done', needSession, checkOwnTodo, async (req, res) => {
  const todoId = req.params.todoId
  await prisma.todo.update({
    where: { id: todoId },
    data: {
      done: true,
      items: {
        updateMany: {
          where: { todoId },
          data: { done: true }
        }
      }
    }
  })
  res.json({ message: 'Done' })
})

app.patch('/todos/:todoId/items/:todoItemId/done', needSession, checkOwnTodo, async (req, res) => {
  const todoId = req.params.todoId
  const todoItemId = req.params.todoItemId
  const todoItem = await prisma.todoItem.update({
    where: {
      id: todoItemId,
      todoId
    },
    data: {
      done: req.body.done
    },
    select: {
      todo: {
        select: {
          items: {
            select: {
              done: true
            }
          }
        }
      }
    }
  })
  await prisma.todo.update({
    where: { id: todoId },
    data: {
      done: todoItem.todo.items.every((item) => item.done)
    }
  })
  res.json({ message: 'Done' })
})

app.delete('/todos/:todoId', needSession, checkOwnTodo, async (req, res) => {
  const todoId = req.params.todoId
  await prisma.todo.update({
    where: { id: todoId },
    data: { isArchived: true }
  })
  res.json({ message: 'Deleted' })
})

expressListRoutes(app)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
