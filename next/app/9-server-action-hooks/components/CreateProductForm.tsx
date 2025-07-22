"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { createProduct } from "../actions"
import { useState } from "react"
import Code from "@/components/Code"

export default function CreateProductForm() {
  const [state, setState] = useState<{ error?: string; success?: string }>({ error: undefined, success: undefined })
  const [pending, setPending] = useState(false)
  async function formAction(formData: FormData) {
    setPending(true) // ทำงานทันที แต่ไม่แสดงผล เพราะโดน Block UI
    const result = await createProduct(state, formData) // ⛔ Block UI ทำให้ไม่ทันได้ return jsx ด้านล่างเพื่อแสดงผล Creating...
    setState(result)
    setPending(false)
  }
  return (
    <div className="max-w-sm bg-white p-4 shadow-md rounded-md">
      <h2 className="mb-2"><Code>useState()</Code></h2>
      <div className="mb-2">
        {state.error && <p className="text-red-500">{state.error}</p>}
        {state.success && <p className="text-green-500">{state.success}</p>}
      </div>
      <form action={formAction} className="space-y-3">
        <Input id="title" label="Title" name="title" />
        <Input id="description" label="Description" name="description" />
        <Input id="price" label="Price" name="price" type="number" step="0.01" />
        <Button type="submit" disabled={pending}>{pending ? 'Creating...' : 'Create'}</Button>
      </form>
    </div>
  )
}
