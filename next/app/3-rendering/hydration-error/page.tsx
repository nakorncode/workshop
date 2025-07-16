// Hydration Error จะเกิดขึ้นเฉพาะ Client Component ในกรณีที่ทั้งคู่ Server, Client ต่าง Render แล้วมีข้อมูลไม่ตรงกัน
// อ่านเพิ่มเติมที่: https://nextjs.org/docs/messages/react-hydration-error

"use client"

import { useState } from "react"

export default function Page() {
  const [date, setDate] = useState(new Date().toISOString())
  function updateDate() {
    setDate(new Date().toISOString())
  }
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Hydration Error</h1>
      <p className="mb-4">Current Date and Time: {date}</p>
      <button onClick={updateDate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer">Update Date</button>
    </div>
  )
}
