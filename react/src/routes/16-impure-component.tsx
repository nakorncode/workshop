import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/16-impure-component')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ImpureCounter></ImpureCounter>
      <hr className="my-4"/>
      <ImpureCounter></ImpureCounter>
      <hr className="my-4"/>
      <PureCounter></PureCounter>
      <hr className="my-4"/>
      <PureCounter></PureCounter>
    </>
  )
}

let globalCount = 0 // Impure! เพราะรันนอก Scope อยู่เหนือการควบคุมภายในฟังก์ชั่นโดยสมบูรณ์ แต่ทำให้เราสามารถเปลี่ยนแปลงค่าแบบ Global ได้
function ImpureCounter() {
  const [, manualReRender] = useState(0)
  return (
    <>
      <p className="text-lg font-bold mb-1">(Impure) Count: {globalCount}</p>
      <button onClick={() => globalCount++} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increase</button>
      <button onClick={() => manualReRender(Math.random())} className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Manual Re-render</button>
    </>
  )
}

function PureCounter() {
  const [count, setCount] = useState(0) // Pure! เพราะข้อมูลอยู่ภายใต้การควบคุมของฟังก์ชั่นทั้งหมด เพียงแต่จะไม่สามารถแชร์ข้อมูลแบบ Global ได้ (ต้องใช้ Redux หรือ Zustand ช่วยจัดการ)
  return (
    <>
      <p className="text-lg font-bold mb-1">(Pure) Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Increase</button>
    </>
  )
}
