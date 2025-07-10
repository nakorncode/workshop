'use client'

export function ClientEnv() {
  return (
    <>
      <h2 className="mb-1 font-bold">Client Component</h2>
      <p>TOKEN: {process.env.TOKEN}</p>
      <p>NEXT_PUBLIC_TOKEN: {process.env.NEXT_PUBLIC_TOKEN}</p>
    </>
  )
}
