"use client"

import Button from "@/components/Button"
import { useEffect, useState } from "react"

export default function LikeUserCard() {
  const [likes, setLikes] = useState(0)
  const [username, setUsername] = useState("")
  function handleLike() {
    setLikes(likes + 1)
  }
  useEffect(() => {
    fetch("https://randomuser.me/api?nat=us")
      .then((res) => res.json())
      .then((data) => {
        const user = data.results[0]
        setUsername(`${user.name.first} ${user.name.last}`)
      })
      .catch((error) => console.error("Error fetching user:", error))
  }, [])
  return (
    <div className="max-w-sm bg-gray-700 text-white p-4 shadow-md rounded-md">
      <p className="mb-1">User: {username}</p>
      <p className="mb-1">Likes: {likes}</p>
      <Button onClick={handleLike}>Like</Button>
    </div>
  )
}
