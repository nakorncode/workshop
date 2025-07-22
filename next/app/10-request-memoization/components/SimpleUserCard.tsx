export default async function SimpleUserCard() {
  const res = await fetch('https://randomuser.me/api?nat=us')
  const data = await res.json() as {
    results: {
      name: {
        first: string
        last: string
      }
      email: string
    }[]
  }
  const user = data.results[0]
  return (
    <div className="max-w-sm bg-white p-4 shadow-md rounded-md">
      <h2 className="mb-1 text-lg font-bold">{user.name.first} {user.name.last}</h2>
      <p className="text-gray-700">Email: {user.email}</p>
    </div>
  )
}
