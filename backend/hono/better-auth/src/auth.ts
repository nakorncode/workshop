import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'
import { openAPI } from 'better-auth/plugins'
import { createTransport, getTestMessageUrl } from 'nodemailer'
import { config } from 'dotenv'

config()

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
})

async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const info = await transport.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Preview URL: ${getTestMessageUrl(info)}`)
  } else {
    console.log(`Email ${subject} sent to ${to}`)
  }
}

const prisma = new PrismaClient()
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await sendMail({
        to: user.email,
        subject: 'Verify your email',
        html: `<a href="${url}">Click here to verify your email</a>`,
      })
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  plugins: [
    openAPI()
  ]
})
