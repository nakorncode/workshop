import { getCurrentUserSignedIn } from './actions'
import FormLogout from './FormLogout'
import FormSignIn from './FormSignIn'
import FormSignUp from './FormSignUp'

export default async function Page() {
  const { user } = await getCurrentUserSignedIn()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">JWT Authentication</h1>
      {user ? (
        <>
          <p className="mb-2">Current user: {user.name}</p>
          <FormLogout></FormLogout>
        </>
      ) : (
        <>
          <FormSignIn></FormSignIn>
          <hr className="my-4" />
          <FormSignUp></FormSignUp>
        </>
      )}
    </>
  )
}
