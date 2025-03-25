import { jwtVerify } from 'jose'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'token')
  if (!token) {
    throw createError({
      message: 'Unauthorized',
      status: 401
    })
  }
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(config.jwtSecret),
      { algorithms: ['HS256'] }
    )
    const user = users.find((u) => u.id === payload.userId)
    if (!user) {
      throw createError({
        message: 'Unauthorized',
        status: 401
      })
    }
    return { data: { id: user.id, name: user.name, email: user.email } }
  } catch (error) {
    throw createError({
      message: 'Unauthorized',
      status: 401
    })
  }
})