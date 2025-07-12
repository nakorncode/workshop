'use client'

import { useState } from 'react'
import useNote, { NoteData } from '../../lib/useNote'
import { useRouter } from 'next/navigation'
import NoteEditor from '../../components/NoteEditor'

export default function Page() {
  const { addNote } = useNote()
  const router = useRouter()
  function handleAddNote(note: NoteData) {
    addNote(note)
    router.push('/workshops/20-spa/notes')
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Create new note</h1>
      <NoteEditor onAddNote={handleAddNote} buttonLabel="Create"></NoteEditor>
    </>
  )
}
