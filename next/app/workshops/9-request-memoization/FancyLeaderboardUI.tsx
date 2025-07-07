export default async function FancyLeaderboardUI() {
  const url = new URL('/workshops/9-request-memoization/api/leaderboard', process.env.NEXT_PUBLIC_BASE_URL)
  const user = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.user)
  return (
    <div>
      <div className="p-4 rounded-md border border-gray-200 shadow inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold">
        <p>Current leaderboard: {user}</p>
      </div>
    </div>
  )
}
