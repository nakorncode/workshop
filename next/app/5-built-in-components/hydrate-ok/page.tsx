"use client"

import Button from "@/components/Button"
import { useEffect, useState } from "react"

export default function Page() {
  const [date, setDate] = useState<Date | undefined>()
  useEffect(() => {
    setDate(new Date())
  }, [])
  return (
    <>
      <div className="mb-2">Current date: {date?.toISOString()}</div>
      <Button onClick={() => setDate(new Date())}>Update Date</Button>
    </>
  )
}
