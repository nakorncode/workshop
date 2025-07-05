// เพียงแค่ประกาศ Directive ไว้บนสุด จะกลายเป็น Client Components ทั้งหมด
// และสามารถใช้งาน React Hooks ต่างๆได้ แต่ต้องระมัดระวังเรื่อง Hydration Failed

'use client'

import { useEffect, useState } from 'react'

interface ProductData {
  id: number
  title: string
  price: number
}

export default function Page() {
  const [currentId, setCurrentId] = useState(1)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<ProductData | null>(null)
  useEffect(() => {
    setProduct(null)
    getProduct(currentId)
  }, [currentId])
  async function getProduct(id: number) {
    setLoading(true)
    const data = await fetch(`https://dummyjson.com/products/${id}?select=title,price`).then(res => res.json())
    setProduct(data)
    setLoading(false)
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Client Component</h1>
      <div>
        ID: <input
          type="number"
          value={currentId}
          onChange={e => setCurrentId(Number(e.target.value))}
          className="border border-gray-300 px-2 py-1 rounded disabled:opacity-50"
          disabled={loading}
        />
      </div>
      <div className="mt-2">
        {loading && 'Loading...'}
        {product && (
          <>
            <p>Product: {product.title}</p>
            <p>Price: {product.price}</p>
          </>
        )}
      </div>
    </>
  )
}
