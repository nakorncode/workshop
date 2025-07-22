export default async function FancyUserCard() {
  const res = await fetch('https://randomuser.me/api?nat=us')
  const data = await res.json() as {
    results: {
      name: {
        first: string
        last: string
      }
      email: string
      picture: {
        large: string
      }
    }[]
  }
  const user = data.results[0]
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-5 shadow-xl rounded-xl inline-flex items-center justify-center gap-4">
      <img src={user.picture.large} alt="User Picture" className="mt-2 rounded-full" />
      <div>
        <h2 className="mb-1 font-bold text-2xl text-shadow-sm">{user.name.first} {user.name.last}</h2>
        <p className="text-gray-200 text-shadow-sm underline">{user.email}</p>
      </div>
    </div>
  )
}
