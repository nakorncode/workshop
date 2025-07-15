import { useState } from "react"
import Button from "./Button"
import Input from "./Input"
import Textarea from "./Textarea"
import { NoteData } from "../lib/useNotes"

interface Props {
  note?: NoteData
  buttonLabel: string
  onSubmit: (note: NoteData) => void
}

export default function NoteForm(props: Props) {
  const [title, setTitle] = useState(props.note?.title || '')
  const [content, setContent] = useState(props.note?.content || '')
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.onSubmit({ title, content })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Please input title" />
        </div>
        <div>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} placeholder="Please input content"></Textarea>
        </div>
        <div className="flex justify-end">
          <Button type="submit">{props.buttonLabel}</Button>
        </div>
      </form>
    </>
  )
}
