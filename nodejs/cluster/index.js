// - สร้างไฟล์ server.js สำหรับทดสอบรัน Cluster
// - node server.js
// - http://localhost:3000/fib?n=44 จากนั้นอาจจะลองลดเลขที่น้อยกว่านี้
// - ทดสอบด้วยตนเอง โดยการนำส่วนของ if...else ออกทั้งหมดให้เหลือแต่ express

import express from 'express'
import cluster from 'node:cluster'
import os from 'node:os'

const numCPUs = os.cpus().length // จำนวน CPU cores

if (cluster.isPrimary) {
  console.log(`Primary process started. PID: ${process.pid}`)
  // สร้าง Worker สำหรับแต่ละ Core, Thread
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  // รอการ Exit ของ Worker
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited`)
  })

} else {
  // ส่วนของโค้ดที่ต้องการทำงานแต่ละ Worker
  const app = express()

  app.get('/fib', (req, res) => {
    const fib = (n) => {
      if (n <= 1) {
        return 1
      }
      return fib(n - 1) + fib(n - 2)
    }
    res.send({ result: fib(req.query.n) })
  })

  app.listen(3000, () => {
    console.log(`Server listening on port 3000; PID: ${process.pid}`)
  })
}
