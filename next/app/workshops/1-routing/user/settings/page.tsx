import { Metadata } from 'next'
import { siteName } from '../lib/siteName'

export const metadata: Metadata = {
  title: `Settings | ${siteName}`,
}

export default function Page() {
  return (
    <>
      <h1 className="text-xl font-bold">User Settings Page</h1>
    </>
  )
}
