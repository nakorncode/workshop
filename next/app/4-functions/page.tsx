export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Functions</h1>
      <ul>
        <li><a href="/4-functions/client/some-slug?param1=value1&param2=value2" className="underline text-blue-600">Client Functions</a></li>
        <li><a href="/4-functions/server" className="underline text-blue-600">Server Functions</a></li>
      </ul>
    </div>
  )
}
