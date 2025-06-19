import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/18-use-effect-args')({
  component: RouteComponent,
})

function RouteComponent() {
  const [show, setShow] = useState(true)
  return (
    <div>
      {show && <TitleUpdater/>}
      <button onClick={() => setShow(!show)} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Toggle Show/Hide</button>
    </div>
  )
}

function TitleUpdater() {
  const [title, setTitle] = useState('My Website')

  // 1. Run every re-render (ไม่ค่อยได้ใช้)
  useEffect(() => {
    console.log('Re-render triggered')
  })

  // 2. Run on mounted (ครั้งเดียว หรือรันใหม่เมื่อมีการ Mounted อีกครั้ง)
  useEffect(() => {
    console.log('Component mounted')
    return () => {
      // วิธีนี้เราสามารถ Cleanup ได้โดย Return function callback คือเมื่อ Unmounted
      console.log('Component unmounted')
    }
  }, [])

  // 3. Run on dependencies changed (รันก็ต่อเมื่อมีการเปลี่ยนแปลงข้อมูล)
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 px-2 py-1 rounded" />
    </div>
  )
}
