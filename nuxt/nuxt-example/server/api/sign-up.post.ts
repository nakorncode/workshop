import { z } from 'zod'

interface Input {
  name: string
  email: string
  password: string
}

export default defineEventHandler<{ body: Input }, Promise<{ data: any }>>(async (event) => {
  const body = await readBody(event)
  const data = await z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  }).parseAsync(body)
  users.push({ ...data, id: users.length + 1 })
  return { data: { email: data.email } }
})