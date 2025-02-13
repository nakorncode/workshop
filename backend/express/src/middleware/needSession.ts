import type { NextFunction, Request, Response } from 'express'
import { auth } from '../auth.js'
import { fromNodeHeaders } from 'better-auth/node'

export const needSession = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  })
  if (!session?.user) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }
  res.locals.currentUser = session.user
  next()
}
