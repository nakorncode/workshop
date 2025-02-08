import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { createTransport, getTestMessageUrl } from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = new Hono()

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
})

app.post('/send-mail', async (c) => {
  const { email, subject, text } = await c.req.json()
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject,
    text,
  })
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Preview URL: ${getTestMessageUrl(info)}`)
  }
  return c.json({ success: true })
})

app.onError((err, c) => {
  console.error(err)
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }
  return c.json({ error: 'Internal server error' }, 500)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
