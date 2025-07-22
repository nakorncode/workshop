export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Product Not Found</h1>
      <p className="mt-4">Sorry, we could not find the product you were looking for.</p>
      <a href="/1-routing/products" className="text-blue-600 underline">
        Back to Products
      </a>
    </div>
  )
}
