import type { FC } from 'hono/jsx'
import { getNotification } from '../utils/notification.js'
import type { Context } from 'hono'

export const ShowNotification: FC<{ context: Context }> = (props) => {
  const notification = getNotification(props.context)
  if (!notification) {
    return null
  }
  return (
    <div className={`alert alert-${notification.status}`} role="alert">
      <ul class="mb-0">
        {notification.messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  )
}
