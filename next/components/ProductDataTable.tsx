import { products } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"
import "./ProductDataTable.css"

interface Props {
  products: InferSelectModel<typeof products>[]
  onDeleteProduct?: (formData: FormData) => Promise<void>
}

export default function ProductDataTable(props: Props) {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Describe</th>
          <th>Price</th>
          {props.onDeleteProduct && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {props.products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              {props.onDeleteProduct && <td>
                <form action={props.onDeleteProduct} className="inline">
                  <input type="hidden" name="id" value={product.id} />
                  <button type="submit" className="cursor-pointer text-blue-600 underline">Delete</button>
                </form>
              </td>}
            </tr>
          ))}
      </tbody>
    </table>
  )
}
