import Code from "@/components/Code"
import ProductCreateForm from "../components/ProductCreateForm"
import { unstable_cacheLife as cacheLife } from "next/cache"
import db from "@/lib/db"
import { products } from "@/db/schema"
import ProductDataTable from "@/components/ProductDataTable"
import { createProduct } from "../actions"

async function getProducts() {
  "use cache"
  cacheLife("minutes") // ค่าเริ่มต้นคือ default https://nextjs.org/docs/app/api-reference/functions/cacheLife#default-cache-profiles
  console.log(new Date().toISOString(), "Fetching products")
  const data = await db.select().from(products)
  return data
}

export default async function Page() {
  const products = await getProducts()
  return (
    <div>
      <h1 className="mb-3">
        <Code>revalidate</Code>
        <p>Page requested on: {new Date().toISOString()}</p>
      </h1>
      <ProductDataTable products={products} />
      <hr className="my-6" />
      <ProductCreateForm onSubmit={createProduct} />
    </div>
  )
}
