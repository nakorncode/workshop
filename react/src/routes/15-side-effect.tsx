import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/15-side-effect')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NavbarController renderCorrect={false}></NavbarController>
      <hr className="my-4" />
      <NavbarController renderCorrect={true}></NavbarController>
    </>
  )
}

function IncorrectNavbar(props: { title: string }) {
  // โค้ดทั้งหมดที่ถูกวางก่อน return และอยู่บน Scope หลักถือว่าเป็นช่วงเวลา Render ทั้งหมด
  // เราจึงไม่ควรวางโค้ดเกี่ยวกับ Side Effect ไว้ในช่วงนี้
  document.title = props.title // ❌ Anti-pattern
  console.log('Render Navbar (incorrect)') // ❌ Anti-pattern
  return (
    <nav className="p-4 bg-gray-800 text-white rounded-md">
      <h1 className="font-bold">{props.title}</h1>
    </nav>
  )
}

function CorrectNavbar(props: { title: string }) {
  // ✅ แบบนี้ถูกต้อง คือเรานำ Side Effect ไปใช้บน Callback Function อื่นๆ
  // หรือบางครั้งเราอาจจะออกแบบใช้ Function ครอบ Side Effect ไว้ก็ได้ และอย่าเรียกระหว่าง Render
  useEffect(() => {
    document.title = props.title
    console.log('Render Navbar (correct)')
  }, [props.title])
  return (
    <nav className="p-4 bg-gray-800 text-white rounded-md">
      <h1 className="font-bold">{props.title}</h1>
    </nav>
  )
}

function NavbarController(props: { renderCorrect: boolean }) {
  const [show, setShow] = useState(true)
  const [title, setTitle] = useState('My Website')
  return (
    <>
      <h1 className="font-bold mb-2">({props.renderCorrect ? 'Correct' : 'Incorrect'})</h1>
      <div>
        <label>
          <span>Title: </span>
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="border border-gray-300 px-2 py-1 rounded" />
        </label>
      </div>
      <div>
        <label>
          <span>Show: </span>
          <input checked={show} onChange={e => setShow(e.target.checked)} type="checkbox" />
        </label>
      </div>
      <div>
        {show && (props.renderCorrect ? <CorrectNavbar title={title} /> : <IncorrectNavbar title={title} />)}
      </div>
    </>
  )

}
