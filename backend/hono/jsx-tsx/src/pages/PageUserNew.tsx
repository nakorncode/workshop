import type { FC } from 'hono/jsx'
import { LayoutUserManagement } from '../layouts/LayoutUserManagement.js'

export const PageUserNew: FC = () => {
  return (
    <LayoutUserManagement>
      <h2>New user</h2>
      <form action="/users" method="post">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" placeholder="Name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" placeholder="Email" required />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input type="date" name="birthDate" id="birthDate" required />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select name="role" id="role">
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </LayoutUserManagement>
  )
}
