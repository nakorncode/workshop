import Counter from "./Counter"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

export default async function Page() {
  const res = await fetch("https://dummyjson.com/users/1?select=firstName,lastName,email")
  const user = await res.json() as User
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Hello Mixed!</h1>
      <p className="mb-4"><b>User:</b> {user.firstName} {user.lastName} ({user.email})</p>
      <Counter />
    </div>
  )
}
