import getRandomName from '@/app/lib/getRandomName'

export default async function FancyLeaderboardUI() {
  const name = await getRandomName()
  return (
    <div>
      <div className="p-4 rounded-md border border-gray-200 shadow inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold">
        <p>Current leaderboard: {name}</p>
      </div>
    </div>
  )
}
