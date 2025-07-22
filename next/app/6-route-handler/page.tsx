"use client"

import Button from "@/components/Button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { products } from "@/db/schema"
import type { InferSelectModel } from "drizzle-orm"

type Product = InferSelectModel<typeof products>

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const response = await fetch("/6-route-handler/api/products")
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Product list</h1>
      <Link href="/6-route-handler/create" className="inline-block mb-4">
        <Button>Create product</Button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {products.map(product => (
            <li key={product.id}>
              <Link href={`/6-route-handler/${product.id}`} className="text-blue-600 underline">
                (ID: {product.id}) {product.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
