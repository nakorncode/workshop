import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:3001'],
  emailAndPassword: {
    enabled: true
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
})
