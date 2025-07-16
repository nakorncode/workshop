export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Routing</h1>
      <p>Welcome to the Routing page!</p>
      <ul className="space-y-2 mt-5">
        <li>
          <a href="/1-routing/products" className="text-blue-600 underline">
            Go to products page
          </a>
        </li>
        <li>
          <a href="/1-routing/api/products" className="text-blue-600 underline">
            Go to API products
          </a>
        </li>
      </ul>
    </div>
  )
}
