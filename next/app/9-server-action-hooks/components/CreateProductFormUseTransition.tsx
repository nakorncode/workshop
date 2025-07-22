"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { createProduct } from "../actions"
import { useState, useTransition } from "react"
import Code from "@/components/Code"

export default function CreateProductFormUseTransition() {
  const [state, setState] = useState<{ error?: string; success?: string }>({ error: undefined, success: undefined })
  const [pending, startTransition] = useTransition() // useTransition จะมี pending แถมมาให้ใช้งาน
  async function formAction(formData: FormData) {
    startTransition(async () => { // ใช้ startTransition เพื่อไม่ให้ UI ถูก Block และแสดงผล pending ได้ทันที
      const result = await createProduct(state, formData)
      setState(result)
    })
  }
  return (
    <div className="max-w-sm bg-white p-4 shadow-md rounded-md">
      <h2 className="mb-2"><Code>useState()</Code> + <Code>useTransition()</Code></h2>
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
