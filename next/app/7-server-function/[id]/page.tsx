import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductById } from "../lib/products"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(Number(id))
  return (
    <div>
      <Link href="/7-server-function" className="text-blue-600 underline mb-3 inline-block">
        Back to product list
      </Link>
      <div>
        <h1 className="text-xl font-bold mb-2">{product.title}</h1>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  )
}
