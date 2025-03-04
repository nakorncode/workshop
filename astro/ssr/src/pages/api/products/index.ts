import type { APIRoute } from 'astro'
import { prisma } from '../../../lib/prisma'

export const GET: APIRoute = async () => {
  const products = await prisma.product.findMany()
  return new Response(JSON.stringify({
    products
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return new Response(null, { status: 415 })
  }
  const body = await request.json()
  // ควรจะ Validation
  const product = await prisma.product.create({
    data: body
  })
  return new Response(JSON.stringify({
    product
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
