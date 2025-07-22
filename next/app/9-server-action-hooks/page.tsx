import { getProducts } from "./actions"
import CreateProductFormUseActionState from "./components/CreateProductFormUseActionState"
import CreateProductForm from "./components/CreateProductForm"
import CreateProductFormUseTransition from "./components/CreateProductFormUseTransition"
import CreateProductFormUseActionStateWithUseFormStatus from "./components/CreateProductFormUseActionStateWithUseFormStatus"
import ProductDataTable from "@/components/ProductDataTable"

export default async function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Server Action (Hooks)</h1>
      <ProductDataTable products={await getProducts()} />

      <hr className="my-4" />

      <div className="space-y-6">
        <CreateProductForm />
        <CreateProductFormUseTransition />
        <CreateProductFormUseActionState />
        <CreateProductFormUseActionStateWithUseFormStatus />
      </div>
    </div>
  )
}
