import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { getHome } from './controllers/getHome.js'
import { getEmployee } from './controllers/getEmployee.js'
import { getCreateEmployee } from './controllers/getCreateEmployee.js'
import { createEmployee } from './controllers/createEmployee.js'
import { addAttendanceToEmployee } from './controllers/addAttendanceToEmployee.js'

const app = new Hono()

// ⚠️ ตามปกติ Hono ไม่ได้แนะนำให้ทำ MVC: https://hono.dev/docs/guides/best-practices#don-t-make-controllers-when-possible
// กรณีที่ Routing เริ่มเยอะ แนะนำให้ทำการ Group และแยกไฟล์ออก https://hono.dev/docs/api/routing#grouping
// การใช้ createHandlers() https://hono.dev/docs/helpers/factory#factory-createhandlers
app.get('/', ...getHome)
app.get('/create/employee', ...getCreateEmployee)
app.get('/employees/:id', ...getEmployee)

app.post('/employees', ...createEmployee)
app.post('/attendances/:status/:employeeId', ...addAttendanceToEmployee)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
