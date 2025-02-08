import { createFactory } from 'hono/factory'
import { ViewHome } from '../views/ViewHome.js'
import { Employee } from '../models/Employee.js'
import { ViewEmployee } from '../views/ViewEmployee.js'

const factory = createFactory()

export const getEmployee = factory.createHandlers((c) => {
  const id = Number(c.req.param('id'))
  const employee = Employee.getOne(id)
  if (!employee) return c.notFound()
  return c.html(<ViewEmployee employee={employee}></ViewEmployee>)
})
