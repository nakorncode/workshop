import type { FC } from 'hono/jsx'
import { LayoutUserManagement } from '../layouts/LayoutUserManagement.js'
import type { User } from '../data/user.js'

export const PageUser: FC<{ users: User[] }> = (props) => {
  return (
    <LayoutUserManagement>
      <h2>Users</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.birthDate.toISOString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutUserManagement>
  )
}
