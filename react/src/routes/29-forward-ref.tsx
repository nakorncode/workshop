import { createFileRoute } from '@tanstack/react-router'
import { forwardRef, useMemo, useRef, useState } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/29-forward-ref')({
  component: RouteComponent,
})

function RouteComponent() {
  // ใช้ useRef รับข้อมูลจาก forwardRef ที่ถูกส่งต่อมาให้ใช้งานอย่างอิสระ
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, updateUsers] = useImmer<{ username: string, password: string }[]>([])
  function createUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateUsers(draft => {
      draft.push({ username, password })
    })
    setUsername('')
    setPassword('')
    usernameInputRef.current?.focus()
  }
  const [showPassword, setShowPassword] = useState(false)
  const showUsers = useMemo(() => {
    if (showPassword) return users
    return users.map(user => ({ username: user.username, password: '***' }))
  }, [users, showPassword])
  return (
    <div>
      <h1 className="mb-2 font-bold">Create user manager</h1>
      <form onSubmit={createUser} className="space-y-2">
        <FancyInput ref={usernameInputRef} label="Username" placeholder="Username" type="text" value={username} onInput={setUsername} />
        <FancyInput label="Password" placeholder="Password" type="password" value={password} onInput={setPassword} />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Create</button>
      </form>
      <div className="space-x-3 mt-3">
        <label>
          <input type="radio" checked={showPassword} onChange={() => setShowPassword(true)} className="mr-1" />
          <span>Show password</span>
        </label>
        <label>
          <input type="radio" checked={!showPassword} onChange={() => setShowPassword(false)} className="mr-1" />
          <span>Hide password</span>
        </label>
      </div>
      <ul className="list-disc pl-5 mt-3">
        {showUsers.map((user, i) => (
          <li key={i}>{user.username} ({user.password})</li>
        ))}
      </ul>
    </div>
  )
}

interface FancyInputProps {
  label: string
  placeholder: string
  type: 'text' | 'password' | 'email' | 'url'
  value: string
  onInput: (data: string) => void
}

// forwardRef คือการส่ง ref ต่อไปยัง Parent ที่เรียกใช้ เราจึงต้องระบุว่า ref จะเป็นของใคร
// เพื่อที่จะสามารถใช้ ref.current ให้ตรงกับ Data Type ได้
const FancyInput = forwardRef<HTMLInputElement, FancyInputProps>((props, ref) => {
  return (
    <>
      <label className="block">
        <div className="font-bold mb-1">{props.label}:</div>
        <input
          ref={ref}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          className="bg-white border border-gray-300 px-3 py-2 rounded-md shadow outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:bg-blue-50 focus:text-blue-800"
          onInput={e => props.onInput(e.currentTarget.value)}
        />
      </label>
    </>
  )
})
