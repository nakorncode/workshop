import { Prisma, PrismaClient } from '@prisma/client'
import { hash } from '@node-rs/argon2'

const hashPassword = Prisma.defineExtension({
  name: 'hashPassword',
  query: {
    user: {
      async create({ args, query }) {
        if (args.data.password) {
          args.data.password = await hash(args.data.password)
        }
        return query(args)
      },
      async update({ args, query }) {
        if (args.data.password && typeof args.data.password === 'string') {
          args.data.password = await hash(args.data.password)
        }
        return query(args)
      },
    }
  }
})

const getEmptyUserName = Prisma.defineExtension({
  name: 'getEmptyUserName',
  model: {
    user: {
      findEmptyName() {
        return prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
          },
          where: {
            OR: [
              { name: null },
              { name: '' }
            ]
          }
        })
      }
    }
  }
})

export const prisma = new PrismaClient()
  .$extends(hashPassword)
  .$extends(getEmptyUserName)
