import Button from "@/components/Button"
import Link from "next/link"
import { getProducts } from "./lib/products"

export default async function Page() {
  const products = await getProducts()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Product list</h1>
      <Link href="/7-server-function/create" className="inline-block mb-4">
        <Button>Create product</Button>
      </Link>
      <ul className="list-disc pl-5 space-y-1">
        {products.map(product => (
          <li key={product.id} className="mb-2">
            <Link href={`/7-server-function/${product.id}`} className="text-blue-600 underline">
              (ID: {product.id}) {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
