'use client'

import { useState } from 'react'
import Label from './Label'
import Input from './Input'
import Button from './Button'
import { authClient } from '@/app/lib/auth-client'

export default function FormSignIn() {
  const [state, setState] = useState({
    error: '',
    pending: false
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState({ ...state, pending: true })
    const result = await authClient.signIn.email({ email, password })
    if (result.error) {
      setState({
        ...state,
        error: result.error.message || 'Unknown error',
        pending: false
      })
      return
    }
    setState({
      ...state,
      error: '',
      pending: false
    })
    setEmail('')
    setPassword('')
  }
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Sign In</h2>
      {state.error && <p className="text-red-600">{state.error}</p>}
      <form onSubmit={handleLogin} className="space-y-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email"></Input>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password"></Input>
        </div>
        <div>
          <Button disabled={state.pending}>Sign in</Button>
        </div>
      </form>
    </>
  )
}
