import { useLocalStorageState } from 'ahooks'
import { v7 as uuid } from 'uuid'

const noteKey = 'note'

export interface Note extends NoteData {
  id: string
}

export interface NoteData {
  title: string
  content: string
}

export default function useNote() {
  const [notes, setNotes] = useLocalStorageState<Note[]>(noteKey, { defaultValue: [] })
  function addNote(note: NoteData) {
    setNotes([...notes, { id: uuid(), ...note }])
  }
  function updateNote(id: string, note: NoteData) {
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...note } : n)))
  }
  function deleteNote(id: string) {
    setNotes(notes.filter((n) => n.id !== id))
  }
  function findNote(id: string) {
    return notes.find((n) => n.id === id)
  }
  return {
    notes,
    setNotes,
    addNote,
    updateNote,
    deleteNote,
    findNote,
  }
}
