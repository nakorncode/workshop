import { toNodeHandler } from 'better-auth/node'
import express from 'express'
import { auth } from './auth'
import { engine } from 'express-handlebars'
import indexRouter from './routers/indexRouter'
import loginRouter from './routers/loginRouter'
import signUpRouter from './routers/signUpRouter'
import { makeNotification } from './utils/notification'

const app = express()

// เปิดการใช้งาน better-auth
app.all('/api/auth/*', toNodeHandler(auth))

// ตั้งค่าการใช้ Handlebars บน res.render()
app.engine('handlebars', engine({
  partialsDir: './src/views/partials'
}))
app.set('view engine', 'handlebars')
app.set('views', './src/views')

// ทำให้สามารถรับข้อมูล application/x-www-form-urlencoded ได้
app.use(express.urlencoded({ extended: false }))

// Routers อื่นๆ
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/sign-up', signUpRouter)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const message = err.message
  const referer = req.header('Referer')
  if (referer) {
    makeNotification(res, [message], 'danger')
    res.redirect(referer)
  } else {
    res.status((err as any)?.status || 500).send(err.message)
  }
})

app.listen(3000, () => console.log('Server is running on http://localhost:3000'))
