import { createUser, listUser } from './UserManagement'

export default async function Page() {
  const users = await listUser()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Server Actions</h1>

      <hr className="my-4" />

      <h2 className="text-lg font-bold mb-1">Create user</h2>
      <form action={createUser}>
        <input type="text" name="username" placeholder="Username" className="border border-gray-300 px-2 py-1 mr-2" />
        <input type="password" name="password" placeholder="Password" className="border border-gray-300 px-2 py-1 mr-2" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Create User</button>
      </form>

      <hr className="my-4" />

      <h2 className="text-lg font-bold mb-1">List user</h2>
      <ul className="pl-5 list-disc">
        {users.map(user => <li key={user.id}>{user.username} (Password: {user.password})</li>)}
      </ul>
    </>
  )
}
