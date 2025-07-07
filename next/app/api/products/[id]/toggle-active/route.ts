import { toggleActiveProduct } from '../../ProductManagement'

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  await toggleActiveProduct(parseInt(params.id))
  return new Response(null, { status: 204 })
}
