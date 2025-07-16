// เป็นส่วนหนึ่งของ Server Components จึงสามารถใช้ Component async function ได้
// เพราะตามปกติของ React เราจะไม่นสามารถใช้ Component async function ได้

import { getProducts } from "../lib/products"

export default async function Page() {
  const products = await getProducts()
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">All Products</h1>
      <a href="/1-routing" className="text-blue-600 underline mb-4 inline-block">
        Back to main routing
      </a>
      <ul className="pl-5 list-disc space-y-1">
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/1-routing/products/${product.id}`} className="text-blue-600 underline">
              (ID: {product.id}) {product.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
