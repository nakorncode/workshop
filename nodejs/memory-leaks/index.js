import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'
import fetch from 'node-fetch' // fetch ธรรมดาจะไม่สามารถใช้ .on() (Event Emitter)
import bytes from 'bytes'      // แปลงจากจำนวน Bytes => เป็นหน่วยที่อ่านง่ายขึ้น

const cli = yargs(hideBin(process.argv))

// command download-pipe https://*
cli.command('download-pipe [url]', 'Download a file using a pipe', {
  url: {
    type: 'string',
  }
}, async (argv) => {
  const spinner = ora().start()
  try {
    const response = await fetch(argv.url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${argv.url}: ${response.statusText}`)
    }
    const filename = path.basename(new URL(argv.url).pathname) // กำหนดชื่อไฟล์
    const dest = fs.createWriteStream(path.join(process.cwd(), filename)) // สร้าง Stream สำหรับการเขียนไฟล์ลง Storage (HDD, SSD)
    let totalBytes = response.headers.get('content-length') || 0 // รับข้อมูลขนาดไฟล์
    let receivedBytes = 0 // จำนวน Bytes ที่ได้ดาวน์โหลด
    let startTime = Date.now() // เวลาเริ่มดาวน์โหลด
    response.body.pipe(dest) // เชื่อม Pipe กับ Write Stream
    response.body.on('data', (chunk) => { // ระหว่างที่ได้รับ Data จากการ Response
      receivedBytes += chunk.length // เพิ่มจำนวนข้อมูล Bytes ที่ได้รับ
      // แสดงข้อมูลขนาดไฟล์ จำนวนที่ได้ดาวน์โหลด และความเร็วการดาวน์โหลดคำนวณจากเวลา
      const totalByte = Math.round(totalBytes)
      const receivedByte = Math.round(receivedBytes)
      const speed = Math.round(receivedBytes / (Date.now() - startTime) * 1000)
      spinner.text = `[Pipe] Downloading ${filename} ${Math.round(receivedBytes / totalBytes * 100)}% (${bytes(receivedByte)}/${bytes(totalByte)}) ${bytes(speed)}/s`
    })
    response.body.on('end', () => { // เมื่อดาวน์โหลดเสร็จสิ้น
      spinner.succeed(`Downloaded ${filename}`)
    })
    response.body.on('error', (err) => { // เมื่อดาวน์โหลดเกิดปัญหา
      spinner.fail(`Download failed: ${err.message}`)
    })
  } catch (err) {
    spinner.fail(`Error: ${err.message}`)
  }
})

// command download-leak https://*
cli.command('download-leak [url]', 'Download a file but memory leaked', {
  url: {
    type: 'string',
  }
}, async (argv) => {
  const spinner = ora().start()
  try {
    const response = await fetch(argv.url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${argv.url}: ${response.statusText}`)
    }
    const filename = path.basename(new URL(argv.url).pathname)
    const dest = path.join(process.cwd(), filename)
    const chunks = [] // สร้างตัวแปร เก็บ Array ลงบน Memory (RAM) ส่วนนี้กำลังจะสร้างปัญหา Memory Leaks
    let totalBytes = response.headers.get('content-length') || 0
    let receivedBytes = 0
    let startTime = Date.now()
    response.body.on('data', (chunk) => {
      chunks.push(chunk) // ในระหว่างรับข้อมูล เราไม่ได้ Pipe Write Stream แต่เราเลือกที่จะ Push Array into Variable (Memory) แทน จึงเกิดปัญหา
      receivedBytes += chunk.length
      const totalByte = Math.round(totalBytes)
      const receivedByte = Math.round(receivedBytes)
      const speed = Math.round(receivedBytes / (Date.now() - startTime) * 1000)
      spinner.text = `[Leak] Downloading ${filename} ${Math.round(receivedBytes / totalBytes * 100)}% (${bytes(receivedByte)}/${bytes(totalByte)}) ${bytes(speed)}/s`
    })
    response.body.on('end', () => {
      fs.writeFileSync(dest, Buffer.concat(chunks)) // เมื่อเราได้รับ Array ครบหมดแล้ว เราจึงนำข้อมูลใน Memory ทั้งหมดเข้ามา Write File ทีเดียว
      spinner.succeed(`Downloaded ${filename}`)
    })
    response.body.on('error', (err) => {
      spinner.fail(`Download failed: ${err.message}`)
    })
  } catch (err) {
    spinner.fail(`Error: ${err.message}`)
  }
})

cli.parse()
