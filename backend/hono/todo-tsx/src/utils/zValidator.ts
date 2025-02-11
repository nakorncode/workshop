import { HTTPException } from 'hono/http-exception'
import { validator } from 'hono/validator'
import type { Schema } from 'zod'

export function zValidator<T>(schema: Schema<T>) {
  return validator('form', (value) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
      throw new HTTPException(400, { message: JSON.stringify(parsed.error.errors.map((e) => e.message)) })
    }
    return parsed.data
  })
}
