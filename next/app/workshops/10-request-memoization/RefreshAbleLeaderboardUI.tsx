'use client'

import getRandomName from '@/app/lib/getRandomName'
import { useEffect, useState } from 'react'

export default function RefreshAbleLeaderboardUI() {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')

  async function fetchLeaderboard() {
    setLoading(true)
    setName(await getRandomName())
    setLoading(false)
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return (
    <div>
      <div className="p-4 rounded-md border border-gray-900 shadow bg-gray-800 text-white inline-block">
        <p>Current leaderboard: {name}</p>
        <button onClick={fetchLeaderboard} disabled={loading} className="mt-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50">Refresh</button>
      </div>
    </div>
  )
}
