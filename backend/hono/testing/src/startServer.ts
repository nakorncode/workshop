import { serve } from '@hono/node-server'
import { app } from './index.js'

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
