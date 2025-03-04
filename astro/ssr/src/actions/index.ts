import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { prisma } from '../lib/prisma'

export const server = {
  createProduct: defineAction({
    // application/json
    input: z.object({
      title: z.string(),
      description: z.string(),
      price: z.number()
    }),
    handler: async (input) => {
      const existsProduct = await prisma.product.findFirst({
        where: { title: input.title }
      })
      if (existsProduct) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Product already exists'
        })
      }
      if (input.price >= 10000) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Price must be less than 10000'
        })
      }
      const product = await prisma.product.create({ data: input })
      return product
    }
  }),
  createProductForm: defineAction({
    // application/x-www-form-urlencoded
    accept: 'form',
    input: z.object({
      title: z.string(),
      description: z.string(),
      price: z.number()
    }),
    handler: async (input) => {
      const existsProduct = await prisma.product.findFirst({
        where: { title: input.title }
      })
      if (existsProduct) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'Product already exists'
        })
      }
      const product = await prisma.product.create({ data: input })
      return { message: 'Product created' }
    }
  })
}
