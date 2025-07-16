// โดยเริ่มต้น Page Component จะเป็น Server Component จึงไม่จำเป็นต้องประกาศ "use server"
// Server Component จะมีคุณสมบัติการ Render on Server (Node.js) และสามารถใช้ Async Functions ได้
// แต่จะไม่สามารถใช้ useState, useEffect (Interactive UI) ได้ เนื่องจาก Next.js จะไม่ส่ง JavaScript ไปยัง Client

import { platform } from "node:os"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

export default async function Page() {
  const res = await fetch("https://dummyjson.com/users/1?select=firstName,lastName,email")
  const user = await res.json() as User
  const serverInfo = platform() // สามารถใช้ Node.js API ได้ทันที เพราะเป็น Server Component
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Server Component</h1>
      <p className="mb-4"><b>User:</b> {user.firstName} {user.lastName} ({user.email})</p>
      <hr className="my-4" />
      <p className="mb-4"><b>Server OS:</b> {serverInfo}</p>
    </div>
  )
}
