import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import acceptLanguageParser from 'accept-language-parser'

const app = new Hono()

app.get('/say-hello', (c) => {
  const acceptLanguage = c.req.header('Accept-Language')
  // https://www.npmjs.com/package/accept-language-parser
  const parsed = acceptLanguageParser.parse(acceptLanguage)
  const mostPreferred = parsed[0]
  if (mostPreferred.code.includes('th')) {
    return c.text('สวัสดี')
  }
  if (mostPreferred.code.includes('jp')) {
    return c.text('こんにちは')
  }
  if (mostPreferred.code.includes('ru')) {
    return c.text('Привет')
  }
  if (mostPreferred.code.includes('vi')) {
    return c.text('Xin ch o')
  }
  if (mostPreferred.code.includes('de')) {
    return c.text('Hallo')
  }
  if (mostPreferred.code.includes('fr')) {
    return c.text('Bonjour')
  }
  if (mostPreferred.code.includes('it')) {
    return c.text('Ciao')
  }
  if (mostPreferred.code.includes('es')) {
    return c.text('Hola')
  }
  if (mostPreferred.code.includes('pt')) {
    return c.text('Ol')
  }
  return c.text('Hello')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
