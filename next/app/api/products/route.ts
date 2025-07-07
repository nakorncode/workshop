import { NextRequest } from 'next/server'
import { addProduct, getProducts, Product, validateProduct } from './ProductManagement'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get('name')
  const priceMin = searchParams.get('priceMin')
  const priceMax = searchParams.get('priceMax')
  let products = await getProducts()
  if (name) {
    products = products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
  }
  if (priceMin && priceMax) {
    products = products.filter((product) => product.price >= parseInt(priceMin) && product.price <= parseInt(priceMax))
  }
  return Response.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const result = await validateProduct(body)
  if (result.error) {
    return new Response(result.error.errors[0].message, { status: 400 })
  }
  await addProduct(result.data)
  return new Response('Product added', { status: 201 })
}
