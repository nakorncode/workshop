import { Request, Response, NextFunction } from 'express'
import { prisma } from '../prisma.js'

export const checkOwnTodo = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.todoId) {
    res.status(400).json({ message: 'Invalid request' })
    return
  }

  if (!res.locals.currentUser) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const count = await prisma.todo.count({
    where: {
      id: req.params.todoId,
      userId: res.locals.currentUser.id,
    },
  })

  if (count === 0) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }

  next()
}
