import type { FC } from 'hono/jsx'

export const LayoutUserManagement: FC = (props) => {
  return (
    <>
      <h1>User Management</h1>
      <nav>
        <ul>
          <li><a href="/">Back to Homepage</a></li>
          <li><a href="/users">User list</a></li>
          <li><a href="/users/new">New user</a></li>
        </ul>
      </nav>

      <hr />

      <main>
        {props.children}
      </main>
    </>
  )
}
