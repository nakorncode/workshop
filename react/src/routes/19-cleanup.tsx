import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/19-cleanup')({
  component: RouteComponent,
})

function RouteComponent() {
  const [show, setShow] = useState(true)
  return (
    <>
      <button onClick={() => setShow(!show)} className="mb-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Show/Hide</button>
      {show && <TimerWithoutCleanup></TimerWithoutCleanup>}
      {show && <TimerWithCleanup></TimerWithCleanup>}
    </>
  )
}

function TimerWithoutCleanup() {
  const [currentTime, setCurrentTime] = useState(0)
  // ใน Strict Mode จะมีการเรียก useEffect() สองครั้งเพื่อทดสอบว่ามีการ Cleanup หรือไม่
  // ดังนั้นเราจึงเห็นโค้ดชุดนี้จะมีการรันเบิ้ล Interval
  // อย่างไรก็ตามเมื่อใช้งานจริงบน Production จะไม่มีปัญหาส่วนนี้ เพราะมีเพื่อทดสอบการทำงานของโค้ดที่สมบูรณ์แบบ
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(n => n + 1)
    }, 1000)
  }, [])
  return <h2>(Without cleanup) Time: {currentTime}</h2>
}

function TimerWithCleanup() {
  const [currentTime, setCurrentTime] = useState(0)
  // มีการ Cleanup ที่ return Function
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(n => n + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return <h2>(With cleanup) Time: {currentTime}</h2>
}
