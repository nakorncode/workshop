import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createNodeWebSocket } from '@hono/node-ws'
import { WSContext } from 'hono/ws'

const app = new Hono()

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

const clients = new Set<WSContext<WebSocket>>()

app.get('/', (c) => {
  return c.html(
    <>
      <h1>Chat room</h1>
      <ul id="chat"></ul>
      <form id="messageForm">
        <input id="message" type="text" name="message" placeholder="Message..." />
        <button type="submit">Send</button>
      </form>
      <script dangerouslySetInnerHTML={{
        __html: `
          const ws = new WebSocket('ws://localhost:3000/chat')

          document.getElementById('messageForm').addEventListener('submit', (event) => {
            event.preventDefault()
            const message = document.getElementById('message').value
            ws.send(message)
            document.getElementById('message').value = ''
          })

          ws.onmessage = (event) => {
            const message = document.createElement('li')
            message.textContent = event.data
            document.getElementById('chat').appendChild(message)
          }
        `
      }}></script>
    </>
  )
})

app.get('/chat', upgradeWebSocket((c) => {
  return {
    onOpen: (_event, ws) => {
      console.log('Connection opened')
      clients.add(ws)
    },
    onMessage(event, ws) {
      console.log(`Message from client: ${event.data}`)
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(event.data.toString())
        }
      })
    },
    onClose: (_event, ws) => {
      clients.delete(ws)
      console.log('Connection closed')
    },
  }
}))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

const server = serve({
  fetch: app.fetch,
  port
})
injectWebSocket(server)
