import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { showRoutes } from 'hono/dev'
import { auth } from './auth.js'
import { cors } from 'hono/cors'
import { needSession } from './middleware/needSession.js'
import { PrismaClient } from '@prisma/client'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { prisma } from './prisma.js'
import { checkOwnTodo } from './middleware/checkOwnTodo.js'

const app = new Hono()

app.use('*', cors({
  origin: 'http://localhost:3001',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))

app.get('/ok', (c) => {
  return c.json({ message: 'ok' })
})

app.get('/todos', needSession, zValidator('query', z.object({
  withArchived: z.boolean().optional()
})), async (c) => {
  const user = c.get('currentUser')
  const data = await prisma.todo.findMany({
    where: {
      userId: user.id,
      isArchived: c.req.valid('query').withArchived ?? false
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
  return c.json({ data })
})

app.post('/todos', zValidator('json', z.object({
  title: z.string({ message: 'Title is required' }).min(1, { message: 'Title is required' }),
  description: z.string().optional()
})), needSession, async (c) => {
  const user = c.get('currentUser')
  const data = await prisma.todo.create({
    data: {
      ...c.req.valid('json'),
      userId: user.id
    }
  })
  return c.json({ data }, 201)
})

app.post('/todos/:todoId/items', zValidator('json', z.object({
  title: z.string({ message: 'Title is required' }).min(1, { message: 'Title is required' }),
})), ...checkOwnTodo, async (c) => {
  const todoId = c.req.param('todoId')
  const data = await prisma.todoItem.create({
    data: {
      ...c.req.valid('json'),
      todoId
    }
  })
  return c.json({ data }, 201)
})

app.patch('/todos/:todoId/mark-all-done', ...checkOwnTodo, async (c) => {
  const todoId = c.req.param('todoId')
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
  return c.json({ message: 'Done' })
})

app.patch('/todos/:todoId/items/:todoItemId/done', ...checkOwnTodo, zValidator('json', z.object({
  done: z.boolean()
})), async (c) => {
  const todoId = c.req.param('todoId')
  const todoItemId = c.req.param('todoItemId')
  const todoItem = await prisma.todoItem.update({
    where: {
      id: todoItemId,
      todoId
    },
    data: {
      done: c.req.valid('json').done
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
  return c.json({ message: 'Done' })
})

app.delete('/todos/:todoId', ...checkOwnTodo, async (c) => {
  const todoId = c.req.param('todoId')
  await prisma.todo.update({
    where: { id: todoId },
    data: { isArchived: true }
  })
  return c.json({ message: 'Deleted' })
})

showRoutes(app)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
