'use client'

import { useParams, useRouter } from 'next/navigation'
import useNote, { NoteData } from '../../lib/useNote'
import Link from 'next/link'
import Button from '../../components/Button'
import NoteEditor from '../../components/NoteEditor'

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { findNote, updateNote } = useNote()
  const noteData = findNote(id)
  if (!noteData) {
    return (
      <>
        <h1 className="text-xl font-bold mb-2">Note not found</h1>
        <Link href="/workshops/20-spa/notes">
          <Button>Return to note list</Button>
        </Link>
      </>
    )
  }
  const router = useRouter()
  function handleUpdateNote(note: NoteData) {
    updateNote(id, note)
    router.push('/workshops/20-spa/notes')
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Note: {noteData.title}</h1>
      <Link href="/workshops/20-spa/notes" className="text-blue-600 underline mb-4 inline-block">Return to note list</Link>
      <p className="text-sm text-gray-400 mb-1">ID: {id}</p>
      <NoteEditor note={noteData} onAddNote={handleUpdateNote} buttonLabel="Update"></NoteEditor>
    </>
  )
}
