'use client'

import FormSignIn from './FormSignIn'
import FormSignUp from './FormSignUp'
import FormSignOut from './FormSignOut'
import { authClient } from '@/app/lib/auth-client'

export default function Page() {
  const session = authClient.useSession()
  const user = session.data?.user
  return (
    <>
      <h1 className="text-xl font-bold mb-3">Better Auth</h1>
      {session.isPending ? <p>Loading...</p> : (
        user ? (
          <>
            <p className="mb-1">Current user: {user.email}</p>
            <FormSignOut></FormSignOut>
          </>
        ) : (
          <div className="flex flex-col items-start space-y-4">
            <div className="border border-gray-200 p-3 rounded shadow">
              <FormSignUp></FormSignUp>
            </div>
            <div className="border border-gray-200 p-3 rounded shadow">
              <FormSignIn></FormSignIn>
            </div>
          </div>
        )
      )}
    </>
  )
}
