export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Component Examples</h1>
      <ul className="pl-5 list-disc space-y-1">
        <li><a href="/2-components/client" className="text-blue-600 underline">Client Components</a></li>
        <li><a href="/2-components/server" className="text-blue-600 underline">Server Components</a></li>
        <li><a href="/2-components/mixed" className="text-blue-600 underline">Mixed Components</a></li>
      </ul>
    </div>
  )
}
