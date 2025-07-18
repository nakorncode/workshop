import "./style.css"
import { getProducts } from "./actions"
import CreateProductFormUseActionState from "./components/CreateProductFormUseActionState"
import CreateProductForm from "./components/CreateProductForm"
import CreateProductFormUseTransition from "./components/CreateProductFormUseTransition"

export default async function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Server Action (Hooks)</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Describe</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {await getProducts().then(products =>
            products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <hr className="my-4" />

      <div className="space-y-6">
        <CreateProductForm />
        <CreateProductFormUseTransition />
        <CreateProductFormUseActionState />
      </div>
    </div>
  )
}
