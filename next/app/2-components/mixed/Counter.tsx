"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }

  return (
    <div>
      <p className="mb-2">Current Count: {count}</p>
      <button onClick={increment} className="px-4 py-2 bg-blue-500 text-white rounded">
        Increment Count
      </button>
    </div>
  )
}
