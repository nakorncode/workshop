'use client'

export default function Page() {
  const date = new Date()
  return (
    <>
      {/* ทดลองลบ use client ข้างบนสุดเพื่อแก้ไขปัญหานี้ */}
      <h1 className="text-xl font-bold mb-2">Hydration Failed</h1>
      <p>Current datetime: {date.toISOString()}</p>
    </>
  )
}
