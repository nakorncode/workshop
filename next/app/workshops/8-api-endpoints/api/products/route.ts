import { addProduct, getProducts, validateProduct } from '../../ProductManagement'

export async function GET() {
  const products = await getProducts()
  return Response.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const result = await validateProduct(body)
  if (result.error) {
    return new Response('Invalid product', { status: 400 })
  }
  await addProduct(result.data)
}
