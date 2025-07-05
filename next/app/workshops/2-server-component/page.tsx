export default async function Page() {
  const product = await fetch('https://dummyjson.com/products/1?select=title,price').then(res => res.json()) as { title: string, price: number }
  // จะไม่สามารถใช้งาน Reach Hooks ต่างๆได้ นอกจากจะเป็น Client Component
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Server Component</h1>
      <p>Product: {product.title}</p>
      <p>Price: {product.price}</p>
    </>
  )
}
