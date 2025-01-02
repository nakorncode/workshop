import bcrypt from 'bcrypt' // Hash Password จะมีส่วนการใช้ CPU ที่สูงมาก
import express from 'express' // Backend สำหรับทดสอบ

const app = express()
const totalText = 100
const salt = 10

// ได้ผลลัพธ์เร็วกว่า: http://localhost:3000/test-async
app.get('/test-async', async (req, res) => {
  const start = Date.now() // สร้างเวลาเริ่มต้น
  const jobs = []
  for (let i = 0; i < totalText; i++) {
    jobs.push(bcrypt.hash('password123', salt)) // แทรก Jobs ที่จะรัน Promise
  }
  const results = await Promise.all(jobs) // Non-blocking I/O ด้วยการใช้ Promise.all()
  const end = Date.now() // สร้างเวลาที่เสร็จสิ้น
  res.send({ time: end - start, results }) // แสดงผลลัพธ์และเวลาที่รัน
})

// เขียนง่ายกว่า ไม่ต้องรู้จักการใช้ Callback, Promise ก็ทำเป็น แต่รันนานกว่ามาก: http://localhost:3000/test-sync
app.get('/test-sync', (req, res) => {
  const start = Date.now()
  const results = []
  for (let i = 0; i < totalText; i++) {
    const result = bcrypt.hashSync('password123', salt) // ใช้แบบ Sync ที่ต้องรอรันจนเสร็จก่อนที่จะรันต่อ
    results.push(result)
  }
  const end = Date.now()
  res.send({ time: end - start, results })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
