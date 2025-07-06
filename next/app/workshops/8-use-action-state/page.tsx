'use client'

import { startTransition, useActionState, useEffect } from 'react'
import { listFruits } from './FruitList'

export default function Page() {
  const [state, formAction, pending] = useActionState(listFruits, { data: [] })
  // NOTE: ALSO WE CAN SEPARATE THE CLIENT AND SERVER TO NOT USING useEffect()
  useEffect(() => {
    startTransition(() => {
      formAction(new FormData())
    })
  }, [])
  return (
    <>
      <h1 className="text-xl font-bold mb-2">useActionState()</h1>
      <ul className="list-disc pl-5">
        {state.data.map((fruit) => <li key={fruit}>{fruit}</li>)}
      </ul>
      <form action={formAction}></form>
    </>
  )
}
