// ใช้ API จาก https://dummyjson.com สำหรับการดึงข้อมูลจำลองสินค้า

const selects = 'select=id,title,description,category,price,thumbnail'

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  thumbnail: string
}

export async function getProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=0&' + selects)
  const data = await res.json()
  return data.products as Product[]
}

export async function getProduct(id: number) {
  const res = await fetch(`https://dummyjson.com/products/${id}?` + selects)
  if (!res.ok) {
    throw new Error('Product not found')
  }
  const data = await res.json()
  return data as Product
}
