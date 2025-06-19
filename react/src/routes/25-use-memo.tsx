import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { useImmer } from 'use-immer'

export const Route = createFileRoute('/25-use-memo')({
  component: RouteComponent,
})

function RouteComponent() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  const [sort, setSort] = useImmer<{
    by: 'id' | 'title' | 'price'
    order: 'asc' | 'desc'
  }>({
    by: 'id',
    order: 'asc'
  })
  const [page, setPage] = useState(1)
  const perPage = 15

  // คล้ายกับการใช้ useEffect() แต่การ return จะเป็น Cleanup
  // ส่วน useMemo() จะเป็นการ return เพื่อ Memorized ข้อมูลที่เรากำหนด
  // จะรันใหม่ก็ต่อเมื่อ deps เปลี่ยนแปลงเช่นเดียวกันทั้งคู่
  const showProducts = useMemo(() => {
    const start = (page - 1) * perPage
    const end = page * perPage
    const sorted = [...products].sort((a, b) => {
      if (a[sort.by] < b[sort.by]) return sort.order === 'asc' ? -1 : 1
      if (a[sort.by] > b[sort.by]) return sort.order === 'asc' ? 1 : -1
      return 0
    })
    return sorted.slice(start, end)
  }, [products, sort, page])

  const btnClass = 'bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer'

  return (
    <>
      <p className="font-bold">Product (Page {page})</p>
      <ul className="space-y-1 mt-2">
        <li><button className={btnClass} onClick={() => setPage(page - 1)}>Previous page</button></li>
        <li><button className={btnClass} onClick={() => setPage(page + 1)}>Next page</button></li>
        <li><button className={btnClass} onClick={() => setSort(draft => {
          draft.by = 'id'
          draft.order = 'asc'
          return draft
        })}>Sort by ID (asc)</button></li>
        <li><button className={btnClass} onClick={() => setSort(draft => {
          draft.by = 'id'
          draft.order = 'desc'
          return draft
        })}>Sort by ID (desc)</button></li>
        <li><button className={btnClass} onClick={() => setSort(draft => {
          draft.by = 'price'
          draft.order = 'asc'
          return draft
        })}>Sort by price (asc)</button></li>
        <li><button className={btnClass} onClick={() => setSort(draft => {
          draft.by = 'price'
          draft.order = 'desc'
          return draft
        })}>Sort by price (desc)</button></li>
        <li><button className={btnClass} onClick={() => setSort(draft => {
          draft.by = 'title'
          draft.order = 'asc'
          return draft
        })}>Sort by title (asc)</button></li>
        <li><button className={btnClass} onClick={() => setSort(draft => {
          draft.by = 'title'
          draft.order = 'desc'
          return draft
        })}>Sort by title (desc)</button></li>
      </ul>
      <table className="w-full mt-3">
        <thead>
          <tr>
            <th className="w-10">Id</th>
            <th>Title</th>
            <th className="w-20">Price</th>
          </tr>
        </thead>
        <tbody>
          {showProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

interface Product {
  id: number
  title: string
  price: number
}

async function fetchProducts() {
  const data = await fetch('https://dummyjson.com/products?select=id,title,price&limit=0').then(res => res.json()) as { products: Product[] }
  return data.products
}
