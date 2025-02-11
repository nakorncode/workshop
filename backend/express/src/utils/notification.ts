import { Response } from 'express'

interface Notification {
  messages: string[]
  status: 'success' | 'danger'
}

export function makeNotification(res: Response, messages: string[], status: Notification['status'] = 'success'): void {
  const jsonMessages = JSON.stringify({ messages, status })
  res.cookie('notification', jsonMessages)
}
