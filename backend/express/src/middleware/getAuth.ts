import { Request, Response, NextFunction } from 'express'
import { auth } from '../auth'
import { fromNodeHeaders } from 'better-auth/node'

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
}

export const getAuth = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  if (session?.user) {
    res.app.set('user', session.user)
  }
  next()
}
