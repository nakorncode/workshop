"use client"

import { notFound, useParams } from "next/navigation"
import useNotes, { NoteData } from "../../lib/useNotes"
import NoteForm from "../../components/NoteForm"
import Link from "next/link"

export default function Page() {
  const { getNote, updateNote } = useNotes()
  const params = useParams<{ id: string }>()
  const note = getNote(params.id)
  if (!note) return notFound()
  function handleUpdateNote(note: NoteData) {
    updateNote(params.id, note)
    alert('Note updated')
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Note ID: {params.id}</h1>
      <Link className="underline text-blue-600" href="/workshops/20-spa/notes">Back to notes</Link>
      <div className="mt-6">
        <NoteForm note={note} buttonLabel="Update" onSubmit={handleUpdateNote}></NoteForm>
      </div>
    </>
  )
}
