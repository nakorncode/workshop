import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Product {
  id: number
  title: string
  description: string
  price: number
}

export default async function Page(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const url = `https://dummyjson.com/products/search?q=${searchParams.search || ''}&select=`
  const data = await fetch(url).then(res => res.json()) as { products: Product[] }
  if (data.products.length === 0) return notFound()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Search result:</h1>
      <ul className="list-disc pl-5 mb-3">
        {data.products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <Link href="/workshops/15-built-in-components" className="text-blue-600 underline">Back to search</Link>
    </>
  )
}
