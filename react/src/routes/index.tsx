import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const link = 'underline text-blue-600'
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Index</h1>
      <ul className="list-disc pl-5">
        <li><a href="/1-jsx" className={link}>1-jsx</a></li>
        <li><a href="/2-components" className={link}>2-components</a></li>
        <li><a href="/3-props" className={link}>3-props</a></li>
        <li><a href="/4-children" className={link}>4-children</a></li>
        <li><a href="/5-conditional" className={link}>5-conditional</a></li>
        <li><a href="/6-list" className={link}>6-list</a></li>
        <li><a href="/7-event" className={link}>7-event</a></li>
        <li><a href="/8-state" className={link}>8-state</a></li>
        <li><a href="/9-snapshot" className={link}>9-snapshot</a></li>
        <li><a href="/10-reference-types" className={link}>10-reference-types</a></li>
        <li><a href="/11-immer" className={link}>11-immer</a></li>
        <li><a href="/12-two-way-binding" className={link}>12-two-way-binding</a></li>
        <li><a href="/13-event-emission" className={link}>13-event-emission</a></li>
        <li><a href="/14-preserve-reset-state" className={link}>14-preserve-reset-state</a></li>
        <li><a href="/15-side-effect" className={link}>15-side-effect</a></li>
        <li><a href="/16-impure-component" className={link}>16-impure-component</a></li>
        <li><a href="/17-re-render" className={link}>17-re-render</a></li>
        <li><a href="/18-use-effect-args" className={link}>18-use-effect-args</a></li>
        <li><a href="/19-cleanup" className={link}>19-cleanup</a></li>
        <li><a href="/20-group-state" className={link}>20-group-state</a></li>
        <li><a href="/21-contradictions" className={link}>21-contradictions</a></li>
        <li><a href="/22-redundant" className={link}>22-redundant</a></li>
        <li><a href="/23-duplication" className={link}>23-duplication</a></li>
        <li><a href="/24-reducer" className={link}>24-reducer</a></li>
        <li><a href="/25-use-memo" className={link}>25-use-memo</a></li>
        <li><a href="/26-context" className={link}>26-context</a></li>
        <li><a href="/27-ui-component" className={link}>27-ui-component</a></li>
        <li><a href="/28-use-ref" className={link}>28-use-ref</a></li>
        <li><a href="/29-forward-ref" className={link}>29-forward-ref</a></li>
      </ul>
    </>
  )
}
