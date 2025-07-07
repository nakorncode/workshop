import { getProduct, removeProduct, updateProduct, validateProduct } from '../ProductManagement'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const product = await getProduct(parseInt(params.id))
  return Response.json(product)
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const body = await request.json()
  const result = await validateProduct(body)
  if (result.error) {
    return new Response(result.error.errors[0].message, { status: 400 })
  }
  await updateProduct(parseInt(params.id), result.data)
  return new Response(null, { status: 204 })
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  await removeProduct(parseInt(params.id))
  return new Response(null, { status: 204 })
}
