import { products } from "@/db/schema"
import db from "@/lib/db"
import "./style.css"
import z from "zod"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import ProductDataTable from "@/components/ProductDataTable"

export default async function Page() {
  async function getProducts() {
    "use server"
    const data = await db.select().from(products)
    return data
  }

  async function createProduct(formData: FormData) {
    "use server"
    const product = z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      price: z.number().min(0),
    }).parse({
      title: formData.get("title"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
    })
    await db.insert(products).values(product)
    revalidatePath("/8-server-action")
  }

  async function deleteProduct(formData: FormData) {
    "use server"
    const id = parseInt(formData.get("id") as string, 10)
    if (isNaN(id)) {
      throw new Error("Invalid product ID")
    }
    await db.delete(products).where(eq(products.id, id))
    revalidatePath("/8-server-action")
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Server Action</h1>
      <ProductDataTable products={await getProducts()} onDeleteProduct={deleteProduct} />

      <hr className="my-4" />

      <h2 className="text-lg font-bold mb-2">Create Product</h2>
      <div className="max-w-sm bg-white p-4 shadow-md rounded-md">
        <form action={createProduct} className="space-y-3">
          <Input id="title" label="Title" name="title" required />
          <Input id="description" label="Description" name="description" required />
          <Input id="price" label="Price" name="price" type="number" required min="0" step="0.01" />
          <Button type="submit">Create</Button>
        </form>
      </div>
    </div>
  )
}
