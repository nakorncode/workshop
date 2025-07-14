import getRandomName from '@/app/lib/getRandomName'

export default async function MinimalLeaderboardUI() {
  const name = await getRandomName()
  return (
    <div>
      <div className="p-4 rounded-md border border-gray-200 shadow inline-block">
        <p>Current leaderboard: {name}</p>
      </div>
    </div>
  )
}
