import { createFactory } from 'hono/factory'
import { Attendance } from '../models/Attendance.js'

const factory = createFactory()

export const addAttendanceToEmployee = factory.createHandlers(async (c) => {
  const redirect = c.req.query('redirect')
  const employeeId = Number(c.req.param('employeeId'))
  const status = c.req.param('status')
  if (status === 'check-in') {
    await Attendance.makeCheckIn(employeeId)
  }
  if (status === 'check-out') {
    await Attendance.makeCheckOut(employeeId)
  }
  return c.redirect(redirect || `/`)
})
