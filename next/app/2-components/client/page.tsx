"use client" // ประกาศให้ Page เป็น Client Component เพื่อให้สามารถใช้ useState, useEffect (Interactive UI) ได้

import Button from "@/components/Button"
import { useEffect, useState } from "react"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

export default function Page() {
  const [count, setCount] = useState(0) // สามารถใช้ useState ได้เพราะเป็น Client Component
  function increment() {
    setCount(count + 1)
  }

  const url = "https://dummyjson.com/users/1?select=firstName,lastName,email"
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => { // สามารถใช้ useEffect เพื่อ Fetch Data บน Client Component
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error))
  }, [])
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Client Component</h1>
      <p className="mb-4"><b>User:</b> {user ? `${user.firstName} ${user.lastName} (${user.email})` : "Loading..."}</p>
      <hr className="my-4"/>
      <p className="mb-2">Current Count: {count}</p>
      <Button onClick={increment} className="mb-4">Increment Count</Button>
    </div>
  )
}
