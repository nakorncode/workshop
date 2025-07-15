"use client"

import { notFound, useParams } from "next/navigation"
import useNotes from "../../lib/useNotes"

export default function Page() {
  const { getNote } = useNotes()
  const params = useParams<{ id: string }>()
  const note = getNote(params.id)
  if (!note) return notFound()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Note ID: {params.id}</h1>
      <div>{note.title}</div>
      <div>{note.content}</div>
    </>
  )
}
