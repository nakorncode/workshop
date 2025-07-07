'use client'

import { useEffect, useState } from 'react'

export default function RefreshAbleLeaderboardUI() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState('')

  async function fetchLeaderboard() {
    setLoading(true)
    const url = new URL('/workshops/9-request-memoization/api/leaderboard', process.env.NEXT_PUBLIC_BASE_URL)
    const user = await fetch(url)
      .then((res) => res.json())
      .then((data) => data.user)
    setUser(user)
    setLoading(false)
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return (
    <div>
      <div className="p-4 rounded-md border border-gray-900 shadow bg-gray-800 text-white inline-block">
        <p>Current leaderboard: {user}</p>
        <button onClick={fetchLeaderboard} disabled={loading} className="mt-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50">Refresh</button>
      </div>
    </div>
  )
}
