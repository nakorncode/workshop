import type { APIRoute } from 'astro'
import { prisma } from '../../../lib/prisma'

export const GET: APIRoute = async ({ params }) => {
  const id = Number(params.id)
  if (isNaN(id)) {
    return new Response(null, { status: 404 })
  }
  const product = await prisma.product.findUnique({
    where: { id }
  })
  if (!product) {
    return new Response(null, { status: 404 })
  }
  return new Response(JSON.stringify({ product }), { headers: { 'Content-Type': 'application/json' } })
}
