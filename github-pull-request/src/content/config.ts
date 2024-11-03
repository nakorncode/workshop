import { defineCollection, z } from 'astro:content'

export const collections = {
  programmers: defineCollection({
    type: 'data',
    schema: z.object({
      displayName: z.string(),
      message: z.string().optional(),
      githubUrl: z.string().url().optional(),
      created: z.number().int(),
    }),
  }),
}
