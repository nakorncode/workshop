import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@prisma/client"
import { openAPI } from "better-auth/plugins"

const prisma = new PrismaClient()
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true
  },
  emailVerification: {
    //
  },
  socialProviders: {
    //
  },
  plugins: [
    openAPI()
  ]
})
