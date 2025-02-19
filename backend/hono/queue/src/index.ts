import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { config } from 'dotenv'
import PgBoss from 'pg-boss'
import { createTransport, getTestMessageUrl } from 'nodemailer'

config()

const app = new Hono()
const boss = new PgBoss(process.env.DATABASE_URL)

await boss.start()
await boss.createQueue('email')
await boss.work<{ email: string; subject: string; html: string }>('email', { batchSize: 5 }, async (jobs) => {
  await Promise.all(jobs.map(async (job) => {
    const info = await transport.sendMail({
      from: process.env.SMTP_FROM,
      to: job.data.email,
      subject: job.data.subject,
      html: job.data.html,
    })
    if (process.env.NODE_ENV !== 'production') {
      console.log(new Date(), `Preview URL: ${getTestMessageUrl(info)}`)
    } else {
      console.log(`Email ${job.data.subject} sent to ${job.data.email}`)
    }
  }))
})

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
})

app.post('/send-mail', async (c) => {
  const data = await c.req.json() as { email: string; subject: string; html: string }
  const id = await boss.send('email', data)
  return c.json({ success: true, message: `Created job ${id} in queue email` })
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
