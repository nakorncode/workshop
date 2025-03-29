import { authClient } from '~/utils/auth-client'
import type { H3Event } from 'h3'

export async function getCurrentUser(event: H3Event) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: getHeader(event, 'cookie') || ''
      }
    }
  })
  if (session.error || !session.data) {
    return null
  }
  return session.data.user
}
