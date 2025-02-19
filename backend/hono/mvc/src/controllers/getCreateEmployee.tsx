import { createFactory } from 'hono/factory'
import { ViewCreateEmployee } from '../views/ViewCreateEmployee.js'

const factory = createFactory()

export const getCreateEmployee = factory.createHandlers((c) => c.html(<ViewCreateEmployee></ViewCreateEmployee>))
