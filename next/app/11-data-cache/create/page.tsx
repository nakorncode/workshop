import Button from "@/components/Button"
import Input from "@/components/Input"
import { products } from "@/db/schema"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import { z } from 'zod'

const productSchema = z.object({
  title: z.string().min(1),
  price: z.number().min(0),
  description: z.string().min(1),
})

async function createProduct(formData: FormData) {
  "use server"
  const parsedData = productSchema.safeParse({
    title: formData.get("title"),
    price: parseFloat(formData.get("price") as string),
    description: formData.get("description"),
  })
  if (!parsedData.success) {
    throw new Error("Invalid product data")
  }
  await db.insert(products).values(parsedData.data)
  return redirect("/11-data-cache")
}

export default function Page() {
  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold mb-5">Create Product</h1>
      <form action={createProduct} className="space-y-4">
        <Input type="text" name="title" label="Product Title" required className="w-full" />
        <Input type="number" name="price" label="Price" required className="w-full" />
        <Input type="text" name="description" label="Description" required className="w-full" />
        <Button type="submit" className="w-full">Create Product</Button>
      </form>
    </div>
  )
}
