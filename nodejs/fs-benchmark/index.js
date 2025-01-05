import fs from 'node:fs'
import { Bench } from 'tinybench' // ใช้สำหรับทดสอบประสิทธิภาพโค้ดที่ต่างกัน

const bench = new Bench()
const totalFile = 100
const totalRepeat = 100

function createDirTest() {
  if (fs.existsSync('./test')) {
    fs.rmSync('./test', { recursive: true, force: true }) // rm -rf
  }
  fs.mkdirSync('./test')
}

function createFilePath(i, mode) {
  return `./test/${mode}-${i}.txt`
}

createDirTest()

// ชุดทดสอบแรกสำหรับ Sync
bench.add('sync', () => {
  for (let i = 0; i < totalFile; i++) {
    fs.writeFileSync(createFilePath(i, 'sync'), 'Hello World\n'.repeat(totalRepeat))
  }
})

// ชุดทดสอบที่สองสำหรับ Async
bench.add('async', async () => {
  const jobs = []
  for (let i = 0; i < totalFile; i++) {
    jobs.push(fs.promises.writeFile(createFilePath(i, 'async'), 'Hello World\n'.repeat(totalRepeat)))
  }
  await Promise.all(jobs)
})

console.log('Running...')
await bench.run()
console.log('Done')

console.table(bench.table())
