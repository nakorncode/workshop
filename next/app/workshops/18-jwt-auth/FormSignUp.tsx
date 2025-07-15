'use client'

import { useActionState } from 'react'
import { signUp } from './actions'
import Input from './Input'
import Button from './Button'

export default function FormSignUp() {
  const [state, formAction, pending] = useActionState(signUp, null)
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Sign Up</h2>
      <form action={formAction} className="space-y-2 border border-gray-200 inline-block p-3 rounded-md shadow">
        {state && (
          <div>
            {state.message && <p className="text-green-600">{state.message}</p>}
            {state.error && <p className="text-red-600">{state.error}</p>}
          </div>
        )}
        <div>
          <label>
            <div className="font-bold text-sm">Username:</div>
            <Input name="name" type="text" />
          </label>
        </div>
        <div>
          <label>
            <div className="font-bold text-sm">Password:</div>
            <Input name="password" type="password" />
          </label>
        </div>
        <Button type="submit" disabled={pending}>Sign Up</Button>
      </form>
    </div>
  )
}
