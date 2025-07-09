import Link from 'next/link'
import { users } from './[id]/page'

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
