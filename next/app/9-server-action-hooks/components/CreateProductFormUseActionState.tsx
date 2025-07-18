"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { createProduct } from "../actions"
import { useActionState } from "react"
import Code from "@/components/Code"

export default function CreateProductFormUseActionState() {
  const [state, formAction, pending] = useActionState(createProduct, {})
  return (
    <div className="max-w-sm bg-white p-4 shadow-md rounded-md">
      <h2 className="mb-2"><Code>useActionState()</Code></h2>
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
