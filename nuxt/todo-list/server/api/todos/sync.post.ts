import { z } from 'zod'

const schema = z.object({
  id: z.string().uuid(),
  onlineMode: z.boolean(),
  title: z.string(),
  items: z.array(z.object({
    id: z.string().uuid(),
    title: z.string(),
    done: z.boolean()
  }))
})

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) {
    throw createError({ status: 401 })
  }
  const body = await readBody(event)
  const parsed = await schema.safeParseAsync(body)
  if (parsed.error) {
    console.warn(parsed.error)
    throw createError({
      status: 400,
      message: 'Invalid request body'
    })
  }
  const data = parsed.data
  const count = await prisma.todoList.count({
    where: { id: data.id }
  })
  if (count > 0) {
    throw createError({
      status: 400,
      statusMessage: 'Todo list already exists'
    })
  }
  await prisma.todoList.create({
    data: {
      id: data.id,
      title: data.title,
      userId: user.id,
      items: {
        createMany: {
          data: data.items
        }
      }
    }
  })
  return { message: `Todo list synced (${data.title})` }
})
