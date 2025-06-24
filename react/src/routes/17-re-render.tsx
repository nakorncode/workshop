import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/17-re-render')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <IncorrectShowTime></IncorrectShowTime>
      <hr className="my-4" />
      <BadShowTime></BadShowTime>
      <hr className="my-4" />
      <GoodShowTime></GoodShowTime>
    </>
  )
}

// ยกตัวอย่างปัญหาหากใช้ Impure Component อย่างเช่นการใช้ new Date() ร่วมกับ setInterval()
// ที่เราต้องการแสดงผลลัพธ์ของหน้าเว็บ ให้มีการเปลี่ยนแปลงวันเวลาทุก 1 วินาที
// เราจำเป็นต้องสั่งให้เกิดการ Re-render ด้วยการใช้ useState() หากกำหนดผ่านตัวแปรปกติ
// จะไม่มีการสั่งรัน Function เพื่อ Re-render ใหม่
function IncorrectShowTime() {
  let now = new Date()
  setInterval(() => {
    now = new Date()
  }, 1000)
  return <div>Current time: {now.toLocaleString()}</div>
}

// หากเปลี่ยนไปใช้ Pure Component คือข้อมูลทุกอย่างที่จะมีการเปลี่ยนแปลงผ่าน setInterval()
// เป็นระยะ ซึ่งเรียกว่า Side Effect ที่จะเกิดขึ้นภายในการ Render เราจะต้องการให้ Re-render ใหม่
// (หรือก็คือเรียก Function ใหม่ทุกครั้ง) เราจึงจำเป็นต้องใช้คุณสมบัติของ useState()
// เพื่อบอกว่าเมื่อมีการเปลี่ยนแปลง ให้เกิดการ Re-render ใหม่ทุกครั้งด้วย
function BadShowTime() {
  const [now, setNow] = useState(new Date())
  setInterval(() => {
    setNow(new Date())
    console.log('❌ Side effect!')
  }, 1000)
  return <div>Current time: {now.toLocaleString()}</div>
}

// แต่เราจะยังพบอีกปัญหา เพราะเรายังคงเรียก Side Effect ระหว่างที่มีการ Re-render จะมีการเรียก
// setInterval() ซ้ำไปซ้ำมา ถึงแม้ว่าทางปฏิบัติจะสามารถใช้งานได้ แต่เมื่อใช้งานจริงจะส่งผลต่อประสิทธิภาพแย่ลงอย่างมาก
// เราจึงต้องกำหนด Side Effect ทั้งหมดไว้ที่ useEffect() อีกด้วย
function GoodShowTime() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    setInterval(() => {
      setNow(new Date())
    }, 1000)
    console.log('✅ In useEffect()')
  }, [])
  return <div>Current time: {now.toLocaleString()}</div>
}
