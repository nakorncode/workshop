"use client"

import { useEffect, useState } from "react"

export default function GoodClientComponent() {
  const [version, setVersion] = useState(process.env.NEXT_PUBLIC_APP_VERSION) // เนื่องจากเรียกได้อยู่แล้ว จึงสามารถใส่ Value Initial ได้เลย
  const [secretToken, setSecretToken] = useState<string | undefined>() // เนื่องจาก Secret ไม่สามารถเข้าถึงได้ จึงเริ่มต้นด้วย undefined
  useEffect(() => {
    // ในกรณีที่ Pre-render Next.js จะไม่ทำงานในส่วนของ useEffect() จึงทำให้การอ่านข้อมูล env Secret Token ไม่แสดงผล
    setVersion(process.env.NEXT_PUBLIC_APP_VERSION)
    setSecretToken(process.env.SECRET_TOKEN)
  }, [])
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">(Good) Client component</h2>
      <ul className="list-disc pl-5">
        <li>App Version: {version}</li>
        <li>Secret Token: {secretToken}</li>
      </ul>
    </div>
  )
}
