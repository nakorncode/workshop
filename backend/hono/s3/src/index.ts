import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import sharp from 'sharp'
import { parse } from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import s3UploadStream from 's3-upload-stream'
import AWS from 'aws-sdk'
import { config } from 'dotenv'

config()

const app = new Hono()
AWS.config.s3 = {
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  }
}
const s3Stream = s3UploadStream(new AWS.S3() as any)

app.post('/upload/avatar', async (c) => {
  const body = await c.req.parseBody()
  if (!(body.file instanceof File)) {
    throw new HTTPException(400, { message: 'Invalid file' })
  }
  const output = `${Date.now()}-${parse(body.file.name).name}.jpg`
  const sharpStream = sharp().resize(200, 200).jpeg()
  const webReadStream = body.file.stream()
  const nodeReadStream = Readable.from(webReadStream as any)
  const upload = s3Stream.upload({
    Bucket: process.env.S3_BUCKET,
    Key: output
  })
  await pipeline(nodeReadStream, sharpStream, upload)
  return c.json({ message: 'Avatar uploaded successfully', path: output })
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
