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
        <li><a href="/7-event" className="underline text-blue-600">7-event</a></li>
        <li><a href="/8-state" className="underline text-blue-600">8-state</a></li>
        <li><a href="/9-snapshot" className="underline text-blue-600">9-snapshot</a></li>
        <li><a href="/10-reference-types" className="underline text-blue-600">10-reference-types</a></li>
        <li><a href="/11-immer" className="underline text-blue-600">11-immer</a></li>
        <li><a href="/12-two-way-binding" className="underline text-blue-600">12-two-way-binding</a></li>
        <li><a href="/13-event-emission" className="underline text-blue-600">13-event-emission</a></li>
        <li><a href="/14-preserve-reset-state" className="underline text-blue-600">14-preserve-reset-state</a></li>
        <li><a href="/15-side-effect" className="underline text-blue-600">15-side-effect</a></li>
        <li><a href="/16-impure-component" className="underline text-blue-600">16-impure-component</a></li>
        <li><a href="/17-re-render" className="underline text-blue-600">17-re-render</a></li>
        <li><a href="/18-use-effect-args" className="underline text-blue-600">18-use-effect-args</a></li>
        <li><a href="/19-cleanup" className="underline text-blue-600">19-cleanup</a></li>
        <li><a href="/20-group-state" className="underline text-blue-600">20-group-state</a></li>
        <li><a href="/21-contradictions" className="underline text-blue-600">21-contradictions</a></li>
      </ul>
    </>
  )
}
