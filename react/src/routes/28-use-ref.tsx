import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/28-use-ref')({
  component: RouteComponent,
})

interface User {
  firstName: string
  lastName: string
  email: string
}

function RouteComponent() {
  // useRef() จะมีคุณสมบัติคล้ายกับ useState() ที่แตกต่างกันคือจะไม่ Trigger re-render เมื่อมีการเปลี่ยนแปลง
  // จึงเหมาะกับบางงาน เช่น การ Interaction DOM ต่างๆ เพราะไม่ควร Re-render ทุกครั้งที่เปลี่ยนแปลง
  const firstNameRef = useRef<HTMLInputElement>(null)
  const [users, updateUsers] = useImmer<User[]>([])
  const [user, updateUser] = useImmer<User>({ firstName: '', lastName: '', email: '' })
  function addUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUsers(draft => {
      draft.push(user)
      return draft
    })
    updateUser(draft => {
      draft.firstName = ''
      draft.lastName = ''
      draft.email = ''
      return draft
    })
    firstNameRef.current?.focus()
  }
  return (
    <>
      <h1 className="text-xl font-bold">User Management</h1>
      <table className="w-full my-4">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={addUser} className="p-4 rounded-xl border border-gray-200 shadow">
        <div className="flex gap-1">
          <input ref={firstNameRef} type="text" placeholder="First name" value={user.firstName} onChange={e => updateUser(draft => { draft.firstName = e.target.value; return draft; })} className="border border-gray-300 px-2 py-1 rounded" />
          <input type="text" placeholder="Last name" value={user.lastName} onChange={e => updateUser(draft => { draft.lastName = e.target.value; return draft; })} className="border border-gray-300 px-2 py-1 rounded" />
          <input type="email" placeholder="Email" value={user.email} onChange={e => updateUser(draft => { draft.email = e.target.value; return draft; })} className="border border-gray-300 px-2 py-1 rounded" />
        </div>
        <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Add User</button>
      </form>
    </>
  )
}
