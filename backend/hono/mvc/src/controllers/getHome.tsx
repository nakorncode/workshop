import { createFactory } from 'hono/factory'
import { ViewHome } from '../views/ViewHome.js'
import { Employee } from '../models/Employee.js'

const factory = createFactory()

export const getHome = factory.createHandlers((c) => {
  const employees = Employee.getAll()
  return c.html(<ViewHome employees={employees}></ViewHome>)
})
