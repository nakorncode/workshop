'use client'

import { useTransition } from 'react'
import { signOut } from './actions'
import Button from './Button'

export default function FormLogout() {
  const [pending, startTransition] = useTransition()
  return (
    <>
      <Button onClick={() => {
        startTransition(async () => {
          signOut()
        })
      }} disabled={pending}>Sign Out</Button>
    </>
  )
}
