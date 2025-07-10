import { cookies, headers } from 'next/headers'
import { Code } from './Code'

export default async function ServerComponent() {
  const headersList = await headers()
  const cookieStore = await cookies()
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Server Components</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Code>headers()</Code>
          {headersList.get('user-agent')}
        </li>
        <li>
          <Code>cookies()</Code>
          {cookieStore.get('test')?.value || 'not found'}
        </li>
        <li>
          <Code>redirect()</Code>
          <a href="/workshops/17-functions/testing-set-cookie" className="text-blue-600 underline">Set cookie for testing</a>
        </li>
      </ul>
    </>
  )
}
