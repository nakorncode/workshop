"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useImmer } from "use-immer"
import { createProduct } from "../lib/products"

export default function Page() {
  const [product, setProduct] = useImmer({
    title: "",
    description: "",
    price: 0,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, field: keyof typeof product) {
    const { value } = event.target
    setProduct(draft => {
      if (field === "price") {
        draft.price = Number(value)
      } else {
        draft[field] = value
      }
    })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    try {
      await createProduct(product)
      router.push("/7-server-function")
    } catch (error) {
      throw new Error(`Failed to create product: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm">
      <h1 className="text-2xl font-bold mb-2">Create product</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <Input id="title" label="Title" value={product.title} onChange={e => handleChange(e, "title")} required />
        <Input id="description" label="Description" value={product.description} onChange={e => handleChange(e, "description")} required />
        <Input id="price" label="Price" type="number" value={product.price} onChange={e => handleChange(e, "price")} min="0" required />
        <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
      </form>
    </div>
  )
}
