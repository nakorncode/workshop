import { z } from 'zod'

const schema = z.object({
  todoListId: z.string().uuid(),
  title: z.string()
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
  const count = await prisma.todoList.count({
    where: { id: parsed.data.todoListId, userId: user.id }
  })
  if (count === 0) {
    throw createError({ status: 401 })
  }
  const data = await prisma.todoListItem.create({
    data: {
      todoListId: parsed.data.todoListId,
      title: parsed.data.title
    }
  })
  return { data }
})
