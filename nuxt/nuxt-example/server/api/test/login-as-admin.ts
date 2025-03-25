import { SignJWT } from 'jose'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = await new SignJWT({ isAdmin: true })
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(config.jwtSecret))
  setCookie(event, 'token', token, {
    httpOnly: true // xss protection
  })
  sendRedirect(event, '/admin')
})