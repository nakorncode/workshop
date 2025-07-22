export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Rendering Examples</h1>
      <ul className="pl-5 list-disc space-y-1">
        <li><a href="/3-rendering/hydration-error" className="text-blue-600 underline">Hydration Error</a></li>
        <li><a href="/3-rendering/env" className="text-blue-600 underline">Environment Variables</a></li>
        <li><a href="/3-rendering/static" className="text-blue-600 underline">Static Rendering</a></li>
        <li><a href="/3-rendering/dynamic" className="text-blue-600 underline">Dynamic Rendering</a></li>
      </ul>
    </div>
  )
}
