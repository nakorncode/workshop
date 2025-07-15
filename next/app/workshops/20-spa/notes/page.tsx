"use client"

import Link from "next/link"
import useNotes from "../lib/useNotes"
import Button from "../components/Button"
import { useEffect, useState } from "react"

export default function Page() {
  const { notes, deleteNote } = useNotes()
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return <>Loading...</>
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Notes</h1>
      <div className="mb-3">
        <Button>
          <Link href="/workshops/20-spa/notes/create">Create new note</Link>
        </Button>
      </div>
      <ul className="list-disc pl-5">
        {notes?.map((note) => (
          <li key={note.id}>
            <Link href={`/workshops/20-spa/notes/${note.id}`} className="text-blue-600 underline">{note.title}</Link>
            <span onClick={() => {
              if (!window.confirm('Are you sure?')) return
              deleteNote(note.id)
            }} className="ml-2 text-red-600 underline cursor-pointer">Delete</span>
          </li>
        ))}
      </ul>
    </>
  )
}
