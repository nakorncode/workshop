import Link from 'next/link'
import { users } from './[id]/page'
import { Metadata } from 'next'
import { siteName } from './lib/siteName'

export const metadata: Metadata = {
  title: `List | ${siteName}`,
}

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-bold">User List Page</h1>
      <ul className="list-disc pl-5 mt-3">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/workshops/1-routing/user/${user.id}`} className="text-blue-600 underline">{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
