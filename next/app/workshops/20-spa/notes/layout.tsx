// แก้ปัญหาของ Hydration Failed: https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only

'use client'

import { useEffect, useState } from 'react'

export default function Layout(props: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return (
    <>
      {isClient ? props.children : 'Loading...'}
    </>
  )
}
