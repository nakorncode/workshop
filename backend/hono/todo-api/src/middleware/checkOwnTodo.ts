import { zValidator } from '@hono/zod-validator'
import { createFactory } from 'hono/factory'
import { z } from 'zod'
import { prisma } from '../prisma.js'
import { needSession } from './needSession.js'
import { HTTPException } from 'hono/http-exception'

const factory = createFactory()

export const checkOwnTodo = factory.createHandlers(zValidator('param', z.object({
  todoId: z.string()
})), needSession, async (c, next) => {
  const count = await prisma.todo.count({
    where: {
      id: c.req.valid('param').todoId,
      userId: c.get('currentUser').id,
    }
  })
  if (count === 0) {
    throw new HTTPException(403, { message: 'Forbidden' })
  }
  await next()
})
