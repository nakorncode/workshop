import { createFactory } from 'hono/factory'
import { Employee } from '../models/Employee.js'

const factory = createFactory()

export const createEmployee = factory.createHandlers(async (c) => {
  const data = await c.req.parseBody()
  const employee = Employee.create({
    name: String(data.name),
    email: String(data.email),
    role: String(data.role),
  })
  return c.redirect(`/employees/${employee.id}`)
})
