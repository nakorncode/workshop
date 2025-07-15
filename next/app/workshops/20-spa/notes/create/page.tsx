"use client"

import useNotes, { NoteData } from "../../lib/useNotes"
import { useRouter } from "next/navigation"
import NoteForm from "../../components/NoteForm"

export default function Page() {
  const { addNote } = useNotes()
  const router = useRouter()
  function handleAddNote(note: NoteData) {
    addNote(note)
    router.push('/workshops/20-spa/notes')
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Create new note</h1>
      <NoteForm buttonLabel="Create" onSubmit={handleAddNote}></NoteForm>
    </>
  )
}
