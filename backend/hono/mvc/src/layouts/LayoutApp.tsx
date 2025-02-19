import type { FC } from 'hono/jsx'

export const LayoutApp: FC = ({ children }) => {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/create/employee">Create Employee</a></li>
          </ul>
        </nav>

        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
