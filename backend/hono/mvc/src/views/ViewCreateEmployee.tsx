import type { FC } from 'hono/jsx'
import { LayoutApp } from '../layouts/LayoutApp.js'

export const ViewCreateEmployee: FC = () => {
  return (
    <LayoutApp>
      <h1>Create Employee</h1>

      <form action="/employees" method="post">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input type="text" name="role" id="role" required />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </LayoutApp>
  )
}
