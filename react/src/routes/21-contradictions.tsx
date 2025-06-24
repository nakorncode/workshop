import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/21-contradictions')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <GoodStructure></GoodStructure>
      <hr className="my-4"/>
      <BadStructure></BadStructure>
    </>
  )
}

interface Product {
  id: number
  title: string
  price: number
}

function ProductAndForm(props: {
  product: Product | null
  loading: boolean
  error: string | null
  onClearError: () => void
  onFetchData: (id: number) => void
}) {
  const [id, setId] = useState(1)
  if (props.error) {
    return (
      <>
        <button onClick={props.onClearError}>Clear Error</button>
        <p>Error: {props.error}</p>
      </>
    )
  }
  return (
    <>
      <form onSubmit={(event) => {event.preventDefault(); props.onFetchData(id);}}>
        <input type="number" value={id} onChange={(event) => setId(Number(event.target.value))} className="border border-gray-300 px-2 py-1 rounded" />
        <button disabled={props.loading} type="submit" className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50">Fetch</button>
      </form>
      {props.loading && <p>Loading...</p>}
      {props.product && (
        <ul className="mt-2 list-disc pl-5">
          <li>Title: {props.product.title}</li>
          <li>Price: {props.product.price}</li>
        </ul>
      )}
    </>
  )
}

// ⚠️ ใช้งานได้ แต่มีการเรียก Set state ที่ซ้ำซ้อนเกินไป
function BadStructure() {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  async function fetchData(id: number) {
    setLoading(true)
    setProduct(null)
    const res = await fetch(`https://dummyjson.com/products/${id}?select=id,title,price`)
    if (res.ok) {
      const data = await res.json()
      setProduct(data)
      setLoading(false)
    } else {
      setError(`Error: ${res.status}`)
      setLoading(false)
    }
  }
  function clearData() {
    setLoading(false)
    setProduct(null)
    setError(null)
  }
  return <ProductAndForm product={product} loading={loading} error={error} onClearError={clearData} onFetchData={fetchData}></ProductAndForm>
}

// ✅ เรียกแบบ Object เพื่อตั้งค่าแบบรวบเดียว
function GoodStructure() {
  const [product, setProduct] = useState<{
    data: Product | null
    loading: boolean
    error: string | null
  }>({
    data: null,
    loading: false,
    error: null
  })
  async function fetchData(id: number) {
    setProduct({ data: null, loading: true, error: null })
    const res = await fetch(`https://dummyjson.com/products/${id}?select=id,title,price`)
    if (res.ok) {
      const data = await res.json()
      setProduct({ data, loading: false, error: null })
    } else {
      setProduct({ data: null, loading: false, error: `Error: ${res.status}` })
    }
  }
  function clearData() {
    setProduct({ data: null, loading: false, error: null })
  }
  return <ProductAndForm product={product.data} loading={product.loading} error={product.error} onClearError={clearData} onFetchData={fetchData}></ProductAndForm>
}
