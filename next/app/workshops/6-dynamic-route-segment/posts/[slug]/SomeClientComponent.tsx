'use client'

import { useParams } from 'next/navigation'
import { use } from 'react'

export default function SomeClientComponent(props: { params: Promise<{ slug: string }> }) {
  const params1 = use(props.params)
  const params2 = useParams<{ slug: string }>()
  return (
    <>
      <p>Slug (Client Component): {params1.slug}</p>
      <p>Slug (useParams): {params2.slug}</p>
    </>
  )
}
