import { notFound } from "next/navigation"
import { getProduct } from "../../lib/products"

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = parseInt(params.id)
  if (isNaN(id)) {
    throw new Error("Invalid product ID")
  }
  const product = await getProduct(id)
  if (!product) {
    // เรียกเพื่อเปลี่ยนไปยังหน้า not-found.tsx
    return notFound()
  }
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Product Details</h1>
      <a href="/1-routing/products" className="text-blue-600 underline mb-4 inline-block">
        Back to Products
      </a>
      <div className="flex items-center gap-4 space-x-4 max-w-2xl p-4 rounded-xl shadow-xl bg-white">
        <div className="flex-shrink-0">
          <img className="w-48 h-48 rounded-full border-2 border-gray-200 p-6" src={product.thumbnail} alt={product.title} />
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
          <div>
            <p className="font-semibold">Category: {product.category}</p>
            <p className="font-semibold">Price: ${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
