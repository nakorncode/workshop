"use client"

import Link from "next/link"
import useNotes from "../lib/useNotes"

export default function Page() {
  const { notes } = useNotes()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Notes</h1>
      <ul className="list-disc pl-5">
        {(!notes || notes.length === 0) ? (<li className="text-gray-500 italic">No notes</li>) : notes?.map((note) => (
          <>
            <li key={note.id}>
              <Link href={`/workshops/20-spa/notes/${note.id}`} className="text-blue-600 underline">{note.title}</Link>
            </li>
          </>
        ))}
        <li key="create">
          <Link className="text-blue-600 underline" href="/workshops/20-spa/notes/create">Create new note</Link>
        </li>
      </ul>
    </>
  )
}
