import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <h1 className="text-red-700 font-bold text-lg mb-2">Note not found</h1>
      <Link className="underline text-blue-600" href="/workshops/20-spa/notes">Back to notes</Link>
    </>
  )
}
