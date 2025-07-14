import getRandomName from '@/app/lib/getRandomName'
import FancyLeaderboardUI from './FancyLeaderboardUI'
import MinimalLeaderboardUI from './MinimalLeaderboardUI'
import RefreshAbleLeaderboardUI from './RefreshAbleLeaderboardUI'

export default async function Page() {
  // เนื่องจาก fetch() หากรันบน Server จะไม่ได้ Base URL จาก Origin จึงต้องกำหนด Base URL ด้วยตนเอง
  const name = await getRandomName()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Request Memoization</h1>
      <div className="space-y-3">
        <p>Current leaderboard: {name}</p>
        <MinimalLeaderboardUI></MinimalLeaderboardUI>
        <FancyLeaderboardUI></FancyLeaderboardUI>
        {/* จะมีเพียง 'use client' เท่านั้นที่จะได้ผลลัพธ์ไม่เหมือนกัน */}
        <RefreshAbleLeaderboardUI></RefreshAbleLeaderboardUI>
      </div>
    </>
  )
}
