import { Product } from '~/utils/dataTypes'
import { z } from 'zod'

const products: Product[] = [
  { id: 1, title: 'Product 1', price: 100 },
  { id: 2, title: 'Product 2', price: 200 },
]

export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  try {
    const parsed = await z.object({
      title: z.string(),
      price: z.number(),
    }).parseAsync(data)
    // 
    return {
      data: parsed,
    }
  } catch (error) {
    throw createError({
      status: 400,
      message: 'Invalid data',
    })
  }
})