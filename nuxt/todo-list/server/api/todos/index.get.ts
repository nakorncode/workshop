export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)
  if (!user) {
    throw createError({ status: 401 })
  }
  const data = await prisma.todoList.findMany({
    where: { userId: user.id },
    include: { items: true }
  })
  return { data }
})
