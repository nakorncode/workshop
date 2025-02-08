import type { FC } from 'hono/jsx'

export const PageHome: FC = () => {
  return (
    <>
      <h1>Homepage</h1>
      <ul>
        <li><a href="/users">User Management</a></li>
        <li><a href="/products">Product Management</a></li>
      </ul>
    </>
  )
}
