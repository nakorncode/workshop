import FancyLeaderboardUI from './FancyLeaderboardUI'
import MinimalLeaderboardUI from './MinimalLeaderboardUI'
import RefreshAbleLeaderboardUI from './RefreshAbleLeaderboardUI'

export default async function Page() {
  // เนื่องจาก fetch() หากรันบน Server จะไม่ได้ Base URL จาก Origin จึงต้องกำหนด Base URL ด้วยตนเอง
  const url = new URL('/workshops/9-request-memoization/api/leaderboard', process.env.NEXT_PUBLIC_BASE_URL)
  const user = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.user)
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Request Memoization</h1>
      <div className="space-y-3">
        <p>Current leaderboard: {user}</p>
        <MinimalLeaderboardUI></MinimalLeaderboardUI>
        <FancyLeaderboardUI></FancyLeaderboardUI>
        {/* จะมีเพียง 'use client' เท่านั้นที่จะได้ผลลัพธ์ไม่เหมือนกัน */}
        <RefreshAbleLeaderboardUI></RefreshAbleLeaderboardUI>
      </div>
    </>
  )
}
