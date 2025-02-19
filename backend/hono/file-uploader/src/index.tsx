import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import sharp from 'sharp'
import { parse } from 'node:path'
import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const app = new Hono()

app.get('/', (c) => {
  return c.html(
    <>
      <h1>File Uploader</h1>
      <form action="/upload/avatar" method="post" enctype="multipart/form-data">
        <input type="file" name="file" accept="image/*" />
        <button type="submit">Upload</button>
      </form>
    </>
  )
})

app.post('/upload/avatar', async (c) => {
  const body = await c.req.parseBody()
  if (!(body.file instanceof File)) {
    throw new HTTPException(400, { message: 'Invalid file' })
  }
  const output = `./uploads/${Date.now()}-${parse(body.file.name).name}.jpg`
  const writeStream = createWriteStream(output)
  const sharpStream = sharp().resize(200, 200).jpeg()
  const webReadStream = body.file.stream()
  const nodeReadStream = Readable.from(webReadStream as any)
  // ควรใช้ Stream แทนการอ่าน Buffer เพื่อลดการใช้ Memory
  await pipeline(nodeReadStream, sharpStream, writeStream)
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
