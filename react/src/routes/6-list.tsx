import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/6-list')({
  component: RouteComponent,
})

function RouteComponent() {
  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {/* ใช้ map() บน Array เพื่ออจัดเรียงวิธีการแสดงผลแบบใหม่ */}
        {/* และควรใช้ key="" ทุกครั้งสำหรับการระบุ Unique Key เพื่อเพิ่มประสิทธิภาพในการแสดงผล */}
        {alphabets.map((alphabet, index) => (
          <div key={index} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">{alphabet}</div>
        ))}
      </div>

      <hr className="my-4"/>

      <ProductList></ProductList>
    </>
  )
}

interface ProductItemProps {
  id: number
  name: string
  price: number
}

const products: ProductItemProps[] = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
]

function ProductItem({ product }: { product: ProductItemProps }) {
  return (
    <div className="border border-gray-300 rounded-md p-3">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm">{product.price} Baht</p>
      <a className="block mt-2 text-center bg-blue-600 text-white py-1 rounded" href={`/products/${product.id}`}>View</a>
    </div>
  )
}

function ProductList() {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {/* วนลูปเพื่อแสดงผลตามจำนวน Components */}
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
