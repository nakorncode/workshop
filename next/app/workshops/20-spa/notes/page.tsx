'use client'

import Link from 'next/link'
import useNote from '../lib/useNote'
import Button from '../components/Button'

export default function Page() {
  const { notes } = useNote()
  return (
    <>
      <h1 className="text-xl font-bold mb-3">Single Page Application (SPA)</h1>
      <Link href="/workshops/20-spa/notes/create">
        <Button>Create new note</Button>
      </Link>
      {notes.length === 0 ? <p className="italic text-gray-500">No note found</p> : (
        <ul className="mt-4 pl-5 list-disc space-y-1">
          {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/workshops/20-spa/notes/${note.id}`} className="text-blue-600 underline">{note.title}</Link>
          </li>))}
        </ul>
      )}
    </>
  )
}
