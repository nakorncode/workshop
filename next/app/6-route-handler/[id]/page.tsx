"use client"

import { products } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type Product = InferSelectModel<typeof products>

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/6-route-handler/api/products/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }
      const data = await response.json()
      setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  return (
    <div>
      <Link href="/6-route-handler" className="text-blue-600 underline mb-3 inline-block">
        Back to product list
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <div>
          <h1 className="text-xl font-bold mb-2">{product.title}</h1>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  )
}
