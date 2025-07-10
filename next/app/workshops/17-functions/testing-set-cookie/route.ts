import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  (await cookies()).set('test', 'this cookie valid for 5 seconds', {
    maxAge: 5
  })
  redirect('/workshops/17-functions/user/john?message=test_cookie_set')
}
