import { useEffect, useState } from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Button from './Button'
import { NoteData } from '../lib/useNote'

export default function NoteEditor(props: {
  onAddNote: (note: NoteData) => void
  note?: NoteData
  buttonLabel: string
}) {
  const [note, setNote] = useState<NoteData>({ title: '', content: '' })
  useEffect(() => setNote(props.note || { title: '', content: '' }), [props.note])
  function handleAddNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    props.onAddNote(note)
  }
  return (
    <form onSubmit={handleAddNote} className="space-y-2 max-w-sm">
      <div>
        <Input onChange={(e) => setNote({ ...note, title: e.target.value })} value={note.title} type="text" placeholder="Please enter title"></Input>
      </div>
      <div>
        <Textarea onChange={(e) => setNote({ ...note, content: e.target.value })} value={note.content} rows={5} placeholder="Please enter content"></Textarea>
      </div>
      <div>
        <Button type="submit">{props.buttonLabel}</Button>
      </div>
    </form>
  )
}
