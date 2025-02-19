import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createNodeWebSocket } from '@hono/node-ws'
import { WSContext } from 'hono/ws'

const app = new Hono()

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

const clients: { id: string; ws: WSContext }[] = []

app.get('/', (c) => {
  return c.html(
    <>
      <h1>Select room</h1>
      <form id="roomForm">
        <input id="roomName" type="text" name="roomName" placeholder="Room name..." />
        <button type="submit">Join</button>
      </form>
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('roomForm').addEventListener('submit', (event) => {
            event.preventDefault()
            const roomName = document.getElementById('roomName').value
            window.location.href = '/chat/' + roomName
          })
        `
      }}></script>
    </>
  )
})

app.get('/chat/:roomName', (c) => {
  const roomName = c.req.param('roomName')
  return c.html(
    <>
      <h1>Chat room: {roomName}</h1>
      <ul id="chat"></ul>
      <form id="messageForm">
        <input id="username" type="text" name="username" placeholder="Username..." required />
        <input id="message" type="text" name="message" placeholder="Message..." required />
        <button type="submit">Send</button>
      </form>
      <script dangerouslySetInnerHTML={{
        __html: `
          const ws = new WebSocket(\`ws://localhost:3000/ws/chat/${roomName}?id=${Date.now()}\`)

          document.getElementById('messageForm').addEventListener('submit', (event) => {
            event.preventDefault()
            const message = document.getElementById('message').value
            const username = document.getElementById('username').value
            ws.send(JSON.stringify({ username, message }))
            document.getElementById('message').value = ''
          })

          ws.onmessage = (event) => {
            const message = document.createElement('li')
            const data = JSON.parse(event.data)
            message.textContent = data.username + ': ' + data.message
            document.getElementById('chat').appendChild(message)
          }
        `
      }}></script>
    </>
  )
})

app.get('/ws/chat/:roomName', upgradeWebSocket((c) => {
  const roomName = c.req.param('roomName')
  const date = c.req.query('id')
  return {
    onOpen: (event, ws) => {
      clients.push({
        id: `${roomName}-${date}`,
        ws
      })
      console.log(`✅ Connection opened to room: ${roomName} for client: ${date}`)
    },
    onMessage(event, ws) {
      const clientsOnRoom = clients.filter(client => client.id.startsWith(`${roomName}-`))
      for (const client of clientsOnRoom) {
        console.log(`📡 Message sent to room: ${roomName} for client: ${client.id} (${event.data})`)
        client.ws.send(String(event.data))
      }
    },
    onClose: () => {
      clients.splice(clients.findIndex(client => client.id === `${roomName}-${date}`), 1)
      console.log(`❌ Connection closed to room: ${roomName} for client: ${date}`)
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
