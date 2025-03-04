import { file, glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

export const collections = {
  menus: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/menus' }),
    schema: z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string().optional(),
      premium: z.boolean(),
      price: z.number().min(0),
      isVegan: z.boolean(),
      orderAt: z.number().optional()
    })
  }),
  pets: defineCollection({
    loader: file('./src/content/pets.json'),
    schema: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      isHidden: z.boolean().optional(),
    })
  })
}
