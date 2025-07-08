'use client'

import { useActionState, useEffect } from 'react'
import * as UserAction from './actions'

export default function WithoutTransition() {
  async function listUser(state: UserAction.User[]) {
    const users = await UserAction.listUser()
    return users
  }
  const [users, listUserAction, isListUserPending] = useActionState(listUser, [])
  useEffect(() => {
    listUserAction() // ⚠️ ใช้งานได้ แต่ UI ค้าง
  }, [])

  const [state, addUserAction, isAddUserPending] = useActionState(addUser, null)
  async function addUser(previousState: any, formData: FormData) {
    const user = {
      name: formData.get('name') as string,
      birthDate: new Date(formData.get('birthDate') as string)
    }
    await UserAction.addUser(user) // ส่วนนี้จะไม่ค้าง เพราะมีการใช้ startTransition() ไว้บน Server Actions แล้ว
    await listUserAction()
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Without Transition</h1>

      {isListUserPending && <p>Loading...</p>}
      {users.length > 0 && (
        <ul className="list-disc pl-5 space-y-1">
          {users.map((user) => (
            <li key={user.name}>{user.name} ({user.birthDate.toLocaleDateString()})</li>
          ))}
        </ul>
      )}

      {/* ส่วนนี้จะมีเพิ่ม startTransition() ไว้แล้ว จึงไม่จำเป็นต้องเพิ่มลงใน Callback */}
      <form action={addUserAction} className="mt-2">
        <input type="text" name="name" required placeholder="Name" className="border border-gray-300 px-2 py-1 rounded" />
        <input type="date" name="birthDate" required className="ml-2 border border-gray-300 px-2 py-1 rounded" />
        <button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50" disabled={isAddUserPending}>
          {isAddUserPending ? 'Adding...' : 'Add'}
        </button>
      </form>
    </>
  )
}
