import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <h1>Index</h1>
      <ul className="list-disc pl-5">
        <li><a href="/1-jsx" className="underline text-blue-600">1-jsx</a></li>
      </ul>
    </>
  )
}
