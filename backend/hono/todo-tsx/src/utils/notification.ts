import type { Context } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

interface Notification {
  messages: string[]
  status: 'success' | 'danger'
}

export function getNotification(c: Context): Notification | undefined {
  const notification = getCookie(c, 'notification')
  if (!notification) return
  deleteCookie(c, 'notification')
  return JSON.parse(notification) as Notification
}

export function makeNotification(c: Context, messages : string[], status: Notification['status'] = 'success'): void {
  setCookie(c, 'notification', JSON.stringify({ messages, status }))
}
