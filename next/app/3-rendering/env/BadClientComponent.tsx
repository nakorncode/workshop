"use client"

export default function BadClientComponent() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION
  const secretToken = process.env.SECRET_TOKEN
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">(Bad) Client component</h2>
      <ul className="list-disc pl-5">
        <li>App Version: {version}</li>
        {/* สังเกตดูว่าเราจะเห็นมีกระพริบแสดงผลให้เห็นระยะสั้น เกิดจาก Client component ยังคงถูก Pre-render
        จึงมี process.env.SECRET_TOKEN ติดไปด้วย ควรแก้โดยการเรียกข้อมูล env จาก useEffect() แทน */}
        <li>Secret Token: {secretToken}</li>
      </ul>
    </div>
  )
}
