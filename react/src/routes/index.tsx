import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Index</h1>
      <ul className="list-disc pl-5">
        <li><a href="/1-jsx" className="underline text-blue-600">1-jsx</a></li>
        <li><a href="/2-components" className="underline text-blue-600">2-components</a></li>
        <li><a href="/3-props" className="underline text-blue-600">3-props</a></li>
        <li><a href="/4-children" className="underline text-blue-600">4-children</a></li>
        <li><a href="/5-conditional" className="underline text-blue-600">5-conditional</a></li>
        <li><a href="/6-list" className="underline text-blue-600">6-list</a></li>
      </ul>
    </>
  )
}
