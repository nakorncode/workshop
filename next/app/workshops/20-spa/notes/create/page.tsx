"use client"

import { useState } from "react"
import Input from "../../components/Input"
import Textarea from "../../components/Textarea"
import Button from "../../components/Button"
import useNotes from "../../lib/useNotes"
import { useRouter } from "next/navigation"

export default function Page() {
  const { addNote } = useNotes()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addNote({ title, content })
    router.push('/workshops/20-spa/notes')
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Create new note</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Please input title" />
        </div>
        <div>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} placeholder="Please input content"></Textarea>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </>
  )
}
