import { useLocalStorageState } from "ahooks"

export interface NoteData {
  title: string
  content: string
}

const noteStoreKey = 'notes'

export default function useNotes() {
  const [notes, setNotes] = useLocalStorageState<(NoteData & { id: string })[] | undefined>(noteStoreKey)

  function addNote(note: NoteData) {
    const newNote = { ...note, id: Date.now().toString() }
    setNotes([...(notes || []), newNote])
  }

  function getNote(id: string) {
    return notes?.find((note) => note.id === id)
  }

  function updateNote(id: string, note: NoteData) {
    setNotes(notes?.map((n) => n.id === id ? { ...n, ...note } : n))
  }

  function deleteNote(id: string) {
    setNotes(notes?.filter((n) => n.id !== id))
  }

  return {
    notes,
    setNotes,
    addNote,
    getNote,
    updateNote,
    deleteNote
  }
}
