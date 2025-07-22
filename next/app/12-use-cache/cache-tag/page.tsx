import Code from "@/components/Code"
import ProductCreateForm from "../components/ProductCreateForm"
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache"
import db from "@/lib/db"
import { products } from "@/db/schema"
import ProductDataTable from "@/components/ProductDataTable"
import { createProduct } from "../actions"

async function getProducts() {
  "use cache"
  cacheTag("products")
  console.log(new Date().toISOString(), "Fetching products (cache tag)")
  const data = await db.select().from(products)
  return data
}

export default async function Page() {
  const products = await getProducts()
  async function handleSubmit(formData: FormData) {
    "use server"
    await createProduct(formData)
    revalidateTag("products")
  }
  return (
    <div>
      <h1 className="mb-3">
        <Code>revalidate</Code>
        <p>Page requested on: {new Date().toISOString()}</p>
      </h1>
      <ProductDataTable products={products} />
      <hr className="my-6" />
      <ProductCreateForm onSubmit={handleSubmit} />
    </div>
  )
}
