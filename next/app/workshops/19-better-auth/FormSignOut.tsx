'use client'

import { useTransition } from 'react'
import Button from './Button'
import { authClient } from '@/app/lib/auth-client'

export default function FormSignOut() {
  const [pending, startTransition] = useTransition()
  async function handleLogout() {
    startTransition(async () => {
      await authClient.signOut()
    })
  }
  return (
    <Button onClick={handleLogout} type="button" disabled={pending}>Sign out</Button>
  )
}
